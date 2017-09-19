(function() {

  ContentTools.FullblockDialog = (function(_super) {
    __extends(FullblockDialog, _super);

    function FullblockDialog(element,domelement) {

      this.element = element;
      this.domelement = domelement;

      if (this.domelement) {
        FullblockDialog.__super__.constructor.call(this, 'Update');
      } else {
        FullblockDialog.__super__.constructor.call(this, 'Create');
      }
    }

    FullblockDialog.prototype.mount = function() {

      FullblockDialog.__super__.mount.call(this);

      var params;
      if (this.element.type()=='Fullblock') { // si estoy editando
        params = {
          height: this.element._attributes['data-height'],
          bg: this.element._attributes['data-bg'],
          title: this.element._attributes['data-title'],
          color: this.element._attributes['data-color'],
          bgcolor: this.element._attributes['data-bgcolor'],
        };

        if(!params.title){
          params.title='';
        }
      }
      else{ // si es nuevo
        params = {
          height: 360,
          bg: '',
          title: '',
          color: '',
          bgtitle: '',
        };
      }

      ContentEdit.addCSSClass(this._domElement, 'ct-fullblock-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-fullblock-dialog__view');

      this._domBodySection = this.constructor.createDiv(['ct-section', 'ct-section--applied', 'ct-section--contains-input']);
      this._domView.appendChild(this._domBodySection);

      domHeightLabel = this.constructor.createDiv(['ct-section__label']);
      domHeightLabel.textContent = ContentEdit._('Height');
      this._domBodySection.appendChild(domHeightLabel);

      this._domHeight = document.createElement('input');
      this._domHeight.setAttribute('class', 'ct-section__input');
      this._domHeight.setAttribute('maxlength', '4');
      this._domHeight.setAttribute('name', 'height');
      this._domHeight.setAttribute('type', 'text');
      this._domHeight.setAttribute('value', params.height);
      this._domBodySection.appendChild(this._domHeight);

      domTitleLabel = this.constructor.createDiv(['ct-section__label']);
      domTitleLabel.textContent = ContentEdit._('Title');
      this._domBodySection.appendChild(domTitleLabel);

      this._domTitle = document.createElement('input');
      this._domTitle.setAttribute('class', 'ct-section__input');
      this._domTitle.setAttribute('name', 'title');
      this._domTitle.setAttribute('type', 'text');
      this._domTitle.setAttribute('value', params.title);
      this._domBodySection.appendChild(this._domTitle);

      domBgLabel = this.constructor.createDiv(['ct-section__label']);
      domBgLabel.textContent = ContentEdit._('background Image');
      this._domBodySection.appendChild(domBgLabel);

      this._domBg = document.createElement('input');
      this._domBg.setAttribute('class', 'ct-section__input');
      this._domBg.setAttribute('name', 'bg');
      this._domBg.setAttribute('type', 'text');
      this._domBg.setAttribute('value', params.bg);
      this._domBodySection.appendChild(this._domBg);

      domColorLabel = this.constructor.createDiv(['ct-section__label']);
      domColorLabel.textContent = ContentEdit._('Color');
      this._domBodySection.appendChild(domColorLabel);

      this._domColor = document.createElement('input');
      this._domColor.setAttribute('class', 'ct-section__input');
      this._domColor.setAttribute('name', 'bg');
      this._domColor.setAttribute('type', 'text');
      this._domColor.setAttribute('value', params.color);
      this._domBodySection.appendChild(this._domColor);

      domBgcolorLabel = this.constructor.createDiv(['ct-section__label']);
      domBgcolorLabel.textContent = ContentEdit._('Background Color');
      this._domBodySection.appendChild(domBgcolorLabel);

      this._domBgcolor = document.createElement('input');
      this._domBgcolor.setAttribute('class', 'ct-section__input');
      this._domBgcolor.setAttribute('name', 'bg');
      this._domBgcolor.setAttribute('type', 'text');
      this._domBgcolor.setAttribute('value', params.bgcolor);
      this._domBodySection.appendChild(this._domBgcolor);

      domControlGroup = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      this._domControls.appendChild(domControlGroup);

      domTools = this.constructor.createDiv(['ct-control-group', 'ct-control-group--left']);
      this._domControls.appendChild(domTools);

      this._domUpload = this.constructor.createDiv(['ct-control', 'ct-control--text']);
      this._domUpload.textContent = ContentEdit._('Upload');
      domTools.appendChild(this._domUpload);

      this._domBtnColor = this.constructor.createDiv(['ct-control', 'ct-control--text']);
      this._domBtnColor.textContent = ContentEdit._('Color');
      domTools.appendChild(this._domBtnColor);

      this._domBtnBgcolor = this.constructor.createDiv(['ct-control', 'ct-control--text']);
      this._domBtnBgcolor.textContent = ContentEdit._('Background Color');
      domTools.appendChild(this._domBtnBgcolor);

      this._domApply = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--apply']);
      this._domApply.textContent = 'Apply';
      domControlGroup.appendChild(this._domApply);

      return this._addDOMEventListeners();
    };

    FullblockDialog.prototype.save = function() {
      // console.log('FullblockDialog.prototype.save');

      var detail = {
        height: parseInt(this._domHeight.value),
        bg: this._domBg.value,
        title: this._domTitle.value,
        color: this._domColor.value,
        bgcolor: this._domBgcolor.value,
      };
      return this.dispatchEvent(this.createEvent('save', detail));
    };

    FullblockDialog.prototype.unmount = function() {
      FullblockDialog.__super__.unmount.call(this);
      this._domBodyInput = null;
      this._domBodySection = null;
      this._domApply = null;
      return true;
    };

    FullblockDialog.prototype._addDOMEventListeners = function() {
      var toggleSection;
      FullblockDialog.__super__._addDOMEventListeners.call(this);


      var __this = this;

      toggleSection = function(ev) {
        ev.preventDefault();
        if (this.getAttribute('class').indexOf('ct-section--applied') > -1) {
          return ContentEdit.removeCSSClass(this, 'ct-section--applied');
        } else {
          return ContentEdit.addCSSClass(this, 'ct-section--applied');
        }
      };

      this._domUpload.addEventListener('click', (function(_this) {
        return function(ev) {

          var _this = this;
          var app = ContentTools.EditorApp.get();
          var modal = new ContentTools.ModalUI();
          var dialog = new ContentTools.ImageDialog();

          dialog.addEventListener('cancel', (function(_this) {
            return function() {
              modal.hide();
              dialog.hide();

              return callback(false);
            };
          })(this));

          dialog.addEventListener('save', (function(_this) {
            return function(ev) {
              var data = ev.detail();
              console.log(data);

              __this._domBg.value = data.files[0].recipes[0].url;

              dialog.hide();
              modal.hide();

              return true;
            };
          })(this));

          app.attach(modal);
          app.attach(dialog);
          modal.show();
          dialog.show();

        };
      })(this));

      this._domBtnColor.addEventListener('click', (function(_this) {
        return function(ev) {

          var __this = _this;
          var app, dialog, modal;

          app = ContentTools.EditorApp.get();
          modal = new ContentTools.ModalUI();
          dialog = new ContentTools.ColorDialog(_this._domColor.value);

          dialog.addEventListener('cancel', (function(_this) {
            return function() {
              modal.hide();
              dialog.hide();
              return false;
            };
          })(this));

          dialog.addEventListener('save', (function(_this) {
            return function(ev) {
              var detail = ev.detail();
              console.log(detail);
              __this._domColor.value = detail.color;
              dialog.hide();
              modal.hide();
              return true;
            };
          })(this));

          app.attach(modal);
          app.attach(dialog);
          modal.show();
          return dialog.show();

        };
      })(this));


      this._domBtnBgcolor.addEventListener('click', (function(_this) {
        return function(ev) {

          var __this = _this;
          var app, dialog, modal;

          app = ContentTools.EditorApp.get();
          modal = new ContentTools.ModalUI();
          dialog = new ContentTools.ColorDialog(_this._domBgcolor.value);

          dialog.addEventListener('cancel', (function(_this) {
            return function() {
              modal.hide();
              dialog.hide();
              return false;
            };
          })(this));

          dialog.addEventListener('save', (function(_this) {
            return function(ev) {
              var detail = ev.detail();
              console.log(detail);
              __this._domBgcolor.value = detail.color;
              dialog.hide();
              modal.hide();
              return true;
            };
          })(this));

          app.attach(modal);
          app.attach(dialog);
          modal.show();
          return dialog.show();

        };
      })(this));


      return this._domApply.addEventListener('click', (function(_this) {
        return function(ev) {
          var cssClass;
          ev.preventDefault();
          cssClass = _this._domApply.getAttribute('class');
          if (cssClass.indexOf('ct-control--muted') === -1) {
            return _this.save();
          }
        };
      })(this));
    };

    return FullblockDialog;

  })(ContentTools.DialogUI);


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

  ContentTools.Tools.Fullblock = (function(_super) {
    __extends(Fullblock, _super);

    function Fullblock() {
      return Fullblock.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Fullblock, 'fullblock');

    Fullblock.label = 'Fullblock';
    Fullblock.toolName = 'fullblock';
    Fullblock.icon = 'fa-stop';

    Fullblock.canApply = function(element, selection) {
      // console.log('Fullblock.canApply');

      //reb
      if (element.type() === 'Fullblock' || element.type() === 'Text' && element.content.characters.length==0) {
        return true;
      } else {
        return false;
      }
    };

    Fullblock.isApplied = function(element, selection) {
      // console.log('Fullblock.isApplied');
      // console.log(!element.isFixed());
      var res = element._domElement.className.indexOf('ce-element--type-fullblock') !== -1;
      // console.log(res);
      return res;
    };


    Fullblock.apply = function(element, selection, callback) {
      // console.log('Fullblock.apply');

      var app, dialog, modal, domelement;
      if (element.storeState) {
        element.storeState();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI();

      if(element.type()=='Fullblock'){
        domelement = element._domElement;
      }
      else{
        domelement = element.closest(function(node) {
          return node && node.type() === 'Fullblock';
        });
      }

      dialog = new ContentTools.FullblockDialog(element,domelement);

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

          var index, keepFocus, node, params, _ref;
          params = ev.detail();
          keepFocus = true;

          // ya existia, update
          if (domelement) {

            _this._update(params, domelement, element);

            element.taint();
            element.parent().taint();

          } else { // es nuevo, insert

            domelement = _this._create(params);

            _ref = _this._insertAt(element);
            node = _ref[0];
            index = _ref[1];
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


    Fullblock._create = function(params) {
      // console.log('Fullblock._create');

      var attributes = [];
      attributes['class']='article-fullblock';
      attributes['style']='background-color:#ddd;background-image:url(\''+params.bg+'\');height:'+params.height+'px';
      attributes['data-height']=params.height;
      attributes['data-bg']=params.bg;
      attributes['data-title']=params.title;
      attributes['data-color']=params.color;
      attributes['data-bgcolor']=params.bgcolor;
      attributes['data-ce-tag']='fullblock';

      var contents = '<div class="wp"><h2>' + params.title + '</h2></div>';


      var fullblock;
      fullblock = new ContentEdit.Fullblock(attributes,contents);
      return fullblock;
    };

    Fullblock._update = function(params, domelement, element) {
      // console.log('Fullblock._update');

      var style = 'color:'+params.color+';background-color:'+params.bgcolor+';background-image:url(\''+params.bg+'\');height:'+params.height+'px';

      element._attributes['data-height'] = params.height;
      element._attributes['data-bg'] = params.bg;
      element._attributes['data-title'] = params.title;
      element._attributes['data-color'] = params.color;
      element._attributes['data-bgcolor'] = params.bgcolor;
      element._attributes['style'] = style;

      element._contents = '<div class="wp"><h2>' + params.title + '</h2></div>';

      domelement.setAttribute('data-bg',params.bg);
      domelement.setAttribute('data-height',params.height);
      domelement.setAttribute('data-title',params.title);
      domelement.setAttribute('data-color',params.color);
      domelement.setAttribute('data-bgcolor',params.bgcolor);
      domelement.setAttribute('style',style);

      domelement.innerHTML =  element._contents;


      element.taint();
      element.parent().taint();

      return element;

    };

    return Fullblock;

  })(ContentTools.Tool);


///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///



  ContentEdit.Fullblock = (function(_super) {
    __extends(Fullblock, _super);

    // el que se llama al crear el elemento ContentEdit.Element = (function(_super) {
    function Fullblock(attributes, contents) {
      Fullblock.__super__.constructor.call(this, 'div', attributes, 'Fullblock', 'fullblock', contents);
    }

    Fullblock.prototype.cssTypeName = function() {
      return 'fullblock';
    };

    Fullblock.prototype.typeName = function() {
      return 'Fullblock';
    };

    Fullblock.prototype.type = function() {
      return 'Fullblock';
    }

    // no se usa porque usa la funcion del padre ElementCollection.prototype.html en content-edit
    // Fullblock.prototype.html = function() {
    //   // saco las clases cs porque el outerhtml del dom me trae el actual con el editor puesto
    //   var classes = $(this._domElement.outerHTML)[0].className.replace(/(^| )ce[^ ]*/g, '');
    //   // preparo el html a devolver
    //   var el = $(this._domElement.outerHTML).attr('class',classes);
    //     el.removeClass('ui-resizable');
    //   return el[0].outerHTML;
    // };

    Fullblock.prototype._onMouseOver = function(ev) {
      Fullblock.__super__._onMouseOver.call(this, ev);
      return this._removeCSSClass('ce-element--over');
    };

    Fullblock.prototype._getChild = function(tagName) {
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

    Fullblock.prototype.focus = function(supressDOMFocus) {

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

      // si ya habia sido activado el resizable, no vuelvo a inicializarlo, sino que lo enableo
      if($(this.domElement()).is('.ui-resizable')){

        $(this.domElement()).resizable('enable');

      }
      else{

        // acoplar jquery resizable del elemento cuando esseleccionado
        $(this.domElement()).resizable({
          handles: 'n, s',
          stop: function( event, ui ) {
            // al terminar el rezise, actualizar el element con el nuevo height y marcar como modificado con taint

            var style = 'color:\''+_this._attributes['data-color']+'\';background-color:\''+_this._attributes['data-bgcolor']+'\';background-image:url(\''+_this._attributes['data-bg']+'\');height:'+ui.size.height+'px';

            _this._attributes['data-height'] = ui.size.height;
            _this._attributes['style'] = style;

            _this.taint();
            _this.parent().taint();
          }
        });

      }

      root._focused = this;
      if (this.isMounted() && !supressDOMFocus) {
        this.domElement().focus();
      }

      return root.trigger('focus', this);

    };

    Fullblock.prototype.blur = function() {
      var root;
      root = ContentEdit.Root.get();
      if (this.isFocused()) {
        this._removeCSSClass('ce-element--focused');

        // desacoplar jquery resizable del elemento cuando no es mas el seleccionado
        $(this.domElement()).resizable('disable').removeClass('ui-state-disabled');

        root._focused = null;
        return root.trigger('blur', this);
      }
    };

    Fullblock.fromDOMElement = function(domElement) {
      // console.log('Fullblock.fromDOMElement');
      //
      var attributes = this.getDOMElementAttributes(domElement)
      var element = new this(attributes,'<h2>####</h2>');
      element._contents = $(domElement).html();
      element._domElement = domElement;

      return element;
    };

    return Fullblock;

  })(ContentEdit.ElementCollection);

  ContentEdit.TagNames.get().register(ContentEdit.Fullblock, 'fullblock');

}).call(this);