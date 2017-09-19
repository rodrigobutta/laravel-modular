
CKEDITOR.dtd.$removeEmpty['span'] = false;

  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });


$.fn.editableform.buttons =
  '<button type="submit" class="btn btn-primary btn-sm editable-submit">'+
    '<i class="fa fa-fw fa-check"></i>'+
  '</button>'+
  '<button type="button" class="btn btn-default btn-sm editable-cancel">'+
    '<i class="fa fa-fw fa-times"></i>'+
  '</button>';



// notificaciones
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "250",
  "hideDuration": "500",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}



$(document).ready(function() {


  $('#sidebar_container').css({'height':$('body > .wrapper').height()});


  $(".sticky").fixTo('.sticky-parent', {
    // className : 'my-class-name',
    zIndex: 10,
    useNativeSticky: false,
    top: 15
  });



  $('.dropdown-submenu a.test').on("click", function(e){
     $(this).next('ul').toggle();
     e.stopPropagation();
     e.preventDefault();
   });


});


$(function () {

});






function getGoogleAnalyticsData(metrics,dimensions,segment='',sort='',filters='',max_results='',callback){
    // console.log("getGoogleAnalyticsData")

    $.ajax({
        type: 'POST',
        url: admin_report_gaquery_url,
        data: {
          dimensions: dimensions,
          metrics: metrics,
          segment: segment,
          sort: sort,
          filters: filters,
          "max-results": max_results,
        },
        dataType: 'json',
        success: function (data) {
          // console.log('datos obtenidos');
          // console.log(data);
          if(typeof callback === "function"){
            callback(data);
          }

        }
    });

}