<?php

namespace App\Modules\Portfolio;

use App\Modules\Portfolio\PortfolioModel;
use App\Modules\Portfolio\PortfolioRepositoryInterface;
use App\Modules\Portfolio\PortfolioNotifier;

use App\Repository\GridRepositoryInterface;
use App\Helpers\ResizeHelper;

use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Support\Facades\Cache;

class PortfolioRepository implements PortfolioRepositoryInterface
{

    public function __construct(
                                PortfolioModel $portfolio,
                                PortfolioNotifier $notice,
                                GridRepositoryInterface $g
                                )
    {
        $this->portfolio = $portfolio;
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
            $posts = $this->portfolio->published();
        }
        else{
            $posts = $this->portfolio->approved()->published();
        }

        return $posts;
    }


    public function getAll(){
        $portfolio = $this->posts()->orderBy('sort'); //->with('user', 'comments', 'favorites');
        return $portfolio->paginate(perPage());
    }


    public function incrementViews($portfolio)
    {
        $portfolio->views = $portfolio->views + 1;
        $portfolio->timestamps = false;
        $portfolio->save(['updated_at' => false]);

        return $portfolio;
    }


    public function search($search)
    {
        $extends = explode(' ', $search);

        $portfolio = $this->posts()->where('title', 'LIKE', '%' . $search . '%')
            ->orWhere('tags', 'LIKE', '%' . $search . '%')
            ->whereNull('deleted_at')->whereNotNull('approved_at')->orderBy('approved_at', 'desc');

        foreach ($extends as $extend) {
            if(strlen($extend) >= 3) {
                $portfolio->orWhere('tags', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at')
                    ->orWhere('title', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at')
                    ->orWhere('description', 'LIKE', '%' . $extend . '%')->whereNotNull('approved_at')->whereNull('deleted_at');
            }
        }

        return $portfolio = $portfolio->with('user')->whereNotNull('approved_at')->whereNull('deleted_at')->paginate(perPage());
    }



    public function delete($id){

        $item = PortfolioModel::findOrFail($id);

        if(!$item->canHandle()){
            return false;
            // return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        // elimino el archivo fisico de la imagen
        if(has($item->main_image)){
            $delete = new ResizeHelper( $item->main_image, 'portfolio');
            $delete->delete();
        }

        // elimino las secciones del grid interno y luego el grid interno
        if(has($item->grid)){
            $this->gridRepository->delete($item->grid->id);
        }

        // elimino la 1:1
        $item->info()->delete();

        $item->delete();

        return true;

    }


}
