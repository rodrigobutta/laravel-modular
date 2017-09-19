
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



function getLocations(type, id){
    if(type == 'countries') {
        $('.form-response-overlay').fadeIn(100);//.css('display', 'flex');
        var ajaxUrl = route_contact_states;
        var element = $('.contact-form select[name="states"]');
    }
    else if(type == 'states') {
        $('.form-response-overlay').fadeIn(100);//.css('display', 'flex');
        var ajaxUrl = route_contact_cities;
        var element = $('.contact-form select[name="cities"]');
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
                $('.contact-form select[name="cities"]').hide().siblings('input').remove();
            }

            $('.form-response-overlay').fadeOut(100);
        },
        error:function() {
            console.log('ERROR geting location');
            $('.form-response-overlay').fadeOut(100);
        }
    });
}



function contactFormBind(){


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


    $('form.contact-form input[type="text"]').off('blur').on('blur', function(e) {
        var $this = $(this);
        if ($this.val()) {
            $this.addClass('open');
        } else {
            $this.removeClass('open');
        }
    });



    //Si el país viene seleccionado busco estados/provincias
    if($('form.contact-form select[name="countries"').val() != '' && $('.contact-form  select[name="countries"').val() != undefined) {
        getLocations($('.contact-form select[name="countries"').attr('name'), $('.contact-form  select[name="countries"').val());
    }


    $('form.contact-form select').off('change').on('change', function(){
        getLocations($(this).attr('name'), $(this).val());
    });

    $('form.contact-form *').off('focus').on('focus', function(){
        $(this).removeClass('error');
    });


    // FOMR SUBMIT
    $('form.contact-form').off('submit').on('submit', function(e){
        e.preventDefault();

        var theform = $(this);
        var formtype = 'contact';
        if (theform.hasClass('task')) {
            formtype = 'task.' + window.location.href.split('/').pop();
        } else if(theform.hasClass('category')) {
            formtype = 'category.' + window.location.href.split('/').pop();
        }

        var container = $(this).closest('form.contact-form');
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


var wh = 0;

$(function(){

    wh = $(window).height()


    $(window).trigger('scroll')

});




$(window).on('scroll', function(){

    var scroll = $(window).scrollTop()

    if($('header').hasClass('always')){

        $('header').addClass('small');
    }
    else{

        // if(scroll >= wh * 0.7) {
        //     $('header').addClass('small');
        // }
        // else {
        //     $('header').removeClass('small');
        // }

        // if(scroll <= 20) {
        //     $('header').addClass('initial');
        // }
        // else {
        //     $('header').removeClass('initial');
        // }

    }



});


$(window).on('resize', function(e){

    wh = $(window).height()

});


$(function(){


	// $('[data-typer-targets]').typer();

    mobileFastClick();
	mobileMenu();
	mainMenu();
	mobileBtnClick();
	mobileClickSubMenus();
	mobileMenuOutsideClick();

	windowResize();

	windowScroll();
	scrlTop();

	bindWaypoints();



		if ($('#home_developments').length > 0 ) {
			$('#home_developments').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateTask , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '75%' } );
		}


});


	// iPad and iPod detection
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
	return (
	  (navigator.platform.indexOf("iPhone") != -1) ||
	  (navigator.platform.indexOf("iPod") != -1)
	);
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
	    if ( $(window).width() < 769 ) {
	        $('html,body').addClass('intranet-overflow');

	        if ( $('#intranet-mobile-menu').length < 1 ) {

	            var clone = $('#intranet-primary-menu').clone().attr({
	                id: 'intranet-mobile-menu-ul',
	                class: ''
	            });
	            var cloneLogo = $('#intranet-logo').clone().attr({
	                id : 'intranet-logo-mobile',
	                class : ''
	            });

	            $('<div id="intranet-logo-mobile-wrap">').append(cloneLogo).insertBefore('#intranet-header-section');
	            // $('#intranet-logo-mobile-wrap').append('<a href="#" id="intranet-mobile-menu-btn"><i class="ti-menu"></i></a>')
	            $('#intranet-logo-mobile-wrap').append('<a href="#" class="js-intranet-nav-toggle intranet-nav-toggle" data-toggle="collapse" data-target="#intranet-navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>');
	            $('<div id="intranet-mobile-menu">').append(clone).insertBefore('#intranet-header-section');

	            $('#intranet-header-section').hide();
	            $('#intranet-logo-mobile-wrap').show();
	        } else {
	            $('#intranet-header-section').hide();
	            $('#intranet-logo-mobile-wrap').show();
	        }

	    } else {

	        $('#intranet-logo-mobile-wrap').hide();
	        $('#intranet-header-section').show();
	        $('html,body').removeClass('intranet-overflow');
	        $('.js-intranet-nav-toggle').removeClass('active');
	        if ( $('body').hasClass('intranet-mobile-menu-visible')) {
	            $('body').removeClass('intranet-mobile-menu-visible');
	        }
	    }
	};


	// ScrollTop
	var scrlTop =  function() {
	    $('.intranet-gotop').click(function(event){
	        $('html, body').animate({
	            scrollTop: 0
	        }, 500, 'easeInOutExpo');

	        event.preventDefault();
	        return false;
	    });
	};


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#intranet-mobile-menu, .js-intranet-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('intranet-mobile-menu-visible');
	      $('.js-intranet-nav-toggle').removeClass('active');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		$(document).on('click', '.js-intranet-nav-toggle', function(e){
			e.preventDefault();
			// intranet-mobile-menu-visible
			if ( $('body').hasClass('intranet-mobile-menu-visible') ) {
				$('body').removeClass('intranet-mobile-menu-visible');
				$(this).removeClass('active');
			} else {
				$('body').addClass('intranet-mobile-menu-visible');
				$(this).addClass('active');
			}

		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#intranet-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.intranet-sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .intranet-sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();

			if ( $('body').hasClass('intranet-mobile-menu-visible') ) {
				$('body').removeClass('intranet-mobile-menu-visible');
				$('.js-intranet-nav-toggle').removeClass('active');
			}

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Scroll Animations






	// Animate Feature
	var animateFeature = function() {
		if ( $('.feature-box').length > 0 ) {
			$('.feature-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};


	// Animate About
	var animateAbout = function() {
		if ( $('.about-box').length > 0 ) {
			$('.about-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};



	// Animate Works
	var animateWork = function() {
		if ( $('.work-box').length > 0 ) {
			$('.work-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInDown animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};



	// Animate Tasks
	var animateTask = function() {
		if ( $('.task-box').length > 0 ) {
			$('.task-box').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};

	// Animate Footer
	var animateFooter = function() {

		$('.footer-box').each(function( k ) {

			var el = $(this);

			setTimeout ( function () {
				// el.animate({opacity: 1} , 600 );
				el.addClass('fadeInUp animated');
			},  k * 200, 'easeInOutExpo' );

		});
	};


	var animateSlogan = function() {
		if ( $('.in-animate').length > 0 ) {
			$('.in-animate').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};



	var animateTestimonials = function() {
		if ( $('.anim-testimonials').length > 0 ) {
			$('.anim-testimonials').each(function( k ) {

				var el = $(this);

				setTimeout ( function () {
					// el.animate({opacity: 1} , 600 );
					el.addClass('fadeInUp animated');
				},  k * 200, 'easeInOutExpo' );

			});
		}
	};



	// Waypoints
	var bindWaypoints = function() {

		if ($('#intranet-features').length > 0 ) {
			$('#intranet-features').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateFeature , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '75%' } );
		}


		if ($('#intranet_about').length > 0 ) {
			$('#intranet_about').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateAbout , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '75%' } );
		}


		if ($('#intranet_clients').length > 0 ) {
			$('#intranet_clients').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateWork , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '75%' } );
		}





		if ( $('#intranet_slogan').length > 0 ) {
			$('#intranet_slogan').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateSlogan , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '95%' } );
		}


		if ( $('#intranet_testimonials').length > 0 ) {
			$('#intranet_testimonials').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateTestimonials , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '95%' } );
		}


		if ( $('#intranet-footer').length > 0 ) {
			$('#intranet-footer').waypoint( function( direction ) {

				if( direction === 'down' && !$(this).hasClass('animated') ) {

					setTimeout( animateFooter , 200);

					$(this).addClass('animated');

				}
				// 95%
			} , { offset: '95%' } );
		}



	};

	// var heroWayPoint = function() {
	// 	if ( $('#intranet-hero').length > 0 ) {
	// 		$('#intranet-hero').waypoint( function( direction ) {

	// 			if( direction === 'down' && !$(this).hasClass('animated') ) {


	// 				setTimeout(function(){
	// 					$('.hero-animate-1').addClass('fadeInUp animated');
	// 				}, 100);
	// 				setTimeout(function(){
	// 					$('.hero-animate-2').addClass('fadeInUp animated');
	// 				}, 400);
	// 				setTimeout(function(){
	// 					$('.hero-animate-3').addClass('fadeInUp animated');
	// 				}, 600);
	// 				setTimeout(function(){
	// 					$('.hero-animate-4').addClass('fadeInDown animated');
	// 				}, 1000);

	// 				$(this).addClass('animated');

	// 			}
	// 		} , { offset: '75%' } );
	// 	}
	// };


	var startAnimation = function() {

		if ( $('.intranet-parallax-cover').length > 0 ) {

			setTimeout(function(){
				$('.intranet-cover-title').addClass('fadeInUp animated');
			}, 100);
			setTimeout(function(){
				$('.intranet-cover-subtitle').addClass('fadeInUp animated');
			}, 400);
			setTimeout(function(){
				$('.intranet-cover-cta').addClass('fadeInUp animated');
			}, 600);


			$(this).addClass('animated');


		}

	};


	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
				$(this.element).addClass('fadeInUp animated');
			}

		} , { offset: '75%' } );

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {
				$(this.element).addClass('fadeInUp animated');
			}

		} , { offset: '75%' } );

	};




function pageStart(){

	  startAnimation();

}

	// window.onload = function() {

	// };

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbXBhaWduLmpzIiwiZm9ybS5qcyIsImZyb250ZW5kLmpzIiwiaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZnVuY3Rpb24gZ2V0TG9jYXRpb25zKHR5cGUsIGlkKXtcclxuICAgIGlmKHR5cGUgPT0gJ2NvdW50cmllcycpIHtcclxuICAgICAgICAkKCcuZm9ybS1yZXNwb25zZS1vdmVybGF5JykuZmFkZUluKDEwMCk7Ly8uY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuICAgICAgICB2YXIgYWpheFVybCA9IHJvdXRlX2NvbnRhY3Rfc3RhdGVzO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gJCgnZm9ybSBzZWxlY3RbbmFtZT1cInN0YXRlc1wiXScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlID09ICdzdGF0ZXMnKSB7XHJcbiAgICAgICAgJCgnLmZvcm0tcmVzcG9uc2Utb3ZlcmxheScpLmZhZGVJbigxMDApOy8vLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgdmFyIGFqYXhVcmwgPSByb3V0ZV9jb250YWN0X2NpdGllcztcclxuICAgICAgICB2YXIgZWxlbWVudCA9ICQoJ2Zvcm0gc2VsZWN0W25hbWU9XCJjaXRpZXNcIl0nKTtcclxuICAgIH1cclxuICAgIGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAkKHRoaXMpLmFqYXhTdWJtaXQoe1xyXG4gICAgICAgIHVybDogYWpheFVybCxcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgZGF0YToge2lkOiBpZH0sXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXNwKSB7XHJcbiAgICAgICAgICAgIGlmKCEkLmlzRW1wdHlPYmplY3QocmVzcCkpIHtcclxuICAgICAgICAgICAgICAgIC8vU2kgZWwgb2JqZXRvIGRlbCByZXNwb25zZSBubyBlc3TDoSB2YWPDrW8gYXJtbyBsYXMgb3BjaW9uZXNcclxuICAgICAgICAgICAgICAgIC8veSBsYXMgbWV0byBlbiBlbCBzZWxlY3QuIFNpIGhheSB1biBpbnB1dCBsbyBib3Jyby5cclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAnPG9wdGlvbiBzZWxlY3RlZD4nK2VsZW1lbnQuYXR0cigndGl0bGUnKSsnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXNwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyArPSAnPG9wdGlvbiB2YWx1ZT1cIicra2V5KydcIj4nK3Jlc3Bba2V5XSsnPC9vcHRpb24+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2libGluZ3MoJ2lucHV0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwob3B0aW9ucykuc2hvdygpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1NpIGVsIG9iamVjdG8gdmllbmUgdmFjw61vIG1lIGZpam8gc2kgeWEgZXhpc3RlIHVuIGlucHV0IHBhcmFcclxuICAgICAgICAgICAgICAgIC8vcmVlbXBsYXphciBlbCBzZWxlY3QuIFNpIGV4aXN0ZSBsbyBtdWVzdHJvIHkgc2kgbm8gbG8gY3Jlby5cclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuc2libGluZ3MoJ2lucHV0JykubGVuZ3RoID4gMCkgeyBlbGVtZW50LnNpYmxpbmdzKCdpbnB1dCcpLnNob3coKTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5iZWZvcmUoJzxpbnB1dCByZXF1aXJlZD1cInJlcXVpcmVkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIicrZWxlbWVudC5hdHRyKCd0aXRsZScpKydcIiBuYW1lPVwidHh0XycrZWxlbWVudC5hdHRyKCduYW1lJykrJ1wiIHR5cGU9XCJ0ZXh0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1NpIGVsIHNlbGVjdCBlcyBwYcOtc2VzIG9jdWx0byBjaXVkYWRlcyB5IGJvcnJvIHN1cyBpbnB1dCBzaSBsb3MgdGllbmVcclxuICAgICAgICAgICAgaWYodHlwZSA9PSAnY291bnRyaWVzJykge1xyXG4gICAgICAgICAgICAgICAgJCgnZm9ybSBzZWxlY3RbbmFtZT1cImNpdGllc1wiXScpLmhpZGUoKS5zaWJsaW5ncygnaW5wdXQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnLmZvcm0tcmVzcG9uc2Utb3ZlcmxheScpLmZhZGVPdXQoMTAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRVJST1IgZ2V0aW5nIGxvY2F0aW9uJyk7XHJcbiAgICAgICAgICAgICQoJy5mb3JtLXJlc3BvbnNlLW92ZXJsYXknKS5mYWRlT3V0KDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY2FtcGFpZ25Gb3JtQmluZCgpe1xyXG5cclxuXHJcbiAgICB2YXIgJHNhbGVfbmV3X2FjdGlvbiA9ICQoJy5hY3Rpb25fY2hlY2tib3hbdmFsdWU9XCIzXCJdJykucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICAkKCcuY2F0ZWdvcnlfY2hlY2tib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoJHRoaXMudmFsKCkgPT0gNDMpIHtcclxuICAgICAgICAgICAgaWYgKCR0aGlzLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkc2FsZV9uZXdfYWN0aW9uLmNzcygnZGlzcGxheScsICdub25lJykuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuYXR0cignbmFtZScsICdhc2R6eGNxd2UnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzYWxlX25ld19hY3Rpb24uY3NzKCdkaXNwbGF5JywgJycpLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmF0dHIoJ25hbWUnLCAnYWN0aW9uc1tdJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ2Zvcm0gaW5wdXRbdHlwZT1cInRleHRcIl0nKS5vZmYoJ2JsdXInKS5vbignYmx1cicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmICgkdGhpcy52YWwoKSkge1xyXG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvL1NpIGVsIHBhw61zIHZpZW5lIHNlbGVjY2lvbmFkbyBidXNjbyBlc3RhZG9zL3Byb3ZpbmNpYXNcclxuICAgIGlmKCQoJ2Zvcm0gc2VsZWN0W25hbWU9XCJjb3VudHJpZXNcIicpLnZhbCgpICE9ICcnICYmICQoJ2Zvcm0gIHNlbGVjdFtuYW1lPVwiY291bnRyaWVzXCInKS52YWwoKSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBnZXRMb2NhdGlvbnMoJCgnZm9ybSBzZWxlY3RbbmFtZT1cImNvdW50cmllc1wiJykuYXR0cignbmFtZScpLCAkKCdmb3JtICBzZWxlY3RbbmFtZT1cImNvdW50cmllc1wiJykudmFsKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKCdmb3JtIHNlbGVjdCcpLm9mZignY2hhbmdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2V0TG9jYXRpb25zKCQodGhpcykuYXR0cignbmFtZScpLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2Zvcm0gKicpLm9mZignZm9jdXMnKS5vbignZm9jdXMnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gRk9NUiBTVUJNSVRcclxuICAgICQoJ2Zvcm0nKS5vZmYoJ3N1Ym1pdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHZhciB0aGVmb3JtID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgZm9ybXR5cGUgPSAnY29udGFjdCc7XHJcbiAgICAgICAgaWYgKHRoZWZvcm0uaGFzQ2xhc3MoJ3Rhc2snKSkge1xyXG4gICAgICAgICAgICBmb3JtdHlwZSA9ICd0YXNrLicgKyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGVmb3JtLmhhc0NsYXNzKCdjYXRlZ29yeScpKSB7XHJcbiAgICAgICAgICAgIGZvcm10eXBlID0gJ2NhdGVnb3J5LicgKyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnBvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQodGhpcykuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAgIHZhciBvdmVybGF5ID0gY29udGFpbmVyLmZpbmQoJy5mb3JtLXJlc3BvbnNlLW92ZXJsYXknKTtcclxuXHJcbiAgICAgICAgb3ZlcmxheS5odG1sKCdDYXJnYW5kby4uJykuZmFkZUluKDEwMCk7Ly8uY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy5hbGVydC1kYW5nZXInKS5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hamF4U3VibWl0KHtcclxuICAgICAgICAgICAgdXJsOiByb3V0ZV9jb250YWN0X3N0b3JlLFxyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCQodGhpcykuc2VyaWFsaXplKCkpLFxyXG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmZpbmQoJy5mb3JtLWhlYWRlciBoNCcpLmh0bWwoJ011Y2hhcyBncmFjaWFzIScpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udGFpbmVyLmZpbmQoJy5mb3JtLWZpZWxkcyAuZm9ybS1ncm91cCcpLmNzcyh7J3Zpc2liaWxpdHknOidoaWRkZW4nfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb250YWluZXIuZmluZCgnLmZvcm0tZmllbGRzJykuY3NzKHsnYmFja2dyb3VuZC1jb2xvcic6JyMwMDg2NTcnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5odG1sKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcl9rbm93blwiLCAnMScsIHtcclxuICAgICAgICAgICAgICAgICAgIGV4cGlyZXMgOiAzNjUsXHJcbiAgICAgICAgICAgICAgICAgICBwYXRoICAgIDogJy8nXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdjb250YWN0JywgJ2Zvcm0uc2VudCcsIGZvcm10eXBlKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LmZhZGVPdXQoMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMgPT0gNDIyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yc09iaiA9IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZVRleHQubWF0Y2goXCJcXFxcey4qfVwiKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCBlcnJvcnNPYmosIGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JzICs9ICctJysgdmFsdWUgKyc8YnI+JztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5maW5kKCcgKltuYW1lPVwiJytrZXkrJ1wiXScpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdjb250YWN0JywgJ3ZhbGlkYXRpb24uZXJyb3InLCBmb3JtdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ2NvbnRhY3QnLCAnZXJyb3InLCBmb3JtdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZmluZCgnLmFsZXJ0LWRhbmdlcicpLmh0bWwoZXJyb3JzKS5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuIiwiXHJcbmZ1bmN0aW9uIGdldExvY2F0aW9ucyh0eXBlLCBpZCl7XHJcbiAgICBpZih0eXBlID09ICdjb3VudHJpZXMnKSB7XHJcbiAgICAgICAgJCgnLmZvcm0tcmVzcG9uc2Utb3ZlcmxheScpLmZhZGVJbigxMDApOy8vLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgdmFyIGFqYXhVcmwgPSByb3V0ZV9jb250YWN0X3N0YXRlcztcclxuICAgICAgICB2YXIgZWxlbWVudCA9ICQoJy5jb250YWN0LWZvcm0gc2VsZWN0W25hbWU9XCJzdGF0ZXNcIl0nKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYodHlwZSA9PSAnc3RhdGVzJykge1xyXG4gICAgICAgICQoJy5mb3JtLXJlc3BvbnNlLW92ZXJsYXknKS5mYWRlSW4oMTAwKTsvLy5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xyXG4gICAgICAgIHZhciBhamF4VXJsID0gcm91dGVfY29udGFjdF9jaXRpZXM7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkKCcuY29udGFjdC1mb3JtIHNlbGVjdFtuYW1lPVwiY2l0aWVzXCJdJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgJCh0aGlzKS5hamF4U3VibWl0KHtcclxuICAgICAgICB1cmw6IGFqYXhVcmwsXHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIGRhdGE6IHtpZDogaWR9LFxyXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcCkge1xyXG4gICAgICAgICAgICBpZighJC5pc0VtcHR5T2JqZWN0KHJlc3ApKSB7XHJcbiAgICAgICAgICAgICAgICAvL1NpIGVsIG9iamV0byBkZWwgcmVzcG9uc2Ugbm8gZXN0w6EgdmFjw61vIGFybW8gbGFzIG9wY2lvbmVzXHJcbiAgICAgICAgICAgICAgICAvL3kgbGFzIG1ldG8gZW4gZWwgc2VsZWN0LiBTaSBoYXkgdW4gaW5wdXQgbG8gYm9ycm8uXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJzxvcHRpb24gc2VsZWN0ZWQ+JytlbGVtZW50LmF0dHIoJ3RpdGxlJykrJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcmVzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgKz0gJzxvcHRpb24gdmFsdWU9XCInK2tleSsnXCI+JytyZXNwW2tleV0rJzwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNpYmxpbmdzKCdpbnB1dCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKG9wdGlvbnMpLnNob3coKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9TaSBlbCBvYmplY3RvIHZpZW5lIHZhY8OtbyBtZSBmaWpvIHNpIHlhIGV4aXN0ZSB1biBpbnB1dCBwYXJhXHJcbiAgICAgICAgICAgICAgICAvL3JlZW1wbGF6YXIgZWwgc2VsZWN0LiBTaSBleGlzdGUgbG8gbXVlc3RybyB5IHNpIG5vIGxvIGNyZW8uXHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LnNpYmxpbmdzKCdpbnB1dCcpLmxlbmd0aCA+IDApIHsgZWxlbWVudC5zaWJsaW5ncygnaW5wdXQnKS5zaG93KCk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYmVmb3JlKCc8aW5wdXQgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCInK2VsZW1lbnQuYXR0cigndGl0bGUnKSsnXCIgbmFtZT1cInR4dF8nK2VsZW1lbnQuYXR0cignbmFtZScpKydcIiB0eXBlPVwidGV4dFwiPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9TaSBlbCBzZWxlY3QgZXMgcGHDrXNlcyBvY3VsdG8gY2l1ZGFkZXMgeSBib3JybyBzdXMgaW5wdXQgc2kgbG9zIHRpZW5lXHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gJ2NvdW50cmllcycpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jb250YWN0LWZvcm0gc2VsZWN0W25hbWU9XCJjaXRpZXNcIl0nKS5oaWRlKCkuc2libGluZ3MoJ2lucHV0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJy5mb3JtLXJlc3BvbnNlLW92ZXJsYXknKS5mYWRlT3V0KDEwMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SIGdldGluZyBsb2NhdGlvbicpO1xyXG4gICAgICAgICAgICAkKCcuZm9ybS1yZXNwb25zZS1vdmVybGF5JykuZmFkZU91dCgxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGNvbnRhY3RGb3JtQmluZCgpe1xyXG5cclxuXHJcbiAgICB2YXIgJHNhbGVfbmV3X2FjdGlvbiA9ICQoJy5hY3Rpb25fY2hlY2tib3hbdmFsdWU9XCIzXCJdJykucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICAkKCcuY2F0ZWdvcnlfY2hlY2tib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoJHRoaXMudmFsKCkgPT0gNDMpIHtcclxuICAgICAgICAgICAgaWYgKCR0aGlzLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkc2FsZV9uZXdfYWN0aW9uLmNzcygnZGlzcGxheScsICdub25lJykuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuYXR0cignbmFtZScsICdhc2R6eGNxd2UnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzYWxlX25ld19hY3Rpb24uY3NzKCdkaXNwbGF5JywgJycpLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmF0dHIoJ25hbWUnLCAnYWN0aW9uc1tdJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ2Zvcm0uY29udGFjdC1mb3JtIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJykub2ZmKCdibHVyJykub24oJ2JsdXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoJHRoaXMudmFsKCkpIHtcclxuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy9TaSBlbCBwYcOtcyB2aWVuZSBzZWxlY2Npb25hZG8gYnVzY28gZXN0YWRvcy9wcm92aW5jaWFzXHJcbiAgICBpZigkKCdmb3JtLmNvbnRhY3QtZm9ybSBzZWxlY3RbbmFtZT1cImNvdW50cmllc1wiJykudmFsKCkgIT0gJycgJiYgJCgnLmNvbnRhY3QtZm9ybSAgc2VsZWN0W25hbWU9XCJjb3VudHJpZXNcIicpLnZhbCgpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGdldExvY2F0aW9ucygkKCcuY29udGFjdC1mb3JtIHNlbGVjdFtuYW1lPVwiY291bnRyaWVzXCInKS5hdHRyKCduYW1lJyksICQoJy5jb250YWN0LWZvcm0gIHNlbGVjdFtuYW1lPVwiY291bnRyaWVzXCInKS52YWwoKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICQoJ2Zvcm0uY29udGFjdC1mb3JtIHNlbGVjdCcpLm9mZignY2hhbmdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2V0TG9jYXRpb25zKCQodGhpcykuYXR0cignbmFtZScpLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2Zvcm0uY29udGFjdC1mb3JtIConKS5vZmYoJ2ZvY3VzJykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIEZPTVIgU1VCTUlUXHJcbiAgICAkKCdmb3JtLmNvbnRhY3QtZm9ybScpLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIHRoZWZvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBmb3JtdHlwZSA9ICdjb250YWN0JztcclxuICAgICAgICBpZiAodGhlZm9ybS5oYXNDbGFzcygndGFzaycpKSB7XHJcbiAgICAgICAgICAgIGZvcm10eXBlID0gJ3Rhc2suJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJykucG9wKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoZWZvcm0uaGFzQ2xhc3MoJ2NhdGVnb3J5JykpIHtcclxuICAgICAgICAgICAgZm9ybXR5cGUgPSAnY2F0ZWdvcnkuJyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJykucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCh0aGlzKS5jbG9zZXN0KCdmb3JtLmNvbnRhY3QtZm9ybScpO1xyXG4gICAgICAgIHZhciBvdmVybGF5ID0gY29udGFpbmVyLmZpbmQoJy5mb3JtLXJlc3BvbnNlLW92ZXJsYXknKTtcclxuXHJcbiAgICAgICAgb3ZlcmxheS5odG1sKCdDYXJnYW5kby4uJykuZmFkZUluKDEwMCk7Ly8uY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy5hbGVydC1kYW5nZXInKS5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5hamF4U3VibWl0KHtcclxuICAgICAgICAgICAgdXJsOiByb3V0ZV9jb250YWN0X3N0b3JlLFxyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCQodGhpcykuc2VyaWFsaXplKCkpLFxyXG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmZpbmQoJy5mb3JtLWhlYWRlciBoNCcpLmh0bWwoJ011Y2hhcyBncmFjaWFzIScpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29udGFpbmVyLmZpbmQoJy5mb3JtLWZpZWxkcyAuZm9ybS1ncm91cCcpLmNzcyh7J3Zpc2liaWxpdHknOidoaWRkZW4nfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb250YWluZXIuZmluZCgnLmZvcm0tZmllbGRzJykuY3NzKHsnYmFja2dyb3VuZC1jb2xvcic6JyMwMDg2NTcnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgb3ZlcmxheS5odG1sKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcl9rbm93blwiLCAnMScsIHtcclxuICAgICAgICAgICAgICAgICAgIGV4cGlyZXMgOiAzNjUsXHJcbiAgICAgICAgICAgICAgICAgICBwYXRoICAgIDogJy8nXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdjb250YWN0JywgJ2Zvcm0uc2VudCcsIGZvcm10eXBlKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBvdmVybGF5LmZhZGVPdXQoMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JzID0gJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMgPT0gNDIyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yc09iaiA9IEpTT04ucGFyc2UoZGF0YS5yZXNwb25zZVRleHQubWF0Y2goXCJcXFxcey4qfVwiKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCBlcnJvcnNPYmosIGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JzICs9ICctJysgdmFsdWUgKyc8YnI+JztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5maW5kKCcgKltuYW1lPVwiJytrZXkrJ1wiXScpLmFkZENsYXNzKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdjb250YWN0JywgJ3ZhbGlkYXRpb24uZXJyb3InLCBmb3JtdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhKCdzZW5kJywgJ2V2ZW50JywgJ2NvbnRhY3QnLCAnZXJyb3InLCBmb3JtdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZmluZCgnLmFsZXJ0LWRhbmdlcicpLmh0bWwoZXJyb3JzKS5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iLCJ2YXIgd2ggPSAwO1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuICAgIHdoID0gJCh3aW5kb3cpLmhlaWdodCgpXHJcblxyXG5cclxuICAgICQod2luZG93KS50cmlnZ2VyKCdzY3JvbGwnKVxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4kKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxyXG5cclxuICAgIGlmKCQoJ2hlYWRlcicpLmhhc0NsYXNzKCdhbHdheXMnKSl7XHJcblxyXG4gICAgICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCdzbWFsbCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuXHJcbiAgICAgICAgLy8gaWYoc2Nyb2xsID49IHdoICogMC43KSB7XHJcbiAgICAgICAgLy8gICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCdzbWFsbCcpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ3NtYWxsJyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBpZihzY3JvbGwgPD0gMjApIHtcclxuICAgICAgICAvLyAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2luaXRpYWwnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdpbml0aWFsJyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICB3aCA9ICQod2luZG93KS5oZWlnaHQoKVxyXG5cclxufSk7XHJcbiIsIlxuJChmdW5jdGlvbigpe1xuXG5cblx0Ly8gJCgnW2RhdGEtdHlwZXItdGFyZ2V0c10nKS50eXBlcigpO1xuXG4gICAgbW9iaWxlRmFzdENsaWNrKCk7XG5cdG1vYmlsZU1lbnUoKTtcblx0bWFpbk1lbnUoKTtcblx0bW9iaWxlQnRuQ2xpY2soKTtcblx0bW9iaWxlQ2xpY2tTdWJNZW51cygpO1xuXHRtb2JpbGVNZW51T3V0c2lkZUNsaWNrKCk7XG5cblx0d2luZG93UmVzaXplKCk7XG5cblx0d2luZG93U2Nyb2xsKCk7XG5cdHNjcmxUb3AoKTtcblxuXHRiaW5kV2F5cG9pbnRzKCk7XG5cblxuXG5cdFx0aWYgKCQoJyNob21lX2RldmVsb3BtZW50cycpLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHQkKCcjaG9tZV9kZXZlbG9wbWVudHMnKS53YXlwb2ludCggZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblxuXHRcdFx0XHRpZiggZGlyZWN0aW9uID09PSAnZG93bicgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgKSB7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCBhbmltYXRlVGFzayAsIDIwMCk7XG5cblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhbmltYXRlZCcpO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gOTUlXG5cdFx0XHR9ICwgeyBvZmZzZXQ6ICc3NSUnIH0gKTtcblx0XHR9XG5cblxufSk7XG5cblxuXHQvLyBpUGFkIGFuZCBpUG9kIGRldGVjdGlvblxuXHR2YXIgaXNpUGFkID0gZnVuY3Rpb24oKXtcblx0ICByZXR1cm4gKG5hdmlnYXRvci5wbGF0Zm9ybS5pbmRleE9mKFwiaVBhZFwiKSAhPSAtMSk7XG5cdH1cblxuXHR2YXIgaXNpUGhvbmUgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gKFxuXHQgIChuYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZihcImlQaG9uZVwiKSAhPSAtMSkgfHxcblx0ICAobmF2aWdhdG9yLnBsYXRmb3JtLmluZGV4T2YoXCJpUG9kXCIpICE9IC0xKVxuXHQpO1xuXHR9XG5cblx0Ly8gTW9iaWxlIE1lbnUgQ2xvbmUgKCBNb2JpbGVzL1RhYmxldHMgKVxuXHR2YXIgbW9iaWxlTWVudSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgaWYgKCAkKHdpbmRvdykud2lkdGgoKSA8IDc2OSApIHtcblx0ICAgICAgICAkKCdodG1sLGJvZHknKS5hZGRDbGFzcygnaW50cmFuZXQtb3ZlcmZsb3cnKTtcblxuXHQgICAgICAgIGlmICggJCgnI2ludHJhbmV0LW1vYmlsZS1tZW51JykubGVuZ3RoIDwgMSApIHtcblxuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSAkKCcjaW50cmFuZXQtcHJpbWFyeS1tZW51JykuY2xvbmUoKS5hdHRyKHtcblx0ICAgICAgICAgICAgICAgIGlkOiAnaW50cmFuZXQtbW9iaWxlLW1lbnUtdWwnLFxuXHQgICAgICAgICAgICAgICAgY2xhc3M6ICcnXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB2YXIgY2xvbmVMb2dvID0gJCgnI2ludHJhbmV0LWxvZ28nKS5jbG9uZSgpLmF0dHIoe1xuXHQgICAgICAgICAgICAgICAgaWQgOiAnaW50cmFuZXQtbG9nby1tb2JpbGUnLFxuXHQgICAgICAgICAgICAgICAgY2xhc3MgOiAnJ1xuXHQgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICAkKCc8ZGl2IGlkPVwiaW50cmFuZXQtbG9nby1tb2JpbGUtd3JhcFwiPicpLmFwcGVuZChjbG9uZUxvZ28pLmluc2VydEJlZm9yZSgnI2ludHJhbmV0LWhlYWRlci1zZWN0aW9uJyk7XG5cdCAgICAgICAgICAgIC8vICQoJyNpbnRyYW5ldC1sb2dvLW1vYmlsZS13cmFwJykuYXBwZW5kKCc8YSBocmVmPVwiI1wiIGlkPVwiaW50cmFuZXQtbW9iaWxlLW1lbnUtYnRuXCI+PGkgY2xhc3M9XCJ0aS1tZW51XCI+PC9pPjwvYT4nKVxuXHQgICAgICAgICAgICAkKCcjaW50cmFuZXQtbG9nby1tb2JpbGUtd3JhcCcpLmFwcGVuZCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImpzLWludHJhbmV0LW5hdi10b2dnbGUgaW50cmFuZXQtbmF2LXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNpbnRyYW5ldC1uYXZiYXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibmF2YmFyXCI+PGk+PC9pPjwvYT4nKTtcblx0ICAgICAgICAgICAgJCgnPGRpdiBpZD1cImludHJhbmV0LW1vYmlsZS1tZW51XCI+JykuYXBwZW5kKGNsb25lKS5pbnNlcnRCZWZvcmUoJyNpbnRyYW5ldC1oZWFkZXItc2VjdGlvbicpO1xuXG5cdCAgICAgICAgICAgICQoJyNpbnRyYW5ldC1oZWFkZXItc2VjdGlvbicpLmhpZGUoKTtcblx0ICAgICAgICAgICAgJCgnI2ludHJhbmV0LWxvZ28tbW9iaWxlLXdyYXAnKS5zaG93KCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgJCgnI2ludHJhbmV0LWhlYWRlci1zZWN0aW9uJykuaGlkZSgpO1xuXHQgICAgICAgICAgICAkKCcjaW50cmFuZXQtbG9nby1tb2JpbGUtd3JhcCcpLnNob3coKTtcblx0ICAgICAgICB9XG5cblx0ICAgIH0gZWxzZSB7XG5cblx0ICAgICAgICAkKCcjaW50cmFuZXQtbG9nby1tb2JpbGUtd3JhcCcpLmhpZGUoKTtcblx0ICAgICAgICAkKCcjaW50cmFuZXQtaGVhZGVyLXNlY3Rpb24nKS5zaG93KCk7XG5cdCAgICAgICAgJCgnaHRtbCxib2R5JykucmVtb3ZlQ2xhc3MoJ2ludHJhbmV0LW92ZXJmbG93Jyk7XG5cdCAgICAgICAgJCgnLmpzLWludHJhbmV0LW5hdi10b2dnbGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdCAgICAgICAgaWYgKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ludHJhbmV0LW1vYmlsZS1tZW51LXZpc2libGUnKSkge1xuXHQgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2ludHJhbmV0LW1vYmlsZS1tZW51LXZpc2libGUnKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH07XG5cblxuXHQvLyBTY3JvbGxUb3Bcblx0dmFyIHNjcmxUb3AgPSAgZnVuY3Rpb24oKSB7XG5cdCAgICAkKCcuaW50cmFuZXQtZ290b3AnKS5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdCAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHQgICAgICAgICAgICBzY3JvbGxUb3A6IDBcblx0ICAgICAgICB9LCA1MDAsICdlYXNlSW5PdXRFeHBvJyk7XG5cblx0ICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgIH0pO1xuXHR9O1xuXG5cblx0Ly8gQ2xpY2sgb3V0c2lkZSBvZiB0aGUgTW9iaWxlIE1lbnVcblx0dmFyIG1vYmlsZU1lbnVPdXRzaWRlQ2xpY2sgPSBmdW5jdGlvbigpIHtcblx0XHQkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHQgICAgdmFyIGNvbnRhaW5lciA9ICQoXCIjaW50cmFuZXQtbW9iaWxlLW1lbnUsIC5qcy1pbnRyYW5ldC1uYXYtdG9nZ2xlXCIpO1xuXHQgICAgaWYgKCFjb250YWluZXIuaXMoZS50YXJnZXQpICYmIGNvbnRhaW5lci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2ludHJhbmV0LW1vYmlsZS1tZW51LXZpc2libGUnKTtcblx0ICAgICAgJCgnLmpzLWludHJhbmV0LW5hdi10b2dnbGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdCAgICB9XG5cdFx0fSk7XG5cdH07XG5cblxuXHQvLyBNb2JpbGUgQnV0dG9uIENsaWNrXG5cdHZhciBtb2JpbGVCdG5DbGljayA9IGZ1bmN0aW9uKCkge1xuXHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtaW50cmFuZXQtbmF2LXRvZ2dsZScsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly8gaW50cmFuZXQtbW9iaWxlLW1lbnUtdmlzaWJsZVxuXHRcdFx0aWYgKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ludHJhbmV0LW1vYmlsZS1tZW51LXZpc2libGUnKSApIHtcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdpbnRyYW5ldC1tb2JpbGUtbWVudS12aXNpYmxlJyk7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdpbnRyYW5ldC1tb2JpbGUtbWVudS12aXNpYmxlJyk7XG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH07XG5cblxuXHQvLyBNYWluIE1lbnUgU3VwZXJmaXNoXG5cdHZhciBtYWluTWVudSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnI2ludHJhbmV0LXByaW1hcnktbWVudScpLnN1cGVyZmlzaCh7XG5cdFx0XHRkZWxheTogMCxcblx0XHRcdGFuaW1hdGlvbjoge1xuXHRcdFx0XHRvcGFjaXR5OiAnc2hvdydcblx0XHRcdH0sXG5cdFx0XHRzcGVlZDogJ2Zhc3QnLFxuXHRcdFx0Y3NzQXJyb3dzOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZUhJOiB0cnVlXG5cdFx0fSk7XG5cblx0fTtcblxuXHQvLyBTdXBlcmZpc2ggU3ViIE1lbnUgQ2xpY2sgKCBNb2JpbGVzL1RhYmxldHMgKVxuXHR2YXIgbW9iaWxlQ2xpY2tTdWJNZW51cyA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnYm9keScpLm9uKCdjbGljaycsICcuaW50cmFuZXQtc3ViLWRkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRsaSA9ICR0aGlzLmNsb3Nlc3QoJ2xpJyk7XG5cdFx0XHRsaS5maW5kKCc+IC5pbnRyYW5ldC1zdWItbWVudScpLnNsaWRlVG9nZ2xlKDIwMCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHQvLyBXaW5kb3cgUmVzaXplXG5cdHZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbigpIHtcblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG5cdFx0XHRtb2JpbGVNZW51KCk7XG5cdFx0fSk7XG5cblx0fTtcblxuXHQvLyBXaW5kb3cgU2Nyb2xsXG5cdHZhciB3aW5kb3dTY3JvbGwgPSBmdW5jdGlvbigpIHtcblx0XHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR2YXIgc2Nyb2xsUG9zID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuXHRcdFx0aWYgKCAkKCdib2R5JykuaGFzQ2xhc3MoJ2ludHJhbmV0LW1vYmlsZS1tZW51LXZpc2libGUnKSApIHtcblx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdpbnRyYW5ldC1tb2JpbGUtbWVudS12aXNpYmxlJyk7XG5cdFx0XHRcdCQoJy5qcy1pbnRyYW5ldC1uYXYtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH07XG5cblx0Ly8gRmFzdCBDbGljayBmb3IgKCBNb2JpbGVzL1RhYmxldHMgKVxuXHR2YXIgbW9iaWxlRmFzdENsaWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCBpc2lQYWQoKSAmJiBpc2lQaG9uZSgpKSB7XG5cdFx0XHRGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBTY3JvbGwgQW5pbWF0aW9uc1xuXG5cblxuXG5cblxuXHQvLyBBbmltYXRlIEZlYXR1cmVcblx0dmFyIGFuaW1hdGVGZWF0dXJlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAkKCcuZmVhdHVyZS1ib3gnKS5sZW5ndGggPiAwICkge1xuXHRcdFx0JCgnLmZlYXR1cmUtYm94JykuZWFjaChmdW5jdGlvbiggayApIHtcblxuXHRcdFx0XHR2YXIgZWwgPSAkKHRoaXMpO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQgKCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZWwuYW5pbWF0ZSh7b3BhY2l0eTogMX0gLCA2MDAgKTtcblx0XHRcdFx0XHRlbC5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0XHRcdFx0fSwgIGsgKiAyMDAsICdlYXNlSW5PdXRFeHBvJyApO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblxuXHQvLyBBbmltYXRlIEFib3V0XG5cdHZhciBhbmltYXRlQWJvdXQgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoICQoJy5hYm91dC1ib3gnKS5sZW5ndGggPiAwICkge1xuXHRcdFx0JCgnLmFib3V0LWJveCcpLmVhY2goZnVuY3Rpb24oIGsgKSB7XG5cblx0XHRcdFx0dmFyIGVsID0gJCh0aGlzKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0ICggZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVsLmFuaW1hdGUoe29wYWNpdHk6IDF9ICwgNjAwICk7XG5cdFx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHRcdH0sICBrICogMjAwLCAnZWFzZUluT3V0RXhwbycgKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cblxuXHQvLyBBbmltYXRlIFdvcmtzXG5cdHZhciBhbmltYXRlV29yayA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggJCgnLndvcmstYm94JykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJy53b3JrLWJveCcpLmVhY2goZnVuY3Rpb24oIGsgKSB7XG5cblx0XHRcdFx0dmFyIGVsID0gJCh0aGlzKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0ICggZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVsLmFuaW1hdGUoe29wYWNpdHk6IDF9ICwgNjAwICk7XG5cdFx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2ZhZGVJbkRvd24gYW5pbWF0ZWQnKTtcblx0XHRcdFx0fSwgIGsgKiAyMDAsICdlYXNlSW5PdXRFeHBvJyApO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblxuXG5cdC8vIEFuaW1hdGUgVGFza3Ncblx0dmFyIGFuaW1hdGVUYXNrID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAkKCcudGFzay1ib3gnKS5sZW5ndGggPiAwICkge1xuXHRcdFx0JCgnLnRhc2stYm94JykuZWFjaChmdW5jdGlvbiggayApIHtcblxuXHRcdFx0XHR2YXIgZWwgPSAkKHRoaXMpO1xuXG5cdFx0XHRcdHNldFRpbWVvdXQgKCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZWwuYW5pbWF0ZSh7b3BhY2l0eTogMX0gLCA2MDAgKTtcblx0XHRcdFx0XHRlbC5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0XHRcdFx0fSwgIGsgKiAyMDAsICdlYXNlSW5PdXRFeHBvJyApO1xuXG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQW5pbWF0ZSBGb290ZXJcblx0dmFyIGFuaW1hdGVGb290ZXIgPSBmdW5jdGlvbigpIHtcblxuXHRcdCQoJy5mb290ZXItYm94JykuZWFjaChmdW5jdGlvbiggayApIHtcblxuXHRcdFx0dmFyIGVsID0gJCh0aGlzKTtcblxuXHRcdFx0c2V0VGltZW91dCAoIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gZWwuYW5pbWF0ZSh7b3BhY2l0eTogMX0gLCA2MDAgKTtcblx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHR9LCAgayAqIDIwMCwgJ2Vhc2VJbk91dEV4cG8nICk7XG5cblx0XHR9KTtcblx0fTtcblxuXG5cdHZhciBhbmltYXRlU2xvZ2FuID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAkKCcuaW4tYW5pbWF0ZScpLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHQkKCcuaW4tYW5pbWF0ZScpLmVhY2goZnVuY3Rpb24oIGsgKSB7XG5cblx0XHRcdFx0dmFyIGVsID0gJCh0aGlzKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0ICggZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVsLmFuaW1hdGUoe29wYWNpdHk6IDF9ICwgNjAwICk7XG5cdFx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHRcdH0sICBrICogMjAwLCAnZWFzZUluT3V0RXhwbycgKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cblxuXHR2YXIgYW5pbWF0ZVRlc3RpbW9uaWFscyA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggJCgnLmFuaW0tdGVzdGltb25pYWxzJykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJy5hbmltLXRlc3RpbW9uaWFscycpLmVhY2goZnVuY3Rpb24oIGsgKSB7XG5cblx0XHRcdFx0dmFyIGVsID0gJCh0aGlzKTtcblxuXHRcdFx0XHRzZXRUaW1lb3V0ICggZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVsLmFuaW1hdGUoe29wYWNpdHk6IDF9ICwgNjAwICk7XG5cdFx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHRcdH0sICBrICogMjAwLCAnZWFzZUluT3V0RXhwbycgKTtcblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cblxuXHQvLyBXYXlwb2ludHNcblx0dmFyIGJpbmRXYXlwb2ludHMgPSBmdW5jdGlvbigpIHtcblxuXHRcdGlmICgkKCcjaW50cmFuZXQtZmVhdHVyZXMnKS5sZW5ndGggPiAwICkge1xuXHRcdFx0JCgnI2ludHJhbmV0LWZlYXR1cmVzJykud2F5cG9pbnQoIGZ1bmN0aW9uKCBkaXJlY3Rpb24gKSB7XG5cblx0XHRcdFx0aWYoIGRpcmVjdGlvbiA9PT0gJ2Rvd24nICYmICEkKHRoaXMpLmhhc0NsYXNzKCdhbmltYXRlZCcpICkge1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dCggYW5pbWF0ZUZlYXR1cmUgLCAyMDApO1xuXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYW5pbWF0ZWQnKTtcblxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIDk1JVxuXHRcdFx0fSAsIHsgb2Zmc2V0OiAnNzUlJyB9ICk7XG5cdFx0fVxuXG5cblx0XHRpZiAoJCgnI2ludHJhbmV0X2Fib3V0JykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJyNpbnRyYW5ldF9hYm91dCcpLndheXBvaW50KCBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXG5cdFx0XHRcdGlmKCBkaXJlY3Rpb24gPT09ICdkb3duJyAmJiAhJCh0aGlzKS5oYXNDbGFzcygnYW5pbWF0ZWQnKSApIHtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoIGFuaW1hdGVBYm91dCAsIDIwMCk7XG5cblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhbmltYXRlZCcpO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gOTUlXG5cdFx0XHR9ICwgeyBvZmZzZXQ6ICc3NSUnIH0gKTtcblx0XHR9XG5cblxuXHRcdGlmICgkKCcjaW50cmFuZXRfY2xpZW50cycpLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHQkKCcjaW50cmFuZXRfY2xpZW50cycpLndheXBvaW50KCBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXG5cdFx0XHRcdGlmKCBkaXJlY3Rpb24gPT09ICdkb3duJyAmJiAhJCh0aGlzKS5oYXNDbGFzcygnYW5pbWF0ZWQnKSApIHtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoIGFuaW1hdGVXb3JrICwgMjAwKTtcblxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyA5NSVcblx0XHRcdH0gLCB7IG9mZnNldDogJzc1JScgfSApO1xuXHRcdH1cblxuXG5cblxuXG5cdFx0aWYgKCAkKCcjaW50cmFuZXRfc2xvZ2FuJykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJyNpbnRyYW5ldF9zbG9nYW4nKS53YXlwb2ludCggZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblxuXHRcdFx0XHRpZiggZGlyZWN0aW9uID09PSAnZG93bicgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgKSB7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCBhbmltYXRlU2xvZ2FuICwgMjAwKTtcblxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyA5NSVcblx0XHRcdH0gLCB7IG9mZnNldDogJzk1JScgfSApO1xuXHRcdH1cblxuXG5cdFx0aWYgKCAkKCcjaW50cmFuZXRfdGVzdGltb25pYWxzJykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJyNpbnRyYW5ldF90ZXN0aW1vbmlhbHMnKS53YXlwb2ludCggZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblxuXHRcdFx0XHRpZiggZGlyZWN0aW9uID09PSAnZG93bicgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgKSB7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCBhbmltYXRlVGVzdGltb25pYWxzICwgMjAwKTtcblxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyA5NSVcblx0XHRcdH0gLCB7IG9mZnNldDogJzk1JScgfSApO1xuXHRcdH1cblxuXG5cdFx0aWYgKCAkKCcjaW50cmFuZXQtZm9vdGVyJykubGVuZ3RoID4gMCApIHtcblx0XHRcdCQoJyNpbnRyYW5ldC1mb290ZXInKS53YXlwb2ludCggZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblxuXHRcdFx0XHRpZiggZGlyZWN0aW9uID09PSAnZG93bicgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgKSB7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCBhbmltYXRlRm9vdGVyICwgMjAwKTtcblxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG5cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyA5NSVcblx0XHRcdH0gLCB7IG9mZnNldDogJzk1JScgfSApO1xuXHRcdH1cblxuXG5cblx0fTtcblxuXHQvLyB2YXIgaGVyb1dheVBvaW50ID0gZnVuY3Rpb24oKSB7XG5cdC8vIFx0aWYgKCAkKCcjaW50cmFuZXQtaGVybycpLmxlbmd0aCA+IDAgKSB7XG5cdC8vIFx0XHQkKCcjaW50cmFuZXQtaGVybycpLndheXBvaW50KCBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXG5cdC8vIFx0XHRcdGlmKCBkaXJlY3Rpb24gPT09ICdkb3duJyAmJiAhJCh0aGlzKS5oYXNDbGFzcygnYW5pbWF0ZWQnKSApIHtcblxuXG5cdC8vIFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdFx0JCgnLmhlcm8tYW5pbWF0ZS0xJykuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdC8vIFx0XHRcdFx0fSwgMTAwKTtcblx0Ly8gXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdC8vIFx0XHRcdFx0XHQkKCcuaGVyby1hbmltYXRlLTInKS5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0Ly8gXHRcdFx0XHR9LCA0MDApO1xuXHQvLyBcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0Ly8gXHRcdFx0XHRcdCQoJy5oZXJvLWFuaW1hdGUtMycpLmFkZENsYXNzKCdmYWRlSW5VcCBhbmltYXRlZCcpO1xuXHQvLyBcdFx0XHRcdH0sIDYwMCk7XG5cdC8vIFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHQvLyBcdFx0XHRcdFx0JCgnLmhlcm8tYW5pbWF0ZS00JykuYWRkQ2xhc3MoJ2ZhZGVJbkRvd24gYW5pbWF0ZWQnKTtcblx0Ly8gXHRcdFx0XHR9LCAxMDAwKTtcblxuXHQvLyBcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FuaW1hdGVkJyk7XG5cblx0Ly8gXHRcdFx0fVxuXHQvLyBcdFx0fSAsIHsgb2Zmc2V0OiAnNzUlJyB9ICk7XG5cdC8vIFx0fVxuXHQvLyB9O1xuXG5cblx0dmFyIHN0YXJ0QW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cblx0XHRpZiAoICQoJy5pbnRyYW5ldC1wYXJhbGxheC1jb3ZlcicpLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0JCgnLmludHJhbmV0LWNvdmVyLXRpdGxlJykuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHR9LCAxMDApO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKCcuaW50cmFuZXQtY292ZXItc3VidGl0bGUnKS5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0XHRcdH0sIDQwMCk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoJy5pbnRyYW5ldC1jb3Zlci1jdGEnKS5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0XHRcdH0sIDYwMCk7XG5cblxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYW5pbWF0ZWQnKTtcblxuXG5cdFx0fVxuXG5cdH07XG5cblxuXHR2YXIgY29udGVudFdheVBvaW50ID0gZnVuY3Rpb24oKSB7XG5cblx0XHQkKCcuYW5pbWF0ZS1ib3gnKS53YXlwb2ludCggZnVuY3Rpb24oIGRpcmVjdGlvbiApIHtcblxuXHRcdFx0aWYoIGRpcmVjdGlvbiA9PT0gJ2Rvd24nICYmICEkKHRoaXMpLmhhc0NsYXNzKCdhbmltYXRlZCcpICkge1xuXHRcdFx0XHQkKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoJ2ZhZGVJblVwIGFuaW1hdGVkJyk7XG5cdFx0XHR9XG5cblx0XHR9ICwgeyBvZmZzZXQ6ICc3NSUnIH0gKTtcblxuXHRcdCQoJy5hbmltYXRlLWJveCcpLndheXBvaW50KCBmdW5jdGlvbiggZGlyZWN0aW9uICkge1xuXG5cdFx0XHRpZiggZGlyZWN0aW9uID09PSAnZG93bicgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FuaW1hdGVkJykgKSB7XG5cdFx0XHRcdCQodGhpcy5lbGVtZW50KS5hZGRDbGFzcygnZmFkZUluVXAgYW5pbWF0ZWQnKTtcblx0XHRcdH1cblxuXHRcdH0gLCB7IG9mZnNldDogJzc1JScgfSApO1xuXG5cdH07XG5cblxuXG5cbmZ1bmN0aW9uIHBhZ2VTdGFydCgpe1xuXG5cdCAgc3RhcnRBbmltYXRpb24oKTtcblxufVxuXG5cdC8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyB9O1xuIl19
