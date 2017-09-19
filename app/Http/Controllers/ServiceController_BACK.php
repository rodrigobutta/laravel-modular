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
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Repository\TaskRepositoryInterface;
use App\Repository\TaskCategoryRepositoryInterface;
use App\Repository\PageRepositoryInterface;
use App\Repository\ArticleRepositoryInterface;


class ServiceController extends Controller
{


    public function __construct(TaskRepositoryInterface $task, TaskCategoryRepositoryInterface $category, ArticleRepositoryInterface $article, PageRepositoryInterface $page)
    {
        $this->taskRepository = $task;
        $this->taskCategoryRepository = $category;
        $this->pageRepository = $page;
        $this->articleRepository = $article;
    }


    public function searchPredict(Request $request){

        $term = $request->get('term');
        $res =  [];

        if($term != '') {
            //PRODUCTS
            foreach ($this->taskRepository->search($term) as $p) {
                $item = [];
                $item['link'] = $p->getLink();
                $item['text'] = $p->title;
                $item['class'] = '';

                array_push($res, $item);
            }

            //PRODUCT CATEGORIES
            foreach ($this->taskCategoryRepository->search($term) as $p) {
                $item = [];
                $item['link'] = $p->getLink();
                $item['text'] = $p->name;
                $item['class'] = '';

                array_push($res, $item);
            }

            //ARTICLES
            foreach ($this->articleRepository->search($term) as $p) {
                $item = [];
                $item['link'] = $p->getLink();
                $item['text'] = $p->title;
                $item['class'] = '';

                array_push($res, $item);

            }

            //PAGES
            foreach ($this->pageRepository->search($term) as $p) {
                $item = [];
                $item['link'] = $p->getLink();
                $item['text'] = $p->title;
                $item['class'] = '';

                array_push($res, $item);
            }

            //Limito a primeros 5
            $res = array_slice($res, 0, 5);
            array_push($res, ['link' => \URL::to('busqueda/'.str_slug($term)), 'text' => 'Más resultados...', 'class' => 'search-page']);
            $resultados = json_encode($res);

            return $resultados;
        }
        else {
            return '';
        }

    }


    public function fullSearch($term, $page = 1){

        $title = 'Resultados de la búsqueda';
        $term = str_replace('-', ' ', $term);
        $res =  [];

        //PRODUCTS
        foreach ($this->taskRepository->search($term) as $p) {

            $item = [];

            $item['id'] = $p->id;
            $item['link'] = $p->getLink();
            $item['text'] = $p->title;
            $item['created'] = $p->created_at->diffForHumans();
            $item['slug'] = $p->slug;
            $item['image'] = Resize::img($p->main_image, 'sidebarTask');

            array_push($res, $item);
        }

        //PRODUCT CATEGORIES
        foreach ($this->taskCategoryRepository->search($term) as $p) {

            $item = [];

            $item['id'] = $p->id;
            $item['link'] = $p->getLink();
            $item['text'] = $p->name;
            $item['created'] = $p->created_at->diffForHumans();
            $item['slug'] = $p->slug;
            $item['image'] = '';

            array_push($res, $item);
        }

        //ARTICLES
        foreach ($this->articleRepository->search($term) as $p) {

            $item = [];

            $item['id'] = $p->id;
            $item['link'] = $p->getLink();
            $item['text'] = $p->title;
            $item['created'] = $p->created_at->diffForHumans();
            $item['slug'] = $p->slug;
            $item['image'] = Resize::img($p->main_image, 'sidebarArticle');

            array_push($res, $item);

        }

        //PAGES
        foreach ($this->pageRepository->search($term) as $p) {

            $item = [];

            $item['id'] = $p->id;
            $item['link'] = $p->getLink();
            $item['text'] = $p->title;
            $item['created'] = $p->created_at->diffForHumans();
            $item['slug'] = $p->slug;
            $item['image'] = '';

            array_push($res, $item);
        }

        $resultados = json_encode(array_slice($res, 0, 20));

        return iView('service.search', compact('title', 'term', 'resultados'));
    }


    public function fileDownload($path)
    {
        $real_path = str_replace('_', '/', $path);

            $file = public_path() . '/' . $real_path;
            $name = array_reverse(explode('/', $real_path))[0];
            $headers = array('Content-Type: application/octet-stream');

        return response()->download($file, $name, $headers);
    }
}
