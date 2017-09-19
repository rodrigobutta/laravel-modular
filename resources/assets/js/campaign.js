
function getLocations(type, id){
    if(type == 'countries') {
        $('.form-response-overlay').fadeIn(100);//.css('display', 'flex');
        var ajaxUrl = route_contact_states;
        var element = $('form select[name="states"]');
    }
    else if(type == 'states') {
        $('.form-response-overlay').fadeIn(100);//.css('display', 'flex');
        var ajaxUrl = route_contact_cities;
        var element = $('form select[name="cities"]');
    }
    else { return false; }

    $(this).ajaxSubmit({
        url: ajaxUrl,
        type: 'post',
        data: {id: id},
        success:function(resp) {
            if(!$.isEmptyObject(resp)) {
                //Si el objeto del response no está vacío armo las opciones
                //y las meto en el select. Si hay un input lo borro.
                options = '<option selected>'+element.attr('title')+'</option>';
                for (var key in resp) {
                    options += '<option value="'+key+'">'+resp[key]+'</option>';
                }
                element.siblings('input').remove();
                element.html(options).show().removeAttr('disabled');
            }
            else {
                //Si el objecto viene vacío me fijo si ya existe un input para
                //reemplazar el select. Si existe lo muestro y si no lo creo.
                if(element.siblings('input').length > 0) { element.siblings('input').show(); }
                else {
                    element.before('<input required="required" class="form-control" placeholder="'+element.attr('title')+'" name="txt_'+element.attr('name')+'" type="text">');
                }
                element.hide();
            }
            //Si el select es países oculto ciudades y borro sus input si los tiene
            if(type == 'countries') {
                $('form select[name="cities"]').hide().siblings('input').remove();
            }

            $('.form-response-overlay').fadeOut(100);
        },
        error:function() {
            console.log('ERROR geting location');
            $('.form-response-overlay').fadeOut(100);
        }
    });
}



function campaignFormBind(){


    var $sale_new_action = $('.action_checkbox[value="3"]').parent().parent();
    $('.category_checkbox').on('click', function(e) {
        var $this = $(this);
        if ($this.val() == 43) {
            if ($this.is(':checked')) {
                $sale_new_action.css('display', 'none').find('input[type="checkbox"]').attr('name', 'asdzxcqwe');
            } else {
                $sale_new_action.css('display', '').find('input[type="checkbox"]').attr('name', 'actions[]');
            }

        }
    });


    $('form input[type="text"]').off('blur').on('blur', function(e) {
        var $this = $(this);
        if ($this.val()) {
            $this.addClass('open');
        } else {
            $this.removeClass('open');
        }
    });



    //Si el país viene seleccionado busco estados/provincias
    if($('form select[name="countries"').val() != '' && $('form  select[name="countries"').val() != undefined) {
        getLocations($('form select[name="countries"').attr('name'), $('form  select[name="countries"').val());
    }


    $('form select').off('change').on('change', function(){
        getLocations($(this).attr('name'), $(this).val());
    });

    $('form *').off('focus').on('focus', function(){
        $(this).removeClass('error');
    });


    // FOMR SUBMIT
    $('form').off('submit').on('submit', function(e){
        e.preventDefault();

        var theform = $(this);
        var formtype = 'contact';
        if (theform.hasClass('task')) {
            formtype = 'task.' + window.location.href.split('/').pop();
        } else if(theform.hasClass('category')) {
            formtype = 'category.' + window.location.href.split('/').pop();
        }

        var container = $(this).closest('form');
        var overlay = container.find('.form-response-overlay');

        overlay.html('Cargando..').fadeIn(100);//.css('display', 'flex');

        container.find('.alert-danger').html('');

        $(this).ajaxSubmit({
            url: route_contact_store,
            type: 'post',
            data: JSON.stringify($(this).serialize()),
            complete:function() {

            },
            success:function(data){

                container.find('.form-header h4').html('Muchas gracias!');
                // container.find('.form-fields .form-group').css({'visibility':'hidden'});
                // container.find('.form-fields').css({'background-color':'#008657'});

                overlay.html(data);

                $.cookie("user_known", '1', {
                   expires : 365,
                   path    : '/'
                });

                ga('send', 'event', 'contact', 'form.sent', formtype);

            },
            error: function(data){

                overlay.fadeOut(100);

                var errors = '',
                    fields = [];

                if(data.status == 422) {
                    var errorsObj = JSON.parse(data.responseText.match("\\{.*}")[0]);
                    $.each( errorsObj, function( key, value ) {
                      errors += '-'+ value +'<br>';
                      container.find(' *[name="'+key+'"]').addClass('error');
                    });

                    ga('send', 'event', 'contact', 'validation.error', formtype);
                } else {
                    ga('send', 'event', 'contact', 'error', formtype);
                    errors = data;
                }

                container.find('.alert-danger').html(errors).slideDown();

            }
        });
    });

}

