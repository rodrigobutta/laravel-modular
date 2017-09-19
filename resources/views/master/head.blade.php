<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="author" content="{{ siteSettings('author') }}" />
    <base href="{{ URL::to('/') }}">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">

    @include('master.meta_default')
    @yield('meta')

    <title>@yield('title', strip_tags($title)) - {{ siteSettings('siteName') }} {{ siteSettings('siteSubname') }}</title>

    <link rel="shortcut icon" href="{{ uploaded(siteSettings('favIcon')) }}" type="image/themifyx-icon"/>

    @if (config('app.debug') == true)
        @include('master/debug')
    @endif

    @yield('style')

    @yield('head')

    @include('master/javascript-parameters')

    @if(config('app.debug'))
      {!! HTML::style('public/css/startup.css') !!}
      {!! HTML::script('public/js/startup.js') !!}
    @else
      {!! HTML::style('public/build/startup.min.css') !!}
      {!! HTML::script('public/build/startup.min.js') !!}
    @endif

    {!! Analytics::render() !!}

</head>
