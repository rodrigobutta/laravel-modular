<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

// use App\Http\Requests\Request; REB no es abstracta
use Illuminate\Http\Request;


class AppServiceProvider extends ServiceProvider{

    public function boot(Request $request){

        // si está corriendo en consola o artisan, entonces salteo esta etapa
        if( \App::runningInConsole() ) return true;

        // #####################
        // LOGICA DEL MULTISITIO
        // #####################

        // reb determino la url host para saber que base de datos levanto (en test es con ?country=uy)
        $host = $request->getHost();
        view()->share('host', $host);

        // var_dump($host);
        // en base a la url (host) determino la base de datos a usar, luego la base de datos indica el resto de los parametros como locale, timezone, etc
        // if ($request->input('country') == 'uy') {
        //     \Config::set('database.default', 'mysql_uy');
        // }
        if ($host == 'beta-uy.egoagencydev.com' ||
            $host == 'beta-uy.agenciaego.com.ar') {
            \Config::set('database.default', 'mysql_uy');
        }
        else if ($host == 'beta-pe.egoagencydev.com' ||
            $host == 'beta-pe.agenciaego.com.ar') {
            \Config::set('database.default', 'mysql_pe');
        }
        else if ($host == 'beta-cl.egoagencydev.com' ||
            $host == 'beta-cl.agenciaego.com.ar') {
            \Config::set('database.default', 'mysql_cl');
        }


        // reb cambio el idioma en base a la configuracion de la tabla settings
        \Config::set('app.locale', siteSettings('locale'));
        app()->setLocale(\Config::get('app.locale'));
        setlocale(LC_TIME, \Config::get('app.locale'));
        \Carbon\Carbon::setLocale(\Config::get('app.locale'));
        // https://github.com/rappasoft/laravel-5-boilerplate/issues/211

        // reb cambio el UTM en base a la configuracion de la tabla settings
        \Config::set('app.timezone', siteSettings('timezone'));
        date_default_timezone_set(\Config::get('app.timezone'));

        Validator::extend('country', function ($attribute, $value, $parameters) {
            return countryIsoCodeMatch($value) == true;
        });

    }

    public function register(){

        $this->app->bind('mailgun.client', function() {
            return \Http\Adapter\Guzzle6\Client::createWithConfig([

                'verify' => false,
                'timeout' => 5

            ]);
        });

    }

}
