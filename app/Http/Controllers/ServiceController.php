<?php

namespace App\Http\Controllers;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use App\Models\Profile;
use App\Models\Grid;
use App\Models\Task;
use App\Models\Page;
use App\Models\Article;
use App\Models\TaskCategory;
use App\Models\TaskInfo;
use App\Models\TaskLink;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;


use App\Repository\TaskRepositoryInterface;
use App\Repository\TaskCategoryRepositoryInterface;
use App\Repository\PageRepositoryInterface;


class ServiceController extends Controller
{


    public function __construct(TaskRepositoryInterface $task,
                                TaskCategoryRepositoryInterface $taskCategory ,
                                PageRepositoryInterface $page
                                )
    {
        $this->taskRepository = $task;
        $this->taskCategoryRepository = $taskCategory;
        $this->pageRepository = $page;
    }


    ////////////
    // SEARCH
    ////////////
    public function fullSearch($where, $term, $page = 1) {
        $title = 'Resultados de la búsqueda';
        $term = str_replace('-', ' ', $term);
        $res =  [];

        //PRODUCTS
        $temp = $this->taskRepository->search($term);

        if($where == "todo-el-sitio") {
            //PRODUCT CATEGORIES
            $temp = $temp->merge($this->taskCategoryRepository->search($term));
            //PAGES
            $temp = $temp->merge($this->pageRepository->search($term));
        }

        foreach ($temp as $p) {
            $item = [];

            $item['table'] = ($where == "todo-el-sitio") ? $p['table'] : null;
            $item['id'] = $p->id;
            $item['title'] = $p->title ? $p->title : $p->name;
            $item['link'] = $p->getLink();

            array_push($res, $item);
        }


        //PAGINATOR
        $perPage = 10;
        $offset = ($page * $perPage) - $perPage;
        $sliced = array_slice($res, $offset, $perPage, true);
        $posts = new Paginator($sliced, count($res), $perPage, $page);

        $posts->nextUrl = ($posts->hasMorePages()) ? '/'.$where.'/'.$term.'/'.($page + 1) : '';
        $posts->prevUrl = ($page > 1) ? '/'.$where.'/'.$term.'/'.($page - 1) : '';

        return iView('service.search', compact('title', 'term', 'posts', 'page'));
    }


    ////////////////////
    // FILE MANAGMENT
    ////////////////////
    public function fileDownload($path)
    {
        $real_path = str_replace('_', '/', $path);

            $file = public_path() . '/' . $real_path;
            $name = array_reverse(explode('/', $real_path))[0];
            $headers = array('Content-Type: application/octet-stream');

        return response()->download($file, $name, $headers);
    }
}
