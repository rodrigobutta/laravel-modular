
<section class="sidebar sticky">

    <div class="user-panel ">
        <div class="pull-left image">
          <img src="{{ Resize::img(auth()->user()->avatar,'user128') }}" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{ auth()->user()->fullname }}</p>
          <a href="{{ route('users.settings') }}">{{t('Profile')}}</a>
          <a href="{{ route('logout') }}">{{t('Logout')}}</a>
        </div>
    </div>

    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
            <input type="text" name="search" class="form-control" placeholder="{{t('Search')}}..">
            <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
            </span>
        </div>
    </form>

    <ul class="sidebar-menu ">

        <li class="treeview">
            <a href="{{ url('admin') }}">
                <i class="fa fa-circle"></i>
                <span>Inicio</span>
            </a>
        </li>

        <li class="treeview">

            <a href="{{ route('admin.contacts.list') }}">
                <i class="fa fa-envelope-o"></i> Inbox
                @if(contactHasUnread())
                    <span class="label label-danger22 pull-right">{{ contactUnreadCount() }}</span>
                @endif
            </a>

            <a href="#">
                <i class="fa fa-inbox"></i>
                <span>Inbox</span>
                @if(contactHasUnread())
                    <span class="label label-danger pull-right">{{ contactUnreadCount() }}</span>
                @endif
            </a>
            <ul class="treeview-menu">
                <li>
                    <a href="{{ route('admin.contacts.list') }}">
                        <i class="fa fa-envelope-o"></i> Todos
                        @if(contactHasUnread())
                            <span class="label label-danger22 pull-right">{{ contactUnreadCount() }}</span>
                        @endif
                    </a>
                </li>
                  <li class="{{sidebarMenuState('contacts',null,'contact')}}">
                    <a href="{{ route('admin.contacts.list', ['type' => 'contact']) }}">
                        <i class="fa fa-pencil-square-o"></i> Formulario
                        @if(contactContactHasUnread())
                            <span class="label label-danger22 pull-right">{{ contactContactUnreadCount() }}</span>
                        @endif
                    </a>
                </li>



            </ul>
        </li>



         <li class="header">ADMINISTRACION</li>



        @foreach($custom_menu as $custom)
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-{{ $custom->icon }}"></i>
                    <span>{{ $custom->name }}</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    @foreach($custom->custom as $item)
                        <li class=""><a href="{{ route($item->route) }}"><i class="fa fa-{{ $item->icon }}"></i> {{ $item->name }}</a></li>
                    @endforeach
                    @foreach($custom->pages as $item)
                        <li class=""><a href="{{ route('admin.pages.edit', [$item->id]) }}"><i class="fa fa-cog"></i> Configuración {{ $custom->name!=$item->title?$item->title:'' }}</a></li>
                        @if($item->grid)
                            <li class=""><a href="{{ route('admin.grids.live', [$item->grid->id]) }}" target="_blank"><i class="fa fa-th-large"></i> {{ t('Grid')}} {{ $custom->name!=$item->title?$item->title:'' }}</a></li>
                        @endif
                    @endforeach
                    @foreach($custom->contents as $item)
                        <li class=""><a href="{{ route('admin.contents.value', [$item->id]) }}"><i class="fa fa-file-text-o"></i> {{ $item->title }}</a></li>
                    @endforeach
                    @foreach($custom->grids as $item)
                        <li class=""><a href="{{ route('admin.grids.live', [$item->id]) }}" target="_blank"><i class="fa fa-th"></i> {{ $item->title }}</a></li>
                    @endforeach

                </ul>
            </li>
        @endforeach

    </ul>

</section>

<script type="text/javascript">

    $(function () {


        $('input[name="search"]').autocomplete({
          source: function( request, response ) {

            $.ajax({
              url: "{{ route('admin.service.dashboard.search') }}",
              dataType: "json",
              data: {
                q: request.term
              },
              success: function( data ) {
                // console.log(data);
                response( data );
              }
            });

          },
          minLength: 2,
          select: function( event, ui ) {
            window.location.href = ui.item.value;
          }
        });


        // auto active de menu y submenu en base a url

        $(".sidebar-menu li a").each(function(){
            var href = $(this).attr("href");
            var url = window.location.href;
            url1 = url.split("/").splice(0, 5).join("/"); // no da bola a parametros posteriores a sub sub categoria de url
            url2 = url.split("/").splice(0, 7).join("/"); // no da bola a parametros posteriores a sub sub categoria de url
            if(url1==href || url2==href){
                $(this).closest("li").addClass("active");
            }
        })

        $(".sidebar-menu li.treeview").each(function(){
            if($(this).find('li.active').length > 0){
                $(this).addClass("active");
            }
        })

        // fin autoactive



    });

</script>
