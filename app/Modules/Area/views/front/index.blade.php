@extends('master/index')

@section('meta')

   <meta name="description" content="{!! $page->getDescription() !!}">
   <meta name="keywords" content="{!! $page->getKeywords() !!}">

   <meta property="og:title" content="{!! siteSettings('siteName') !!}"/>
   <meta property="og:url" content="{{ Request::url() }}"/>
   <meta property="og:description" content="{!! $page->getOgDescription() !!}"/>
   <meta property="og:image" content="{{ $page->getOgImage() }}"/>

@overwrite

@section('bodyClass', 'is_area')

@section('content')

    <div id="intranet_servicios">


        {{-- GRID --}}
        @if($page->grid)
            @foreach($page->grid->sections as $section)
                {!! $section->getHtml(false,true) !!}
            @endforeach
        @endif


        {{--  ITEMS  --}}
        @if(count($items) > 0)

            <div class="container">

              @foreach($items as $key=>$p)

                 {{--  @if ($key % 2 == 0) --}}

                <div id="{{ $p->slug }}" class="intranet-spacer intranet-spacer-md"></div>
                 <div class="row full-height-parent window-height item">
                   <div class="col-lg-6 col-md-6 hidden-xs  fuga fuga-left full-height-child">
                     <img src="{{ Resize::img($p->main_image, $p->receipts['areaFrontList']) }}" />
                   </div>
                   <div class="col-lg-6 col-md-6 col-sm-12" >
                       <h2>{{ $p->title }}</h2>
                       {!! $p->info->brief !!}
                   </div>
                </div>

                  {{-- @else --}}
                  {{-- @endif --}}


              @endforeach

            </div>

        @endif

        <div class="intranet-spacer intranet-spacer-md"></div>

  </div>

@endsection



@section('extra-js')

  <script>

    $(function(){

        $("#main_menu_servicios").addClass('active');

    });

  </script>

@endsection


