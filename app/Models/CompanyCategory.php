<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyCategory extends Profiled
{

    protected $table = 'company_categories';


    public function children(){
        return $this->hasMany('App\Models\CompanyCategory', 'parent_id', 'id');
    }

    public function parent(){
        return $this->belongsTo('App\Models\CompanyCategory', 'parent_id');
    }

    public function depth(){

        $res = 0;

        $category = $this;
        if($category->parent_id>0){

            while ($category->parent_id > 0) {
                $res++;
                $category = $this->find($category->parent_id);
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


}
