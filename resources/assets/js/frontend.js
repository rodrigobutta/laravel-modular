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
