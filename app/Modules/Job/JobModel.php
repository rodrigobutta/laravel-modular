<?php
namespace App\Modules\Job;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use \App\Models\Page;
use \App\Models\Grid;

class JobModel extends \App\Models\Profiled
{

    protected $table = 'job';

    protected $casts = [
        'is_microsite' => 'boolean'
    ];

    public $receipts = [

        'jobGridItem'     => [
            'recipe'    => 'grid_item',
            'dir'       => 'job',
            'width'     => 640,
            'height'    => 480,
            'method'    => 'fix',
            'watermark' => false,
            'bnw' => false,
        ],

        'jobMenu'     => [
            'recipe'    => 'menu',
            'dir'       => 'job',
            'width'     => 248,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],

        'mainJob'     => [
            'recipe'    => 'main',
            'dir'       => 'job',
            'width'     => 1140,
            'height'    => 1140,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredJob' => [
            'recipe'    => 'featured',
            'dir'       => 'job',
            'width'     => 900,
            'height'    => 900,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'featuredJob2' => [
            'recipe'    => 'featured2',
            'dir'       => 'job',
            'width'     => 280,
            'height'    => 280,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => true,
        ],
        'sidebarJob'  => [
            'recipe'    => 'sidebar',
            'dir'       => 'job',
            'width'     => 80,
            'height'    => 80,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'coverJob'    => [
            'recipe'    => 'cover2',
            'dir'       => 'job',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'listingJob'  => [
            'recipe'    => 'listing',
            'dir'       => 'job',
            'width'     => 120,
            'height'    => 120,
            'method'    => 'fit',
            'watermark' => false,
            'bnw' => false,
        ],
        'jobGrid1'     => [
            'recipe'    => 'grid1',
            'dir'       => 'job',
            'width'     => 400,
            'height'    => 600,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'jobGrid2'     => [
            'recipe'    => 'grid2',
            'dir'       => 'job',
            'width'     => 760,
            'height'    => 1100,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'jobGrid3'     => [
            'recipe'    => 'grid3',
            'dir'       => 'job',
            'width'     => 1000,
            'height'    => 1400,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => true,
        ],
        'jobFull'     => [
            'recipe'    => 'full',
            'dir'       => 'job',
            'width'     => 1920,
            'height'    => 3000,
            'method'    => 'resize',
            'watermark' => false,
            'bnw' => false,
        ],
        'jobSearch'     => [
            'recipe'    => 'search',
            'dir'       => 'job',
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



    public function getLink(){

        if($this->is_microsite){
            return $this->microsite;
        }
        else{

            $path = '';
            $c = $this;
            if($c->parent_id>0){
                while ($c->parent_id > 0) {
                    $path = $c->slug . "/" . $path;
                    $c = $this->find($c->parent_id);
                }
            }

            $mslug = $c->slug . "/" . $path;

            return route('job.view', ['mslug' => $mslug]);
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
        return route('admin.job.edit', ['id' => $this->id]);
    }

    public function getFulltitle(){
        return  sprintf('%s (%s)', $this->title, $this->sku);
    }

    public function info(){
        return $this->hasOne(JobInfoModel::class, 'job_id');
    }

    // grid private solo para ese jobo, no visible en otro lado
    public function grid(){
        return $this->hasOne(Grid::class, 'id', 'grid_id');
    }

    public function grids(){
        return $this->belongsToMany('App\Models\Grid', 'job_x_grid', 'job_id', 'grid_id')->orderBy('order', 'asc')->withPivot('order','logic');
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


////////////////////////////////////////////////////
    //////////////////////////////////////



    public function getPath()
    {
        $res = '';

        $c = $this;
        if($c->parent_id>0){
            while ($c->parent_id > 0) {
                $res = $c->slug . "/" . $res;
                $c = $this->find($c->parent_id);
            }
        }

        $res = $c->slug . "/" . $res;

        return $res;
    }




    public function children(){
        return $this->hasMany('App\Modules\Job\JobModel', 'parent_id', 'id')->orderBy('lft', 'asc');;
    }

    public function parent(){
        return $this->belongsTo('App\Modules\Job\JobModel', 'parent_id');
    }


    // public function fullChildren(&$res){
    //     $res = $res->merge($this->children);
    //     foreach ($this->children as $child) {
    //         $child->fullChildren($res);
    //     }
    // }

    // public function getFullChildren() {

    //     $res = new Collection();

    //     $this->fullChildren($res);

    //     // $res = $res->unique();

    //     return $res;
    // }


    public function getAncestors(){

        $res = [];

        $job = $this;
        if($job->parent_id>0){

            while ($job->parent_id > 0) {
                array_unshift($res, $job);
                $job = $this->find($job->parent_id);
            }

            array_unshift($res, $job);
        }

        return $res;
    }


    public function depth(){

        $res = 0;

        $job = $this;
        if($job->parent_id>0){

            while ($job->parent_id > 0) {
                $res++;
                $job = $this->find($job->parent_id);
            }

        }

        return $res;
    }


    public function getRootCategory(){

        $res = $this;
        if($res->parent_id>0){
            while ($res->parent_id > 0) {
                $res = $this->find($res->parent_id);
            }
        }

        return $res;
    }


    public function gridAlways(){

        // si la grilla propia de la categoria tiene elementos, devuelvo esa, sino acudo al mismo metodo recursivamente por el padre hasta que alguna tenga
        if($this->grid && !$this->grid->isEmpty()){
            return $this->grid;
        }
        else if($this->parent){
            return $this->parent->gridAlways();
        }
        else{
            //Devuelvo grid vacía
            return new Grid();
        }

    }



    // extension de la relacion con grids donde, de no haber ningun grid asignado a ese tasko, busca el primer padre inmediato que tenga grids.
    public function scopeFamilyGrids($check_native=false){

        $grids = [];
        $job = $this;
        $native = true; // indica si las grillas se levantaron del elemento a verificar y no de sus padres

        do{

            if(sizeof($job->grids)>0){
                $grids = $job->grids;
            }
            else if($job->parent_id>0){
                $native=false;
                $job = JobModel::find($job->parent_id);
            }
            else{
                break;
            }

        } while(sizeof($grids)==0);


        if($check_native){
            return [$grids, $native];
        }
        else{
            return $grids;
        }

    }

    // levanta todas las grillas en formato de texto concatenado para que sea mostrado en el admin
    public function gridsResume($withlinks=false){
        $res = '';

        list($grids,$native) = $this->scopeFamilyGrids(true);

        if($withlinks){
            foreach ($grids as $g) {
                $res .= '<a href="'.route('admin.grids.live', [$g->id]).'" target="_blank">' . $g->title . '</a>';
            }
        }
        else{
            foreach ($grids as $g) {
                $res .= ', ' . $g->title;
            }
        }

        $res = ltrim($res,', ');

        if(sizeof($grids)>0){
            if(!$native){
                // $res = $res . '<i class="fa fa-sitemap" toggle="tooltip" title="'.t('inherited').'"></i> ' ;\
                $res = '<inherited>' . $res . '</inherited> ' ;
            }
        }

        return $res;
    }



    // obtiene los tags de la categoria y le suma la de todos sus padres hasta el root
    public function familyTags($split=',',$detect_inherated=false){

        $res = $this->tags;

        $job = $this;
        while(is_object($job) && $job->parent_id>0){
            $job = JobModel::find($job->parent_id);

            if($job->tags!=''){
                if($detect_inherated){
                    $res .= ',<inherited>' . $job->tags . '</inherited>';
                }
                else{
                    $res .= ',' . $job->tags;
                }
            }

        }

        $res = ltrim($res,',');
        $res = str_replace(',', $split, $res);

        return $res;
    }











}
