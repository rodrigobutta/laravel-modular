@extends('master/index')

@section('meta')

   <meta name="description" content="{!! $page->getDescription() !!}">
   <meta name="keywords" content="{!! $page->getKeywords() !!}">

   <meta property="og:title" content="{!! siteSettings('siteName') !!}"/>
   <meta property="og:url" content="{{ Request::url() }}"/>
   <meta property="og:description" content="{!! $page->getOgDescription() !!}"/>
   <meta property="og:image" content="{{ $page->getOgImage() }}"/>

@overwrite

@section('bodyClass', 'is_client')

@section('content')

    <div id="intranet_taskos">

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

                <div class="intranet-spacer intranet-spacer-md"></div>

                <div class="container-fluid tasko-title" id="{{ $p->slug }}">
                  <div class="container">
                    <div class="row ">
                      <div class="col-md-4 sticky-parent">
                          <figure class="sticky">
                            <a href="#">
                              <img class="img-responsive" src="{{ Resize::img($p->main_image, $p->receipts['clientFrontList']) }}" alt="{{ $p->title }}">
                            </a>
                          </figure>
                      </div>
                        <div class="col-md-8 ">
                          {!! $p->info->brief !!}
                          <p><a href="{{ $p->info->website }}" target="_blank" rel="nofollow" class="btn btn-solid btn-md">Conocé Más</a></p>
                      </div>
                    </div>
                  </div>
                </div>

              @endforeach

            </div>

        @endif

        <div class="intranet-spacer intranet-spacer-md"></div>

  </div>

@endsection



@section('extra-js')

  <script>

    $(function(){

        $("#main_menu_emprendimientos").addClass('active');

    });

  </script>

@endsection


