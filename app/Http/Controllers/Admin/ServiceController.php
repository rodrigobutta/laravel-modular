<?php

namespace App\Http\Controllers\Admin;

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
use App\Models\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Repository\TaskRepositoryInterface;
use App\Repository\TaskCategoryRepositoryInterface;
use App\Repository\PageRepositoryInterface;
use App\Repository\ArticleRepositoryInterface;
use App\Repository\ArticleCategoryRepositoryInterface;
use App\Repository\ClientRepositoryInterface;


class ServiceController extends Controller
{


    public function __construct(TaskRepositoryInterface $task,
                                TaskCategoryRepositoryInterface $taskCategory ,
                                ArticleRepositoryInterface $article,
                                ArticleCategoryRepositoryInterface $articleCategory,
                                PageRepositoryInterface $page,
                                ClientRepositoryInterface $client
                                )
    {
        $this->taskRepository = $task;
        $this->taskCategoryRepository = $taskCategory;
        $this->pageRepository = $page;
        $this->articleRepository = $article;
        $this->articleCategoryRepository = $articleCategory;
        $this->clientRepository = $client;
    }


    public function search(Request $request){

        $term = $request->get('term');


        $res =  [];

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

        foreach ($this->taskCategoryRepository->search($term) as $p) {

            $item = [];

            $item['id'] = $p->id;
            $item['link'] = $p->getLink();
            $item['text'] = $p->title;
            $item['created'] = $p->created_at->diffForHumans();
            $item['slug'] = $p->slug;
            $item['image'] = Resize::img($p->main_image, 'sidebarTask');

            array_push($res, $item);

        }

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


        foreach ($this->clientRepository->search($term) as $p) {

                $item = [];

                $item['id'] = $p->id;
                $item['link'] = $p->getLink();
                $item['text'] = $p->job;
                $item['created'] = $p->created_at->diffForHumans();
                $item['slug'] = $p->slug;
                $item['image'] = '';

                array_push($res, $item);

            }


        return json_encode($res);
    }



    public function dashboardSearch(Request $request){

        $term = $request->get('q');

        $res =  [];

        foreach ($this->taskRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->title . ' (Tasko)';
            array_push($res, $item);
        }

        foreach ($this->taskCategoryRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->name . ' (Categoría de Tasko)';
            array_push($res, $item);
        }

        foreach ($this->articleRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->title . ' (Articulo)';
            array_push($res, $item);
        }

        foreach ($this->articleCategoryRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->name . ' (Categoría de Articulo)';
            array_push($res, $item);
        }

        foreach ($this->pageRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->title . ' (Página)';
            array_push($res, $item);
        }

        foreach ($this->clientRepository->search($term) as $p) {
            $item = [];
            $item['value'] = $p->getAdminLink();
            $item['label'] = $p->title . ' - ' . $p->job . ' (Portfolio)';
            array_push($res, $item);
        }

        return json_encode($res);
    }





}
