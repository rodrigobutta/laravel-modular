(function() {

  ContentTools.ColorDialog = (function(_super) {
    __extends(ColorDialog, _super);

    function ColorDialog(color) {

      this.color = color;
      this.newcolor = color;

      ColorDialog.__super__.constructor.call(this, 'Pick Color');

    }

    ColorDialog.prototype.mount = function() {

      var _this = this;

      ColorDialog.__super__.mount.call(this);


      ContentEdit.addCSSClass(this._domElement, 'ct-fullblock-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-fullblock-dialog__view');

      this._domBodySection = this.constructor.createDiv(['ct-section', 'ct-section--applied', 'ct-section--contains-input']);
      this._domView.appendChild(this._domBodySection);

      console.log(this.color);

      if(this.color==''){
        this.color='#000000';
      }


      var color_ColorPicker = new (ColorPicker)({
        color: this.color,
        appendTo: this._domView ,
        noResize: true,
         convertCallback: function(colors, type){
            if (typeof colors !== "undefined") {
              // _this.newvalues['color'] = colors.HEX;

              if(colors.alpha==1){
                _this.newcolor = '#' + colors.HEX;
              }
              else{
                _this.newcolor = 'rgba(' + colors.RND.rgb.r + ',' + colors.RND.rgb.g + ',' + colors.RND.rgb.b + ')';
              }

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

    ColorDialog.prototype.save = function() {
      // console.log('ColorDialog.prototype.save');

      var detail = {
        color: this.newcolor
      };
      return this.dispatchEvent(this.createEvent('save', detail));
    };

    ColorDialog.prototype.unmount = function() {
      ColorDialog.__super__.unmount.call(this);
      this._domApply = null;
      return true;
    };

    ColorDialog.prototype._addDOMEventListeners = function() {
      var toggleSection;
      ColorDialog.__super__._addDOMEventListeners.call(this);
      toggleSection = function(ev) {
        ev.preventDefault();
        if (this.getAttribute('class').indexOf('ct-section--applied') > -1) {
          return ContentEdit.removeCSSClass(this, 'ct-section--applied');
        } else {
          return ContentEdit.addCSSClass(this, 'ct-section--applied');
        }
      };

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

    return ColorDialog;

  })(ContentTools.DialogUI);


}).call(this);