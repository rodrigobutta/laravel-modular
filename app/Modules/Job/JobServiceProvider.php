<?php
namespace App\Modules\Job;

use Illuminate\Support\ServiceProvider;


class JobServiceProvider extends ServiceProvider {

    protected $packageName = 'job';


    public function boot()
    {
        include __DIR__.'/routes.php';

        $this->app->bind(
            'App\Modules\Job\JobRepositoryInterface',
            'App\Modules\Job\JobRepository'
        );

        // Register Views from your package
        $this->loadViewsFrom(__DIR__.'/views', $this->packageName);

        // Register your asset's publisher
        $this->publishes([
            __DIR__.'/assets' => public_path('vendor/'.$this->packageName),
        ], 'public');

        // Register your migration's publisher
        $this->publishes([
            __DIR__.'/database/migrations/' => base_path('/database/migrations')
        ], 'migrations');

        // Publish your seed's publisher
        $this->publishes([
            __DIR__.'/database/seeds/' => base_path('/database/seeds')
        ], 'seeds');

        // Publish your config
        $this->publishes([
            __DIR__.'/config/config.php' => config_path($this->packageName.'.php'),
        ], 'config');


    }


    public function register()
    {
        $this->mergeConfigFrom( __DIR__.'/config/config.php', $this->packageName);

    }

}
