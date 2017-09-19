@extends('admin.master.index')
@section('content')

    {!! HTML::script('resources/assets/vendor/codemirror/lib/codemirror.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/javascript/javascript.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/htmlmixed/htmlmixed.js') !!}
    {!! HTML::script('resources/assets/vendor/codemirror/mode/xml/xml.js') !!}
    {!! HTML::style('resources/assets/vendor/codemirror/lib/codemirror.css') !!}

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
        <div class="col-md-6">
            <h2 id="item_title">{{t('Section Type')}}:&nbsp;{{$sectiontype->title}}</h2>
        </div>
        <div class="col-md-6">
            <div class="pull-right">

                <div class="btn-group">
                    <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-clone"></i> {{t('Clone')}} <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ route('admin.sectiontypes.clone', [$sectiontype->id]) }}"> Actual</a></li>
                        <li><a href="{{ route('admin.sectiontypes.clonex', [$sectiontype->id, 'uy']) }}">Uruguay</a></li>
                        <li><a href="{{ route('admin.sectiontypes.clonex', [$sectiontype->id, 'ch']) }}">Chile</a></li>
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
                        {!! Form::label('title', t('Title')) !!}
                        {!! Form::text('title', $sectiontype->title, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('class', t('Class')) !!}
                        {!! Form::text('class', $sectiontype->class, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('main_image', 'Main Image') !!}
                        <input name="main_image" type="hidden" class="image-field" value="{{$sectiontype->main_image}}" data-preview-recipe="mainMedia">
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        {!! Form::label('group', 'Group') !!}
                        {{ Form::checkbox('group',null,$sectiontype->group, ['class' => 'form-control']) }}
                    </div>
                    <div class="form-group">
                        {!! Form::label('absolute', 'Absolute') !!}
                        {{ Form::checkbox('absolute',null,$sectiontype->absolute, ['class' => 'form-control']) }}
                    </div>
                    <div class="form-group">
                        {!! Form::label('fullscreen', 'Fullscreen') !!}
                        {{ Form::checkbox('fullscreen',null,$sectiontype->fullscreen, ['class' => 'form-control']) }}
                    </div>
                    <div class="form-group">
                        {!! Form::label('right', 'Float Right') !!}
                        {{ Form::checkbox('right',null,$sectiontype->right, ['class' => 'form-control']) }}
                    </div>
                    <div class="form-group">
                        {!! Form::label('width', 'Width') !!}
                        {!! Form::select('width',[
                                '1' => '100%',
                                '2' => '50%',
                                '4' => '25%'
                            ],$sectiontype->width,['class' => 'form-control']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('height', 'Height') !!}
                        {!! Form::select('height',[
                                '1' => 'Height 1',
                                '2' => 'Height 2'
                            ],$sectiontype->height,['class' => 'form-control']) !!}
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="box-body">
                    <div class="form-group">
                        {!! Form::label('contents', t('Contents')) !!}
                        <small>Tipos de contenido que van a poder ser elegidos para este bloque</small>
                        <input name="contents" type="hidden" value='{{$sectiontype->contents->makeVisible("title", "id")->toJson()}}'>
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
                        {!! Form::select('profile', $profiles, $sectiontype->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $sectiontype->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $sectiontype->created_at->diffForHumans() }} </li>
                        {{-- <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $sectiontype->updated_at->diffForHumans() }} </li> --}}
                    </ul>

                </div>

            </div>

            <div class="sticky" style="float: left;">

                <div class="box box-solid">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        <a class="btn btn-warning pull-right" href="{{ route('admin.sectiontypes.clone', [$sectiontype->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a>
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    {!! Form::close() !!}

    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.sectiontypes.edit', $sectiontype->id], 'name' => 'delete']) }}
    {{ Form::close() }}


@endsection

@section('extra-js')

<script>

        CKEDITOR.dtd.$removeEmpty['span'] = false;

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

            $('input[name="contents"]').formObjectList({
                placeholder: 'Haga click aqui para buscar y asociar tipos de contenido..',
                // sortable: false,
                search: {
                    url: '{{ route('admin.sectioncontents.search') }}',
                    format: {
                        input: {
                            id: 'id',
                            text: 'text'
                        },
                    }
                },
                format: {
                    input: {
                        id: 'id',
                        text: 'title'
                    },
                }
            });

            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                $(this).ajaxSubmit({
                    url: '{{ route('admin.sectiontypes.edit',['id' => $sectiontype->id]) }}',
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



        });

    </script>


@endsection
