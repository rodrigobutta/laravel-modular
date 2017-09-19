<?php
namespace App\Modules\Client;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use \App\Models\Page;
use \App\Models\Grid;

class ClientModel extends \App\Models\Profiled
{
    // use SoftDeletes;

    protected static $logAttributes = ['title', 'slug'];

    protected $table = 'client';
    // protected $softDelete = true;
    protected $dates = ['deleted_at'];

    protected $casts = [
        'is_microsite' => 'boolean'
    ];

    // para el ->toJson(); que usamos en controles con ajax
    // protected $visible = ['main_image', 'title', 'slug', 'id'];


    public $receipts = [

        'clientAdminList'     => [
            'recipe'    => 'admin-list',
            'dir'       => 'client',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'clientFrontList' => [
            'recipe'    => 'front-list',
            'dir'       => 'client',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'clientAdminEdit'  => [
            'recipe'    => 'admin-edit',
            'dir'       => 'client',
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
            return route('client.view', ['slug' => $this->slug]);;
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
        return route('admin.client.edit', ['id' => $this->id]);
    }

    public function getFulltitle(){
        return  sprintf('%s (%s)', $this->title, $this->sku);
    }

    public function info(){
        return $this->hasOne(ClientInfoModel::class, 'client_id');
    }

    // grid private solo para ese cliento, no visible en otro lado
    public function grid(){
        return $this->hasOne(Grid::class, 'id', 'grid_id');
    }

    public function grids(){
        return $this->belongsToMany('App\Models\Grid', 'client_x_grid', 'client_id', 'grid_id')->orderBy('order', 'asc')->withPivot('order','logic');
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
