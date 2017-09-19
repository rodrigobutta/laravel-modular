@extends('admin.master.index')
@section('content')

    {{-- REB Componente hecho custom en base a otro --}}
    {!! HTML::script('resources/assets/js/admin/jsoneditor.js') !!}

    <style>

        .progress.active .progress-bar {
            -webkit-transition: none !important;
            transition: none !important;
        }

        .loading{
            display: none;
        }

        #editor_holder input[type="file"] {
            padding: 3px;
        }
    </style>

{{--
    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">{{$content->title}}</h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                <a href="{{ route('admin.contents.edit', [$content->id]) }}" class="btn btn-primary"><i class="fa fa-gear"></i> Propiedades </a>
            </div>
        </div>
    </div>  --}}

    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">

        <div class="col-md-9">


            <div class="box box-solid box-default ">
             {{--    <div class="box-header indexable">
                    {{t('Content')}}
                </div> --}}
                <div class="box-body">


                    @if ($content->type == 'html')

                   {{--      <div class="form-group">
                            {!! Form::textarea('value', $content->value, ['class' => 'form-control', 'placeholder' => 'Value']) !!}
                        </div> --}}

                        <script>

                            // tiene que ir en cada type porque es llamada en el submit
                            function prev_submit(){

                            }

                            CKEDITOR.dtd.$removeEmpty['span'] = false;

                            $(document).ready(function() {

                                var editor_value = CKEDITOR.replace( 'value', {
                                        height: 150,
                                        enterMode : CKEDITOR.ENTER_BR,
                                        shiftEnterMode: CKEDITOR.ENTER_P,
                                        autoParagraph: false,
                                        toolbarGroups: [
                                           { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                                            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                                            { name: 'links', groups: [ 'links' ] },
                                            { name: 'insert', groups: [ 'insert' ] },
                                            { name: 'forms', groups: [ 'forms' ] },
                                            { name: 'tools', groups: [ 'tools' ] },
                                            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                                            { name: 'others', groups: [ 'others' ] },
                                            '/',
                                            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                                            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                                            { name: 'styles', groups: [ 'styles' ] },
                                            { name: 'colors', groups: [ 'colors' ] },
                                        ],
                                        removeButtons: 'Scayt,Maximize,About,Cut,Copy,Paste,PasteText,PasteFromWord'
                                    } );
                                editor_value.on( 'change', function( evt ) {
                                    $('#value').val(evt.editor.getData());
                                });

                            });

                        </script>

                    @elseif ($content->type == 'image')

                        <div class="form-group">

                            <input name="value" type="hidden" class="image-field" value="{{$content->value}}" data-preview-recipe="mediaNormal">
                        </div>

                        <script>

                            // tiene que ir en cada type porque es llamada en el submit
                            function prev_submit(){

                            }

                            $(document).ready(function() {

                                $('.image-field').formImage({
                                    ajax: {
                                        url: '{{ route('admin.media.bulkupload') }}',
                                        archive: 'media',
                                        fugitive: false
                                    }
                                });

                            });

                        </script>

                    @elseif ($content->type == 'json')

                        <div class="form-group">
                            <div id='editor_holder' class='medium-12 columns'></div>
                            <span id="valid_indicator" style="color: green;"></span>
                            <input name="value" type="hidden" value="{{$content->value}}">
                        </div>

                        <script>

                            // tiene que ir en cada type porque es llamada en el submit
                            function prev_submit(){
                                console.log('prev_submit');

                                console.log(editor.getValue());
                                $('input[name="value"]').val(JSON.stringify(editor.getValue(), null, '\t'));
                            }

                            var content_schema = {!! $content->schema !!},
                                content_value = {!! $content->value or '""' !!},
                                path = "{{ URL::to('/') }}/uploads/media/"

                            // JSON Editor

                            // Upload handler
                            JSONEditor.defaults.options.upload = function(type, file, cbs) {
                                if (type === 'root.upload_fail')
                                    cbs.failure('Upload failed');
                                else {
                                    var data = new FormData()
                                    data.append('files', file)
                                    data.append('fugitive', false)
                                    data.append('archive', 'media')
                                    $.ajax({
                                        url: '{{ route('admin.media.bulkupload') }}',
                                        type: 'POST',
                                        data: data,
                                        async: false,
                                        success: function (response) {
                                            cbs.success(response.files[0].name)
                                        },
                                        enctype: 'multipart/form-data',
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    });
                                }
                            };
                            JSONEditor.defaults.resolvers.unshift(function(schema) {
                                if (schema.options)
                                    if (schema.options.formImage)
                                        return 'formImage'
                            })

                            // Language
                            JSONEditor.defaults.languages.en = {
                                error_notset: "Debe establecer la propiedad",
                                error_notempty: "Valor requerido",
                                error_enum: "El valor debe ser uno de los valores enumerados",
                                error_anyOf: "El valor debe validarse contra al menos uno de los esquemas proporcionados",
                                error_oneOf: 'El valor debe validarse contra exactamente uno de los esquemas proporcionados. Actualmente se valida contra {{0}} de los esquemas.',
                                error_not: "El valor no debe validarse contra el esquema proporcionado",
                                error_type_union: "El valor debe ser uno de los tipos proporcionados",
                                error_type: "El valor debe ser del tipo {{0}}",
                                error_disallow_union: "El valor no debe ser uno de los tipos no permitidos",
                                error_disallow: "El valor no debe ser del tipo {{0}}",
                                error_multipleOf: "El valor debe ser un múltiplo de {{0}}",
                                error_maximum_excl: "El valor debe ser inferior a {{0}}",
                                error_maximum_incl: "El valor debe ser como mucho {{0}}",
                                error_minimum_excl: "El valor debe ser mayor que {{0}}",
                                error_minimum_incl: "El valor debe ser al menos {{0}}",
                                error_maxLength: "El valor debe tener como máximo {{0}} caracteres",
                                error_minLength: "El valor debe tener al menos {{0}} caracteres",
                                error_pattern: "El valor debe coincidir con el patrón {{0}}",
                                error_additionalItems: "No se permiten elementos adicionales en esta matriz",
                                error_maxItems: "El valor debe tener como máximo {{0}} elementos",
                                error_minItems: "El valor debe tener al menos {{0}} elementos",
                                error_uniqueItems: "Array debe tener elementos únicos",
                                error_maxProperties: "El objeto debe tener como máximo {{0}} propiedades",
                                error_minProperties: "El objeto debe tener al menos {{0}} propiedades",
                                error_required: "Objeto falta la propiedad requerida '{{0}}'",
                                error_additional_properties: "No se permiten propiedades adicionales, pero se establece la propiedad {{0}}",
                                error_dependency: "Debe tener propiedad {{0}}",
                                button_delete_all: "Eliminar todos",
                                button_delete_all_title: "Eliminar todos",
                                button_delete_last: "Eliminar último",
                                button_delete_last_title: "Eliminar último ({{0}})",
                                button_add_row_title: "Añadir",
                                button_move_down_title: "Mover hacia abajo",
                                button_move_up_title: "Mover hacia arriba",
                                button_delete_row_title: "Eliminar ({{0}})",
                                button_delete_row_title_short: "Borrar",
                                button_collapse: "Plegar",
                                button_expand: "Expandir"
                            }

                            JSONEditor.defaults.editors.formImage = JSONEditor.defaults.editors.string.extend({
                                afterInputReady: function() {
                                    this._super()
                                    var self = this,
                                        container = self.container,
                                        input = $(container).find('.form-group input'),
                                        file = $(input).val()

                                    $(input).hide()
                                    this.formImage = $.formImage($(input), {
                                        value: file,
                                        preview: {
                                            recipe: null,
                                            path: window.path + "{name}"
                                        },
                                        ajax: {
                                            url: '{{ route('admin.media.bulkupload') }}',
                                            fugitive: true,
                                            archive: 'media'
                                        },
                                        init: function() {
                                            // ..
                                        },
                                        imageChanged: function(image, file_input) {
                                            var container = $(file_input).closest('[data-schemapath]'),
                                                input = $(container).find('input[type="text"]')
                                            // Vanilla trigger because a possible bug or something wrong in json-editor
                                            $(input).val(image)[0].dispatchEvent(new Event('change'))
                                        }
                                    })
                                }
                            });

                            var editor = new JSONEditor(document.getElementById('editor_holder'),{
                                theme: 'bootstrap3',
                                iconlib: 'fontawesome4',
                                disable_properties: true,
                                disable_edit_json: true,
                                disable_collapse: true,
                                schema: content_schema,
                                startval: content_value
                            })
                            .on('ready', function() {
                                // ..
                            });

                        </script>

                    @else

                        <div class="form-group">
                            {!! Form::label('value', $content->title) !!}
                            {!! Form::textarea('value', $content->value, ['class' => 'form-control', 'placeholder' => 'Value']) !!}
                        </div>

                    @endif

                </div>

            </div>

        </div>
        <div class="col-md-3 sticky-parent">

            {{--  <div class="box box-solid box-default">

                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('profile', t('Associated Role')) !!}
                        <small>Sólo los usuarios que contengan el siguiente rol en su perfil o sean Super Administradores, van a poder realizar cambios en este tasko.</small>
                        {!! Form::select('profile', $profiles, $content->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $content->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $content->created_at->diffForHumans() }} </li>
                        <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $content->updated_at->diffForHumans() }} </li>
                    </ul>

                </div>

            </div>  --}}


            <div class="sticky" style="float: left;">



                <div class="box box-solid ">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>

    {!! Form::close() !!}

@endsection

@section('extra-js')
    <style>
        .well {
            background-color: white;
            padding-bottom: 9px!important;
        }

        .well .row {
            margin: 0;
        }
    </style>

    <script>

        $(document).ready(function() {


            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                prev_submit();

                $(this).ajaxSubmit({
                    url: '{{ route('admin.contents.value',['id' => $content->id]) }}',
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


        });

    </script>


@endsection
