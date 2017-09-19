@extends('master/index')

@section('meta')

   <meta name="description" content="{!! $page->getDescription() !!}">
   <meta name="keywords" content="{!! $page->getKeywords() !!}">

   <meta property="og:title" content="{!! $page->title !!} - {!! siteSettings('siteName') !!}"/>
   <meta property="og:url" content="{{ Request::url() }}"/>
   <meta property="og:description" content="{!! $page->getOgDescription() !!}"/>
   <meta property="og:image" content="{{ $page->getOgImage() }}"/>

@overwrite

@section('head')




@endsection

@section('bodyClass', 'is_client')

@section('content')


<div class="intranet-spacer intranet-spacer-lg"></div>


<div id="intranet_portfolio_category" >


    <!-- GRID -->
    @if($page->grid)
        @foreach($page->grid->sections as $section)
            {!! $section->getHtml(false,true) !!}
        @endforeach
    @endif


    @if(count($items) > 0)

        <div class="container">
            <div class="row grid">

                @foreach($items as $p)
                    <div class="grid-item col-xs-12 col-sm-4 col-lg-3">
                        <a href="{{ $p->getLink() }}">
                            <h2 class="title">{{ $p->title }}</h2>
                            <img src="{{ Resize::img($p->main_image, $p->receipts['portfolioGridItem']) }}" />
                            <h3 class="job">{{ $p->job }}</h3>
                            <div class="overlay"></div>
                        </a>
                    </div>
                @endforeach

            </div>
        </div>


        <div id="images">


        </div>

    @endif


    <!-- SHARED GRIDS -->
    @if(sizeof($page->grids)>0)
        <section class="module">
            <ul id="sections">
                @foreach($page->grids as $grid)
                    @foreach($grid->sections as $section)
                        {!! $section->getHtml(false) !!}
                    @endforeach
                @endforeach
            </ul>
        </section>
    @endif



    <div class="intranet-spacer intranet-spacer-lg"></div>

</div>


@endsection



@section('extra-js')


    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/3.0.4/jquery.imagesloaded.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/masonry/3.2.2/masonry.pkgd.min.js"></script>

    <script>



        var $grid = $('.grid').masonry({
            itemSelector : '.grid-item'
        });

        $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
        });


        $(function(){

            $("#main_menu_portfolio").addClass('active');

            $("header").addClass("always small");





        });







    </script>

@endsection


