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

     .category-full-subcategories ul ul{
      padding-left: 25px;
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

     .tasks_table {
         margin-bottom: 10px;
     }

     .tasks_table tr td {
         padding: 21px 25px;
     }

     .tasks_table tr:first-child {
         border-bottom: 0px solid #d2d2d2;
     }

   </style>
   {!! HTML::script('resources/assets/vendor/custombox/dist/custombox.min.js') !!}
   {!! HTML::style('resources/assets/vendor/custombox/dist/custombox.min.css') !!}
   {!! HTML::script('resources/assets/vendor/custombox/dist/custombox.legacy.min.js') !!}
@endsection

@section('bodyClass', 'is_task')

@section('content')
    <!-- MOBILE family.blade.php -->

    <div class="breadcrumbs" data-spy="affix" data-offset-top="83">
        <div class="wrapper ">
            <ol>
              <li><a href="{{ route('tasks.'.$action) }}">{{ actionDecorator($action) }}</a></li>

            </ol>
            <a class="contacto" href="{{route('contact')}}">Contactanos</a>
        </div>
    </div>
    <div class="wrapper {{$filters ? 'with_filters': '' }}">
        <div class="component w8 h4 full-md">
            <div class="slider family">
                <!-- SLIDE START -->
                <div class="slide">
                    <div class="titulo">{!! $item->info->cover_title !!}</div>
                    <div class="imagen">
                        <img src="{{ Resize::img($item->info->cover_main_image, 'familyHome')  }}" alt="">
                    </div>
                    <div class="copy">
                        {!! $item->info->cover_copy_text !!}<br>
                    </div>

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

                    @if($item->info->cover_copy_link && $item->info->cover_copy_link!='')
                    <a href="{{ $item->info->cover_copy_link }}" class="cta">Me interesa saber más...</a>
                    @endif
                </div>
                <!-- SLIDE END -->
            </div>
        </div>
    </div>

    <!-- FORM -->
    @if($item->form_top)
      <div class="task-form-container">
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'category', 'category_id' => $item->id, 'boxed' => true])
        </div>
        </div>
    @endif

    <!-- GRID -->
    @if($item->grid)
        @foreach($item->grid->sections as $section)
            {!! $section->getHtml(false,true) !!}
        @endforeach
    @endif

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
    @if(sizeof($childs)>0)
      <div class="wrapper">
          @foreach($childs as $i)

              <div class="component w4 h3">

                  <div class="image">
                      <a href="{{ $i->getLink($action) }}" target="{{ $i->getLinkTarget() }}" class="cta">
                          <img src="{{ Resize::img($i->main_image, 'taskFamilyList')  }}" alt="{{ $i->name }}">
                      </a>
                  </div>
                  <div class="text">
                      <h4 class="title">{{ $i->name }}</h4>
                      <a href="{{ $i->getLink($action) }}" target="{{ $i->getLinkTarget() }}" class="cta">Me interesa saber más...</a>
                  </div>
              </div>
          @endforeach

      </div>
      @endif

      @if(count($tasks) > 0)


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
          </div>
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
      @endif

    @endif


    <!-- SHARED GRIDS -->
    @if( sizeof($item->grids) > 0)

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

    {{-- TODO REB HARCODED!!! 222 --}}
    {{-- <div class="wrapper listados">
        @if($item->id == 1)
            <a href="{{ route('tasks.'.$action) .'/compresores-de-aire/portatiles' }}" class="viewall cta">Ver listado completo de equipos Portatiles</a>
            <a href="{{ route('tasks.'.$action) .'/compresores-de-aire/electricos-estacionarios?list'}}" class="viewall cta">Ver listado completo de Eléctricos estacionarios</a>
        @else
            <a href="{{ route('tasks.'.$action) .'/'. $item->slug . '?list'}}" class="viewall cta">Ver listado completo de {{$item->name}}</a>
        @endif
    </div> --}}

    @if(isset($item->info->doc1_file) && $item->info->doc1_file !== '' || isset($item->info->doc2_file) && $item->info->doc2_file !== '' || isset($item->info->doc3_file) && $item->info->doc3_file !== '')
    <div class="wrapper descargas">
        @if(isset($item->info->doc1_file) && $item->info->doc1_file !== '')
            <a class="download-item Lista {{$item->slug}}" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->doc1_file)) }}">
                <div class="icon {{ $mobile_class }}">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 98.7 102.1" style="enable-background:new 0 0 98.7 102.1;" xml:space="preserve">
                      <style type="text/css">
                        .st0{fill:#008657;}
                      </style>
                      <path class="st0" d="M67.9,48.3c-0.7-0.3-1.3-0.5-2-0.6V35.2c0-1-0.8-1.8-1.8-1.8H33.1c-1,0-1.8,0.8-1.8,1.8v22.3
                        c0,0.3,0.1,0.5,0.2,0.7h-2.7c-0.2,0-0.3,0.1-0.4,0.2c-0.1,0.1-0.1,0.3-0.1,0.4l0.6,3.5c0,0.2,0.3,0.4,0.5,0.4h25.1
                        c1.7,3.5,5.3,5.9,9.5,5.9c5.8,0,10.6-4.7,10.6-10.6C74.5,53.8,71.9,50,67.9,48.3z M32.3,35.2c0-0.4,0.3-0.7,0.7-0.7h31.1
                        c0.4,0,0.7,0.3,0.7,0.7v12.4c-0.3,0-0.6,0-0.9,0c-5.3,0-9.8,4-10.5,9.3c-0.1,0.4-0.1,0.9-0.1,1.3c0,0,0,0,0,0.1H33.1
                        c-0.4,0-0.7-0.3-0.7-0.7V35.2L32.3,35.2z M29.8,61.8l-0.4-2.5h24c0.1,0.9,0.3,1.7,0.6,2.5H29.8z M63.9,67.7c-5.3,0-9.5-4.3-9.5-9.5
                        c0-0.4,0-0.8,0.1-1.2c0.6-4.8,4.7-8.3,9.5-8.3c1.2,0,2.4,0.2,3.6,0.7c3.6,1.5,6,4.9,6,8.8C73.5,63.4,69.2,67.7,63.9,67.7z
                         M67.5,58.6l-3,3v-8.2c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5v8.2l-3-3c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7
                        l3.9,3.9c0,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0,0.2,0c0,0,0,0,0,0h0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0l3.9-3.9
                        c0.2-0.2,0.2-0.5,0-0.7C68,58.4,67.7,58.4,67.5,58.6z M51.8,60h-6.5c-0.3,0-0.5,0.2-0.5,0.5S45,61,45.3,61h6.5
                        c0.3,0,0.5-0.2,0.5-0.5C52.4,60.2,52.1,60,51.8,60z M48.6,36.9c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8
                        C47.8,36.6,48.2,36.9,48.6,36.9z"/>
                      </svg>
                </div>
                <h6>Descargar</h6>
                <div class="text">{{ $item->info->doc1_name }}</div>
            </a>
        @endif

        @if(isset($item->info->doc2_file) && $item->info->doc2_file !== '')
            <a class="download-item Lista {{$item->slug}}" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->doc2_file)) }}">
                <div class="icon {{ $mobile_class }}">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 98.7 102.1" style="enable-background:new 0 0 98.7 102.1;" xml:space="preserve">
                      <style type="text/css">
                        .st0{fill:#008657;}
                      </style>
                      <path class="st0" d="M67.9,48.3c-0.7-0.3-1.3-0.5-2-0.6V35.2c0-1-0.8-1.8-1.8-1.8H33.1c-1,0-1.8,0.8-1.8,1.8v22.3
                        c0,0.3,0.1,0.5,0.2,0.7h-2.7c-0.2,0-0.3,0.1-0.4,0.2c-0.1,0.1-0.1,0.3-0.1,0.4l0.6,3.5c0,0.2,0.3,0.4,0.5,0.4h25.1
                        c1.7,3.5,5.3,5.9,9.5,5.9c5.8,0,10.6-4.7,10.6-10.6C74.5,53.8,71.9,50,67.9,48.3z M32.3,35.2c0-0.4,0.3-0.7,0.7-0.7h31.1
                        c0.4,0,0.7,0.3,0.7,0.7v12.4c-0.3,0-0.6,0-0.9,0c-5.3,0-9.8,4-10.5,9.3c-0.1,0.4-0.1,0.9-0.1,1.3c0,0,0,0,0,0.1H33.1
                        c-0.4,0-0.7-0.3-0.7-0.7V35.2L32.3,35.2z M29.8,61.8l-0.4-2.5h24c0.1,0.9,0.3,1.7,0.6,2.5H29.8z M63.9,67.7c-5.3,0-9.5-4.3-9.5-9.5
                        c0-0.4,0-0.8,0.1-1.2c0.6-4.8,4.7-8.3,9.5-8.3c1.2,0,2.4,0.2,3.6,0.7c3.6,1.5,6,4.9,6,8.8C73.5,63.4,69.2,67.7,63.9,67.7z
                         M67.5,58.6l-3,3v-8.2c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5v8.2l-3-3c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7
                        l3.9,3.9c0,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0,0.2,0c0,0,0,0,0,0h0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0l3.9-3.9
                        c0.2-0.2,0.2-0.5,0-0.7C68,58.4,67.7,58.4,67.5,58.6z M51.8,60h-6.5c-0.3,0-0.5,0.2-0.5,0.5S45,61,45.3,61h6.5
                        c0.3,0,0.5-0.2,0.5-0.5C52.4,60.2,52.1,60,51.8,60z M48.6,36.9c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8
                        C47.8,36.6,48.2,36.9,48.6,36.9z"/>
                      </svg>
                </div>
                <h6>Descargar</h6>
                <div class="text">{{ $item->info->doc2_name }}</div>
            </a>
        @endif

        @if(isset($item->info->doc3_file) && $item->info->doc3_file !== '')
            <a class="download-item Lista {{$item->slug}}" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->doc3_file)) }}">
                <div class="icon {{ $mobile_class }}">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 98.7 102.1" style="enable-background:new 0 0 98.7 102.1;" xml:space="preserve">
                      <style type="text/css">
                        .st0{fill:#008657;}
                      </style>
                      <path class="st0" d="M67.9,48.3c-0.7-0.3-1.3-0.5-2-0.6V35.2c0-1-0.8-1.8-1.8-1.8H33.1c-1,0-1.8,0.8-1.8,1.8v22.3
                        c0,0.3,0.1,0.5,0.2,0.7h-2.7c-0.2,0-0.3,0.1-0.4,0.2c-0.1,0.1-0.1,0.3-0.1,0.4l0.6,3.5c0,0.2,0.3,0.4,0.5,0.4h25.1
                        c1.7,3.5,5.3,5.9,9.5,5.9c5.8,0,10.6-4.7,10.6-10.6C74.5,53.8,71.9,50,67.9,48.3z M32.3,35.2c0-0.4,0.3-0.7,0.7-0.7h31.1
                        c0.4,0,0.7,0.3,0.7,0.7v12.4c-0.3,0-0.6,0-0.9,0c-5.3,0-9.8,4-10.5,9.3c-0.1,0.4-0.1,0.9-0.1,1.3c0,0,0,0,0,0.1H33.1
                        c-0.4,0-0.7-0.3-0.7-0.7V35.2L32.3,35.2z M29.8,61.8l-0.4-2.5h24c0.1,0.9,0.3,1.7,0.6,2.5H29.8z M63.9,67.7c-5.3,0-9.5-4.3-9.5-9.5
                        c0-0.4,0-0.8,0.1-1.2c0.6-4.8,4.7-8.3,9.5-8.3c1.2,0,2.4,0.2,3.6,0.7c3.6,1.5,6,4.9,6,8.8C73.5,63.4,69.2,67.7,63.9,67.7z
                         M67.5,58.6l-3,3v-8.2c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5v8.2l-3-3c-0.2-0.2-0.5-0.2-0.7,0c-0.2,0.2-0.2,0.5,0,0.7
                        l3.9,3.9c0,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0,0.2,0c0,0,0,0,0,0h0c0.1,0,0.1,0,0.2,0c0,0,0.1,0,0.1-0.1c0,0,0,0,0,0l3.9-3.9
                        c0.2-0.2,0.2-0.5,0-0.7C68,58.4,67.7,58.4,67.5,58.6z M51.8,60h-6.5c-0.3,0-0.5,0.2-0.5,0.5S45,61,45.3,61h6.5
                        c0.3,0,0.5-0.2,0.5-0.5C52.4,60.2,52.1,60,51.8,60z M48.6,36.9c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8
                        C47.8,36.6,48.2,36.9,48.6,36.9z"/>
                      </svg>
                </div>
                <h6>Descargar</h6>
                <div class="text">{{ $item->info->doc3_name }}</div>
            </a>
        @endif
    </div>

      <div id="download-modal" class="component download-modal">
        <a href="javascript:void(0);" onclick="Custombox.modal.close();" class="close"><img src="{{ URL::to('/')}}/public/img/close-download.png"/></a>
        <h3>Completá tus datos para iniciar la descarga</h3>
        @include('master/form', ['extended' => false, 'type' => 'download', 'category_id' => $item->id])
      </div>
    @endif


    <!-- FORM -->
    @if($item->form_bottom)
    <div class="task-form-container">
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'category', 'category_id' => $item->id, 'boxed' => true])
        </div>
        </div>
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

                $('html, body').animate({
                    scrollTop: $("#list").offset().top - 220
                }, 600);

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
