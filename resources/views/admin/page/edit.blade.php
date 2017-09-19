@extends('admin.master.index')
@section('content')

    <style>

        .progress.active .progress-bar {
            -webkit-transition: none !important;
            transition: none !important;
        }
        .loading{
            display: none;
        }

    </style>


    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">{{$page->title}}</h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                @if(!$page->isSystem())
                    {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
                @endif
                @if($page->grid)
                    <a href="{{ route('admin.grids.live', [$page->grid->id]) }}" class="btn btn-primary" target="_blank"><i class="fa fa-th-large"></i> {{t('Grid Editor')}} </a>
                @endif
            </div>
        </div>
    </div>

    <div class="row">

        <div class="col-md-3 sticky-parent">

            <div class="box box-solid sticky">
                <div class="box-body">
                    <h3 id="item_name">{{$page->title}}</h3>
                    {{-- <img src="{{ Resize::img($task->main_image,'featuredTask') }}" class="img-responsive"> --}}
                    <ul id="nav_index">
                    </ul>
                </div>
            </div>

        </div>

        <div class="col-md-6">

            <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('General')}}
                </div>

                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('title', t('Title')) !!}
                        {!! Form::text('title', $page->title, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    @if(!$page->isSystem())
                        <div class="form-group">
                            {!! Form::label('slug', t('Slug')) !!}
                            {!! Form::text('slug', $page->slug, ['class' => 'form-control', 'placeholder' => '']) !!}
                        </div>
                    @endif

                    <div class="form-group">
                        {!! Form::label('description', t('Description')) !!}
                        <small>Se utiliza en el META y como parametro de búsqueda</small>
                        {!! Form::textarea('description', $page->description, ['class' => 'form-control '])  !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('tags', t('Tags')) !!}
                        <small>Se utiliza en el META y como parametro de búsqueda</small>
                        <select class="form-control input-lg tagging" multiple="multiple" name="tags[]">
                            @foreach(explode(',',$page->tags) as $tag)
                                @if($tag)
                                    <option selected="selected">{{ $tag }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>

                </div>
            </div>

            <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('Share')}}
                </div>
                <div class="box-body">
                    <small>Si no se completan estos campos, se van a usar los elementos asociados a este item, y de no existir, se usarán los campos por defecto del sitio.</small>
                    <div class="form-group">
                        {!! Form::label('og_description', t('Description')) !!}
                        {!! Form::textarea('og_description', $page->og_description, ['class' => 'form-control '])  !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('og_image', t('Image')) !!}
                        <input name="og_image" type="hidden" class="image-field" value="{{$page->og_image}}" data-preview-recipe="mainMedia">
                    </div>
                </div>
            </div>

            <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('Grids')}}
                </div>
                <div class="box-body">
                    @if($page->grid)
                    <div class="form-group">
                        {!! Form::label('grids', 'Grilla de la página') !!}
                        <small>El siguiente botón lleva al editor de grillas para la grilla de esta página.</small>
                        <a href="{{ route('admin.grids.live', [$page->grid->id]) }}" class="btn btn-primary" target="_blank"><i class="fa fa-th-large"></i> {{t('Grid Editor')}} </a>
                    </div>
                    @endif
                    <div class="form-group">
                        {!! Form::label('grids', t('Shared grids')) !!}
                        <small>Además de la grilla propia de la página, puede incorporar a la ficha las grillas compartidas que desee. <strong>Puede cambiar el orden de los items en la lista y dicho orden se respetará en la ficha.</strong></small>
                        <input name="grids" type="hidden" value='{{$page->grids->makeVisible("title", "id")->toJson()}}'>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-3 sticky-parent">

            <div class="box box-solid box-default">
                {{-- <div class="box-header indexable">
                    {{'Control'}}
                </div> --}}

                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('profile', t('Associated Role')) !!}
                        <small>Sólo los usuarios que contengan el siguiente rol en su perfil o sean Super Administradores, van a poder realizar cambios en este tasko.</small>
                        {!! Form::select('profile', $profiles, $page->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $page->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $page->created_at->diffForHumans() }} </li>
                        {{-- <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $page->updated_at->diffForHumans() }} </li> --}}
                    </ul>

                </div>

            </div>


            <div class="sticky" style="float: left;">

                <div class="box box-solid" >
                    <div class="box-body">

                        @if(!$page->isSystem())
                            <div class="form-group">
                                {{ Form::checkbox('published',null,$page->published, ['class' => 'form-control toggle','id' => 'published']) }}
                                <label for="published" data-toggle="tooltip" class="pull-right" title="{{t('Draft')}} / {{t('Published')}}"></label>
                                <span id="published_text" ></span>
                                <span id="published_tooltip"></span>
                            </div>
                        @endif

                        <div class="form-group">
                            <a href="{{ route('page', [$page->slug]) }}" class="btn btn-success pull-right" target="_blank"><i class="fa fa-eye"></i> {{t('View')}}</a>
                        </div>

                    </div>
                </div>

                <div class="box box-solid ">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        @if(!$page->isSystem())
                            <a class="btn btn-warning pull-right" href="{{ route('admin.pages.clone', [$page->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a>
                        @endif
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    </div>

    {!! Form::close() !!}


    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.pages.edit', $page->id], 'name' => 'delete']) }}
    {{ Form::close() }}


@endsection

@section('extra-js')

<script>


        $(document).ready(function() {


            generateNav();


            // $('textarea[name="description"]').formHtml({
            //     placeholder: "{{t('description..')}}"
            // });


            $('.image-field').formImage({
                ajax: {
                    url: '{{ route('admin.media.bulkupload') }}',
                    archive: 'tasks',
                    fugitive: false
                },
                preview: {
                    recipe: 'mainTask',
                    path: '{{URL::to('/')}}/image/{name}/{recipe}'
                },
            });


            $(".tagging").select2({
                theme: "bootstrap",
                minimumInputLength: 2,
                maximumSelectionLength: {{ (int)siteSettings('tagsLimit') }},
                tags: true,
                tokenSeparators: [","]
            })



            $('input[name="grids"]').formObjectList({
               placeholder: 'Haga click aqui para buscar y asociar grillas compartidas..',
               search: {
                   url: '{{ route('admin.grids.search') }}',
                   format: {
                       input: {
                           id: 'id',
                           text: 'text'
                       },
                   },
               },
               format: {
                   input: {
                       id: 'id',
                       text: 'title'
                   },
               }
           });


            $('#btn_delete').on('click',function() {

                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: '{{t('Delete')}}',
                    message: '{{t('Are you sure you want to delete the element?')}}',
                    buttons: [{
                        label: '{{t('Confirm')}}',
                        cssClass: 'btn-danger',
                        action: function(){
                            $('form[name="delete"]').submit();
                        }
                    }, {
                        label: '{{t('Cancel')}}',
                        cssClass: 'btn-default',
                        action: function(dlg){
                            dlg.close();
                        }
                    }]
                });

            });

            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                $(this).ajaxSubmit({
                    url: '{{ route('admin.pages.edit',['id' => $page->id]) }}',
                    type: 'post',
                    dataType: 'json',
                    beforeSubmit: function() {
                        console.log('beforeSubmit');
                        $(".progress").show();
                        $this.find('button, input[type=submit]').prop('disabled',true);
                        $this.find('.loading').show();
                    },
                    uploadProgress: function (event, position, total, percentComplete){
                        $(".progress-bar").animate({width: percentComplete + '%'},50).html(percentComplete + '%');
                    },
                    success:function (data){
                        // reb corre con el response 200 a 300 si esta el dataType json llega con los datos, sino hay que buscar if200 en el complete que corre siempre
                        console.log('success');
                        console.log(data);
                        toastr["success"](data);
                    },
                    complete:function (data){ // corre siempre cuando termina, por error o success
                        // console.log('complete');
                        $this.find('button, input[type=submit]').prop('disabled',false);
                        $this.find('.loading').hide();
                        $(".progress").hide();
                    },
                    error: function(data){
                        console.log('error');
                        if(data.status==422){
                            var errors = data.responseJSON;
                            $.each(errors, function(index, value) {
                                toastr["error"](value);
                            });
                        }
                        else{
                            toastr["error"]('error al enviar el formulario');
                            console.log(data.status);
                            console.log(data.responseText);
                        }

                    }

                });

                return false;

            });



            $('#btn_submit').on('click',function() {

                var list = [];
	            $('#module .blk').each(function(){
	                list.push($(this).data('id'));
	            });

	            console.log(list.join());

	            $('#blocks').remove();
                $('<input>').attr({
                    type: 'hidden',
                    id: 'blocks',
                    name: 'blocks'
                }).appendTo('#mainForm').val(list.join());


                $('#mainForm').submit();

            });



            $('#published').on('click',function(){
                published_status(true);
            })
            function published_status(send=false){

                var state = '';

                if($('#published').is(':checked')){
                    $('#published_text').html('<strong>Publicado</strong>').css('color','#00a65a');//.attr('data-original-title','El elemento se encuentra visible a todo el mundo y listado en los modulos del sitio donde corresponda.');
                    $('#published_tooltip').html('<small>El elemento se encuentra visible a todo el mundo y listado en los modulos del sitio donde corresponda.</small>');
                    state = 'publish';
                }
                else{
                    $('#published_text').html('<strong>Borrador</strong>').css('color','#333333');//.attr('data-original-title','El elemento sólo puede ser accedido por los administradores mediante su url, pero no se encontrará listado en el sitio ni podrá ser accedido por el resto de los usuarios.');
                    $('#published_tooltip').html('<small>El elemento sólo puede ser accedido por los administradores mediante su url, pero no se encontrará listado en el sitio ni podrá ser accedido por el resto de los usuarios.</small>');
                    state = 'draft';
                }

                if(send){
                    $.ajax({
                      type:'PATCH',
                      url: '{{ route('admin.pages.state',['id' => $page->id]) }}',
                      processData: true,
                      data: {
                        state: state
                    },
                      dataType: 'json'
                    }).done(function(response){

                        toastr["success"](response);

                        console.log('done');
                        console.log(response);

                    }).fail(function(response){
                      console.log('fail');
                      console.log(response);

                    }).always(function(){

                    });
                }

            }
            published_status();



        });


        function generateNav(){

            var $index_list = $("#nav_index");

            $(".indexable").each(function(){

                var title = slugify($(this).html().trim());
                var id = "anchor_" + title;

                $(this).attr('id', id).attr('rel', title);

                $li = $("<li/>", {
                    id: title
                });

                $a = $("<a/>", {
                    href: "#" + id,
                    html: title
                }).appendTo($li);

                $li.appendTo($index_list);

                // console.log(title);

            });

            var wh = $(window).height();

            $(window).scroll(function(){

                var st = $(window).scrollTop();

                $(".indexable").each(function(){

                    var li = $index_list.find('#' + $(this).attr('rel'));

                    $(li).toggleClass('active',
                      st + wh >= $(this).offset().top && st <= $(this).offset().top + $(this).parent().height()
                    );

                });

            });

            $(window).scroll();


            $index_list.find('a').on('click',function(e){
                e.preventDefault();
            });
            $index_list.find('li').on('click',function(e){

                var div = $("#anchor_" + $(this).attr('id'));

                $('html, body').animate({
                    scrollTop: $(div).offset().top - 20
                }, 700);

            });

        }





    </script>


@endsection
