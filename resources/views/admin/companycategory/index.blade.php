@extends('admin/master/index')

@section('content')

    <div class="row">

        <div class="col-md-3 sticky-parent">

            <div class="sticky" style="float: left;">

                <div class="box box-default ">
                    <div class="box-header">
                        {{t('Show')}} {{t('Extra Fields')}}
                    </div>
                    <div class="box-body">

                        <div class="form-group form-group-stretch">
                           {!! Form::label('view_role', t('Role')) !!}
                           {{ Form::checkbox('view_role',null, Request::get('view_role'), ['class' => 'form-control view', 'rel' => 'role']) }}
                        </div>

                    </div>
                </div>

                <div class="box box-solid box-default">
                    <div class="box-body">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#modalCreate"><i class="fa fa-plus"></i>&nbsp;{{ t('Create') }}</button>
                    </div>
                </div>

            </div>

        </div>

        <div class="col-md-9">

            <div class="box  box-default">
               {{--  <div class="box-header">
                    {{t('Category Tree')}}

                </div> --}}
                <div class="box-body">

                    <div class="categories-sortable-list area" id="adminChannels">
                        <ol class=' list channelList list-group'>

                            <?php

                            $curDepth = 0;
                            $counter = 0;

                            foreach ($categories as $category):
                            if ($category->depth == $curDepth)
                            {
                                if ($counter > 0) echo "</li>";
                            }
                            elseif ($category->depth > $curDepth)
                            {
                                echo "<ol>";
                                $curDepth = $category->depth;
                            }
                            elseif ($category->depth < $curDepth)
                            {
                                echo str_repeat("</li></ol>", $curDepth - $category->depth), "</li>";
                                $curDepth = $category->depth;
                            }

                            ?>
                            <li class="list-group-item item" id='channel_{{ $category->id }}' data-id='{{ $category->id }}'>
                                <div class='info'>
                                    <span class='channel channel-1'>
                                        <p class="category-name">{{ $category->name }}</p>
                                        <p class="aditional role">{{ $category->profile->title }}</p>
                                    </span>
                                    <div class="category-options btn-group btn-group-sm" role="group" aria-label="Actions">
                                        <a href="{{ route('admin.companycategories.edit', ['id' => $category->id]) }}" class="btn btn-primary"><i class="fa fa-edit"></i> {{t('Edit')}}</a>
                                        <a href="{{ route('admin.companycategories.edit', ['id' => $category->id]) }}" href="#" class="btn btn-danger" rel="delete"><i class="fa fa-trash-o"></i> {{t('Delete')}}</a>
                                    </div>
                                </div>

                            <?php $counter++; ?>

                            <?php endforeach;

                            echo str_repeat("</li></ol>", $curDepth), "</li>";
                            ?>
                        </ol>
                    </div>

                </div>
            </div>

        </div>


    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalCreate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                {!! Form::open(['role' => 'form'])  !!}
                    <div class="modal-header">
                        <button type="button" class="close"
                           data-dismiss="modal">
                               <span aria-hidden="true">&times;</span>
                               <span class="sr-only">{{ t('Close') }}</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            {{ t('Create') }}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">{{ t('Name') }}</label>
                            {!! Form::text('name',null,['class'=>'form-control','placeholder'=>t('Name')])  !!}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{ t('Close') }}</button>
                        {!! Form::submit(t('Accept'),['class'=>'btn btn-primary'])  !!}
                    </div>
                {!! Form::close() !!}
            </div>
        </div>
    </div>

@endsection

@section('extra-js')

    <script type="text/javascript">

        $(function () {


            $('.btn[rel="delete"]').on('click',function(e) {
                e.preventDefault();

                var $this = $(this);
                var url = $this.attr('href');

                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: '{{t('Delete')}}',
                    message: '{{t('Are you sure you want to delete the element?')}}',
                    buttons: [{
                        label: '{{t('Confirm')}}',
                        cssClass: 'btn-danger',
                        action: function(dlg){

                            $.ajax({
                                type: 'POST',
                                url:url,
                                data: {
                                    '_method': 'DELETE',
                                    // 'id': id
                                },
                                dataType: 'json',
                                success: function (response) {
                                    dlg.close();

                                    toastr["success"](response);
                                    $this.closest('.item').fadeOut(500,function(){
                                        $(this).remove();
                                    });

                                },
                                error: function (response, ajaxOptions, thrownError) {
                                    dlg.close();
                                    // console.log('error');
                                    toastr["error"](response);
                                    console.log(response);
                                },
                                complete: function () {

                                }
                            });

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



            makeSortable();


        });

        function makeSortable(){

            $("#adminChannels .channelList").nestedSortable({
                forcePlaceholderSize: true,
                disableNestingClass: 'mjs-nestedSortable-no-nesting',
                handle: '.category-name',
                helper: 'clone',
                items: 'li',
                maxLevels: 0,
                opacity: .6,
                placeholder: 'placeholder',
                revert: 250,
                tabSize: 25,
                tolerance: 'pointer',
                toleranceElement: '> div',
                update: function () {
                    $.ajax({
                        type: "POST",
                        url: "{{ url('admin/companycategories/reorder') }}",
                        data: {tree: $("#adminChannels .channelList").nestedSortable("toArray", {startDepthCount: -1})},
                        globalLoading: true
                    });
                }
            });

        }


        $(".aditional").each(function(){
            if($(this).html()==""){
                $(this).remove();
            }
        });

    </script>

@endsection
