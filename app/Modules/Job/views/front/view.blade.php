@extends('master/index')

@section('meta')

    <meta name="description" content="{!! $item->getDescription() !!}">
    <meta name="keywords" content="{!! $item->getKeywords() !!}">

    <meta property="og:title" content="{!! str_replace('"', '', strip_tags($item->title)) !!} - {!! siteSettings('siteName') !!}"/>
    <meta property="og:url" content="{{ Request::url() }}"/>
    <meta property="og:description" content="{!! str_replace('"', '', $item->getOgDescription()) !!}"/>
    <meta property="og:image" content="{{ $item->getOgImage() }}"/>

@overwrite

@section('bodyClass', 'is_job')

@section('content')


<div id="intranet_job_item" >

    <div class="intranet-spacer intranet-spacer-lg"></div>

     <div class="breadcrumbs">
        <div class="wrapper">
            <ol>
                <li><a href="{{ route('job.index') }}">Job</a></li>
                @foreach($breadcrumb as $l)
                <li><a href="{{ $l->link }}" target="{{ $l->target }}">{{ $l->title }}</a></li>
                @endforeach
                <li>{{ $item->title }}</li>
            </ol>
        </div>
    </div>



    @if(sizeof($childs)>0)
      <ul>
       @foreach($childs as $i)
           <li>
               <a href="{{ $i->getLink() }}" target="{{ $i->getLinkTarget() }}">
                   <h4 class="title">{{ $i->title }}</h4>
               </a>
           </li>
       @endforeach
       </ul>
    @endif




    <div class="container">
        <div class="row">
            <div class="col-md-6 sticky-parent">
                <div id="details" class="sticky">
                    <h1 class="title">{!! $item->title !!}</h1>
                    <p>{!! $item->info->brief !!}</p>
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


    <div class="intranet-spacer intranet-spacer-lg"></div>


</div>


@endsection


@section('extra-js')

    {!! HTML::script('resources/assets/vendor/fixto/dist/fixto.min.js') !!}

    <script>

        $(function(){

            $("#main_menu_job").addClass('active');

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

