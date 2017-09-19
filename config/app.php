<?php

ini_set('xdebug.var_display_max_depth', -1);
ini_set('xdebug.var_display_max_children', -1);
ini_set('xdebug.var_display_max_data', -1);

return [

    'env' => env('APP_ENV', 'taskion'),
    'debug' => env('APP_DEBUG', false),
    'url' => 'http://localhost',
    'timezone' => env('TIMEZONE', 'UTC'),
    'locale' => env('LOCALE', 'en'),
    'fallback_locale' => 'en',
    'key' => env('APP_KEY', 'SomeRandomString'),
    'cipher' => 'AES-256-CBC',
    'log' => 'single',
    'providers' => [

        // Illuminate\Foundation\Providers\ArtisanServiceProvider::class, REB UPGRADE 5.2
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        // Illuminate\Routing\ControllerServiceProvider::class, REB UPGRADE 5.2
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        // App\Providers\RouteServiceProvider::class, AHORA ESTA ABAJO POR EL CATCHALL DE routes.php
        // App\Providers\CopyServiceProvider::class,

        Collective\Html\HtmlServiceProvider::class,
        App\Providers\RepositoryServiceProvider::class,
        Laravel\Socialite\SocialiteServiceProvider::class,
        Intervention\Image\ImageServiceProvider::class,
        // App\Providers\DropboxServiceProvider::class,
        Greggilbert\Recaptcha\RecaptchaServiceProvider::class,
        // Roumen\Feed\FeedServiceProvider::class,
        // Roumen\Sitemap\SitemapServiceProvider::class,
        yajra\Datatables\DatatablesServiceProvider::class,
        Way\Generators\GeneratorsServiceProvider::class, // reb generar migration desde base de datos
        Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class, // reb generar migration desde base de datos
        Orangehill\Iseed\IseedServiceProvider::class, // migrar seeds
        // Witty\LaravelDbBackup\DBBackupServiceProvider::class, // reb genera un dump de la base luego de configurar el config/db-backup con bin del mysql y ejecutar php artisan db:backup
        Mews\Purifier\PurifierServiceProvider::class,
        Jenssegers\Date\DateServiceProvider::class,
        LivePixel\MercadoPago\Providers\MercadoPagoServiceProvider::class,
        Barryvdh\TranslationManager\ManagerServiceProvider::class,
        Laracasts\Utilities\JavaScript\JavaScriptServiceProvider::class,
        App\Providers\ComposerServiceProvider::class,
        //SammyK\LaravelFacebookSdk\LaravelFacebookSdkServiceProvider::class,
        Maatwebsite\Excel\ExcelServiceProvider::class,

        Ipunkt\LaravelAnalytics\AnalyticsServiceProvider::class,

        Bogardo\Mailgun\MailgunServiceProvider::class,


        // Modulos acoplables !!!!!!!!!!!!!!!!!
        App\Modules\Area\AreaServiceProvider::class,
        App\Modules\Portfolio\PortfolioServiceProvider::class,
        App\Modules\Client\ClientServiceProvider::class,
        App\Modules\Job\JobServiceProvider::class,


        // Oblagio\Highcharts\Provider::class,

        // RodrigoButta\LaravelGoogleAnalytics\CoreServiceProvider::class,

        // ######### Siempre debe ir al final por si algun serviceprovider tiene un extend de routes, caso contrrio lo agarra el cath all final del PagesController
        App\Providers\RouteServiceProvider::class
    ],

    'aliases' => [

        'App' => Illuminate\Support\Facades\App::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Bus' => Illuminate\Support\Facades\Bus::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Input' => Illuminate\Support\Facades\Input::class,
        'Inspiring' => Illuminate\Foundation\Inspiring::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        'Mail' => Illuminate\Support\Facades\Mail::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,
        'Form' => Collective\Html\FormFacade::class,
        'HTML' => Collective\Html\HtmlFacade::class,
        'Socialite' => Laravel\Socialite\Facades\Socialite::class,
        'ImageResize' => Intervention\Image\Facades\Image::class,
        'Recaptcha' => Greggilbert\Recaptcha\Facades\Recaptcha::class,
        'Resize' => App\Helpers\Resize::class,
        // 'Feed' => Roumen\Feed\Facades\Feed::class,
        'Datatables' => yajra\Datatables\Datatables::class,
        'Thumbnail' => Lakshmajim\Thumbnail\Facade\Thumbnail::class,
        'MP' => LivePixel\MercadoPago\Facades\MP::class,
        'Purifier' => Mews\Purifier\PurifierServiceProvider::class,
        'Date' => Jenssegers\Date\DateServiceProvider::class,
        'Excel' => Maatwebsite\Excel\Facades\Excel::class,
        // 'Analytics' => Spatie\LaravelAnalytics\LaravelAnalyticsFacade::class, --- para version anterior a 2.0 (no necesita php 7.0)
        // 'Analytics' => Spatie\Analytics\AnalyticsFacade::class,
        'Analytics' => Ipunkt\LaravelAnalytics\AnalyticsFacade::class,
        'Javascript' => Laracasts\Utilities\JavaScript\JavaScriptFacade::class,

        'Mailgun' => Bogardo\Mailgun\Facades\Mailgun::class

        // 'Chart' => Oblagio\Highcharts\Facade::class,


        // 'Facebook' => SammyK\LaravelFacebookSdk\FacebookFacade::class,
    ],

];
