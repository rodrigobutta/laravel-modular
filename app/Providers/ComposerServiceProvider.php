<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{

    public function boot(){

        view()->composer(
            'master.header',
            'App\Http\ViewComposers\HeaderComposer'
        );

        view()->composer(
            'admin.master.sidebar',
            'App\Http\ViewComposers\Admin\SidebarComposer'
        );

        view()->composer(
            'task.index',
            'App\Http\ViewComposers\HeaderComposer'
        );

        view()->composer(
            'page.equipos',
            'App\Http\ViewComposers\HeaderComposer'
        );

    }


    public function register()
    {
        //
    }
}
