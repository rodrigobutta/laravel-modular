(function() {

  ContentTools.GalleryDialog = (function(_super) {
    __extends(GalleryDialog, _super);

    function GalleryDialog(element,domelement) {

      this.element = element;
      this.domelement = domelement;

      this.previewZoom = 80;

      if (this.domelement) {
        GalleryDialog.__super__.constructor.call(this, 'Update');
      } else {
        GalleryDialog.__super__.constructor.call(this, 'Create');
      }
    }

    GalleryDialog.prototype.mount = function() {
      GalleryDialog.__super__.mount.call(this);
      var _this = this;

      ContentEdit.addCSSClass(this._domElement, 'ct-gallery-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-gallery-dialog__view');

      this._domPreviewContainer = this.constructor.createDiv(['ct-preview-container']);

      if (this.element.type()=='Gallery') { // si estoy editando

          $(this.element._contents).each(function(){

            if($(this).is("figure")){

              var name = $(this).data('name');

              var size = $(this).find('a').attr('data-size');
              var size_obj = size.split('x');

              var params = {};
                  params.small_url = $(this).find('img').attr('src');
                  // params.small_width = data[i].recipes[0].width;
                  // params.small_height = data[i].recipes[0].height;
                  params.large_url = $(this).find('a').attr('href');
                  params.large_width = size_obj[0];
                  params.large_height = size_obj[1];
                  params.caption = $(this).find('figcaption').html();
                  params.size = $(this).attr('data-size');

              _this.RealToPreview(name,params,false);

            }

          })

      }
      else{ // si es nuevo

      }

      this._domView.appendChild(this._domPreviewContainer);


      this._domPreviewDropzone = this.constructor.createDiv(['ct-dropzone']);
      this._domPreviewDropzone.innerHTML = '<i class="fa fa-trash fa-3x"></i>';
      this._domView.appendChild(this._domPreviewDropzone);

      // domControlGroup = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      // this._domControls.appendChild(domControlGroup);

      // domTools = this.constructor.createDiv(['ct-control-group', 'ct-control-group--left']);
      // this._domControls.appendChild(domTools);

      domActions = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      this._domControls.appendChild(domActions);


      // actuvarrrajasirjaiso rjarajorasj isojasi orjaio jri
      // this._domBtnUpload = this.constructor.createDiv(['ct-control', 'ct-control--text']);
      // this._domBtnUpload.textContent = ContentEdit._('Upload');
      // domTools.appendChild(this._domBtnUpload);


      this._domBtnZoomIn = this.constructor.createDiv(['ct-control', 'ct-control--icon']);
      this._domBtnZoomIn.innerHTML = '<i class="fa fa-plus-square fa-2x"></i>';
      domActions.appendChild(this._domBtnZoomIn);

      this._domBtnZoomOut = this.constructor.createDiv(['ct-control', 'ct-control--icon']);
      this._domBtnZoomOut.innerHTML = '<i class="fa fa-minus-square fa-2x"></i>';
      domActions.appendChild(this._domBtnZoomOut);



      this._domBtnUpload = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--upload']);
      this._domBtnUpload.textContent = ContentEdit._('Add..');
      domActions.appendChild(this._domBtnUpload);

      this._domFileInput = document.createElement('input');
      this._domFileInput.setAttribute('class', 'ct-image-dialog__file-upload');
      this._domFileInput.setAttribute('name', 'file');
      this._domFileInput.setAttribute('type', 'file');
      this._domFileInput.setAttribute('accept', 'image/*');
      this._domFileInput.setAttribute('multiple', '');
      this._domBtnUpload.appendChild(this._domFileInput);

      this._domBtnOk = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--apply']);
      this._domBtnOk.textContent = 'Ok';
      domActions.appendChild(this._domBtnOk);



      this._afterHandlers();

      this._addDOMEventListeners();

      return true;
    };

    GalleryDialog.prototype.save = function() {
      // console.log('GalleryDialog.prototype.save');

      var data = {
      };
      data.items = [];

      $(this._domPreviewContainer).find('.ct-gallery-preview').each(function(){

        el = $(this);

        var item = {};
            item.name = el.attr('data-name');
            item.caption = el.find('.caption').val();
            item.small_url = el.attr('data-small-url');
            item.small_height = el.attr('data-small-height');
            item.small_width = el.attr('data-small-width');
            item.large_url = el.attr('data-large-url');
            item.large_height = el.attr('data-large-height');
            item.large_width = el.attr('data-large-width');
            item.size = el.attr('data-size');

            data.items.push(item);

      });

      return this.dispatchEvent(this.createEvent('save', data));
    };

    GalleryDialog.prototype.unmount = function() {
      GalleryDialog.__super__.unmount.call(this);
      this._domBodyInput = null;
      this._domPreviewContainer = null;
      this._domBtnOk = null;
      return true;
    };

    GalleryDialog.prototype._addDOMEventListeners = function() {
      GalleryDialog.__super__._addDOMEventListeners.call(this);

      var __this = this;

      this._domFileInput.addEventListener('change', (function(_this) {
        return function(ev) {

          var arr_files = ev.target.files;

          var recipes = ['mediaNormal','mediaFull'];

          // ev.target.value = ''; // DESPUES PORQUE BORRA REFES A ARCHIVOS

          for (var i = 0; i < arr_files.length; i++) {

            // genero un preview de la imagen con el preloader
            var reader = new FileReader();
            reader.onload = (function(file_obj){
                var file_name = file_obj.name;
                return function(e){

                  var img = new Image;
                  img.onload = function() {

                      var params = {};
                          params.small_url = e.target.result;

                       __this.RealToPreview(file_name,params,true);

                  };
                  img.src = e.target.result;
                  // console.log(file_name);

                };
            })(arr_files[i]);
            reader.readAsDataURL(arr_files[i]);

            //al mismo tiempo que mando a cargar la imagen real
            __this.uploadFile(arr_files[i], recipes);

          };

        };
      })(this));

      this._domBtnZoomOut.addEventListener('click', (function(_this) {
        return function(ev) {
          __this.previewZoom -= 5;
          if(__this.previewZoom<10) __this.previewZoom=10;
          $(__this._domPreviewContainer).css({'width':__this.previewZoom+'%'});
        };
      })(this));

      this._domBtnZoomIn.addEventListener('click', (function(_this) {
        return function(ev) {
          __this.previewZoom += 5;
          if(__this.previewZoom>100) __this.previewZoom=100;
          $(__this._domPreviewContainer).css({'width':__this.previewZoom+'%'});
        };
      })(this));

      this._domBtnOk.addEventListener('click', (function(_this) {
        return function(ev) {
          var cssClass;
          ev.preventDefault();
          cssClass = _this._domBtnOk.getAttribute('class');
          if (cssClass.indexOf('ct-control--muted') === -1) {
            return _this.save();
          }
        };
      })(this));


      console.log('bindss');

      $('.ct-gallery-size').on('click', function() {
        console.log('ct-gallery-size' + $(this).data('size'));
        $(this).closest('.ct-gallery-preview').attr('data-size',$(this).data('size'));
      });

      return true;
    };


    GalleryDialog.prototype._afterHandlers = function() {

      var __this = this;

      $(this._domPreviewContainer).sortable({
        // axis: "y",
        start: function( event, ui ) {

          // $(__this._domView).css({width:'80%'})

          // var t = $(__this._domBody).position().top + $(__this._domHeader).height() ;
          // console.log(t);

          // $(__this._domPreviewDropzone).css({top:t})
        }
      }).draggable();
      $(this._domPreviewDropzone).droppable({
          accept: '.ct-gallery-preview',
          activeClass: 'highlight',
          drop: function(event, ui) {
              // console.log(ui.draggable);
              ui.draggable.fadeOut(300,function(){
                $(this).remove();
              });
          }
      });
      $(this._domPreviewContainer).disableSelection();

    };

    GalleryDialog.prototype.uploadFile = function(file, recipes) {
      // console.log('GalleryDialog.prototype.uploadFile');

      var __this = this;
      // __this.busy(true);
      // console.log(file);
      // console.log(recipes);

      var data = new FormData();
        data.append('files', file);
        data.append('custom_image_recipes',recipes);

       $.ajax({
           type:'POST',
           url: ImageUploader.serviceUrl,
           processData: false,
           contentType: false,
           cache:false,
           data :data,
           success: function(data){
              // console.log('SUCCESS');
              console.log(data);



              for (var i = 0; i < data.files.length; i++) {

                var params = {};
                    params.small_url = data.files[i].recipes[0].url;
                    params.small_width = data.files[i].recipes[0].width;
                    params.small_height = data.files[i].recipes[0].height;
                    params.large_url = data.files[i].recipes[1].url;
                    params.large_width = data.files[i].recipes[1].width;
                    params.large_height = data.files[i].recipes[1].height;

                __this.RealToPreview(data.files[i].original,params,false);


                __this._afterHandlers();


              }

           },
           error: function (data) {
            console.log('error');
             console.log(data);
          }
       });

    };


    GalleryDialog.prototype.RealToPreview = function(name,params,loading) {

      var div = this._domPreviewContainer.querySelectorAll('[data-name="'+name+'"]');

      if(div.length==0){
        div = document.createElement('div');
        div.setAttribute('data-name', name);
        this._domPreviewContainer.appendChild(div);
      }
      else{
        div = div[0];
      }

      div.className = 'ct-gallery-preview';

      if(loading==true){
        div.className += ' ' + 'loading';
      }
      else{
        div.setAttribute('data-small-url', params.small_url);
        div.setAttribute('data-small-height', params.small_height);
        div.setAttribute('data-small-width', params.small_width);
        div.setAttribute('data-large-url', params.large_url);
        div.setAttribute('data-large-height', params.large_height);
        div.setAttribute('data-large-width', params.large_width);
        div.setAttribute('data-size', params.size);

      }

      var html = '';
      html += '<img src="'+params.small_url+'">';
      html += '\n<div class="loader"><i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span></div>';
      html += '\n<div class="ct-gallery-size-group">';
      html += '\n<div class="ct-control ct-control--icon ct-gallery-size" data-size="100"><i class="fa fa-battery-4"></i></div>';
      html += '\n<div class="ct-control ct-control--icon ct-gallery-size" data-size="50"><i class="fa fa-battery-3"></i></div>';
      html += '\n<div class="ct-control ct-control--icon ct-gallery-size" data-size="33"><i class="fa fa-battery-2"></i></div>';
      html += '\n<div class="ct-control ct-control--icon ct-gallery-size" data-size="25"><i class="fa fa-battery-1"></i></div>';
      html += '\n<div class="ct-control ct-control--icon ct-gallery-size" data-size="20"><i class="fa fa-battery-0"></i></div>';
      html += '\n</div>';
      html += '\n<input name="caption" class="caption" type="text" value="'+params.caption+'" />';
      div.innerHTML = html;

    };





    return GalleryDialog;

  })(ContentTools.DialogUI);


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

  ContentTools.Tools.Gallery = (function(_super) {
    __extends(Gallery, _super);

    function Gallery() {
      return Gallery.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Gallery, 'gallery');

    Gallery.label = 'Gallery';
    Gallery.toolName = 'gallery';
    Gallery.icon = 'fa-th-large';

    Gallery.canApply = function(element, selection) {
      if (element.type() === 'Gallery' || element.type() === 'Text' && element.content.characters.length==0) {
        return true;
      } else {
        return false;
      }
    };

    Gallery.isApplied = function(element, selection) {
      var res = element._domElement.className.indexOf('ce-element--type-gallery') !== -1;
      return res;
    };

    Gallery.apply = function(element, selection, callback) {
      // console.log('Gallery.apply');

      var __this = this;

      if (element.storeState) {
        element.storeState();
      }
      var app = ContentTools.EditorApp.get();
      var modal = new ContentTools.ModalUI();

      var  domelement;
      if(element.type()=='Gallery'){
        domelement = element._domElement;
      }
      else{
        domelement = element.closest(function(node) {
          return node && node.type() === 'Gallery';
        });
      }

      var dialog = new ContentTools.GalleryDialog(element,domelement);

      dialog.addEventListener('cancel', (function(_this) {
        return function() {
          modal.hide();
          dialog.hide();
          if (element.restoreState) {
            element.restoreState();
          }
          if(callback) return callback(false);
        };
      })(this));


      dialog.addEventListener('save', (function(_this) {
        return function(ev) {
          // console.log('dialog.addEventListener(save');

          var params = ev.detail();

          // ya existia, update
          if (domelement) {

            _this._update(params, domelement, element);

            element.taint();
            element.parent().taint();

          } else { // es nuevo, insert

            domelement = _this._create(params);

            var _ref = _this._insertAt(element);
            var node = _ref[0];
            var index = _ref[1];
            node.parent().attach(domelement, index);

          }

          modal.hide();
          dialog.hide();

          if(callback) return callback(true);
        };
      })(this));

      app.attach(modal);
      app.attach(dialog);
      modal.show();
      return dialog.show();
    };


    Gallery._create = function(params,contents) {
      // al guardar el dialogo, se crea el elemento con los atributos y contenidos nuevos

      var attributes = [];
      attributes['class']='article-gallery';
      attributes['itemscope']='';
      attributes['itemtype']='http://schema.org/ImageGallery';
      attributes['data-ce-tag']='gallery';
      attributes['data-cant']=params.items.length;

      var html = '';
      for (var i = 0; i < params.items.length; i++) {
        html += this.previewToReal(params.items[i]);
      };

      var gallery = new ContentEdit.Gallery(attributes,html);

      return gallery;
    };


    Gallery._update = function(params, domelement, element) {
      // al guardar, toma todos los cambios hechos en el dialogo y los imprime en el elemento y su dom

      var html = '';
      for (var i = 0; i < params.items.length; i++) {
        html += this.previewToReal(params.items[i]);
      };

      element._contents =  html;
      domelement.innerHTML =  html;
      domelement.setAttribute('data-cant',params.items.length);

      element.taint();
      element.parent().taint();
      return element;

    };


    Gallery.previewToReal = function(item) {
      // console.log('Gallery.previewToReal');

      var html = '';
          html += '<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" data-name="'+item.name+'" data-size="'+item.size+'">';
          html += '<a href="'+item.large_url+'" itemprop="contentUrl" data-size="'+item.large_width+'x'+item.large_height+'">';
          html += '<img src="'+item.small_url+'" itemprop="thumbnail" alt="Image description" />';
          html += '</a>';
          html += '<figcaption itemprop="caption description">'+item.caption+'</figcaption>';
          html += '</figure>';

      return html;

    };


    return Gallery;

  })(ContentTools.Tool);


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///



  ContentEdit.Gallery = (function(_super) {
    __extends(Gallery, _super);

    // el que se llama al crear el elemento ContentEdit.Element = (function(_super) {
    function Gallery(attributes, contents) {
      Gallery.__super__.constructor.call(this, 'div', attributes, 'Gallery', 'gallery', contents);
    }

    Gallery.prototype.cssTypeName = function() {
      return 'gallery';
    };

    Gallery.prototype.typeName = function() {
      return 'Gallery';
    };

    Gallery.prototype.type = function() {
      return 'Gallery';
    }

    Gallery.prototype._onMouseOver = function(ev) {
      Gallery.__super__._onMouseOver.call(this, ev);
      return this._removeCSSClass('ce-element--over');
    };

    Gallery.prototype._getChild = function(tagName) {
      var child, _i, _len, _ref;
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.tagName() === tagName) {
          return child;
        }
      }
      return null;
    };

    Gallery.prototype.focus = function(supressDOMFocus) {

      var root;
      root = ContentEdit.Root.get();
      if (this.isFocused()) {
        return;
      }
      if (root.focused()) {
        root.focused().blur();
      }
      this._addCSSClass('ce-element--focused');

      _this = this;

      root._focused = this;
      if (this.isMounted() && !supressDOMFocus) {
        this.domElement().focus();
      }

      return root.trigger('focus', this);

    };

    Gallery.prototype.blur = function() {
      var root;
      root = ContentEdit.Root.get();
      if (this.isFocused()) {
        this._removeCSSClass('ce-element--focused');

        // desacoplar jquery resizable del elemento cuando no es mas el seleccionado
        // $(this.domElement()).resizable('disable').removeClass('ui-state-disabled');

        root._focused = null;
        return root.trigger('blur', this);
      }
    };

    Gallery.fromDOMElement = function(domElement) {
      // console.log('Gallery.fromDOMElement');

      var attributes = this.getDOMElementAttributes(domElement)
      var element = new this(attributes,domElement.innerHTML);
          element._domElement = domElement;

      return element;
    };

    return Gallery;

  })(ContentEdit.ElementCollection);

  ContentEdit.TagNames.get().register(ContentEdit.Gallery, 'gallery');

}).call(this);