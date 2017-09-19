<?php
namespace App\Models;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
// use App\ModelInterfaces\OpengraphInterface;


class Page extends Profiled /*implements OpengraphInterface*/
{
    // use SoftDeletes;

    protected $table = 'pages';
    // protected $softDelete = true;
    protected $dates = ['deleted_at'];

   public function grids(){
        return $this->belongsToMany('App\Models\Grid', 'grids_x_page', 'page_id', 'grid_id')->orderBy('order', 'asc')->withPivot('logic');
   }

    // grid private solo para ese tasko, no visible en otro lado
    public function grid(){
        return $this->hasOne(Grid::class, 'id', 'grid_id');
    }

    public function getLink(){
        return route('page', ['slug' => $this->slug]);;
    }

    public function getAdminLink(){
        return route('admin.pages.edit', ['id' => $this->id]);
    }

    public function depth(){

        $res = 0;

        $page = $this;
        if($page->parent_id>0){

            while ($page->parent_id > 0) {
                $res++;
                $page = $this->find($page->parent_id);
            }

        }

        return $res;
    }


    public function getFullSlug(){

        $res = [];

        $page = $this;

        array_push($res, $page->slug);
        if($page->parent_id != 0){

            while ($page->parent_id > 0) {
                $page = $this->find($page->parent_id);
                array_push($res, $page->slug);
            }

        }
        return implode('/', array_reverse($res));
    }



    public function isSystem(){
        return $this->id < 10 ? true : false;
    }

    public function getDescription(){

        if(strlen($this->description) > 2){
            $res = strip_tags($this->description);
        }
        else{
            $res = siteSettings('description');
        }
        return $res;
    }

    public function getKeywords(){

        if(strlen($this->tags) > 2){
            $res = $this->tags;
        }
        else{
            $res = siteSettings('tags');
        }
        return $res;
    }

    public function getOgImage(){
        if($this->og_image){
            $res = $this->og_image;
        }
        else{
            $res = siteSettings('og_image');
        }
        return Resize::img($res,'mainMedia');
    }

    public function getOgDescription(){
        if(strlen($this->og_description) > 2){
            $res = $this->og_description;
        }
        else if(strlen($this->description) > 2){
            $res = $this->description;
        }
        else{
            $res = siteSettings('description');
        }
        return $res;
    }

}
