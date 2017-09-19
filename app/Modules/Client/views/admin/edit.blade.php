@extends('admin.master.index')

@section('content')

    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">{{$item->title}}</h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
             {{--    <div class="btn-group">
                    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-clone"></i> {{t('Clone in')}}.. <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ route('admin.client.clone', [$item->id]) }}"> {{t('Current')}}</a></li>
                        <li><a href="{{ route('admin.client.clonex', [$item->id, 'uy']) }}">Uruguay</a></li>
                        <li><a href="{{ route('admin.client.clonex', [$item->id, 'ch']) }}">Chile</a></li>
                    </ul>
                </div> --}}
                {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
                <a href="{{ route('admin.grids.live', [$item->grid->id]) }}" class="btn btn-primary" target="_blank"><i class="fa fa-th-large"></i> {{t('Grid Editor')}} </a>
            </div>
        </div>
    </div>

    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">

        <div class="col-md-3 sticky-parent">

            <div class="box box-solid sticky">
                <div class="box-body">
                    <h3 id="item_name">{{$item->title}}</h3>
                    <img src="{{ Resize::img($item->main_image,$item->receipts['clientAdminEdit']) }}" class="img-responsive">
                   <ul id="nav_index">
                   </ul>
                </div>
            </div>

        </div>

        <div class="col-md-6">

            <div class="box box-solid box-primary ">
                <div class="box-header indexable">
                    {{t('General')}}
                </div>
                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('main_image', t('Main Image')) !!}
                        <input name="main_image" type="hidden" class="image-field" value="{{$item->main_image}}" data-preview-recipe="featuredClient">
                    </div>

                    <div class="form-group">
                        {!! Form::label('title', t('Title')) !!}
                        {!! Form::text('title', $item->title, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('slug', t('Slug')) !!}
                        <small>Nombre que se usa para identificar el cliento en la URL. Debe cumplir con los standares de url.</small>
                        {!! Form::text('slug', $item->slug, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('description', t('Description')) !!}
                        <small>Se utiliza en el META y como parámetro de búsqueda</small>
                        {!! Form::textarea('description', $item->description, ['class' => 'form-control '])  !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('tags', t('Tags')) !!}
                        <small>Se utiliza en el META y como parámetro de búsqueda</small>
                        <select class="form-control  tagging" multiple="multiple" name="tags[]">
                            @foreach(explode(',',$item->tags) as $tag)
                                @if($tag)
                                    <option selected="selected">{{ $tag }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>

                    {{--  <div class="form-group">
                        {!! Form::label('featured_at', t('Featured')) !!}
                        {!! Form::checkbox('featured_at', 1, (bool)$item->featured_at, ['class' => 'form-control']) !!}
                    </div>  --}}

                </div>
            </div>




            {{--  <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('Microsite')}}
                </div>
                <div class="box-body">
                    <small>Cuando un cliento se identifica como micrositio, el comportamiento en el sitio es el mismo que como un cliento normal, pero se reemplaza la ficha por un enlace (especificado en el campo de este cuadro) a un sitio externo que abre en <strong>ventana nueva</strong>.</small>
                    <div class="form-group">
                        {!! Form::label('is_microsite', t('Is Microsite?')) !!}
                        {{ Form::checkbox('is_microsite',null,$item->is_microsite, ['class' => 'form-control']) }}
                    </div>
                    <div class="form-group">
                        {!! Form::label('microsite', t('External Link')) !!}
                        {!! Form::text('microsite', $item->microsite, ['class' => 'form-control ', 'placeholder' => 'http://']) !!}
                    </div>
                </div>
            </div>  --}}

            {{--  <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('Share')}}
                </div>
                <div class="box-body">
                    <small>Si no se completan estos campos, se van a usar los elementos asociados a este item, y de no existir, se usarán los campos por defecto del sitio.</small>
                    <div class="form-group">
                        {!! Form::label('og_description', t('Description')) !!}
                        {!! Form::textarea('og_description', $item->og_description, ['class' => 'form-control '])  !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('og_image', t('Image')) !!}
                        <input name="og_image" type="hidden" class="image-field" value="{{$item->og_image}}" data-preview-recipe="mainMedia">
                    </div>
                </div>
            </div>  --}}

            <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    Detalles
                </div>
                <div class="box-body">
                    <div class="form-group">
                        {!! Form::label('brief', 'Detalles') !!}
                        <small>Bajada de texto</small>
                        {!! Form::textarea('brief', $item->info->brief)  !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('website', 'Sitio Web') !!}
                        {!! Form::text('website', $item->info->website, ['class' => 'form-control', 'placeholder' => 'http://']) !!}
                    </div>
                </div>
            </div>

            <div class="box box-solid box-primary">
                <div class="box-header indexable">
                    {{t('Grids')}}
                </div>
                <div class="box-body">
                    @if($item->grid)
                    <div class="form-group">
                        {!! Form::label('grids', 'Grilla del cliento') !!}
                        <small>El siguiente botón lleva al editor de grillas para la grilla de este cliento.</small>
                        <a href="{{ route('admin.grids.live', [$item->grid->id]) }}" class="btn btn-primary" target="_blank"><i class="fa fa-th-large"></i> {{t('Grid Editor')}} </a>
                    </div>
                    @endif
                    <div class="form-group">
                        {!! Form::label('grids', t('Shared grids')) !!}
                        <small>Además de la grilla propia del cliento, puede incorporar a la ficha las grillas compartidas que desee. <strong>Puede cambiar el orden de los items en la lista y dicho orden se respetará en la ficha.</strong></small>
                        <input name="grids" type="hidden" value='{{$item->grids->makeVisible("title", "id")->toJson()}}'>
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
                        <small>Sólo los usuarios que contengan el siguiente rol en su perfil o sean Super Administradores, van a poder realizar cambios en este cliento.</small>
                        {!! Form::select('profile', $profiles, $item->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $item->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $item->created_at->diffForHumans() }} </li>
                        <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $item->updated_at->diffForHumans() }} </li>
                    </ul>

                </div>

            </div>


            <div class="sticky" style="float: left;">

                <div class="box box-solid" >
                    <div class="box-body">

                        <div class="form-group">
                            {{ Form::checkbox('published',null,$item->published, ['class' => 'form-control toggle','id' => 'published']) }}
                            <label for="published" data-toggle="tooltip" class="pull-right" title="{{t('Draft')}} / {{t('Published')}}"></label>
                            <span id="published_text" ></span>
                            <span id="published_tooltip"></span>
                        </div>

                        <div class="form-group">
                            <a href="{{ route('client.view', [$item->slug]) }}" class="btn btn-success pull-right" target="_blank"><i class="fa fa-eye"></i> {{t('View')}}</a>
                        </div>

                    </div>
                </div>

                <div class="box box-solid ">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        <a class="btn btn-warning pull-right" href="{{ route('admin.client.clone', [$item->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a>
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div> {{-- ROW --}}

    {!! Form::close() !!}

    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.client.edit', $item->id], 'name' => 'delete']) }}
    {{ Form::close() }}

@endsection

@section('extra-js')

    <script>

        $(document).ready(function() {

            generateNav();

            $('input[name="slug"]').formSlug({
            });

            $('textarea[name="brief"]').formHtml({
                placeholder: '{{t('text..')}}'
            });

            $('#btn_cancel').confirmation({
                popout:true,
                href: '{{route('admin.client.list')}}',
                title: '{{t('Exit without saving changes?')}}',
                placement: 'left',
                btnOkLabel: '{{t('Yes')}}',
                btnCancelLabel: '{{t('No')}}',
                // onConfirm: function(){
                //     console.log('assdsa')
                // }
            });


            $('.image-field').formImage({
                ajax: {
                    url: '{{ route('admin.media.bulkupload') }}',
                    archive: 'client',
                    fugitive: false
                },
                preview: {
                    recipe: 'mainClient',
                    path: '{{URL::to('/')}}/image/{name}/{recipe}'
                },
            });

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


            $('.file-upload').formFile({
                ajax: {
                    url: "{{ route('service.uploader.fileupload') }}",
                    archive: 'documents'
                },
                preview: {
                    path: '{{URL::to('/')}}/uploads/{path}'
                },
            });

            $(".tagging").select2({
                theme: "bootstrap",
                minimumInputLength: 2,
                maximumSelectionLength: {{ (int)siteSettings('tagsLimit') }},
                tags: true,
                tokenSeparators: [","],
                ajax: {
                    url: '{{ route('tag.search') }}',
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                      return {
                        q: params.term, // search term
                        page: params.page
                      };
                    },
                    processResults: function (data, params) {
                         // parse the results into the format expected by Select2
                         // since we are using custom formatting functions we do not need to
                         // alter the remote JSON data, except to indicate that infinite
                         // scrolling can be used
                         return {
                           results: data,
                         };
                       },

                }
            });

            $('#mainForm').submit(function(e) {
                e.preventDefault();
                saveForm($(this));
                return false;
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
                      url: '{{ route('admin.client.state',['id' => $item->id]) }}',
                      processData: true,
                      data: {
                        state: state
                    },
                      dataType: 'json'
                    }).done(function(response){
                        toastr["success"](response);
                    }).fail(function(response){
                      console.log('published fail');
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


        function saveForm(form){

            form.ajaxSubmit({
                url: '{{ route('admin.client.edit',['id' => $item->id]) }}',
                type: 'post',
                dataType: 'json',
                beforeSubmit: function() {
                    $(".progress").show();
                    form.find('button, input[type=submit]').prop('disabled',true);
                    form.find('.loading').show();
                },
                uploadProgress: function (event, position, total, percentComplete){
                    $(".progress-bar").animate({width: percentComplete + '%'},50).html(percentComplete + '%');
                },
                success:function (data){
                    // reb corre con el response 200 a 300 si esta el dataType json llega con los datos, sino hay que buscar if200 en el complete que corre siempre
                    // console.log('success');
                    // console.log(data);
                    toastr["success"](data);
                },
                complete:function (data){ // corre siempre cuando termina, por error o success
                    // console.log('complete');
                    form.find('button, input[type=submit]').prop('disabled',false);
                    form.find('.loading').hide();
                    $(".progress").hide();

                    // location.reload();

                },
                error: function(data){
                    console.log('error');
                    console.log(data);

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


        }


    </script>

@endsection
