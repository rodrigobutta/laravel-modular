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
            <h2 id="item_title">{{t('Edit')}} {{t('Task')}}: <strong>{{$item->title}}</strong></h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
                <a href="{{ route('admin.grids.live', [$item->id]) }}" class="btn btn-primary" target="_blank"><i class="fa fa-th-large"></i> {{t('Grid Editor')}} </a>
            </div>
        </div>
    </div>


    <div class="row">

        <div class="col-md-3 sticky-parent">

            <div class="box box-solid sticky">
                <div class="box-body">
                    <h3 id="item_name">{{$item->title}}</h3>
                    {{-- <img src="{{ Resize::img($task->main_image,'featuredTask') }}" class="img-responsive"> --}}
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
                        {!! Form::label('title', 'Title') !!}
                        {!! Form::text('title', $item->title, ['class' => 'form-control', 'placeholder' => 'Title of Task']) !!}
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

               {{--  <div class="box box-solid" >
                    <div class="box-body">

                        <div class="form-group">
                            {{ Form::checkbox('published',null,$item->published, ['class' => 'form-control toggle','id' => 'published']) }}
                            <label for="published" data-toggle="tooltip" class="pull-right" title="{{t('Draft')}} / {{t('Published')}}"></label>
                            <span id="published_text" ></span>
                            <span id="published_tooltip"></span>
                        </div>

                    </div>
                </div>
 --}}
                <div class="box box-solid ">

                    <div class="box-body">
                        {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                        <a class="btn btn-warning pull-right" href="{{ route('admin.grids.clone', [$item->id]) }}"><i class="fa fa-files-o"></i> {{t('Save as Copy')}}</a>
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
                        {!! Form::select('profile', $profiles, $item->profile->id,['class' => 'form-control']); !!}
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


    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.grids.edit', $item->id], 'name' => 'delete']) }}
    {{ Form::close() }}


@endsection

@section('extra-js')

<script>

        $(document).ready(function() {


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
                    url: '{{ route('admin.grids.edit',['id' => $item->id]) }}',
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


        });

    </script>


@endsection
