<head>
    <meta charset="UTF-8">
    <title>{{ siteSettings('siteName') }} | {{ t('Admin') }}</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @include('admin/master/includes')

    @yield('head')

</head>
