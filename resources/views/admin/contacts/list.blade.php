@extends('admin/master/index')
@section('content')

<?php

    $type = Request::get('type')?Request::get('type'):null;

// var_dump('asdasdaasd');
// foreach (auth()->user()->profiles() as $profile) {

//     var_dump($profile->name);

//  }


?>
    {{-- <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="callout callout-warning lead">
                <h4>Modulo en construcción</h4>
                <p>Por el momento se muestran todos los contactos, sin distribuir por Tasko/familia a los perfiles seleccionados</p>
            </div>
        </div>
    </div> --}}

    <div class="row">
        <div class="col-md-12">
            <a href="{{ route('admin.contacts.export', ['type' => $type]) }}" class="btn btn-primary export-to-excel pull-right"><i class="fa fa-download"></i> Exportar a Excel</a>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="box-body">
                    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">
                                <table class="table table-bordered table-hover" id="contacts-table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>{{ t('Date') }}</th>
                                        <th>Intereses</th>
                                        <th>{{ t('Name') }}</th>
                                        <th>{{ t('State') }}</th>
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


    <!-- MODAL VIEW/REPLY -->
    <div id="contact-view" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog  modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3>Contacto</h3>
                </div>
                <div class="modal-body">
                    <p class="modal-title" id="view_date">Fecha: <strong></strong></p>
                    <p class="modal-title" id="view_name">De: <strong></strong></p>
                    <p class="modal-title" id="view_company">Empresa: <strong></strong></p>
                    <p class="modal-title" id="view_company_category">Rubro: <strong></strong></p>
                    <hr>
                    <p class="modal-title" id="view_country">País: <strong></strong></p>
                    <p class="modal-title" id="view_state">Provincia: <strong></strong></p>
                    <p class="modal-title" id="view_city">Barrio / Ciudad: <strong></strong></p>
                    <p class="modal-title" id="view_phone">Teléfono: <strong></strong></p>
                    <p class="modal-title" id="view_email">E-mail: <strong></strong></p>
                    <hr>
                    <article></article>
                    <hr>
                    <h4>Responder:</h4>
                    <div class="alert alert-danger" role="alert" style="display: none;"></div>
                    <div class="alert alert-success" role="alert" style="display: none;"><strong>{{ t('Message successfully sent!') }}</strong></div>

                    <textarea class="contact-reply form-control" rows="5"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-reply" data-loading-text="{{ t('Sending') }}..." data-id="">{{ t('Reply') }}</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{ t('Close') }}</button>
                </div>
            </div>
        </div>
    </div>


    {{ Form::open(['method' => 'DELETE', 'route' => ['admin.contacts.delete','xx'], 'name' => 'delete']) }}
        <input name="type" type="hidden" value="{{$type}}">
    {{ Form::close() }}


@endsection

@section('extra-js')

    <script>
       $(function() {

            $('#contacts-table').DataTable({
                processing: true,
                responsive: true,
                paging: true,
                lengthChange: true,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                pageLength: 25,
                pagingType: 'full_numbers',
                search: {
                    caseInsensitive: true
                },
                order: [[ 0, "desc" ]],
                data: {!!$items!!},
                columns: [
                    { data: 'id', orderable: false, searchable: false },
                    { data: 'status', 'className': 'text-center', orderable: false, searchable: false},
                    { data: 'dateForm' },
                    { data: 'actions_description' },
                    { data: 'fullName' },
                    { data: 'state_description', orderable: true, searchable: true },
                    { data: 'buttons', orderable: false, searchable: false }
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
                    sLengthMenu: '{{ t("Showing") }}&nbsp;_MENU_&nbsp;&nbsp;{{ t("records") }}',
                    info: "{{ t("Showing") }} _START_ {{ t("to") }} _END_ {{ t("of") }} _TOTAL_ {{ t("records") }}",
                }
            });



            $('.btn-view').on('click', function(e){
                e.preventDefault();
                var button = $(this),
                    modal = $('#contact-view');

                $(this).ajaxSubmit({
                    url: '{{ route('admin.contacts.view') }}',
                    type: 'post',
                    data: {id: button.data('id')},
                    success:function(data){
                        console.log(data);

                        modal.find('h3').html('Contacto de ' + data.fullName);
                        modal.find('.modal-body article').html(data.message);
                        modal.find('.modal-body textarea').html(data.reply_msg);
                        modal.find('.btn-reply').attr('data-id', button.data('id'));

                        modal.find('#view_name strong').html(data.fullName);
                        modal.find('#view_date strong').html(data.dateForm);
                        modal.find('#view_company strong').html(data.company);
                        modal.find('#view_company_category strong').html(data.company_category_description);
                        modal.find('#view_email strong').html(data.email);
                        modal.find('#view_phone strong').html(data.phone);
                        modal.find('#view_country strong').html(data.country_description);
                        modal.find('#view_state strong').html(data.state_description);
                        modal.find('#view_city strong').html(data.city_description);

                        $('#contact-view').modal('show');
                    },
                    error: function(data){
                        console.log(data);
                    }
                });
            });


            $('.btn-delete').on('click',function(e) {
                e.preventDefault();

                var id = $(this).data('id');
                var old = $('form[name="delete"]').attr('action');
                var act = old.replace("xx", id);

                $('form[name="delete"]').attr('action', act);

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
                            $('form[name="delete"]').attr('action', old);
                            dlg.close();
                        }
                    }]
                });
            });


            $('.btn-reply').on('click', function(e){
                var button = $(this),
                    txt = $('.contact-reply').val();

                button.button('loading');

                if(txt == '' || txt == 'undefined') {
                    $('.alert-danger').html('Por favor escriba un mensaje.').slideDown();
                    setTimeout(function(){
                        $('#contact-view .alert-danger').slideUp(function(){ $(this).empty(); });
                    }, 3500);
                    button.button('reset');
                }
                else {
                    $(this).ajaxSubmit({
                        url: '{{ route('admin.contacts.reply') }}',
                        type: 'post',
                        data: {id: button.data('id'), reply: txt},
                        success:function(data){
                            $('#contact-view .alert-success').slideDown();
                            setTimeout(function(){
                                $('#contact-view .alert-success').slideUp(function(){ $('#contact-view').modal('hide'); });
                            }, 3500);
                        },
                        error: function(data){
                            $('.alert-danger').html('Hubo un error al enviar la respuesta, intentalo de nuevo.').slideDown();
                            setTimeout(function(){
                                $('#contact-view .alert-danger').slideUp(function(){ $(this).empty(); });
                            }, 3500);
                        },
                        complete: function(){ button.button('reset'); }
                    });
                }


            });

        });
    </script>

@endsection