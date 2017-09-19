<?php

namespace App\Repository\Eloquent;

use App\Helpers\ResizeHelper;
use App\Models\Grid;
use App\Repository\GridRepositoryInterface;
use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Support\Facades\Cache;

class GridRepository implements GridRepositoryInterface{

    public function __construct(Grid $grids)
    {
        $this->grids = $grids;
    }

    public function getById($id)
    {
        return $this->grids->where('id', $id)->with('user', 'info')->firstOrFail();
    }

    public function search($search, $timeframe = null)
    {
        $extends = explode(' ', $search);

        $grids = $this->posts($timeframe)->where('title', 'LIKE', '%' . $search . '%')
            ->whereNull('deleted_at')
            ->where('shared', 1)
            ->orderBy('id', 'desc');

        foreach ($extends as $extend) {
            $grids->orWhere('title', 'LIKE', '%' . $search . '%')->whereNull('deleted_at')->where('shared', 1);
        }

        return $grids = $grids->with('user')->whereNull('deleted_at')->paginate(perPage());
    }

     private function posts(){

        // si es admin o superadmin no limitar el universo a los aprobados
        // if(auth()->check() && (auth()->user()->isSuper() || auth()->user()->isAdmin())){
            $posts = $this->grids;
        // }
        // else{
        //     $posts = $this->tasks->approved()->published();
        // }

        return $posts;
    }

    public function delete($id){

        $item = Grid::findOrFail($id);

        $item->sections()->delete();



        DB::table('grids_x_application')->where('grid_id', $id)->delete();
        DB::table('grids_x_application_category')->where('grid_id', $id)->delete();
        DB::table('grids_x_article')->where('grid_id', $id)->delete();
        DB::table('grids_x_article_category')->where('grid_id', $id)->delete();
        DB::table('grids_x_page')->where('grid_id', $id)->delete();
        DB::table('grids_x_task')->where('grid_id', $id)->delete();
        DB::table('grids_x_task_category')->where('grid_id', $id)->delete();


        $item->delete();

        return true;

    }


}
