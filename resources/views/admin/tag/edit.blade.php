@extends('admin.master.index')

@section('content')



    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">{{t('Edit')}} {{t('Tag')}}: <strong>{{$tag->name}}</strong></h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                {!! Form::button('<i class="fa fa-trash"></i> ' . t('Delete'), ['class' => 'btn btn-danger', 'id' => 'btn_delete']) !!}
            </div>
        </div>
    </div>


    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'mainForm']) !!}

    <div class="row">

        <div class="col-md-3 sticky-parent">

            <div class="box box-solid sticky">
                <div class="box-body">
                    <h3 id="item_name">{{$tag->name}}</h3>
                    {{-- <img src="{{ Resize::img($campaign->main_image,'featuredTask') }}" class="img-responsive"> --}}
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
                        {!! Form::label('name', t('Name')) !!}
                        {!! Form::text('name', $tag->name, ['class' => 'form-control', 'placeholder' => '']) !!}
                    </div>
                </div>
            </div>



        </div>
        <div class="col-md-3 sticky-parent">

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

    </div> {{-- ROW --}}

    {!! Form::close() !!}

    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.tags.edit', $tag->id], 'name' => 'delete']) }}
    {{ Form::close() }}

@endsection

@section('extra-js')

    <script>

        $(document).ready(function() {

            generateNav();

            // $('input[name="slug"]').formSlug({
            // });

            // $("#category").select2tree({
            //     theme: "bootstrap",
            // });

            // $('textarea[name="cover_title"]').formHtml({
            //     placeholder: '{{t('text..')}}'
            // });

            // $('textarea[name="copy"]').formHtml({
            //     placeholder: '{{t('text..')}}'
            // });

            // $('textarea[name="description"]').formHtml({
            //     placeholder: "{{t('description..')}}"
            // });



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



            $('#btn_cancel').confirmation({
                popout:true,
                href: '{{route('admin.tags')}}',
                title: '{{t('Exit without saving changes?')}}',
                placement: 'left',
                btnOkLabel: '{{t('Yes')}}',
                btnCancelLabel: '{{t('No')}}',
                // onConfirm: function(){
                //     console.log('assdsa')
                // }
            });


            // $('.image-field').formImage({
            //     ajax: {
            //         url: '{{ route('admin.media.bulkupload') }}',
            //         archive: 'campaigns',
            //         fugitive: false
            //     },
            //     preview: {
            //         recipe: 'mainTask',
            //         path: '{{URL::to('/')}}/image/{name}/{recipe}'
            //     },
            // });

            $('#mainForm').submit(function(e) {
                e.preventDefault();
                saveForm($(this));
                return false;
            });

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
                url: '{{ route('admin.tags.edit',['id' => $tag->id]) }}',
                type: 'post',
                dataType: 'json',
                beforeSubmit: function() {
                    console.log('beforeSubmit');
                    $(".progress").show();
                    form.find('button, input[type=submit]').prop('disabled',true);
                    form.find('.loading').show();
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
                    form.find('button, input[type=submit]').prop('disabled',false);
                    form.find('.loading').hide();
                    $(".progress").hide();
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
