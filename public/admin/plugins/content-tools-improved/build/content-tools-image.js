(function() {







  ContentEdit.Image = (function(_super) {
    __extends(Image, _super);

    function Image(attributes, a) {
      var size;
      Image.__super__.constructor.call(this, 'img', attributes, 'Image', 'image');
      this.a = a ? a : null;
      size = this.size();
      this._aspectRatio = size[1] / size[0];
    }

    Image.prototype.cssTypeName = function() {
      return 'image';
    };

    Image.prototype.type = function() {
      return 'Image';
    };

    Image.prototype.typeName = function() {
      return 'Image';
    };

    Image.prototype.createDraggingDOMElement = function() {
      var helper;
      if (!this.isMounted()) {
        return;
      }
      helper = Image.__super__.createDraggingDOMElement.call(this);
      helper.style.backgroundImage = "url(" + this._attributes['src'] + ")";
      return helper;
    };

    Image.prototype.html = function(indent) {
      var attributes, img;
      if (indent == null) {
        indent = '';
      }
      img = "" + indent + "<img" + (this._attributesToString()) + ">";
      if (this.a) {
        attributes = ContentEdit.attributesToString(this.a);
        attributes = "" + attributes + " data-ce-tag=\"img\"";
        return ("" + indent + "<a " + attributes + ">\n") + ("" + ContentEdit.INDENT + img + "\n") + ("" + indent + "</a>");
      } else {
        return img;
      }
    };

    Image.prototype.mount = function() {
      var classes, style;
      this._domElement = document.createElement('div');
      classes = '';
      if (this.a && this.a['class']) {
        classes += ' ' + this.a['class'];
      }
      if (this._attributes['class']) {
        classes += ' ' + this._attributes['class'];
      }
      this._domElement.setAttribute('class', classes);
      style = this._attributes['style'] ? this._attributes['style'] : '';
      style += "background-image:url(" + this._attributes['src'] + ");";
      if (this._attributes['width']) {
        style += "width:" + this._attributes['width'] + "px;";
      }
      // if (this._attributes['height']) {
      //   style += "height:" + this._attributes['height'] + "px;";
      // }
      this._domElement.setAttribute('style', style);

      // pongo esta imagen invisible para que el div mantenga el aspecto con el background image
      // http://stackoverflow.com/questions/600743/how-to-get-div-height-to-auto-adjust-to-background-size
      this._domElement.innerHTML = '<img src="' + this._attributes['src'] + '" style="visibility: hidden;" />';

      return Image.__super__.mount.call(this);
    };

    Image.prototype.unmount = function() {
      var domElement, wrapper;
      if (this.isFixed()) {
        wrapper = document.createElement('div');
        wrapper.innerHTML = this.html();
        domElement = wrapper.querySelector('a, img');
        this._domElement.parentNode.replaceChild(domElement, this._domElement);
        this._domElement = domElement;
      }
      return Image.__super__.unmount.call(this);
    };

    Image.droppers = {
      'Image': ContentEdit.Element._dropBoth,
      'PreText': ContentEdit.Element._dropBoth,
      'Static': ContentEdit.Element._dropBoth,
      'Text': ContentEdit.Element._dropBoth
    };

    Image.placements = ['above', 'below', 'left', 'right', 'center'];

    Image.fromDOMElement = function(domElement) {
      // console.log('Image.fromDOMElement');

      var a, attributes, c, childNode, childNodes, _i, _len;
      a = null;
      if (domElement.tagName.toLowerCase() === 'a') {
        a = this.getDOMElementAttributes(domElement);
        childNodes = (function() {
          var _i, _len, _ref, _results;
          _ref = domElement.childNodes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(c);
          }
          return _results;
        })();
        for (_i = 0, _len = childNodes.length; _i < _len; _i++) {
          childNode = childNodes[_i];
          if (childNode.nodeType === 1 && childNode.tagName.toLowerCase() === 'img') {
            domElement = childNode;
            break;
          }
        }
        if (domElement.tagName.toLowerCase() === 'a') {
          domElement = document.createElement('img');
        }
      }
      attributes = this.getDOMElementAttributes(domElement);
      if (attributes['width'] === void 0) {
        if (attributes['height'] === void 0) {
          attributes['width'] = domElement.naturalWidth;
        } else {
          attributes['width'] = domElement.clientWidth;
        }
      }
      // if (attributes['height'] === void 0) {
      //   if (attributes['width'] === void 0) {
      //     attributes['height'] = domElement.naturalHeight;
      //   } else {
      //     attributes['height'] = domElement.clientHeight;
      //   }
      // } ****

      var res = new this(attributes, a);
      // console.log(res);
      return res;
    };

    return Image;

  })(ContentEdit.ResizableElement);

  ContentEdit.TagNames.get().register(ContentEdit.Image, 'img');





  ContentTools.Tools.Image = (function(_super) {
    __extends(Image, _super);

    function Image() {
      return Image.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Image, 'image');

    Image.label = 'Image';
    Image.toolname = 'image';
    Image.icon = 'fa-image';

    Image.canApply = function(element, selection) {
      // console.log('Image.canApply');
      // console.log(!element.isFixed());
      return !element.isFixed();
    };

    Image.apply = function(element, selection, callback) {
      var app, dialog, modal;
      if (element.storeState) {
        element.storeState();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI();
      dialog = new ContentTools.ImageDialog();
      dialog.addEventListener('cancel', (function(_this) {
        return function() {
          modal.hide();
          dialog.hide();
          if (element.restoreState) {
            element.restoreState();
          }
          return callback(false);
        };
      })(this));

      dialog.addEventListener('save', (function(_this) {
        console.log('A2');

        return function(ev) {
          console.log('A3');

          var data = ev.detail();

          var image, imageAttrs, index, node, _ref;

          imageAttrs = {};
          // imageAttrs.height = data.files[0].recipes[0].height;
          imageAttrs.src = data.files[0].recipes[0].url;
          imageAttrs.width = data.files[0].recipes[0].width;
          image = new ContentEdit.Image(imageAttrs);

          if(selection==null){  // se llama de otro dialogo, pasar path
            console.log('mmmmmmmmmmmmmmmmmmm2');
            console.log(image._attributes);
            element.setAttribute('value', image._attributes.src);
            dialog.hide();
            modal.hide();
            return callback(true);
          }
          else{

            _ref = _this._insertAt(element), node = _ref[0], index = _ref[1];
            node.parent().attach(image, index);
            image.focus();
            modal.hide();
            dialog.hide();
            return callback(true);

          }


          // var detail, image, imageAttrs, imageSize, imageURL, index, node, _ref;
          // detail = ev.detail();
          // imageURL = detail.imageURL;
          // imageSize = detail.imageSize;
          // imageAttrs = detail.imageAttrs;
          // if (!imageAttrs) {
          //   imageAttrs = {};
          // }
          // imageAttrs.height = imageSize[1];
          // imageAttrs.src = imageURL;
          // imageAttrs.width = imageSize[0];
          // image = new ContentEdit.Image(imageAttrs);

          // if(selection==null){  // se llama de otro dialogo, pasar path
          //   console.log('mmmmmmmmmmmmmmmmmmm2');
          //   console.log(image._attributes);
          //   element.setAttribute('value', image._attributes.src);
          //   dialog.hide();
          //   modal.hide();
          //   return callback(true);
          // }
          // else{

          //   _ref = _this._insertAt(element), node = _ref[0], index = _ref[1];
          //   node.parent().attach(image, index);
          //   image.focus();
          //   modal.hide();
          //   dialog.hide();
          //   return callback(true);

          // }




        };
      })(this));
      app.attach(modal);
      app.attach(dialog);
      modal.show();
      return dialog.show();
    };

    return Image;

  })(ContentTools.Tool);

}).call(this);
