<?php
namespace App\Modules\Portfolio;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use \App\Models\Page;
use \App\Models\Grid;

class PortfolioModel extends \App\Models\Profiled
{
    // use SoftDeletes;

    protected static $logAttributes = ['title', 'slug'];

    protected $table = 'portfolio';
    // protected $softDelete = true;
    protected $dates = ['deleted_at', 'featured_at'];

    protected $casts = [
        'is_microsite' => 'boolean',
        'form_top' => 'boolean',
        'form_bottom' => 'boolean',
        'form_extended' => 'boolean'
    ];

    // para el ->toJson(); que usamos en controles con ajax
    // protected $visible = ['main_image', 'title', 'slug', 'id'];


    public $receipts = [

        'portfolioGridItem'     => [
            'recipe'    => 'grid_item',
            'dir'       => 'portfolio',
            'width'     => 640,
            'height'    => 480,
            'method'    => 'fix',
            'watermark' => false,
            'bnw' => false,
        ],

        'portfolioMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'portfolio',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'mainPortfolio'     => [
            'recipe'    => 'main',
            'dir'       => 'portfolio',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredPortfolio' => [
            'recipe'    => 'featured',
            'dir'       => 'portfolio',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredPortfolio2' => [
            'recipe'    => 'featured2',
            'dir'       => 'portfolio',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => true,
        ],
        'sidebarPortfolio'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'portfolio',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverPortfolio'    => [
            'recipe'    => 'cover2',
            'dir'       => 'portfolio',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingPortfolio'  => [
            'recipe'    => 'listing',
            'dir'       => 'portfolio',
            'width'     => 120,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'portfolioGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'portfolio',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'portfolioGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'portfolio',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'portfolioGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'portfolio',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'portfolioFull'     => [
            'recipe'    => 'full',
            'dir'       => 'portfolio',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'portfolioSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'portfolio',
            'width'     => 300,
            'height'    => 300,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false
        ],

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
            return route('portfolio.view', ['slug' => $this->slug]);;
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
        return route('admin.portfolio.edit', ['id' => $this->id]);
    }

    public function getFulltitle(){
        return  sprintf('%s (%s)', $this->title, $this->sku);
    }

    public function info(){
        return $this->hasOne(PortfolioInfoModel::class, 'portfolio_id');
    }

    // grid private solo para ese portfolioo, no visible en otro lado
    public function grid(){
        return $this->hasOne(Grid::class, 'id', 'grid_id');
    }

    public function grids(){
        return $this->belongsToMany('App\Models\Grid', 'portfolio_x_grid', 'portfolio_id', 'grid_id')->orderBy('order', 'asc')->withPivot('order','logic');
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
