<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Profile extends Model
{

    protected $table = 'profiles';

    protected $dates = ['deleted_at', 'featured_at'];

    protected $softDelete = true;

    public function users(){
        return $this->belongsToMany('App\Models\User', 'user_x_profile', 'profile_id', 'user_id');
    }

    public function assignatedTaskCategories(){
        return $this->belongsToMany('App\Models\TaskCategories', 'task_category_followers', 'profile_id', 'task_category_id');
    }

    // Esto deberia estar en un provider
    // public static function items()
    // {
    //     // return Cache::rememberForever('task_categories', function () {
    //         return Profile::orderBy('lft', 'asc')->get();
    //     // });
    // }


}
