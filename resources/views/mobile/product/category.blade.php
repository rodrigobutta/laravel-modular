@extends('master/index')

@section('meta')

   <meta name="description" content="{!! $item->getDescription() !!}">
   <meta name="keywords" content="{!! $item->getKeywords() !!}">

   <meta property="og:title" content="{!! $item->title !!} - {!! siteSettings('siteName') !!}"/>
   <meta property="og:url" content="{{ Request::url() }}"/>
   <meta property="og:description" content="{!! $item->getOgDescription() !!}"/>
   <meta property="og:image" content="{{ $item->getOgImage() }}"/>

@overwrite

@section('head')
   {!! HTML::style('public/css/_task_category.css') !!}
   {!! HTML::style('public/css/_task.css') !!}
   {!! HTML::style('public/css/_contacto.css') !!}



   <style>
     .category-full-subcategories ul{
      padding: 0px;
      margin: 0px;
      list-style-type: none;
      list-style: none;
     }

     .category-full-subcategories li{
      padding: 0px;
      margin: 0px;
     }

     #filter_loading{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255,255,255,0.8);
        z-index: 9000;
        display: none;
     }

     #filter_loading .fa{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -25px;
        color: #008657;
     }

   </style>



@endsection

@section('bodyClass', 'is_task')

@section('content')
  <!-- MOBILE category.blade.php -->

    <div class="breadcrumbs" data-spy="affix" data-offset-top="83">
        <div class="wrapper">
            <ol>

              <li><a href="{{ route('tasks.'.$action) }}">{{ actionDecorator($action) }}</a></li>

            </ol>
            <a class="contacto" href="{{route('contact')}}">Contactanos</a>
        </div>
    </div>

    @if($item->info->cover_main_image)
      <div class="hero" style="background-image: url({{ Resize::img($item->info->cover_main_image, 'familyHome')  }});">
          <div class="wrapper">
              <div class="vcenter">
                  <div class="content">
                      <h1 class="title">
                          @if($item->info->cover_title)
                              {!! $item->info->cover_title !!}
                          @else
                              {{ $item->name }}
                          @endif
                      </h1>
                  </div>
              </div>
          </div>
      </div>
    @else
      <div class="hero no-image">
          <div class="wrapper">
              <div class="vcenter">
                  <div class="content">
                      <h1 class="title">
                          @if($item->info->cover_title)
                              {!! $item->info->cover_title !!}
                          @else
                              {{ $item->name }}
                          @endif
                      </h1>
                  </div>
              </div>
          </div>
      </div>
    @endif

    <!-- Filter start -->
    @if($filters)

        <div id="filter_loading">
          <div class="fa fa-gear fa-3x fa-spin"></div>
        </div>

        {!! Form::open(array('method' => 'get', 'class' => 'filters')) !!}
            @foreach($filters as $filter)
                <div class="filter">
                    <span class="label">Seleccionar por <strong>{{ $filter->name }} [{{ $filter->unit }}]</strong></span>
                    <select name="{{ $filter->slug }}">
                        <option selected></option>
                        @foreach($filter->options as $option)
                            <option value="{{ $option->name }}" {{ isset($option->selected) ? "selected" : "" }}>{{ $option->label }}</option>
                        @endforeach
                    </select>
                </div>
            @endforeach
        {!! Form::close() !!}
    @endif
    <!-- Filter end -->

    <!-- FORM -->
    @if($item->form_top)
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'category', 'category_id' => $item->id, 'boxed' => true])
        </div>
    @endif

    <!-- GRID -->
    @if($item->grid)
        @foreach($item->grid->sections as $section)
            {!! $section->getHtml(false,true) !!}
        @endforeach
    @endif

{{-- TODO REB Resolver forma mas organica para este pedido de taskos de subs --}}
  {{--  @if($item->list)
      @foreach ($subcat_list as $subcat)
         @if(count($tasks_list[$subcat->id]) > 0)
            <table class="tasks_table no_hover">
                <thead data-spy="affix">
                    <tr>
                        <th class="spacer">&nbsp;</th>
                        <th>{{$subcat->name}}</th>
                        @foreach($subcat->listableProperties() as $p)
                        <th>{{ $p->name }}<br>{{ $p->unit }}</th>
                        @endforeach
                        <th class="spacer">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($tasks_list[$subcat->id] as $p)
                    <tr data-task-link="{{ $p->getLink() }}">
                        <td class="spacer">&nbsp;</td>
                        <td>{{ $p->sku }}</td>
                        @foreach($p->categoryProperties($item) as $prop)
                        <td>{{ $prop->value }}</td>
                        @endforeach
                        <td class="spacer">&nbsp;</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
         @endif
      @endforeach
   @else
    --}}




          @if($list_mode)

            <div class=' category-full-subcategories'>

                  <?php

                  // $categories = TaskCategory::orderBy('lft', 'asc')->get();

                  $curDepth = 0;
                  $counter = 0;

                  foreach ($full_subcategories as $category):
                  // foreach ($item->children as $category):
                    if ($category->depth == $curDepth)
                    {
                        if ($counter > 0) echo "</li>";
                    }
                    elseif ($category->depth > $curDepth)
                    {
                        echo "<ul>";
                        $curDepth = $category->depth;
                    }
                    elseif ($category->depth < $curDepth)
                    {
                        echo str_repeat("</li></ul>", $curDepth - $category->depth), "</li>";
                        $curDepth = $category->depth;
                    }

                    ?>
                    <li class="container-table-mobile" id='channel_{{ $category->id }}' data-id='{{ $category->id }}'>
                        @if(!$category->tasks->isEmpty())
                          <div class='row-static-mobile'>
                            <div class="column column-title start-row">
                           {{ $category->name }}
                            </div>
                            @foreach($category->tasks as $p)

                                  <div class="column" >
                                     <a href="{{$p->getLink()}}">{{ stringWrap($p->sku,15) }}</a>




                                  </div>

                            @endforeach
                          </div>
                        @else
                         <div class='row-static-mobile' style="width: 100%;">
                           <div class="column column-title start-row">
                           {{ $category->name }}
                            </div>
                         </div>
                        @endif



                        @if(!$category->tasks->isEmpty())

                          <div class="custom-controls next bx-next">
                            <svg version="1.1"  width="50" height="13" id="arrow-nexrt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 108.4 30.1" style="enable-background:new 0 0 108.4 30.1;" xml:space="preserve">
                               <path d="M107.5,14.9c0-0.3-0.2-0.8-0.4-1l-12-12.8c-0.6-0.6-1.5-0.6-2.1-0.1c-0.6,0.5-0.6,1.6-0.1,2.1l9.6,10.2H2.5
                               c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h100l-9.6,10.2c-0.5,0.6-0.5,1.6,0.1,2.1c0.6,0.6,1.6,0.5,2.1-0.1l12-12.8
                               C107.4,15.6,107.5,15.2,107.5,14.9z"/>
                            </svg>
                          </div>
                         @endif
                        <div class="slider-table-container">
                          @if(!$category->tasks->isEmpty())
                            @foreach($category->getListableProperties() as $p)
                              <div class="row-variable-mobile">
                                <span>{{ stringWrap( $p->name ." ". $p->unit,15) }}</span>

                              @foreach($category->tasks as $prod)

                                @foreach($prod->getListableProperties() as $prop)
                                  @if($p->id == $prop->id)
                                    <p>{{ stringWrap($prop->value,10)}}</p>
                                  @endif

                                @endforeach
                              @endforeach
                            </div>

                            @endforeach
                          @endif
                        </div>
                    <?php $counter++; ?>

                  <?php endforeach;

                  echo str_repeat("</li></ul>", $curDepth), "</li>";
                  ?>

            </div>

          @else

             @if(!$item->childs_no_image)
                <div class="wrapper">
                 @foreach($childs as $i)
                     <div class="component w4 h3">
                         <div class="image">
                             <a href="{{ $i->getLink($action) }}{{$static?'?static':''}}" target="{{ $i->getLinkTarget() }}">
                              <img src="{{ Resize::img($i->main_image, 'taskFamilyList')  }}" alt="{{ $i->name }}">
                             </a>
                         </div>
                         <div class="text">
                             <h4 class="title">{{ $i->name }}</h4>
                             <a href="{{ $i->getLink($action) }}{{$static?'?static':''}}" target="{{ $i->getLinkTarget() }}" class="cta">Me interesa saber mas...</a>
                         </div>
                     </div>
                 @endforeach
                 </div>
             @else
                 <table class="tasks_table categories">
                     <tbody>
                     @foreach($childs as $i)
                     <tr data-task-link="{{$i->getLink($action) }}{{$static?'?static':''}}">
                         <td class="spacer">&nbsp;</td>
                         <td>
                             <a href="{{ $i->getLink($action) }}{{$static?'?static':''}}" target="{{ $i->getLinkTarget() }}">{{ $i->name }}</a>
                         </td>
                         <td class="spacer">&nbsp;</td>
                     </tr>
                     @endforeach
                 </tbody>
             </table>
           @endif


            @if(count($tasks) > 0)


              <!--MOBILE FOREACH PRODUCT-->
              <div class="container-table-mobile">
                <div class="row-static-mobile">
                  <div class="column column-title start-row">
                    {{actionDecorator($action)}}
                  </div>
                  @foreach($tasks as $p)
                    <div class="column">
                      <a href="{{$p->getLink()}}">{{ stringWrap($p->sku,15) }}</a>
                    </div>
                  @endforeach
                </div>
                <div class="custom-controls next bx-next">
                  <svg version="1.1"  width="50" height="13" id="arrow-nexrt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 108.4 30.1" style="enable-background:new 0 0 108.4 30.1;" xml:space="preserve">
                     <path d="M107.5,14.9c0-0.3-0.2-0.8-0.4-1l-12-12.8c-0.6-0.6-1.5-0.6-2.1-0.1c-0.6,0.5-0.6,1.6-0.1,2.1l9.6,10.2H2.5
                     c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h100l-9.6,10.2c-0.5,0.6-0.5,1.6,0.1,2.1c0.6,0.6,1.6,0.5,2.1-0.1l12-12.8
                     C107.4,15.6,107.5,15.2,107.5,14.9z"/>
                  </svg>
                </a></div>
                <div class="slider-table-container">

                  @foreach($item->getListableProperties() as $p)

                    <div class="row-variable-mobile">
                      <span>{{ stringWrap( $p->name ." ". $p->unit,15) }} </span>

                        @foreach($tasks as $prod)

                          @foreach($prod->getListableProperties() as $prop)
                            @if($p->id == $prop->id)
                             <p>{{ stringWrap($prop->value,10)}}</p>
                            @endif

                          @endforeach
                        @endforeach

                    </div>

                  @endforeach

                </div>

              </div>


            {{-- </div> --}}
            @endif

          @endif





   {{-- @endif --}}

    <!-- FORM -->
    @if($item->form_bottom)
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'category', 'category_id' => $item->id, 'boxed' => true])
        </div>
    @endif


    <!-- SHARED GRIDS -->
    @if($item->grids)
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


@endsection



@section('extra-js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.js"></script>
<script>
  $(function() {

    $('.filter select').on('change', function(e) {
      $('#filter_loading').fadeIn(300);
      $(this).closest('form').submit();
    })

    if(window.location.href.indexOf('?') != -1){
      if(window.innerWidth > 1100){
        $('html, body').animate({
          scrollTop: $("#list").offset().top - 220
        }, 600);
      }
    }

    $('.list-group-item').each(function(){

      var table = $(this);
      if (!table.find('td').length) {
        table.remove();
      }

    });

    sliderTable = $('.slider-table-container').bxSlider();
    $('.bx-next').on('click',function(e){
      e.preventDefault();
      sliderTable.goToNextSlide();
    })

  });
</script>
@endsection









