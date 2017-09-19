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


    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">{{t('Edit')}} {{t('Content')}}: <strong>{{$content->title}}</strong></h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                <a href="{{ route('admin.contents.value', [$content->id]) }}" class="btn btn-primary"><i class="fa fa-pencil"></i> Editar </a>
                {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
            </div>
        </div>
    </div>

    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">

        <div class="col-md-3">


            <div class="box box-solid box-primary ">
                <div class="box-header indexable">
                    {{t('General')}}
                </div>
                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('title', t('Title')) !!}
                        <small>Título de fantasía para el administrador</small>
                        {!! Form::text('title', $content->title, ['class' => 'form-control', 'placeholder' => 'Title of Task']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('name', t('Name')) !!}
                        <small>Token utilizado para referenciar el contenido dentro del desarrollo</small>
                        {!! Form::text('name', $content->name, ['class' => 'form-control', 'placeholder' => 'Name']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('type', t('Type')) !!}<br>
                        <small>Tipo de contenido que va a contener esta propiedad</small>
                        {!! Form::select('type', array('html' => 'HTML', 'json' => 'JSON', 'image' => 'Imagen' , 'general' => 'General'), $content->type) !!}
                    </div>


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
                        {!! Form::label('schema', t('Schema')) !!}
                        {!! Form::textarea('schema', $content->schema, ['class' => 'form-control json-schema', 'placeholder' => 'json']) !!}
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
                        {!! Form::select('profile', $profiles, $content->profile->id,['class' => 'form-control']); !!}
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item"><strong>{{t('Creator')}}</strong> {{ $content->user->fullname }}</li>
                        <li class="list-group-item"><strong>{{t('Created At')}}</strong> {{ $content->created_at->diffForHumans() }} </li>
                        <li class="list-group-item"><strong>{{t('Last Updated')}}</strong> {{ $content->updated_at->diffForHumans() }} </li>
                    </ul>

                </div>

            </div>


            <div class="sticky" style="float: left;">


                <div class="box box-solid ">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        {{-- <a class="btn btn-warning pull-right" href="{{ route('admin.tasks.clone', [$content->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a> --}}
                        <div class="progress progress-striped active page-edit-progress" style="display:none;">
                            <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

        {{--
        <div class="col-md-3">

            <div class="box">
                <div class="box-body">

                    <div class="form-group">
                        {!! Form::label('profile', t('Profile')) !!}
                        {!! Form::select('profile', $profiles, $content->profile->id,['class' => 'form-control']); !!}
                    </div>

                    {!! Form::button('Update', ['class' => 'btn btn-success', 'id' => 'btn_submit']) !!}
                    {!! Form::button('Delete', ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}

                    <i class="fa fa-cog fa-spin fa-fw loading fa-2x"></i>
                    <div class="progress progress-striped active page-edit-progress" style="display:none;">
                        <div class="progress-bar progress-bar-success" style="width:0%"></div>
                    </div>

                </div>
            </div>

        </div> --}}

    </div>

    {!! Form::close() !!}

    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.contents.edit', $content->id], 'name' => 'delete']) }}
    {{ Form::close() }}

@endsection

@section('extra-js')

    <script>

        $(document).ready(function() {


            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                $(this).ajaxSubmit({
                    url: '{{ route('admin.contents.edit',['id' => $content->id]) }}',
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

                var html = $('#contents').html();


                $('<input>').attr({
                    type: 'hidden',
                    id: 'html',
                    name: 'html'
                }).appendTo('#mainForm').val(html);


                $('#mainForm').submit();

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





        });

    </script>


@endsection
