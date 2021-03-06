  var AttributeUI, ContentTools, CropMarksUI, StyleUI, exports, _EditorApp,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;



(function() {

  ContentTools = {
    Tools: {},
    CANCEL_MESSAGE: 'Your changes have not been saved, do you really want to lose them?'.trim(),
    DEFAULT_TOOLS: [['bold', 'italic', 'link', 'align-left', 'align-center', 'align-right'], ['heading', 'subheading', 'paragraph', 'unordered-list', 'ordered-list', 'table', 'indent', 'unindent', 'line-break'], ['image', 'video', 'preformatted'],   ['undo', 'redo', 'remove']],
    DEFAULT_VIDEO_HEIGHT: 300,
    DEFAULT_VIDEO_WIDTH: 400,
    HIGHLIGHT_HOLD_DURATION: 2000,
    INSPECTOR_IGNORED_ELEMENTS: ['Fixture', 'ListItemText', 'Region', 'TableCellText'],
    IMAGE_UPLOADER: null,
    MIN_CROP: 10,
    RESTRICTED_ATTRIBUTES: {
      '*': ['style'],
      'img': ['height', 'src', 'width', 'data-ce-max-width', 'data-ce-min-width'],
      'iframe': ['height', 'width']
    },
    getEmbedVideoURL: function(url) {
      var domains, id, k, kv, m, netloc, paramStr, params, paramsStr, parser, path, v, _i, _len, _ref;
      domains = {
        'www.youtube.com': 'youtube',
        'youtu.be': 'youtube',
        'vimeo.com': 'vimeo',
        'player.vimeo.com': 'vimeo'
      };
      parser = document.createElement('a');
      parser.href = url;
      netloc = parser.hostname.toLowerCase();
      path = parser.pathname;
      if (path !== null && path.substr(0, 1) !== "/") {
        path = "/" + path;
      }
      params = {};
      paramsStr = parser.search.slice(1);
      _ref = paramsStr.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kv = _ref[_i];
        kv = kv.split("=");
        if (kv[0]) {
          params[kv[0]] = kv[1];
        }
      }
      switch (domains[netloc]) {
        case 'youtube':
          if (path.toLowerCase() === '/watch') {
            if (!params['v']) {
              return null;
            }
            id = params['v'];
            delete params['v'];
          } else {
            m = path.match(/\/([A-Za-z0-9_-]+)$/i);
            if (!m) {
              return null;
            }
            id = m[1];
          }
          url = "https://www.youtube.com/embed/" + id;
          paramStr = ((function() {
            var _results;
            _results = [];
            for (k in params) {
              v = params[k];
              _results.push("" + k + "=" + v);
            }
            return _results;
          })()).join('&');
          if (paramStr) {
            url += "?" + paramStr;
          }
          return url;
        case 'vimeo':
          m = path.match(/\/(\w+\/\w+\/){0,1}(\d+)/i);
          if (!m) {
            return null;
          }
          url = "https://player.vimeo.com/video/" + m[2];
          paramStr = ((function() {
            var _results;
            _results = [];
            for (k in params) {
              v = params[k];
              _results.push("" + k + "=" + v);
            }
            return _results;
          })()).join('&');
          if (paramStr) {
            url += "?" + paramStr;
          }
          return url;
      }
      return null;
    },
    getRestrictedAtributes: function(tagName) {
      var restricted;
      restricted = [];
      if (ContentTools.RESTRICTED_ATTRIBUTES[tagName]) {
        restricted = restricted.concat(ContentTools.RESTRICTED_ATTRIBUTES[tagName]);
      }
      if (ContentTools.RESTRICTED_ATTRIBUTES['*']) {
        restricted = restricted.concat(ContentTools.RESTRICTED_ATTRIBUTES['*']);
      }
      return restricted;
    },
    getScrollPosition: function() {
      var isCSS1Compat, supportsPageOffset;
      supportsPageOffset = window.pageXOffset !== void 0;
      isCSS1Compat = (document.compatMode || 4) === 4;
      if (supportsPageOffset) {
        return [window.pageXOffset, window.pageYOffset];
      } else if (isCSS1Compat) {
        return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      } else {
        return [document.body.scrollLeft, document.body.scrollTop];
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.ContentTools = ContentTools;
  }

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = ContentTools;
  }

  ContentTools.ComponentUI = (function() {
    function ComponentUI() {
      this._bindings = {};
      this._parent = null;
      this._children = [];
      this._domElement = null;
    }

    ComponentUI.prototype.children = function() {
      return this._children.slice();
    };

    ComponentUI.prototype.domElement = function() {
      return this._domElement;
    };

    ComponentUI.prototype.isMounted = function() {
      return this._domElement !== null;
    };

    ComponentUI.prototype.parent = function() {
      return this._parent;
    };

    ComponentUI.prototype.attach = function(component, index) {
      if (component.parent()) {
        component.parent().detach(component);
      }
      component._parent = this;
      if (index !== void 0) {
        return this._children.splice(index, 0, component);
      } else {
        return this._children.push(component);
      }
    };

    ComponentUI.prototype.addCSSClass = function(className) {
      if (!this.isMounted()) {
        return;
      }
      return ContentEdit.addCSSClass(this._domElement, className);
    };

    ComponentUI.prototype.detatch = function(component) {
      var componentIndex;
      componentIndex = this._children.indexOf(component);
      if (componentIndex === -1) {
        return;
      }
      return this._children.splice(componentIndex, 1);
    };

    ComponentUI.prototype.mount = function() {};

    ComponentUI.prototype.removeCSSClass = function(className) {
      if (!this.isMounted()) {
        return;
      }
      return ContentEdit.removeCSSClass(this._domElement, className);
    };

    ComponentUI.prototype.unmount = function() {
      if (!this.isMounted()) {
        return;
      }
      this._removeDOMEventListeners();
      if (this._domElement.parentNode) {
        this._domElement.parentNode.removeChild(this._domElement);
      }
      return this._domElement = null;
    };

    ComponentUI.prototype.addEventListener = function(eventName, callback) {
      if (this._bindings[eventName] === void 0) {
        this._bindings[eventName] = [];
      }
      this._bindings[eventName].push(callback);
    };

    ComponentUI.prototype.createEvent = function(eventName, detail) {
      return new ContentTools.Event(eventName, detail);
    };

    ComponentUI.prototype.dispatchEvent = function(ev) {
      var callback, _i, _len, _ref;
      if (!this._bindings[ev.name()]) {
        return !ev.defaultPrevented();
      }
      _ref = this._bindings[ev.name()];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        if (ev.propagationStopped()) {
          break;
        }
        if (!callback) {
          continue;
        }
        callback.call(this, ev);
      }
      return !ev.defaultPrevented();
    };

    ComponentUI.prototype.removeEventListener = function(eventName, callback) {
      var i, suspect, _i, _len, _ref, _results;
      if (!eventName) {
        this._bindings = {};
        return;
      }
      if (!callback) {
        this._bindings[eventName] = void 0;
        return;
      }
      if (!this._bindings[eventName]) {
        return;
      }
      _ref = this._bindings[eventName];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        suspect = _ref[i];
        if (suspect === callback) {
          _results.push(this._bindings[eventName].splice(i, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ComponentUI.prototype._addDOMEventListeners = function() {};

    ComponentUI.prototype._removeDOMEventListeners = function() {};

    ComponentUI.createDiv = function(classNames, attributes, content) {
      var domElement, name, value;
      domElement = document.createElement('div');
      if (classNames && classNames.length > 0) {
        domElement.setAttribute('class', classNames.join(' '));
      }
      if (attributes) {
        for (name in attributes) {
          value = attributes[name];
          domElement.setAttribute(name, value);
        }
      }
      if (content) {
        domElement.innerHTML = content;
      }
      return domElement;
    };

    return ComponentUI;

  })();

  ContentTools.WidgetUI = (function(_super) {
    __extends(WidgetUI, _super);

    function WidgetUI() {
      return WidgetUI.__super__.constructor.apply(this, arguments);
    }

    WidgetUI.prototype.attach = function(component, index) {
      WidgetUI.__super__.attach.call(this, component, index);
      if (!this.isMounted()) {
        return component.mount();
      }
    };

    WidgetUI.prototype.detatch = function(component) {
      WidgetUI.__super__.detatch.call(this, component);
      if (this.isMounted()) {
        return component.unmount();
      }
    };

    WidgetUI.prototype.show = function() {
      var fadeIn;
      if (!this.isMounted()) {
        this.mount();
      }
      fadeIn = (function(_this) {
        return function() {
          return _this.addCSSClass('ct-widget--active');
        };
      })(this);
      return setTimeout(fadeIn, 100);
    };

    WidgetUI.prototype.hide = function() {
      var monitorForHidden;
      this.removeCSSClass('ct-widget--active');
      monitorForHidden = (function(_this) {
        return function() {
          if (!window.getComputedStyle) {
            _this.unmount();
            return;
          }
          if (parseFloat(window.getComputedStyle(_this._domElement).opacity) < 0.01) {
            return _this.unmount();
          } else {
            return setTimeout(monitorForHidden, 250);
          }
        };
      })(this);
      if (this.isMounted()) {
        return setTimeout(monitorForHidden, 250);
      }
    };

    return WidgetUI;

  })(ContentTools.ComponentUI);

  ContentTools.AnchoredComponentUI = (function(_super) {
    __extends(AnchoredComponentUI, _super);

    function AnchoredComponentUI() {
      return AnchoredComponentUI.__super__.constructor.apply(this, arguments);
    }

    AnchoredComponentUI.prototype.mount = function(domParent, before) {
      if (before == null) {
        before = null;
      }
      domParent.insertBefore(this._domElement, before);
      return this._addDOMEventListeners();
    };

    return AnchoredComponentUI;

  })(ContentTools.ComponentUI);

  ContentTools.Event = (function() {
    function Event(name, detail) {
      this._name = name;
      this._detail = detail;
      this._timeStamp = Date.now();
      this._defaultPrevented = false;
      this._propagationStopped = false;
    }

    Event.prototype.defaultPrevented = function() {
      return this._defaultPrevented;
    };

    Event.prototype.detail = function() {
      return this._detail;
    };

    Event.prototype.name = function() {
      return this._name;
    };

    Event.prototype.propagationStopped = function() {
      return this._propagationStopped;
    };

    Event.prototype.timeStamp = function() {
      return this._timeStamp;
    };

    Event.prototype.preventDefault = function() {
      return this._defaultPrevented = true;
    };

    Event.prototype.stopImmediatePropagation = function() {
      return this._propagationStopped = true;
    };

    return Event;

  })();

  ContentTools.FlashUI = (function(_super) {
    __extends(FlashUI, _super);

    function FlashUI(modifier) {
      FlashUI.__super__.constructor.call(this);
      this.mount(modifier);
    }

    FlashUI.prototype.mount = function(modifier) {
      var monitorForHidden;
      this._domElement = this.constructor.createDiv(['ct-flash', 'ct-flash--active', "ct-flash--" + modifier, 'ct-widget', 'ct-widget--active']);
      FlashUI.__super__.mount.call(this, ContentTools.EditorApp.get().domElement());
      monitorForHidden = (function(_this) {
        return function() {
          if (!window.getComputedStyle) {
            _this.unmount();
            return;
          }
          if (parseFloat(window.getComputedStyle(_this._domElement).opacity) < 0.01) {
            return _this.unmount();
          } else {
            return setTimeout(monitorForHidden, 250);
          }
        };
      })(this);
      return setTimeout(monitorForHidden, 250);
    };

    return FlashUI;

  })(ContentTools.AnchoredComponentUI);

  ContentTools.IgnitionUI = (function(_super) {
    __extends(IgnitionUI, _super);

    function IgnitionUI() {
      IgnitionUI.__super__.constructor.call(this);
      this._revertToState = 'ready';
      this._state = 'ready';
    }

    IgnitionUI.prototype.busy = function(busy) {
      if (this.dispatchEvent(this.createEvent('busy', {
        busy: busy
      }))) {
        if (busy === (this._state === 'busy')) {
          return;
        }
        if (busy) {
          this._revertToState = this._state;
          return this.state('busy');
        } else {
          return this.state(this._revertToState);
        }
      }
    };

    IgnitionUI.prototype.cancel = function() {
      if (this.dispatchEvent(this.createEvent('cancel'))) {
        return this.state('ready');
      }
    };

    IgnitionUI.prototype.confirm = function() {
      if (this.dispatchEvent(this.createEvent('confirm'))) {
        return this.state('ready');
      }
    };

    IgnitionUI.prototype.edit = function() {
      if (this.dispatchEvent(this.createEvent('edit'))) {
        return this.state('editing');
      }
    };

    IgnitionUI.prototype.mount = function() {
      IgnitionUI.__super__.mount.call(this);
      this._domElement = this.constructor.createDiv(['ct-widget', 'ct-ignition', 'ct-ignition--ready']);
      this.parent().domElement().appendChild(this._domElement);
      this._domEdit = this.constructor.createDiv(['ct-ignition__button', 'ct-ignition__button--edit']);
      this._domElement.appendChild(this._domEdit);
      this._domConfirm = this.constructor.createDiv(['ct-ignition__button', 'ct-ignition__button--confirm']);
      this._domElement.appendChild(this._domConfirm);
      this._domCancel = this.constructor.createDiv(['ct-ignition__button', 'ct-ignition__button--cancel']);
      this._domElement.appendChild(this._domCancel);
      this._domBusy = this.constructor.createDiv(['ct-ignition__button', 'ct-ignition__button--busy']);
      this._domElement.appendChild(this._domBusy);
      return this._addDOMEventListeners();
    };

    IgnitionUI.prototype.state = function(state) {
      if (state === void 0) {
        return this._state;
      }
      if (this._state === state) {
        return;
      }
      if (!this.dispatchEvent(this.createEvent('statechange', {
        state: state
      }))) {
        return;
      }
      this._state = state;
      this.removeCSSClass('ct-ignition--busy');
      this.removeCSSClass('ct-ignition--editing');
      this.removeCSSClass('ct-ignition--ready');
      if (this._state === 'busy') {
        return this.addCSSClass('ct-ignition--busy');
      } else if (this._state === 'editing') {
        return this.addCSSClass('ct-ignition--editing');
      } else if (this._state === 'ready') {
        return this.addCSSClass('ct-ignition--ready');
      }
    };

    IgnitionUI.prototype.unmount = function() {
      IgnitionUI.__super__.unmount.call(this);
      this._domEdit = null;
      this._domConfirm = null;
      return this._domCancel = null;
    };

    IgnitionUI.prototype._addDOMEventListeners = function() {
      this._domEdit.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          return _this.edit();
        };
      })(this));
      this._domConfirm.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          return _this.confirm();
        };
      })(this));
      return this._domCancel.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          return _this.cancel();
        };
      })(this));
    };

    return IgnitionUI;

  })(ContentTools.WidgetUI);

  ContentTools.InspectorUI = (function(_super) {
    __extends(InspectorUI, _super);

    function InspectorUI() {
      InspectorUI.__super__.constructor.call(this);
      this._tagUIs = [];
    }

    InspectorUI.prototype.mount = function() {
      this._domElement = this.constructor.createDiv(['ct-widget', 'ct-inspector']);
      this.parent().domElement().appendChild(this._domElement);
      this._domTags = this.constructor.createDiv(['ct-inspector__tags', 'ct-tags']);
      this._domElement.appendChild(this._domTags);
      this._domCounter = this.constructor.createDiv(['ct-inspector__counter']);
      this._domElement.appendChild(this._domCounter);
      this.updateCounter();
      this._addDOMEventListeners();
      this._handleFocusChange = (function(_this) {
        return function() {
          return _this.updateTags();
        };
      })(this);
      ContentEdit.Root.get().bind('blur', this._handleFocusChange);
      ContentEdit.Root.get().bind('focus', this._handleFocusChange);
      return ContentEdit.Root.get().bind('mount', this._handleFocusChange);
    };

    InspectorUI.prototype.unmount = function() {
      InspectorUI.__super__.unmount.call(this);
      this._domTags = null;
      ContentEdit.Root.get().unbind('blur', this._handleFocusChange);
      ContentEdit.Root.get().unbind('focus', this._handleFocusChange);
      return ContentEdit.Root.get().unbind('mount', this._handleFocusChange);
    };

    InspectorUI.prototype.updateCounter = function() {
      var column, completeText, element, line, lines, region, sub, word_count, _i, _len, _ref;
      if (!this.isMounted()) {
        return;
      }
      completeText = '';
      _ref = ContentTools.EditorApp.get().orderedRegions();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        region = _ref[_i];
        if (!region) {
          continue;
        }
        completeText += region.domElement().textContent;
      }
      completeText = completeText.trim();
      completeText = completeText.replace(/<\/?[a-z][^>]*>/gi, '');
      completeText = completeText.replace(/[\u200B]+/, '');
      completeText = completeText.replace(/['";:,.?¿\-!¡]+/g, '');
      word_count = (completeText.match(/\S+/g) || []).length;
      word_count = word_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      element = ContentEdit.Root.get().focused();
      if (!(element && element.type() === 'PreText' && element.selection().isCollapsed())) {
        this._domCounter.textContent = word_count;
        return;
      }
      line = 0;
      column = 1;
      sub = element.content.substring(0, element.selection().get()[0]);
      lines = sub.text().split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
      line = line.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      column = column.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return this._domCounter.textContent = "" + word_count + " / " + line + ":" + column;
    };

    InspectorUI.prototype.updateTags = function() {
      var element, elements, tag, _i, _j, _len, _len1, _ref, _results;
      element = ContentEdit.Root.get().focused();
      _ref = this._tagUIs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        tag.unmount();
      }
      this._tagUIs = [];
      if (!element) {
        return;
      }
      elements = element.parents();
      elements.reverse();
      elements.push(element);
      _results = [];
      for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
        element = elements[_j];
        if (ContentTools.INSPECTOR_IGNORED_ELEMENTS.indexOf(element.type()) !== -1) {
          continue;
        }
        if (element.isFixed()) {
          continue;
        }
        tag = new ContentTools.TagUI(element);
        this._tagUIs.push(tag);
        _results.push(tag.mount(this._domTags));
      }
      return _results;
    };

    InspectorUI.prototype._addDOMEventListeners = function() {
      return this._updateCounterInterval = setInterval((function(_this) {
        return function() {
          return _this.updateCounter();
        };
      })(this), 250);
    };

    InspectorUI.prototype._removeDOMEventListeners = function() {
      return clearInterval(this._updateCounterInterval);
    };

    return InspectorUI;

  })(ContentTools.WidgetUI);

  ContentTools.TagUI = (function(_super) {
    __extends(TagUI, _super);

    function TagUI(element) {
      this.element = element;
      this._onMouseDown = __bind(this._onMouseDown, this);
      TagUI.__super__.constructor.call(this);
    }

    TagUI.prototype.mount = function(domParent, before) {
      if (before == null) {
        before = null;
      }
      this._domElement = this.constructor.createDiv(['ct-tag']);
      this._domElement.textContent = this.element.tagName();
      return TagUI.__super__.mount.call(this, domParent, before);
    };

    TagUI.prototype._addDOMEventListeners = function() {
      return this._domElement.addEventListener('mousedown', this._onMouseDown);
    };

    TagUI.prototype._onMouseDown = function(ev) {
      var app, dialog, modal;
      ev.preventDefault();
      if (this.element.storeState) {
        this.element.storeState();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI();
      dialog = new ContentTools.PropertiesDialog(this.element);
      dialog.addEventListener('cancel', (function(_this) {
        return function() {
          modal.hide();
          dialog.hide();
          if (_this.element.restoreState) {
            return _this.element.restoreState();
          }
        };
      })(this));
      dialog.addEventListener('save', (function(_this) {
        return function(ev) {
          var applied, attributes, className, classNames, cssClass, detail, element, innerHTML, name, styles, value, _i, _j, _len, _len1, _ref, _ref1;
          detail = ev.detail();
          attributes = detail.changedAttributes;
          styles = detail.changedStyles;
          innerHTML = detail.innerHTML;
          for (name in attributes) {
            value = attributes[name];
            if (name === 'class') {
              if (value === null) {
                value = '';
              }
              classNames = {};
              _ref = value.split(' ');
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                className = _ref[_i];
                className = className.trim();
                if (!className) {
                  continue;
                }
                classNames[className] = true;
                if (!_this.element.hasCSSClass(className)) {
                  _this.element.addCSSClass(className);
                }
              }
              _ref1 = _this.element.attr('class').split(' ');
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                className = _ref1[_j];
                className = className.trim();
                if (classNames[className] === void 0) {
                  _this.element.removeCSSClass(className);
                }
              }
            } else {
              if (value === null) {
                _this.element.removeAttr(name);
              } else {
                _this.element.attr(name, value);
              }
            }
          }
          for (cssClass in styles) {
            applied = styles[cssClass];
            if (applied) {
              _this.element.addCSSClass(cssClass);
            } else {
              _this.element.removeCSSClass(cssClass);
            }
          }
          if (innerHTML !== null) {
            if (innerHTML !== dialog.getElementInnerHTML()) {
              element = _this.element;
              if (!element.content) {
                element = element.children[0];
              }
              element.content = new HTMLString.String(innerHTML, element.content.preserveWhitespace());
              element.updateInnerHTML();
              element.taint();
              element.selection(new ContentSelect.Range(0, 0));
              element.storeState();
            }
          }
          modal.hide();
          dialog.hide();
          if (_this.element.restoreState) {
            return _this.element.restoreState();
          }
        };
      })(this));
      app.attach(modal);
      app.attach(dialog);
      modal.show();
      return dialog.show();
    };

    return TagUI;

  })(ContentTools.AnchoredComponentUI);

  ContentTools.ModalUI = (function(_super) {
    __extends(ModalUI, _super);

    function ModalUI(transparent, allowScrolling) {
      ModalUI.__super__.constructor.call(this);
      this._transparent = transparent;
      this._allowScrolling = allowScrolling;
    }

    ModalUI.prototype.mount = function() {
      this._domElement = this.constructor.createDiv(['ct-widget', 'ct-modal']);
      this.parent().domElement().appendChild(this._domElement);
      if (this._transparent) {
        this.addCSSClass('ct-modal--transparent');
      }
      if (!this._allowScrolling) {
        ContentEdit.addCSSClass(document.body, 'ct--no-scroll');
      }
      return this._addDOMEventListeners();
    };

    ModalUI.prototype.unmount = function() {
      if (!this._allowScrolling) {
        ContentEdit.removeCSSClass(document.body, 'ct--no-scroll');
      }
      return ModalUI.__super__.unmount.call(this);
    };

    ModalUI.prototype._addDOMEventListeners = function() {
      return this._domElement.addEventListener('click', (function(_this) {
        return function(ev) {
          return _this.dispatchEvent(_this.createEvent('click'));
        };
      })(this));
    };

    return ModalUI;

  })(ContentTools.WidgetUI);

  ContentTools.ToolboxUI = (function(_super) {
    __extends(ToolboxUI, _super);

    function ToolboxUI(tools) {
      this._onStopDragging = __bind(this._onStopDragging, this);
      this._onStartDragging = __bind(this._onStartDragging, this);
      this._onDrag = __bind(this._onDrag, this);
      ToolboxUI.__super__.constructor.call(this);
      this._tools = tools;
      this._dragging = false;
      this._draggingOffset = null;
      this._domGrip = null;
      this._toolUIs = {};
    }

    ToolboxUI.prototype.isDragging = function() {
      return this._dragging;
    };

    ToolboxUI.prototype.hide = function() {
      this._removeDOMEventListeners();
      return ToolboxUI.__super__.hide.call(this);
    };

    ToolboxUI.prototype.mount = function() {
      var coord, position, restore;
      this._domElement = this.constructor.createDiv(['ct-widget', 'ct-toolbox']);
      this.parent().domElement().appendChild(this._domElement);
      this._domGrip = this.constructor.createDiv(['ct-toolbox__grip', 'ct-grip']);
      this._domElement.appendChild(this._domGrip);
      this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));
      this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));
      this._domGrip.appendChild(this.constructor.createDiv(['ct-grip__bump']));
      this._domToolGroups = this.constructor.createDiv(['ct-tool-groups']);
      this._domElement.appendChild(this._domToolGroups);
      this.tools(this._tools);
      restore = window.localStorage.getItem('ct-toolbox-position');
      if (restore && /^\d+,\d+$/.test(restore)) {
        position = (function() {
          var _i, _len, _ref, _results;
          _ref = restore.split(',');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            coord = _ref[_i];
            _results.push(parseInt(coord));
          }
          return _results;
        })();
        this._domElement.style.left = "" + position[0] + "px";
        this._domElement.style.top = "" + position[1] + "px";
        this._contain();
      }
      return this._addDOMEventListeners();
    };

    ToolboxUI.prototype.tools = function(tools) {
      var domToolGroup, i, tool, toolGroup, toolName, toolUI, _i, _len, _ref, _ref1, _results;
      if (tools === void 0) {
        return this._tools;
      }
      this._tools = tools;
      if (!this.isMounted()) {
        return;
      }
      _ref = this._toolUIs;
      for (toolName in _ref) {
        toolUI = _ref[toolName];
        toolUI.unmount();
      }
      this._toolUIs = {};
      while (this._domToolGroups.lastChild) {
        this._domToolGroups.removeChild(this._domToolGroups.lastChild);
      }
      _ref1 = this._tools;
      _results = [];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        toolGroup = _ref1[i];
        domToolGroup = this.constructor.createDiv(['ct-tool-group']);
        this._domToolGroups.appendChild(domToolGroup);
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = toolGroup.length; _j < _len1; _j++) {
            toolName = toolGroup[_j];
            tool = ContentTools.ToolShelf.fetch(toolName);
            this._toolUIs[toolName] = new ContentTools.ToolUI(tool);
            this._toolUIs[toolName].mount(domToolGroup);
            this._toolUIs[toolName].disabled(true);
            _results1.push(this._toolUIs[toolName].addEventListener('applied', (function(_this) {
              return function() {
                return _this.updateTools();
              };
            })(this)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ToolboxUI.prototype.updateTools = function() {
      var element, name, selection, toolUI, _ref, _results;
      element = ContentEdit.Root.get().focused();
      selection = null;
      if (element && element.selection) {
        selection = element.selection();
      }
      _ref = this._toolUIs;
      _results = [];
      for (name in _ref) {
        toolUI = _ref[name];
        _results.push(toolUI.update(element, selection));
      }
      return _results;
    };

    ToolboxUI.prototype.unmount = function() {
      ToolboxUI.__super__.unmount.call(this);
      return this._domGrip = null;
    };

    ToolboxUI.prototype._addDOMEventListeners = function() {
      this._domGrip.addEventListener('mousedown', this._onStartDragging);
      this._handleResize = (function(_this) {
        return function(ev) {
          var containResize;
          if (_this._resizeTimeout) {
            clearTimeout(_this._resizeTimeout);
          }
          containResize = function() {
            return _this._contain();
          };
          return _this._resizeTimeout = setTimeout(containResize, 250);
        };
      })(this);
      window.addEventListener('resize', this._handleResize);
      this._updateTools = (function(_this) {
        return function() {
          var app, element, name, selection, toolUI, update, _ref, _results;
          app = ContentTools.EditorApp.get();
          update = false;
          element = ContentEdit.Root.get().focused();
          selection = null;
          if (element === _this._lastUpdateElement) {
            if (element && element.selection) {
              selection = element.selection();
              if (_this._lastUpdateSelection) {
                if (!selection.eq(_this._lastUpdateSelection)) {
                  update = true;
                }
              } else {
                update = true;
              }
            }
          } else {
            update = true;
          }
          if (app.history) {
            if (_this._lastUpdateHistoryLength !== app.history.length()) {
              update = true;
            }
            _this._lastUpdateHistoryLength = app.history.length();
            if (_this._lastUpdateHistoryIndex !== app.history.index()) {
              update = true;
            }
            _this._lastUpdateHistoryIndex = app.history.index();
          }
          _this._lastUpdateElement = element;
          _this._lastUpdateSelection = selection;
          if (update) {
            _ref = _this._toolUIs;
            _results = [];
            for (name in _ref) {
              toolUI = _ref[name];
              _results.push(toolUI.update(element, selection));
            }
            return _results;
          }
        };
      })(this);
      this._updateToolsInterval = setInterval(this._updateTools, 100);
      this._handleKeyDown = (function(_this) {
        return function(ev) {
          var Paragraph, element, os, redo, undo, version;
          element = ContentEdit.Root.get().focused();
          if (element && !element.content) {
            if (ev.keyCode === 46) {
              ev.preventDefault();
              return ContentTools.Tools.Remove.apply(element, null, function() {});
            }
            if (ev.keyCode === 13) {
              ev.preventDefault();
              Paragraph = ContentTools.Tools.Paragraph;
              return Paragraph.apply(element, null, function() {});
            }
          }
          version = navigator.appVersion;
          os = 'linux';
          if (version.indexOf('Mac') !== -1) {
            os = 'mac';
          } else if (version.indexOf('Win') !== -1) {
            os = 'windows';
          }
          redo = false;
          undo = false;
          switch (os) {
            case 'linux':
              if (ev.keyCode === 90 && ev.ctrlKey) {
                redo = ev.shiftKey;
                undo = !redo;
              }
              break;
            case 'mac':
              if (ev.keyCode === 90 && ev.metaKey) {
                redo = ev.shiftKey;
                undo = !redo;
              }
              break;
            case 'windows':
              if (ev.keyCode === 89 && ev.ctrlKey) {
                redo = true;
              }
              if (ev.keyCode === 90 && ev.ctrlKey) {
                undo = true;
              }
          }
          if (undo && ContentTools.Tools.Undo.canApply(null, null)) {
            ContentTools.Tools.Undo.apply(null, null, function() {});
          }
          if (redo && ContentTools.Tools.Redo.canApply(null, null)) {
            return ContentTools.Tools.Redo.apply(null, null, function() {});
          }
        };
      })(this);
      return window.addEventListener('keydown', this._handleKeyDown);
    };

    ToolboxUI.prototype._contain = function() {
      var rect;
      if (!this.isMounted()) {
        return;
      }
      rect = this._domElement.getBoundingClientRect();
      if (rect.left + rect.width > window.innerWidth) {
        this._domElement.style.left = "" + (window.innerWidth - rect.width) + "px";
      }
      if (rect.top + rect.height > window.innerHeight) {
        this._domElement.style.top = "" + (window.innerHeight - rect.height) + "px";
      }
      if (rect.left < 0) {
        this._domElement.style.left = '0px';
      }
      if (rect.top < 0) {
        this._domElement.style.top = '0px';
      }
      rect = this._domElement.getBoundingClientRect();
      return window.localStorage.setItem('ct-toolbox-position', "" + rect.left + "," + rect.top);
    };

    ToolboxUI.prototype._removeDOMEventListeners = function() {
      if (this.isMounted()) {
        this._domGrip.removeEventListener('mousedown', this._onStartDragging);
      }
      window.removeEventListener('keydown', this._handleKeyDown);
      window.removeEventListener('resize', this._handleResize);
      return clearInterval(this._updateToolsInterval);
    };

    ToolboxUI.prototype._onDrag = function(ev) {
      ContentSelect.Range.unselectAll();
      this._domElement.style.left = "" + (ev.clientX - this._draggingOffset.x) + "px";
      return this._domElement.style.top = "" + (ev.clientY - this._draggingOffset.y) + "px";
    };

    ToolboxUI.prototype._onStartDragging = function(ev) {
      var rect;
      ev.preventDefault();
      if (this.isDragging()) {
        return;
      }
      this._dragging = true;
      this.addCSSClass('ct-toolbox--dragging');
      rect = this._domElement.getBoundingClientRect();
      this._draggingOffset = {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
      };
      document.addEventListener('mousemove', this._onDrag);
      document.addEventListener('mouseup', this._onStopDragging);
      return ContentEdit.addCSSClass(document.body, 'ce--dragging');
    };

    ToolboxUI.prototype._onStopDragging = function(ev) {
      if (!this.isDragging()) {
        return;
      }
      this._contain();
      document.removeEventListener('mousemove', this._onDrag);
      document.removeEventListener('mouseup', this._onStopDragging);
      this._draggingOffset = null;
      this._dragging = false;
      this.removeCSSClass('ct-toolbox--dragging');
      return ContentEdit.removeCSSClass(document.body, 'ce--dragging');
    };

    return ToolboxUI;

  })(ContentTools.WidgetUI);

  ContentTools.ToolUI = (function(_super) {
    __extends(ToolUI, _super);

    function ToolUI(tool) {
      this._onMouseUp = __bind(this._onMouseUp, this);
      this._onMouseLeave = __bind(this._onMouseLeave, this);
      this._onMouseDown = __bind(this._onMouseDown, this);
      this._addDOMEventListeners = __bind(this._addDOMEventListeners, this);
      ToolUI.__super__.constructor.call(this);
      this.tool = tool;
      this._mouseDown = false;
      this._disabled = false;
    }

    ToolUI.prototype.apply = function(element, selection) {
      // console.log('ToolUI.prototype.apply = function(element, selection) {');

      var callback, detail;
      if (!this.tool.canApply(element, selection)) {
        return;
      }
      detail = {
        'element': element,
        'selection': selection
      };
      callback = (function(_this) {
        return function(applied) {
          if (applied) {

            // console.log('applied');

            return _this.dispatchEvent(_this.createEvent('applied', detail));
          }
        };
      })(this);
      if (this.dispatchEvent(this.createEvent('apply', detail))) {
        return this.tool.apply(element, selection, callback);
      }
    };

    ToolUI.prototype.disabled = function(disabledState) {
      if (disabledState === void 0) {
        return this._disabled;
      }
      if (this._disabled === disabledState) {
        return;
      }
      this._disabled = disabledState;
      if (disabledState) {
        this._mouseDown = false;
        this.addCSSClass('ct-tool--disabled');
        return this.removeCSSClass('ct-tool--applied');
      } else {
        return this.removeCSSClass('ct-tool--disabled');
      }
    };

    ToolUI.prototype.mount = function(domParent, before) {
      // **
      // console.log('ToolUI.prototype.mount');
      // console.log(this.tool);

      if (before == null) {
        before = null;
      }
      this._domElement = this.constructor.createDiv(['ct-tool', "ct-tool--" + this.tool.toolName]);
      this._domElement.setAttribute('data-ct-tooltip', ContentEdit._(this.tool.label));

      if(this.tool.icon!=''){
        this._domElement.innerHTML='<i class="fa '+this.tool.icon+'"></i>';
      }


      return ToolUI.__super__.mount.call(this, domParent, before);
    };

    ToolUI.prototype.update = function(element, selection) {
      // console.log('ToolUI.prototype.update');

        // console.log(element);

      if (this.tool.requiresElement) {
        if (!(element && element.isMounted())) {
          this.disabled(true);
          return;
        }
      }

      if (this.tool.canApply(element, selection)) {
        // console.log('disabled');
        this.disabled(false);
      } else {
        // console.log('enabled');
        this.disabled(true);
        return;
      }

      if (this.tool.isApplied(element, selection)) {
        return this.addCSSClass('ct-tool--applied');
      } else {
        return this.removeCSSClass('ct-tool--applied');
      }
    };

    ToolUI.prototype._addDOMEventListeners = function() {
      this._domElement.addEventListener('mousedown', this._onMouseDown);
      this._domElement.addEventListener('mouseleave', this._onMouseLeave);
      return this._domElement.addEventListener('mouseup', this._onMouseUp);
    };

    ToolUI.prototype._onMouseDown = function(ev) {
      ev.preventDefault();
      if (this.disabled()) {
        return;
      }
      this._mouseDown = true;
      return this.addCSSClass('ct-tool--down');
    };

    ToolUI.prototype._onMouseLeave = function(ev) {
      this._mouseDown = false;
      return this.removeCSSClass('ct-tool--down');
    };

    ToolUI.prototype._onMouseUp = function(ev) {
      // console.log('ToolUI.prototype._onMouseUp');

      var element, selection;
      if (this._mouseDown) {
        element = ContentEdit.Root.get().focused();
        if (this.tool.requiresElement) {
          if (!(element && element.isMounted())) {
            return;
          }
        }
        selection = null;
        if (element && element.selection) {
          selection = element.selection();
        }
        this.apply(element, selection);
      }
      this._mouseDown = false;
      return this.removeCSSClass('ct-tool--down');
    };

    return ToolUI;

  })(ContentTools.AnchoredComponentUI);

  ContentTools.AnchoredDialogUI = (function(_super) {
    __extends(AnchoredDialogUI, _super);

    function AnchoredDialogUI() {
      AnchoredDialogUI.__super__.constructor.call(this);
      this._position = [0, 0];
    }

    AnchoredDialogUI.prototype.mount = function() {
      this._domElement = this.constructor.createDiv(['ct-widget', 'ct-anchored-dialog']);
      this.parent().domElement().appendChild(this._domElement);
      this._domElement.style.top = "" + this._position[1] + "px";
      return this._domElement.style.left = "" + this._position[0] + "px";
    };

    AnchoredDialogUI.prototype.position = function(newPosition) {
      if (newPosition === void 0) {
        return this._position.slice();
      }
      this._position = newPosition.slice();
      if (this.isMounted()) {
        this._domElement.style.top = "" + this._position[1] + "px";
        return this._domElement.style.left = "" + this._position[0] + "px";
      }
    };

    return AnchoredDialogUI;

  })(ContentTools.WidgetUI);

  ContentTools.DialogUI = (function(_super) {
    __extends(DialogUI, _super);

    function DialogUI(caption) {
      if (caption == null) {
        caption = '';
      }
      DialogUI.__super__.constructor.call(this);
      this._busy = false;
      this._caption = caption;
    }

    DialogUI.prototype.busy = function(busy) {
      if (busy === void 0) {
        return this._busy;
      }
      if (this._busy === busy) {
        return;
      }
      this._busy = busy;
      if (!this.isMounted()) {
        return;
      }
      if (this._busy) {
        return ContentEdit.addCSSClass(this._domElement, 'ct-dialog--busy');
      } else {
        return ContentEdit.removeCSSClass(this._domElement, 'ct-dialog--busy');
      }
    };

    DialogUI.prototype.caption = function(caption) {
      if (caption === void 0) {
        return this._caption;
      }
      this._caption = caption;
      return this._domCaption.textContent = ContentEdit._(caption);
    };

    DialogUI.prototype.mount = function() {
      var dialogCSSClasses;
      if (document.activeElement) {
        document.activeElement.blur();
        window.getSelection().removeAllRanges();
      }
      dialogCSSClasses = ['ct-widget', 'ct-dialog'];
      if (this._busy) {
        dialogCSSClasses.push('ct-dialog--busy');
      }
      this._domElement = this.constructor.createDiv(dialogCSSClasses);
      this.parent().domElement().appendChild(this._domElement);
      this._domHeader = this.constructor.createDiv(['ct-dialog__header']);
      this._domElement.appendChild(this._domHeader);
      this._domCaption = this.constructor.createDiv(['ct-dialog__caption']);
      this._domHeader.appendChild(this._domCaption);
      this.caption(this._caption);
      this._domClose = this.constructor.createDiv(['ct-dialog__close']);
      this._domHeader.appendChild(this._domClose);
      this._domBody = this.constructor.createDiv(['ct-dialog__body']);
      this._domElement.appendChild(this._domBody);
      this._domView = this.constructor.createDiv(['ct-dialog__view']);
      this._domBody.appendChild(this._domView);
      this._domControls = this.constructor.createDiv(['ct-dialog__controls']);
      this._domElement.appendChild(this._domControls);
      this._domBusy = this.constructor.createDiv(['ct-dialog__busy']);
      this._domElement.appendChild(this._domBusy);

      return true;
    };

    DialogUI.prototype.unmount = function() {
      DialogUI.__super__.unmount.call(this);
      this._domBusy = null;
      this._domCaption = null;
      this._domClose = null;
      this._domControls = null;
      return this._domView = null;
    };

    DialogUI.prototype._addDOMEventListeners = function() {
      this._handleEscape = (function(_this) {
        return function(ev) {
          if (_this._busy) {
            return;
          }
          if (ev.keyCode === 27) {
            return _this.dispatchEvent(_this.createEvent('cancel'));
          }
        };
      })(this);
      document.addEventListener('keyup', this._handleEscape);
      return this._domClose.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          if (_this._busy) {
            return;
          }
          return _this.dispatchEvent(_this.createEvent('cancel'));
        };
      })(this));
    };

    DialogUI.prototype._removeDOMEventListeners = function() {
      return document.removeEventListener('keyup', this._handleEscape);
    };

    return DialogUI;

  })(ContentTools.WidgetUI);



  ContentTools.LinkDialog = (function(_super) {
    var NEW_WINDOW_TARGET;

    __extends(LinkDialog, _super);

    NEW_WINDOW_TARGET = '_blank';

    function LinkDialog(href, target) {
      if (href == null) {
        href = '';
      }
      if (target == null) {
        target = '';
      }
      LinkDialog.__super__.constructor.call(this);
      this._href = href;
      this._target = target;
    }

    LinkDialog.prototype.mount = function() {
      LinkDialog.__super__.mount.call(this);
      this._domInput = document.createElement('input');
      this._domInput.setAttribute('class', 'ct-anchored-dialog__input');
      this._domInput.setAttribute('name', 'href');
      this._domInput.setAttribute('placeholder', ContentEdit._('Enter a link') + '...');
      this._domInput.setAttribute('type', 'text');
      this._domInput.setAttribute('value', this._href);
      this._domElement.appendChild(this._domInput);
      this._domTargetButton = this.constructor.createDiv(['ct-anchored-dialog__target-button']);
      this._domElement.appendChild(this._domTargetButton);
      if (this._target === NEW_WINDOW_TARGET) {
        ContentEdit.addCSSClass(this._domTargetButton, 'ct-anchored-dialog__target-button--active');
      }
      this._domButton = this.constructor.createDiv(['ct-anchored-dialog__button']);
      this._domElement.appendChild(this._domButton);
      return this._addDOMEventListeners();
    };

    LinkDialog.prototype.save = function() {
      var detail;
      if (!this.isMounted()) {
        this.dispatchEvent(this.createEvent('save'));
        return;
      }
      detail = {
        href: this._domInput.value.trim()
      };
      if (this._target) {
        detail.target = this._target;
        detail.class = 'link-out';
      }
      return this.dispatchEvent(this.createEvent('save', detail));
    };

    LinkDialog.prototype.show = function() {
      LinkDialog.__super__.show.call(this);
      this._domInput.focus();
      if (this._href) {
        return this._domInput.select();
      }
    };

    LinkDialog.prototype.unmount = function() {
      if (this.isMounted()) {
        this._domInput.blur();
      }
      LinkDialog.__super__.unmount.call(this);
      this._domButton = null;
      return this._domInput = null;
    };

    LinkDialog.prototype._addDOMEventListeners = function() {
      this._domInput.addEventListener('keypress', (function(_this) {
        return function(ev) {
          if (ev.keyCode === 13) {
            return _this.save();
          }
        };
      })(this));
      this._domTargetButton.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          if (_this._target === NEW_WINDOW_TARGET) {
            _this._target = '';
            return ContentEdit.removeCSSClass(_this._domTargetButton, 'ct-anchored-dialog__target-button--active');
          } else {
            _this._target = NEW_WINDOW_TARGET;
            return ContentEdit.addCSSClass(_this._domTargetButton, 'ct-anchored-dialog__target-button--active');
          }
        };
      })(this));
      return this._domButton.addEventListener('click', (function(_this) {
        return function(ev) {
          ev.preventDefault();
          return _this.save();
        };
      })(this));
    };

    return LinkDialog;

  })(ContentTools.AnchoredDialogUI);


  ContentTools.PropertiesDialog = (function(_super) {
    __extends(PropertiesDialog, _super);

    function PropertiesDialog(element) {
      var _ref;
      this.element = element;
      PropertiesDialog.__super__.constructor.call(this, 'Properties');
      this._attributeUIs = [];
      this._focusedAttributeUI = null;
      this._styleUIs = [];
      this._supportsCoding = this.element.content;
      if ((_ref = this.element.type()) === 'ListItem' || _ref === 'TableCell') {
        this._supportsCoding = true;
      }
    }

    PropertiesDialog.prototype.caption = function(caption) {
      //**
      if (caption === void 0) {
        return this._caption;
      }
      this._caption = caption;
      return this._domCaption.textContent = this.element.label();
    };

    PropertiesDialog.prototype.changedAttributes = function() {
      var attributeUI, attributes, changedAttributes, name, restricted, value, _i, _len, _ref, _ref1;
      attributes = {};
      changedAttributes = {};
      _ref = this._attributeUIs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attributeUI = _ref[_i];
        name = attributeUI.name();
        value = attributeUI.value();
        if (name === '') {
          continue;
        }
        attributes[name.toLowerCase()] = true;
        if (this.element.attr(name) !== value) {
          changedAttributes[name] = value;
        }
      }
      restricted = ContentTools.getRestrictedAtributes(this.element.tagName());
      _ref1 = this.element.attributes();
      for (name in _ref1) {
        value = _ref1[name];
        if (restricted && restricted.indexOf(name.toLowerCase()) !== -1) {
          continue;
        }
        if (attributes[name] === void 0) {
          changedAttributes[name] = null;
        }
      }
      return changedAttributes;
    };

    PropertiesDialog.prototype.changedStyles = function() {
      var cssClass, styleUI, styles, _i, _len, _ref;
      styles = {};
      _ref = this._styleUIs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        styleUI = _ref[_i];
        cssClass = styleUI.style.cssClass();
        if (this.element.hasCSSClass(cssClass) !== styleUI.applied()) {
          styles[cssClass] = styleUI.applied();
        }
      }
      return styles;
    };

    PropertiesDialog.prototype.getElementInnerHTML = function() {
      if (!this._supportsCoding) {
        return null;
      }
      if (this.element.content) {
        return this.element.content.html();
      }
      return this.element.children[0].content.html();
    };

    PropertiesDialog.prototype.mount = function() {
      var attributeNames, attributes, domActions, domTabs, lastTab, name, restricted, style, styleUI, value, _i, _j, _len, _len1, _ref;
      PropertiesDialog.__super__.mount.call(this);
      ContentEdit.addCSSClass(this._domElement, 'ct-properties-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-properties-dialog__view');
      this._domStyles = this.constructor.createDiv(['ct-properties-dialog__styles']);
      this._domStyles.setAttribute('data-ct-empty', ContentEdit._('No styles available for this tag'));
      this._domView.appendChild(this._domStyles);
      _ref = ContentTools.StylePalette.styles(this.element);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        style = _ref[_i];
        styleUI = new StyleUI(style, this.element.hasCSSClass(style.cssClass()));
        this._styleUIs.push(styleUI);
        styleUI.mount(this._domStyles);
      }
      this._domAttributes = this.constructor.createDiv(['ct-properties-dialog__attributes']);
      this._domView.appendChild(this._domAttributes);
      restricted = ContentTools.getRestrictedAtributes(this.element.tagName());
      attributes = this.element.attributes();
      attributeNames = [];
      for (name in attributes) {
        value = attributes[name];
        if (restricted && restricted.indexOf(name.toLowerCase()) !== -1) {
          continue;
        }
        attributeNames.push(name);
      }
      attributeNames.sort();
      for (_j = 0, _len1 = attributeNames.length; _j < _len1; _j++) {
        name = attributeNames[_j];
        value = attributes[name];
        this._addAttributeUI(name, value);
      }
      this._addAttributeUI('', '');
      this._domCode = this.constructor.createDiv(['ct-properties-dialog__code']);
      this._domView.appendChild(this._domCode);
      this._domInnerHTML = document.createElement('textarea');
      this._domInnerHTML.setAttribute('class', 'ct-properties-dialog__inner-html');
      this._domInnerHTML.setAttribute('name', 'code');
      this._domInnerHTML.value = this.getElementInnerHTML();
      this._domCode.appendChild(this._domInnerHTML);
      domTabs = this.constructor.createDiv(['ct-control-group', 'ct-control-group--left']);
      this._domControls.appendChild(domTabs);
      this._domStylesTab = this.constructor.createDiv(['ct-control', 'ct-control--icon', 'ct-control--styles']);
      this._domStylesTab.setAttribute('data-ct-tooltip', ContentEdit._('Styles'));
      domTabs.appendChild(this._domStylesTab);
      this._domAttributesTab = this.constructor.createDiv(['ct-control', 'ct-control--icon', 'ct-control--attributes']);
      this._domAttributesTab.setAttribute('data-ct-tooltip', ContentEdit._('Attributes'));
      domTabs.appendChild(this._domAttributesTab);
      this._domCodeTab = this.constructor.createDiv(['ct-control', 'ct-control--icon', 'ct-control--code']);
      this._domCodeTab.setAttribute('data-ct-tooltip', ContentEdit._('Code'));
      domTabs.appendChild(this._domCodeTab);
      if (!this._supportsCoding) {
        ContentEdit.addCSSClass(this._domCodeTab, 'ct-control--muted');
      }
      this._domRemoveAttribute = this.constructor.createDiv(['ct-control', 'ct-control--icon', 'ct-control--remove', 'ct-control--muted']);
      this._domRemoveAttribute.setAttribute('data-ct-tooltip', ContentEdit._('Remove'));
      domTabs.appendChild(this._domRemoveAttribute);
      domActions = this.constructor.createDiv(['ct-control-group', 'ct-control-group--right']);
      this._domControls.appendChild(domActions);
      this._domApply = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--apply']);
      this._domApply.textContent = ContentEdit._('Apply');
      domActions.appendChild(this._domApply);
      lastTab = window.localStorage.getItem('ct-properties-dialog-tab');
      if (lastTab === 'attributes') {
        ContentEdit.addCSSClass(this._domElement, 'ct-properties-dialog--attributes');
        ContentEdit.addCSSClass(this._domAttributesTab, 'ct-control--active');
      } else if (lastTab === 'code' && this._supportsCoding) {
        ContentEdit.addCSSClass(this._domElement, 'ct-properties-dialog--code');
        ContentEdit.addCSSClass(this._domCodeTab, 'ct-control--active');
      } else {
        ContentEdit.addCSSClass(this._domElement, 'ct-properties-dialog--styles');
        ContentEdit.addCSSClass(this._domStylesTab, 'ct-control--active');
      }
      return this._addDOMEventListeners();
    };

    PropertiesDialog.prototype.save = function() {
      var detail, innerHTML;
      innerHTML = null;
      if (this._supportsCoding) {
        innerHTML = this._domInnerHTML.value;
      }
      detail = {
        changedAttributes: this.changedAttributes(),
        changedStyles: this.changedStyles(),
        innerHTML: innerHTML
      };
      return this.dispatchEvent(this.createEvent('save', detail));
    };

    PropertiesDialog.prototype._addAttributeUI = function(name, value) {
      var attributeUI, dialog;
      dialog = this;
      attributeUI = new AttributeUI(name, value);
      this._attributeUIs.push(attributeUI);
      attributeUI.addEventListener('blur', function(ev) {
        var index, lastAttributeUI, length;
        dialog._focusedAttributeUI = null;
        ContentEdit.addCSSClass(dialog._domRemoveAttribute, 'ct-control--muted');
        index = dialog._attributeUIs.indexOf(this);
        length = dialog._attributeUIs.length;
        if (this.name() === '' && index < (length - 1)) {
          this.unmount();
          dialog._attributeUIs.splice(index, 1);
        }
        lastAttributeUI = dialog._attributeUIs[length - 1];
        if (lastAttributeUI) {
          if (lastAttributeUI.name() && lastAttributeUI.value()) {
            return dialog._addAttributeUI('', '');
          }
        }
      });
      attributeUI.addEventListener('focus', function(ev) {
        dialog._focusedAttributeUI = this;
        return ContentEdit.removeCSSClass(dialog._domRemoveAttribute, 'ct-control--muted');
      });
      attributeUI.addEventListener('namechange', function(ev) {
        var element, otherAttributeUI, restricted, valid, _i, _len, _ref;
        element = dialog.element;
        name = this.name().toLowerCase();
        restricted = ContentTools.getRestrictedAtributes(element.tagName());
        valid = true;
        if (restricted && restricted.indexOf(name) !== -1) {
          valid = false;
        }
        _ref = dialog._attributeUIs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          otherAttributeUI = _ref[_i];
          if (name === '') {
            continue;
          }
          if (otherAttributeUI === this) {
            continue;
          }
          if (otherAttributeUI.name().toLowerCase() !== name) {
            continue;
          }
          valid = false;
        }
        this.valid(valid);
        if (valid) {
          return ContentEdit.removeCSSClass(dialog._domApply, 'ct-control--muted');
        } else {
          return ContentEdit.addCSSClass(dialog._domApply, 'ct-control--muted');
        }
      });
      attributeUI.mount(this._domAttributes);
      return attributeUI;
    };

    PropertiesDialog.prototype._addDOMEventListeners = function() {
      var selectTab, validateCode;
      PropertiesDialog.__super__._addDOMEventListeners.call(this);
      selectTab = (function(_this) {
        return function(selected) {
          var selectedCap, tab, tabCap, tabs, _i, _len;
          tabs = ['attributes', 'code', 'styles'];
          for (_i = 0, _len = tabs.length; _i < _len; _i++) {
            tab = tabs[_i];
            if (tab === selected) {
              continue;
            }
            tabCap = tab.charAt(0).toUpperCase() + tab.slice(1);
            ContentEdit.removeCSSClass(_this._domElement, "ct-properties-dialog--" + tab);
            ContentEdit.removeCSSClass(_this["_dom" + tabCap + "Tab"], 'ct-control--active');
          }
          selectedCap = selected.charAt(0).toUpperCase() + selected.slice(1);
          ContentEdit.addCSSClass(_this._domElement, "ct-properties-dialog--" + selected);
          ContentEdit.addCSSClass(_this["_dom" + selectedCap + "Tab"], 'ct-control--active');
          return window.localStorage.setItem('ct-properties-dialog-tab', selected);
        };
      })(this);
      this._domStylesTab.addEventListener('mousedown', (function(_this) {
        return function() {
          return selectTab('styles');
        };
      })(this));
      this._domAttributesTab.addEventListener('mousedown', (function(_this) {
        return function() {
          return selectTab('attributes');
        };
      })(this));
      if (this._supportsCoding) {
        this._domCodeTab.addEventListener('mousedown', (function(_this) {
          return function() {
            return selectTab('code');
          };
        })(this));
      }
      this._domRemoveAttribute.addEventListener('mousedown', (function(_this) {
        return function(ev) {
          var index, last;
          ev.preventDefault();
          if (_this._focusedAttributeUI) {
            index = _this._attributeUIs.indexOf(_this._focusedAttributeUI);
            last = index === (_this._attributeUIs.length - 1);
            _this._focusedAttributeUI.unmount();
            _this._attributeUIs.splice(index, 1);
            if (last) {
              return _this._addAttributeUI('', '');
            }
          }
        };
      })(this));
      validateCode = (function(_this) {
        return function(ev) {
          var content;
          try {
            content = new HTMLString.String(_this._domInnerHTML.value);
            ContentEdit.removeCSSClass(_this._domInnerHTML, 'ct-properties-dialog__inner-html--invalid');
            return ContentEdit.removeCSSClass(_this._domApply, 'ct-control--muted');
          } catch (_error) {
            ContentEdit.addCSSClass(_this._domInnerHTML, 'ct-properties-dialog__inner-html--invalid');
            return ContentEdit.addCSSClass(_this._domApply, 'ct-control--muted');
          }
        };
      })(this);
      this._domInnerHTML.addEventListener('input', validateCode);
      this._domInnerHTML.addEventListener('propertychange', validateCode);
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

    return PropertiesDialog;

  })(ContentTools.DialogUI);

  StyleUI = (function(_super) {
    __extends(StyleUI, _super);

    function StyleUI(style, applied) {
      this.style = style;
      StyleUI.__super__.constructor.call(this);
      this._applied = applied;
    }

    StyleUI.prototype.applied = function(applied) {
      if (applied === void 0) {
        return this._applied;
      }
      if (this._applied === applied) {
        return;
      }
      this._applied = applied;
      if (this._applied) {
        return ContentEdit.addCSSClass(this._domElement, 'ct-section--applied');
      } else {
        return ContentEdit.removeCSSClass(this._domElement, 'ct-section--applied');
      }
    };

    StyleUI.prototype.mount = function(domParent, before) {
      var label;
      if (before == null) {
        before = null;
      }
      this._domElement = this.constructor.createDiv(['ct-section']);
      if (this._applied) {
        ContentEdit.addCSSClass(this._domElement, 'ct-section--applied');
      }
      label = this.constructor.createDiv(['ct-section__label']);
      label.textContent = this.style.name();
      this._domElement.appendChild(label);
      this._domElement.appendChild(this.constructor.createDiv(['ct-section__switch']));
      return StyleUI.__super__.mount.call(this, domParent, before);
    };

    StyleUI.prototype._addDOMEventListeners = function() {
      var toggleSection;
      toggleSection = (function(_this) {
        return function(ev) {
          ev.preventDefault();
          if (_this.applied()) {
            return _this.applied(false);
          } else {
            return _this.applied(true);
          }
        };
      })(this);
      return this._domElement.addEventListener('click', toggleSection);
    };

    return StyleUI;

  })(ContentTools.AnchoredComponentUI);

  AttributeUI = (function(_super) {
    __extends(AttributeUI, _super);

    function AttributeUI(name, value) {
      AttributeUI.__super__.constructor.call(this);
      this._initialName = name;
      this._initialValue = value;
    }

    AttributeUI.prototype.name = function() {
      return this._domName.value.trim();
    };

    AttributeUI.prototype.value = function() {
      return this._domValue.value.trim();
    };

    AttributeUI.prototype.mount = function(domParent, before) {
      if (before == null) {
        before = null;
      }
      this._domElement = this.constructor.createDiv(['ct-attribute']);
      this._domName = document.createElement('input');
      this._domName.setAttribute('class', 'ct-attribute__name');
      this._domName.setAttribute('name', 'name');
      this._domName.setAttribute('placeholder', ContentEdit._('Name'));
      this._domName.setAttribute('type', 'text');
      this._domName.setAttribute('value', this._initialName);
      this._domElement.appendChild(this._domName);
      this._domValue = document.createElement('input');
      this._domValue.setAttribute('class', 'ct-attribute__value');
      this._domValue.setAttribute('name', 'value');
      this._domValue.setAttribute('placeholder', ContentEdit._('Value'));
      this._domValue.setAttribute('type', 'text');
      this._domValue.setAttribute('value', this._initialValue);
      this._domElement.appendChild(this._domValue);
      return AttributeUI.__super__.mount.call(this, domParent, before);
    };

    AttributeUI.prototype.valid = function(valid) {
      if (valid) {
        return ContentEdit.removeCSSClass(this._domName, 'ct-attribute__name--invalid');
      } else {
        return ContentEdit.addCSSClass(this._domName, 'ct-attribute__name--invalid');
      }
    };

    AttributeUI.prototype._addDOMEventListeners = function() {
      this._domName.addEventListener('blur', (function(_this) {
        return function() {
          var name, nextDomAttribute, nextNameDom;
          name = _this.name();
          nextDomAttribute = _this._domElement.nextSibling;
          _this.dispatchEvent(_this.createEvent('blur'));
          if (name === '' && nextDomAttribute) {
            nextNameDom = nextDomAttribute.querySelector('.ct-attribute__name');
            return nextNameDom.focus();
          }
        };
      })(this));
      this._domName.addEventListener('focus', (function(_this) {
        return function() {
          return _this.dispatchEvent(_this.createEvent('focus'));
        };
      })(this));
      this._domName.addEventListener('input', (function(_this) {
        return function() {
          return _this.dispatchEvent(_this.createEvent('namechange'));
        };
      })(this));
      this._domName.addEventListener('keydown', (function(_this) {
        return function(ev) {
          if (ev.keyCode === 13) {
            return _this._domValue.focus();
          }
        };
      })(this));
      this._domValue.addEventListener('blur', (function(_this) {
        return function() {
          return _this.dispatchEvent(_this.createEvent('blur'));
        };
      })(this));
      this._domValue.addEventListener('focus', (function(_this) {
        return function() {
          return _this.dispatchEvent(_this.createEvent('focus'));
        };
      })(this));
      return this._domValue.addEventListener('keydown', (function(_this) {
        return function(ev) {
          var nextDomAttribute, nextNameDom;
          if (ev.keyCode !== 13 && (ev.keyCode !== 9 || ev.shiftKey)) {
            return;
          }
          ev.preventDefault();
          nextDomAttribute = _this._domElement.nextSibling;
          if (!nextDomAttribute) {
            _this._domValue.blur();
            nextDomAttribute = _this._domElement.nextSibling;
          }
          if (nextDomAttribute) {
            nextNameDom = nextDomAttribute.querySelector('.ct-attribute__name');
            return nextNameDom.focus();
          }
        };
      })(this));
    };

    return AttributeUI;

  })(ContentTools.AnchoredComponentUI);


  ContentTools.VideoDialog = (function(_super) {
    __extends(VideoDialog, _super);

    function VideoDialog() {
      VideoDialog.__super__.constructor.call(this, 'Insert video');
    }

    VideoDialog.prototype.clearPreview = function() {
      if (this._domPreview) {
        this._domPreview.parentNode.removeChild(this._domPreview);
        return this._domPreview = void 0;
      }
    };

    VideoDialog.prototype.mount = function() {
      var domControlGroup;
      VideoDialog.__super__.mount.call(this);
      ContentEdit.addCSSClass(this._domElement, 'ct-video-dialog');
      ContentEdit.addCSSClass(this._domView, 'ct-video-dialog__preview');
      domControlGroup = this.constructor.createDiv(['ct-control-group']);
      this._domControls.appendChild(domControlGroup);
      this._domInput = document.createElement('input');
      this._domInput.setAttribute('class', 'ct-video-dialog__input');
      this._domInput.setAttribute('name', 'url');
      this._domInput.setAttribute('placeholder', ContentEdit._('Paste YouTube or Vimeo URL') + '...');
      this._domInput.setAttribute('type', 'text');
      domControlGroup.appendChild(this._domInput);
      this._domButton = this.constructor.createDiv(['ct-control', 'ct-control--text', 'ct-control--insert', 'ct-control--muted']);
      this._domButton.textContent = ContentEdit._('Insert');
      domControlGroup.appendChild(this._domButton);
      return this._addDOMEventListeners();
    };

    VideoDialog.prototype.preview = function(url) {
      this.clearPreview();
      this._domPreview = document.createElement('iframe');
      this._domPreview.setAttribute('frameborder', '0');
      this._domPreview.setAttribute('height', '100%');
      this._domPreview.setAttribute('src', url);
      this._domPreview.setAttribute('width', '100%');
      return this._domView.appendChild(this._domPreview);
    };

    VideoDialog.prototype.save = function() {
      var embedURL, videoURL;
      videoURL = this._domInput.value.trim();
      embedURL = ContentTools.getEmbedVideoURL(videoURL);
      if (embedURL) {
        return this.dispatchEvent(this.createEvent('save', {
          'url': embedURL
        }));
      } else {
        return this.dispatchEvent(this.createEvent('save', {
          'url': videoURL
        }));
      }
    };

    VideoDialog.prototype.show = function() {
      VideoDialog.__super__.show.call(this);
      return this._domInput.focus();
    };

    VideoDialog.prototype.unmount = function() {
      if (this.isMounted()) {
        this._domInput.blur();
      }
      VideoDialog.__super__.unmount.call(this);
      this._domButton = null;
      this._domInput = null;
      return this._domPreview = null;
    };

    VideoDialog.prototype._addDOMEventListeners = function() {
      VideoDialog.__super__._addDOMEventListeners.call(this);
      this._domInput.addEventListener('input', (function(_this) {
        return function(ev) {
          var updatePreview;
          if (ev.target.value) {
            ContentEdit.removeCSSClass(_this._domButton, 'ct-control--muted');
          } else {
            ContentEdit.addCSSClass(_this._domButton, 'ct-control--muted');
          }
          if (_this._updatePreviewTimeout) {
            clearTimeout(_this._updatePreviewTimeout);
          }
          updatePreview = function() {
            var embedURL, videoURL;
            videoURL = _this._domInput.value.trim();
            embedURL = ContentTools.getEmbedVideoURL(videoURL);
            if (embedURL) {
              return _this.preview(embedURL);
            } else {
              return _this.clearPreview();
            }
          };
          return _this._updatePreviewTimeout = setTimeout(updatePreview, 500);
        };
      })(this));
      this._domInput.addEventListener('keypress', (function(_this) {
        return function(ev) {
          if (ev.keyCode === 13) {
            return _this.save();
          }
        };
      })(this));
      return this._domButton.addEventListener('click', (function(_this) {
        return function(ev) {
          var cssClass;
          ev.preventDefault();
          cssClass = _this._domButton.getAttribute('class');
          if (cssClass.indexOf('ct-control--muted') === -1) {
            return _this.save();
          }
        };
      })(this));
    };

    return VideoDialog;

  })(ContentTools.DialogUI);

  _EditorApp = (function(_super) {
    __extends(_EditorApp, _super);

    function _EditorApp() {
      _EditorApp.__super__.constructor.call(this);
      this.history = null;
      this._state = 'dormant';
      this._busy = false;
      this._namingProp = null;
      this._fixtureTest = function(domElement) {
        return domElement.hasAttribute('data-fixture');
      };
      this._regionQuery = null;
      this._domRegions = null;
      this._regions = {};
      this._orderedRegions = [];
      this._rootLastModified = null;
      this._regionsLastModified = {};
      this._ignition = null;
      this._inspector = null;
      this._toolbox = null;
      this._emptyRegionsAllowed = false;
    }

    _EditorApp.prototype.ctrlDown = function() {
      return this._ctrlDown;
    };

    _EditorApp.prototype.domRegions = function() {
      return this._domRegions;
    };

    _EditorApp.prototype.getState = function() {
      return this._state;
    };

    _EditorApp.prototype.ignition = function() {
      return this._ignition;
    };

    _EditorApp.prototype.inspector = function() {
      return this._inspector;
    };

    _EditorApp.prototype.isDormant = function() {
      return this._state === 'dormant';
    };

    _EditorApp.prototype.isReady = function() {
      return this._state === 'ready';
    };

    _EditorApp.prototype.isEditing = function() {
      return this._state === 'editing';
    };

    _EditorApp.prototype.orderedRegions = function() {
      var name;
      return (function() {
        var _i, _len, _ref, _results;
        _ref = this._orderedRegions;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _results.push(this._regions[name]);
        }
        return _results;
      }).call(this);
    };

    _EditorApp.prototype.regions = function() {
      return this._regions;
    };

    _EditorApp.prototype.shiftDown = function() {
      return this._shiftDown;
    };

    _EditorApp.prototype.toolbox = function() {
      return this._toolbox;
    };

    _EditorApp.prototype.busy = function(busy) {
      if (busy === void 0) {
        this._busy = busy;
      }
      this._busy = busy;
      if (this._ignition) {
        return this._ignition.busy(busy);
      }
    };

    _EditorApp.prototype.createPlaceholderElement = function(region) {
      return new ContentEdit.Text('p', {}, '');
    };

    _EditorApp.prototype.init = function(queryOrDOMElements, namingProp, fixtureTest, withIgnition) {
      if (namingProp == null) {
        namingProp = 'id';
      }
      if (fixtureTest == null) {
        fixtureTest = null;
      }
      if (withIgnition == null) {
        withIgnition = true;
      }
      this._namingProp = namingProp;
      if (fixtureTest) {
        this._fixtureTest = fixtureTest;
      }
      this.mount();
      if (withIgnition) {
        this._ignition = new ContentTools.IgnitionUI();
        this.attach(this._ignition);
        this._ignition.addEventListener('edit', (function(_this) {
          return function(ev) {
            ev.preventDefault();
            _this.start();
            return _this._ignition.state('editing');
          };
        })(this));
        this._ignition.addEventListener('confirm', (function(_this) {
          return function(ev) {
            ev.preventDefault();
            _this._ignition.state('ready');
            return _this.stop(true);
          };
        })(this));
        this._ignition.addEventListener('cancel', (function(_this) {
          return function(ev) {
            ev.preventDefault();
            _this.stop(false);
            if (_this.isEditing()) {
              return _this._ignition.state('editing');
            } else {
              return _this._ignition.state('ready');
            }
          };
        })(this));
      }
      this._toolbox = new ContentTools.ToolboxUI(ContentTools.DEFAULT_TOOLS);
      this.attach(this._toolbox);
      this._inspector = new ContentTools.InspectorUI();
      this.attach(this._inspector);
      this._state = 'ready';
      this._handleDetach = (function(_this) {
        return function(element) {
          return _this._preventEmptyRegions();
        };
      })(this);
      this._handleClipboardPaste = (function(_this) {
        return function(element, ev) {
          var clipboardData;
          clipboardData = null;
          if (ev.clipboardData) {
            clipboardData = ev.clipboardData.getData('text/plain');
          }
          if (window.clipboardData) {
            clipboardData = window.clipboardData.getData('TEXT');
          }
          return _this.paste(element, clipboardData);
        };
      })(this);
      this._handleNextRegionTransition = (function(_this) {
        return function(region) {
          var child, element, index, regions, _i, _len, _ref;
          regions = _this.orderedRegions();
          index = regions.indexOf(region);
          if (index >= (regions.length - 1)) {
            return;
          }
          region = regions[index + 1];
          element = null;
          _ref = region.descendants();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            if (child.content !== void 0) {
              element = child;
              break;
            }
          }
          if (element) {
            element.focus();
            element.selection(new ContentSelect.Range(0, 0));
            return;
          }
          return ContentEdit.Root.get().trigger('next-region', region);
        };
      })(this);
      this._handlePreviousRegionTransition = (function(_this) {
        return function(region) {
          var child, descendants, element, index, length, regions, _i, _len;
          regions = _this.orderedRegions();
          index = regions.indexOf(region);
          if (index <= 0) {
            return;
          }
          region = regions[index - 1];
          element = null;
          descendants = region.descendants();
          descendants.reverse();
          for (_i = 0, _len = descendants.length; _i < _len; _i++) {
            child = descendants[_i];
            if (child.content !== void 0) {
              element = child;
              break;
            }
          }
          if (element) {
            length = element.content.length();
            element.focus();
            element.selection(new ContentSelect.Range(length, length));
            return;
          }
          return ContentEdit.Root.get().trigger('previous-region', region);
        };
      })(this);
      ContentEdit.Root.get().bind('detach', this._handleDetach);
      ContentEdit.Root.get().bind('paste', this._handleClipboardPaste);
      ContentEdit.Root.get().bind('next-region', this._handleNextRegionTransition);
      ContentEdit.Root.get().bind('previous-region', this._handlePreviousRegionTransition);
      return this.syncRegions(queryOrDOMElements);
    };

    _EditorApp.prototype.destroy = function() {
      ContentEdit.Root.get().unbind('detach', this._handleDetach);
      ContentEdit.Root.get().unbind('paste', this._handleClipboardPaste);
      ContentEdit.Root.get().unbind('next-region', this._handleNextRegionTransition);
      ContentEdit.Root.get().unbind('previous-region', this._handlePreviousRegionTransition);
      return this.unmount();
    };

    _EditorApp.prototype.highlightRegions = function(highlight) {
      var domRegion, _i, _len, _ref, _results;
      _ref = this._domRegions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        domRegion = _ref[_i];
        if (highlight) {
          _results.push(ContentEdit.addCSSClass(domRegion, 'ct--highlight'));
        } else {
          _results.push(ContentEdit.removeCSSClass(domRegion, 'ct--highlight'));
        }
      }
      return _results;
    };

    _EditorApp.prototype.mount = function() {
      this._domElement = this.constructor.createDiv(['ct-app']);
      document.body.insertBefore(this._domElement, null);
      return this._addDOMEventListeners();
    };

    _EditorApp.prototype.paste = function(element, clipboardData) {
      var character, content, cursor, encodeHTML, i, insertAt, insertIn, insertNode, item, itemText, lastItem, line, lineLength, lines, replaced, selection, spawn, tags, tail, tip, type, _i, _len;
      content = clipboardData;
      lines = content.split('\n');
      lines = lines.filter(function(line) {
        return line.trim() !== '';
      });
      if (!lines) {
        return;
      }
      encodeHTML = HTMLString.String.encode;
      spawn = true;
      type = element.type();
      if (lines.length === 1) {
        spawn = false;
      }
      if (type === 'PreText') {
        spawn = false;
      }
      if (!element.can('spawn')) {
        spawn = false;
      }
      if (spawn) {
        if (type === 'ListItemText') {
          insertNode = element.parent();
          insertIn = element.parent().parent();
          insertAt = insertIn.children.indexOf(insertNode) + 1;
        } else {
          insertNode = element;
          if (insertNode.parent().type() !== 'Region') {
            insertNode = element.closest(function(node) {
              return node.parent().type() === 'Region';
            });
          }
          insertIn = insertNode.parent();
          insertAt = insertIn.children.indexOf(insertNode) + 1;
        }
        for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
          line = lines[i];
          line = encodeHTML(line);
          if (type === 'ListItemText') {
            item = new ContentEdit.ListItem();
            itemText = new ContentEdit.ListItemText(line);
            item.attach(itemText);
            lastItem = itemText;
          } else {
            item = new ContentEdit.Text('p', {}, line);
            lastItem = item;
          }
          insertIn.attach(item, insertAt + i);
        }
        lineLength = lastItem.content.length();
        lastItem.focus();
        return lastItem.selection(new ContentSelect.Range(lineLength, lineLength));
      } else {
        content = encodeHTML(content);
        content = new HTMLString.String(content, type === 'PreText');
        selection = element.selection();
        cursor = selection.get()[0] + content.length();
        tip = element.content.substring(0, selection.get()[0]);
        tail = element.content.substring(selection.get()[1]);
        replaced = element.content.substring(selection.get()[0], selection.get()[1]);
        if (replaced.length()) {
          character = replaced.characters[0];
          tags = character.tags();
          if (character.isTag()) {
            tags.shift();
          }
          if (tags.length >= 1) {
            content = content.format.apply(content, [0, content.length()].concat(__slice.call(tags)));
          }
        }
        element.content = tip.concat(content);
        element.content = element.content.concat(tail, false);
        element.updateInnerHTML();
        element.taint();
        selection.set(cursor, cursor);
        return element.selection(selection);
      }
    };

    _EditorApp.prototype.unmount = function() {
      if (!this.isMounted()) {
        return;
      }
      this._domElement.parentNode.removeChild(this._domElement);
      this._domElement = null;
      this._removeDOMEventListeners();
      this._ignition = null;
      this._inspector = null;
      return this._toolbox = null;
    };

    _EditorApp.prototype.revert = function() {
      var confirmMessage;
      if (!this.dispatchEvent(this.createEvent('revert'))) {
        return;
      }
      confirmMessage = ContentEdit._('Your changes have not been saved, do you really want to lose them?');


      if (ContentEdit.Root.get().lastModified() > this._rootLastModified && !window.confirm(confirmMessage)) {
        return false;
      }
      this.revertToSnapshot(this.history.goTo(0), false);
      return true;
    };

    _EditorApp.prototype.revertToSnapshot = function(snapshot, restoreEditable) {
      var child, name, region, _i, _len, _ref, _ref1;
      if (restoreEditable == null) {
        restoreEditable = true;
      }
      _ref = this._regions;
      for (name in _ref) {
        region = _ref[name];
        _ref1 = region.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          child = _ref1[_i];
          child.unmount();
        }
        region.domElement().innerHTML = snapshot.regions[name];
      }
      if (restoreEditable) {
        if (ContentEdit.Root.get().focused()) {
          ContentEdit.Root.get().focused().blur();
        }
        this._regions = {};
        this.syncRegions();
        this.history.replaceRegions(this._regions);
        this.history.restoreSelection(snapshot);
        return this._inspector.updateTags();
      }
    };

    _EditorApp.prototype.save = function(passive) {
      // **
      console.log('_EditorApp.prototype.save');

      var child, html, modifiedRegions, name, region, root, _i, _len, _ref, _ref1;
      if (!this.dispatchEvent(this.createEvent('save', {
        passive: passive
      }))) {
        return;
      }

      root = ContentEdit.Root.get();
      if (root.lastModified() === this._rootLastModified && passive) {
        this.dispatchEvent(this.createEvent('saved', {
          regions: {},
          passive: passive
        }));
        return;
      }

      // this._regions['article-content'].children[10]._attributes['data-height']


      modifiedRegions = {};
      _ref = this._regions;
      for (name in _ref) {

        region = _ref[name];
        html = region.html();

        if (region.children.length === 1) {
          child = region.children[0];
          if (child.content && !child.content.html()) {
            html = '';
          }
        }

        if (!passive) {
          _ref1 = region.children;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            child = _ref1[_i];
           child.unmount();
          }
         region.domElement().innerHTML = html;
        }

        if (region.lastModified() === this._regionsLastModified[name]) {
          continue;
        }

        modifiedRegions[name] = html;

        this._regionsLastModified[name] = region.lastModified();
      }

      this.dispatchEvent(this.createEvent('saved', {
        regions: modifiedRegions,
        passive: passive
      }));

      return true;

      // return this.dispatchEvent(this.createEvent('saved', {
      //   regions: modifiedRegions,
      //   passive: passive
      // }));
    };

    _EditorApp.prototype.setRegionOrder = function(regionNames) {
      return this._orderedRegions = regionNames.slice();
    };

    _EditorApp.prototype.start = function() {
      if (!this.dispatchEvent(this.createEvent('start'))) {
        return;
      }
      this.busy(true);
      this.syncRegions();
      this._initRegions();
      this._preventEmptyRegions();
      this._rootLastModified = ContentEdit.Root.get().lastModified();
      this.history = new ContentTools.History(this._regions);
      this.history.watch();
      this._state = 'editing';
      this._toolbox.show();
      this._inspector.show();
      return this.busy(false);
    };

    _EditorApp.prototype.stop = function(save) {
      var focused;
      if (!this.dispatchEvent(this.createEvent('stop', {
        save: save
      }))) {
        return;
      }
      focused = ContentEdit.Root.get().focused();
      if (focused && focused.isMounted() && focused._syncContent !== void 0) {
        focused._syncContent();
      }
      if (save) {
        this.save();
      } else {
        if (!this.revert()) {
          return;
        }
      }
      this.history.stopWatching();
      this.history = null;
      this._toolbox.hide();
      this._inspector.hide();
      this._regions = {};
      this._state = 'ready';
      if (ContentEdit.Root.get().focused()) {
        this._allowEmptyRegions((function(_this) {
          return function() {
            return ContentEdit.Root.get().focused().blur();
          };
        })(this));
      }
    };

    _EditorApp.prototype.syncRegions = function(regionQuery) {
      if (regionQuery !== void 0) {
        this._regionQuery = regionQuery;
      }
      if (this._regionQuery.length > 0 && this._regionQuery[0].nodeType === Node.ELEMENT_NODE) {
        this._domRegions = this._regionQuery;
      } else {
        this._domRegions = document.querySelectorAll(this._regionQuery);
      }
      if (this._state === 'editing') {
        this._initRegions();
      }
      if (this._ignition) {
        if (this._domRegions.length) {
          return this._ignition.show();
        } else {
          return this._ignition.hide();
        }
      }
    };

    _EditorApp.prototype._addDOMEventListeners = function() {
      this._handleHighlightOn = (function(_this) {
        return function(ev) {
          var _ref;
          if ((_ref = ev.keyCode) === 17 || _ref === 224 || _ref === 91 || _ref === 93) {
            _this._ctrlDown = true;
            return;
          }
          if (ev.keyCode === 16) {
            if (_this._highlightTimeout) {
              return;
            }
            _this._shiftDown = true;
            _this._highlightTimeout = setTimeout(function() {
              return _this.highlightRegions(true);
            }, ContentTools.HIGHLIGHT_HOLD_DURATION);
            return;
          }
          clearTimeout(_this._highlightTimeout);
          return _this.highlightRegions(false);
        };
      })(this);
      this._handleHighlightOff = (function(_this) {
        return function(ev) {
          var _ref;
          if ((_ref = ev.keyCode) === 17 || _ref === 224) {
            _this._ctrlDown = false;
            return;
          }
          if (ev.keyCode === 16) {
            _this._shiftDown = false;
            if (_this._highlightTimeout) {
              clearTimeout(_this._highlightTimeout);
              _this._highlightTimeout = null;
            }
            return _this.highlightRegions(false);
          }
        };
      })(this);
      this._handleVisibility = (function(_this) {
        return function(ev) {
          if (!document.hasFocus()) {
            clearTimeout(_this._highlightTimeout);
            return _this.highlightRegions(false);
          }
        };
      })(this);
      document.addEventListener('keydown', this._handleHighlightOn);
      document.addEventListener('keyup', this._handleHighlightOff);
      document.addEventListener('visibilitychange', this._handleVisibility);
      this._handleBeforeUnload = (function(_this) {
        // console.log('this._handleBeforeUnload');

        return function(ev) {
          var cancelMessage;
          if (_this._state === 'editing') {
            cancelMessage = ContentEdit._(ContentTools.CANCEL_MESSAGE);
            (ev || window.event).returnValue = cancelMessage;
            return cancelMessage;
          }
        };
      })(this);
      window.addEventListener('beforeunload', this._handleBeforeUnload);
      this._handleUnload = (function(_this) {
        return function(ev) {
          return _this.destroy();
        };
      })(this);
      return window.addEventListener('unload', this._handleUnload);
    };

    _EditorApp.prototype._allowEmptyRegions = function(callback) {
      this._emptyRegionsAllowed = true;
      callback();
      return this._emptyRegionsAllowed = false;
    };

    _EditorApp.prototype._preventEmptyRegions = function() {
      var child, hasEditableChildren, lastModified, name, placeholder, region, _i, _len, _ref, _ref1, _results;
      if (this._emptyRegionsAllowed) {
        return;
      }
      _ref = this._regions;
      _results = [];
      for (name in _ref) {
        region = _ref[name];
        lastModified = region.lastModified();
        hasEditableChildren = false;
        _ref1 = region.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          child = _ref1[_i];
          if (child.type() !== 'Static') {
            hasEditableChildren = true;
            break;
          }
        }
        if (hasEditableChildren) {
          continue;
        }
        placeholder = this.createPlaceholderElement(region);
        region.attach(placeholder);
        _results.push(region._modified = lastModified);
      }
      return _results;
    };

    _EditorApp.prototype._removeDOMEventListeners = function() {
      document.removeEventListener('keydown', this._handleHighlightOn);
      document.removeEventListener('keyup', this._handleHighlightOff);
      window.removeEventListener('beforeunload', this._handleBeforeUnload);
      return window.removeEventListener('unload', this._handleUnload);
    };

    _EditorApp.prototype._initRegions = function() {
      var domRegion, found, i, index, name, region, _i, _len, _ref, _ref1, _results;
      found = {};
      this._orderedRegions = [];
      _ref = this._domRegions;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        domRegion = _ref[i];
        name = domRegion.getAttribute(this._namingProp);
        if (!name) {
          name = i;
        }
        found[name] = true;
        this._orderedRegions.push(name);
        if (this._regions[name] && this._regions[name].domElement() === domRegion) {
          continue;
        }
        if (this._fixtureTest(domRegion)) {
          this._regions[name] = new ContentEdit.Fixture(domRegion);
        } else {
          this._regions[name] = new ContentEdit.Region(domRegion);
        }
        this._regionsLastModified[name] = this._regions[name].lastModified();
      }
      _ref1 = this._regions;
      _results = [];
      for (name in _ref1) {
        region = _ref1[name];
        if (found[name]) {
          continue;
        }
        delete this._regions[name];
        delete this._regionsLastModified[name];
        index = this._orderedRegions.indexOf(name);
        if (index > -1) {
          _results.push(this._orderedRegions.splice(index, 1));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return _EditorApp;

  })(ContentTools.ComponentUI);

  ContentTools.EditorApp = (function() {
    var instance;

    function EditorApp() {}

    instance = null;

    EditorApp.get = function() {
      var cls;
      cls = ContentTools.EditorApp.getCls();
      return instance != null ? instance : instance = new cls();
    };

    EditorApp.getCls = function() {
      return _EditorApp;
    };

    return EditorApp;

  })();

  ContentTools.History = (function() {
    function History(regions) {
      this._lastSnapshotTaken = null;
      this._regions = {};
      this.replaceRegions(regions);
      this._snapshotIndex = -1;
      this._snapshots = [];
      this._store();
    }

    History.prototype.canRedo = function() {
      return this._snapshotIndex < this._snapshots.length - 1;
    };

    History.prototype.canUndo = function() {
      return this._snapshotIndex > 0;
    };

    History.prototype.index = function() {
      return this._snapshotIndex;
    };

    History.prototype.length = function() {
      return this._snapshots.length;
    };

    History.prototype.snapshot = function() {
      return this._snapshots[this._snapshotIndex];
    };

    History.prototype.goTo = function(index) {
      this._snapshotIndex = Math.min(this._snapshots.length - 1, Math.max(0, index));
      return this.snapshot();
    };

    History.prototype.redo = function() {
      return this.goTo(this._snapshotIndex + 1);
    };

    History.prototype.replaceRegions = function(regions) {
      var k, v, _results;
      this._regions = {};
      _results = [];
      for (k in regions) {
        v = regions[k];
        _results.push(this._regions[k] = v);
      }
      return _results;
    };

    History.prototype.restoreSelection = function(snapshot) {
      var element, region;
      if (!snapshot.selected) {
        return;
      }
      region = this._regions[snapshot.selected.region];
      element = region.descendants()[snapshot.selected.element];
      element.focus();
      if (element.selection && snapshot.selected.selection) {
        return element.selection(snapshot.selected.selection);
      }
    };

    History.prototype.stopWatching = function() {
      if (this._watchInterval) {
        clearInterval(this._watchInterval);
      }
      if (this._delayedStoreTimeout) {
        return clearTimeout(this._delayedStoreTimeout);
      }
    };

    History.prototype.undo = function() {
      return this.goTo(this._snapshotIndex - 1);
    };

    History.prototype.watch = function() {
      var watch;
      this._lastSnapshotTaken = Date.now();
      watch = (function(_this) {
        return function() {
          var delayedStore, lastModified;
          lastModified = ContentEdit.Root.get().lastModified();
          if (lastModified === null) {
            return;
          }
          if (lastModified > _this._lastSnapshotTaken) {
            if (_this._delayedStoreRequested === lastModified) {
              return;
            }
            if (_this._delayedStoreTimeout) {
              clearTimeout(_this._delayedStoreTimeout);
            }
            delayedStore = function() {
              _this._lastSnapshotTaken = lastModified;
              return _this._store();
            };
            _this._delayedStoreRequested = lastModified;
            return _this._delayedStoreTimeout = setTimeout(delayedStore, 500);
          }
        };
      })(this);
      return this._watchInterval = setInterval(watch, 50);
    };

    History.prototype._store = function() {
      var element, name, other_region, region, snapshot, _ref, _ref1;
      snapshot = {
        regions: {},
        selected: null
      };
      _ref = this._regions;
      for (name in _ref) {
        region = _ref[name];
        snapshot.regions[name] = region.html();
      }
      element = ContentEdit.Root.get().focused();
      if (element) {
        snapshot.selected = {};
        region = element.closest(function(node) {
          return node.type() === 'Region' || node.type() === 'Fixture';
        });
        if (!region) {
          return;
        }
        _ref1 = this._regions;
        for (name in _ref1) {
          other_region = _ref1[name];
          if (region === other_region) {
            snapshot.selected.region = name;
            break;
          }
        }
        snapshot.selected.element = region.descendants().indexOf(element);
        if (element.selection) {
          snapshot.selected.selection = element.selection();
        }
      }
      if (this._snapshotIndex < (this._snapshots.length - 1)) {
        this._snapshots = this._snapshots.slice(0, this._snapshotIndex + 1);
      }
      this._snapshotIndex++;
      return this._snapshots.splice(this._snapshotIndex, 0, snapshot);
    };

    return History;

  })();

  ContentTools.StylePalette = (function() {
    function StylePalette() {}

    StylePalette._styles = [];

    StylePalette.add = function(styles) {
      return this._styles = this._styles.concat(styles);
    };

    StylePalette.styles = function(element) {

      var tagName = element._elementName; //element.tagName();

      if (element === void 0) {
        return this._styles.slice();
      }
      return this._styles.filter(function(style) {
        if (!style._applicableTo) {
          return true;
        }
        return style._applicableTo.indexOf(tagName) !== -1;
      });
    };

    return StylePalette;

  })();

  ContentTools.Style = (function() {

    function Style(name, cssClass, applicableTo) {
      this._name = name;
      this._cssClass = cssClass;
      if (applicableTo) {
        this._applicableTo = applicableTo;
      } else {
        this._applicableTo = null;
      }
    }

    Style.prototype.applicableTo = function() {
      return this._applicableTo;
    };

    Style.prototype.cssClass = function() {
      return this._cssClass;
    };

    Style.prototype.name = function() {
      return this._name;
    };

    return Style;

  })();

  ContentTools.ToolShelf = (function() {
    function ToolShelf() {}

    ToolShelf._tools = {};

    ToolShelf.stow = function(cls, name) {
      return this._tools[name] = cls;
    };

    ToolShelf.fetch = function(name) {
      if (!this._tools[name]) {
        throw new Error("`" + name + "` has not been stowed on the tool shelf");
      }
      return this._tools[name];
    };

    return ToolShelf;

  })();

  ContentTools.Tool = (function() {
    function Tool() {}

    Tool.label = 'Tool';
    Tool.toolName = 'tool';
    Tool.icon = '';

    Tool.requiresElement = true;

    Tool.canApply = function(element, selection) {
      return false;
    };

    Tool.isApplied = function(element, selection) {
      return false;
    };

    Tool.apply = function(element, selection, callback) {
      throw new Error('Not implemented');
    };

    Tool._insertAt = function(element) {

        var insertIndex, insertNode;
        insertNode = element;
        if (insertNode.parent().type() !== 'Region') {
          insertNode = element.closest(function(node) {
            return node.parent().type() === 'Region';
          });
        }
        insertIndex = insertNode.parent().children.indexOf(insertNode) + 1;
        return [insertNode, insertIndex];

    };

    return Tool;

  })();



///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////




  ContentTools.Tools.Bold = (function(_super) {
    __extends(Bold, _super);

    function Bold() {
      return Bold.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Bold, 'bold');

    Bold.label = 'Bold';
    Bold.toolName = 'bold';
    Bold.icon = 'fa-bold';
    Bold.tagName = 'b';

    Bold.canApply = function(element, selection) {
      if (!element.content) {
        return false;
      }
      return selection && !selection.isCollapsed();
    };

    Bold.isApplied = function(element, selection) {
      var from, to, _ref;
      if (element.content === void 0 || !element.content.length()) {
        return false;
      }
      _ref = selection.get(), from = _ref[0], to = _ref[1];
      if (from === to) {
        to += 1;
      }
      return element.content.slice(from, to).hasTags(this.tagName, true);
    };

    Bold.apply = function(element, selection, callback) {
      var from, to, _ref;
      element.storeState();
      _ref = selection.get(), from = _ref[0], to = _ref[1];
      if (this.isApplied(element, selection)) {
        element.content = element.content.unformat(from, to, new HTMLString.Tag(this.tagName));
      } else {
        element.content = element.content.format(from, to, new HTMLString.Tag(this.tagName));
      }
      element.content.optimize();
      element.updateInnerHTML();

      // console.log('taint call 3');
      console.log(element);
      element.taint();
      element.restoreState();
      return callback(true);
    };

    return Bold;

  })(ContentTools.Tool);





  ContentTools.Tools.Quote = (function(_super) {
    __extends(Quote, _super);

    function Quote() {
      return Quote.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Quote, 'quote');

    Quote.label = 'Quote';
    Quote.toolName = 'quote';
    Quote.icon = 'fa-quote-left';
    Quote.tagName = 'blockquote';

    Quote.canApply = function(element, selection) {
      if (!element.content) {
        return false;
      }
      return selection && !selection.isCollapsed();
    };

    Quote.isApplied = function(element, selection) {
      var from, to, _ref;
      if (element.content === void 0 || !element.content.length()) {
        return false;
      }
      _ref = selection.get(), from = _ref[0], to = _ref[1];
      if (from === to) {
        to += 1;
      }
      return element.content.slice(from, to).hasTags(this.tagName, true);
    };

    Quote.apply = function(element, selection, callback) {
      var from, to, _ref;
      element.storeState();
      _ref = selection.get(), from = _ref[0], to = _ref[1];
      if (this.isApplied(element, selection)) {
        element.content = element.content.unformat(from, to, new HTMLString.Tag(this.tagName));
      } else {
        element.content = element.content.format(from, to, new HTMLString.Tag(this.tagName));
      }
      element.content.optimize();
      element.updateInnerHTML();
      element.taint();
      element.restoreState();
      return callback(true);
    };

    return Quote;

  })(ContentTools.Tool);


  // ContentEdit.TagNames.get().register(ContentEdit.Text, 'blockquote');



  ContentTools.Tools.Italic = (function(_super) {
    __extends(Italic, _super);

    function Italic() {
      return Italic.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Italic, 'italic');

    Italic.label = 'Italic';
    Italic.toolName = 'italic';
    Italic.icon = 'fa-italic';
    Italic.tagName = 'i';

    return Italic;

  })(ContentTools.Tools.Bold);

  ContentTools.Tools.Link = (function(_super) {
    __extends(Link, _super);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Link, 'link');

    Link.label = 'Link';
    Link.toolName = 'link';
    Link.icon = 'fa-link';
    Link.tagName = 'a';

    Link.getAttr = function(attrName, element, selection) {
      var c, from, selectedContent, tag, to, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (element.type() === 'Image') {
        if (element.a) {
          return element.a[attrName];
        }
      } else {
        _ref = selection.get(), from = _ref[0], to = _ref[1];
        selectedContent = element.content.slice(from, to);
        _ref1 = selectedContent.characters;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          if (!c.hasTags('a')) {
            continue;
          }
          _ref2 = c.tags();
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            tag = _ref2[_j];
            if (tag.name() === 'a') {
              return tag.attr(attrName);
            }
          }
        }
      }
      return '';
    };

    Link.canApply = function(element, selection) {
      // console.log('Link.canApply = function(element, selection) {')
      var character;
      if (element.type() === 'Image') {
        return true;
      } else {
        if (!element.content) {
          return false;
        }
        if (!selection) {
          return false;
        }
        if (selection.isCollapsed()) {
          character = element.content.characters[selection.get()[0]];
          if (!character || !character.hasTags('a')) {
            return false;
          }
        }
        return true;
      }
    };

    Link.isApplied = function(element, selection) {
      if (element.type() === 'Image') {
        return element.a;
      } else {
        return Link.__super__.constructor.isApplied.call(this, element, selection);
      }
    };

    Link.apply = function(element, selection, callback) {
      var allowScrolling, app, applied, characters, dialog, domElement, ends, from, measureSpan, modal, rect, scrollX, scrollY, selectTag, starts, to, transparent, _ref, _ref1;
      applied = false;
      if (element.type() === 'Image') {
        rect = element.domElement().getBoundingClientRect();
      } else {
        if (selection.isCollapsed()) {
          characters = element.content.characters;
          starts = selection.get(0)[0];
          ends = starts;
          while (starts > 0 && characters[starts - 1].hasTags('a')) {
            starts -= 1;
          }
          while (ends < characters.length && characters[ends].hasTags('a')) {
            ends += 1;
          }
          selection = new ContentSelect.Range(starts, ends);
          selection.select(element.domElement());
        }
        element.storeState();
        selectTag = new HTMLString.Tag('span', {
          'class': 'ct--puesdo-select'
        });
        _ref = selection.get(), from = _ref[0], to = _ref[1];
        element.content = element.content.format(from, to, selectTag);
        element.updateInnerHTML();
        domElement = element.domElement();
        measureSpan = domElement.getElementsByClassName('ct--puesdo-select');
        rect = measureSpan[0].getBoundingClientRect();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI(transparent = true, allowScrolling = true);
      modal.addEventListener('click', function() {
        this.unmount();
        dialog.hide();
        if (element.content) {
          element.content = element.content.unformat(from, to, selectTag);
          element.updateInnerHTML();
          element.restoreState();
        }
        return callback(applied);
      });
      dialog = new ContentTools.LinkDialog(this.getAttr('href', element, selection), this.getAttr('target', element, selection));
      _ref1 = ContentTools.getScrollPosition(), scrollX = _ref1[0], scrollY = _ref1[1];
      dialog.position([rect.left + (rect.width / 2) + scrollX, rect.top + (rect.height / 2) + scrollY]);
      dialog.addEventListener('save', function(ev) {
        var a, alignmentClassNames, className, detail, linkClasses, _i, _j, _len, _len1;
        detail = ev.detail();
        applied = true;
        if (element.type() === 'Image') {
          alignmentClassNames = ['align-center', 'align-left', 'align-right'];
          if (detail.href) {
            element.a = {
              href: detail.href
            };
            if (element.a) {
              element.a["class"] = element.a['class'];
            }
            if (detail.target) {
              element.a.target = detail.target;
            }
            for (_i = 0, _len = alignmentClassNames.length; _i < _len; _i++) {
              className = alignmentClassNames[_i];
              if (element.hasCSSClass(className)) {
                element.removeCSSClass(className);
                element.a['class'] = className;
                break;
              }
            }
          } else {
            linkClasses = [];
            if (element.a['class']) {
              linkClasses = element.a['class'].split(' ');
            }
            for (_j = 0, _len1 = alignmentClassNames.length; _j < _len1; _j++) {
              className = alignmentClassNames[_j];
              if (linkClasses.indexOf(className) > -1) {
                element.addCSSClass(className);
                break;
              }
            }
            element.a = null;
          }
          element.unmount();
          element.mount();
        } else {
          element.content = element.content.unformat(from, to, 'a');
          if (detail.href) {
            a = new HTMLString.Tag('a', detail);
            element.content = element.content.format(from, to, a);
            element.content.optimize();
          }
          element.updateInnerHTML();
        }
        element.taint();
        return modal.dispatchEvent(modal.createEvent('click'));
      });
      app.attach(modal);
      app.attach(dialog);
      modal.show();
      return dialog.show();
    };

    return Link;

  })(ContentTools.Tools.Bold);

  ContentTools.Tools.Heading = (function(_super) {
    __extends(Heading, _super);

    function Heading() {
      return Heading.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Heading, 'heading');

    Heading.label = 'Heading';
    Heading.toolName = 'heading';
    Heading.icon = 'fa-header';
    Heading.tagName = 'h1';

    Heading.canApply = function(element, selection) {
      if (element.isFixed()) {
        return false;
      }
      return element.content !== void 0 && ['Text', 'PreText'].indexOf(element.type()) !== -1;
    };

    Heading.isApplied = function(element, selection) {
      if (!element.content) {
        return false;
      }
      if (['Text', 'PreText'].indexOf(element.type()) === -1) {
        return false;
      }
      return element.tagName() === this.tagName;
    };

    Heading.apply = function(element, selection, callback) {
      var content, insertAt, parent, textElement;
      element.storeState();
      if (element.type() === 'PreText') {
        content = element.content.html().replace(/&nbsp;/g, ' ');
        textElement = new ContentEdit.Text(this.tagName, {}, content);
        parent = element.parent();
        insertAt = parent.children.indexOf(element);
        parent.detach(element);
        parent.attach(textElement, insertAt);
        element.blur();
        textElement.focus();
        textElement.selection(selection);
      } else {
        element.removeAttr('class');
        if (element.tagName() === this.tagName) {
          element.tagName('p');
        } else {
          element.tagName(this.tagName);
        }
        element.restoreState();
      }
      return callback(true);
    };

    return Heading;

  })(ContentTools.Tool);

  ContentTools.Tools.Subheading = (function(_super) {
    __extends(Subheading, _super);

    function Subheading() {
      return Subheading.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Subheading, 'subheading');

    Subheading.label = 'Subheading';
    Subheading.toolName = 'subheading';
    Subheading.icon = 'fa-header';
    Subheading.tagName = 'h2';

    return Subheading;

  })(ContentTools.Tools.Heading);

  ContentTools.Tools.Paragraph = (function(_super) {
    __extends(Paragraph, _super);

    function Paragraph() {
      return Paragraph.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Paragraph, 'paragraph');

    Paragraph.label = 'Paragraph';
    Paragraph.toolName = 'paragraph';
    Paragraph.icon = 'fa-paragraph';
    Paragraph.tagName = 'p';

    Paragraph.canApply = function(element, selection) {
      if (element.isFixed()) {
        return false;
      }
      return element !== void 0;
    };

    Paragraph.apply = function(element, selection, callback) {
      var app, forceAdd, paragraph, region;
      app = ContentTools.EditorApp.get();
      forceAdd = app.ctrlDown();
      if (ContentTools.Tools.Heading.canApply(element) && !forceAdd) {
        return Paragraph.__super__.constructor.apply.call(this, element, selection, callback);
      } else {
        if (element.parent().type() !== 'Region') {
          element = element.closest(function(node) {
            return node.parent().type() === 'Region';
          });
        }
        region = element.parent();
        paragraph = new ContentEdit.Text('p');
        region.attach(paragraph, region.children.indexOf(element) + 1);
        paragraph.focus();
        return callback(true);
      }
    };

    return Paragraph;

  })(ContentTools.Tools.Heading);

  ContentTools.Tools.Preformatted = (function(_super) {
    __extends(Preformatted, _super);

    function Preformatted() {
      return Preformatted.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Preformatted, 'preformatted');

    Preformatted.label = 'Preformatted';
    Preformatted.toolName = 'preformatted';
    Preformatted.icon = 'fa-terminal';
    Preformatted.tagName = 'pre';

    Preformatted.apply = function(element, selection, callback) {
      var insertAt, parent, preText, text;
      if (element.type() === 'PreText') {
        ContentTools.Tools.Paragraph.apply(element, selection, callback);
        return;
      }
      text = element.content.text();
      preText = new ContentEdit.PreText('pre', {}, HTMLString.String.encode(text));
      parent = element.parent();
      insertAt = parent.children.indexOf(element);
      parent.detach(element);
      parent.attach(preText, insertAt);
      element.blur();
      preText.focus();
      preText.selection(selection);
      return callback(true);
    };

    return Preformatted;

  })(ContentTools.Tools.Heading);


  ContentTools.Tools.ClearStyle = (function(_super) {
    __extends(ClearStyle, _super);

    function ClearStyle() {
      return ClearStyle.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(ClearStyle, 'clear-style');

    ClearStyle.label = 'Clear Style';
    ClearStyle.toolName = 'clear-style';
    ClearStyle.icon = 'fa-eraser';
    ClearStyle.className = 'clear-style';

    ClearStyle.canApply = function(element, selection) {
      return element.content !== void 0;
    };

    ClearStyle.isApplied = function(element, selection) {
      var _ref;
      if (!this.canApply(element)) {
        return false;
      }
      return element.hasCSSClass(this.className);
    };

    ClearStyle.apply = function(element, selection, callback) {

      var html = element._domElement.innerHTML;
      html = html.replace(/<\/?span[^>]*>/g,"");
      element._domElement.innerHTML = html;

      // var html = element._domElement.innerHTML;
      // var div = document.createElement("div");
      // div.innerHTML = html;
      // element._domElement.innerHTML = div.textContent || div.innerText || "";

      return callback(true);
    };

    return ClearStyle;

  })(ContentTools.Tool);



  ContentTools.Tools.AlignLeft = (function(_super) {
    __extends(AlignLeft, _super);

    function AlignLeft() {
      return AlignLeft.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(AlignLeft, 'align-left');

    AlignLeft.label = 'Align left';
    AlignLeft.toolName = 'align-left';
    AlignLeft.icon = 'fa-align-left';
    AlignLeft.className = 'text-left';

    AlignLeft.canApply = function(element, selection) {
      return element.content !== void 0;
    };

    AlignLeft.isApplied = function(element, selection) {
      var _ref;
      if (!this.canApply(element)) {
        return false;
      }
      if ((_ref = element.type()) === 'ListItemText' || _ref === 'TableCellText') {
        element = element.parent();
      }
      return element.hasCSSClass(this.className);
    };

    AlignLeft.apply = function(element, selection, callback) {
      var alignmentClassNames, className, _i, _len, _ref;
      if ((_ref = element.type()) === 'ListItemText' || _ref === 'TableCellText') {
        element = element.parent();
      }
      alignmentClassNames = [ContentTools.Tools.AlignLeft.className, ContentTools.Tools.AlignCenter.className, ContentTools.Tools.AlignRight.className];
      for (_i = 0, _len = alignmentClassNames.length; _i < _len; _i++) {
        className = alignmentClassNames[_i];
        if (element.hasCSSClass(className)) {
          element.removeCSSClass(className);
          if (className === this.className) {
            return callback(true);
          }
        }
      }
      element.addCSSClass(this.className);
      return callback(true);
    };

    return AlignLeft;

  })(ContentTools.Tool);

  ContentTools.Tools.AlignCenter = (function(_super) {
    __extends(AlignCenter, _super);

    function AlignCenter() {
      return AlignCenter.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(AlignCenter, 'align-center');

    AlignCenter.label = 'Align center';
    AlignCenter.toolName = 'align-center';
    AlignCenter.icon = 'fa-align-center';
    AlignCenter.className = 'text-center';

    return AlignCenter;

  })(ContentTools.Tools.AlignLeft);

  ContentTools.Tools.AlignRight = (function(_super) {
    __extends(AlignRight, _super);

    function AlignRight() {
      return AlignRight.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(AlignRight, 'align-right');

    AlignRight.label = 'Align right';
    AlignRight.toolName = 'align-right';
    AlignRight.icon = 'fa-align-right';
    AlignRight.className = 'text-right';

    return AlignRight;

  })(ContentTools.Tools.AlignLeft);

  ContentTools.Tools.UnorderedList = (function(_super) {
    __extends(UnorderedList, _super);

    function UnorderedList() {
      return UnorderedList.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(UnorderedList, 'unordered-list');

    UnorderedList.label = 'Bullet list';
    UnorderedList.toolName = 'unordered-list';
    UnorderedList.icon = 'fa-list-ul';
    UnorderedList.listTag = 'ul';

    UnorderedList.canApply = function(element, selection) {
      var _ref;
      if (element.isFixed()) {
        return false;
      }
      return element.content !== void 0 && ((_ref = element.parent().type()) === 'Region' || _ref === 'ListItem');
    };

    UnorderedList.apply = function(element, selection, callback) {
      var insertAt, list, listItem, listItemText, parent;
      if (element.parent().type() === 'ListItem') {
        element.storeState();
        list = element.closest(function(node) {
          return node.type() === 'List';
        });
        list.tagName(this.listTag);
        element.restoreState();
      } else {
        listItemText = new ContentEdit.ListItemText(element.content.copy());
        listItem = new ContentEdit.ListItem();
        listItem.attach(listItemText);
        list = new ContentEdit.List(this.listTag, {});
        list.attach(listItem);
        parent = element.parent();
        insertAt = parent.children.indexOf(element);
        parent.detach(element);
        parent.attach(list, insertAt);
        listItemText.focus();
        listItemText.selection(selection);
      }
      return callback(true);
    };

    return UnorderedList;

  })(ContentTools.Tool);

  ContentTools.Tools.OrderedList = (function(_super) {
    __extends(OrderedList, _super);

    function OrderedList() {
      return OrderedList.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(OrderedList, 'ordered-list');

    OrderedList.label = 'Numbers list';
    OrderedList.toolName = 'ordered-list';
    OrderedList.icon = 'fa-list-ol';
    OrderedList.listTag = 'ol';

    return OrderedList;

  })(ContentTools.Tools.UnorderedList);

  ContentTools.Tools.Indent = (function(_super) {
    __extends(Indent, _super);

    function Indent() {
      return Indent.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Indent, 'indent');

    Indent.label = 'Indent';
    Indent.toolName = 'indent';
    Indent.icon = 'fa-indent';

    Indent.canApply = function(element, selection) {
      return element.parent().type() === 'ListItem' && element.parent().parent().children.indexOf(element.parent()) > 0;
    };

    Indent.apply = function(element, selection, callback) {
      element.parent().indent();
      return callback(true);
    };

    return Indent;

  })(ContentTools.Tool);

  ContentTools.Tools.Unindent = (function(_super) {
    __extends(Unindent, _super);

    function Unindent() {
      return Unindent.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Unindent, 'unindent');

    Unindent.label = 'Unindent';
    Unindent.toolName = 'unindent';
    Unindent.icon = 'fa-outdent';

    Unindent.canApply = function(element, selection) {
      return element.parent().type() === 'ListItem';
    };

    Unindent.apply = function(element, selection, callback) {
      element.parent().unindent();
      return callback(true);
    };

    return Unindent;

  })(ContentTools.Tool);

  ContentTools.Tools.LineBreak = (function(_super) {
    __extends(LineBreak, _super);

    function LineBreak() {
      return LineBreak.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(LineBreak, 'line-break');

    LineBreak.label = 'Line break';
    LineBreak.toolName = 'line-break';
    LineBreak.icon = 'fa-level-down';

    LineBreak.canApply = function(element, selection) {
      return element.content;
    };

    LineBreak.apply = function(element, selection, callback) {
      var br, cursor, tail, tip;
      cursor = selection.get()[0] + 1;
      tip = element.content.substring(0, selection.get()[0]);
      tail = element.content.substring(selection.get()[1]);
      br = new HTMLString.String('<br>', element.content.preserveWhitespace());
      element.content = tip.concat(br, tail);
      element.updateInnerHTML();
      element.taint();
      selection.set(cursor, cursor);
      element.selection(selection);
      return callback(true);
    };

    return LineBreak;

  })(ContentTools.Tool);


  ContentTools.Tools.Video = (function(_super) {
    __extends(Video, _super);

    function Video() {
      return Video.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Video, 'video');

    Video.label = 'Video';
    Video.toolName = 'video';
    Video.icon = 'fa-video-camera';

    Video.canApply = function(element, selection) {
      return !element.isFixed();
    };

    Video.apply = function(element, selection, callback) {
      var app, dialog, modal;
      if (element.storeState) {
        element.storeState();
      }
      app = ContentTools.EditorApp.get();
      modal = new ContentTools.ModalUI();
      dialog = new ContentTools.VideoDialog();
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
        return function(ev) {
          var index, node, url, video, _ref;
          url = ev.detail().url;
          if (url) {
            video = new ContentEdit.Video('iframe', {
              'frameborder': 0,
              'height': ContentTools.DEFAULT_VIDEO_HEIGHT,
              'src': url,
              'width': ContentTools.DEFAULT_VIDEO_WIDTH
            });
            _ref = _this._insertAt(element), node = _ref[0], index = _ref[1];
            node.parent().attach(video, index);
            video.focus();
          } else {
            if (element.restoreState) {
              element.restoreState();
            }
          }
          modal.hide();
          dialog.hide();
          return callback(url !== '');
        };
      })(this));
      app.attach(modal);
      app.attach(dialog);
      modal.show();
      return dialog.show();
    };

    return Video;

  })(ContentTools.Tool);




  ContentTools.Tools.Undo = (function(_super) {
    __extends(Undo, _super);

    function Undo() {
      return Undo.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Undo, 'undo');

    Undo.label = 'Undo';
    Undo.toolName = 'undo';
    Undo.icon = 'fa-undo';

    Undo.requiresElement = false;

    Undo.canApply = function(element, selection) {
      var app;
      app = ContentTools.EditorApp.get();
      return app.history && app.history.canUndo();
    };

    Undo.apply = function(element, selection, callback) {
      var app, snapshot;
      app = ContentTools.EditorApp.get();
      app.history.stopWatching();
      snapshot = app.history.undo();
      app.revertToSnapshot(snapshot);
      return app.history.watch();
    };

    return Undo;

  })(ContentTools.Tool);

  ContentTools.Tools.Redo = (function(_super) {
    __extends(Redo, _super);

    function Redo() {
      return Redo.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Redo, 'redo');

    Redo.label = 'Redo';
    Redo.toolName = 'redo';
    Redo.icon = 'fa-repeat';

    Redo.requiresElement = false;

    Redo.canApply = function(element, selection) {
      var app;
      app = ContentTools.EditorApp.get();
      return app.history && app.history.canRedo();
    };

    Redo.apply = function(element, selection, callback) {
      var app, snapshot;
      app = ContentTools.EditorApp.get();
      app.history.stopWatching();
      snapshot = app.history.redo();
      app.revertToSnapshot(snapshot);
      return app.history.watch();
    };

    return Redo;

  })(ContentTools.Tool);

  ContentTools.Tools.Remove = (function(_super) {
    __extends(Remove, _super);

    function Remove() {
      return Remove.__super__.constructor.apply(this, arguments);
    }

    ContentTools.ToolShelf.stow(Remove, 'remove');

    Remove.label = 'Remove';
    Remove.toolName = 'remove';
    Remove.icon = 'fa-trash';

    Remove.canApply = function(element, selection) {
      return !element.isFixed();
    };

    Remove.apply = function(element, selection, callback) {
      var app, list, row, table;
      app = ContentTools.EditorApp.get();
      element.blur();
      if (element.nextContent()) {
        element.nextContent().focus();
      } else if (element.previousContent()) {
        element.previousContent().focus();
      }
      if (!element.isMounted()) {
        callback(true);
        return;
      }
      switch (element.type()) {
        case 'ListItemText':
          if (app.ctrlDown()) {
            list = element.closest(function(node) {
              return node.parent().type() === 'Region';
            });
            list.parent().detach(list);
          } else {
            element.parent().parent().detach(element.parent());
          }
          break;
        case 'TableCellText':
          if (app.ctrlDown()) {
            table = element.closest(function(node) {
              return node.type() === 'Table';
            });
            table.parent().detach(table);
          } else {
            row = element.parent().parent();
            row.parent().detach(row);
          }
          break;
        default:
          element.parent().detach(element);
          break;
      }
      return callback(true);
    };

    return Remove;

  })(ContentTools.Tool);



}).call(this);
