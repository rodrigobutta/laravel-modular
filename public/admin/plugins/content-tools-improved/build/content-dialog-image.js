(function() {

  ContentTools.ImageDialog = (function(_super) {
    __extends(ImageDialog, _super);

    function ImageDialog() {

      ImageDialog.__super__.constructor.call(this, 'Insert image');
      // this._cropMarks = null;
      this._imageURL = null;
      this._imageSize = null;
      this._progress = 0;
      this._state = 'empty';
      this._recipt = 'mediaNormal';
      if (ContentTools.IMAGE_UPLOADER) {
        ContentTools.IMAGE_UPLOADER(this);
      }
    }

    ImageDialog.prototype.clear = function() {
      if (this._domImage) {
        this._domImage.parentNode.removeChild(this._domImage);
        this._domImage = null;
      }
      this._imageURL = null;
      this._imageSize = null;
      return this.state('empty');
    };

    ImageDialog.prototype.mount = function() {
      var domActions, domProgressBar, domTools;
      ImageDialog.__super__.mount.call(this);

      ContentEdit.addCSSClass(this._domElement, 'ct-image-dialog');
      ContentEdit.addCSSClass(this._domElement, 'ct-image-dialog--empty');
      ContentEdit.addCSSClass(this._domView, 'ct-image-dialog__view');

      domTools = this.constructor.createDiv(['ct-control-group', 'ct-control-group--left']);

      domProgressBar = this.constructor.createDiv(['ct-progress-bar']);
      domTools.appendChild(domProgressBar);

      this._domProgress = this.constructor.createDiv(['ct-progress-bar__progress']);
      domProgressBar.appendChild(this._domProgress);

      domActions = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      this._domControls.appendChild(domActions);

      this._domUpload = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--upload']);
      this._domUpload.textContent = ContentEdit._('Select..');
      domActions.appendChild(this._domUpload);

      this._domFile = document.createElement('input');
      this._domFile.setAttribute('class', 'ct-image-dialog__file-upload');
      this._domFile.setAttribute('name', 'file');
      this._domFile.setAttribute('type', 'file');
      this._domFile.setAttribute('accept', 'image/*');
      this._domFile.setAttribute('multiple', '');
      this._domUpload.appendChild(this._domFile);

      this._domBtnOk = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-hide-on-empty']);
      this._domBtnOk.textContent = ContentEdit._('Ok');
      domActions.appendChild(this._domBtnOk);

      this._domClear = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-hide-on-empty']);
      this._domClear.textContent = ContentEdit._('Clear');
      domActions.appendChild(this._domClear);

      this._addDOMEventListeners();
      return this.dispatchEvent(this.createEvent('imageuploader.mount'));

    };

    ImageDialog.prototype.preview = function(imageURL, imageSize) {
      this._imageURL = imageURL;
      this._imageSize = imageSize;

      if (!this._domImage) {
        this._domImage = this.constructor.createDiv(['ct-image-dialog__image']);
        this._domView.appendChild(this._domImage);
      }
      this._domImage.style['background-image'] = "url(" + imageURL + ")";
      return this.state('onpreview');
    };

    ImageDialog.prototype.progress = function(progress) {
      if (progress === void 0) {
        return this._progress;
      }
      this._progress = progress;
      if (!this.isMounted()) {
        return;
      }
      return this._domProgress.style.width = "" + this._progress + "%";
    };

    ImageDialog.prototype.save = function(data) {
      console.log('ImageDialog.prototype.save');
      console.log(data);
      return this.dispatchEvent(this.createEvent('save', data));
    };

    ImageDialog.prototype.state = function(state) {
      var prevState;
      if (state === void 0) {
        return this._state;
      }
      if (this._state === state) {
        return;
      }
      prevState = this._state;
      this._state = state;
      if (!this.isMounted()) {
        return;
      }
      ContentEdit.addCSSClass(this._domElement, "ct-image-dialog--" + this._state);
      return ContentEdit.removeCSSClass(this._domElement, "ct-image-dialog--" + prevState);
    };

    ImageDialog.prototype.unmount = function() {
      ImageDialog.__super__.unmount.call(this);
      this._domClear = null;
      this._domCrop = null;
      this._domFile = null;
      this._domBtnOk = null;
      this._domProgress = null;
      this._domBtnSizeNormal = null;
      this._domBtnSizeHalf = null;
      this._domUpload = null;
      return this.dispatchEvent(this.createEvent('imageuploader.unmount'));
    };

    ImageDialog.prototype._addDOMEventListeners = function() {

      ImageDialog.__super__._addDOMEventListeners.call(this);

      this._domFile.addEventListener('change', (function(_this) {
        return function(ev) {

          // var file = ev.target.files[0];
          // ev.target.value = '';
          // if (ev.target.value) {
          //   // ev.target.type = 'text';
          //   ev.target.type = 'file';
          // }

          // return _this.dispatchEvent(_this.createEvent('imageuploader.fileready', {
          //   file: file
          // }));

          var files = ev.target.files;

          // ev.target.value = ''; // DESPUES PORQUE BORRA REFES A ARCHIVOS

          for (var i = 0; i < files.length; i++) {
            _this.dispatchEvent(_this.createEvent('imageuploader.fileready', {
              file: files[i]
            }));
          };


          // for (var i = 0; i < files.length; i++) {
          //   _this.dispatchEvent(_this.createEvent('imageuploader.fileready', {
          //     file: files[i]
          //   }));
          // };

          // return _this.dispatchEvent(_this.createEvent('imageuploader.fileready', {
          //   file: files
          // }));

        };
      })(this));

      this._domClear.addEventListener('click', (function(_this) {
        return function(ev) {
          return _this.dispatchEvent(_this.createEvent('imageuploader.clear'));
        };
      })(this));

      this._domBtnOk.addEventListener('click', (function(_this) {
        return function(ev) {
          return _this.dispatchEvent(_this.createEvent('imageuploader.save', {
            recipes: ['mediaNormal','mediaFull']
          }));
        };
      })(this));


      return true;
    };

    return ImageDialog;

  })(ContentTools.DialogUI);

}).call(this);
