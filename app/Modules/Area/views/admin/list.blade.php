@extends('admin/master/index')
@section('content')

    <div class="row">
        <div class="col-md-8">
            <h2 id="item_title">Soluciones</h2>
        </div>
        <div class="col-md-4">
            <div class="pull-right">
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalCreate">Nuevo</button>
                {{--  <a href="{{ route('admin.area.import') }}" class="btn btn-primary export-to-excel pull-right" style="margin: 0 0 0 20px;"><i class="fa fa-upload"></i> Importar Excel</a>&nbsp;  --}}
                {{--  <a href="{{ route('admin.area.export') }}" class="btn btn-primary export-to-excel pull-right"><i class="fa fa-download"></i> Exportar a Excel</a>  --}}
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-md-12">

            <div class="box">
                <div class="box-body">
                    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                                <table class="table table-bordered table-hover" id="area-table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>{{ t('Title') }}</th>
                                        <th>{{ t('Actions') }}</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-7">
                                <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalCreate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                {!! Form::open(['method' => 'PUT', 'route' => 'admin.area.create', 'role' => 'form'])  !!}
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                               <span aria-hidden="true">&times;</span>
                               <span class="sr-only">{{ t('Close') }}</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            {{ t('Create') }}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">{{ t('Title') }}</label>
                            {!! Form::text('title',null,['class'=>'form-control','placeholder'=>t('Title')])  !!}
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

    <script>
        $(function() {



            $('#area-table').on('click','.btn[rel="delete"]',function(e) {
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
                                    $this.closest('tr').fadeOut(500,function(){
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


            $("#category").select2tree({
                theme: "bootstrap",
            });

            $('#area-table').DataTable({
                lengthMenu: [[10, 25, 100, -1], [10, 25, 100, "Todos"]],
                processing: true,
                serverSide: true,
                responsive: true,
                paging: true,
                lengthChange: true,
                searching: false,
                ordering: true,
                info: true,
                autoWidth: false,
                pageLength: 25,
                pagingType: 'full_numbers',
                search: {
                    caseInsensitive: true
                },
                order: [[ 1, "desc" ]],
                ajax: '{!! route('admin.area.data', ['type' => $type]) !!}',
                columns: [
                    { data: 'thumbnail', name: 'thumbnail', orderable: false, searchable: false },
                    { data: 'title', name: 'area.title' },
                    { data: 'actions', name: 'actions', orderable: false, searchable: false },
                ],
                fnInitComplete: function () {

                    $('div.dataTables_filter input').addClass('form-control');
                    $('div.dataTables_length select').addClass('form-control');

                    makeSortable();

                },
                language: {
                    processing: '<i class="fa fa-cog fa-spin fa-fw loading fa-2x"></i>',
                    sSearch: '{{ t("Search") }} ',
                    oPaginate: {
                        sFirst: '{{ t("First") }}',
                        sLast: '{{ t("Last") }}',
                        sNext: '{{ t("Next") }}',
                        sPrevious: '{{ t("Previous") }}'
                    },
                    sEmptyTable: '{{ t("Empty") }}',
                    sZeroRecords: '{{ t("Empty") }}',
                    sLengthMenu: '{{ t("Showing") }}&nbsp;_MENU_&nbsp;&nbsp;{{ t("records") }}',
                    info: "{{ t("Showing") }} _START_ {{ t("to") }} _END_ {{ t("of") }} _TOTAL_ {{ t("records") }}",
                },
                drawCallback: function(settings) {
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                },
                'createdRow': function( row, data, dataIndex ) {
                    $(row).attr('data-id', data.id);
                }
            });




        });



        function makeSortable(){

            $("#area-table tbody").sortable({
                update: function( event, ui ) {

                    var ordered_ids = [];

                    $(this).children().each(function(index) {
                        ordered_ids.push($(this).data('id'));
                    });

//                    console.log(ordered_ids)
                    $.ajax({
                        type: "POST",
                        url: "{{ url('admin/area/reorder') }}",
                        data: {
                            order: ordered_ids
                        },
                        globalLoading: true
                    });


                }
            });

        }


    </script>
@endsection