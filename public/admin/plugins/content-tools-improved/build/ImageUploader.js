(function() {


  var ImageUploader;

  ImageUploader = (function() {

    // REB: estas dos no van mas porque son para archivos fisicos
    ImageUploader.imagePath = 'image.png';
    ImageUploader.imageSize = [200, 200];
    ImageUploader.fileToUp = '';

    ImageUploader.serviceUrl = '';

    function ImageUploader(dialog) {

      this._dialog = dialog;
      this._dialog.addEventListener('cancel', (function(_this) {
        return function() {
          return _this._onCancel();
        };
      })(this));

      // this._dialog.addEventListener('imageuploader.cancelupload', (function(_this) {
      //   return function() {
      //     return _this._onCancelUpload();
      //   };
      // })(this));
      //
      this._dialog.addEventListener('imageuploader.clear', (function(_this) {
        return function() {
          return _this._onClear();
        };
      })(this));

      this._dialog.addEventListener('imageuploader.fileready', (function(_this) {
        return function(ev) {
           console.log('imageuploader.fileready');

           console.log(ev.detail());
           ImageUploader.fileToUp = ev.detail().file;

            // console.log(ImageUploader.fileToUp);
          return _this._onFileReady(ev.detail().file);
        };
      })(this));

      this._dialog.addEventListener('imageuploader.mount', (function(_this) {
        return function() {
          return _this._onMount();
        };
      })(this));

      // this._dialog.addEventListener('imageuploader.rotateccw', (function(_this) {
      //   return function() {
      //     return _this._onRotateCCW();
      //   };
      // })(this));

      // this._dialog.addEventListener('imageuploader.rotatecw', (function(_this) {
      //   return function() {
      //     return _this._onRotateCW();
      //   };
      // })(this));

      this._dialog.addEventListener('imageuploader.save', (function(_this) {
        return function(ev) {
         // console.log('imageuploader.save');
         // console.log(ev.detail());
         return _this._onSave(ev.detail());
        };
      })(this));

      this._dialog.addEventListener('imageuploader.unmount', (function(_this) {
        return function() {
          return _this._onUnmount();
        };
      })(this));

    }

    ImageUploader.prototype._onCancel = function() {};

    // ImageUploader.prototype._onCancelUpload = function() {
    //   clearTimeout(this._uploadingTimeout);
    //   return this._dialog.state('empty');
    // };

    ImageUploader.prototype._onClear = function() {
      return this._dialog.clear();
    };

    ImageUploader.prototype._onFileReady = function(file) {
      // console.log('_onFileReady');

      this._dialog.progress(0);
      this._dialog.state('uploading');

      var upload = (function(_this) {
        return function() {
            console.log(file);

            // REB: el archivo que viene lo meto en un FileReader para poder sacar la url como base64
            var FR= new FileReader();
            FR.onload = function(e) {

               // REB: voy guardando el base 64 como url
               ImageUploader.imagePath =  e.target.result;

               // REB: meto el archivo como Image para poder agarrar las dimensaiones
               var img = new Image;
               img.onload = function() {
                  // REB: Guardo las dimensiones de la imagen
                  ImageUploader.imageSize = [img.width,img.height];
                  // console.log('img.onload');
                  // una vez que ya popule todo, muestro la imagen en ele preview
                  return _this._dialog.preview(ImageUploader.imagePath, ImageUploader.imageSize);
               };
               img.src = e.target.result;

            };

            FR.readAsDataURL( file );

        };

      })(this);
      return this._uploadingTimeout = setTimeout(upload, 25);
    };

    ImageUploader.prototype._onMount = function() {};

    // ImageUploader.prototype._onRotateCCW = function() {
    //   var clearBusy;
    //   this._dialog.busy(true);

    //   console.log('_onRotateCCW');

    //     var canvas = document.getElementById("c");
    //     var ctx = canvas.getContext("2d");

    //     var image = new Image();
    //     image.src = ImageUploader.imagePath;
    //     image.onload = function() {

    //         ctx.translate(image.width, image.height);
    //         ctx.rotate(180 * Math.PI / 180);
    //         ctx.drawImage(image, 0, 0);

    //         ImageUploader.imagePath = canvas.toDataURL();

    //         var tmp = ImageUploader.imageSize;

    //         // REB: Guardo las dimensiones de la imagen
    //         ImageUploader.imageSize = [tmp.height,tmp.width];

    //         // una vez que ya popule todo, muestro la imagen en ele preview
    //         return _this._dialog.populate(ImageUploader.imagePath, ImageUploader.imageSize);

    //         // window.eval(""+callback+"('"+canvas.toDataURL()+"')");
    //     };


    //   clearBusy = (function(_this) {
    //     return function() {
    //       return _this._dialog.busy(false);
    //     };
    //   })(this);
    //   return setTimeout(clearBusy, 1500);
    // };

    // ImageUploader.prototype._onRotateCW = function() {
    //   var clearBusy;
    //   this._dialog.busy(true);
    //   clearBusy = (function(_this) {
    //     return function() {
    //       return _this._dialog.busy(false);
    //     };
    //   })(this);
    //   return setTimeout(clearBusy, 1500);
    // };

    ImageUploader.prototype._onSave = function(details) {

      this._dialog.busy(true);

      console.log(details);

      var clearBusy = (function(_this) {
        return function() {
        // console.log('_onSave');

        var data = new FormData();
          data.append('files', ImageUploader.fileToUp);
          data.append('custom_image_recipe',details.recipt);
          data.append('custom_image_recipes',details.recipes);
          data.append('fugitive',1);

         $.ajax({
             type:'POST',
             url: ImageUploader.serviceUrl,
             processData: false,
             contentType: false,
             cache:false,
             data :data,
             success: function(data){
              console.log('success');
              _this._dialog.busy(false);
              console.log(data);
              console.log('A1');
              return _this._dialog.save(data);
             },
             error: function (data) {
              console.log('error');
               console.log(data);
            }
         });

        };
      })(this);
      return setTimeout(clearBusy, 1000);

    };

    ImageUploader.prototype._onUnmount = function() {};

    ImageUploader.createImageUploader = function(dialog) {
      return new ImageUploader(dialog);
    };

    return ImageUploader;

  })();

  window.ImageUploader = ImageUploader;



}).call(this);
