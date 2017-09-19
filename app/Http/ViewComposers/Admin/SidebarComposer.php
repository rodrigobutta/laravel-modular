<?php

namespace App\Http\ViewComposers\Admin;

use Illuminate\View\View;
use App\Models\Content;
use App\Models\AdminMenu;

class SidebarComposer
{

    public function __construct(Content $contents,AdminMenu $admin_menu)
    {
        $this->contents = $contents;
        $this->admin_menu = $admin_menu;

        // $this->slug = strtolower(\Request::segment(1));

        // if($this->slug == 'busqueda') {
        //   $this->where = strtolower(\Request::segment(2));
        //   $this->term = strtolower(\Request::segment(3));
        // }
    }

    public function compose(View $view) {


      $custom_menu = $this->admin_menu->get();

      $view->with('custom_menu', $custom_menu);





      // $novedades_header = $this->contents->where('name', 'menu-novedades')->first();
      // if ($novedades_header) {
      //    if ($novedades_header->value) {
      //     $novedades_header = json_decode($novedades_header->value);
      //    } else {
      //     $novedades_header = null;
      //    }
      // }
      // $view->with('slug', $this->slug);
      // $view->with('novedades_header', $novedades_header);
      // if($this->slug == 'busqueda') {
      //   $view->with('where', $this->where);
      //   $view->with('term', $this->term);
      // }
    }
}
