<?php

namespace App\Repository\Eloquent;

use App\Models\CompanyCategory;

use App\Repository\CompanyCategoryRepositoryInterface;

use Illuminate\Support\Facades\URL;
use Roumen\Feed\Facades\Feed;

class CompanyCategoryRepository implements CompanyCategoryRepositoryInterface{

    protected $model;

    public function  __construct(CompanyCategory $m){
        $this->model = $m;
    }

    public function getBySlug($slug)
    {
        $category = $this->model->whereSlug($slug)->firstOrFail();

        return $category;
    }

    public function getAncestors($slug)
    {
        $res = [];

        $category = $this->model->whereSlug($slug)->firstOrFail();
        if($category->parent_id>0){

            while ($category->parent_id > 0) {
                array_unshift($res, $category);
                $category = $this->model->find($category->parent_id);
            }

            array_unshift($res, $category);
        }

        return $res;
    }

    function getItems(){
        // return Cache::rememberForever('task_categories', function () {
            return CompanyCategory::orderBy('lft', 'asc')->get();
        // });
    }

    private function posts(){

        $posts = $this->model;

        return $posts;
    }

    public function search($search){

        $res = $this->posts()->where('name', 'LIKE', '%' . $search . '%');

        return $res = $res->with('user')->paginate(perPage());

    }


    public function delete($id){

        $item = CompanyCategory::findOrFail($id);

        if(!$item->canHandle()){
            return false;
            // return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        $item->delete();

        foreach ($item->children as $child) {
            $this->delete($child->id);
        }

        return true;

    }



}
