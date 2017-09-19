@extends('master/plain')

@section('meta')

   <meta name="description" content="{{ strlen($page->description) > 2 ? $page->description : siteSettings('description') }}">
   <meta name="keywords" content="{{ strlen($page->tags) > 2 ? $page->tags : siteSettings('tags') }}">

   <meta property="og:title" content="{{ $page->title }} - {{ siteSettings('siteName') }}"/>
   <meta property="og:type" content="article"/>
   <meta property="og:url" content="{{ Request::url() }}"/>
   <meta property="og:description" content="{{ $page->getOgDescription() }}"/>
   <meta property="og:page" content=""/>
   <meta property="og:image" content="{{ $page->getOgImage() }}"/>

@overwrite

@section('head')
   {!! HTML::style('public/css/covers.css') !!}
   {!! HTML::style('public/css/section.css') !!}
   {!! HTML::style('public/css/home.css') !!}
@endsection

@section('content')

   <h1>{{ $page->title }}</h1>

   <!-- PAGE GRID -->
   @if($page->grid)
      <section class="module">
         <ul id="sections">
            @foreach($page->grid->sections as $section)
               {!! $section->getHtml(false) !!}
            @endforeach
         </ul>
      </section>
   @endif

   <!-- SHARED GRIDS -->
   @if($page->grids)
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

@endsection

@section('extra-js')


   @if(Request::exists('screenshot'))


      {!! HTML::script('resources/assets/vendor/html2canvas/build/html2canvas.min.js') !!}

      <script>

           $(document).ready(function() {

               html2canvas(document.body, {
                 onrendered: function(canvas) {
                     // document.body.appendChild(canvas); // muestra la imagen en la pagina
                     var dataURL = canvas.toDataURL();

                     $.ajax({
                       type: "PUT",
                       url: "{{ route('admin.pages.screenshot',['id' => $page->id]) }}",
                       data: {
                          imgBase64: dataURL
                       }
                     }).done(function(data) {
                        console.log('screeenshot saved');
                     });

                 }
               });

           });

       </script>


   @endif


@endsection