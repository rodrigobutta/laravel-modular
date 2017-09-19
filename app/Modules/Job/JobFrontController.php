<?php
namespace App\Modules\Job;

use App\Modules\Job\JobRepositoryInterface;


use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Repository\PageRepositoryInterface;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;
use MP;

class JobFrontController extends Controller
{

    public function __construct(JobRepositoryInterface $job, PageRepositoryInterface $page)
    {

        // view()->addNamespace('job', app_path('Modules/job/views/'));


        $this->job = $job;
        $this->page = $page;
    }


    public function getList(Request $request){

        $breadcrumb = [];


        $items = JobModel::where('parent_id', '=', 0)->wherePublished(1)->orderBy('lft', 'asc')->get();

        $page = $this->page->getBySlug('job');
        $title = $page->title;

        // filtrar solo los jobos publicados
        // $job = $job->filter(function ($item) {
        //     return $item->isPublished();
        // })->values();



        return iView('job::front.index', compact( 'items', 'page', 'title'));

    }



    public function getView(Request $request, $mslug = null){


        if($mslug==null){
            return $this->getList();
        }

        $c = explode('/', $mslug);

        try {
            $item = $this->job->getBySlug(end($c));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect()->route('home')->with('flashError', 'no encontrado');
        }


        $ancestors = $item->getAncestors();

        if ($item){


            \Event::fire('App\Events', $item);



            $breadcrumb = [];

            foreach ($ancestors as $i => $cat){

                $bc = new \stdClass();
                    $bc->link = $cat->getLink();
                    $bc->target = $cat->getLinkTarget();
                    $bc->title = $cat->title;
                array_push($breadcrumb, $bc);

            }
            array_pop($breadcrumb);

            $childs = JobModel::where('parent_id', '=', $item->id)->wherePublished(1)->orderBy('lft', 'asc')->get();

            $brothers = JobModel::where('parent_id', '=', $item->parent_id)->wherePublished(1)->orderBy('lft', 'asc')->get();


            $title = $item->title;


            return iView('job::front.view', compact('item', 'title', 'breadcrumb', 'childs', 'brothers'));
        }
    }

}
