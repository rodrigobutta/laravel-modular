<!doctype html>
<html class="js csstransitions" lang="en-US">
    @include('master/head')
    <body class="@yield('bodyclass')">
        @include('master/notices')
       {{--  @include('master/header') --}}
        @yield('content')
        {{-- @include('master/footer') --}}
    </body>
</html>

@include('master/foot')
