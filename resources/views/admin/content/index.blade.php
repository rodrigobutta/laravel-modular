@extends('admin/master/index')
@section('content')



<div class="row">
    <div class="col-md-12">
        <a href="{{ route('admin.contents.create') }}" class="btn btn-primary">Nuevo Contenido</a>
    </div>
</div>


<div class="row">
    <div class="col-md-12">

        <div class="box">
            <div class="box-body">
                <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                    <div class="row">
                        <div class="col-sm-6"></div>
                        <div class="col-sm-6"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                            <table class="table table-bordered table-hover" id="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>{{ t('Title') }}</th>
                                    <th>{{ t('Name') }}</th>
                                    <th>{{ t('Type') }}</th>
                                    <th>{{ t('Created At') }}</th>
                                    <th>{{ t('Updated At') }}</th>
                                    <th>{{ t('User') }}</th>
                                    <th>{{ t('Profile') }}</th>
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
@endsection

@section('extra-js')
    <script>
        $(function() {



            $('#table').DataTable({
                // destroy: true,
                processing: true,
                serverSide: true,
                responsive: true,
                autoWidth: false,
                pagingType: 'full_numbers',
                search: {
                    caseInsensitive: true
                },
                order: [[ 2, "asc" ]],
                ajax: '{!! route('admin.contents.data', ['type' => $type]) !!}',
                columns: [
                    { data: 'id', name: 'contents.id'},
                    { data: 'title', name: 'contents.title' },
                    { data: 'name', name: 'contents.name' },
                    { data: 'type', name: 'contents.type' },
                    { data: 'created_at', name: 'contents.created_at' },
                    { data: 'updated_at', name: 'contents.updated_at' },
                    { data: 'user', name: 'user' , orderable: false},
                    { data: 'profile', name: 'profile' , orderable: false},
                    { data: 'actions', name: 'actions', orderable: false, searchable: false },
                ],
                fnInitComplete: function () {

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
                    sLengthMenu: '{{ t("Showing") }} _MENU_ {{ t("records") }}'
                }
            });

        });





    </script>
@endsection