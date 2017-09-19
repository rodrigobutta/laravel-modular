
var load_map = false;


function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// el dom está cargado, pero no necesariamente las imagenes y scripts
document.addEventListener("DOMContentLoaded", function(event) {
  console.log('dom loaded!');

});

// todo fue cargado
window.onload = function() {
  console.log('all page loaded!');

  preloaderOut();

};



window.preloaderOut = function() {
  console.log('preloader out.');

   var element = document.getElementById("preloader");
   var op = 1;
   var timer = setInterval(function () {
       if (op <= 0.1){
           clearInterval(timer);
           element.style.display = 'none';

           pageStart();

       }
       element.style.opacity = op;
       element.style.filter = 'alpha(opacity=' + op * 100 + ")";
       op -= op * 0.1;
   }, 20);



};



function pageStart() {

  if(load_map){
   initMap();
  }

}
addLoadEvent(pageStart);



// function preloader() {
//   if (document.images) {
//     var img1 = new Image();
//     var img2 = new Image();
//     var img3 = new Image();

//     img1.src = "http://domain.tld/path/to/image-001.gif";
//     img2.src = "http://domain.tld/path/to/image-002.gif";
//     img3.src = "http://domain.tld/path/to/image-003.gif";
//   }
// }

// addLoadEvent(preloader);