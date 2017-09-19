<!DOCTYPE html>
<html>
@include('admin/master/head')
<body class="skin-purple sidebar-mini">
@include('admin.master.notices')
<div class="wrapper">

    <header id="header" class="main-header">
{{--
        <a href="{{ url("admin") }}" class="logo ">
            <span class="logo-mini"></span>
            <span class="logo-lg"><b>{{ siteSettings('siteName') }}</b>{{siteSettings('siteSubname')}}</span>
        </a> --}}

        <nav class="navbar navbar-static-top " role="navigation">

            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="container22">
                <div class="navbar-header">
                  {{-- <a href="{{URL::to('/')}}" class="navbar-brand">Ir al sitio</a> --}}
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                    <i class="fa fa-bars"></i>
                  </button>
                </div>

                <div class="collapse navbar-collapse" id="navbar-collapse">
                  <ul class="nav navbar-nav">

                    {{-- <li><a href="{{URL::to('/')}}" target="_blank">{{t('View')}} {{t('site')}}</a></li> --}}


                  {{--   <li class="dropdown notifications-menu">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o"></i>
                        <span class="label label-warning">10</span>
                      </a>
                      <ul class="dropdown-menu  dropdown-menu-right">
                        <li class="header">You have 10 notifications</li>
                        <li>
                          <ul class="menu">
                            <li>
                              <a href="#">
                                <i class="fa fa-users text-aqua"></i> 5 new members joined today
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li class="footer"><a href="#">View all</a></li>
                      </ul>
                    </li>

                    <li class="dropdown tasks-menu">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-flag-o"></i>
                        <span class="label label-danger">9</span>
                      </a>
                      <ul class="dropdown-menu  dropdown-menu-right">
                        <li class="header">You have 9 tasks</li>
                        <li>
                          <ul class="menu">
                            <li>
                              <a href="#">
                                <h3>
                                  Design some buttons
                                  <small class="pull-right">20%</small>
                                </h3>
                                <div class="progress xs">
                                  <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                    <span class="sr-only">20% Complete</span>
                                  </div>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li class="footer">
                          <a href="#">View all tasks</a>
                        </li>
                      </ul>
                    </li> --}}

                      @if (auth()->user()->isSuper())

                        <li class="dropdown  {{sidebarMenuState('media')}} {{sidebarMenuState('media','bulkupload')}}  {{sidebarMenuState('media')}} {{sidebarMenuState('tags')}} {{sidebarMenuState('media','bulkupload')}} {{sidebarMenuState('companycategories')}}" >
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cloud"></i>&nbsp;&nbsp;Contenidos <span class="caret"></span></a>
                          <ul class="dropdown-menu" role="menu">
                            <li class="{{sidebarMenuState('companycategories')}}"><a href="{{ route('admin.companycategories') }}"><i class="fa fa-industry"></i>Rubros</a></li>
                            <li class="{{sidebarMenuState('tags','default')}}"><a href="{{ route('admin.tags') }}"><i class="fa fa-tags"></i> {{ t('Tags') }}</a></li>
                            <li class="divider"></li>
                            <li class="{{sidebarMenuState('media')}}"><a href="{{ route('admin.media', ['type' => 'image']) }}"><i class="fa fa-image"></i>Lista de archivos media</a></li>
                            <li class="{{sidebarMenuState('bulkupload')}}"><a href="{{ route('admin.media.bulkupload', ['type' => 'image']) }}"><i class="fa fa-upload"></i>Subir multiples archivos media</a></li>
                            <li class="divider"></li>
                            <li class="{{sidebarMenuState('settings','translations')}}"><a href="{{ route('admin.settings.translations') }}"><i class="fa fa-language"></i>{{ t('Translations') }}</a></li>
                          </ul>
                        </li>

                        <li class="dropdown {{sidebarMenuState('sectioncontents')}} {{sidebarMenuState('grids')}}  {{sidebarMenuState('sectiontypes')}} " >
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cubes"></i>&nbsp;&nbsp;Estructura <span class="caret"></span></a>
                          <ul class="dropdown-menu" role="menu">
                            <li class="{{sidebarMenuState('grids','default')}}"><a href="{{ route('admin.grids') }}"><i class="fa fa-th"></i> Grillas Compartidas</a></li>
                            <li class="divider"></li>
                            <li class="{{sidebarMenuState('sectiontypes')}}"><a href="{{ route('admin.sectiontypes') }}"><i class="fa fa-th-large"></i>Tipos de bloques de grilla</a></li>
                            <li class="{{sidebarMenuState('sectioncontents')}}"><a href="{{ route('admin.sectioncontents') }}"><i class="fa fa-square"></i>Tipos de contenido de grilla</a></li>
                            <li class="divider"></li>
                            <li class="{{sidebarMenuState('contents','default')}}"><a href="{{ route('admin.contents') }}"><i class="fa fa-th-list"></i> Modulos de contenido</a></li>
                          </ul>
                        </li>

                        <li class="dropdown">
                          <a href="#" class="dropdown-toggle {{sidebarMenuState('users')}}" data-toggle="dropdown"><i class="fa fa-user"></i>&nbsp;&nbsp;Usuarios <span class="caret"></span></a>
                          <ul class="dropdown-menu" role="menu">
                          <li class="{{sidebarMenuState('users','add')}}"><a href="{{ route('admin.users.add') }}"><i class="fa fa-plus"></i> Nuevo Usuario</a></li>
                            {{-- <li class=""><a href="{{ route('admin.users', ['type' => 'approved']) }}"><i class="fa fa-reorder"></i> {{ t('Approved') }}</a></li> --}}
                            {{-- <li class=""><a href="{{ route('admin.users', ['type' => 'approvalRequired']) }}"><i class="fa fa-legal"></i> {{ t('Pending') }}</a></li> --}}
                            {{-- <li class=""><a href="{{ route('admin.users', ['type' => 'banned']) }}"><i class="fa fa-ban"></i> {{ t('Banned') }}</a></li> --}}
                            <li class="divider"></li>
                            <li class=""><a href="{{ route('admin.users') }}"><i class="fa fa-reorder"></i> Usuarios</a></li>
                            <li class="{{sidebarMenuState('profiles')}}"><a href="{{ route('admin.profiles') }}"><i class="fa fa-group"></i>{{ t('Profiles') }}</a></li>
                          </ul>
                        </li>


                        <li class="dropdown {{sidebarMenuState('settings')}}" >
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cog"></i>&nbsp;&nbsp;Configuración <span class="caret"></span></a>
                          <ul class="dropdown-menu dropdown-menu-right" role="menu">
                             <li class="{{sidebarMenuState('pages','default')}}"><a href="{{ route('admin.pages') }}"><i class="fa fa-tv"></i> {{ t('Pages') }}</a></li>
                             <li class="divider"></li>
                               {{-- <li class="{{sidebarMenuState('settings','details')}}"><a href="{{ route('admin.settings.details') }}"><i class="fa fa-circle-o"></i>{{ t('Details') }}</a></li> --}}
                            {{-- <li class="{{sidebarMenuState('settings','limits')}}"><a href="{{ route('admin.settings.limits') }}"><i class="fa fa-circle-o"></i>{{ t('Limits') }}</a></li> --}}
                            <li class="{{sidebarMenuState('settings','cache')}}"><a href="{{ route('admin.settings.cache') }}"><i class="fa fa-times-rectangle"></i>Limpiar Caché</a></li>
                            {{-- <li class="{{sidebarMenuState('settings','sitemap')}}"><a href="{{ route('admin.settings.sitemap') }}"><i class="fa fa-circle-o"></i>{{ t('Sitemap') }}</a></li> --}}
                          </ul>
                        </li>

                      @endif



{{--
                      <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                          <img src="{{ Resize::img(auth()->user()->avatar,'user128') }}" class="user-image" alt="{{ auth()->user()->username }}">
                          <span class="hidden-xs" style="position:relative;top:-1px">{{ auth()->user()->fullname }}</span>
                        </a>
                        <ul class="dropdown-menu  dropdown-menu-right">
                          <li class="user-header">
                            <img src="{{ Resize::img(auth()->user()->avatar,'user128') }}" class="img-circle" alt="{{ auth()->user()->username }}">
                            <p>
                              {{ auth()->user()->fullname }}
                              <small>{{ auth()->user()->username }}</small>
                            </p>
                          </li>
                          <li class="user-body">
                              @foreach(auth()->user()->profiles as $p)
                                  <div class="text-center">
                                    <a href="#" target="_blank">{{$p->title}}</a>
                                  </div>
                              @endforeach
                          </li>
                          <li class="user-footer">
                            <div class="pull-left">
                              <a href="{{ route('users.settings') }}" class="btn btn-success btn-flat">Configuración</a>
                            </div>
                            <div class="pull-right">
                              <a href="{{ route('logout') }}" class="btn btn-default btn-flat">{{ t('Logout') }}</a>
                            </div>
                          </li>
                        </ul>
                      </li> --}}



                    </ul>

                </div>


              </div>

        </nav>
    </header>

    <aside class="main-sidebar ">
        <div id="sidebar_container" class="sticky-parent">
          @include('admin/master/sidebar')
        </div>
    </aside>

    <div class="content-wrapper">
  {{--       <section class="content-header">
            @if(isset($title))
              <h1>{{ $title }} @if(Request::is('admin')) <small>Version {{ config('version.version') }}</small>@endif</h1>
            @endif
        </section> --}}
        <section class="content">
            @yield('content')
        </section>
    </div>

    @include ('admin/master/footer')
    <div class="control-sidebar-bg"></div>


</div>
</body>
</html>

@yield('extra-js')
