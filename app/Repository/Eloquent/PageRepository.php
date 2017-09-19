<?php

namespace App\Repository\Eloquent;

use App\Helpers\ResizeHelper;
use App\Models\Page;
use App\Notifier\PageNotifier;

use App\Repository\PageRepositoryInterface;
use App\Repository\GridRepositoryInterface;

use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Support\Facades\Cache;

class PageRepository implements PageRepositoryInterface
{

    public function __construct(Page $pages, PageNotifier $notice, GridRepositoryInterface $g)
    {
        $this->pages = $pages;
        $this->notification = $notice;
        $this->gridRepository = $g;
    }

    private function posts(){

        // si es admin o superadmin no limitar el universo a los aprobados
        if(auth()->check() && (auth()->user()->isSuper() || auth()->user()->isAdmin())){
            $posts = $this->pages;
        }
        else{
            $posts = $this->pages;
        }

        return $posts;
    }


    public function getById($id){
        return $this->pages->where('id', $id)->with('user')->firstOrFail();
    }

    public function getBySlug($slug){
        return $this->pages->where('slug', $slug)->with('user')->firstOrFail();
    }

    public function getByTags($tag){
        $pages = $this->posts()->where('tags', 'LIKE', '%' . $tag . '%')->orderBy('desc')->with('user');
        return $pages->paginate(perPage());
    }

    public function incrementViews($item)
    {
        $item->views = $item->views + 1;
        $item->timestamps = false;
        $item->save(['updated_at' => false]);

        return $item;
    }

    public function search($search)
    {
        $extends = explode(' ', $search);

        $pages = $this->posts()->where('title', 'LIKE', '%' . $search . '%')
            ->orWhere('name', 'LIKE', '%' . $search . '%')
            ->orWhere('tags', 'LIKE', '%' . $search . '%')
            ->whereNull('deleted_at');

        foreach ($extends as $extend) {
            if(strlen($extend) >= 3) {
                $pages->orWhere('tags', 'LIKE', '%' . $extend . '%')->whereNull('deleted_at')
                    ->orWhere('name', 'LIKE', '%' . $search . '%')->whereNull('deleted_at')
                    ->orWhere('title', 'LIKE', '%' . $search . '%')->whereNull('deleted_at')
                    ->orWhere('description', 'LIKE', '%' . $search . '%')->whereNull('deleted_at');
            }

        }

        return $pages = $pages->with('user')->whereNull('deleted_at')->paginate(perPage());
    }



    public function delete($id){

        $item = Page::findOrFail($id);

        if(!$item->canHandle()){
            return false;
            // return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        // elimino el archivo fisico de la imagen
        if(has($item->main_image)){
            $delete = new ResizeHelper( $item->main_image, 'pages');
            $delete->delete();
        }

        // elimino las secciones del grid interno y luego el grid interno
        if(has($item->grid)){
            $this->gridRepository->delete($item->grid->id);
        }


        $item->delete();

        return true;

    }


}
