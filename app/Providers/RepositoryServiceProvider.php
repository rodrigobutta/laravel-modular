<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->bind(
            'App\Repository\ProfileRepositoryInterface',
            'App\Repository\Eloquent\ProfileRepository'
        );

        $this->app->bind(
            'App\Repository\MediaRepositoryInterface',
            'App\Repository\Eloquent\MediaRepository'
        );

        $this->app->bind(
            'App\Repository\PageRepositoryInterface',
            'App\Repository\Eloquent\PageRepository'
        );

        $this->app->bind(
            'App\Repository\GridRepositoryInterface',
            'App\Repository\Eloquent\GridRepository'
        );

        $this->app->bind(
            'App\Repository\UsersRepositoryInterface',
            'App\Repository\Eloquent\UsersRepository'
        );


        $this->app->bind(
            'App\Repository\LocationRepositoryInterface',
            'App\Repository\Eloquent\LocationRepository'
        );

        $this->app->bind(
            'App\Repository\ContactsRepositoryInterface',
            'App\Repository\Eloquent\ContactsRepository'
        );

        $this->app->bind(
            'App\Repository\SectionRepositoryInterface',
            'App\Repository\Eloquent\SectionRepository'
        );

        $this->app->bind(
            'App\Repository\CompanyCategoryRepositoryInterface',
            'App\Repository\Eloquent\CompanyCategoryRepository'
        );




    }
}
