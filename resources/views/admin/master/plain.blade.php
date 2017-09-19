<!DOCTYPE html>
<html>
  @include('admin/master/head')
  <body>
    @include('admin.master.notices')
    @yield('content')
  </body>
</html>
@yield('extra-js')