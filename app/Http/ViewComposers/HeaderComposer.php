<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use App\Models\Content;

class HeaderComposer
{

    public function __construct(Content $contents)
    {
        $this->contents = $contents;

        $this->slug = strtolower(\Request::segment(1));

        if($this->slug == 'busqueda') {
          $this->where = strtolower(\Request::segment(2));
          $this->term = strtolower(\Request::segment(3));
        }
    }

    public function compose(View $view) {


      $novedades_header = $this->contents->where('name', 'menu-novedades')->first();
      if ($novedades_header) {
         if ($novedades_header->value) {
          $novedades_header = json_decode($novedades_header->value);
         } else {
          $novedades_header = null;
         }
      }

      $view->with('slug', $this->slug);

      $view->with('novedades_header', $novedades_header);

      if($this->slug == 'busqueda') {
        $view->with('where', $this->where);
        $view->with('term', $this->term);
      }



    }
}
