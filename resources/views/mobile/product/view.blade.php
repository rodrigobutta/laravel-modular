@extends('master/index')

@section('meta')

    <meta name="description" content="{!! $item->getDescription() !!}">
    <meta name="keywords" content="{!! $item->getKeywords() !!}">

    <meta property="og:title" content="{!! str_replace('"', '', strip_tags($item->title)) !!} - {!! siteSettings('siteName') !!}"/>
    <meta property="og:url" content="{{ Request::url() }}"/>
    <meta property="og:description" content="{!! str_replace('"', '', $item->getOgDescription()) !!}"/>
    <meta property="og:image" content="{{ $item->getOgImage() }}"/>

@overwrite

@section('head')
    {!! HTML::style('public/css/_task.css') !!}
    {!! HTML::style('public/css/_contacto.css') !!}

    {!! HTML::script('public/js/_task.js') !!}

    {!! HTML::script('resources/assets/vendor/custombox/dist/custombox.min.js') !!}
    {!! HTML::style('resources/assets/vendor/custombox/dist/custombox.min.css') !!}
    {!! HTML::script('resources/assets/vendor/custombox/dist/custombox.legacy.min.js') !!}
@endsection

@section('bodyClass', 'is_task')

@section('content')

    <!-- task.view -->
    <div class="breadcrumbs" data-spy="affix" data-offset-top="83">
        <div class="wrapper">
            <ol>
                <li><a href="{{ URL::to('/') }}">Equipos</a></li>

                @foreach($breadcrumb as $l)
                <li><a href="{{ $l->link }}" target="{{ $l->target }}">{{ $l->name }}</a></li>
                @endforeach
                <li>{{ $item->title }}</li>
            </ol>
            <a class="contacto" href="{{route('contact')}}">Contactanos</a>
        </div>
    </div>

    @if ($item->info->cover_image)
    <div class="hero task" style="background-image: url({{ Resize::img($item->info->cover_image, 'coverTask')  }});">
        <div class="wrapper">
            <div class="vcenter">
                <div class="content">
                    <h1 class="title">{!! $item->info->cover_title !!}</h1>
                </div>
            </div>
        </div>
    </div>
    @else
    <div class="hero task no-image">
        <div class="wrapper">
            <div class="vcenter">
                <div class="content">
                    <h1 class="title">{!! $item->info->cover_title !!}</h1>
                </div>
            </div>
        </div>
    </div>
    @endif

    <!-- tabla -->
<!--    <div class="table-task-mobile">
        <div class="half-propeties">
           {{--  @foreach($item->fullProperties() as $prop)
                <p>{{ $prop->value }}</p>
            @endforeach
        </div>
        <div class="half-categories">
           @foreach($item->fullPropertiesChunks()[0] as $p)
                <p>{{ $p->label }} {{ $p->unit }}</p>
            @endforeach--}}
        </div>

    </div>-->

    <div class="table-task-mobile">
        @foreach($item->fullProperties() as $p)
            <div class="half-propeties">
                <p>{{$p->label}}</p>
            </div>
            <div class="half-categories">
               <p> {{$p->value}}<small class="unit">{{$p->unit}}</small> </p>
            </div>
        @endforeach



    </div>
    {{-- {{dd($item->fullPropertiesChunks())}} --}}



<!-- PROPERTIES -->
@if(count($item->fullPropertiesChunks()) > 1)
        <div class="extra_properties">
            <div class="wrapper">Más datos</div>
        </div>
        <div class="wrapper">
            <ul class="properties-list">
                @for ($i = 1; $i < count($item->fullPropertiesChunks()); $i++)
                @foreach($item->fullPropertiesChunks()[$i] as $p)
                    <li>
                        <div class="label">{{$p->label}}</div>
                        <div class="value">{{$p->value}} <div class="unit">{{$p->unit}}</div></div>

                    </li>
                @endforeach
                @endfor
            </ul>
        </div>
@endif

    <!-- FORM -->
    @if($item->form_top)
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'task', 'task_id' => $item->id, 'boxed' => true])
        </div>
    @endif


    <!-- GRID -->
    @if($item->grid)
        @foreach($item->grid->sections as $section)
            {!! $section->getHtml(false,true) !!}
        @endforeach
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

    <!-- DESCARGAS -->
    @if($item->info->manuales != '' || $item->info->especificaciones != '' || $item->info->flyer != '')
        <div class="wrapper">
            <div class="component downloads">
                @if($item->info->manuales != '')
                    <a class="download-button button-outline Whitepapers" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->manuales)) }}">
                        Manuales
                    </a>
                @endif
                @if($item->info->especificaciones != '')
                    <a class="download-button button-outline Whitepapers" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->especificaciones)) }}">
                        Ficha de Especificaciones
                    </a>
                @endif
                @if($item->info->flyer != '')
                    <a class="download-button button-outline Whitepapers" href="{{ URL::to('/download/uploads_' . str_replace('/', '_', $item->info->flyer)) }}">
                        Flyer
                    </a>
                @endif
            </div>
        </div>


        <div id="download-modal" class="component download-modal">
          <a href="javascript:void(0);" onclick="Custombox.modal.close();" class="close"><img src="{{ URL::to('/')}}/public/img/close-download.png"/></a>
          <h3>Completá tus datos para iniciar la descarga</h3>
          @include('master/form', ['extended' => false, 'type' => 'download', 'task_id' => $item->id])
        </div>
    @endif


    <!-- FORM -->
    @if($item->form_bottom)
        <div class="wrapper task-form">
            @include('master/form', ['extended' => $item->form_extended, 'type' => 'task', 'task_id' => $item->id, 'boxed' => true])
        </div>
    @endif


    @if ($item->related()->count() > 0 || $item->relatedCategories()->count() > 0 || $item->relatedPages()->count() > 0)
      <div class="wrapper listado related">
        <div class="title">También podría interesarte</div>
         <div class="component related">

            @foreach($item->related as $task)
               <div class="component w4 h3">

                   <div class="image">
                       <a href="{{ $task->getLink() }}" target="_self" class="cta">
                           <img src="{{ Resize::img($task->info->cover_image, 'relatedTask')  }}" alt="{{ $task->name }}">
                       </a>
                   </div>
                   <div class="text">
                       <h4 class="title">{{ $task->sku }}</h4>
                       <a href="{{ $task->getLink() }}" target="_self" class="cta">Me interesa saber más...</a>
                   </div>
               </div>
            @endforeach

            @foreach($item->relatedCategories as $category)
               <div class="component w4 h3">

                   <div class="image">
                       <a href="{{ $category->getLink() }}" target="_self" class="cta">
                           <img src="{{ Resize::img($category->info->cover_main_image, 'taskFamilyList')  }}" alt="{{ $category->name }}">
                       </a>
                   </div>
                   <div class="text">
                       <h4 class="title">{{ $category->name }}</h4>
                       <a href="{{ $category->getLink() }}" target="_self" class="cta">Me interesa saber más...</a>
                   </div>
               </div>
            @endforeach

            @foreach($item->relatedPages as $page)
               <div class="component w4 h3">

                   <div class="image">
                       <a href="{{ $page->slug }}" target="_self" class="cta">
                           <img src="http://via.placeholder.com/640x310/008657/ffffff?text=Sullair" alt="{{ $page->title }}">
                       </a>
                   </div>
                   <div class="text">
                       <h4 class="title">{{ $page->title }}</h4>
                       <a href="{{ $page->slug }}" target="_self" class="cta">Me interesa saber más...</a>
                   </div>
               </div>
            @endforeach

         </div>
      </div>
    @endif

{{--
    <div class="wrapper intro">
            <div class="component w4">
                <h3 class="title">Conversor<br>de unidades</h3>
            </div>
            <div class="component w4 copy">



                <div id="conversor" data-accordion-group>

                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#potencia" data-parent="#conversor" class="collapsed" data-control>Potencia</h4>
                        <form id="potencia" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="hp">hp</option><option value="kw">kW</option><option value="kcal">Kcal/(IT)/h</option><option value="btu">Btu/(IT)/h</option><option value="cv">CV</option><option value="ton">Tonelada de refrigeración</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="kw">kW</option><option value="hp">hp</option><option value="kcal">Kcal/(IT)/h</option><option value="btu">Btu/(IT)/h</option><option value="cv">CV</option><option value="ton">Tonelada de refrigeración</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('potencia');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#longitud" data-parent="#conversor" class="collapsed" data-control>Longitud</h4>
                        <form id="longitud" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="pie">Pies</option><option value="mt">Metro</option><option value="mm">mm</option><option value="km">Km</option><option value="pul">Pulgada</option><option value="yard">Yardas</option><option value="mil">Millas</option><option value="mil_n">Millas náuticas</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="mt">Metro</option><option value="pie">Pies</option><option value="mm">mm</option><option value="km">Km</option><option value="pul">Pulgada</option><option value="yard">Yardas</option><option value="mil">Millas</option><option value="mil_n">Millas náuticas</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('longitud');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#presion" data-parent="#conversor" class="collapsed" data-control>Presión</h4>
                        <form id="presion" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="bar">Bares</option><option value="pasc">Pascales</option><option value="atm">Atmósferas</option><option value="kg">Kg/cm²</option><option value="lbr1">Libras/pie²</option><option value="lbr2">Libras/pulg²</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="pasc">Pascales</option><option value="bar">Bares</option><option value="atm">Atmósferas</option><option value="kg">Kg/cm²</option><option value="lbr1">Libras/pie²</option><option value="lbr2">Libras/pulg²</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('presion');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#superficie" data-parent="#conversor" class="collapsed" data-control>Superficie</h4>
                        <form id="superficie" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="pie">Pies²</option><option value="m2">M²</option><option value="hct">Hectáreas</option><option value="km">Km²</option><option value="yar">Yards²</option><option value="acr">Acres</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="m2">M²</option><option value="pie">Pies²</option><option value="hct">Hectáreas</option><option value="km">Km²</option><option value="yar">Yards²</option><option value="acr">Acres</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('superficie');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#volumen" data-parent="#conversor" class="collapsed" data-control>Volumen</h4>
                        <form id="volumen" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="gal">Galones</option><option value="m3">M³</option><option value="ltr">Litro</option><option value="pie">Pies³</option><option value="yar">Yardas³</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="m3">M³</option><option value="gal">Galones</option><option value="ltr">Litro</option><option value="pie">Pies³</option><option value="yar">Yardas³</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('volumen');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#temperatura" data-parent="#conversor" class="collapsed" data-control>Temperatura</h4>
                        <form id="temperatura" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="c">ºF (Farenheit)</option><option value="f">ºC (Celsius)</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="f">ºC (Celsius)</option><option value="c">ºF (Farenheit)</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('temperatura');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#peso" data-parent="#conversor" class="collapsed" data-control>Peso</h4>
                        <form id="peso" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="libr">Libra</option><option value="kg">Kilogramos</option><option value="onz">Onza</option><option value="ton">Tonelada</option><option value="gr">Gramos</option>
                                    </select>
                                </p>
                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="kg">Kilogramos</option><option value="libr">Libra</option><option value="onz">Onza</option><option value="ton">Tonelada</option><option value="gr">Gramos</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('peso');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel accordion" data-accordion>
                        <h4 data-toggle="collapse" data-target="#caudal" data-parent="#conversor" class="collapsed" data-control>Caudal Volumétrico</h4>
                        <form id="caudal" method="post" action="" data-content>
                            <fieldset>
                                <p class="from">
                                    <label>de</label>
                                    <select name="from">
                                        <option value="fth">ft³/h</option><option value="lh">l/h</option><option value="fts">ft³/s</option><option value="ftm">ft³/min</option><option value="ms">m³/s</option><option value="mm">m³/min</option><option value="mh">m³/h</option><option value="ls">l/s</option><option value="lm">l/min</option>
                                    </select>
                                </p>

                                <p class="to">
                                    <label>a</label>
                                    <select name="to">
                                        <option value="lh">l/h</option><option value="fth">ft³/h</option><option value="fts">ft³/s</option><option value="ftm">ft³/min</option><option value="ms">m³/s</option><option value="mm">m³/min</option><option value="mh">m³/h</option><option value="ls">l/s</option><option value="lm">l/min</option>
                                    </select>
                                </p>
                                <p class="amount">
                                    <label>Cantidad</label>
                                    <input name="amount" type="number" value="" />
                                </p>

                                <p class="result"><label>Resultado</label> <span>0</span></p>
                                <p class="convert"><input type="button" name="convert" value="Convertir" onclick="convert_units('caudal');return false;" /></p>
                            </fieldset>
                        </form>
                    </div>

                </div>



            </div>
        </div>
 --}}


@endsection


@section('extra-js')

    <script type="text/javascript" src="//rawgit.com/vctrfrnndz/jquery-accordion/master/js/jquery.accordion.js"></script>

    {!! HTML::script('public/js/download.js') !!}

    <script>

       $(function() {



          $('.accordion').accordion({
              "transitionSpeed": 400
          });

        });

    </script>

    {!! HTML::script('public/js/task.js') !!}

@endsection
