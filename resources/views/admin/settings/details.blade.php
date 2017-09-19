@extends('admin/master/index')
@section('content')


    {!! Form::open(['method' => 'POST', 'files' => true, 'id' => 'mainForm']) !!}

        <div class="box box-solid box-primary">
            <div class="box-header">
                {{t('General')}}
            </div>
            <div class="box-body">

                <div class="form-group">
                    <label for="sitename">{{t('Name')}}</label>
                    {!! Form::text('sitename',siteSettings('siteName'),array('class'=>'form-control')) !!}
                </div>
{{--
                <div class="form-group">
                    <label for="favicon">Favorite.ico</label>
                    {!! Form::file('fav_icon',['accept'=>'image/*']) !!}
                </div> --}}

                <div class="form-group">
                    {!! Form::label('fav_icon', t('Favicon')) !!}
                    <input class="file-upload" name="fav_icon" type="hidden" value='{{siteSettings('favIcon')}}'>
                </div>

                <div class="form-group">
                    {!! Form::label('tos', t('Terms and Conditions')) !!}
                    {!! Form::textarea('tos', siteSettings('tos'))  !!}
                </div>

            </div>
        </div>

        <div class="box box-solid box-primary">
            <div class="box-header">
                Meta
            </div>
            <div class="box-body">

                <div class="form-group">
                    <label for="description">{{t('Description')}}</label>
                    {!! Form::text('description',siteSettings('description'),['class'=>'form-control']) !!}
                </div>

                <div class="form-group">
                    {!! Form::label('tags', t('Tags')) !!}
                    <select class="form-control  tagging" multiple="multiple" name="tags[]">
                        @foreach(explode(',',siteSettings('tags')) as $tag)
                            @if($tag)
                                <option selected="selected">{{ $tag }}</option>
                            @endif
                        @endforeach
                    </select>
                </div>

            </div>
        </div>

        <div class="box box-solid box-primary">
            <div class="box-header">
                {{t('Share')}}
            </div>
            <div class="box-body">

                <div class="form-group">
                    {!! Form::label('og_image', t('Image')) !!}
                    <input name="og_image" type="hidden" class="image-field" value="{{siteSettings('og_image')}}" data-preview-recipe="mainMedia">
                </div>

            </div>
        </div>

        <div class="box box-solid">

            <div class="box-body">
                {!! Form::button('<i class="fa fa-save"></i> ' . t('Save'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                <div class="progress progress-striped active page-edit-progress" style="display:none;">
                    <div class="progress-bar progress-bar-primary" style="width:0%"></div>
                </div>
            </div>

        </div>

    {!! Form::close() !!}

@endsection

@section('extra-js')

    <script src="//cdn.ckeditor.com/4.5.4/standard/ckeditor.js"></script>

    <script>

        $(document).ready(function() {


            $('textarea[name="tos"]').formHtml({
                placeholder: "{{t('tos..')}}"
            });


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

            $('.file-upload').formFile({
                ajax: {
                    url: "{{ route('service.uploader.fileupload') }}",
                    archive: 'general'
                }
            });

            $(".tagging").select2({
                theme: "bootstrap",
                minimumInputLength: 2,
                maximumSelectionLength: {{ (int)siteSettings('tagsLimit') }},
                tags: true,
                tokenSeparators: [","]
            })


            $('#mainForm').submit(function(e) {
                e.preventDefault();
                var $this = $(this);

                $(this).ajaxSubmit({
                    url: '{{ route('admin.settings.details') }}',
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




        });



    </script>

@endsection
