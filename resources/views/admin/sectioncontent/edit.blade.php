@extends('admin.master.index')
@section('content')

    {!! HTML::script('resources/assets/vendor/codemirror/lib/codemirror.js') !!}
    {!! HTML::style('resources/assets/vendor/codemirror/lib/codemirror.css') !!}

    {!! HTML::script('resources/assets/vendor/codemirror/addon/fold/xml-fold.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/addon/edit/matchbrackets.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/addon/edit/matchtags.js') !!}

    {!! HTML::script('resources/assets/vendor/codemirror/mode/javascript/javascript.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/htmlmixed/htmlmixed.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/xml/xml.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/css/css.js') !!}

    <style>

        .progress.active .progress-bar {
            -webkit-transition: none !important;
            transition: none !important;
        }
        .loading{
            display: none;
        }

    </style>


    <style>
      .CodeMirror { height: auto; border: 1px solid #ddd; }
      /*.CodeMirror-scroll { max-height: 200px; }*/
      .CodeMirror pre { padding-left: 7px; line-height: 1.25; }
    </style>


    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">
        <div class="col-md-6">
            <h2 id="item_title">{{t('Content')}}: {{$sectioncontent->title}}</h2>
        </div>
        <div class="col-md-6">
            <div class="pull-right">

                <div class="btn-group">
                    <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-clone"></i> {{t('Clone')}} <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ route('admin.sectioncontents.clone', [$sectioncontent->id]) }}"> Actual</a></li>
                        <li><a href="{{ route('admin.sectioncontents.clonex', [$sectioncontent->id, 'uy']) }}">Uruguay</a></li>
                        <li><a href="{{ route('admin.sectioncontents.clonex', [$sectioncontent->id, 'ch']) }}">Chile</a></li>
                    </ul>
                </div>

                {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
            </div>
        </div>
    </div>

    <div class="row">

        <div class="col-md-9">


            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        {!! Form::label('item_title', t('Title')) !!}
                        {!! Form::text('item_title', $sectioncontent->title, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('class', t('Class')) !!}
                        {!! Form::text('class', $sectioncontent->class, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('main_image', t('Main Image')) !!}
                        <input name="main_image" type="hidden" class="image-field" value="{{$sectioncontent->main_image}}" data-preview-recipe="mainMedia">
                    </div>
                </div>
            </div>


            <div class="box">
                <div class="box-body">
                   <div class="form-group">
                        {!! Form::label('template', t('Template')) !!}
                        {!! Form::textarea('template', $sectioncontent->template) !!}
                    </div>
                    <div class="form-group">
                         {!! Form::label('template', t('Insert field')) !!}
                         <ul id="list_fields">
                         </ul>
                     </div>
                </div>
            </div>

            <div class="box">
                <div class="box-body">

                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                          <li class=""><a href="#tab_schema_source" data-toggle="tab" aria-expanded="false">{{t('Source')}}</a></li>
                          <li class=""><a href="#tab_schema_editor" data-toggle="tab" aria-expanded="false">{{t('Editor')}}</a></li>
                          {{-- <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                              Dropdown <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                              <li role="presentation" class="divider"></li>
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                            </ul>
                          </li> --}}
                          <li class="pull-left header">{{ t('Fields') }}</li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_schema_editor">

                                <div class="form-group">
                                    <button type="button" class="btn btn-success" ><i class="fa fa-plus"></i> {{t('Create')}}</button>
                                </div>
                                <div class="form-group">
                                     <ul id="fields_group">
                                     </ul>
                                </div>

                            </div>
                            <div class="tab-pane active" id="tab_schema_source">

                                <div class="form-group">
                                    {!! Form::label('fields', t('Definition')) !!}
                                    {!! Form::textarea('fields', $sectioncontent->fields) !!}
                                </div>

                            </div>

                        </div>
                        <!-- /.tab-content -->

                    </div>

                </div>
            </div>

        </div>
        <div class="col-md-3 sticky-parent">

            <div class="box box-solid box-default">

                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('profile', t('Associated Role')) !!}
                        <small>Sólo los usuarios que contengan el siguiente rol en su perfil o sean Super Administradores, van a poder realizar cambios en este tasko.</small>
                        {!! Form::select('profile', $profiles, $sectioncontent->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $sectioncontent->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $sectioncontent->created_at->diffForHumans() }} </li>
                        {{-- <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $sectioncontent->updated_at->diffForHumans() }} </li> --}}
                    </ul>

                </div>

            </div>

            <div class="sticky" style="float: left;">

                <div class="box box-solid">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        <a class="btn btn-warning pull-right" href="{{ route('admin.sectioncontents.clone', [$sectioncontent->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a>
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>

    {!! Form::close() !!}

    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.sectioncontents.edit', $sectioncontent->id], 'name' => 'delete']) }}
    {{ Form::close() }}


    <script id="template_schema_field" type="x-tmpl-mustache">

        <div class="row schema-field-row">

            <div class="col-md-3">
                <h3 class="pull-right">@{{title}}</h3>
            </div>
            <div class="col-md-7">

                <fieldset class="schema-field">
                    <div class="form-group">
                        <label for="title">{{t('Label')}}</label>
                        <input name="title" class="form-control" value="@{{title}}">
                    </div>
                    <div class="form-group">
                        <label for="name">{{t('Name')}}</label>
                        <input name="name" class="form-control" value="@{{name}}">
                    </div>
                    <div class="form-group">
                        <label for="type">{{t('Type')}}</label>
                        <select name="type" class="form-control">
                            <option value="text">Texto</option>
                            <option value="html">Html</option>
                            <option value="image">Imagen</option>
                            <option value="link">Link</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="field-recipe">{{t('Recipe')}}</label>
                        <input name="field-recipe" class="form-control" value="@{{recipe}}">
                    </div>
                </fieldset>

            </div>
            <div class="col-md-2">
                <div class="pull-right">
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger" rel="delete"><i class="fa fa-trash"></i> {{t('Delete')}}</button>
                    </div>
                </div>
            </div>
        </div>


    </script>

    <script id="template_template_insert_field" type="x-tmpl-mustache">
        <li rel="@{{name}}" class="btn btn-sm btn-success"><i class="fa fa-chevron-up"></i> @{{title}}</li>
    </script>


@endsection

@section('extra-js')

<script>

         var editor_template = null;
         var editor_fields = null;

        $(document).ready(function() {


            $('.image-field').formImage({
                ajax: {
                    url: '{{ route('admin.media.bulkupload') }}',
                    archive: 'media',
                    fugitive: true
                },
                preview: {
                    path: '{{URL::to('/')}}/image/{name}/{recipe}'
                }
            });


              editor_template = CodeMirror.fromTextArea($('textarea#template')[0], {
                mode : "xml",
                htmlMode: true,
                lineNumbers: true,
                lineWrapping: true,
                matchTags: {
                    bothTags: true
                },
                extraKeys: {"Ctrl-J": "toMatchingTag"}
                // value: "function myScript(){return 100;}\n",
              });


              editor_fields = CodeMirror.fromTextArea($('textarea#fields')[0], {
                lineNumbers: true,
                mode:  "javascript",
                json: true,
                matchBrackets: true
              });
              editor_fields.on("blur", function() { // era en change
                 sourceToEditor();
               });




            // $('.image-field').formImage({
            //     ajax: {
            //         url: '{{ route('admin.media.bulkupload') }}',
            //         archive: 'sectioncontents',
            //         fugitive: false
            //     }
            // });


            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                editorToSource();

                $('textarea#template').val(editor_template.getValue());
                $('textarea#fields').val(editor_fields.getValue());

                $(this).ajaxSubmit({
                    url: '{{ route('admin.sectioncontents.edit',['id' => $sectioncontent->id]) }}',
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

	            $('#blocks').remove();
                $('<input>').attr({
                    type: 'hidden',
                    id: 'blocks',
                    name: 'blocks'
                }).appendTo('#mainForm').val(list.join());

                $('#mainForm').submit();

            });


            $('#btn_delete').on('click',function() {

                BootstrapDialog.show({
                    message: 'Confirm Delete?',
                    buttons: [{
                        label: 'Confirm',
                        cssClass: 'btn-primary',
                        action: function(){
                            $('form[name="delete"]').submit();
                        }
                    }, {
                        label: 'Close',
                        action: function(dlg){
                            dlg.close();
                        }
                    }]
                });

            });


            sourceToEditor();
            refreshTemplateInserts();

            $('#list_fields').on('click', 'li', function(){
                var name = $(this).attr('rel');
                insertStringInTemplate(editor_template,'[['+name+']]');
            });


            $('#fields_group').on('click', 'button[rel="delete"]', function(){
                $(this).closest('.row').fadeOut(300,function(){
                    $(this).remove();
                    editorToSource();
                    refreshTemplateInserts();
                })
            });

            $('a[href="#tab_schema_editor"]').trigger('click');

            $('a[href="#tab_schema_source"]').on('click',function(){
                editorToSource();
                setTimeout(function() {editor_fields.refresh();}, 50);
            });


            $('#fields_group').on('keyup', '.schema-field input[name="title"]', function(){
                $(this).closest('.row').find('h3').html($(this).val());
            });

            $('#fields_group').on('change', '.schema-field input', function(){
                editorToSource();
                refreshTemplateInserts();
            });






        });

        $(window).on('load', function(){
            //Hide Recipe in non-image field groups
            clearUnusedRecipeFields();
        });


        function refreshTemplateInserts(){
            console.log('refreshTemplateInserts');

            var json_string = editor_fields.getValue();
            var json = JSON.parse(json_string);

            var list_fields = $('#list_fields');
                list_fields.empty();
            for (var i = 0; i < json.length; i++) {
                list_fields.append(
                    Mustache.render(
                        $('#template_template_insert_field').html(),{
                            name: json[i].name,
                            title: json[i].title,
                            value: json[i].type,
                            recipe: json[i].recipe
                        }
                    )
                );
            }

        }


        function sourceToEditor(){
            console.log('sourceToEditor');

            var json_string = editor_fields.getValue();
            var json = JSON.parse(json_string);

            var fields_group = $("#fields_group");
                fields_group.empty();

            for (var i = 0; i < json.length; i++) {
                addFieldRow(json[i].name,json[i].title,json[i].type,json[i].recipe);
            }

            clearUnusedRecipeFields();

        }



        function editorToSource(){
            console.log('editorToSource');

            var res = [];

            $("#fields_group .schema-field").each(function(){
                var item = {};
                    item.name = $(this).find('input[name="name"]').val();
                    item.title = $(this).find('input[name="title"]').val();
                    item.type = $(this).find('select[name="type"]').val();
                    item.recipe = $(this).find('input[name="field-recipe"]').val();

                res.push(item);
            });

            var json_string = JSON.stringify(res, null, 2);

            editor_fields.setValue(json_string);
            editor_fields.refresh();

        }


        function addFieldRow(name,title,type,recipe){

            var el = $(Mustache.render(
                    $('#template_schema_field').html(),{
                        name: name,
                        title: title,
                        type: type,
                        recipe: recipe
                    }
                ));

            el.find('select[name="type"] option[value="'+type+'"]').attr('selected', true);

            $("#fields_group").append(el);

        }



        function insertStringInTemplate(editor,str){

            var selection = editor.getSelection();

            if(selection.length>0){
                editor.replaceSelection(str);
            }
            else{

                var doc = editor.getDoc();
                var cursor = doc.getCursor();

                var pos = {
                   line: cursor.line,
                   ch: cursor.ch
                }

                doc.replaceRange(str, pos);

            }

        }

        function clearUnusedRecipeFields() {
           $('.schema-field').each(function(){
               console.log($(this));
               if($(this).find('select[name="type"]').val() != 'image') {
                   $(this).find('input[name="field-recipe"]').parent().hide();
               }
           });
        }


    </script>


@endsection
