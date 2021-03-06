(function() {

  ContentTools.ForecolorDialog = (function(_super) {
    __extends(ForecolorDialog, _super);

    function ForecolorDialog(element,domelement,selection,tool) {

      this.selection = selection;
      this.element = element;
      this.domelement = domelement;
      this.tool = tool;

      this.newvalues = [];

      if (this.domelement) {
        ForecolorDialog.__super__.constructor.call(this, 'Update forecolor');
      } else {
        ForecolorDialog.__super__.constructor.call(this, 'Insert forecolor');
      }

    }

    ForecolorDialog.prototype.mount = function() {

      var _this = this;

      ForecolorDialog.__super__.mount.call(this);

       var from, to, _ref;
      this.element.storeState();
      _ref = this.selection.get(), from = _ref[0], to = _ref[1];

      if (this.tool.isApplied(this.element, this.selection)) {
        console.log('appliedddd')
      } else {
        console.log('no appliedddd')
      }

      ContentEdit.addCSSClass(this._domElement, 'ct-forecolor-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-forecolor-dialog__view');

      var color_ColorPicker = new (ColorPicker)({
        color: 'rgba(204, 82, 37, 1)',
        appendTo: this._domView ,
        noResize: true,
         convertCallback: function(colors, type){
            if (typeof colors !== "undefined") {
              _this.newvalues['color'] = colors.HEX;

            }
         },
         memoryColors: [{r: 100, g: 200, b: 10, a: 0.8},{r: 0, g: 200, b: 50, a: 1}]
      });

      domControlGroup = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      this._domControls.appendChild(domControlGroup);

      domTools = this.constructor.createDiv(['ct-control-group', 'ct-control-group--left']);
      this._domControls.appendChild(domTools);

      this._domApply = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--apply']);
      this._domApply.textContent = 'Apply';
      domControlGroup.appendChild(this._domApply);

      return this._addDOMEventListeners();
    };

    ForecolorDialog.prototype.save = function() {
      console.log('ForecolorDialog.prototype.save');

      this.element.storeState();
      var _ref = this.selection.get();
      var from = _ref[0];
      var to = _ref[1];

      var obj_tag = new HTMLString.Tag(this.tool.tagName);
      obj_tag._attributes['data-color'] = '#' + this.newvalues.color;
      obj_tag._attributes['style'] = 'color:#' + this.newvalues.color;

      this.element.content = this.element.content.format(from, to, obj_tag);

      this.element.content.optimize();
      this.element.updateInnerHTML();

      this.element.taint();
      this.element.restoreState();

      return this.dispatchEvent(this.createEvent('save'));
    };


    ForecolorDialog.prototype.unmount = function() {
      ForecolorDialog.__super__.unmount.call(this);
      this._domBodyInput = null;
      this._domBodySection = null;
      this._domApply = null;
      this._domClear = null;
      return true;
    };

    ForecolorDialog.prototype._addDOMEventListeners = function() {
      var toggleSection;
      ForecolorDialog.__super__._addDOMEventListeners.call(this);

      toggleSection = function(ev) {

        ev.preventDefault();

        if (this.getAttribute('class').indexOf('ct-section--applied') > -1) {
          return ContentEdit.removeCSSClass(this, 'ct-section--applied');
        } else {
          return ContentEdit.addCSSClass(this, 'ct-section--applied');
        }
      };

      this._domApply.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();

          var cssClass = _this._domApply.getAttribute('class');
          if (cssClass.indexOf('ct-control--muted') === -1) {
            return _this.save();
          }

        };
      })(this));

    };

    return ForecolorDialog;

  })(ContentTools.DialogUI);







  ContentTools.Tools.ForeColor = (function(_super) {
    __extends(ForeColor, _super);

    function ForeColor() {
      return ForeColor.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(ForeColor, 'forecolor');

    ForeColor.label = 'Fore Color';
    ForeColor.toolName = 'forecolor';
    ForeColor.icon = 'fa-tint';
    ForeColor.tagName = 'span';

    ForeColor.canApply = function(element, selection) {
      if (!element.content) {
        return false;
      }
      return selection && !selection.isCollapsed();
    };

    ForeColor.isApplied = function(element, selection) {
      return false;

      // var from, to, _ref;
      // if (element.content === void 0 || !element.content.length()) {
      //   return false;
      // }
      // _ref = selection.get(), from = _ref[0], to = _ref[1];
      // if (from === to) {
      //   to += 1;
      // }
      // return element.content.slice(from, to).indexOf('data-color') !== -1;
      // return element.content.slice(from, to).hasTags(this.tagName, true);
    };

    ForeColor.apply = function(element, selection, callback) {
      console.log('????11111');

      var app, dialog, modal, domelement;
      if (element.storeState) {
        element.storeState();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI();

      if(element.type()=='Forecolor'){
        domelement = element._domElement;
      }
      else{
        domelement = element.closest(function(node) {
          return node && node.type() === 'Forecolor';
        });
      }

      dialog = new ContentTools.ForecolorDialog(element,domelement,selection,this);


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
          console.log('dialog.addEventListener(save');

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

    return ForeColor;

  })(ContentTools.Tool);

}).call(this);
