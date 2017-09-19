<?php

namespace App\Modules\Job;

use App\Modules\Job\JobModel;
use App\Modules\Job\JobRepositoryInterface;
use App\Modules\Job\JobNotifier;

use App\Repository\GridRepositoryInterface;
use App\Helpers\ResizeHelper;

use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Support\Facades\Cache;

class JobRepository implements JobRepositoryInterface
{

    public function __construct(
                                JobModel $job,
                                JobNotifier $notice,
                                GridRepositoryInterface $g
                                )
    {
        $this->job = $job;
        $this->notification = $notice;
        $this->gridRepository = $g;
    }

    public function getById($id)
    {
        // return $this->posts()->where('id', $id)->with('user', 'comments', 'comments.replies', 'favorites', 'info')->firstOrFail();
        return $this->posts()->where('id', $id)->with('user', 'info')->firstOrFail();
    }


    public function getBySlug($slug)
    {
        return $this->posts()->where('slug', $slug)->with('user', 'info')->firstOrFail();
    }

    private function posts(){

        // si es admin o superadmin no limitar el universo a los aprobados
        if(auth()->check() && (auth()->user()->isSuper() || auth()->user()->isAdmin())){
            $posts = $this->job->published();
        }
        else{
            $posts = $this->job->approved()->published();
        }

        return $posts;
    }


    public function getAll(){
        $job = $this->posts()->orderBy('sort'); //->with('user', 'comments', 'favorites');
        return $job->paginate(perPage());
    }


    public function incrementViews($job)
    {
        $job->views = $job->views + 1;
        $job->timestamps = false;
        $job->save(['updated_at' => false]);

        return $job;
    }


    public function search($search)
    {
        $extends = explode(' ', $search);

        $job = $this->posts()->where('title', 'LIKE', '%' . $search . '%')
            ->orWhere('tags', 'LIKE', '%' . $search . '%')
            ->whereNull('deleted_at')->whereNotNull('approved_at')->orderBy('approved_at', 'desc');

        foreach ($extends as $extend) {
            if(strlen($extend) >= 3) {
                $job->orWhere('tags', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at')
                    ->orWhere('title', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at')
                    ->orWhere('description', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at');
            }
        }

        return $job = $job->with('user')->whereNotNull('approved_at')->whereNull('deleted_at')->paginate(perPage());
    }



    public function delete($id){

        $item = JobModel::findOrFail($id);


        if(!$item->canHandle()){
            return false;
            // return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }


        // elimino el archivo fisico de la imagen
        if(has($item->main_image)){
            $delete = new ResizeHelper( $item->main_image, 'tasks');
            $delete->delete();
        }

        // elimino las secciones del grid interno y luego el grid interno
        if(has($item->grid)){
            $this->gridRepository->delete($item->grid->id);
        }


        $item->info()->delete();


        // elimino recursivamente
        foreach ($item->children as $child) {
            $this->delete($child->id);
        }

        $item->delete();

        return true;

    }


}
