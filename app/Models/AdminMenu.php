<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Content;

use Illuminate\Support\Collection;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;


class AdminMenu extends Profiled
{

    protected $table = 'admin_menu';

    public function contents() {
        return $this->hasMany('App\Models\Content', 'menu_id', 'id');
    }

    public function pages() {
        return $this->hasMany('App\Models\Page', 'menu_id', 'id');
    }

    public function grids() {
        return $this->hasMany('App\Models\Grid', 'menu_id', 'id');
    }


    public function custom() {
        return $this->hasMany('App\Models\AdminMenuCustom', 'menu_id', 'id')->orderBy('order');
    }


}
