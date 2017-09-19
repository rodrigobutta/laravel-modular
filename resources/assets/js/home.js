
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
