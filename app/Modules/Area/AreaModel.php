<?php
namespace App\Modules\Area;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use \App\Models\Page;
use \App\Models\Grid;

class AreaModel extends \App\Models\Profiled
{
    // use SoftDeletes;

    protected static $logAttributes = ['title', 'slug'];

    protected $table = 'area';
    // protected $softDelete = true;
    protected $dates = ['deleted_at'];

    protected $casts = [
        'is_microsite' => 'boolean'
    ];

    // para el ->toJson(); que usamos en controles con ajax
    // protected $visible = ['main_image', 'title', 'slug', 'id'];


    public $receipts = [

        'areaAdminList'     => [
            'recipe'    => 'admin-list',
            'dir'       => 'area',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'areaFrontList' => [
            'recipe'    => 'front-list',
            'dir'       => 'area',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'areaAdminEdit'  => [
            'recipe'    => 'admin-edit',
            'dir'       => 'area',
            'width'     => 120,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ]

    ];


    public static function scopeApproved(){
        return static::whereNotNull('approved_at');
    }

    public static function scopePublished(){
        return static::where('published',1);
    }


    public function isPublished(){
        return $this->published==1;
    }


    public function hasCategory($id){
        return ! $this->categories->filter(function($category) use ($id)
        {
            return $category->id == $id;
        })->isEmpty();
    }


    public function getLink(){

        if($this->is_microsite){
            return $this->microsite;
        }
        else{
            return route('area.view', ['slug' => $this->slug]);;
        }

    }


    public function getLinkTarget(){

        if($this->is_microsite){
            return '_blank';
        }
        else{
            return '_self';
        }

    }

    public function getAdminLink(){
        return route('admin.area.edit', ['id' => $this->id]);
    }

    public function getFulltitle(){
        return  sprintf('%s (%s)', $this->title, $this->sku);
    }


    // titulo con br o html y en caso de no existir, titulo original
    public function getPrintTitle(){
        if(strlen($this->info->title_print) > 1){
            $res = $this->info->title_print;
        }
        else{
            $res = $this->title;
        }
        return $res;
    }


    public function info(){
        return $this->hasOne(AreaInfoModel::class, 'area_id');
    }

    // grid private solo para ese areao, no visible en otro lado
    public function grid(){
        return $this->hasOne(Grid::class, 'id', 'grid_id');
    }

    public function grids(){
        return $this->belongsToMany('App\Models\Grid', 'area_x_grid', 'area_id', 'grid_id')->orderBy('order', 'asc')->withPivot('order','logic');
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
        else if($this->main_image){
            $res = $this->main_image;
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
