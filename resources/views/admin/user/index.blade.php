@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                        <table class="table table-bordered table-striped table-hover" id="images-table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                {{-- <th>Aprobado</th> --}}
                                <th>Método</th>
                                {{-- <th>Avatar</th> --}}
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Email</th>
                                <th>Perfiles</th>
                                {{-- <th>Creado</th> --}}
                                {{-- <th>Actualizado</th> --}}
                                <th>Acciones</th>
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
@endsection

@section('extra-js')
    <script>
        $(function () {




            @if(env('APP_DEBUG') == false)$.fn.dataTable.ext.errMode = 'none';@endif
            $('#images-table').DataTable({
                processing: true,
                serverSide: true,
                responsive: true,
                paging: true,
                lengthChange: true,
                searching: false,
                ordering: true,
                info: true,
                autoWidth: false,
                pageLength: 50,
                pagingType: 'full_numbers',
                search: {
                    caseInsensitive: true
                },
                ajax: '{!! route('admin.users.data', ['type' => $type]) !!}',
                columns: [
                    {data: 'id', name: 'users.id'},
                    // {data: 'thumbnail', name: 'thumbnail', orderable: false, searchable: false},
                    // {data: 'approved', name: 'approved', orderable: false, searchable: false},
                    {data: 'method', name: 'method', orderable: false, searchable: false},
                    {data: 'username', name: 'username',},
                    {data: 'fullname', name: 'fullname',},
                    {data: 'email', name: 'users.email',},
                    {data: 'profiles', name: 'profiles', searchable: false},
                    // {data: 'created_at', name: 'users.created_at'},
                    // {data: 'updated_at', name: 'users.updated_at'},
                    {data: 'buttons', name: 'buttons', orderable: false, searchable: false}
                ],
                fnInitComplete: function () {
                    userApprove();
                    userDisapprove();
                    $('div.dataTables_filter input').addClass('form-control');
                    $('div.dataTables_length select').addClass('form-control');
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
                }
            });
        });
    </script>
@endsection