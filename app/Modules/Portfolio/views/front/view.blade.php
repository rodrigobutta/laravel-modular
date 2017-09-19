@extends('master/index')

@section('meta')

    <meta name="description" content="{!! $item->getDescription() !!}">
    <meta name="keywords" content="{!! $item->getKeywords() !!}">

    <meta property="og:title" content="{!! str_replace('"', '', strip_tags($item->title)) !!} - {!! siteSettings('siteName') !!}"/>
    <meta property="og:url" content="{{ Request::url() }}"/>
    <meta property="og:description" content="{!! str_replace('"', '', $item->getOgDescription()) !!}"/>
    <meta property="og:image" content="{{ $item->getOgImage() }}"/>

@overwrite

@section('bodyClass', 'is_portfolio')

@section('content')


<div id="intranet_portfolio_item" >

    <div class="intranet-spacer intranet-spacer-lg"></div>

    {{--  <div class="breadcrumbs" data-spy="affix" data-offset-top="83">
        <div class="wrapper">
            <ol>
                <li><a href="{{ URL::to('/') }}">Portfolio</a></li>
                @foreach($breadcrumb as $l)
                <li><a href="{{ $l->link }}" target="{{ $l->target }}">{{ $l->name }}</a></li>
                @endforeach
                <li>{{ $item->title }}</li>
            </ol>
        </div>
    </div>  --}}

{{--
    @if ($item->info->cover_image)

        <div class="container-fluid">
            <div class="row">
                <div class="cover" style="background-image: url({{ Resize::img($item->info->cover_image, 'coverClient')  }});">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h1 class="title">{!! $item->info->cover_title !!}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    @else  --}}

        {{--  <div class="container">
            <div class="row">
                <div class="col-md-8 col-sm-6 col-xs-12">
                    <h1 class="title">{!! $item->info->cover_title !!}</h1>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12 text-right">
                    <a class="btn btn-primary full-width-xs" href="{{ route('portfolio.index') }}">volver al portfolio</a>
                </div>
            </div>
        </div>  --}}

    {{--  @endif  --}}



    <div class="container">
        <div class="row">
            <div class="col-md-6 sticky-parent">
                <div id="details" class="sticky">
                    <h1 class="title">{!! $item->title !!}</h1>
                    <p>{!! $item->info->brief !!}</p>

                     <!-- DESCARGAS -->
                    @if($item->info->manuales != '' || $item->info->flyer != '')

                        <div id="downloads">

                            @if($item->info->manuales != '')
                                <a class="download-button button-outline push-left" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->manuales)) }}">
                                    Descargar {{$item->info->manuales_label}}
                                </a>
                            @endif

                            @if($item->info->flyer != '')
                                <a class="download-button button-outline push-right" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->flyer)) }}">
                                    Descargar {{$item->info->flyer_label}}
                                </a>

                            @endif

                        </div>

                    @endif

                    <div class="intranet-spacer intranet-spacer-sm"></div>
                    <a class="btn btn-primary full-width-xs pull-right" href="{{ route('portfolio.index') }}">volver al portfolio</a>
                </div>
            </div>

            <div class="col-md-6">

                <!-- GRID -->
                @if($item->grid)
                    @foreach($item->grid->sections as $section)
                        {!! $section->getHtml(false,true) !!}
                    @endforeach
                @endif

            </div>
        </div>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <!-- SHARED GRIDS -->
                @if(sizeof($item->grids)>0)
                    <section class="module">
                        <ul id="sections">
                            @foreach($item->grids as $grid)
                                @foreach($grid->sections as $section)
                                    {!! $section->getHtml(false) !!}
                                @endforeach
                            @endforeach
                        </ul>
                    </section>
                @endif

            </div>
        </div>
    </div>





    {{--  <div class="intranet-spacer intranet-spacer-sm"></div>
     <div class="container">
        <div class="row">
            <div class="col-md-12 col-xs-12 text-right">
                <a class="btn btn-primary full-width-xs" href="{{ route('portfolio.index') }}">volver al portfolio</a>
            </div>
        </div>
    </div>  --}}

    <div class="intranet-spacer intranet-spacer-lg"></div>
    <!-- FORM -->
    {{--  @if($item->form_bottom)
        <div class="wrapper client-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'client', 'client_id' => $item->id, 'boxed' => true])
        </div>
    @endif  --}}


</div>



@endsection


@section('extra-js')

    {!! HTML::script('resources/assets/vendor/fixto/dist/fixto.min.js') !!}

    <script>

        $(function(){

            $("#main_menu_portfolio").addClass('active');

            $("header").addClass("always small");

            $(".sticky").fixTo('.sticky-parent', {
                // className : 'my-class-name',
                zIndex: 10,
                useNativeSticky: false,
                top: $('header').height() + 20
            });

            function imagesLoaded() {

                $('.sticky-parent').each(function(){
                    $(this).css({'height':$(this).closest(".row").height()});
                })

            }
            $('img').each(function() {
                if( this.complete ) {
                    imagesLoaded.call( this );
                } else {
                    $(this).one('load', imagesLoaded);
                }
            });

        });

        Shadowbox.lang={code:"es",of:"de",loading:"cargando",cancel:"Cancelar",next:"Siguiente",previous:"Anterior",play:"Reproducir",pause:"Pausa",close:"Cerrar",errors:{single:'Debes instalar el plugin <a href="{0}">{1}</a> en el navegador para ver este contenido.',shared:'Debes instalar el <a href="{0}">{1}</a> y el <a href="{2}">{3}</a> en el navegador para ver este contenido.',either:'Debes instalar o bien el <a href="{0}">{1}</a> o el <a href="{2}">{3}</a> en el navegador para ver este contenido.'}};
        Shadowbox.init({
            handleOversize: "drag",
            modal: true
        });

    </script>

@endsection

