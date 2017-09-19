<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    @include('master/head')
    <body class="@yield('bodyClass')">        
        @if(!isset($no_topbar) || $no_topbar==false)
            @include('master/header')
        @endif
        @yield('content')
        @include('master/footer')
        @include('master/includes')
        @include('master/foot')
        @include('master/notices')
        @yield('extra-js')
    </body>
</html>
