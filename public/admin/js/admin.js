function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }




 var CryptoJSAesJson = {
     stringify: function (cipherParams) {
         var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
         if (cipherParams.iv) j.iv = cipherParams.iv.toString();
         if (cipherParams.salt) j.s = cipherParams.salt.toString();
         return JSON.stringify(j);
     },
     parse: function (jsonStr) {
         var j = JSON.parse(jsonStr);
         var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
         if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
         if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
         return cipherParams;
     }
 }
/*! JSON Editor v0.7.28 - JSON Schema -> HTML Editor
 * By Jeremy Dorn - https://github.com/jdorn/json-editor/
 * Released under the MIT license
 *
 * Date: 2016-08-07
 */

/**
 * See README.md for requirements and usage info
 */

(function() {

/*jshint loopfunc: true */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var Class;
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){window.postMessage("xyz");}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function extend(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = extend;

    return Class;
  };

  return Class;
})();

// CustomEvent constructor polyfill
// From MDN
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Array.isArray polyfill
// From MDN
(function() {
	if(!Array.isArray) {
	  Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	  };
	}
}());
/**
 * Taken from jQuery 2.1.3
 *
 * @param obj
 * @returns {boolean}
 */
var $isplainobject = function( obj ) {
  // Not plain objects:
  // - Any object or value whose internal [[Class]] property is not "[object Object]"
  // - DOM nodes
  // - window
  if (typeof obj !== "object" || obj.nodeType || (obj !== null && obj === obj.window)) {
    return false;
  }

  if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
    return false;
  }

  // If the function hasn't returned already, we're confident that
  // |obj| is a plain object, created by {} or constructed with new Object
  return true;
};

var $extend = function(destination) {
  var source, i,property;
  for(i=1; i<arguments.length; i++) {
    source = arguments[i];
    for (property in source) {
      if(!source.hasOwnProperty(property)) continue;
      if(source[property] && $isplainobject(source[property])) {
        if(!destination.hasOwnProperty(property)) destination[property] = {};
        $extend(destination[property], source[property]);
      }
      else {
        destination[property] = source[property];
      }
    }
  }
  return destination;
};

var $each = function(obj,callback) {
  if(!obj || typeof obj !== "object") return;
  var i;
  if(Array.isArray(obj) || (typeof obj.length === 'number' && obj.length > 0 && (obj.length - 1) in obj)) {
    for(i=0; i<obj.length; i++) {
      if(callback(i,obj[i])===false) return;
    }
  }
  else {
    if (Object.keys) {
      var keys = Object.keys(obj);
      for(i=0; i<keys.length; i++) {
        if(callback(keys[i],obj[keys[i]])===false) return;
      }
    }
    else {
      for(i in obj) {
        if(!obj.hasOwnProperty(i)) continue;
        if(callback(i,obj[i])===false) return;
      }
    }
  }
};

var $trigger = function(el,event) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true);
  el.dispatchEvent(e);
};
var $triggerc = function(el,event) {
  var e = new CustomEvent(event,{
    bubbles: true,
    cancelable: true
  });

  el.dispatchEvent(e);
};

var JSONEditor = function(element,options) {
  if (!(element instanceof Element)) {
    throw new Error('element should be an instance of Element');
  }
  options = $extend({},JSONEditor.defaults.options,options||{});
  this.element = element;
  this.options = options;
  this.init();
};
JSONEditor.prototype = {
  // necessary since we remove the ctor property by doing a literal assignment. Without this
  // the $isplainobject function will think that this is a plain object.
  constructor: JSONEditor,
  init: function() {
    var self = this;

    this.ready = false;

    var theme_class = JSONEditor.defaults.themes[this.options.theme || JSONEditor.defaults.theme];
    if(!theme_class) throw "Unknown theme " + (this.options.theme || JSONEditor.defaults.theme);

    this.schema = this.options.schema;
    this.theme = new theme_class();
    this.template = this.options.template;
    this.refs = this.options.refs || {};
    this.uuid = 0;
    this.__data = {};

    var icon_class = JSONEditor.defaults.iconlibs[this.options.iconlib || JSONEditor.defaults.iconlib];
    if(icon_class) this.iconlib = new icon_class();

    this.root_container = this.theme.getContainer();
    this.element.appendChild(this.root_container);

    this.translate = this.options.translate || JSONEditor.defaults.translate;

    // Fetch all external refs via ajax
    this._loadExternalRefs(this.schema, function() {
      self._getDefinitions(self.schema);

      // Validator options
      var validator_options = {};
      if(self.options.custom_validators) {
        validator_options.custom_validators = self.options.custom_validators;
      }
      self.validator = new JSONEditor.Validator(self,null,validator_options);

      // Create the root editor
      var editor_class = self.getEditorClass(self.schema);
      self.root = self.createEditor(editor_class, {
        jsoneditor: self,
        schema: self.schema,
        required: true,
        container: self.root_container
      });

      self.root.preBuild();
      self.root.build();
      self.root.postBuild();

      // Starting data
      if(self.options.startval) self.root.setValue(self.options.startval);

      self.validation_results = self.validator.validate(self.root.getValue());
      self.root.showValidationErrors(self.validation_results);
      self.ready = true;

      // Fire ready event asynchronously
      window.requestAnimationFrame(function() {
        if(!self.ready) return;
        self.validation_results = self.validator.validate(self.root.getValue());
        self.root.showValidationErrors(self.validation_results);
        self.trigger('ready');
        self.trigger('change');
      });
    });
  },
  getValue: function() {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before getting the value";

    return this.root.getValue();
  },
  setValue: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before setting the value";

    this.root.setValue(value);
    return this;
  },
  validate: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before validating";

    // Custom value
    if(arguments.length === 1) {
      return this.validator.validate(value);
    }
    // Current value (use cached result)
    else {
      return this.validation_results;
    }
  },
  destroy: function() {
    if(this.destroyed) return;
    if(!this.ready) return;

    this.schema = null;
    this.options = null;
    this.root.destroy();
    this.root = null;
    this.root_container = null;
    this.validator = null;
    this.validation_results = null;
    this.theme = null;
    this.iconlib = null;
    this.template = null;
    this.__data = null;
    this.ready = false;
    this.element.innerHTML = '';

    this.destroyed = true;
  },
  on: function(event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);

    return this;
  },
  off: function(event, callback) {
    // Specific callback
    if(event && callback) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = this.callbacks[event] || [];
      var newcallbacks = [];
      for(var i=0; i<this.callbacks[event].length; i++) {
        if(this.callbacks[event][i]===callback) continue;
        newcallbacks.push(this.callbacks[event][i]);
      }
      this.callbacks[event] = newcallbacks;
    }
    // All callbacks for a specific event
    else if(event) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = [];
    }
    // All callbacks for all events
    else {
      this.callbacks = {};
    }

    return this;
  },
  trigger: function(event) {
    if(this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
      for(var i=0; i<this.callbacks[event].length; i++) {
        this.callbacks[event][i]();
      }
    }

    return this;
  },
  setOption: function(option, value) {
    if(option === "show_errors") {
      this.options.show_errors = value;
      this.onChange();
    }
    // Only the `show_errors` option is supported for now
    else {
      throw "Option "+option+" must be set during instantiation and cannot be changed later";
    }

    return this;
  },
  getEditorClass: function(schema) {
    var classname;

    schema = this.expandSchema(schema);

    $each(JSONEditor.defaults.resolvers,function(i,resolver) {
      var tmp = resolver(schema);
      if(tmp) {
        if(JSONEditor.defaults.editors[tmp]) {
          classname = tmp;
          return false;
        }
      }
    });

    if(!classname) throw "Unknown editor for schema "+JSON.stringify(schema);
    if(!JSONEditor.defaults.editors[classname]) throw "Unknown editor "+classname;

    return JSONEditor.defaults.editors[classname];
  },
  createEditor: function(editor_class, options) {
    options = $extend({},editor_class.options||{},options);
    return new editor_class(options);
  },
  onChange: function() {
    if(!this.ready) return;

    if(this.firing_change) return;
    this.firing_change = true;

    var self = this;

    window.requestAnimationFrame(function() {
      self.firing_change = false;
      if(!self.ready) return;

      // Validate and cache results
      self.validation_results = self.validator.validate(self.root.getValue());

      if(self.options.show_errors !== "never") {
        self.root.showValidationErrors(self.validation_results);
      }
      else {
        self.root.showValidationErrors([]);
      }

      // Fire change event
      self.trigger('change');
    });

    return this;
  },
  compileTemplate: function(template, name) {
    name = name || JSONEditor.defaults.template;

    var engine;

    // Specifying a preset engine
    if(typeof name === 'string') {
      if(!JSONEditor.defaults.templates[name]) throw "Unknown template engine "+name;
      engine = JSONEditor.defaults.templates[name]();

      if(!engine) throw "Template engine "+name+" missing required library.";
    }
    // Specifying a custom engine
    else {
      engine = name;
    }

    if(!engine) throw "No template engine set";
    if(!engine.compile) throw "Invalid template engine set";

    return engine.compile(template);
  },
  _data: function(el,key,value) {
    // Setting data
    if(arguments.length === 3) {
      var uuid;
      if(el.hasAttribute('data-jsoneditor-'+key)) {
        uuid = el.getAttribute('data-jsoneditor-'+key);
      }
      else {
        uuid = this.uuid++;
        el.setAttribute('data-jsoneditor-'+key,uuid);
      }

      this.__data[uuid] = value;
    }
    // Getting data
    else {
      // No data stored
      if(!el.hasAttribute('data-jsoneditor-'+key)) return null;

      return this.__data[el.getAttribute('data-jsoneditor-'+key)];
    }
  },
  registerEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = editor;
    return this;
  },
  unregisterEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = null;
    return this;
  },
  getEditor: function(path) {
    if(!this.editors) return;
    return this.editors[path];
  },
  watch: function(path,callback) {
    this.watchlist = this.watchlist || {};
    this.watchlist[path] = this.watchlist[path] || [];
    this.watchlist[path].push(callback);

    return this;
  },
  unwatch: function(path,callback) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    // If removing all callbacks for a path
    if(!callback) {
      this.watchlist[path] = null;
      return this;
    }

    var newlist = [];
    for(var i=0; i<this.watchlist[path].length; i++) {
      if(this.watchlist[path][i] === callback) continue;
      else newlist.push(this.watchlist[path][i]);
    }
    this.watchlist[path] = newlist.length? newlist : null;
    return this;
  },
  notifyWatchers: function(path) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    for(var i=0; i<this.watchlist[path].length; i++) {
      this.watchlist[path][i]();
    }
  },
  isEnabled: function() {
    return !this.root || this.root.isEnabled();
  },
  enable: function() {
    this.root.enable();
  },
  disable: function() {
    this.root.disable();
  },
  _getDefinitions: function(schema,path) {
    path = path || '#/definitions/';
    if(schema.definitions) {
      for(var i in schema.definitions) {
        if(!schema.definitions.hasOwnProperty(i)) continue;
        this.refs[path+i] = schema.definitions[i];
        if(schema.definitions[i].definitions) {
          this._getDefinitions(schema.definitions[i],path+i+'/definitions/');
        }
      }
    }
  },
  _getExternalRefs: function(schema) {
    var refs = {};
    var merge_refs = function(newrefs) {
      for(var i in newrefs) {
        if(newrefs.hasOwnProperty(i)) {
          refs[i] = true;
        }
      }
    };

    if(schema.$ref && typeof schema.$ref !== "object" && schema.$ref.substr(0,1) !== "#" && !this.refs[schema.$ref]) {
      refs[schema.$ref] = true;
    }

    for(var i in schema) {
      if(!schema.hasOwnProperty(i)) continue;
      if(schema[i] && typeof schema[i] === "object" && Array.isArray(schema[i])) {
        for(var j=0; j<schema[i].length; j++) {
          if(typeof schema[i][j]==="object") {
            merge_refs(this._getExternalRefs(schema[i][j]));
          }
        }
      }
      else if(schema[i] && typeof schema[i] === "object") {
        merge_refs(this._getExternalRefs(schema[i]));
      }
    }

    return refs;
  },
  _loadExternalRefs: function(schema, callback) {
    var self = this;
    var refs = this._getExternalRefs(schema);

    var done = 0, waiting = 0, callback_fired = false;

    $each(refs,function(url) {
      if(self.refs[url]) return;
      if(!self.options.ajax) throw "Must set ajax option to true to load external ref "+url;
      self.refs[url] = 'loading';
      waiting++;

      var r = new XMLHttpRequest();
      r.open("GET", url, true);
      r.onreadystatechange = function () {
        if (r.readyState != 4) return;
        // Request succeeded
        if(r.status === 200) {
          var response;
          try {
            response = JSON.parse(r.responseText);
          }
          catch(e) {
            window.console.log(e);
            throw "Failed to parse external ref "+url;
          }
          if(!response || typeof response !== "object") throw "External ref does not contain a valid schema - "+url;

          self.refs[url] = response;
          self._loadExternalRefs(response,function() {
            done++;
            if(done >= waiting && !callback_fired) {
              callback_fired = true;
              callback();
            }
          });
        }
        // Request failed
        else {
          window.console.log(r);
          throw "Failed to fetch ref via ajax- "+url;
        }
      };
      r.send();
    });

    if(!waiting) {
      callback();
    }
  },
  expandRefs: function(schema) {
    schema = $extend({},schema);

    while (schema.$ref) {
      var ref = schema.$ref;
      delete schema.$ref;

      if(!this.refs[ref]) ref = decodeURIComponent(ref);

      schema = this.extendSchemas(schema,this.refs[ref]);
    }
    return schema;
  },
  expandSchema: function(schema) {
    var self = this;
    var extended = $extend({},schema);
    var i;

    // Version 3 `type`
    if(typeof schema.type === 'object') {
      // Array of types
      if(Array.isArray(schema.type)) {
        $each(schema.type, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.type[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.type = self.expandSchema(schema.type);
      }
    }
    // Version 3 `disallow`
    if(typeof schema.disallow === 'object') {
      // Array of types
      if(Array.isArray(schema.disallow)) {
        $each(schema.disallow, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.disallow[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.disallow = self.expandSchema(schema.disallow);
      }
    }
    // Version 4 `anyOf`
    if(schema.anyOf) {
      $each(schema.anyOf, function(key,value) {
        schema.anyOf[key] = self.expandSchema(value);
      });
    }
    // Version 4 `dependencies` (schema dependencies)
    if(schema.dependencies) {
      $each(schema.dependencies,function(key,value) {
        if(typeof value === "object" && !(Array.isArray(value))) {
          schema.dependencies[key] = self.expandSchema(value);
        }
      });
    }
    // Version 4 `not`
    if(schema.not) {
      schema.not = this.expandSchema(schema.not);
    }

    // allOf schemas should be merged into the parent
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        extended = this.extendSchemas(extended,this.expandSchema(schema.allOf[i]));
      }
      delete extended.allOf;
    }
    // extends schemas should be merged into parent
    if(schema["extends"]) {
      // If extends is a schema
      if(!(Array.isArray(schema["extends"]))) {
        extended = this.extendSchemas(extended,this.expandSchema(schema["extends"]));
      }
      // If extends is an array of schemas
      else {
        for(i=0; i<schema["extends"].length; i++) {
          extended = this.extendSchemas(extended,this.expandSchema(schema["extends"][i]));
        }
      }
      delete extended["extends"];
    }
    // parent should be merged into oneOf schemas
    if(schema.oneOf) {
      var tmp = $extend({},extended);
      delete tmp.oneOf;
      for(i=0; i<schema.oneOf.length; i++) {
        extended.oneOf[i] = this.extendSchemas(this.expandSchema(schema.oneOf[i]),tmp);
      }
    }

    return this.expandRefs(extended);
  },
  extendSchemas: function(obj1, obj2) {
    obj1 = $extend({},obj1);
    obj2 = $extend({},obj2);

    var self = this;
    var extended = {};
    $each(obj1, function(prop,val) {
      // If this key is also defined in obj2, merge them
      if(typeof obj2[prop] !== "undefined") {
        // Required and defaultProperties arrays should be unioned together
        if((prop === 'required'||prop === 'defaultProperties') && typeof val === "object" && Array.isArray(val)) {
          // Union arrays and unique
          extended[prop] = val.concat(obj2[prop]).reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
          }, []);
        }
        // Type should be intersected and is either an array or string
        else if(prop === 'type' && (typeof val === "string" || Array.isArray(val))) {
          // Make sure we're dealing with arrays
          if(typeof val === "string") val = [val];
          if(typeof obj2.type === "string") obj2.type = [obj2.type];

          // If type is only defined in the first schema, keep it
          if(!obj2.type || !obj2.type.length) {
            extended.type = val;
          }
          // If type is defined in both schemas, do an intersect
          else {
            extended.type = val.filter(function(n) {
              return obj2.type.indexOf(n) !== -1;
            });
          }

          // If there's only 1 type and it's a primitive, use a string instead of array
          if(extended.type.length === 1 && typeof extended.type[0] === "string") {
            extended.type = extended.type[0];
          }
          // Remove the type property if it's empty
          else if(extended.type.length === 0) {
            delete extended.type;
          }
        }
        // All other arrays should be intersected (enum, etc.)
        else if(typeof val === "object" && Array.isArray(val)){
          extended[prop] = val.filter(function(n) {
            return obj2[prop].indexOf(n) !== -1;
          });
        }
        // Objects should be recursively merged
        else if(typeof val === "object" && val !== null) {
          extended[prop] = self.extendSchemas(val,obj2[prop]);
        }
        // Otherwise, use the first value
        else {
          extended[prop] = val;
        }
      }
      // Otherwise, just use the one in obj1
      else {
        extended[prop] = val;
      }
    });
    // Properties in obj2 that aren't in obj1
    $each(obj2, function(prop,val) {
      if(typeof obj1[prop] === "undefined") {
        extended[prop] = val;
      }
    });

    return extended;
  }
};

JSONEditor.defaults = {
  themes: {},
  templates: {},
  iconlibs: {},
  editors: {},
  languages: {},
  resolvers: [],
  custom_validators: []
};

JSONEditor.Validator = Class.extend({
  init: function(jsoneditor,schema,options) {
    this.jsoneditor = jsoneditor;
    this.schema = schema || this.jsoneditor.schema;
    this.options = options || {};
    this.translate = this.jsoneditor.translate || JSONEditor.defaults.translate;
  },
  validate: function(value) {
    return this._validateSchema(this.schema, value);
  },
  _validateSchema: function(schema,value,path) {
    var self = this;
    var errors = [];
    var valid, i, j;
    var stringified = JSON.stringify(value);

    path = path || 'root';

    // Work on a copy of the schema
    schema = $extend({},this.jsoneditor.expandRefs(schema));

    /*
     * Type Agnostic Validation
     */

    // Version 3 `required`
    if(schema.required && schema.required === true) {
      if(typeof value === "undefined") {
        errors.push({
          path: path,
          property: 'required',
          message: this.translate("error_notset")
        });

        // Can't do any more validation at this point
        return errors;
      }
    }
    // Value not defined
    else if(typeof value === "undefined") {
      // If required_by_default is set, all fields are required
      if(this.jsoneditor.options.required_by_default) {
        errors.push({
          path: path,
          property: 'required',
          message: this.translate("error_notset")
        });
      }
      // Not required, no further validation needed
      else {
        return errors;
      }
    }

    // `enum`
    if(schema["enum"]) {
      valid = false;
      for(i=0; i<schema["enum"].length; i++) {
        if(stringified === JSON.stringify(schema["enum"][i])) valid = true;
      }
      if(!valid) {
        errors.push({
          path: path,
          property: 'enum',
          message: this.translate("error_enum")
        });
      }
    }

    // `extends` (version 3)
    if(schema["extends"]) {
      for(i=0; i<schema["extends"].length; i++) {
        errors = errors.concat(this._validateSchema(schema["extends"][i],value,path));
      }
    }

    // `allOf`
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        errors = errors.concat(this._validateSchema(schema.allOf[i],value,path));
      }
    }

    // `anyOf`
    if(schema.anyOf) {
      valid = false;
      for(i=0; i<schema.anyOf.length; i++) {
        if(!this._validateSchema(schema.anyOf[i],value,path).length) {
          valid = true;
          break;
        }
      }
      if(!valid) {
        errors.push({
          path: path,
          property: 'anyOf',
          message: this.translate('error_anyOf')
        });
      }
    }

    // `oneOf`
    if(schema.oneOf) {
      valid = 0;
      var oneof_errors = [];
      for(i=0; i<schema.oneOf.length; i++) {
        // Set the error paths to be path.oneOf[i].rest.of.path
        var tmp = this._validateSchema(schema.oneOf[i],value,path);
        if(!tmp.length) {
          valid++;
        }

        for(j=0; j<tmp.length; j++) {
          tmp[j].path = path+'.oneOf['+i+']'+tmp[j].path.substr(path.length);
        }
        oneof_errors = oneof_errors.concat(tmp);

      }
      if(valid !== 1) {
        errors.push({
          path: path,
          property: 'oneOf',
          message: this.translate('error_oneOf', [valid])
        });
        errors = errors.concat(oneof_errors);
      }
    }

    // `not`
    if(schema.not) {
      if(!this._validateSchema(schema.not,value,path).length) {
        errors.push({
          path: path,
          property: 'not',
          message: this.translate('error_not')
        });
      }
    }

    // `type` (both Version 3 and Version 4 support)
    if(schema.type) {
      // Union type
      if(Array.isArray(schema.type)) {
        valid = false;
        for(i=0;i<schema.type.length;i++) {
          if(this._checkType(schema.type[i], value)) {
            valid = true;
            break;
          }
        }
        if(!valid) {
          errors.push({
            path: path,
            property: 'type',
            message: this.translate('error_type_union')
          });
        }
      }
      // Simple type
      else {
        if(!this._checkType(schema.type, value)) {
          errors.push({
            path: path,
            property: 'type',
            message: this.translate('error_type', [schema.type])
          });
        }
      }
    }


    // `disallow` (version 3)
    if(schema.disallow) {
      // Union type
      if(Array.isArray(schema.disallow)) {
        valid = true;
        for(i=0;i<schema.disallow.length;i++) {
          if(this._checkType(schema.disallow[i], value)) {
            valid = false;
            break;
          }
        }
        if(!valid) {
          errors.push({
            path: path,
            property: 'disallow',
            message: this.translate('error_disallow_union')
          });
        }
      }
      // Simple type
      else {
        if(this._checkType(schema.disallow, value)) {
          errors.push({
            path: path,
            property: 'disallow',
            message: this.translate('error_disallow', [schema.disallow])
          });
        }
      }
    }

    /*
     * Type Specific Validation
     */

    // Number Specific Validation
    if(typeof value === "number") {
      // `multipleOf` and `divisibleBy`
      if(schema.multipleOf || schema.divisibleBy) {
        var divisor = schema.multipleOf || schema.divisibleBy;
        // Vanilla JS, prone to floating point rounding errors (e.g. 1.14 / .01 == 113.99999)
        valid = (value/divisor === Math.floor(value/divisor));

        // Use math.js is available
        if(window.math) {
          valid = window.math.mod(window.math.bignumber(value), window.math.bignumber(divisor)).equals(0);
        }
        // Use decimal.js is available
        else if(window.Decimal) {
          valid = (new window.Decimal(value)).mod(new window.Decimal(divisor)).equals(0);
        }

        if(!valid) {
          errors.push({
            path: path,
            property: schema.multipleOf? 'multipleOf' : 'divisibleBy',
            message: this.translate('error_multipleOf', [divisor])
          });
        }
      }

      // `maximum`
      if(schema.hasOwnProperty('maximum')) {
        // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
        valid = schema.exclusiveMaximum? (value < schema.maximum) : (value <= schema.maximum);

        // Use math.js is available
        if(window.math) {
          valid = window.math[schema.exclusiveMaximum?'smaller':'smallerEq'](
            window.math.bignumber(value),
            window.math.bignumber(schema.maximum)
          );
        }
        // Use Decimal.js if available
        else if(window.Decimal) {
          valid = (new window.Decimal(value))[schema.exclusiveMaximum?'lt':'lte'](new window.Decimal(schema.maximum));
        }

        if(!valid) {
          errors.push({
            path: path,
            property: 'maximum',
            message: this.translate(
              (schema.exclusiveMaximum?'error_maximum_excl':'error_maximum_incl'),
              [schema.maximum]
            )
          });
        }
      }

      // `minimum`
      if(schema.hasOwnProperty('minimum')) {
        // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
        valid = schema.exclusiveMinimum? (value > schema.minimum) : (value >= schema.minimum);

        // Use math.js is available
        if(window.math) {
          valid = window.math[schema.exclusiveMinimum?'larger':'largerEq'](
            window.math.bignumber(value),
            window.math.bignumber(schema.minimum)
          );
        }
        // Use Decimal.js if available
        else if(window.Decimal) {
          valid = (new window.Decimal(value))[schema.exclusiveMinimum?'gt':'gte'](new window.Decimal(schema.minimum));
        }

        if(!valid) {
          errors.push({
            path: path,
            property: 'minimum',
            message: this.translate(
              (schema.exclusiveMinimum?'error_minimum_excl':'error_minimum_incl'),
              [schema.minimum]
            )
          });
        }
      }
    }
    // String specific validation
    else if(typeof value === "string") {
      // `maxLength`
      if(schema.maxLength) {
        if((value+"").length > schema.maxLength) {
          errors.push({
            path: path,
            property: 'maxLength',
            message: this.translate('error_maxLength', [schema.maxLength])
          });
        }
      }

      // `minLength`
      if(schema.minLength) {
        if((value+"").length < schema.minLength) {
          errors.push({
            path: path,
            property: 'minLength',
            message: this.translate((schema.minLength===1?'error_notempty':'error_minLength'), [schema.minLength])
          });
        }
      }

      // `pattern`
      if(schema.pattern) {
        if(!(new RegExp(schema.pattern)).test(value)) {
          errors.push({
            path: path,
            property: 'pattern',
            message: this.translate('error_pattern', [schema.pattern])
          });
        }
      }
    }
    // Array specific validation
    else if(typeof value === "object" && value !== null && Array.isArray(value)) {
      // `items` and `additionalItems`
      if(schema.items) {
        // `items` is an array
        if(Array.isArray(schema.items)) {
          for(i=0; i<value.length; i++) {
            // If this item has a specific schema tied to it
            // Validate against it
            if(schema.items[i]) {
              errors = errors.concat(this._validateSchema(schema.items[i],value[i],path+'.'+i));
            }
            // If all additional items are allowed
            else if(schema.additionalItems === true) {
              break;
            }
            // If additional items is a schema
            // TODO: Incompatibility between version 3 and 4 of the spec
            else if(schema.additionalItems) {
              errors = errors.concat(this._validateSchema(schema.additionalItems,value[i],path+'.'+i));
            }
            // If no additional items are allowed
            else if(schema.additionalItems === false) {
              errors.push({
                path: path,
                property: 'additionalItems',
                message: this.translate('error_additionalItems')
              });
              break;
            }
            // Default for `additionalItems` is an empty schema
            else {
              break;
            }
          }
        }
        // `items` is a schema
        else {
          // Each item in the array must validate against the schema
          for(i=0; i<value.length; i++) {
            errors = errors.concat(this._validateSchema(schema.items,value[i],path+'.'+i));
          }
        }
      }

      // `maxItems`
      if(schema.maxItems) {
        if(value.length > schema.maxItems) {
          errors.push({
            path: path,
            property: 'maxItems',
            message: this.translate('error_maxItems', [schema.maxItems])
          });
        }
      }

      // `minItems`
      if(schema.minItems) {
        if(value.length < schema.minItems) {
          errors.push({
            path: path,
            property: 'minItems',
            message: this.translate('error_minItems', [schema.minItems])
          });
        }
      }

      // `uniqueItems`
      if(schema.uniqueItems) {
        var seen = {};
        for(i=0; i<value.length; i++) {
          valid = JSON.stringify(value[i]);
          if(seen[valid]) {
            errors.push({
              path: path,
              property: 'uniqueItems',
              message: this.translate('error_uniqueItems')
            });
            break;
          }
          seen[valid] = true;
        }
      }
    }
    // Object specific validation
    else if(typeof value === "object" && value !== null) {
      // `maxProperties`
      if(schema.maxProperties) {
        valid = 0;
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          valid++;
        }
        if(valid > schema.maxProperties) {
          errors.push({
            path: path,
            property: 'maxProperties',
            message: this.translate('error_maxProperties', [schema.maxProperties])
          });
        }
      }

      // `minProperties`
      if(schema.minProperties) {
        valid = 0;
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          valid++;
        }
        if(valid < schema.minProperties) {
          errors.push({
            path: path,
            property: 'minProperties',
            message: this.translate('error_minProperties', [schema.minProperties])
          });
        }
      }

      // Version 4 `required`
      if(schema.required && Array.isArray(schema.required)) {
        for(i=0; i<schema.required.length; i++) {
          if(typeof value[schema.required[i]] === "undefined") {
            errors.push({
              path: path,
              property: 'required',
              message: this.translate('error_required', [schema.required[i]])
            });
          }
        }
      }

      // `properties`
      var validated_properties = {};
      if(schema.properties) {
        for(i in schema.properties) {
          if(!schema.properties.hasOwnProperty(i)) continue;
          validated_properties[i] = true;
          errors = errors.concat(this._validateSchema(schema.properties[i],value[i],path+'.'+i));
        }
      }

      // `patternProperties`
      if(schema.patternProperties) {
        for(i in schema.patternProperties) {
          if(!schema.patternProperties.hasOwnProperty(i)) continue;

          var regex = new RegExp(i);

          // Check which properties match
          for(j in value) {
            if(!value.hasOwnProperty(j)) continue;
            if(regex.test(j)) {
              validated_properties[j] = true;
              errors = errors.concat(this._validateSchema(schema.patternProperties[i],value[j],path+'.'+j));
            }
          }
        }
      }

      // The no_additional_properties option currently doesn't work with extended schemas that use oneOf or anyOf
      if(typeof schema.additionalProperties === "undefined" && this.jsoneditor.options.no_additional_properties && !schema.oneOf && !schema.anyOf) {
        schema.additionalProperties = false;
      }

      // `additionalProperties`
      if(typeof schema.additionalProperties !== "undefined") {
        for(i in value) {
          if(!value.hasOwnProperty(i)) continue;
          if(!validated_properties[i]) {
            // No extra properties allowed
            if(!schema.additionalProperties) {
              errors.push({
                path: path,
                property: 'additionalProperties',
                message: this.translate('error_additional_properties', [i])
              });
              break;
            }
            // Allowed
            else if(schema.additionalProperties === true) {
              break;
            }
            // Must match schema
            // TODO: incompatibility between version 3 and 4 of the spec
            else {
              errors = errors.concat(this._validateSchema(schema.additionalProperties,value[i],path+'.'+i));
            }
          }
        }
      }

      // `dependencies`
      if(schema.dependencies) {
        for(i in schema.dependencies) {
          if(!schema.dependencies.hasOwnProperty(i)) continue;

          // Doesn't need to meet the dependency
          if(typeof value[i] === "undefined") continue;

          // Property dependency
          if(Array.isArray(schema.dependencies[i])) {
            for(j=0; j<schema.dependencies[i].length; j++) {
              if(typeof value[schema.dependencies[i][j]] === "undefined") {
                errors.push({
                  path: path,
                  property: 'dependencies',
                  message: this.translate('error_dependency', [schema.dependencies[i][j]])
                });
              }
            }
          }
          // Schema dependency
          else {
            errors = errors.concat(this._validateSchema(schema.dependencies[i],value,path));
          }
        }
      }
    }

    // Custom type validation (global)
    $each(JSONEditor.defaults.custom_validators,function(i,validator) {
      errors = errors.concat(validator.call(self,schema,value,path));
    });
    // Custom type validation (instance specific)
    if(this.options.custom_validators) {
      $each(this.options.custom_validators,function(i,validator) {
        errors = errors.concat(validator.call(self,schema,value,path));
      });
    }

    return errors;
  },
  _checkType: function(type, value) {
    // Simple types
    if(typeof type === "string") {
      if(type==="string") return typeof value === "string";
      else if(type==="number") return typeof value === "number";
      else if(type==="integer") return typeof value === "number" && value === Math.floor(value);
      else if(type==="boolean") return typeof value === "boolean";
      else if(type==="array") return Array.isArray(value);
      else if(type === "object") return value !== null && !(Array.isArray(value)) && typeof value === "object";
      else if(type === "null") return value === null;
      else return true;
    }
    // Schema
    else {
      return !this._validateSchema(type,value).length;
    }
  }
});

/**
 * All editors should extend from this class
 */
JSONEditor.AbstractEditor = Class.extend({
  onChildEditorChange: function(editor) {
    this.onChange(true);
  },
  notify: function() {
    this.jsoneditor.notifyWatchers(this.path);
  },
  change: function() {
    if(this.parent) this.parent.onChildEditorChange(this);
    else this.jsoneditor.onChange();
  },
  onChange: function(bubble) {
    this.notify();
    if(this.watch_listener) this.watch_listener();
    if(bubble) this.change();
  },
  register: function() {
    this.jsoneditor.registerEditor(this);
    this.onChange();
  },
  unregister: function() {
    if(!this.jsoneditor) return;
    this.jsoneditor.unregisterEditor(this);
  },
  getNumColumns: function() {
    return 12;
  },
  init: function(options) {
    this.jsoneditor = options.jsoneditor;

    this.theme = this.jsoneditor.theme;
    this.template_engine = this.jsoneditor.template;
    this.iconlib = this.jsoneditor.iconlib;

    this.translate = this.jsoneditor.translate || JSONEditor.defaults.translate;

    this.original_schema = options.schema;
    this.schema = this.jsoneditor.expandSchema(this.original_schema);

    this.options = $extend({}, (this.options || {}), (options.schema.options || {}), options);

    if(!options.path && !this.schema.id) this.schema.id = 'root';
    this.path = options.path || 'root';
    this.formname = options.formname || this.path.replace(/\.([^.]+)/g,'[$1]');
    if(this.jsoneditor.options.form_name_root) this.formname = this.formname.replace(/^root\[/,this.jsoneditor.options.form_name_root+'[');
    this.key = this.path.split('.').pop();
    this.parent = options.parent;

    this.link_watchers = [];

    if(options.container) this.setContainer(options.container);
  },
  setContainer: function(container) {
    this.container = container;
    if(this.schema.id) this.container.setAttribute('data-schemaid',this.schema.id);
    if(this.schema.type && typeof this.schema.type === "string") this.container.setAttribute('data-schematype',this.schema.type);
    this.container.setAttribute('data-schemapath',this.path);
  },

  preBuild: function() {

  },
  build: function() {

  },
  postBuild: function() {
    this.setupWatchListeners();
    this.addLinks();
    this.setValue(this.getDefault(), true);
    this.updateHeaderText();
    this.register();
    this.onWatchedFieldChange();
  },

  setupWatchListeners: function() {
    var self = this;

    // Watched fields
    this.watched = {};
    if(this.schema.vars) this.schema.watch = this.schema.vars;
    this.watched_values = {};
    this.watch_listener = function() {
      if(self.refreshWatchedFieldValues()) {
        self.onWatchedFieldChange();
      }
    };

    this.register();
    if(this.schema.hasOwnProperty('watch')) {
      var path,path_parts,first,root,adjusted_path;

      for(var name in this.schema.watch) {
        if(!this.schema.watch.hasOwnProperty(name)) continue;
        path = this.schema.watch[name];

        if(Array.isArray(path)) {
          if(path.length<2) continue;
          path_parts = [path[0]].concat(path[1].split('.'));
        }
        else {
          path_parts = path.split('.');
          if(!self.theme.closest(self.container,'[data-schemaid="'+path_parts[0]+'"]')) path_parts.unshift('#');
        }
        first = path_parts.shift();

        if(first === '#') first = self.jsoneditor.schema.id || 'root';

        // Find the root node for this template variable
        root = self.theme.closest(self.container,'[data-schemaid="'+first+'"]');
        if(!root) throw "Could not find ancestor node with id "+first;

        // Keep track of the root node and path for use when rendering the template
        adjusted_path = root.getAttribute('data-schemapath') + '.' + path_parts.join('.');

        self.jsoneditor.watch(adjusted_path,self.watch_listener);

        self.watched[name] = adjusted_path;
      }
    }

    // Dynamic header
    if(this.schema.headerTemplate) {
      this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine);
    }
  },

  addLinks: function() {
    // Add links
    if(!this.no_link_holder) {
      this.link_holder = this.theme.getLinksHolder();
      this.container.appendChild(this.link_holder);
      if(this.schema.links) {
        for(var i=0; i<this.schema.links.length; i++) {
          this.addLink(this.getLink(this.schema.links[i]));
        }
      }
    }
  },


  getButton: function(text, icon, title) {
    var btnClass = 'json-editor-btn-'+icon;
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);

    if(!icon && title) {
      text = title;
      title = null;
    }

    var btn = this.theme.getButton(text, icon, title);
    btn.className += ' ' + btnClass + ' ';
    return btn;
  },
  setButtonText: function(button, text, icon, title) {
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);

    if(!icon && title) {
      text = title;
      title = null;
    }

    return this.theme.setButtonText(button, text, icon, title);
  },
  addLink: function(link) {
    if(this.link_holder) this.link_holder.appendChild(link);
  },
  getLink: function(data) {
    var holder, link;

    // Get mime type of the link
    var mime = data.mediaType || 'application/javascript';
    var type = mime.split('/')[0];

    // Template to generate the link href
    var href = this.jsoneditor.compileTemplate(data.href,this.template_engine);

    // Template to generate the link's download attribute
    var download = null;
    if(data.download) download = data.download;

    if(download && download !== true) {
      download = this.jsoneditor.compileTemplate(download, this.template_engine);
    }

    // Image links
    if(type === 'image') {
      holder = this.theme.getBlockLinkHolder();
      link = document.createElement('a');
      link.setAttribute('target','_blank');
      var image = document.createElement('img');

      this.theme.createImageLink(holder,link,image);

      // When a watched field changes, update the url
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url);
        link.setAttribute('title',data.rel || url);
        image.setAttribute('src',url);
      });
    }
    // Audio/Video links
    else if(['audio','video'].indexOf(type) >=0) {
      holder = this.theme.getBlockLinkHolder();

      link = this.theme.getBlockLink();
      link.setAttribute('target','_blank');

      var media = document.createElement(type);
      media.setAttribute('controls','controls');

      this.theme.createMediaLink(holder,link,media);

      // When a watched field changes, update the url
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url);
        link.textContent = data.rel || url;
        media.setAttribute('src',url);
      });
    }
    // Text links
    else {
      link = holder = this.theme.getBlockLink();
      holder.setAttribute('target','_blank');
      holder.textContent = data.rel;

      // When a watched field changes, update the url
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        holder.setAttribute('href',url);
        holder.textContent = data.rel || url;
      });
    }

    if(download && link) {
      if(download === true) {
        link.setAttribute('download','');
      }
      else {
        this.link_watchers.push(function(vars) {
          link.setAttribute('download',download(vars));
        });
      }
    }

    if(data.class) link.className = link.className + ' ' + data.class;

    return holder;
  },
  refreshWatchedFieldValues: function() {
    if(!this.watched_values) return;
    var watched = {};
    var changed = false;
    var self = this;

    if(this.watched) {
      var val,editor;
      for(var name in this.watched) {
        if(!this.watched.hasOwnProperty(name)) continue;
        editor = self.jsoneditor.getEditor(this.watched[name]);
        val = editor? editor.getValue() : null;
        if(self.watched_values[name] !== val) changed = true;
        watched[name] = val;
      }
    }

    watched.self = this.getValue();
    if(this.watched_values.self !== watched.self) changed = true;

    this.watched_values = watched;

    return changed;
  },
  getWatchedFieldValues: function() {
    return this.watched_values;
  },
  updateHeaderText: function() {
    if(this.header) {
      // If the header has children, only update the text node's value
      if(this.header.children.length) {
        for(var i=0; i<this.header.childNodes.length; i++) {
          if(this.header.childNodes[i].nodeType===3) {
            this.header.childNodes[i].nodeValue = this.getHeaderText();
            break;
          }
        }
      }
      // Otherwise, just update the entire node
      else {
        this.header.textContent = this.getHeaderText();
      }
    }
  },
  getHeaderText: function(title_only) {
    if(this.header_text) return this.header_text;
    else if(title_only) return this.schema.title;
    else return this.getTitle();
  },
  onWatchedFieldChange: function() {
    var vars;
    if(this.header_template) {
      vars = $extend(this.getWatchedFieldValues(),{
        key: this.key,
        i: this.key,
        i0: (this.key*1),
        i1: (this.key*1+1),
        title: this.getTitle()
      });
      var header_text = this.header_template(vars);

      if(header_text !== this.header_text) {
        this.header_text = header_text;
        this.updateHeaderText();
        this.notify();
        //this.fireChangeHeaderEvent();
      }
    }
    if(this.link_watchers.length) {
      vars = this.getWatchedFieldValues();
      for(var i=0; i<this.link_watchers.length; i++) {
        this.link_watchers[i](vars);
      }
    }
  },
  setValue: function(value) {
    this.value = value;
  },
  getValue: function() {
    return this.value;
  },
  refreshValue: function() {

  },
  getChildEditors: function() {
    return false;
  },
  destroy: function() {
    var self = this;
    this.unregister(this);
    $each(this.watched,function(name,adjusted_path) {
      self.jsoneditor.unwatch(adjusted_path,self.watch_listener);
    });
    this.watched = null;
    this.watched_values = null;
    this.watch_listener = null;
    this.header_text = null;
    this.header_template = null;
    this.value = null;
    if(this.container && this.container.parentNode) this.container.parentNode.removeChild(this.container);
    this.container = null;
    this.jsoneditor = null;
    this.schema = null;
    this.path = null;
    this.key = null;
    this.parent = null;
  },
  getDefault: function() {
    if(this.schema["default"]) return this.schema["default"];
    if(this.schema["enum"]) return this.schema["enum"][0];

    var type = this.schema.type || this.schema.oneOf;
    if(type && Array.isArray(type)) type = type[0];
    if(type && typeof type === "object") type = type.type;
    if(type && Array.isArray(type)) type = type[0];

    if(typeof type === "string") {
      if(type === "number") return 0.0;
      if(type === "boolean") return false;
      if(type === "integer") return 0;
      if(type === "string") return "";
      if(type === "object") return {};
      if(type === "array") return [];
    }

    return null;
  },
  getTitle: function() {
    return this.schema.title || this.key;
  },
  enable: function() {
    this.disabled = false;
  },
  disable: function() {
    this.disabled = true;
  },
  isEnabled: function() {
    return !this.disabled;
  },
  isRequired: function() {
    if(typeof this.schema.required === "boolean") return this.schema.required;
    else if(this.parent && this.parent.schema && Array.isArray(this.parent.schema.required)) return this.parent.schema.required.indexOf(this.key) > -1;
    else if(this.jsoneditor.options.required_by_default) return true;
    else return false;
  },
  getDisplayText: function(arr) {
    var disp = [];
    var used = {};

    // Determine how many times each attribute name is used.
    // This helps us pick the most distinct display text for the schemas.
    $each(arr,function(i,el) {
      if(el.title) {
        used[el.title] = used[el.title] || 0;
        used[el.title]++;
      }
      if(el.description) {
        used[el.description] = used[el.description] || 0;
        used[el.description]++;
      }
      if(el.format) {
        used[el.format] = used[el.format] || 0;
        used[el.format]++;
      }
      if(el.type) {
        used[el.type] = used[el.type] || 0;
        used[el.type]++;
      }
    });

    // Determine display text for each element of the array
    $each(arr,function(i,el)  {
      var name;

      // If it's a simple string
      if(typeof el === "string") name = el;
      // Object
      else if(el.title && used[el.title]<=1) name = el.title;
      else if(el.format && used[el.format]<=1) name = el.format;
      else if(el.type && used[el.type]<=1) name = el.type;
      else if(el.description && used[el.description]<=1) name = el.descripton;
      else if(el.title) name = el.title;
      else if(el.format) name = el.format;
      else if(el.type) name = el.type;
      else if(el.description) name = el.description;
      else if(JSON.stringify(el).length < 50) name = JSON.stringify(el);
      else name = "type";

      disp.push(name);
    });

    // Replace identical display text with "text 1", "text 2", etc.
    var inc = {};
    $each(disp,function(i,name) {
      inc[name] = inc[name] || 0;
      inc[name]++;

      if(used[name] > 1) disp[i] = name + " " + inc[name];
    });

    return disp;
  },
  getOption: function(key) {
    try {
      throw "getOption is deprecated";
    }
    catch(e) {
      window.console.error(e);
    }

    return this.options[key];
  },
  showValidationErrors: function(errors) {

  }
});

JSONEditor.defaults.editors["null"] = JSONEditor.AbstractEditor.extend({
  getValue: function() {
    return null;
  },
  setValue: function() {
    this.onChange();
  },
  getNumColumns: function() {
    return 2;
  }
});

JSONEditor.defaults.editors.string = JSONEditor.AbstractEditor.extend({
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  setValue: function(value,initial,from_template) {
    var self = this;

    if(this.template && !from_template) {
      return;
    }

    if(value === null || typeof value === 'undefined') value = "";
    else if(typeof value === "object") value = JSON.stringify(value);
    else if(typeof value !== "string") value = ""+value;

    if(value === this.serialized) return;

    // Sanitize value before setting it
    var sanitized = this.sanitize(value);

    if(this.input.value === sanitized) {
      return;
    }

    this.input.value = sanitized;

    // If using SCEditor, update the WYSIWYG
    if(this.sceditor_instance) {
      this.sceditor_instance.val(sanitized);
    }
    else if(this.epiceditor) {
      this.epiceditor.importFile(null,sanitized);
    }
    else if(this.ace_editor) {
      this.ace_editor.setValue(sanitized);
    }

    var changed = from_template || this.getValue() !== value;

    this.refreshValue();

    if(initial) this.is_dirty = false;
    else if(this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

    if(this.adjust_height) this.adjust_height(this.input);

    // Bubble this setValue to parents if the value changed
    this.onChange(changed);
  },
  getNumColumns: function() {
    var min = Math.ceil(Math.max(this.getTitle().length,this.schema.maxLength||0,this.schema.minLength||0)/5);
    var num;

    if(this.input_type === 'textarea') num = 6;
    else if(['text','email'].indexOf(this.input_type) >= 0) num = 4;
    else num = 2;

    return Math.min(12,Math.max(min,num));
  },
  build: function() {
    var self = this, i;
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    this.format = this.schema.format;
    if(!this.format && this.schema.media && this.schema.media.type) {
      this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,'');
    }
    if(!this.format && this.options.default_format) {
      this.format = this.options.default_format;
    }
    if(this.options.format) {
      this.format = this.options.format;
    }

    // Specific format
    if(this.format) {
      // Text Area
      if(this.format === 'textarea') {
        this.input_type = 'textarea';
        this.input = this.theme.getTextareaInput();
      }
      // Range Input
      else if(this.format === 'range') {
        this.input_type = 'range';
        var min = this.schema.minimum || 0;
        var max = this.schema.maximum || Math.max(100,min+1);
        var step = 1;
        if(this.schema.multipleOf) {
          if(min%this.schema.multipleOf) min = Math.ceil(min/this.schema.multipleOf)*this.schema.multipleOf;
          if(max%this.schema.multipleOf) max = Math.floor(max/this.schema.multipleOf)*this.schema.multipleOf;
          step = this.schema.multipleOf;
        }

        this.input = this.theme.getRangeInput(min,max,step);
      }
      // Source Code
      else if([
          'actionscript',
          'batchfile',
          'bbcode',
          'c',
          'c++',
          'cpp',
          'coffee',
          'csharp',
          'css',
          'dart',
          'django',
          'ejs',
          'erlang',
          'golang',
          'groovy',
          'handlebars',
          'haskell',
          'haxe',
          'html',
          'ini',
          'jade',
          'java',
          'javascript',
          'json',
          'less',
          'lisp',
          'lua',
          'makefile',
          'markdown',
          'matlab',
          'mysql',
          'objectivec',
          'pascal',
          'perl',
          'pgsql',
          'php',
          'python',
          'r',
          'ruby',
          'sass',
          'scala',
          'scss',
          'smarty',
          'sql',
          'stylus',
          'svg',
          'twig',
          'vbscript',
          'xml',
          'yaml'
        ].indexOf(this.format) >= 0
      ) {
        this.input_type = this.format;
        this.source_code = true;

        this.input = this.theme.getTextareaInput();
      }
      // HTML5 Input type
      else {
        this.input_type = this.format;
        this.input = this.theme.getFormInputField(this.input_type);
      }
    }
    // Normal text input
    else {
      this.input_type = 'text';
      this.input = this.theme.getFormInputField(this.input_type);
    }

    // minLength, maxLength, and pattern
    if(typeof this.schema.maxLength !== "undefined") this.input.setAttribute('maxlength',this.schema.maxLength);
    if(typeof this.schema.pattern !== "undefined") this.input.setAttribute('pattern',this.schema.pattern);
    else if(typeof this.schema.minLength !== "undefined") this.input.setAttribute('pattern','.{'+this.schema.minLength+',}');

    if(this.options.compact) {
      this.container.className += ' compact';
    }
    else {
      if(this.options.input_width) this.input.style.width = this.options.input_width;
    }

    if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input
      .addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Don't allow changing if this field is a template
        if(self.schema.template) {
          this.value = self.value;
          return;
        }

        var val = this.value;

        // sanitize value
        var sanitized = self.sanitize(val);
        if(val !== sanitized) {
          this.value = sanitized;
        }

        self.is_dirty = true;

        self.refreshValue();
        self.onChange(true);
      });

    if(this.options.input_height) this.input.style.height = this.options.input_height;
    if(this.options.expand_height) {
      this.adjust_height = function(el) {
        if(!el) return;
        var i, ch=el.offsetHeight;
        // Input too short
        if(el.offsetHeight < el.scrollHeight) {
          i=0;
          while(el.offsetHeight < el.scrollHeight+3) {
            if(i>100) break;
            i++;
            ch++;
            el.style.height = ch+'px';
          }
        }
        else {
          i=0;
          while(el.offsetHeight >= el.scrollHeight+3) {
            if(i>100) break;
            i++;
            ch--;
            el.style.height = ch+'px';
          }
          el.style.height = (ch+1)+'px';
        }
      };

      this.input.addEventListener('keyup',function(e) {
        self.adjust_height(this);
      });
      this.input.addEventListener('change',function(e) {
        self.adjust_height(this);
      });
      this.adjust_height();
    }

    if(this.format) this.input.setAttribute('data-schemaformat',this.format);

    this.control = this.theme.getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function() {
      // Skip in case the input is only a temporary editor,
      // otherwise, in the case of an ace_editor creation,
      // it will generate an error trying to append it to the missing parentNode
      if(self.input.parentNode) self.afterInputReady();
      if(self.adjust_height) self.adjust_height(self.input);
    });

    // Compile and store the template
    if(this.schema.template) {
      this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine);
      this.refreshValue();
    }
    else {
      this.refreshValue();
    }
  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
      // TODO: WYSIWYG and Markdown editors
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    // TODO: WYSIWYG and Markdown editors
    this._super();
  },
  afterInputReady: function() {
    var self = this, options;

    // Code editor
    if(this.source_code) {
      // WYSIWYG html and bbcode editor
      if(this.options.wysiwyg &&
        ['html','bbcode'].indexOf(this.input_type) >= 0 &&
        window.jQuery && window.jQuery.fn && window.jQuery.fn.sceditor
      ) {
        options = $extend({},{
          plugins: self.input_type==='html'? 'xhtml' : 'bbcode',
          emoticonsEnabled: false,
          width: '100%',
          height: 300
        },JSONEditor.plugins.sceditor,self.options.sceditor_options||{});

        window.jQuery(self.input).sceditor(options);

        self.sceditor_instance = window.jQuery(self.input).sceditor('instance');

        self.sceditor_instance.blur(function() {
          // Get editor's value
          var val = window.jQuery("<div>"+self.sceditor_instance.val()+"</div>");
          // Remove sceditor spans/divs
          window.jQuery('#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf',val).remove();
          // Set the value and update
          self.input.value = val.html();
          self.value = self.input.value;
          self.is_dirty = true;
          self.onChange(true);
        });
      }
      // EpicEditor for markdown (if it's loaded)
      else if (this.input_type === 'markdown' && window.EpicEditor) {
        this.epiceditor_container = document.createElement('div');
        this.input.parentNode.insertBefore(this.epiceditor_container,this.input);
        this.input.style.display = 'none';

        options = $extend({},JSONEditor.plugins.epiceditor,{
          container: this.epiceditor_container,
          clientSideStorage: false
        });

        this.epiceditor = new window.EpicEditor(options).load();

        this.epiceditor.importFile(null,this.getValue());

        this.epiceditor.on('update',function() {
          var val = self.epiceditor.exportFile();
          self.input.value = val;
          self.value = val;
          self.is_dirty = true;
          self.onChange(true);
        });
      }
      // ACE editor for everything else
      else if(window.ace) {
        var mode = this.input_type;
        // aliases for c/cpp
        if(mode === 'cpp' || mode === 'c++' || mode === 'c') {
          mode = 'c_cpp';
        }

        this.ace_container = document.createElement('div');
        this.ace_container.style.width = '100%';
        this.ace_container.style.position = 'relative';
        this.ace_container.style.height = '400px';
        this.input.parentNode.insertBefore(this.ace_container,this.input);
        this.input.style.display = 'none';
        this.ace_editor = window.ace.edit(this.ace_container);

        this.ace_editor.setValue(this.getValue());

        // The theme
        if(JSONEditor.plugins.ace.theme) this.ace_editor.setTheme('ace/theme/'+JSONEditor.plugins.ace.theme);
        // The mode
        mode = window.ace.require("ace/mode/"+mode);
        if(mode) this.ace_editor.getSession().setMode(new mode.Mode());

        // Listen for changes
        this.ace_editor.on('change',function() {
          var val = self.ace_editor.getValue();
          self.input.value = val;
          self.refreshValue();
          self.is_dirty = true;
          self.onChange(true);
        });
      }
    }

    self.theme.afterInputReady(self.input);
  },
  refreshValue: function() {
    this.value = this.input.value;
    if(typeof this.value !== "string") this.value = '';
    this.serialized = this.value;
  },
  destroy: function() {
    // If using SCEditor, destroy the editor instance
    if(this.sceditor_instance) {
      this.sceditor_instance.destroy();
    }
    else if(this.epiceditor) {
      this.epiceditor.unload();
    }
    else if(this.ace_editor) {
      this.ace_editor.destroy();
    }


    this.template = null;
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);

    this._super();
  },
  /**
   * This is overridden in derivative editors
   */
  sanitize: function(value) {
    return value;
  },
  /**
   * Re-calculates the value if needed
   */
  onWatchedFieldChange: function() {
    var self = this, vars, j;

    // If this editor needs to be rendered by a macro template
    if(this.template) {
      vars = this.getWatchedFieldValues();
      this.setValue(this.template(vars),false,true);
    }

    this._super();
  },
  showValidationErrors: function(errors) {
    var self = this;

    if(this.jsoneditor.options.show_errors === "always") {}
    else if(!this.is_dirty && this.previous_error_setting===this.jsoneditor.options.show_errors) return;

    this.previous_error_setting = this.jsoneditor.options.show_errors;

    var messages = [];
    $each(errors,function(i,error) {
      if(error.path === self.path) {
        messages.push(error.message);
      }
    });

    if(messages.length) {
      this.theme.addInputError(this.input, messages.join('. ')+'.');
    }
    else {
      this.theme.removeInputError(this.input);
    }
  }
});

JSONEditor.defaults.editors.number = JSONEditor.defaults.editors.string.extend({
  sanitize: function(value) {
    return (value+"").replace(/[^0-9\.\-eE]/g,'');
  },
  getNumColumns: function() {
    return 2;
  },
  getValue: function() {
    return this.value*1;
  }
});

JSONEditor.defaults.editors.integer = JSONEditor.defaults.editors.number.extend({
  sanitize: function(value) {
    value = value + "";
    return value.replace(/[^0-9\-]/g,'');
  },
  getNumColumns: function() {
    return 2;
  }
});

JSONEditor.defaults.editors.object = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return $extend({},this.schema["default"] || {});
  },
  getChildEditors: function() {
    return this.editors;
  },
  register: function() {
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    return Math.max(Math.min(12,this.maxwidth),3);
  },
  enable: function() {
    if(this.editjson_button) this.editjson_button.disabled = false;
    if(this.addproperty_button) this.addproperty_button.disabled = false;

    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].enable();
      }
    }
  },
  disable: function() {
    if(this.editjson_button) this.editjson_button.disabled = true;
    if(this.addproperty_button) this.addproperty_button.disabled = true;
    this.hideEditJSON();

    this._super();
    if(this.editors) {
      for(var i in this.editors) {
        if(!this.editors.hasOwnProperty(i)) continue;
        this.editors[i].disable();
      }
    }
  },
  layoutEditors: function() {
    var self = this, i, j;

    if(!this.row_container) return;

    // Sort editors by propertyOrder
    this.property_order = Object.keys(this.editors);
    this.property_order = this.property_order.sort(function(a,b) {
      var ordera = self.editors[a].schema.propertyOrder;
      var orderb = self.editors[b].schema.propertyOrder;
      if(typeof ordera !== "number") ordera = 1000;
      if(typeof orderb !== "number") orderb = 1000;

      return ordera - orderb;
    });

    var container;

    if(this.format === 'grid') {
      var rows = [];
      $each(this.property_order, function(j,key) {
        var editor = self.editors[key];
        if(editor.property_removed) return;
        var found = false;
        var width = editor.options.hidden? 0 : (editor.options.grid_columns || editor.getNumColumns());
        var height = editor.options.hidden? 0 : editor.container.offsetHeight;
        // See if the editor will fit in any of the existing rows first
        for(var i=0; i<rows.length; i++) {
          // If the editor will fit in the row horizontally
          if(rows[i].width + width <= 12) {
            // If the editor is close to the other elements in height
            // i.e. Don't put a really tall editor in an otherwise short row or vice versa
            if(!height || (rows[i].minh*0.5 < height && rows[i].maxh*2 > height)) {
              found = i;
            }
          }
        }

        // If there isn't a spot in any of the existing rows, start a new row
        if(found === false) {
          rows.push({
            width: 0,
            minh: 999999,
            maxh: 0,
            editors: []
          });
          found = rows.length-1;
        }

        rows[found].editors.push({
          key: key,
          //editor: editor,
          width: width,
          height: height
        });
        rows[found].width += width;
        rows[found].minh = Math.min(rows[found].minh,height);
        rows[found].maxh = Math.max(rows[found].maxh,height);
      });

      // Make almost full rows width 12
      // Do this by increasing all editors' sizes proprotionately
      // Any left over space goes to the biggest editor
      // Don't touch rows with a width of 6 or less
      for(i=0; i<rows.length; i++) {
        if(rows[i].width < 12) {
          var biggest = false;
          var new_width = 0;
          for(j=0; j<rows[i].editors.length; j++) {
            if(biggest === false) biggest = j;
            else if(rows[i].editors[j].width > rows[i].editors[biggest].width) biggest = j;
            rows[i].editors[j].width *= 12/rows[i].width;
            rows[i].editors[j].width = Math.floor(rows[i].editors[j].width);
            new_width += rows[i].editors[j].width;
          }
          if(new_width < 12) rows[i].editors[biggest].width += 12-new_width;
          rows[i].width = 12;
        }
      }

      // layout hasn't changed
      if(this.layout === JSON.stringify(rows)) return false;
      this.layout = JSON.stringify(rows);

      // Layout the form
      container = document.createElement('div');
      for(i=0; i<rows.length; i++) {
        var row = this.theme.getGridRow();
        container.appendChild(row);
        for(j=0; j<rows[i].editors.length; j++) {
          var key = rows[i].editors[j].key;
          var editor = this.editors[key];

          if(editor.options.hidden) editor.container.style.display = 'none';
          else this.theme.setGridColumnSize(editor.container,rows[i].editors[j].width);
          row.appendChild(editor.container);
        }
      }
    }
    // Normal layout
    else {
      container = document.createElement('div');
      $each(this.property_order, function(i,key) {
        var editor = self.editors[key];
        if(editor.property_removed) return;
        var row = self.theme.getGridRow();
        container.appendChild(row);

        if(editor.options.hidden) editor.container.style.display = 'none';
        else self.theme.setGridColumnSize(editor.container,12);
        row.appendChild(editor.container);
      });
    }
    this.row_container.innerHTML = '';
    this.row_container.appendChild(container);
  },
  getPropertySchema: function(key) {
    // Schema declared directly in properties
    var schema = this.schema.properties[key] || {};
    schema = $extend({},schema);
    var matched = this.schema.properties[key]? true : false;

    // Any matching patternProperties should be merged in
    if(this.schema.patternProperties) {
      for(var i in this.schema.patternProperties) {
        if(!this.schema.patternProperties.hasOwnProperty(i)) continue;
        var regex = new RegExp(i);
        if(regex.test(key)) {
          schema.allOf = schema.allOf || [];
          schema.allOf.push(this.schema.patternProperties[i]);
          matched = true;
        }
      }
    }

    // Hasn't matched other rules, use additionalProperties schema
    if(!matched && this.schema.additionalProperties && typeof this.schema.additionalProperties === "object") {
      schema = $extend({},this.schema.additionalProperties);
    }

    return schema;
  },
  preBuild: function() {
    this._super();

    this.editors = {};
    this.cached_editors = {};
    var self = this;

    this.format = this.options.layout || this.options.object_layout || this.schema.format || this.jsoneditor.options.object_layout || 'normal';

    this.schema.properties = this.schema.properties || {};

    this.minwidth = 0;
    this.maxwidth = 0;

    // If the object should be rendered as a table row
    if(this.options.table_row) {
      $each(this.schema.properties, function(key,schema) {
        var editor = self.jsoneditor.getEditorClass(schema);
        self.editors[key] = self.jsoneditor.createEditor(editor,{
          jsoneditor: self.jsoneditor,
          schema: schema,
          path: self.path+'.'+key,
          parent: self,
          compact: true,
          required: true
        });
        self.editors[key].preBuild();

        var width = self.editors[key].options.hidden? 0 : (self.editors[key].options.grid_columns || self.editors[key].getNumColumns());

        self.minwidth += width;
        self.maxwidth += width;
      });
      this.no_link_holder = true;
    }
    // If the object should be rendered as a table
    else if(this.options.table) {
      // TODO: table display format
      throw "Not supported yet";
    }
    // If the object should be rendered as a div
    else {
      if(!this.schema.defaultProperties) {
        if(this.jsoneditor.options.display_required_only || this.options.display_required_only) {
          this.schema.defaultProperties = [];
          $each(this.schema.properties, function(k,s) {
            if(self.isRequired({key: k, schema: s})) {
              self.schema.defaultProperties.push(k);
            }
          });
        }
        else {
          self.schema.defaultProperties = Object.keys(self.schema.properties);
        }
      }

      // Increase the grid width to account for padding
      self.maxwidth += 1;

      $each(this.schema.defaultProperties, function(i,key) {
        self.addObjectProperty(key, true);

        if(self.editors[key]) {
          self.minwidth = Math.max(self.minwidth,(self.editors[key].options.grid_columns || self.editors[key].getNumColumns()));
          self.maxwidth += (self.editors[key].options.grid_columns || self.editors[key].getNumColumns());
        }
      });
    }

    // Sort editors by propertyOrder
    this.property_order = Object.keys(this.editors);
    this.property_order = this.property_order.sort(function(a,b) {
      var ordera = self.editors[a].schema.propertyOrder;
      var orderb = self.editors[b].schema.propertyOrder;
      if(typeof ordera !== "number") ordera = 1000;
      if(typeof orderb !== "number") orderb = 1000;

      return ordera - orderb;
    });
  },
  build: function() {
    var self = this;

    // If the object should be rendered as a table row
    if(this.options.table_row) {
      this.editor_holder = this.container;
      $each(this.editors, function(key,editor) {
        var holder = self.theme.getTableCell();
        self.editor_holder.appendChild(holder);

        editor.setContainer(holder);
        editor.build();
        editor.postBuild();

        if(self.editors[key].options.hidden) {
          holder.style.display = 'none';
        }
        if(self.editors[key].options.input_width) {
          holder.style.width = self.editors[key].options.input_width;
        }
      });
    }
    // If the object should be rendered as a table
    else if(this.options.table) {
      // TODO: table display format
      throw "Not supported yet";
    }
    // If the object should be rendered as a div
    else {
      this.header = document.createElement('span');
      this.header.textContent = this.getTitle();
      this.title = this.theme.getHeader(this.header);
      this.container.appendChild(this.title);
      this.container.style.position = 'relative';

      // Edit JSON modal
      this.editjson_holder = this.theme.getModal();
      this.editjson_textarea = this.theme.getTextareaInput();
      this.editjson_textarea.style.height = '170px';
      this.editjson_textarea.style.width = '300px';
      this.editjson_textarea.style.display = 'block';
      this.editjson_save = this.getButton('Save','save','Save');
      this.editjson_save.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.saveJSON();
      });
      this.editjson_cancel = this.getButton('Cancel','cancel','Cancel');
      this.editjson_cancel.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.hideEditJSON();
      });
      this.editjson_holder.appendChild(this.editjson_textarea);
      this.editjson_holder.appendChild(this.editjson_save);
      this.editjson_holder.appendChild(this.editjson_cancel);

      // Manage Properties modal
      this.addproperty_holder = this.theme.getModal();
      this.addproperty_list = document.createElement('div');
      this.addproperty_list.style.width = '295px';
      this.addproperty_list.style.maxHeight = '160px';
      this.addproperty_list.style.padding = '5px 0';
      this.addproperty_list.style.overflowY = 'auto';
      this.addproperty_list.style.overflowX = 'hidden';
      this.addproperty_list.style.paddingLeft = '5px';
      this.addproperty_list.setAttribute('class', 'property-selector');
      this.addproperty_add = this.getButton('add','add','add');
      this.addproperty_input = this.theme.getFormInputField('text');
      this.addproperty_input.setAttribute('placeholder','Property name...');
      this.addproperty_input.style.width = '220px';
      this.addproperty_input.style.marginBottom = '0';
      this.addproperty_input.style.display = 'inline-block';
      this.addproperty_add.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        if(self.addproperty_input.value) {
          if(self.editors[self.addproperty_input.value]) {
            window.alert('there is already a property with that name');
            return;
          }

          self.addObjectProperty(self.addproperty_input.value);
          if(self.editors[self.addproperty_input.value]) {
            self.editors[self.addproperty_input.value].disable();
          }
          self.onChange(true);
        }
      });
      this.addproperty_holder.appendChild(this.addproperty_list);
      this.addproperty_holder.appendChild(this.addproperty_input);
      this.addproperty_holder.appendChild(this.addproperty_add);
      var spacer = document.createElement('div');
      spacer.style.clear = 'both';
      this.addproperty_holder.appendChild(spacer);


      // Description
      if(this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description);
        this.container.appendChild(this.description);
      }

      // Validation error placeholder area
      this.error_holder = document.createElement('div');
      this.container.appendChild(this.error_holder);

      // Container for child editor area
      this.editor_holder = this.theme.getIndentedPanel();
      this.container.appendChild(this.editor_holder);

      // Container for rows of child editors
      this.row_container = this.theme.getGridContainer();
      this.editor_holder.appendChild(this.row_container);

      $each(this.editors, function(key,editor) {
        var holder = self.theme.getGridColumn();
        self.row_container.appendChild(holder);

        editor.setContainer(holder);
        editor.build();
        editor.postBuild();
      });

      // Control buttons
      this.title_controls = this.theme.getHeaderButtonHolder();
      this.editjson_controls = this.theme.getHeaderButtonHolder();
      this.addproperty_controls = this.theme.getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      this.title.appendChild(this.editjson_controls);
      this.title.appendChild(this.addproperty_controls);

      // Show/Hide button
      this.collapsed = false;
      this.toggle_button = this.getButton('','collapse',this.translate('button_collapse'));
      this.title_controls.appendChild(this.toggle_button);
      this.toggle_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        if(self.collapsed) {
          self.editor_holder.style.display = '';
          self.collapsed = false;
          self.setButtonText(self.toggle_button,'','collapse',self.translate('button_collapse'));
        }
        else {
          self.editor_holder.style.display = 'none';
          self.collapsed = true;
          self.setButtonText(self.toggle_button,'','expand',self.translate('button_expand'));
        }
      });

      // If it should start collapsed
      if(this.options.collapsed) {
        $trigger(this.toggle_button,'click');
      }

      // Collapse button disabled
      if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
        if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
      }
      else if(this.jsoneditor.options.disable_collapse) {
        this.toggle_button.style.display = 'none';
      }

      // Edit JSON Button
      this.editjson_button = this.getButton('JSON','edit','Edit JSON');
      this.editjson_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.toggleEditJSON();
      });
      this.editjson_controls.appendChild(this.editjson_button);
      this.editjson_controls.appendChild(this.editjson_holder);

      // Edit JSON Buttton disabled
      if(this.schema.options && typeof this.schema.options.disable_edit_json !== "undefined") {
        if(this.schema.options.disable_edit_json) this.editjson_button.style.display = 'none';
      }
      else if(this.jsoneditor.options.disable_edit_json) {
        this.editjson_button.style.display = 'none';
      }

      // Object Properties Button
      this.addproperty_button = this.getButton('Properties','edit','Object Properties');
      this.addproperty_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.toggleAddProperty();
      });
      this.addproperty_controls.appendChild(this.addproperty_button);
      this.addproperty_controls.appendChild(this.addproperty_holder);
      this.refreshAddProperties();
    }

    // Fix table cell ordering
    if(this.options.table_row) {
      this.editor_holder = this.container;
      $each(this.property_order,function(i,key) {
        self.editor_holder.appendChild(self.editors[key].container);
      });
    }
    // Layout object editors in grid if needed
    else {
      // Initial layout
      this.layoutEditors();
      // Do it again now that we know the approximate heights of elements
      this.layoutEditors();
    }
  },
  showEditJSON: function() {
    if(!this.editjson_holder) return;
    this.hideAddProperty();

    // Position the form directly beneath the button
    // TODO: edge detection
    this.editjson_holder.style.left = this.editjson_button.offsetLeft+"px";
    this.editjson_holder.style.top = this.editjson_button.offsetTop + this.editjson_button.offsetHeight+"px";

    // Start the textarea with the current value
    this.editjson_textarea.value = JSON.stringify(this.getValue(),null,2);

    // Disable the rest of the form while editing JSON
    this.disable();

    this.editjson_holder.style.display = '';
    this.editjson_button.disabled = false;
    this.editing_json = true;
  },
  hideEditJSON: function() {
    if(!this.editjson_holder) return;
    if(!this.editing_json) return;

    this.editjson_holder.style.display = 'none';
    this.enable();
    this.editing_json = false;
  },
  saveJSON: function() {
    if(!this.editjson_holder) return;

    try {
      var json = JSON.parse(this.editjson_textarea.value);
      this.setValue(json);
      this.hideEditJSON();
    }
    catch(e) {
      window.alert('invalid JSON');
      throw e;
    }
  },
  toggleEditJSON: function() {
    if(this.editing_json) this.hideEditJSON();
    else this.showEditJSON();
  },
  insertPropertyControlUsingPropertyOrder: function (property, control, container) {
    var propertyOrder;
    if (this.schema.properties[property])
      propertyOrder = this.schema.properties[property].propertyOrder;
    if (typeof propertyOrder !== "number") propertyOrder = 1000;
    control.propertyOrder = propertyOrder;

    for (var i = 0; i < container.childNodes.length; i++) {
      var child = container.childNodes[i];
      if (control.propertyOrder < child.propertyOrder) {
        this.addproperty_list.insertBefore(control, child);
        control = null;
        break;
      }
    }
    if (control) {
      this.addproperty_list.appendChild(control);
    }
  },
  addPropertyCheckbox: function(key) {
    var self = this;
    var checkbox, label, labelText, control;

    checkbox = self.theme.getCheckbox();
    checkbox.style.width = 'auto';

    if (this.schema.properties[key] && this.schema.properties[key].title)
      labelText = this.schema.properties[key].title;
    else
      labelText = key;

    label = self.theme.getCheckboxLabel(labelText);

    control = self.theme.getFormControl(label,checkbox);
    control.style.paddingBottom = control.style.marginBottom = control.style.paddingTop = control.style.marginTop = 0;
    control.style.height = 'auto';
    //control.style.overflowY = 'hidden';

    this.insertPropertyControlUsingPropertyOrder(key, control, this.addproperty_list);

    checkbox.checked = key in this.editors;
    checkbox.addEventListener('change',function() {
      if(checkbox.checked) {
        self.addObjectProperty(key);
      }
      else {
        self.removeObjectProperty(key);
      }
      self.onChange(true);
    });
    self.addproperty_checkboxes[key] = checkbox;

    return checkbox;
  },
  showAddProperty: function() {
    if(!this.addproperty_holder) return;
    this.hideEditJSON();

    // Position the form directly beneath the button
    // TODO: edge detection
    this.addproperty_holder.style.left = this.addproperty_button.offsetLeft+"px";
    this.addproperty_holder.style.top = this.addproperty_button.offsetTop + this.addproperty_button.offsetHeight+"px";

    // Disable the rest of the form while editing JSON
    this.disable();

    this.adding_property = true;
    this.addproperty_button.disabled = false;
    this.addproperty_holder.style.display = '';
    this.refreshAddProperties();
  },
  hideAddProperty: function() {
    if(!this.addproperty_holder) return;
    if(!this.adding_property) return;

    this.addproperty_holder.style.display = 'none';
    this.enable();

    this.adding_property = false;
  },
  toggleAddProperty: function() {
    if(this.adding_property) this.hideAddProperty();
    else this.showAddProperty();
  },
  removeObjectProperty: function(property) {
    if(this.editors[property]) {
      this.editors[property].unregister();
      delete this.editors[property];

      this.refreshValue();
      this.layoutEditors();
    }
  },
  addObjectProperty: function(name, prebuild_only) {
    var self = this;

    // Property is already added
    if(this.editors[name]) return;

    // Property was added before and is cached
    if(this.cached_editors[name]) {
      this.editors[name] = this.cached_editors[name];
      if(prebuild_only) return;
      this.editors[name].register();
    }
    // New property
    else {
      if(!this.canHaveAdditionalProperties() && (!this.schema.properties || !this.schema.properties[name])) {
        return;
      }

      var schema = self.getPropertySchema(name);


      // Add the property
      var editor = self.jsoneditor.getEditorClass(schema);

      self.editors[name] = self.jsoneditor.createEditor(editor,{
        jsoneditor: self.jsoneditor,
        schema: schema,
        path: self.path+'.'+name,
        parent: self
      });
      self.editors[name].preBuild();

      if(!prebuild_only) {
        var holder = self.theme.getChildEditorHolder();
        self.editor_holder.appendChild(holder);
        self.editors[name].setContainer(holder);
        self.editors[name].build();
        self.editors[name].postBuild();
      }

      self.cached_editors[name] = self.editors[name];
    }

    // If we're only prebuilding the editors, don't refresh values
    if(!prebuild_only) {
      self.refreshValue();
      self.layoutEditors();
    }
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this._super(editor);
  },
  canHaveAdditionalProperties: function() {
    if (typeof this.schema.additionalProperties === "boolean") {
      return this.schema.additionalProperties;
    }
    return !this.jsoneditor.options.no_additional_properties;
  },
  destroy: function() {
    $each(this.cached_editors, function(i,el) {
      el.destroy();
    });
    if(this.editor_holder) this.editor_holder.innerHTML = '';
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.error_holder && this.error_holder.parentNode) this.error_holder.parentNode.removeChild(this.error_holder);

    this.editors = null;
    this.cached_editors = null;
    if(this.editor_holder && this.editor_holder.parentNode) this.editor_holder.parentNode.removeChild(this.editor_holder);
    this.editor_holder = null;

    this._super();
  },
  getValue: function() {
    var result = this._super();
    if(this.jsoneditor.options.remove_empty_properties || this.options.remove_empty_properties) {
      for(var i in result) {
        if(result.hasOwnProperty(i)) {
          if(!result[i]) delete result[i];
        }
      }
    }
    return result;
  },
  refreshValue: function() {
    this.value = {};
    var self = this;

    for(var i in this.editors) {
      if(!this.editors.hasOwnProperty(i)) continue;
      this.value[i] = this.editors[i].getValue();
    }

    if(this.adding_property) this.refreshAddProperties();
  },
  refreshAddProperties: function() {
    if(this.options.disable_properties || (this.options.disable_properties !== false && this.jsoneditor.options.disable_properties)) {
      this.addproperty_controls.style.display = 'none';
      return;
    }

    var can_add = false, can_remove = false, num_props = 0, i, show_modal = false;

    // Get number of editors
    for(i in this.editors) {
      if(!this.editors.hasOwnProperty(i)) continue;
      num_props++;
    }

    // Determine if we can add back removed properties
    can_add = this.canHaveAdditionalProperties() && !(typeof this.schema.maxProperties !== "undefined" && num_props >= this.schema.maxProperties);

    if(this.addproperty_checkboxes) {
      this.addproperty_list.innerHTML = '';
    }
    this.addproperty_checkboxes = {};

    // Check for which editors can't be removed or added back
    for(i in this.cached_editors) {
      if(!this.cached_editors.hasOwnProperty(i)) continue;

      this.addPropertyCheckbox(i);

      if(this.isRequired(this.cached_editors[i]) && i in this.editors) {
        this.addproperty_checkboxes[i].disabled = true;
      }

      if(typeof this.schema.minProperties !== "undefined" && num_props <= this.schema.minProperties) {
        this.addproperty_checkboxes[i].disabled = this.addproperty_checkboxes[i].checked;
        if(!this.addproperty_checkboxes[i].checked) show_modal = true;
      }
      else if(!(i in this.editors)) {
        if(!can_add  && !this.schema.properties.hasOwnProperty(i)) {
          this.addproperty_checkboxes[i].disabled = true;
        }
        else {
          this.addproperty_checkboxes[i].disabled = false;
          show_modal = true;
        }
      }
      else {
        show_modal = true;
        can_remove = true;
      }
    }

    if(this.canHaveAdditionalProperties()) {
      show_modal = true;
    }

    // Additional addproperty checkboxes not tied to a current editor
    for(i in this.schema.properties) {
      if(!this.schema.properties.hasOwnProperty(i)) continue;
      if(this.cached_editors[i]) continue;
      show_modal = true;
      this.addPropertyCheckbox(i);
    }

    // If no editors can be added or removed, hide the modal button
    if(!show_modal) {
      this.hideAddProperty();
      this.addproperty_controls.style.display = 'none';
    }
    // If additional properties are disabled
    else if(!this.canHaveAdditionalProperties()) {
      this.addproperty_add.style.display = 'none';
      this.addproperty_input.style.display = 'none';
    }
    // If no new properties can be added
    else if(!can_add) {
      this.addproperty_add.disabled = true;
    }
    // If new properties can be added
    else {
      this.addproperty_add.disabled = false;
    }
  },
  isRequired: function(editor) {
    if(typeof editor.schema.required === "boolean") return editor.schema.required;
    else if(Array.isArray(this.schema.required)) return this.schema.required.indexOf(editor.key) > -1;
    else if(this.jsoneditor.options.required_by_default) return true;
    else return false;
  },
  setValue: function(value, initial) {
    var self = this;
    value = value || {};

    if(typeof value !== "object" || Array.isArray(value)) value = {};

    // First, set the values for all of the defined properties
    $each(this.cached_editors, function(i,editor) {
      // Value explicitly set
      if(typeof value[i] !== "undefined") {
        self.addObjectProperty(i);
        editor.setValue(value[i],initial);
      }
      // Otherwise, remove value unless this is the initial set or it's required
      else if(!initial && !self.isRequired(editor)) {
        self.removeObjectProperty(i);
      }
      // Otherwise, set the value to the default
      else {
        editor.setValue(editor.getDefault(),initial);
      }
    });

    $each(value, function(i,val) {
      if(!self.cached_editors[i]) {
        self.addObjectProperty(i);
        if(self.editors[i]) self.editors[i].setValue(val,initial);
      }
    });

    this.refreshValue();
    this.layoutEditors();
    this.onChange();
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }

    // Show error for the table row if this is inside a table
    if(this.options.table_row) {
      if(my_errors.length) {
        this.theme.addTableRowError(this.container);
      }
      else {
        this.theme.removeTableRowError(this.container);
      }
    }

    // Show errors for child editors
    $each(this.editors, function(i,editor) {
      editor.showValidationErrors(other_errors);
    });
  }
});

JSONEditor.defaults.editors.array = JSONEditor.AbstractEditor.extend({
  getDefault: function() {
    return this.schema["default"] || [];
  },
  register: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    var info = this.getItemInfo(0);
    // Tabs require extra horizontal space
    if(this.tabs_holder) {
      return Math.max(Math.min(12,info.width+2),4);
    }
    else {
      return info.width;
    }
  },
  enable: function() {
    if(this.add_row_button) this.add_row_button.disabled = false;
    if(this.remove_all_rows_button) this.remove_all_rows_button.disabled = false;
    if(this.delete_last_row_button) this.delete_last_row_button.disabled = false;

    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].enable();

        if(this.rows[i].moveup_button) this.rows[i].moveup_button.disabled = false;
        if(this.rows[i].movedown_button) this.rows[i].movedown_button.disabled = false;
        if(this.rows[i].delete_button) this.rows[i].delete_button.disabled = false;
      }
    }
    this._super();
  },
  disable: function() {
    if(this.add_row_button) this.add_row_button.disabled = true;
    if(this.remove_all_rows_button) this.remove_all_rows_button.disabled = true;
    if(this.delete_last_row_button) this.delete_last_row_button.disabled = true;

    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].disable();

        if(this.rows[i].moveup_button) this.rows[i].moveup_button.disabled = true;
        if(this.rows[i].movedown_button) this.rows[i].movedown_button.disabled = true;
        if(this.rows[i].delete_button) this.rows[i].delete_button.disabled = true;
      }
    }
    this._super();
  },
  preBuild: function() {
    this._super();

    this.rows = [];
    this.row_cache = [];

    this.hide_delete_buttons = this.options.disable_array_delete || this.jsoneditor.options.disable_array_delete;
    this.hide_delete_all_rows_buttons = true; //this.hide_delete_buttons || this.options.disable_array_delete_all_rows || this.jsoneditor.options.disable_array_delete_all_rows; REB
    this.hide_delete_last_row_buttons = true; //this.hide_delete_buttons || this.options.disable_array_delete_last_row || this.jsoneditor.options.disable_array_delete_last_row; REB
    this.hide_move_buttons = this.options.disable_array_reorder || this.jsoneditor.options.disable_array_reorder;
    this.hide_add_button = this.options.disable_array_add || this.jsoneditor.options.disable_array_add;
  },
  build: function() {
    var self = this;

    if(!this.options.compact) {
      this.header = document.createElement('span');
      this.header.textContent = this.getTitle();
      this.title = this.theme.getHeader(this.header);
      this.container.appendChild(this.title);
      this.title_controls = this.theme.getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      if(this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description);
        this.container.appendChild(this.description);
      }
      this.error_holder = document.createElement('div');
      this.container.appendChild(this.error_holder);

      if(this.schema.format === 'tabs') {
        this.controls = this.theme.getHeaderButtonHolder();
        this.title.appendChild(this.controls);
        this.tabs_holder = this.theme.getTabHolder();
        this.container.appendChild(this.tabs_holder);
        this.row_holder = this.theme.getTabContentHolder(this.tabs_holder);

        this.active_tab = null;
      }
      else {
        this.panel = this.theme.getIndentedPanel();
        this.container.appendChild(this.panel);
        this.row_holder = document.createElement('div');
        this.panel.appendChild(this.row_holder);
        this.controls = this.theme.getButtonHolder();
        this.panel.appendChild(this.controls);
      }
    }
    else {
        this.panel = this.theme.getIndentedPanel();
        this.container.appendChild(this.panel);
        this.controls = this.theme.getButtonHolder();
        this.panel.appendChild(this.controls);
        this.row_holder = document.createElement('div');
        this.panel.appendChild(this.row_holder);
    }

    // Add controls
    this.addControls();
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this.refreshTabs(true);
    this._super(editor);
  },
  getItemTitle: function() {
    if(!this.item_title) {
      if(this.schema.items && !Array.isArray(this.schema.items)) {
        var tmp = this.jsoneditor.expandRefs(this.schema.items);
        this.item_title = tmp.title || 'item';
      }
      else {
        this.item_title = 'item';
      }
    }
    return this.item_title;
  },
  getItemSchema: function(i) {
    if(Array.isArray(this.schema.items)) {
      if(i >= this.schema.items.length) {
        if(this.schema.additionalItems===true) {
          return {};
        }
        else if(this.schema.additionalItems) {
          return $extend({},this.schema.additionalItems);
        }
      }
      else {
        return $extend({},this.schema.items[i]);
      }
    }
    else if(this.schema.items) {
      return $extend({},this.schema.items);
    }
    else {
      return {};
    }
  },
  getItemInfo: function(i) {
    var schema = this.getItemSchema(i);

    // Check if it's cached
    this.item_info = this.item_info || {};
    var stringified = JSON.stringify(schema);
    if(typeof this.item_info[stringified] !== "undefined") return this.item_info[stringified];

    // Get the schema for this item
    schema = this.jsoneditor.expandRefs(schema);

    this.item_info[stringified] = {
      title: schema.title || "item",
      'default': schema["default"],
      width: 12,
      child_editors: schema.properties || schema.items
    };

    return this.item_info[stringified];
  },
  getElementEditor: function(i) {
    var item_info = this.getItemInfo(i);
    var schema = this.getItemSchema(i);
    schema = this.jsoneditor.expandRefs(schema);
    schema.title = item_info.title+' '+(i+1);

    var editor = this.jsoneditor.getEditorClass(schema);

    var holder;
    if(this.tabs_holder) {
      holder = this.theme.getTabContent();
    }
    else if(item_info.child_editors) {
      holder = this.theme.getChildEditorHolder();
    }
    else {
      holder = this.theme.getIndentedPanel();
    }

    this.row_holder.appendChild(holder);

    var ret = this.jsoneditor.createEditor(editor,{
      jsoneditor: this.jsoneditor,
      schema: schema,
      container: holder,
      path: this.path+'.'+i,
      parent: this,
      required: true
    });
    ret.preBuild();
    ret.build();
    ret.postBuild();

    if(!ret.title_controls) {
      ret.array_controls = this.theme.getButtonHolder();
      holder.appendChild(ret.array_controls);
    }

    return ret;
  },
  destroy: function() {
    this.empty(true);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.row_holder && this.row_holder.parentNode) this.row_holder.parentNode.removeChild(this.row_holder);
    if(this.controls && this.controls.parentNode) this.controls.parentNode.removeChild(this.controls);
    if(this.panel && this.panel.parentNode) this.panel.parentNode.removeChild(this.panel);

    this.rows = this.row_cache = this.title = this.description = this.row_holder = this.panel = this.controls = null;

    this._super();
  },
  empty: function(hard) {
    if(!this.rows) return;
    var self = this;
    $each(this.rows,function(i,row) {
      if(hard) {
        if(row.tab && row.tab.parentNode) row.tab.parentNode.removeChild(row.tab);
        self.destroyRow(row,true);
        self.row_cache[i] = null;
      }
      self.rows[i] = null;
    });
    self.rows = [];
    if(hard) self.row_cache = [];
  },
  destroyRow: function(row,hard) {
    var holder = row.container;
    if(hard) {
      row.destroy();
      if(holder.parentNode) holder.parentNode.removeChild(holder);
      if(row.tab && row.tab.parentNode) row.tab.parentNode.removeChild(row.tab);
    }
    else {
      if(row.tab) row.tab.style.display = 'none';
      holder.style.display = 'none';
      row.unregister();
    }
  },
  getMax: function() {
    if((Array.isArray(this.schema.items)) && this.schema.additionalItems === false) {
      return Math.min(this.schema.items.length,this.schema.maxItems || Infinity);
    }
    else {
      return this.schema.maxItems || Infinity;
    }
  },
  refreshTabs: function(refresh_headers) {
    var self = this;
    $each(this.rows, function(i,row) {
      if(!row.tab) return;

      if(refresh_headers) {
        row.tab_text.textContent = row.getHeaderText();
      }
      else {
        if(row.tab === self.active_tab) {
          self.theme.markTabActive(row.tab);
          row.container.style.display = '';
        }
        else {
          self.theme.markTabInactive(row.tab);
          row.container.style.display = 'none';
        }
      }
    });
  },
  setValue: function(value, initial) {
    // Update the array's value, adding/removing rows when necessary
    value = value || [];

    if(!(Array.isArray(value))) value = [value];

    var serialized = JSON.stringify(value);
    if(serialized === this.serialized) return;

    // Make sure value has between minItems and maxItems items in it
    if(this.schema.minItems) {
      while(value.length < this.schema.minItems) {
        value.push(this.getItemInfo(value.length)["default"]);
      }
    }
    if(this.getMax() && value.length > this.getMax()) {
      value = value.slice(0,this.getMax());
    }

    var self = this;
    $each(value,function(i,val) {
      if(self.rows[i]) {
        // TODO: don't set the row's value if it hasn't changed
        self.rows[i].setValue(val,initial);
      }
      else if(self.row_cache[i]) {
        self.rows[i] = self.row_cache[i];
        self.rows[i].setValue(val,initial);
        self.rows[i].container.style.display = '';
        if(self.rows[i].tab) self.rows[i].tab.style.display = '';
        self.rows[i].register();
      }
      else {
        self.addRow(val,initial);
      }
    });

    for(var j=value.length; j<self.rows.length; j++) {
      self.destroyRow(self.rows[j]);
      self.rows[j] = null;
    }
    self.rows = self.rows.slice(0,value.length);

    // Set the active tab
    var new_active_tab = null;
    $each(self.rows, function(i,row) {
      if(row.tab === self.active_tab) {
        new_active_tab = row.tab;
        return false;
      }
    });
    if(!new_active_tab && self.rows.length) new_active_tab = self.rows[0].tab;

    self.active_tab = new_active_tab;

    self.refreshValue(initial);
    self.refreshTabs(true);
    self.refreshTabs();

    self.onChange();

    // TODO: sortable
  },
  refreshValue: function(force) {
    var self = this;
    var oldi = this.value? this.value.length : 0;
    this.value = [];

    $each(this.rows,function(i,editor) {
      // Get the value for this editor
      self.value[i] = editor.getValue();
    });

    if(oldi !== this.value.length || force) {
      // If we currently have minItems items in the array
      var minItems = this.schema.minItems && this.schema.minItems >= this.rows.length;

      $each(this.rows,function(i,editor) {
        // Hide the move down button for the last row
        if(editor.movedown_button) {
          if(i === self.rows.length - 1) {
            editor.movedown_button.style.display = 'none';
          }
          else {
            editor.movedown_button.style.display = '';
          }
        }

        // Hide the delete button if we have minItems items
        if(editor.delete_button) {
          if(minItems) {
            editor.delete_button.style.display = 'none';
          }
          else {
            editor.delete_button.style.display = '';
          }
        }

        // Get the value for this editor
        self.value[i] = editor.getValue();
      });

      var controls_needed = false;

      if(!this.value.length) {
        this.delete_last_row_button.style.display = 'none';
        this.remove_all_rows_button.style.display = 'none';
      }
      else if(this.value.length === 1) {
        this.remove_all_rows_button.style.display = 'none';

        // If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
        if(minItems || this.hide_delete_last_row_buttons) {
          this.delete_last_row_button.style.display = 'none';
        }
        else {
          this.delete_last_row_button.style.display = '';
          controls_needed = true;
        }
      }
      else {
        if(minItems || this.hide_delete_last_row_buttons) {
          this.delete_last_row_button.style.display = 'none';
        }
        else {
          this.delete_last_row_button.style.display = '';
          controls_needed = true;
        }

        if(minItems || this.hide_delete_all_rows_buttons) {
          this.remove_all_rows_button.style.display = 'none';
        }
        else {
          this.remove_all_rows_button.style.display = '';
          controls_needed = true;
        }
      }

      // If there are maxItems in the array, hide the add button beneath the rows
      if((this.getMax() && this.getMax() <= this.rows.length) || this.hide_add_button){
        this.add_row_button.style.display = 'none';
      }
      else {
        this.add_row_button.style.display = '';
        controls_needed = true;
      }

      if(!this.collapsed && controls_needed) {
        this.controls.style.display = 'inline-block';
      }
      else {
        this.controls.style.display = 'none';
      }
    }
  },
  addRow: function(value, initial) {
    var self = this;
    var i = this.rows.length;

    self.rows[i] = this.getElementEditor(i);
    self.row_cache[i] = self.rows[i];

    if(self.tabs_holder) {
      self.rows[i].tab_text = document.createElement('span');
      self.rows[i].tab_text.textContent = self.rows[i].getHeaderText();
      self.rows[i].tab = self.theme.getTab(self.rows[i].tab_text);
      self.rows[i].tab.addEventListener('click', function(e) {
        self.active_tab = self.rows[i].tab;
        self.refreshTabs();
        e.preventDefault();
        e.stopPropagation();
      });

      self.theme.addTab(self.tabs_holder, self.rows[i].tab);
    }

    var controls_holder = self.rows[i].title_controls || self.rows[i].array_controls;

    // Buttons to delete row, move row up, and move row down
    if(!self.hide_delete_buttons) {
      self.rows[i].delete_button = this.getButton('','delete',this.translate('button_delete_row_title',[self.getItemTitle()])); // REB
      self.rows[i].delete_button.className += ' delete';
      self.rows[i].delete_button.setAttribute('data-i',i);
      self.rows[i].delete_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;

        var value = self.getValue();

        var newval = [];
        var new_active_tab = null;
        $each(value,function(j,row) {
          if(j===i) {
            // If the one we're deleting is the active tab
            if(self.rows[j].tab === self.active_tab) {
              // Make the next tab active if there is one
              // Note: the next tab is going to be the current tab after deletion
              if(self.rows[j+1]) new_active_tab = self.rows[j].tab;
              // Otherwise, make the previous tab active if there is one
              else if(j) new_active_tab = self.rows[j-1].tab;
            }

            return; // If this is the one we're deleting
          }
          newval.push(row);
        });
        self.setValue(newval);
        if(new_active_tab) {
          self.active_tab = new_active_tab;
          self.refreshTabs();
        }

        self.onChange(true);
      });

      if(controls_holder) {
        controls_holder.appendChild(self.rows[i].delete_button);
      }
    }

    if(i && !self.hide_move_buttons) {
      self.rows[i].moveup_button = this.getButton('','moveup',this.translate('button_move_up_title'));
      self.rows[i].moveup_button.className += ' moveup';
      self.rows[i].moveup_button.setAttribute('data-i',i);
      self.rows[i].moveup_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;

        if(i<=0) return;
        var rows = self.getValue();
        var tmp = rows[i-1];
        rows[i-1] = rows[i];
        rows[i] = tmp;

        self.setValue(rows);
        self.active_tab = self.rows[i-1].tab;
        self.refreshTabs();

        self.onChange(true);
      });

      if(controls_holder) {
        controls_holder.appendChild(self.rows[i].moveup_button);
      }
    }

    if(!self.hide_move_buttons) {
      self.rows[i].movedown_button = this.getButton('','movedown',this.translate('button_move_down_title'));
      self.rows[i].movedown_button.className += ' movedown';
      self.rows[i].movedown_button.setAttribute('data-i',i);
      self.rows[i].movedown_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;

        var rows = self.getValue();
        if(i>=rows.length-1) return;
        var tmp = rows[i+1];
        rows[i+1] = rows[i];
        rows[i] = tmp;

        self.setValue(rows);
        self.active_tab = self.rows[i+1].tab;
        self.refreshTabs();
        self.onChange(true);
      });

      if(controls_holder) {
        controls_holder.appendChild(self.rows[i].movedown_button);
      }
    }

    if(value) self.rows[i].setValue(value, initial);
    self.refreshTabs();
  },
  addControls: function() {
    var self = this;

    this.collapsed = false;
    this.toggle_button = this.getButton('','collapse',this.translate('button_collapse'));
    this.title_controls.appendChild(this.toggle_button);
    var row_holder_display = self.row_holder.style.display;
    var controls_display = self.controls.style.display;
    this.toggle_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(self.collapsed) {
        self.collapsed = false;
        if(self.panel) self.panel.style.display = '';
        self.row_holder.style.display = row_holder_display;
        if(self.tabs_holder) self.tabs_holder.style.display = '';
        self.controls.style.display = controls_display;
        self.setButtonText(this,'','collapse',self.translate('button_collapse'));
      }
      else {
        self.collapsed = true;
        self.row_holder.style.display = 'none';
        if(self.tabs_holder) self.tabs_holder.style.display = 'none';
        self.controls.style.display = 'none';
        if(self.panel) self.panel.style.display = 'none';
        self.setButtonText(this,'','expand',self.translate('button_expand'));
      }
    });

    // If it should start collapsed
    if(this.options.collapsed) {
      $trigger(this.toggle_button,'click');
    }

    // Collapse button disabled
    if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
      if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
    }
    else if(this.jsoneditor.options.disable_collapse) {
      this.toggle_button.style.display = 'none';
    }

    // Add "new row" and "delete last" buttons below editor
    this.add_row_button = this.getButton('','add',this.translate('button_add_row_title',[this.getItemTitle()]));

    this.add_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      var i = self.rows.length;
      if(self.row_cache[i]) {
        self.rows[i] = self.row_cache[i];
        self.rows[i].setValue(self.rows[i].getDefault(), true);
        self.rows[i].container.style.display = '';
        if(self.rows[i].tab) self.rows[i].tab.style.display = '';
        self.rows[i].register();
      }
      else {
        self.addRow();
      }
      self.active_tab = self.rows[i].tab;
      self.refreshTabs();
      self.refreshValue();
      self.onChange(true);
    });
    self.controls.appendChild(this.add_row_button);

    this.delete_last_row_button = this.getButton(this.translate('button_delete_last',[this.getItemTitle()]),'delete',this.translate('button_delete_last_title',[this.getItemTitle()]));
    this.delete_last_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      var rows = self.getValue();

      var new_active_tab = null;
      if(self.rows.length > 1 && self.rows[self.rows.length-1].tab === self.active_tab) new_active_tab = self.rows[self.rows.length-2].tab;

      rows.pop();
      self.setValue(rows);
      if(new_active_tab) {
        self.active_tab = new_active_tab;
        self.refreshTabs();
      }
      self.onChange(true);
    });
    self.controls.appendChild(this.delete_last_row_button);

    this.remove_all_rows_button = this.getButton(this.translate('button_delete_all'),'delete',this.translate('button_delete_all_title'));
    this.remove_all_rows_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.setValue([]);
      self.onChange(true);
    });
    self.controls.appendChild(this.remove_all_rows_button);

    if(self.tabs) {
      this.add_row_button.style.width = '100%';
      this.add_row_button.style.textAlign = 'left';
      this.add_row_button.style.marginBottom = '3px';

      this.delete_last_row_button.style.width = '100%';
      this.delete_last_row_button.style.textAlign = 'left';
      this.delete_last_row_button.style.marginBottom = '3px';

      this.remove_all_rows_button.style.width = '100%';
      this.remove_all_rows_button.style.textAlign = 'left';
      this.remove_all_rows_button.style.marginBottom = '3px';
    }
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {
      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }

    // Show errors for child editors
    $each(this.rows, function(i,row) {
      row.showValidationErrors(other_errors);
    });
  }
});

JSONEditor.defaults.editors.table = JSONEditor.defaults.editors.array.extend({
  register: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].register();
      }
    }
  },
  unregister: function() {
    this._super();
    if(this.rows) {
      for(var i=0; i<this.rows.length; i++) {
        this.rows[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    return Math.max(Math.min(12,this.width),3);
  },
  preBuild: function() {
    var item_schema = this.jsoneditor.expandRefs(this.schema.items || {});

    this.item_title = item_schema.title || 'row';
    this.item_default = item_schema["default"] || null;
    this.item_has_child_editors = item_schema.properties || item_schema.items;
    this.width = 12;
    this._super();
  },
  build: function() {
    var self = this;
    this.table = this.theme.getTable();
    this.container.appendChild(this.table);
    this.thead = this.theme.getTableHead();
    this.table.appendChild(this.thead);
    this.header_row = this.theme.getTableRow();
    this.thead.appendChild(this.header_row);
    this.row_holder = this.theme.getTableBody();
    this.table.appendChild(this.row_holder);

    // Determine the default value of array element
    var tmp = this.getElementEditor(0,true);
    this.item_default = tmp.getDefault();
    this.width = tmp.getNumColumns() + 2;

    if(!this.options.compact) {
      this.title = this.theme.getHeader(this.getTitle());
      this.container.appendChild(this.title);
      this.title_controls = this.theme.getHeaderButtonHolder();
      this.title.appendChild(this.title_controls);
      if(this.schema.description) {
        this.description = this.theme.getDescription(this.schema.description);
        this.container.appendChild(this.description);
      }
      this.panel = this.theme.getIndentedPanel();
      this.container.appendChild(this.panel);
      this.error_holder = document.createElement('div');
      this.panel.appendChild(this.error_holder);
    }
    else {
      this.panel = document.createElement('div');
      this.container.appendChild(this.panel);
    }

    this.panel.appendChild(this.table);
    this.controls = this.theme.getButtonHolder();
    this.panel.appendChild(this.controls);

    if(this.item_has_child_editors) {
      var ce = tmp.getChildEditors();
      var order = tmp.property_order || Object.keys(ce);
      for(var i=0; i<order.length; i++) {
        var th = self.theme.getTableHeaderCell(ce[order[i]].getTitle());
        if(ce[order[i]].options.hidden) th.style.display = 'none';
        self.header_row.appendChild(th);
      }
    }
    else {
      self.header_row.appendChild(self.theme.getTableHeaderCell(this.item_title));
    }

    tmp.destroy();
    this.row_holder.innerHTML = '';

    // Row Controls column
    this.controls_header_cell = self.theme.getTableHeaderCell(" ");
    self.header_row.appendChild(this.controls_header_cell);

    // Add controls
    this.addControls();
  },
  onChildEditorChange: function(editor) {
    this.refreshValue();
    this._super();
  },
  getItemDefault: function() {
    return $extend({},{"default":this.item_default})["default"];
  },
  getItemTitle: function() {
    return this.item_title;
  },
  getElementEditor: function(i,ignore) {
    var schema_copy = $extend({},this.schema.items);
    var editor = this.jsoneditor.getEditorClass(schema_copy, this.jsoneditor);
    var row = this.row_holder.appendChild(this.theme.getTableRow());
    var holder = row;
    if(!this.item_has_child_editors) {
      holder = this.theme.getTableCell();
      row.appendChild(holder);
    }

    var ret = this.jsoneditor.createEditor(editor,{
      jsoneditor: this.jsoneditor,
      schema: schema_copy,
      container: holder,
      path: this.path+'.'+i,
      parent: this,
      compact: true,
      table_row: true
    });

    ret.preBuild();
    if(!ignore) {
      ret.build();
      ret.postBuild();

      ret.controls_cell = row.appendChild(this.theme.getTableCell());
      ret.row = row;
      ret.table_controls = this.theme.getButtonHolder();
      ret.controls_cell.appendChild(ret.table_controls);
      ret.table_controls.style.margin = 0;
      ret.table_controls.style.padding = 0;
    }

    return ret;
  },
  destroy: function() {
    this.innerHTML = '';
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.row_holder && this.row_holder.parentNode) this.row_holder.parentNode.removeChild(this.row_holder);
    if(this.table && this.table.parentNode) this.table.parentNode.removeChild(this.table);
    if(this.panel && this.panel.parentNode) this.panel.parentNode.removeChild(this.panel);

    this.rows = this.title = this.description = this.row_holder = this.table = this.panel = null;

    this._super();
  },
  setValue: function(value, initial) {
    // Update the array's value, adding/removing rows when necessary
    value = value || [];

    // Make sure value has between minItems and maxItems items in it
    if(this.schema.minItems) {
      while(value.length < this.schema.minItems) {
        value.push(this.getItemDefault());
      }
    }
    if(this.schema.maxItems && value.length > this.schema.maxItems) {
      value = value.slice(0,this.schema.maxItems);
    }

    var serialized = JSON.stringify(value);
    if(serialized === this.serialized) return;

    var numrows_changed = false;

    var self = this;
    $each(value,function(i,val) {
      if(self.rows[i]) {
        // TODO: don't set the row's value if it hasn't changed
        self.rows[i].setValue(val);
      }
      else {
        self.addRow(val);
        numrows_changed = true;
      }
    });

    for(var j=value.length; j<self.rows.length; j++) {
      var holder = self.rows[j].container;
      if(!self.item_has_child_editors) {
        self.rows[j].row.parentNode.removeChild(self.rows[j].row);
      }
      self.rows[j].destroy();
      if(holder.parentNode) holder.parentNode.removeChild(holder);
      self.rows[j] = null;
      numrows_changed = true;
    }
    self.rows = self.rows.slice(0,value.length);

    self.refreshValue();
    if(numrows_changed || initial) self.refreshRowButtons();

    self.onChange();

    // TODO: sortable
  },
  refreshRowButtons: function() {
    var self = this;

    // If we currently have minItems items in the array
    var minItems = this.schema.minItems && this.schema.minItems >= this.rows.length;

    var need_row_buttons = false;
    $each(this.rows,function(i,editor) {
      // Hide the move down button for the last row
      if(editor.movedown_button) {
        if(i === self.rows.length - 1) {
          editor.movedown_button.style.display = 'none';
        }
        else {
          need_row_buttons = true;
          editor.movedown_button.style.display = '';
        }
      }

      // Hide the delete button if we have minItems items
      if(editor.delete_button) {
        if(minItems) {
          editor.delete_button.style.display = 'none';
        }
        else {
          need_row_buttons = true;
          editor.delete_button.style.display = '';
        }
      }

      if(editor.moveup_button) {
        need_row_buttons = true;
      }
    });

    // Show/hide controls column in table
    $each(this.rows,function(i,editor) {
      if(need_row_buttons) {
        editor.controls_cell.style.display = '';
      }
      else {
        editor.controls_cell.style.display = 'none';
      }
    });
    if(need_row_buttons) {
      this.controls_header_cell.style.display = '';
    }
    else {
      this.controls_header_cell.style.display = 'none';
    }

    var controls_needed = false;

    if(!this.value.length) {
      this.delete_last_row_button.style.display = 'none';
      this.remove_all_rows_button.style.display = 'none';
      this.table.style.display = 'none';
    }
    else if(this.value.length === 1) {
      this.table.style.display = '';
      this.remove_all_rows_button.style.display = 'none';

      // If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
      if(minItems || this.hide_delete_last_row_buttons) {
        this.delete_last_row_button.style.display = 'none';
      }
      else {
        this.delete_last_row_button.style.display = '';
        controls_needed = true;
      }
    }
    else {
      this.table.style.display = '';

      if(minItems || this.hide_delete_last_row_buttons) {
        this.delete_last_row_button.style.display = 'none';
      }
      else {
        this.delete_last_row_button.style.display = '';
        controls_needed = true;
      }

      if(minItems || this.hide_delete_all_rows_buttons) {
        this.remove_all_rows_button.style.display = 'none';
      }
      else {
        this.remove_all_rows_button.style.display = '';
        controls_needed = true;
      }
    }

    // If there are maxItems in the array, hide the add button beneath the rows
    if((this.schema.maxItems && this.schema.maxItems <= this.rows.length) || this.hide_add_button) {
      this.add_row_button.style.display = 'none';
    }
    else {
      this.add_row_button.style.display = '';
      controls_needed = true;
    }

    if(!controls_needed) {
      this.controls.style.display = 'none';
    }
    else {
      this.controls.style.display = '';
    }
  },
  refreshValue: function() {
    var self = this;
    this.value = [];

    $each(this.rows,function(i,editor) {
      // Get the value for this editor
      self.value[i] = editor.getValue();
    });
    this.serialized = JSON.stringify(this.value);
  },
  addRow: function(value) {
    var self = this;
    var i = this.rows.length;

    self.rows[i] = this.getElementEditor(i);

    var controls_holder = self.rows[i].table_controls;

    // Buttons to delete row, move row up, and move row down
    if(!this.hide_delete_buttons) {
      self.rows[i].delete_button = this.getButton('','delete',this.translate('button_delete_row_title_short'));
      self.rows[i].delete_button.className += ' delete';
      self.rows[i].delete_button.setAttribute('data-i',i);
      self.rows[i].delete_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;

        var value = self.getValue();

        var newval = [];
        $each(value,function(j,row) {
          if(j===i) return; // If this is the one we're deleting
          newval.push(row);
        });
        self.setValue(newval);
        self.onChange(true);
      });
      controls_holder.appendChild(self.rows[i].delete_button);
    }


    if(i && !this.hide_move_buttons) {
      self.rows[i].moveup_button = this.getButton('','moveup',this.translate('button_move_up_title'));
      self.rows[i].moveup_button.className += ' moveup';
      self.rows[i].moveup_button.setAttribute('data-i',i);
      self.rows[i].moveup_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;

        if(i<=0) return;
        var rows = self.getValue();
        var tmp = rows[i-1];
        rows[i-1] = rows[i];
        rows[i] = tmp;

        self.setValue(rows);
        self.onChange(true);
      });
      controls_holder.appendChild(self.rows[i].moveup_button);
    }

    if(!this.hide_move_buttons) {
      self.rows[i].movedown_button = this.getButton('','movedown',this.translate('button_move_down_title'));
      self.rows[i].movedown_button.className += ' movedown';
      self.rows[i].movedown_button.setAttribute('data-i',i);
      self.rows[i].movedown_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();
        var i = this.getAttribute('data-i')*1;
        var rows = self.getValue();
        if(i>=rows.length-1) return;
        var tmp = rows[i+1];
        rows[i+1] = rows[i];
        rows[i] = tmp;

        self.setValue(rows);
        self.onChange(true);
      });
      controls_holder.appendChild(self.rows[i].movedown_button);
    }

    if(value) self.rows[i].setValue(value);
  },
  addControls: function() {
    var self = this;

    this.collapsed = false;
    this.toggle_button = this.getButton('','collapse',this.translate('button_collapse'));
    if(this.title_controls) {
      this.title_controls.appendChild(this.toggle_button);
      this.toggle_button.addEventListener('click',function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(self.collapsed) {
          self.collapsed = false;
          self.panel.style.display = '';
          self.setButtonText(this,'','collapse',self.translate('button_collapse'));
        }
        else {
          self.collapsed = true;
          self.panel.style.display = 'none';
          self.setButtonText(this,'','expand',self.translate('button_expand'));
        }
      });

      // If it should start collapsed
      if(this.options.collapsed) {
        $trigger(this.toggle_button,'click');
      }

      // Collapse button disabled
      if(this.schema.options && typeof this.schema.options.disable_collapse !== "undefined") {
        if(this.schema.options.disable_collapse) this.toggle_button.style.display = 'none';
      }
      else if(this.jsoneditor.options.disable_collapse) {
        this.toggle_button.style.display = 'none';
      }
    }

    // Add "new row" and "delete last" buttons below editor
    this.add_row_button = this.getButton(this.getItemTitle(),'add',this.translate('button_add_row_title',[this.getItemTitle()]));
    this.add_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();

      self.addRow();
      self.refreshValue();
      self.refreshRowButtons();
      self.onChange(true);
    });
    self.controls.appendChild(this.add_row_button);

    this.delete_last_row_button = this.getButton(this.translate('button_delete_last',[this.getItemTitle()]),'delete',this.translate('button_delete_last_title',[this.getItemTitle()]));
    this.delete_last_row_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();

      var rows = self.getValue();
      rows.pop();
      self.setValue(rows);
      self.onChange(true);
    });
    self.controls.appendChild(this.delete_last_row_button);

    this.remove_all_rows_button = this.getButton(this.translate('button_delete_all'),'delete',this.translate('button_delete_all_title'));
    this.remove_all_rows_button.addEventListener('click',function(e) {
      e.preventDefault();
      e.stopPropagation();

      self.setValue([]);
      self.onChange(true);
    });
    self.controls.appendChild(this.remove_all_rows_button);
  }
});

// Multiple Editor (for when `type` is an array)
JSONEditor.defaults.editors.multiple = JSONEditor.AbstractEditor.extend({
  register: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].unregister();
      }
      if(this.editors[this.type]) this.editors[this.type].register();
    }
    this._super();
  },
  unregister: function() {
    this._super();
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].unregister();
      }
    }
  },
  getNumColumns: function() {
    if(!this.editors[this.type]) return 4;
    return Math.max(this.editors[this.type].getNumColumns(),4);
  },
  enable: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].enable();
      }
    }
    this.switcher.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.editors) {
      for(var i=0; i<this.editors.length; i++) {
        if(!this.editors[i]) continue;
        this.editors[i].disable();
      }
    }
    this.switcher.disabled = true;
    this._super();
  },
  switchEditor: function(i) {
    var self = this;

    if(!this.editors[i]) {
      this.buildChildEditor(i);
    }

    var current_value = self.getValue();

    self.type = i;

    self.register();

    $each(self.editors,function(type,editor) {
      if(!editor) return;
      if(self.type === type) {
        if(self.keep_values) editor.setValue(current_value,true);
        editor.container.style.display = '';
      }
      else editor.container.style.display = 'none';
    });
    self.refreshValue();
    self.refreshHeaderText();
  },
  buildChildEditor: function(i) {
    var self = this;
    var type = this.types[i];
    var holder = self.theme.getChildEditorHolder();
    self.editor_holder.appendChild(holder);

    var schema;

    if(typeof type === "string") {
      schema = $extend({},self.schema);
      schema.type = type;
    }
    else {
      schema = $extend({},self.schema,type);
      schema = self.jsoneditor.expandRefs(schema);

      // If we need to merge `required` arrays
      if(type.required && Array.isArray(type.required) && self.schema.required && Array.isArray(self.schema.required)) {
        schema.required = self.schema.required.concat(type.required);
      }
    }

    var editor = self.jsoneditor.getEditorClass(schema);

    self.editors[i] = self.jsoneditor.createEditor(editor,{
      jsoneditor: self.jsoneditor,
      schema: schema,
      container: holder,
      path: self.path,
      parent: self,
      required: true
    });
    self.editors[i].preBuild();
    self.editors[i].build();
    self.editors[i].postBuild();

    if(self.editors[i].header) self.editors[i].header.style.display = 'none';

    self.editors[i].option = self.switcher_options[i];

    holder.addEventListener('change_header_text',function() {
      self.refreshHeaderText();
    });

    if(i !== self.type) holder.style.display = 'none';
  },
  preBuild: function() {
    var self = this;

    this.types = [];
    this.type = 0;
    this.editors = [];
    this.validators = [];

    this.keep_values = true;
    if(typeof this.jsoneditor.options.keep_oneof_values !== "undefined") this.keep_values = this.jsoneditor.options.keep_oneof_values;
    if(typeof this.options.keep_oneof_values !== "undefined") this.keep_values = this.options.keep_oneof_values;

    if(this.schema.oneOf) {
      this.oneOf = true;
      this.types = this.schema.oneOf;
      delete this.schema.oneOf;
    }
    else if(this.schema.anyOf) {
      this.anyOf = true;
      this.types = this.schema.anyOf;
      delete this.schema.anyOf;
    }
    else {
      if(!this.schema.type || this.schema.type === "any") {
        this.types = ['string','number','integer','boolean','object','array','null'];

        // If any of these primitive types are disallowed
        if(this.schema.disallow) {
          var disallow = this.schema.disallow;
          if(typeof disallow !== 'object' || !(Array.isArray(disallow))) {
            disallow = [disallow];
          }
          var allowed_types = [];
          $each(this.types,function(i,type) {
            if(disallow.indexOf(type) === -1) allowed_types.push(type);
          });
          this.types = allowed_types;
        }
      }
      else if(Array.isArray(this.schema.type)) {
        this.types = this.schema.type;
      }
      else {
        this.types = [this.schema.type];
      }
      delete this.schema.type;
    }

    this.display_text = this.getDisplayText(this.types);
  },
  build: function() {
    var self = this;
    var container = this.container;

    this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    this.container.appendChild(this.header);

    this.switcher = this.theme.getSwitcher(this.display_text);
    container.appendChild(this.switcher);
    this.switcher.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();

      self.switchEditor(self.display_text.indexOf(this.value));
      self.onChange(true);
    });

    this.editor_holder = document.createElement('div');
    container.appendChild(this.editor_holder);


    var validator_options = {};
    if(self.jsoneditor.options.custom_validators) {
      validator_options.custom_validators = self.jsoneditor.options.custom_validators;
    }

    this.switcher_options = this.theme.getSwitcherOptions(this.switcher);
    $each(this.types,function(i,type) {
      self.editors[i] = false;

      var schema;

      if(typeof type === "string") {
        schema = $extend({},self.schema);
        schema.type = type;
      }
      else {
        schema = $extend({},self.schema,type);

        // If we need to merge `required` arrays
        if(type.required && Array.isArray(type.required) && self.schema.required && Array.isArray(self.schema.required)) {
          schema.required = self.schema.required.concat(type.required);
        }
      }

      self.validators[i] = new JSONEditor.Validator(self.jsoneditor,schema,validator_options);
    });

    this.switchEditor(0);
  },
  onChildEditorChange: function(editor) {
    if(this.editors[this.type]) {
      this.refreshValue();
      this.refreshHeaderText();
    }

    this._super();
  },
  refreshHeaderText: function() {
    var display_text = this.getDisplayText(this.types);
    $each(this.switcher_options, function(i,option) {
      option.textContent = display_text[i];
    });
  },
  refreshValue: function() {
    this.value = this.editors[this.type].getValue();
  },
  setValue: function(val,initial) {
    // Determine type by getting the first one that validates
    var self = this;
    $each(this.validators, function(i,validator) {
      if(!validator.validate(val).length) {
        self.type = i;
        self.switcher.value = self.display_text[i];
        return false;
      }
    });

    this.switchEditor(this.type);

    this.editors[this.type].setValue(val,initial);

    this.refreshValue();
    self.onChange();
  },
  destroy: function() {
    $each(this.editors, function(type,editor) {
      if(editor) editor.destroy();
    });
    if(this.editor_holder && this.editor_holder.parentNode) this.editor_holder.parentNode.removeChild(this.editor_holder);
    if(this.switcher && this.switcher.parentNode) this.switcher.parentNode.removeChild(this.switcher);
    this._super();
  },
  showValidationErrors: function(errors) {
    var self = this;

    // oneOf and anyOf error paths need to remove the oneOf[i] part before passing to child editors
    if(this.oneOf || this.anyOf) {
      var check_part = this.oneOf? 'oneOf' : 'anyOf';
      $each(this.editors,function(i,editor) {
        if(!editor) return;
        var check = self.path+'.'+check_part+'['+i+']';
        var new_errors = [];
        $each(errors, function(j,error) {
          if(error.path.substr(0,check.length)===check) {
            var new_error = $extend({},error);
            new_error.path = self.path+new_error.path.substr(check.length);
            new_errors.push(new_error);
          }
        });

        editor.showValidationErrors(new_errors);
      });
    }
    else {
      $each(this.editors,function(type,editor) {
        if(!editor) return;
        editor.showValidationErrors(errors);
      });
    }
  }
});

// Enum Editor (used for objects and arrays with enumerated values)
JSONEditor.defaults.editors["enum"] = JSONEditor.AbstractEditor.extend({
  getNumColumns: function() {
    return 4;
  },
  build: function() {
    var container = this.container;
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    this.container.appendChild(this.title);

    this.options.enum_titles = this.options.enum_titles || [];

    this["enum"] = this.schema["enum"];
    this.selected = 0;
    this.select_options = [];
    this.html_values = [];

    var self = this;
    for(var i=0; i<this["enum"].length; i++) {
      this.select_options[i] = this.options.enum_titles[i] || "Value "+(i+1);
      this.html_values[i] = this.getHTML(this["enum"][i]);
    }

    // Switcher
    this.switcher = this.theme.getSwitcher(this.select_options);
    this.container.appendChild(this.switcher);

    // Display area
    this.display_area = this.theme.getIndentedPanel();
    this.container.appendChild(this.display_area);

    if(this.options.hide_display) this.display_area.style.display = "none";

    this.switcher.addEventListener('change',function() {
      self.selected = self.select_options.indexOf(this.value);
      self.value = self["enum"][self.selected];
      self.refreshValue();
      self.onChange(true);
    });
    this.value = this["enum"][0];
    this.refreshValue();

    if(this["enum"].length === 1) this.switcher.style.display = 'none';
  },
  refreshValue: function() {
    var self = this;
    self.selected = -1;
    var stringified = JSON.stringify(this.value);
    $each(this["enum"], function(i, el) {
      if(stringified === JSON.stringify(el)) {
        self.selected = i;
        return false;
      }
    });

    if(self.selected<0) {
      self.setValue(self["enum"][0]);
      return;
    }

    this.switcher.value = this.select_options[this.selected];
    this.display_area.innerHTML = this.html_values[this.selected];
  },
  enable: function() {
    if(!this.always_disabled) this.switcher.disabled = false;
    this._super();
  },
  disable: function() {
    this.switcher.disabled = true;
    this._super();
  },
  getHTML: function(el) {
    var self = this;

    if(el === null) {
      return '<em>null</em>';
    }
    // Array or Object
    else if(typeof el === "object") {
      // TODO: use theme
      var ret = '';

      $each(el,function(i,child) {
        var html = self.getHTML(child);

        // Add the keys to object children
        if(!(Array.isArray(el))) {
          // TODO: use theme
          html = '<div><em>'+i+'</em>: '+html+'</div>';
        }

        // TODO: use theme
        ret += '<li>'+html+'</li>';
      });

      if(Array.isArray(el)) ret = '<ol>'+ret+'</ol>';
      else ret = "<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>"+ret+'</ul>';

      return ret;
    }
    // Boolean
    else if(typeof el === "boolean") {
      return el? 'true' : 'false';
    }
    // String
    else if(typeof el === "string") {
      return el.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    // Number
    else {
      return el;
    }
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.refreshValue();
      this.onChange();
    }
  },
  destroy: function() {
    if(this.display_area && this.display_area.parentNode) this.display_area.parentNode.removeChild(this.display_area);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.switcher && this.switcher.parentNode) this.switcher.parentNode.removeChild(this.switcher);

    this._super();
  }
});

JSONEditor.defaults.editors.select = JSONEditor.AbstractEditor.extend({
  setValue: function(value,initial) {
    value = this.typecast(value||'');

    // Sanitize value before setting it
    var sanitized = value;
    if(this.enum_values.indexOf(sanitized) < 0) {
      sanitized = this.enum_values[0];
    }

    if(this.value === sanitized) {
      return;
    }

    this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)];
    if(this.select2) this.select2.select2('val',this.input.value);
    this.value = sanitized;
    this.onChange();
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    if(!this.enum_options) return 3;
    var longest_text = this.getTitle().length;
    for(var i=0; i<this.enum_options.length; i++) {
      longest_text = Math.max(longest_text,this.enum_options[i].length+4);
    }
    return Math.min(12,Math.max(longest_text/7,2));
  },
  typecast: function(value) {
    if(this.schema.type === "boolean") {
      return !!value;
    }
    else if(this.schema.type === "number") {
      return 1*value;
    }
    else if(this.schema.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  },
  getValue: function() {
    return this.value;
  },
  preBuild: function() {
    var self = this;
    this.input_type = 'select';
    this.enum_options = [];
    this.enum_values = [];
    this.enum_display = [];
    var i;

    // Enum options enumerated
    if(this.schema["enum"]) {
      var display = this.schema.options && this.schema.options.enum_titles || [];

      $each(this.schema["enum"],function(i,option) {
        self.enum_options[i] = ""+option;
        self.enum_display[i] = ""+(display[i] || option);
        self.enum_values[i] = self.typecast(option);
      });

      if(!this.isRequired()){
        self.enum_display.unshift(' ');
        self.enum_options.unshift('undefined');
        self.enum_values.unshift(undefined);
      }

    }
    // Boolean
    else if(this.schema.type === "boolean") {
      self.enum_display = this.schema.options && this.schema.options.enum_titles || ['true','false'];
      self.enum_options = ['1',''];
      self.enum_values = [true,false];

      if(!this.isRequired()){
        self.enum_display.unshift(' ');
        self.enum_options.unshift('undefined');
        self.enum_values.unshift(undefined);
      }

    }
    // Dynamic Enum
    else if(this.schema.enumSource) {
      this.enumSource = [];
      this.enum_display = [];
      this.enum_options = [];
      this.enum_values = [];

      // Shortcut declaration for using a single array
      if(!(Array.isArray(this.schema.enumSource))) {
        if(this.schema.enumValue) {
          this.enumSource = [
            {
              source: this.schema.enumSource,
              value: this.schema.enumValue
            }
          ];
        }
        else {
          this.enumSource = [
            {
              source: this.schema.enumSource
            }
          ];
        }
      }
      else {
        for(i=0; i<this.schema.enumSource.length; i++) {
          // Shorthand for watched variable
          if(typeof this.schema.enumSource[i] === "string") {
            this.enumSource[i] = {
              source: this.schema.enumSource[i]
            };
          }
          // Make a copy of the schema
          else if(!(Array.isArray(this.schema.enumSource[i]))) {
            this.enumSource[i] = $extend({},this.schema.enumSource[i]);
          }
          else {
            this.enumSource[i] = this.schema.enumSource[i];
          }
        }
      }

      // Now, enumSource is an array of sources
      // Walk through this array and fix up the values
      for(i=0; i<this.enumSource.length; i++) {
        if(this.enumSource[i].value) {
          this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine);
        }
        if(this.enumSource[i].title) {
          this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine);
        }
        if(this.enumSource[i].filter) {
          this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine);
        }
      }
    }
    // Other, not supported
    else {
      throw "'select' editor requires the enum property to be set.";
    }
  },
  build: function() {
    var self = this;
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    if(this.options.compact) this.container.className += ' compact';

    this.input = this.theme.getSelectInput(this.enum_options);
    this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display);

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.onInputChange();
    });

    this.control = this.theme.getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

    this.value = this.enum_values[0];
  },
  onInputChange: function() {
    var val = this.input.value;

    var new_val;
    // Invalid option, use first option instead
    if(this.enum_options.indexOf(val) === -1) {
      new_val = this.enum_values[0];
    }
    else {
      new_val = this.enum_values[this.enum_options.indexOf(val)];
    }

    // If valid hasn't changed
    if(new_val === this.value) return;

    // Store new value and propogate change event
    this.value = new_val;
    this.onChange(true);
  },
  setupSelect2: function() {
    // If the Select2 library is loaded use it when we have lots of items
    if(window.jQuery && window.jQuery.fn && window.jQuery.fn.select2 && (this.enum_options.length > 2 || (this.enum_options.length && this.enumSource))) {
      var options = $extend({},JSONEditor.plugins.select2);
      if(this.schema.options && this.schema.options.select2_options) options = $extend(options,this.schema.options.select2_options);
      this.select2 = window.jQuery(this.input).select2(options);
      var self = this;
      this.select2.on('select2-blur',function() {
        self.input.value = self.select2.select2('val');
        self.onInputChange();
      });
      this.select2.on('change',function() {
        self.input.value = self.select2.select2('val');
        self.onInputChange();
      });
    }
    else {
      this.select2 = null;
    }
  },
  postBuild: function() {
    this._super();
    this.theme.afterInputReady(this.input);
    this.setupSelect2();
  },
  onWatchedFieldChange: function() {
    var self = this, vars, j;

    // If this editor uses a dynamic select box
    if(this.enumSource) {
      vars = this.getWatchedFieldValues();
      var select_options = [];
      var select_titles = [];

      for(var i=0; i<this.enumSource.length; i++) {
        // Constant values
        if(Array.isArray(this.enumSource[i])) {
          select_options = select_options.concat(this.enumSource[i]);
          select_titles = select_titles.concat(this.enumSource[i]);
        }
        else {
          var items = [];
          // Static list of items
          if(Array.isArray(this.enumSource[i].source)) {
            items = this.enumSource[i].source;
          // A watched field
          } else {
            items = vars[this.enumSource[i].source];
          }

          if(items) {
            // Only use a predefined part of the array
            if(this.enumSource[i].slice) {
              items = Array.prototype.slice.apply(items,this.enumSource[i].slice);
            }
            // Filter the items
            if(this.enumSource[i].filter) {
              var new_items = [];
              for(j=0; j<items.length; j++) {
                if(this.enumSource[i].filter({i:j,item:items[j],watched:vars})) new_items.push(items[j]);
              }
              items = new_items;
            }

            var item_titles = [];
            var item_values = [];
            for(j=0; j<items.length; j++) {
              var item = items[j];

              // Rendered value
              if(this.enumSource[i].value) {
                item_values[j] = this.enumSource[i].value({
                  i: j,
                  item: item
                });
              }
              // Use value directly
              else {
                item_values[j] = items[j];
              }

              // Rendered title
              if(this.enumSource[i].title) {
                item_titles[j] = this.enumSource[i].title({
                  i: j,
                  item: item
                });
              }
              // Use value as the title also
              else {
                item_titles[j] = item_values[j];
              }
            }

            // TODO: sort

            select_options = select_options.concat(item_values);
            select_titles = select_titles.concat(item_titles);
          }
        }
      }

      var prev_value = this.value;

      this.theme.setSelectOptions(this.input, select_options, select_titles);
      this.enum_options = select_options;
      this.enum_display = select_titles;
      this.enum_values = select_options;

      if(this.select2) {
        this.select2.select2('destroy');
      }

      // If the previous value is still in the new select options, stick with it
      if(select_options.indexOf(prev_value) !== -1) {
        this.input.value = prev_value;
        this.value = prev_value;
      }
      // Otherwise, set the value to the first select option
      else {
        this.input.value = select_options[0];
        this.value = select_options[0] || "";
        if(this.parent) this.parent.onChildEditorChange(this);
        else this.jsoneditor.onChange();
        this.jsoneditor.notifyWatchers(this.path);
      }

      this.setupSelect2();
    }

    this._super();
  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
      if(this.select2) this.select2.select2("enable",true);
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    if(this.select2) this.select2.select2("enable",false);
    this._super();
  },
  destroy: function() {
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.select2) {
      this.select2.select2('destroy');
      this.select2 = null;
    }

    this._super();
  }
});

JSONEditor.defaults.editors.selectize = JSONEditor.AbstractEditor.extend({
  setValue: function(value,initial) {
    value = this.typecast(value||'');

    // Sanitize value before setting it
    var sanitized = value;
    if(this.enum_values.indexOf(sanitized) < 0) {
      sanitized = this.enum_values[0];
    }

    if(this.value === sanitized) {
      return;
    }

    this.input.value = this.enum_options[this.enum_values.indexOf(sanitized)];

    if(this.selectize) {
      this.selectize[0].selectize.addItem(sanitized);
    }

    this.value = sanitized;
    this.onChange();
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    if(!this.enum_options) return 3;
    var longest_text = this.getTitle().length;
    for(var i=0; i<this.enum_options.length; i++) {
      longest_text = Math.max(longest_text,this.enum_options[i].length+4);
    }
    return Math.min(12,Math.max(longest_text/7,2));
  },
  typecast: function(value) {
    if(this.schema.type === "boolean") {
      return !!value;
    }
    else if(this.schema.type === "number") {
      return 1*value;
    }
    else if(this.schema.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  },
  getValue: function() {
    return this.value;
  },
  preBuild: function() {
    var self = this;
    this.input_type = 'select';
    this.enum_options = [];
    this.enum_values = [];
    this.enum_display = [];
    var i;

    // Enum options enumerated
    if(this.schema.enum) {
      var display = this.schema.options && this.schema.options.enum_titles || [];

      $each(this.schema.enum,function(i,option) {
        self.enum_options[i] = ""+option;
        self.enum_display[i] = ""+(display[i] || option);
        self.enum_values[i] = self.typecast(option);
      });
    }
    // Boolean
    else if(this.schema.type === "boolean") {
      self.enum_display = this.schema.options && this.schema.options.enum_titles || ['true','false'];
      self.enum_options = ['1','0'];
      self.enum_values = [true,false];
    }
    // Dynamic Enum
    else if(this.schema.enumSource) {
      this.enumSource = [];
      this.enum_display = [];
      this.enum_options = [];
      this.enum_values = [];

      // Shortcut declaration for using a single array
      if(!(Array.isArray(this.schema.enumSource))) {
        if(this.schema.enumValue) {
          this.enumSource = [
            {
              source: this.schema.enumSource,
              value: this.schema.enumValue
            }
          ];
        }
        else {
          this.enumSource = [
            {
              source: this.schema.enumSource
            }
          ];
        }
      }
      else {
        for(i=0; i<this.schema.enumSource.length; i++) {
          // Shorthand for watched variable
          if(typeof this.schema.enumSource[i] === "string") {
            this.enumSource[i] = {
              source: this.schema.enumSource[i]
            };
          }
          // Make a copy of the schema
          else if(!(Array.isArray(this.schema.enumSource[i]))) {
            this.enumSource[i] = $extend({},this.schema.enumSource[i]);
          }
          else {
            this.enumSource[i] = this.schema.enumSource[i];
          }
        }
      }

      // Now, enumSource is an array of sources
      // Walk through this array and fix up the values
      for(i=0; i<this.enumSource.length; i++) {
        if(this.enumSource[i].value) {
          this.enumSource[i].value = this.jsoneditor.compileTemplate(this.enumSource[i].value, this.template_engine);
        }
        if(this.enumSource[i].title) {
          this.enumSource[i].title = this.jsoneditor.compileTemplate(this.enumSource[i].title, this.template_engine);
        }
        if(this.enumSource[i].filter) {
          this.enumSource[i].filter = this.jsoneditor.compileTemplate(this.enumSource[i].filter, this.template_engine);
        }
      }
    }
    // Other, not supported
    else {
      throw "'select' editor requires the enum property to be set.";
    }
  },
  build: function() {
    var self = this;
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    if(this.options.compact) this.container.className += ' compact';

    this.input = this.theme.getSelectInput(this.enum_options);
    this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display);

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.onInputChange();
    });

    this.control = this.theme.getFormControl(this.label, this.input, this.description);
    this.container.appendChild(this.control);

    this.value = this.enum_values[0];
  },
  onInputChange: function() {
    var val = this.input.value;

    var sanitized = val;
    if(this.enum_options.indexOf(val) === -1) {
      sanitized = this.enum_options[0];
    }

    this.value = this.enum_values[this.enum_options.indexOf(val)];
    this.onChange(true);
  },
  setupSelectize: function() {
    // If the Selectize library is loaded use it when we have lots of items
    var self = this;
    if(window.jQuery && window.jQuery.fn && window.jQuery.fn.selectize && (this.enum_options.length >= 2 || (this.enum_options.length && this.enumSource))) {
      var options = $extend({},JSONEditor.plugins.selectize);
      if(this.schema.options && this.schema.options.selectize_options) options = $extend(options,this.schema.options.selectize_options);
      this.selectize = window.jQuery(this.input).selectize($extend(options,
      {
        create: true,
        onChange : function() {
          self.onInputChange();
        }
      }));
    }
    else {
      this.selectize = null;
    }
  },
  postBuild: function() {
    this._super();
    this.theme.afterInputReady(this.input);
    this.setupSelectize();
  },
  onWatchedFieldChange: function() {
    var self = this, vars, j;

    // If this editor uses a dynamic select box
    if(this.enumSource) {
      vars = this.getWatchedFieldValues();
      var select_options = [];
      var select_titles = [];

      for(var i=0; i<this.enumSource.length; i++) {
        // Constant values
        if(Array.isArray(this.enumSource[i])) {
          select_options = select_options.concat(this.enumSource[i]);
          select_titles = select_titles.concat(this.enumSource[i]);
        }
        // A watched field
        else if(vars[this.enumSource[i].source]) {
          var items = vars[this.enumSource[i].source];

          // Only use a predefined part of the array
          if(this.enumSource[i].slice) {
            items = Array.prototype.slice.apply(items,this.enumSource[i].slice);
          }
          // Filter the items
          if(this.enumSource[i].filter) {
            var new_items = [];
            for(j=0; j<items.length; j++) {
              if(this.enumSource[i].filter({i:j,item:items[j]})) new_items.push(items[j]);
            }
            items = new_items;
          }

          var item_titles = [];
          var item_values = [];
          for(j=0; j<items.length; j++) {
            var item = items[j];

            // Rendered value
            if(this.enumSource[i].value) {
              item_values[j] = this.enumSource[i].value({
                i: j,
                item: item
              });
            }
            // Use value directly
            else {
              item_values[j] = items[j];
            }

            // Rendered title
            if(this.enumSource[i].title) {
              item_titles[j] = this.enumSource[i].title({
                i: j,
                item: item
              });
            }
            // Use value as the title also
            else {
              item_titles[j] = item_values[j];
            }
          }

          // TODO: sort

          select_options = select_options.concat(item_values);
          select_titles = select_titles.concat(item_titles);
        }
      }

      var prev_value = this.value;

      this.theme.setSelectOptions(this.input, select_options, select_titles);
      this.enum_options = select_options;
      this.enum_display = select_titles;
      this.enum_values = select_options;

      // If the previous value is still in the new select options, stick with it
      if(select_options.indexOf(prev_value) !== -1) {
        this.input.value = prev_value;
        this.value = prev_value;
      }

      // Otherwise, set the value to the first select option
      else {
        this.input.value = select_options[0];
        this.value = select_options[0] || "";
        if(this.parent) this.parent.onChildEditorChange(this);
        else this.jsoneditor.onChange();
        this.jsoneditor.notifyWatchers(this.path);
      }

      if(this.selectize) {
        // Update the Selectize options
        this.updateSelectizeOptions(select_options);
      }
      else {
        this.setupSelectize();
      }

      this._super();
    }
  },
  updateSelectizeOptions: function(select_options) {
    var selectized = this.selectize[0].selectize,
        self = this;

    selectized.off();
    selectized.clearOptions();
    for(var n in select_options) {
      selectized.addOption({value:select_options[n],text:select_options[n]});
    }
    selectized.addItem(this.value);
    selectized.on('change',function() {
      self.onInputChange();
    });
  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
      if(this.selectize) {
        this.selectize[0].selectize.unlock();
      }
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    if(this.selectize) {
      this.selectize[0].selectize.lock();
    }
    this._super();
  },
  destroy: function() {
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.selectize) {
      this.selectize[0].selectize.destroy();
      this.selectize = null;
    }
    this._super();
  }
});

JSONEditor.defaults.editors.multiselect = JSONEditor.AbstractEditor.extend({
  preBuild: function() {
    this._super();
    var i;

    this.select_options = {};
    this.select_values = {};

    var items_schema = this.jsoneditor.expandRefs(this.schema.items || {});

    var e = items_schema["enum"] || [];
    var t = items_schema.options? items_schema.options.enum_titles || [] : [];
    this.option_keys = [];
    this.option_titles = [];
    for(i=0; i<e.length; i++) {
      // If the sanitized value is different from the enum value, don't include it
      if(this.sanitize(e[i]) !== e[i]) continue;

      this.option_keys.push(e[i]+"");
      this.option_titles.push((t[i]||e[i])+"");
      this.select_values[e[i]+""] = e[i];
    }
  },
  build: function() {
    var self = this, i;
    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

    if((!this.schema.format && this.option_keys.length < 8) || this.schema.format === "checkbox") {
      this.input_type = 'checkboxes';

      this.inputs = {};
      this.controls = {};
      for(i=0; i<this.option_keys.length; i++) {
        this.inputs[this.option_keys[i]] = this.theme.getCheckbox();
        this.select_options[this.option_keys[i]] = this.inputs[this.option_keys[i]];
        var label = this.theme.getCheckboxLabel(this.option_titles[i]);
        this.controls[this.option_keys[i]] = this.theme.getFormControl(label, this.inputs[this.option_keys[i]]);
      }

      this.control = this.theme.getMultiCheckboxHolder(this.controls,this.label,this.description);
    }
    else {
      this.input_type = 'select';
      this.input = this.theme.getSelectInput(this.option_keys);
      this.theme.setSelectOptions(this.input,this.option_keys,this.option_titles);
      this.input.multiple = true;
      this.input.size = Math.min(10,this.option_keys.length);

      for(i=0; i<this.option_keys.length; i++) {
        this.select_options[this.option_keys[i]] = this.input.children[i];
      }

      if(this.schema.readOnly || this.schema.readonly) {
        this.always_disabled = true;
        this.input.disabled = true;
      }

      this.control = this.theme.getFormControl(this.label, this.input, this.description);
    }

    this.container.appendChild(this.control);
    this.control.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();

      var new_value = [];
      for(i = 0; i<self.option_keys.length; i++) {
        if(self.select_options[self.option_keys[i]].selected || self.select_options[self.option_keys[i]].checked) new_value.push(self.select_values[self.option_keys[i]]);
      }

      self.updateValue(new_value);
      self.onChange(true);
    });
  },
  setValue: function(value, initial) {
    var i;
    value = value || [];
    if(typeof value !== "object") value = [value];
    else if(!(Array.isArray(value))) value = [];

    // Make sure we are dealing with an array of strings so we can check for strict equality
    for(i=0; i<value.length; i++) {
      if(typeof value[i] !== "string") value[i] += "";
    }

    // Update selected status of options
    for(i in this.select_options) {
      if(!this.select_options.hasOwnProperty(i)) continue;

      this.select_options[i][this.input_type === "select"? "selected" : "checked"] = (value.indexOf(i) !== -1);
    }

    this.updateValue(value);
    this.onChange();
  },
  setupSelect2: function() {
    if(window.jQuery && window.jQuery.fn && window.jQuery.fn.select2) {
        var options = window.jQuery.extend({},JSONEditor.plugins.select2);
        if(this.schema.options && this.schema.options.select2_options) options = $extend(options,this.schema.options.select2_options);
        this.select2 = window.jQuery(this.input).select2(options);
        var self = this;
        this.select2.on('select2-blur',function() {
            var val =self.select2.select2('val');
            self.value = val;
            self.onChange(true);
        });
    }
    else {
        this.select2 = null;
    }
  },
  onInputChange: function() {
      this.value = this.input.value;
      this.onChange(true);
  },
  postBuild: function() {
      this._super();
      this.setupSelect2();
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    var longest_text = this.getTitle().length;
    for(var i in this.select_values) {
      if(!this.select_values.hasOwnProperty(i)) continue;
      longest_text = Math.max(longest_text,(this.select_values[i]+"").length+4);
    }

    return Math.min(12,Math.max(longest_text/7,2));
  },
  updateValue: function(value) {
    var changed = false;
    var new_value = [];
    for(var i=0; i<value.length; i++) {
      if(!this.select_options[value[i]+""]) {
        changed = true;
        continue;
      }
      var sanitized = this.sanitize(this.select_values[value[i]]);
      new_value.push(sanitized);
      if(sanitized !== value[i]) changed = true;
    }
    this.value = new_value;
    if(this.select2) this.select2.select2('val',this.value);
    return changed;
  },
  sanitize: function(value) {
    if(this.schema.items.type === "number") {
      return 1*value;
    }
    else if(this.schema.items.type === "integer") {
      return Math.floor(value*1);
    }
    else {
      return ""+value;
    }
  },
  enable: function() {
    if(!this.always_disabled) {
      if(this.input) {
        this.input.disabled = false;
      }
      else if(this.inputs) {
        for(var i in this.inputs) {
          if(!this.inputs.hasOwnProperty(i)) continue;
          this.inputs[i].disabled = false;
        }
      }
      if(this.select2) this.select2.select2("enable",true);
    }
    this._super();
  },
  disable: function() {
    if(this.input) {
      this.input.disabled = true;
    }
    else if(this.inputs) {
      for(var i in this.inputs) {
        if(!this.inputs.hasOwnProperty(i)) continue;
        this.inputs[i].disabled = true;
      }
    }
    if(this.select2) this.select2.select2("enable",false);
    this._super();
  },
  destroy: function() {
    if(this.select2) {
        this.select2.select2('destroy');
        this.select2 = null;
    }
    this._super();
  }
});

JSONEditor.defaults.editors.base64 = JSONEditor.AbstractEditor.extend({
  getNumColumns: function() {
    return 4;
  },
  build: function() {
    var self = this;
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle());

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden');
    this.container.appendChild(this.input);

    // Don't show uploader if this is readonly
    if(!this.schema.readOnly && !this.schema.readonly) {
      if(!window.FileReader) throw "FileReader required for base64 editor";

      // File uploader
      this.uploader = this.theme.getFormInputField('file');

      this.uploader.addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function(evt) {
            self.value = evt.target.result;
            self.refreshPreview();
            self.onChange(true);
            fr = null;
          };
          fr.readAsDataURL(this.files[0]);
        }
      });
    }

    this.preview = this.theme.getFormInputDescription(this.schema.description);
    this.container.appendChild(this.preview);

    this.control = this.theme.getFormControl(this.label, this.uploader||this.input, this.preview);
    this.container.appendChild(this.control);
  },
  refreshPreview: function() {
    if(this.last_preview === this.value) return;
    this.last_preview = this.value;

    this.preview.innerHTML = '';

    if(!this.value) return;

    var mime = this.value.match(/^data:([^;,]+)[;,]/);
    if(mime) mime = mime[1];

    if(!mime) {
      this.preview.innerHTML = '<em>Invalid data URI</em>';
    }
    else {
      this.preview.innerHTML = '<strong>Type:</strong> '+mime+', <strong>Size:</strong> '+Math.floor((this.value.length-this.value.split(',')[0].length-1)/1.33333)+' bytes';
      if(mime.substr(0,5)==="image") {
        this.preview.innerHTML += '<br>';
        var img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100px';
        img.src = this.value;
        this.preview.appendChild(img);
      }
    }
  },
  enable: function() {
    if(this.uploader) this.uploader.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.uploader) this.uploader.disabled = true;
    this._super();
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.input.value = this.value;
      this.refreshPreview();
      this.onChange();
    }
  },
  destroy: function() {
    if(this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  }
});

JSONEditor.defaults.editors.upload = JSONEditor.AbstractEditor.extend({
  getNumColumns: function() {
    return 4;
  },
  build: function() {
    var self = this;
    this.title = this.header = this.label = this.theme.getFormInputLabel(this.getTitle());

    // Input that holds the base64 string
    this.input = this.theme.getFormInputField('hidden');
    this.container.appendChild(this.input);

    // Don't show uploader if this is readonly
    if(!this.schema.readOnly && !this.schema.readonly) {

      if(!this.jsoneditor.options.upload) throw "Upload handler required for upload editor";

      // File uploader
      this.uploader = this.theme.getFormInputField('file');

      this.uploader.addEventListener('change',function(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.files && this.files.length) {
          var fr = new FileReader();
          fr.onload = function(evt) {
            self.preview_value = evt.target.result;
            self.refreshPreview();
            self.onChange(true);
            fr = null;
          };
          fr.readAsDataURL(this.files[0]);
        }
      });
    }

    var description = this.schema.description;
    if (!description) description = '';

    this.preview = this.theme.getFormInputDescription(description);
    this.container.appendChild(this.preview);

    this.control = this.theme.getFormControl(this.label, this.uploader||this.input, this.preview);
    this.container.appendChild(this.control);
  },
  refreshPreview: function() {
    if(this.last_preview === this.preview_value) return;
    this.last_preview = this.preview_value;

    this.preview.innerHTML = '';

    if(!this.preview_value) return;

    var self = this;

    var mime = this.preview_value.match(/^data:([^;,]+)[;,]/);
    if(mime) mime = mime[1];
    if(!mime) mime = 'unknown';

    var file = this.uploader.files[0];

    this.preview.innerHTML = '<strong>Type:</strong> '+mime+', <strong>Size:</strong> '+file.size+' bytes';
    if(mime.substr(0,5)==="image") {
      this.preview.innerHTML += '<br>';
      var img = document.createElement('img');
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100px';
      img.src = this.preview_value;
      this.preview.appendChild(img);
    }

    this.preview.innerHTML += '<br>';
    var uploadButton = this.getButton('Upload', 'upload', 'Upload');
    this.preview.appendChild(uploadButton);
    uploadButton.addEventListener('click',function(event) {
      event.preventDefault();

      uploadButton.setAttribute("disabled", "disabled");
      self.theme.removeInputError(self.uploader);

      if (self.theme.getProgressBar) {
        self.progressBar = self.theme.getProgressBar();
        self.preview.appendChild(self.progressBar);
      }

      self.jsoneditor.options.upload(self.path, file, {
        success: function(url) {
          self.setValue(url);

          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();

          if (self.progressBar) self.preview.removeChild(self.progressBar);
          uploadButton.removeAttribute("disabled");
        },
        failure: function(error) {
          self.theme.addInputError(self.uploader, error);
          if (self.progressBar) self.preview.removeChild(self.progressBar);
          uploadButton.removeAttribute("disabled");
        },
        updateProgress: function(progress) {
          if (self.progressBar) {
            if (progress) self.theme.updateProgressBar(self.progressBar, progress);
            else self.theme.updateProgressBarUnknown(self.progressBar);
          }
        }
      });
    });
  },
  enable: function() {
    if(this.uploader) this.uploader.disabled = false;
    this._super();
  },
  disable: function() {
    if(this.uploader) this.uploader.disabled = true;
    this._super();
  },
  setValue: function(val) {
    if(this.value !== val) {
      this.value = val;
      this.input.value = this.value;
      this.onChange();
    }
  },
  destroy: function() {
    if(this.preview && this.preview.parentNode) this.preview.parentNode.removeChild(this.preview);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    if(this.uploader && this.uploader.parentNode) this.uploader.parentNode.removeChild(this.uploader);

    this._super();
  }
});

JSONEditor.defaults.editors.checkbox = JSONEditor.AbstractEditor.extend({
  setValue: function(value,initial) {
    this.value = !!value;
    this.input.checked = this.value;
    this.onChange();
  },
  register: function() {
    this._super();
    if(!this.input) return;
    this.input.setAttribute('name',this.formname);
  },
  unregister: function() {
    this._super();
    if(!this.input) return;
    this.input.removeAttribute('name');
  },
  getNumColumns: function() {
    return Math.min(12,Math.max(this.getTitle().length/7,2));
  },
  build: function() {
    var self = this;
    if(!this.options.compact) {
      this.label = this.header = this.theme.getCheckboxLabel(this.getTitle());
    }
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    if(this.options.compact) this.container.className += ' compact';

    this.input = this.theme.getCheckbox();
    this.control = this.theme.getFormControl(this.label, this.input, this.description);

    if(this.schema.readOnly || this.schema.readonly) {
      this.always_disabled = true;
      this.input.disabled = true;
    }

    this.input.addEventListener('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.value = this.checked;
      self.onChange(true);
    });

    this.container.appendChild(this.control);
  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
    }
    this._super();
  },
  disable: function() {
    this.input.disabled = true;
    this._super();
  },
  destroy: function() {
    if(this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
    this._super();
  }
});

JSONEditor.defaults.editors.arraySelectize = JSONEditor.AbstractEditor.extend({
  build: function() {
    this.title = this.theme.getFormInputLabel(this.getTitle());

    this.title_controls = this.theme.getHeaderButtonHolder();
    this.title.appendChild(this.title_controls);
    this.error_holder = document.createElement('div');

    if(this.schema.description) {
      this.description = this.theme.getDescription(this.schema.description);
    }

    this.input = document.createElement('select');
    this.input.setAttribute('multiple', 'multiple');

    var group = this.theme.getFormControl(this.title, this.input, this.description);

    this.container.appendChild(group);
    this.container.appendChild(this.error_holder);

    window.jQuery(this.input).selectize({
      delimiter: false,
      createOnBlur: true,
      create: true
    });
  },
  postBuild: function() {
      var self = this;
      this.input.selectize.on('change', function(event) {
          self.refreshValue();
          self.onChange(true);
      });
  },
  destroy: function() {
    this.empty(true);
    if(this.title && this.title.parentNode) this.title.parentNode.removeChild(this.title);
    if(this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
    if(this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);

    this._super();
  },
  empty: function(hard) {},
  setValue: function(value, initial) {
    var self = this;
    // Update the array's value, adding/removing rows when necessary
    value = value || [];
    if(!(Array.isArray(value))) value = [value];

    this.input.selectize.clearOptions();
    this.input.selectize.clear(true);

    value.forEach(function(item) {
      self.input.selectize.addOption({text: item, value: item});
    });
    this.input.selectize.setValue(value);

    this.refreshValue(initial);
  },
  refreshValue: function(force) {
    this.value = this.input.selectize.getValue();
  },
  showValidationErrors: function(errors) {
    var self = this;

    // Get all the errors that pertain to this editor
    var my_errors = [];
    var other_errors = [];
    $each(errors, function(i,error) {
      if(error.path === self.path) {
        my_errors.push(error);
      }
      else {
        other_errors.push(error);
      }
    });

    // Show errors for this editor
    if(this.error_holder) {

      if(my_errors.length) {
        var message = [];
        this.error_holder.innerHTML = '';
        this.error_holder.style.display = '';
        $each(my_errors, function(i,error) {
          self.error_holder.appendChild(self.theme.getErrorMessage(error.message));
        });
      }
      // Hide error area
      else {
        this.error_holder.style.display = 'none';
      }
    }
  }
});

var matchKey = (function () {
  var elem = document.documentElement;

  if (elem.matches) return 'matches';
  else if (elem.webkitMatchesSelector) return 'webkitMatchesSelector';
  else if (elem.mozMatchesSelector) return 'mozMatchesSelector';
  else if (elem.msMatchesSelector) return 'msMatchesSelector';
  else if (elem.oMatchesSelector) return 'oMatchesSelector';
})();

JSONEditor.AbstractTheme = Class.extend({
  getContainer: function() {
    return document.createElement('div');
  },
  getFloatRightLinkHolder: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.cssFloat = 'right';
    el.style.marginLeft = '10px';
    return el;
  },
  getModal: function() {
    var el = document.createElement('div');
    el.style.backgroundColor = 'white';
    el.style.border = '1px solid black';
    el.style.boxShadow = '3px 3px black';
    el.style.position = 'absolute';
    el.style.zIndex = '10';
    el.style.display = 'none';
    return el;
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row';
    return el;
  },
  getGridColumn: function() {
    var el = document.createElement('div');
    return el;
  },
  setGridColumnSize: function(el,size) {

  },
  getLink: function(text) {
    var el = document.createElement('a');
    el.setAttribute('href','#');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  disableHeader: function(header) {
    header.style.color = '#ccc';
  },
  disableLabel: function(label) {
    label.style.color = '#ccc';
  },
  enableHeader: function(header) {
    header.style.color = '';
  },
  enableLabel: function(label) {
    label.style.color = '';
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    el.appendChild(document.createTextNode(text));
    return el;
  },
  getCheckboxLabel: function(text) {
    var el = this.getFormInputLabel(text);
    el.style.fontWeight = 'normal';
    return el;
  },
  getHeader: function(text) {
    //var el = document.createElement('h3');
    var el = document.createElement('div');


    // REB
    // if(typeof text === "string") {
    //   el.textContent = 'text';
    // }
    // else {
    //   el.appendChild(text);
    // }

    return el;
  },
  getCheckbox: function() {
    var el = this.getFormInputField('checkbox');
    el.style.display = 'inline-block';
    el.style.width = 'auto';
    return el;
  },
  getMultiCheckboxHolder: function(controls,label,description) {
    var el = document.createElement('div');

    if(label) {
      label.style.display = 'block';
      el.appendChild(label);
    }

    for(var i in controls) {
      if(!controls.hasOwnProperty(i)) continue;
      controls[i].style.display = 'inline-block';
      controls[i].style.marginRight = '20px';
      el.appendChild(controls[i]);
    }

    if(description) el.appendChild(description);

    return el;
  },
  getSelectInput: function(options) {
    var select = document.createElement('select');
    if(options) this.setSelectOptions(select, options);
    return select;
  },
  getSwitcher: function(options) {
    var switcher = this.getSelectInput(options);
    switcher.style.backgroundColor = 'transparent';
    switcher.style.display = 'inline-block';
    switcher.style.fontStyle = 'italic';
    switcher.style.fontWeight = 'normal';
    switcher.style.height = 'auto';
    switcher.style.marginBottom = 0;
    switcher.style.marginLeft = '5px';
    switcher.style.padding = '0 0 0 3px';
    switcher.style.width = 'auto';
    return switcher;
  },
  getSwitcherOptions: function(switcher) {
    return switcher.getElementsByTagName('option');
  },
  setSwitcherOptions: function(switcher, options, titles) {
    this.setSelectOptions(switcher, options, titles);
  },
  setSelectOptions: function(select, options, titles) {
    titles = titles || [];
    select.innerHTML = '';
    for(var i=0; i<options.length; i++) {
      var option = document.createElement('option');
      option.setAttribute('value',options[i]);
      option.textContent = titles[i] || options[i];
      select.appendChild(option);
    }
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.style = el.style || {};
    el.style.width = '100%';
    el.style.height = '300px';
    el.style.boxSizing = 'border-box';
    return el;
  },
  getRangeInput: function(min,max,step) {
    var el = this.getFormInputField('range');
    el.setAttribute('min',min);
    el.setAttribute('max',max);
    el.setAttribute('step',step);
    return el;
  },
  getFormInputField: function(type) {
    var el = document.createElement('input');
    el.setAttribute('type',type);
    return el;
  },
  afterInputReady: function(input) {

  },
  getFormControl: function(label, input, description) {
    var el = document.createElement('div');
    el.className = 'form-control';
    if(label) el.appendChild(label);
    if(input.type === 'checkbox') {
      label.insertBefore(input,label.firstChild);
    }
    else {
      el.appendChild(input);
    }

    if(description) el.appendChild(description);
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.style = el.style || {};
    el.style.paddingLeft = '10px';
    el.style.marginLeft = '10px';
    el.style.borderLeft = '1px solid #ccc';
    return el;
  },
  getChildEditorHolder: function() {
    return document.createElement('div');
  },
  getDescription: function(text) {
    var el = document.createElement('p');
    el.innerHTML = text;
    return el;
  },
  getCheckboxDescription: function(text) {
    return this.getDescription(text);
  },
  getFormInputDescription: function(text) {
    return this.getDescription(text);
  },
  getHeaderButtonHolder: function() {
    return this.getButtonHolder();
  },
  getButtonHolder: function() {
    return document.createElement('div');
  },
  getButton: function(text, icon, title) {
    var el = document.createElement('button');
    el.type = 'button';
    this.setButtonText(el,text,icon,title);
    return el;
  },
  setButtonText: function(button, text, icon, title) {
    button.innerHTML = '';
    if(icon) {
      button.appendChild(icon);
      button.innerHTML += ' ';
    }
    button.appendChild(document.createTextNode(text));
    if(title) button.setAttribute('title',title);
  },
  getTable: function() {
    return document.createElement('table');
  },
  getTableRow: function() {
    return document.createElement('tr');
  },
  getTableHead: function() {
    return document.createElement('thead');
  },
  getTableBody: function() {
    return document.createElement('tbody');
  },
  getTableHeaderCell: function(text) {
    var el = document.createElement('th');
    el.textContent = text;
    return el;
  },
  getTableCell: function() {
    var el = document.createElement('td');
    return el;
  },
  getErrorMessage: function(text) {
    var el = document.createElement('p');
    el.style = el.style || {};
    el.style.color = 'red';
    el.appendChild(document.createTextNode(text));
    return el;
  },
  addInputError: function(input, text) {
  },
  removeInputError: function(input) {
  },
  addTableRowError: function(row) {
  },
  removeTableRowError: function(row) {
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div style='float: left; width: 130px;' class='tabs'></div><div class='content' style='margin-left: 130px;'></div><div style='clear:both;'></div>";
    return el;
  },
  applyStyles: function(el,styles) {
    el.style = el.style || {};
    for(var i in styles) {
      if(!styles.hasOwnProperty(i)) continue;
      el.style[i] = styles[i];
    }
  },
  closest: function(elem, selector) {
    while (elem && elem !== document) {
      if (elem[matchKey]) {
        if (elem[matchKey](selector)) {
          return elem;
        } else {
          elem = elem.parentNode;
        }
      }
      else {
        return false;
      }
    }
    return false;
  },
  getTab: function(span) {
    var el = document.createElement('div');
    el.appendChild(span);
    el.style = el.style || {};
    this.applyStyles(el,{
      border: '1px solid #ccc',
      borderWidth: '1px 0 1px 1px',
      textAlign: 'center',
      lineHeight: '30px',
      borderRadius: '5px',
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      fontWeight: 'bold',
      cursor: 'pointer'
    });
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    return this.getIndentedPanel();
  },
  markTabActive: function(tab) {
    this.applyStyles(tab,{
      opacity: 1,
      background: 'white'
    });
  },
  markTabInactive: function(tab) {
    this.applyStyles(tab,{
      opacity:0.5,
      background: ''
    });
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  getBlockLink: function() {
    var link = document.createElement('a');
    link.style.display = 'block';
    return link;
  },
  getBlockLinkHolder: function() {
    var el = document.createElement('div');
    return el;
  },
  getLinksHolder: function() {
    var el = document.createElement('div');
    return el;
  },
  createMediaLink: function(holder,link,media) {
    holder.appendChild(link);
    media.style.width='100%';
    holder.appendChild(media);
  },
  createImageLink: function(holder,link,image) {
    holder.appendChild(link);
    link.appendChild(image);
  }
});

JSONEditor.defaults.themes.bootstrap2 = JSONEditor.AbstractTheme.extend({
  getRangeInput: function(min, max, step) {
    // TODO: use bootstrap slider
    return this._super(min, max, step);
  },
  getGridContainer: function() {
    var el = document.createElement('div');
    el.className = 'container-fluid';
    return el;
  },
  getGridRow: function() {
    var el = document.createElement('div');
    el.className = 'row-fluid';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    el.style.fontWeight = 'bold';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'span'+size;
  },
  getSelectInput: function(options) {
    var input = this._super(options);
    input.style.width = 'auto';
    input.style.maxWidth = '98%';
    return input;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '98%';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.control-group');
    input.controls = this.closest(input,'.controls');
    if(this.closest(input,'.compact')) {
      input.controlgroup.className = input.controlgroup.className.replace(/control-group/g,'').replace(/[ ]{2,}/g,' ');
      input.controls.className = input.controlgroup.className.replace(/controls/g,'').replace(/[ ]{2,}/g,' ');
      input.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-small';
    el.style.paddingBottom = 0;
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-inline';
    el.textContent = text;
    return el;
  },
  getFormControl: function(label, input, description) {
    var ret = document.createElement('div');
    ret.className = 'control-group';

    var controls = document.createElement('div');
    controls.className = 'controls';

    if(label && input.getAttribute('type') === 'checkbox') {
      ret.appendChild(controls);
      label.className += ' checkbox';
      label.appendChild(input);
      controls.appendChild(label);
      controls.style.height = '30px';
    }
    else {
      if(label) {
        label.className += ' control-label';
        ret.appendChild(label);
      }
      controls.appendChild(input);
      ret.appendChild(controls);
    }

    if(description) controls.appendChild(description);

    return ret;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
   // el.style.marginLeft = '10px'; REB
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el =  this._super(text, icon, title);
    el.className += ' btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.controlgroup || !input.controls) return;
    input.controlgroup.className += ' error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.className = 'tabbable tabs-left';
    el.innerHTML = "<ul class='nav nav-tabs span2' style='margin-right: 0;'></ul><div class='tab-content span10' style='overflow:visible;'></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('li');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-pane active';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  },
  getProgressBar: function() {
    var container = document.createElement('div');
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = '0%';
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    progressBar.firstChild.style.width = progress + "%";
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    progressBar.className = 'progress progress-striped active';
    progressBar.firstChild.style.width = '100%';
  }
});

JSONEditor.defaults.themes.bootstrap3 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += 'form-control';
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += 'form-control';
    }
    return el;
  },
  getFormControl: function(label, input, description) {
    var group = document.createElement('div');

    if(label && input.type === 'checkbox') {
      group.className += ' checkbox';
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      group.appendChild(label);
      input.style.position = 'relative';
      input.style.cssFloat = 'left';
    }
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if(description) group.appendChild(description);

    return group;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
    el.style.paddingBottom = 0;
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.innerHTML = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
   // el.style.marginLeft = '10px'; REB
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) return;
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('a');
    el.className = 'list-group-item';
    el.setAttribute('href','#');
    el.appendChild(text);
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s?active/g,'');
  },
  getProgressBar: function() {
    var min = 0, max = 100, start = 0;

    var container = document.createElement('div');
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', start);
    bar.setAttribute('aria-valuemin', min);
    bar.setAttribute('aria-valuenax', max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute('aria-valuenow', progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.className = 'progress progress-striped active';
    bar.removeAttribute('aria-valuenow');
    bar.style.width = '100%';
    bar.innerHTML = '';
  }
});

// Base Foundation theme
JSONEditor.defaults.themes.foundation = JSONEditor.AbstractTheme.extend({
  getChildEditorHolder: function() {
    var el = document.createElement('div');
    el.style.marginBottom = '15px';
    return el;
  },
  getSelectInput: function(options) {
    var el = this._super(options);
    el.style.minWidth = 'none';
    el.style.padding = '5px';
    el.style.marginTop = '3px';
    return el;
  },
  getSwitcher: function(options) {
    var el = this._super(options);
    el.style.paddingRight = '8px';
    return el;
  },
  afterInputReady: function(input) {
    if(this.closest(input,'.compact')) {
      input.style.marginBottom = 0;
    }
    input.group = this.closest(input,'.form-control');
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    el.style.width = '100%';
    el.style.marginBottom = type==='checkbox'? '0' : '12px';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.textContent = text;
    el.style.marginTop = '-10px';
    el.style.fontStyle = 'italic';
    return el;
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'panel';
    el.style.paddingBottom = 0;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += ' small button';
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) return;
    input.group.className += ' error';

    if(!input.errmsg) {
      input.insertAdjacentHTML('afterend','<small class="error"></small>');
      input.errmsg = input.parentNode.getElementsByClassName('error')[0];
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.group.className = input.group.className.replace(/ error/g,'');
    input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var progressBar = document.createElement('div');
    progressBar.className = 'progress';

    var meter = document.createElement('span');
    meter.className = 'meter';
    meter.style.width = '0%';
    progressBar.appendChild(meter);
    return progressBar;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = progress + '%';
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;
    progressBar.firstChild.style.width = '100%';
  }
});

// Foundation 3 Specific Theme
JSONEditor.defaults.themes.foundation3 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.className = 'row';
    el.innerHTML = "<dl class='tabs vertical two columns'></dl><div class='tabs-content ten columns'></div>";
    return el;
  },
  setGridColumnSize: function(el,size) {
    var sizes = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    el.className = 'columns '+sizes[size];
  },
  getTab: function(text) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

// Foundation 4 Specific Theme
JSONEditor.defaults.themes.foundation4 = JSONEditor.defaults.themes.foundation.extend({
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.style.fontSize = '.6em';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns large-'+size;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.fontWeight = 'bold';
    return el;
  }
});

// Foundation 5 Specific Theme
JSONEditor.defaults.themes.foundation5 = JSONEditor.defaults.themes.foundation.extend({
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8rem';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'columns medium-'+size;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text,icon,title);
    el.className = el.className.replace(/\s*small/g,'') + ' tiny';
    return el;
  },
  getTabHolder: function() {
    var el = document.createElement('div');
    el.innerHTML = "<dl class='tabs vertical'></dl><div class='tabs-content vertical'></div>";
    return el;
  },
  getTab: function(text) {
    var el = document.createElement('dd');
    var a = document.createElement('a');
    a.setAttribute('href','#');
    a.appendChild(text);
    el.appendChild(a);
    return el;
  },
  getTabContentHolder: function(tab_holder) {
    return tab_holder.children[1];
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'content active';
    el.style.paddingLeft = '5px';
    return el;
  },
  markTabActive: function(tab) {
    tab.className += ' active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*active/g,'');
  },
  addTab: function(holder, tab) {
    holder.children[0].appendChild(tab);
  }
});

JSONEditor.defaults.themes.foundation6 = JSONEditor.defaults.themes.foundation5.extend({
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'callout secondary';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'button-group tiny';
    el.style.marginBottom = 0;
    return el;
  },
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'block';
    return el;
  },
  getFormControl: function(label, input, description) {
    var el = document.createElement('div');
    el.className = 'form-control';
    if(label) el.appendChild(label);
    if(input.type === 'checkbox') {
      label.insertBefore(input,label.firstChild);
    }
    else if (label) {
      label.appendChild(input);
    } else {
      el.appendChild(input);
    }

    if(description) label.appendChild(description);
    return el;
  },
  addInputError: function(input,text) {
    if(!input.group) return;
    input.group.className += ' error';

    if(!input.errmsg) {
      var errorEl = document.createElement('span');
      errorEl.className = 'form-error is-visible';
      input.group.getElementsByTagName('label')[0].appendChild(errorEl);

      input.className = input.className + ' is-invalid-input';

      input.errmsg = errorEl;
    }
    else {
      input.errmsg.style.display = '';
      input.className = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.className = input.className.replace(/ is-invalid-input/g,'');
    if(input.errmsg.parentNode) {
      input.errmsg.parentNode.removeChild(input.errmsg);
    }
  },
});

JSONEditor.defaults.themes.html = JSONEditor.AbstractTheme.extend({
  getFormInputLabel: function(text) {
    var el = this._super(text);
    el.style.display = 'block';
    el.style.marginBottom = '3px';
    el.style.fontWeight = 'bold';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8em';
    el.style.margin = 0;
    el.style.display = 'inline-block';
    el.style.fontStyle = 'italic';
    return el;
  },
  getIndentedPanel: function() {
    var el = this._super();
    el.style.border = '1px solid #ddd';
    el.style.padding = '5px';
    el.style.margin = '5px';
    el.style.borderRadius = '3px';
    return el;
  },
  getChildEditorHolder: function() {
    var el = this._super();
    el.style.marginBottom = '8px';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.fontSize = '.8em';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getTable: function() {
    var el = this._super();
    el.style.borderBottom = '1px solid #ccc';
    el.style.marginBottom = '5px';
    return el;
  },
  addInputError: function(input, text) {
    input.style.borderColor = 'red';

    if(!input.errmsg) {
      var group = this.closest(input,'.form-control');
      input.errmsg = document.createElement('div');
      input.errmsg.setAttribute('class','errmsg');
      input.errmsg.style = input.errmsg.style || {};
      input.errmsg.style.color = 'red';
      group.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = 'block';
    }

    input.errmsg.innerHTML = '';
    input.errmsg.appendChild(document.createTextNode(text));
  },
  removeInputError: function(input) {
    input.style.borderColor = '';
    if(input.errmsg) input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var max = 100, start = 0;

    var progressBar = document.createElement('progress');
    progressBar.setAttribute('max', max);
    progressBar.setAttribute('value', start);
    return progressBar;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;
    progressBar.setAttribute('value', progress);
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;
    progressBar.removeAttribute('value');
  }
});

JSONEditor.defaults.themes.jqueryui = JSONEditor.AbstractTheme.extend({
  getTable: function() {
    var el = this._super();
    el.setAttribute('cellpadding',5);
    el.setAttribute('cellspacing',0);
    return el;
  },
  getTableHeaderCell: function(text) {
    var el = this._super(text);
    el.className = 'ui-state-active';
    el.style.fontWeight = 'bold';
    return el;
  },
  getTableCell: function() {
    var el = this._super();
    el.className = 'ui-widget-content';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    el.style.fontSize = '.6em';
    el.style.display = 'inline-block';
    return el;
  },
  getFormInputDescription: function(text) {
    var el = this.getDescription(text);
    el.style.marginLeft = '10px';
    el.style.display = 'inline-block';
    return el;
  },
  getFormControl: function(label, input, description) {
    var el = this._super(label,input,description);
    if(input.type === 'checkbox') {
      el.style.lineHeight = '25px';

      el.style.padding = '3px 0';
    }
    else {
      el.style.padding = '4px 0 8px 0';
    }
    return el;
  },
  getDescription: function(text) {
    var el = document.createElement('span');
    el.style.fontSize = '.8em';
    el.style.fontStyle = 'italic';
    el.textContent = text;
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'ui-buttonset';
    el.style.fontSize = '.7em';
    return el;
  },
  getFormInputLabel: function(text) {
    var el = document.createElement('label');
    el.style.fontWeight = 'bold';
    el.style.display = 'block';
    el.textContent = text;
    return el;
  },
  getButton: function(text, icon, title) {
    var button = document.createElement("button");
    button.className = 'ui-button ui-widget ui-state-default ui-corner-all';

    // Icon only
    if(icon && !text) {
      button.className += ' ui-button-icon-only';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.className += ' ui-button-text-icon-primary';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Text only
    else {
      button.className += ' ui-button-text-only';
    }

    var el = document.createElement('span');
    el.className = 'ui-button-text';
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);

    return button;
  },
  setButtonText: function(button,text, icon, title) {
    button.innerHTML = '';
    button.className = 'ui-button ui-widget ui-state-default ui-corner-all';

    // Icon only
    if(icon && !text) {
      button.className += ' ui-button-icon-only';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Icon and Text
    else if(icon) {
      button.className += ' ui-button-text-icon-primary';
      icon.className += ' ui-button-icon-primary ui-icon-primary';
      button.appendChild(icon);
    }
    // Text only
    else {
      button.className += ' ui-button-text-only';
    }

    var el = document.createElement('span');
    el.className = 'ui-button-text';
    el.textContent = text||title||".";
    button.appendChild(el);

    button.setAttribute('title',title);
  },
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'ui-widget-content ui-corner-all';
    el.style.padding = '1em 1.4em';
    el.style.marginBottom = '20px';
    return el;
  },
  afterInputReady: function(input) {
    if(input.controls) return;
    input.controls = this.closest(input,'.form-control');
  },
  addInputError: function(input,text) {
    if(!input.controls) return;
    if(!input.errmsg) {
      input.errmsg = document.createElement('div');
      input.errmsg.className = 'ui-state-error';
      input.controls.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
  },
  markTabActive: function(tab) {
    tab.className = tab.className.replace(/\s*ui-widget-header/g,'')+' ui-state-active';
  },
  markTabInactive: function(tab) {
    tab.className = tab.className.replace(/\s*ui-state-active/g,'')+' ui-widget-header';
  }
});

JSONEditor.defaults.themes.barebones = JSONEditor.AbstractTheme.extend({
    getFormInputLabel: function (text) {
        var el = this._super(text);
        return el;
    },
    getFormInputDescription: function (text) {
        var el = this._super(text);
        return el;
    },
    getIndentedPanel: function () {
        var el = this._super();
        return el;
    },
    getChildEditorHolder: function () {
        var el = this._super();
        return el;
    },
    getHeaderButtonHolder: function () {
        var el = this.getButtonHolder();
        return el;
    },
    getTable: function () {
        var el = this._super();
        return el;
    },
    addInputError: function (input, text) {
        if (!input.errmsg) {
            var group = this.closest(input, '.form-control');
            input.errmsg = document.createElement('div');
            input.errmsg.setAttribute('class', 'errmsg');
            group.appendChild(input.errmsg);
        }
        else {
            input.errmsg.style.display = 'block';
        }

        input.errmsg.innerHTML = '';
        input.errmsg.appendChild(document.createTextNode(text));
    },
    removeInputError: function (input) {
        input.style.borderColor = '';
        if (input.errmsg) input.errmsg.style.display = 'none';
    },
    getProgressBar: function () {
        var max = 100, start = 0;

        var progressBar = document.createElement('progress');
        progressBar.setAttribute('max', max);
        progressBar.setAttribute('value', start);
        return progressBar;
    },
    updateProgressBar: function (progressBar, progress) {
        if (!progressBar) return;
        progressBar.setAttribute('value', progress);
    },
    updateProgressBarUnknown: function (progressBar) {
        if (!progressBar) return;
        progressBar.removeAttribute('value');
    }
});

JSONEditor.AbstractIconLib = Class.extend({
  mapping: {
    collapse: '',
    expand: '',
    "delete": '',
    edit: '',
    add: '',
    cancel: '',
    save: '',
    moveup: '',
    movedown: ''
  },
  icon_prefix: '',
  getIconClass: function(key) {
    if(this.mapping[key]) return this.icon_prefix+this.mapping[key];
    else return null;
  },
  getIcon: function(key) {
    var iconclass = this.getIconClass(key);

    if(!iconclass) return null;

    var i = document.createElement('i');
    i.className = iconclass;
    return i;
  }
});

JSONEditor.defaults.iconlibs.bootstrap2 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-up',
    "delete": 'trash',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'ok',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'icon-'
});

JSONEditor.defaults.iconlibs.bootstrap3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    "delete": 'remove',
    edit: 'pencil',
    add: 'plus',
    cancel: 'floppy-remove',
    save: 'floppy-saved',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'glyphicon glyphicon-'
});

JSONEditor.defaults.iconlibs.fontawesome3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'chevron-down',
    expand: 'chevron-right',
    "delete": 'remove',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban-circle',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'icon-'
});

JSONEditor.defaults.iconlibs.fontawesome4 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'caret-square-o-down',
    expand: 'caret-square-o-right',
    "delete": 'times',
    edit: 'pencil',
    add: 'plus',
    cancel: 'ban',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'fa fa-'
});

JSONEditor.defaults.iconlibs.foundation2 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'minus',
    expand: 'plus',
    "delete": 'remove',
    edit: 'edit',
    add: 'add-doc',
    cancel: 'error',
    save: 'checkmark',
    moveup: 'up-arrow',
    movedown: 'down-arrow'
  },
  icon_prefix: 'foundicon-'
});

JSONEditor.defaults.iconlibs.foundation3 = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'minus',
    expand: 'plus',
    "delete": 'x',
    edit: 'pencil',
    add: 'page-add',
    cancel: 'x-circle',
    save: 'save',
    moveup: 'arrow-up',
    movedown: 'arrow-down'
  },
  icon_prefix: 'fi-'
});

JSONEditor.defaults.iconlibs.jqueryui = JSONEditor.AbstractIconLib.extend({
  mapping: {
    collapse: 'triangle-1-s',
    expand: 'triangle-1-e',
    "delete": 'trash',
    edit: 'pencil',
    add: 'plusthick',
    cancel: 'closethick',
    save: 'disk',
    moveup: 'arrowthick-1-n',
    movedown: 'arrowthick-1-s'
  },
  icon_prefix: 'ui-icon ui-icon-'
});

JSONEditor.defaults.templates["default"] = function() {
  return {
    compile: function(template) {
      var matches = template.match(/{{\s*([a-zA-Z0-9\-_ \.]+)\s*}}/g);
      var l = matches && matches.length;

      // Shortcut if the template contains no variables
      if(!l) return function() { return template; };

      // Pre-compute the search/replace functions
      // This drastically speeds up template execution
      var replacements = [];
      var get_replacement = function(i) {
        var p = matches[i].replace(/[{}]+/g,'').trim().split('.');
        var n = p.length;
        var func;

        if(n > 1) {
          var cur;
          func = function(vars) {
            cur = vars;
            for(i=0; i<n; i++) {
              cur = cur[p[i]];
              if(!cur) break;
            }
            return cur;
          };
        }
        else {
          p = p[0];
          func = function(vars) {
            return vars[p];
          };
        }

        replacements.push({
          s: matches[i],
          r: func
        });
      };
      for(var i=0; i<l; i++) {
        get_replacement(i);
      }

      // The compiled function
      return function(vars) {
        var ret = template+"";
        var r;
        for(i=0; i<l; i++) {
          r = replacements[i];
          ret = ret.replace(r.s, r.r(vars));
        }
        return ret;
      };
    }
  };
};

JSONEditor.defaults.templates.ejs = function() {
  if(!window.EJS) return false;

  return {
    compile: function(template) {
      var compiled = new window.EJS({
        text: template
      });

      return function(context) {
        return compiled.render(context);
      };
    }
  };
};

JSONEditor.defaults.templates.handlebars = function() {
  return window.Handlebars;
};

JSONEditor.defaults.templates.hogan = function() {
  if(!window.Hogan) return false;

  return {
    compile: function(template) {
      var compiled = window.Hogan.compile(template);
      return function(context) {
        return compiled.render(context);
      };
    }
  };
};

JSONEditor.defaults.templates.markup = function() {
  if(!window.Mark || !window.Mark.up) return false;

  return {
    compile: function(template) {
      return function(context) {
        return window.Mark.up(template,context);
      };
    }
  };
};

JSONEditor.defaults.templates.mustache = function() {
  if(!window.Mustache) return false;

  return {
    compile: function(template) {
      return function(view) {
        return window.Mustache.render(template, view);
      };
    }
  };
};

JSONEditor.defaults.templates.swig = function() {
  return window.swig;
};

JSONEditor.defaults.templates.underscore = function() {
  if(!window._) return false;

  return {
    compile: function(template) {
      return function(context) {
        return window._.template(template, context);
      };
    }
  };
};

// Set the default theme
JSONEditor.defaults.theme = 'html';

// Set the default template engine
JSONEditor.defaults.template = 'default';

// Default options when initializing JSON Editor
JSONEditor.defaults.options = {};

// String translate function
JSONEditor.defaults.translate = function(key, variables) {
  var lang = JSONEditor.defaults.languages[JSONEditor.defaults.language];
  if(!lang) throw "Unknown language "+JSONEditor.defaults.language;

  var string = lang[key] || JSONEditor.defaults.languages[JSONEditor.defaults.default_language][key];

  if(typeof string === "undefined") throw "Unknown translate string "+key;

  if(variables) {
    for(var i=0; i<variables.length; i++) {
      string = string.replace(new RegExp('\\{\\{'+i+'}}','g'),variables[i]);
    }
  }

  return string;
};

// Translation strings and default languages
JSONEditor.defaults.default_language = 'en';
JSONEditor.defaults.language = JSONEditor.defaults.default_language;
JSONEditor.defaults.languages.en = {
  /**
   * When a property is not set
   */
  error_notset: "Property must be set",
  /**
   * When a string must not be empty
   */
  error_notempty: "Value required",
  /**
   * When a value is not one of the enumerated values
   */
  error_enum: "Value must be one of the enumerated values",
  /**
   * When a value doesn't validate any schema of a 'anyOf' combination
   */
  error_anyOf: "Value must validate against at least one of the provided schemas",
  /**
   * When a value doesn't validate
   * @variables This key takes one variable: The number of schemas the value does not validate
   */
  error_oneOf: 'Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.',
  /**
   * When a value does not validate a 'not' schema
   */
  error_not: "Value must not validate against the provided schema",
  /**
   * When a value does not match any of the provided types
   */
  error_type_union: "Value must be one of the provided types",
  /**
   * When a value does not match the given type
   * @variables This key takes one variable: The type the value should be of
   */
  error_type: "Value must be of type {{0}}",
  /**
   *  When the value validates one of the disallowed types
   */
  error_disallow_union: "Value must not be one of the provided disallowed types",
  /**
   *  When the value validates a disallowed type
   * @variables This key takes one variable: The type the value should not be of
   */
  error_disallow: "Value must not be of type {{0}}",
  /**
   * When a value is not a multiple of or divisible by a given number
   * @variables This key takes one variable: The number mentioned above
   */
  error_multipleOf: "Value must be a multiple of {{0}}",
  /**
   * When a value is greater than it's supposed to be (exclusive)
   * @variables This key takes one variable: The maximum
   */
  error_maximum_excl: "Value must be less than {{0}}",
  /**
   * When a value is greater than it's supposed to be (inclusive
   * @variables This key takes one variable: The maximum
   */
  error_maximum_incl: "Value must be at most {{0}}",
  /**
   * When a value is lesser than it's supposed to be (exclusive)
   * @variables This key takes one variable: The minimum
   */
  error_minimum_excl: "Value must be greater than {{0}}",
  /**
   * When a value is lesser than it's supposed to be (inclusive)
   * @variables This key takes one variable: The minimum
   */
  error_minimum_incl: "Value must be at least {{0}}",
  /**
   * When a value have too many characters
   * @variables This key takes one variable: The maximum character count
   */
  error_maxLength: "Value must be at most {{0}} characters long",
  /**
   * When a value does not have enough characters
   * @variables This key takes one variable: The minimum character count
   */
  error_minLength: "Value must be at least {{0}} characters long",
  /**
   * When a value does not match a given pattern
   */
  error_pattern: "Value must match the pattern {{0}}",
  /**
   * When an array has additional items whereas it is not supposed to
   */
  error_additionalItems: "No additional items allowed in this array",
  /**
   * When there are to many items in an array
   * @variables This key takes one variable: The maximum item count
   */
  error_maxItems: "Value must have at most {{0}} items",
  /**
   * When there are not enough items in an array
   * @variables This key takes one variable: The minimum item count
   */
  error_minItems: "Value must have at least {{0}} items",
  /**
   * When an array is supposed to have unique items but has duplicates
   */
  error_uniqueItems: "Array must have unique items",
  /**
   * When there are too many properties in an object
   * @variables This key takes one variable: The maximum property count
   */
  error_maxProperties: "Object must have at most {{0}} properties",
  /**
   * When there are not enough properties in an object
   * @variables This key takes one variable: The minimum property count
   */
  error_minProperties: "Object must have at least {{0}} properties",
  /**
   * When a required property is not defined
   * @variables This key takes one variable: The name of the missing property
   */
  error_required: "Object is missing the required property '{{0}}'",
  /**
   * When there is an additional property is set whereas there should be none
   * @variables This key takes one variable: The name of the additional property
   */
  error_additional_properties: "No additional properties allowed, but property {{0}} is set",
  /**
   * When a dependency is not resolved
   * @variables This key takes one variable: The name of the missing property for the dependency
   */
  error_dependency: "Must have property {{0}}",
  /**
   * Text on Delete All buttons
   */
  button_delete_all: "All",
  /**
   * Title on Delete All buttons
   */
  button_delete_all_title: "Delete All",
  /**
    * Text on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
  button_delete_last: "Last {{0}}",
  /**
    * Title on Delete Last buttons
    * @variable This key takes one variable: The title of object to delete
    */
  button_delete_last_title: "Delete Last {{0}}",
  /**
    * Title on Add Row buttons
    * @variable This key takes one variable: The title of object to add
    */
  button_add_row_title: "Add {{0}}",
  /**
    * Title on Move Down buttons
    */
  button_move_down_title: "Move down",
  /**
    * Title on Move Up buttons
    */
  button_move_up_title: "Move up",
  /**
    * Title on Delete Row buttons
    * @variable This key takes one variable: The title of object to delete
    */
  button_delete_row_title: "Delete {{0}}",
  /**
    * Title on Delete Row buttons, short version (no parameter with the object title)
    */
  button_delete_row_title_short: "Delete",
  /**
    * Title on Collapse buttons
    */
  button_collapse: "Collapse",
  /**
    * Title on Expand buttons
    */
  button_expand: "Expand"
};

// Miscellaneous Plugin Settings
JSONEditor.plugins = {
  ace: {
    theme: ''
  },
  epiceditor: {

  },
  sceditor: {

  },
  select2: {

  },
  selectize: {
  }
};

// Default per-editor options
$each(JSONEditor.defaults.editors, function(i,editor) {
  JSONEditor.defaults.editors[i].options = editor.options || {};
});

// Set the default resolvers
// Use "multiple" as a fall back for everything
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(typeof schema.type !== "string") return "multiple";
});
// If the type is not set but properties are defined, we can infer the type is actually object
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema is a simple type
  if(!schema.type && schema.properties ) return "object";
});
// If the type is set and it's a basic type, use the primitive editor
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema is a simple type
  if(typeof schema.type === "string") return schema.type;
});
// Boolean editors
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === 'boolean') {
    // If explicitly set to 'checkbox', use that
    if(schema.format === "checkbox" || (schema.options && schema.options.checkbox)) {
      return "checkbox";
    }
    // Otherwise, default to select menu
    return (JSONEditor.plugins.selectize.enable) ? 'selectize' : 'select';
  }
});
// Use the multiple editor for schemas where the `type` is set to "any"
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema can be of any type
  if(schema.type === "any") return "multiple";
});
// Editor for base64 encoded files
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If the schema can be of any type
  if(schema.type === "string" && schema.media && schema.media.binaryEncoding==="base64") {
    return "base64";
  }
});
// Editor for uploading files
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === "string" && schema.format === "url" && schema.options && schema.options.upload === true) {
    if(window.FileReader) return "upload";
  }
});
// Use the table editor for arrays with the format set to `table`
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // Type `array` with format set to `table`
  if(schema.type == "array" && schema.format == "table") {
    return "table";
  }
});
// Use the `select` editor for dynamic enumSource enums
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.enumSource) return (JSONEditor.plugins.selectize.enable) ? 'selectize' : 'select';
});
// Use the `enum` or `select` editors for schemas with enumerated properties
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema["enum"]) {
    if(schema.type === "array" || schema.type === "object") {
      return "enum";
    }
    else if(schema.type === "number" || schema.type === "integer" || schema.type === "string") {
      return (JSONEditor.plugins.selectize.enable) ? 'selectize' : 'select';
    }
  }
});
// Specialized editors for arrays of strings
JSONEditor.defaults.resolvers.unshift(function(schema) {
  if(schema.type === "array" && schema.items && !(Array.isArray(schema.items)) && schema.uniqueItems && ['string','number','integer'].indexOf(schema.items.type) >= 0) {
    // For enumerated strings, number, or integers
    if(schema.items.enum) {
      return 'multiselect';
    }
    // For non-enumerated strings (tag editor)
    else if(JSONEditor.plugins.selectize.enable && schema.items.type === "string") {
      return 'arraySelectize';
    }
  }
});
// Use the multiple editor for schemas with `oneOf` set
JSONEditor.defaults.resolvers.unshift(function(schema) {
  // If this schema uses `oneOf` or `anyOf`
  if(schema.oneOf || schema.anyOf) return "multiple";
});

/**
 * This is a small wrapper for using JSON Editor like a typical jQuery plugin.
 */
(function() {
  if(window.jQuery || window.Zepto) {
    var $ = window.jQuery || window.Zepto;
    $.jsoneditor = JSONEditor.defaults;

    $.fn.jsoneditor = function(options) {
      var self = this;
      var editor = this.data('jsoneditor');
      if(options === 'value') {
        if(!editor) throw "Must initialize jsoneditor before getting/setting the value";

        // Set value
        if(arguments.length > 1) {
          editor.setValue(arguments[1]);
        }
        // Get value
        else {
          return editor.getValue();
        }
      }
      else if(options === 'validate') {
        if(!editor) throw "Must initialize jsoneditor before validating";

        // Validate a specific value
        if(arguments.length > 1) {
          return editor.validate(arguments[1]);
        }
        // Validate current value
        else {
          return editor.validate();
        }
      }
      else if(options === 'destroy') {
        if(editor) {
          editor.destroy();
          this.data('jsoneditor',null);
        }
      }
      else {
        // Destroy first
        if(editor) {
          editor.destroy();
        }

        // Create editor
        editor = new JSONEditor(this.get(0),options);
        this.data('jsoneditor',editor);

        // Setup event listeners
        editor.on('change',function() {
          self.trigger('change');
        });
        editor.on('ready',function() {
          self.trigger('ready');
        });
      }

      return this;
    };
  }
})();

  window.JSONEditor = JSONEditor;
})();

//# sourceMappingURL=jsoneditor.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyIsImpzb25lZGl0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2x1Z2lmeSh0ZXh0KXtcclxuICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcclxuICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgICAgICAgICAgIC8vIFJlcGxhY2Ugc3BhY2VzIHdpdGggLVxyXG4gICAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJycpICAgICAgIC8vIFJlbW92ZSBhbGwgbm9uLXdvcmQgY2hhcnNcclxuICAgIC5yZXBsYWNlKC9cXC1cXC0rL2csICctJykgICAgICAgICAvLyBSZXBsYWNlIG11bHRpcGxlIC0gd2l0aCBzaW5nbGUgLVxyXG4gICAgLnJlcGxhY2UoL14tKy8sICcnKSAgICAgICAgICAgICAvLyBUcmltIC0gZnJvbSBzdGFydCBvZiB0ZXh0XHJcbiAgICAucmVwbGFjZSgvLSskLywgJycpOyAgICAgICAgICAgIC8vIFRyaW0gLSBmcm9tIGVuZCBvZiB0ZXh0XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZSkge1xyXG4gICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXHJcbiAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcclxuICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXHJcbiAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4gfVxyXG5cclxuXHJcblxyXG5cclxuIHZhciBDcnlwdG9KU0Flc0pzb24gPSB7XHJcbiAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoY2lwaGVyUGFyYW1zKSB7XHJcbiAgICAgICAgIHZhciBqID0ge2N0OiBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dC50b1N0cmluZyhDcnlwdG9KUy5lbmMuQmFzZTY0KX07XHJcbiAgICAgICAgIGlmIChjaXBoZXJQYXJhbXMuaXYpIGouaXYgPSBjaXBoZXJQYXJhbXMuaXYudG9TdHJpbmcoKTtcclxuICAgICAgICAgaWYgKGNpcGhlclBhcmFtcy5zYWx0KSBqLnMgPSBjaXBoZXJQYXJhbXMuc2FsdC50b1N0cmluZygpO1xyXG4gICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoaik7XHJcbiAgICAgfSxcclxuICAgICBwYXJzZTogZnVuY3Rpb24gKGpzb25TdHIpIHtcclxuICAgICAgICAgdmFyIGogPSBKU09OLnBhcnNlKGpzb25TdHIpO1xyXG4gICAgICAgICB2YXIgY2lwaGVyUGFyYW1zID0gQ3J5cHRvSlMubGliLkNpcGhlclBhcmFtcy5jcmVhdGUoe2NpcGhlcnRleHQ6IENyeXB0b0pTLmVuYy5CYXNlNjQucGFyc2Uoai5jdCl9KTtcclxuICAgICAgICAgaWYgKGouaXYpIGNpcGhlclBhcmFtcy5pdiA9IENyeXB0b0pTLmVuYy5IZXgucGFyc2Uoai5pdik7XHJcbiAgICAgICAgIGlmIChqLnMpIGNpcGhlclBhcmFtcy5zYWx0ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShqLnMpO1xyXG4gICAgICAgICByZXR1cm4gY2lwaGVyUGFyYW1zO1xyXG4gICAgIH1cclxuIH0iLCIvKiEgSlNPTiBFZGl0b3IgdjAuNy4yOCAtIEpTT04gU2NoZW1hIC0+IEhUTUwgRWRpdG9yXG4gKiBCeSBKZXJlbXkgRG9ybiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qZG9ybi9qc29uLWVkaXRvci9cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTYtMDgtMDdcbiAqL1xuXG4vKipcbiAqIFNlZSBSRUFETUUubWQgZm9yIHJlcXVpcmVtZW50cyBhbmQgdXNhZ2UgaW5mb1xuICovXG5cbihmdW5jdGlvbigpIHtcblxuLypqc2hpbnQgbG9vcGZ1bmM6IHRydWUgKi9cbi8qIFNpbXBsZSBKYXZhU2NyaXB0IEluaGVyaXRhbmNlXG4gKiBCeSBKb2huIFJlc2lnIGh0dHA6Ly9lam9obi5vcmcvXG4gKiBNSVQgTGljZW5zZWQuXG4gKi9cbi8vIEluc3BpcmVkIGJ5IGJhc2UyIGFuZCBQcm90b3R5cGVcbnZhciBDbGFzcztcbihmdW5jdGlvbigpe1xuICB2YXIgaW5pdGlhbGl6aW5nID0gZmFsc2UsIGZuVGVzdCA9IC94eXovLnRlc3QoZnVuY3Rpb24oKXt3aW5kb3cucG9zdE1lc3NhZ2UoXCJ4eXpcIik7fSkgPyAvXFxiX3N1cGVyXFxiLyA6IC8uKi87XG5cbiAgLy8gVGhlIGJhc2UgQ2xhc3MgaW1wbGVtZW50YXRpb24gKGRvZXMgbm90aGluZylcbiAgQ2xhc3MgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IENsYXNzIHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzXG4gIENsYXNzLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChwcm9wKSB7XG4gICAgdmFyIF9zdXBlciA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgLy8gSW5zdGFudGlhdGUgYSBiYXNlIGNsYXNzIChidXQgb25seSBjcmVhdGUgdGhlIGluc3RhbmNlLFxuICAgIC8vIGRvbid0IHJ1biB0aGUgaW5pdCBjb25zdHJ1Y3RvcilcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuICAgIHZhciBwcm90b3R5cGUgPSBuZXcgdGhpcygpO1xuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuXG4gICAgLy8gQ29weSB0aGUgcHJvcGVydGllcyBvdmVyIG9udG8gdGhlIG5ldyBwcm90b3R5cGVcbiAgICBmb3IgKHZhciBuYW1lIGluIHByb3ApIHtcbiAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIG92ZXJ3cml0aW5nIGFuIGV4aXN0aW5nIGZ1bmN0aW9uXG4gICAgICBwcm90b3R5cGVbbmFtZV0gPSB0eXBlb2YgcHJvcFtuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIF9zdXBlcltuYW1lXSA9PSBcImZ1bmN0aW9uXCIgJiYgZm5UZXN0LnRlc3QocHJvcFtuYW1lXSkgP1xuICAgICAgICAoZnVuY3Rpb24obmFtZSwgZm4pe1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSB0aGlzLl9zdXBlcjtcblxuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IC5fc3VwZXIoKSBtZXRob2QgdGhhdCBpcyB0aGUgc2FtZSBtZXRob2RcbiAgICAgICAgICAgIC8vIGJ1dCBvbiB0aGUgc3VwZXItY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gX3N1cGVyW25hbWVdO1xuXG4gICAgICAgICAgICAvLyBUaGUgbWV0aG9kIG9ubHkgbmVlZCB0byBiZSBib3VuZCB0ZW1wb3JhcmlseSwgc28gd2VcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG4gICAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyID0gdG1wO1xuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKG5hbWUsIHByb3BbbmFtZV0pIDpcbiAgICAgICAgcHJvcFtuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGUgZHVtbXkgY2xhc3MgY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBDbGFzcygpIHtcbiAgICAgIC8vIEFsbCBjb25zdHJ1Y3Rpb24gaXMgYWN0dWFsbHkgZG9uZSBpbiB0aGUgaW5pdCBtZXRob2RcbiAgICAgIGlmICggIWluaXRpYWxpemluZyAmJiB0aGlzLmluaXQgKVxuICAgICAgICB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSBvdXIgY29uc3RydWN0ZWQgcHJvdG90eXBlIG9iamVjdFxuICAgIENsYXNzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblxuICAgIC8vIEVuZm9yY2UgdGhlIGNvbnN0cnVjdG9yIHRvIGJlIHdoYXQgd2UgZXhwZWN0XG4gICAgQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2xhc3M7XG5cbiAgICAvLyBBbmQgbWFrZSB0aGlzIGNsYXNzIGV4dGVuZGFibGVcbiAgICBDbGFzcy5leHRlbmQgPSBleHRlbmQ7XG5cbiAgICByZXR1cm4gQ2xhc3M7XG4gIH07XG5cbiAgcmV0dXJuIENsYXNzO1xufSkoKTtcblxuLy8gQ3VzdG9tRXZlbnQgY29uc3RydWN0b3IgcG9seWZpbGxcbi8vIEZyb20gTUROXG4oZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDdXN0b21FdmVudCAoIGV2ZW50LCBwYXJhbXMgKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0N1c3RvbUV2ZW50JyApO1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG5cbiAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG5cbi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIuIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbi8vIE1JVCBsaWNlbnNlXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgIH1cblxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sXG4gICAgICAgICAgICAgIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH07XG5cbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIH07XG59KCkpO1xuXG4vLyBBcnJheS5pc0FycmF5IHBvbHlmaWxsXG4vLyBGcm9tIE1ETlxuKGZ1bmN0aW9uKCkge1xuXHRpZighQXJyYXkuaXNBcnJheSkge1xuXHQgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdCAgfTtcblx0fVxufSgpKTtcbi8qKlxuICogVGFrZW4gZnJvbSBqUXVlcnkgMi4xLjNcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xudmFyICRpc3BsYWlub2JqZWN0ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgLy8gTm90IHBsYWluIG9iamVjdHM6XG4gIC8vIC0gQW55IG9iamVjdCBvciB2YWx1ZSB3aG9zZSBpbnRlcm5hbCBbW0NsYXNzXV0gcHJvcGVydHkgaXMgbm90IFwiW29iamVjdCBPYmplY3RdXCJcbiAgLy8gLSBET00gbm9kZXNcbiAgLy8gLSB3aW5kb3dcbiAgaWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IChvYmogIT09IG51bGwgJiYgb2JqID09PSBvYmoud2luZG93KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChvYmouY29uc3RydWN0b3IgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBJZiB0aGUgZnVuY3Rpb24gaGFzbid0IHJldHVybmVkIGFscmVhZHksIHdlJ3JlIGNvbmZpZGVudCB0aGF0XG4gIC8vIHxvYmp8IGlzIGEgcGxhaW4gb2JqZWN0LCBjcmVhdGVkIGJ5IHt9IG9yIGNvbnN0cnVjdGVkIHdpdGggbmV3IE9iamVjdFxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnZhciAkZXh0ZW5kID0gZnVuY3Rpb24oZGVzdGluYXRpb24pIHtcbiAgdmFyIHNvdXJjZSwgaSxwcm9wZXJ0eTtcbiAgZm9yKGk9MTsgaTxhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmKCFzb3VyY2UuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSBjb250aW51ZTtcbiAgICAgIGlmKHNvdXJjZVtwcm9wZXJ0eV0gJiYgJGlzcGxhaW5vYmplY3Qoc291cmNlW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgaWYoIWRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkgZGVzdGluYXRpb25bcHJvcGVydHldID0ge307XG4gICAgICAgICRleHRlbmQoZGVzdGluYXRpb25bcHJvcGVydHldLCBzb3VyY2VbcHJvcGVydHldKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb247XG59O1xuXG52YXIgJGVhY2ggPSBmdW5jdGlvbihvYmosY2FsbGJhY2spIHtcbiAgaWYoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSByZXR1cm47XG4gIHZhciBpO1xuICBpZihBcnJheS5pc0FycmF5KG9iaikgfHwgKHR5cGVvZiBvYmoubGVuZ3RoID09PSAnbnVtYmVyJyAmJiBvYmoubGVuZ3RoID4gMCAmJiAob2JqLmxlbmd0aCAtIDEpIGluIG9iaikpIHtcbiAgICBmb3IoaT0wOyBpPG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoY2FsbGJhY2soaSxvYmpbaV0pPT09ZmFsc2UpIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICBmb3IoaT0wOyBpPGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoY2FsbGJhY2soa2V5c1tpXSxvYmpba2V5c1tpXV0pPT09ZmFsc2UpIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IoaSBpbiBvYmopIHtcbiAgICAgICAgaWYoIW9iai5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgIGlmKGNhbGxiYWNrKGksb2JqW2ldKT09PWZhbHNlKSByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgJHRyaWdnZXIgPSBmdW5jdGlvbihlbCxldmVudCkge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gIGUuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgZWwuZGlzcGF0Y2hFdmVudChlKTtcbn07XG52YXIgJHRyaWdnZXJjID0gZnVuY3Rpb24oZWwsZXZlbnQpIHtcbiAgdmFyIGUgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQse1xuICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZVxuICB9KTtcblxuICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xufTtcblxudmFyIEpTT05FZGl0b3IgPSBmdW5jdGlvbihlbGVtZW50LG9wdGlvbnMpIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdlbGVtZW50IHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBFbGVtZW50Jyk7XG4gIH1cbiAgb3B0aW9ucyA9ICRleHRlbmQoe30sSlNPTkVkaXRvci5kZWZhdWx0cy5vcHRpb25zLG9wdGlvbnN8fHt9KTtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5pbml0KCk7XG59O1xuSlNPTkVkaXRvci5wcm90b3R5cGUgPSB7XG4gIC8vIG5lY2Vzc2FyeSBzaW5jZSB3ZSByZW1vdmUgdGhlIGN0b3IgcHJvcGVydHkgYnkgZG9pbmcgYSBsaXRlcmFsIGFzc2lnbm1lbnQuIFdpdGhvdXQgdGhpc1xuICAvLyB0aGUgJGlzcGxhaW5vYmplY3QgZnVuY3Rpb24gd2lsbCB0aGluayB0aGF0IHRoaXMgaXMgYSBwbGFpbiBvYmplY3QuXG4gIGNvbnN0cnVjdG9yOiBKU09ORWRpdG9yLFxuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG5cbiAgICB2YXIgdGhlbWVfY2xhc3MgPSBKU09ORWRpdG9yLmRlZmF1bHRzLnRoZW1lc1t0aGlzLm9wdGlvbnMudGhlbWUgfHwgSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZV07XG4gICAgaWYoIXRoZW1lX2NsYXNzKSB0aHJvdyBcIlVua25vd24gdGhlbWUgXCIgKyAodGhpcy5vcHRpb25zLnRoZW1lIHx8IEpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWUpO1xuXG4gICAgdGhpcy5zY2hlbWEgPSB0aGlzLm9wdGlvbnMuc2NoZW1hO1xuICAgIHRoaXMudGhlbWUgPSBuZXcgdGhlbWVfY2xhc3MoKTtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlO1xuICAgIHRoaXMucmVmcyA9IHRoaXMub3B0aW9ucy5yZWZzIHx8IHt9O1xuICAgIHRoaXMudXVpZCA9IDA7XG4gICAgdGhpcy5fX2RhdGEgPSB7fTtcblxuICAgIHZhciBpY29uX2NsYXNzID0gSlNPTkVkaXRvci5kZWZhdWx0cy5pY29ubGlic1t0aGlzLm9wdGlvbnMuaWNvbmxpYiB8fCBKU09ORWRpdG9yLmRlZmF1bHRzLmljb25saWJdO1xuICAgIGlmKGljb25fY2xhc3MpIHRoaXMuaWNvbmxpYiA9IG5ldyBpY29uX2NsYXNzKCk7XG5cbiAgICB0aGlzLnJvb3RfY29udGFpbmVyID0gdGhpcy50aGVtZS5nZXRDb250YWluZXIoKTtcbiAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5yb290X2NvbnRhaW5lcik7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZSA9IHRoaXMub3B0aW9ucy50cmFuc2xhdGUgfHwgSlNPTkVkaXRvci5kZWZhdWx0cy50cmFuc2xhdGU7XG5cbiAgICAvLyBGZXRjaCBhbGwgZXh0ZXJuYWwgcmVmcyB2aWEgYWpheFxuICAgIHRoaXMuX2xvYWRFeHRlcm5hbFJlZnModGhpcy5zY2hlbWEsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fZ2V0RGVmaW5pdGlvbnMoc2VsZi5zY2hlbWEpO1xuXG4gICAgICAvLyBWYWxpZGF0b3Igb3B0aW9uc1xuICAgICAgdmFyIHZhbGlkYXRvcl9vcHRpb25zID0ge307XG4gICAgICBpZihzZWxmLm9wdGlvbnMuY3VzdG9tX3ZhbGlkYXRvcnMpIHtcbiAgICAgICAgdmFsaWRhdG9yX29wdGlvbnMuY3VzdG9tX3ZhbGlkYXRvcnMgPSBzZWxmLm9wdGlvbnMuY3VzdG9tX3ZhbGlkYXRvcnM7XG4gICAgICB9XG4gICAgICBzZWxmLnZhbGlkYXRvciA9IG5ldyBKU09ORWRpdG9yLlZhbGlkYXRvcihzZWxmLG51bGwsdmFsaWRhdG9yX29wdGlvbnMpO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIHJvb3QgZWRpdG9yXG4gICAgICB2YXIgZWRpdG9yX2NsYXNzID0gc2VsZi5nZXRFZGl0b3JDbGFzcyhzZWxmLnNjaGVtYSk7XG4gICAgICBzZWxmLnJvb3QgPSBzZWxmLmNyZWF0ZUVkaXRvcihlZGl0b3JfY2xhc3MsIHtcbiAgICAgICAganNvbmVkaXRvcjogc2VsZixcbiAgICAgICAgc2NoZW1hOiBzZWxmLnNjaGVtYSxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIGNvbnRhaW5lcjogc2VsZi5yb290X2NvbnRhaW5lclxuICAgICAgfSk7XG5cbiAgICAgIHNlbGYucm9vdC5wcmVCdWlsZCgpO1xuICAgICAgc2VsZi5yb290LmJ1aWxkKCk7XG4gICAgICBzZWxmLnJvb3QucG9zdEJ1aWxkKCk7XG5cbiAgICAgIC8vIFN0YXJ0aW5nIGRhdGFcbiAgICAgIGlmKHNlbGYub3B0aW9ucy5zdGFydHZhbCkgc2VsZi5yb290LnNldFZhbHVlKHNlbGYub3B0aW9ucy5zdGFydHZhbCk7XG5cbiAgICAgIHNlbGYudmFsaWRhdGlvbl9yZXN1bHRzID0gc2VsZi52YWxpZGF0b3IudmFsaWRhdGUoc2VsZi5yb290LmdldFZhbHVlKCkpO1xuICAgICAgc2VsZi5yb290LnNob3dWYWxpZGF0aW9uRXJyb3JzKHNlbGYudmFsaWRhdGlvbl9yZXN1bHRzKTtcbiAgICAgIHNlbGYucmVhZHkgPSB0cnVlO1xuXG4gICAgICAvLyBGaXJlIHJlYWR5IGV2ZW50IGFzeW5jaHJvbm91c2x5XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighc2VsZi5yZWFkeSkgcmV0dXJuO1xuICAgICAgICBzZWxmLnZhbGlkYXRpb25fcmVzdWx0cyA9IHNlbGYudmFsaWRhdG9yLnZhbGlkYXRlKHNlbGYucm9vdC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgc2VsZi5yb290LnNob3dWYWxpZGF0aW9uRXJyb3JzKHNlbGYudmFsaWRhdGlvbl9yZXN1bHRzKTtcbiAgICAgICAgc2VsZi50cmlnZ2VyKCdyZWFkeScpO1xuICAgICAgICBzZWxmLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5yZWFkeSkgdGhyb3cgXCJKU09OIEVkaXRvciBub3QgcmVhZHkgeWV0LiAgTGlzdGVuIGZvciAncmVhZHknIGV2ZW50IGJlZm9yZSBnZXR0aW5nIHRoZSB2YWx1ZVwiO1xuXG4gICAgcmV0dXJuIHRoaXMucm9vdC5nZXRWYWx1ZSgpO1xuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZighdGhpcy5yZWFkeSkgdGhyb3cgXCJKU09OIEVkaXRvciBub3QgcmVhZHkgeWV0LiAgTGlzdGVuIGZvciAncmVhZHknIGV2ZW50IGJlZm9yZSBzZXR0aW5nIHRoZSB2YWx1ZVwiO1xuXG4gICAgdGhpcy5yb290LnNldFZhbHVlKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYoIXRoaXMucmVhZHkpIHRocm93IFwiSlNPTiBFZGl0b3Igbm90IHJlYWR5IHlldC4gIExpc3RlbiBmb3IgJ3JlYWR5JyBldmVudCBiZWZvcmUgdmFsaWRhdGluZ1wiO1xuXG4gICAgLy8gQ3VzdG9tIHZhbHVlXG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgLy8gQ3VycmVudCB2YWx1ZSAodXNlIGNhY2hlZCByZXN1bHQpXG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uX3Jlc3VsdHM7XG4gICAgfVxuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgIGlmKCF0aGlzLnJlYWR5KSByZXR1cm47XG5cbiAgICB0aGlzLnNjaGVtYSA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25zID0gbnVsbDtcbiAgICB0aGlzLnJvb3QuZGVzdHJveSgpO1xuICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgdGhpcy5yb290X2NvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuICAgIHRoaXMudmFsaWRhdGlvbl9yZXN1bHRzID0gbnVsbDtcbiAgICB0aGlzLnRoZW1lID0gbnVsbDtcbiAgICB0aGlzLmljb25saWIgPSBudWxsO1xuICAgIHRoaXMudGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMuX19kYXRhID0gbnVsbDtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICB9LFxuICBvbjogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcyB8fCB7fTtcbiAgICB0aGlzLmNhbGxiYWNrc1tldmVudF0gPSB0aGlzLmNhbGxiYWNrc1tldmVudF0gfHwgW107XG4gICAgdGhpcy5jYWxsYmFja3NbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIG9mZjogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgLy8gU3BlY2lmaWMgY2FsbGJhY2tcbiAgICBpZihldmVudCAmJiBjYWxsYmFjaykge1xuICAgICAgdGhpcy5jYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrcyB8fCB7fTtcbiAgICAgIHRoaXMuY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbiAgICAgIHZhciBuZXdjYWxsYmFja3MgPSBbXTtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuY2FsbGJhY2tzW2V2ZW50XS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZih0aGlzLmNhbGxiYWNrc1tldmVudF1baV09PT1jYWxsYmFjaykgY29udGludWU7XG4gICAgICAgIG5ld2NhbGxiYWNrcy5wdXNoKHRoaXMuY2FsbGJhY2tzW2V2ZW50XVtpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxiYWNrc1tldmVudF0gPSBuZXdjYWxsYmFja3M7XG4gICAgfVxuICAgIC8vIEFsbCBjYWxsYmFja3MgZm9yIGEgc3BlY2lmaWMgZXZlbnRcbiAgICBlbHNlIGlmKGV2ZW50KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgdGhpcy5jYWxsYmFja3NbZXZlbnRdID0gW107XG4gICAgfVxuICAgIC8vIEFsbCBjYWxsYmFja3MgZm9yIGFsbCBldmVudHNcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYodGhpcy5jYWxsYmFja3MgJiYgdGhpcy5jYWxsYmFja3NbZXZlbnRdICYmIHRoaXMuY2FsbGJhY2tzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuY2FsbGJhY2tzW2V2ZW50XS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudF1baV0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc2V0T3B0aW9uOiBmdW5jdGlvbihvcHRpb24sIHZhbHVlKSB7XG4gICAgaWYob3B0aW9uID09PSBcInNob3dfZXJyb3JzXCIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zaG93X2Vycm9ycyA9IHZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH1cbiAgICAvLyBPbmx5IHRoZSBgc2hvd19lcnJvcnNgIG9wdGlvbiBpcyBzdXBwb3J0ZWQgZm9yIG5vd1xuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgXCJPcHRpb24gXCIrb3B0aW9uK1wiIG11c3QgYmUgc2V0IGR1cmluZyBpbnN0YW50aWF0aW9uIGFuZCBjYW5ub3QgYmUgY2hhbmdlZCBsYXRlclwiO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBnZXRFZGl0b3JDbGFzczogZnVuY3Rpb24oc2NoZW1hKSB7XG4gICAgdmFyIGNsYXNzbmFtZTtcblxuICAgIHNjaGVtYSA9IHRoaXMuZXhwYW5kU2NoZW1hKHNjaGVtYSk7XG5cbiAgICAkZWFjaChKU09ORWRpdG9yLmRlZmF1bHRzLnJlc29sdmVycyxmdW5jdGlvbihpLHJlc29sdmVyKSB7XG4gICAgICB2YXIgdG1wID0gcmVzb2x2ZXIoc2NoZW1hKTtcbiAgICAgIGlmKHRtcCkge1xuICAgICAgICBpZihKU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnNbdG1wXSkge1xuICAgICAgICAgIGNsYXNzbmFtZSA9IHRtcDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCFjbGFzc25hbWUpIHRocm93IFwiVW5rbm93biBlZGl0b3IgZm9yIHNjaGVtYSBcIitKU09OLnN0cmluZ2lmeShzY2hlbWEpO1xuICAgIGlmKCFKU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnNbY2xhc3NuYW1lXSkgdGhyb3cgXCJVbmtub3duIGVkaXRvciBcIitjbGFzc25hbWU7XG5cbiAgICByZXR1cm4gSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzW2NsYXNzbmFtZV07XG4gIH0sXG4gIGNyZWF0ZUVkaXRvcjogZnVuY3Rpb24oZWRpdG9yX2NsYXNzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICRleHRlbmQoe30sZWRpdG9yX2NsYXNzLm9wdGlvbnN8fHt9LG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgZWRpdG9yX2NsYXNzKG9wdGlvbnMpO1xuICB9LFxuICBvbkNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgaWYoIXRoaXMucmVhZHkpIHJldHVybjtcblxuICAgIGlmKHRoaXMuZmlyaW5nX2NoYW5nZSkgcmV0dXJuO1xuICAgIHRoaXMuZmlyaW5nX2NoYW5nZSA9IHRydWU7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5maXJpbmdfY2hhbmdlID0gZmFsc2U7XG4gICAgICBpZighc2VsZi5yZWFkeSkgcmV0dXJuO1xuXG4gICAgICAvLyBWYWxpZGF0ZSBhbmQgY2FjaGUgcmVzdWx0c1xuICAgICAgc2VsZi52YWxpZGF0aW9uX3Jlc3VsdHMgPSBzZWxmLnZhbGlkYXRvci52YWxpZGF0ZShzZWxmLnJvb3QuZ2V0VmFsdWUoKSk7XG5cbiAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93X2Vycm9ycyAhPT0gXCJuZXZlclwiKSB7XG4gICAgICAgIHNlbGYucm9vdC5zaG93VmFsaWRhdGlvbkVycm9ycyhzZWxmLnZhbGlkYXRpb25fcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5yb290LnNob3dWYWxpZGF0aW9uRXJyb3JzKFtdKTtcbiAgICAgIH1cblxuICAgICAgLy8gRmlyZSBjaGFuZ2UgZXZlbnRcbiAgICAgIHNlbGYudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY29tcGlsZVRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSwgbmFtZSkge1xuICAgIG5hbWUgPSBuYW1lIHx8IEpTT05FZGl0b3IuZGVmYXVsdHMudGVtcGxhdGU7XG5cbiAgICB2YXIgZW5naW5lO1xuXG4gICAgLy8gU3BlY2lmeWluZyBhIHByZXNldCBlbmdpbmVcbiAgICBpZih0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmKCFKU09ORWRpdG9yLmRlZmF1bHRzLnRlbXBsYXRlc1tuYW1lXSkgdGhyb3cgXCJVbmtub3duIHRlbXBsYXRlIGVuZ2luZSBcIituYW1lO1xuICAgICAgZW5naW5lID0gSlNPTkVkaXRvci5kZWZhdWx0cy50ZW1wbGF0ZXNbbmFtZV0oKTtcblxuICAgICAgaWYoIWVuZ2luZSkgdGhyb3cgXCJUZW1wbGF0ZSBlbmdpbmUgXCIrbmFtZStcIiBtaXNzaW5nIHJlcXVpcmVkIGxpYnJhcnkuXCI7XG4gICAgfVxuICAgIC8vIFNwZWNpZnlpbmcgYSBjdXN0b20gZW5naW5lXG4gICAgZWxzZSB7XG4gICAgICBlbmdpbmUgPSBuYW1lO1xuICAgIH1cblxuICAgIGlmKCFlbmdpbmUpIHRocm93IFwiTm8gdGVtcGxhdGUgZW5naW5lIHNldFwiO1xuICAgIGlmKCFlbmdpbmUuY29tcGlsZSkgdGhyb3cgXCJJbnZhbGlkIHRlbXBsYXRlIGVuZ2luZSBzZXRcIjtcblxuICAgIHJldHVybiBlbmdpbmUuY29tcGlsZSh0ZW1wbGF0ZSk7XG4gIH0sXG4gIF9kYXRhOiBmdW5jdGlvbihlbCxrZXksdmFsdWUpIHtcbiAgICAvLyBTZXR0aW5nIGRhdGFcbiAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICB2YXIgdXVpZDtcbiAgICAgIGlmKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1qc29uZWRpdG9yLScra2V5KSkge1xuICAgICAgICB1dWlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWpzb25lZGl0b3ItJytrZXkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHV1aWQgPSB0aGlzLnV1aWQrKztcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLWpzb25lZGl0b3ItJytrZXksdXVpZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19kYXRhW3V1aWRdID0gdmFsdWU7XG4gICAgfVxuICAgIC8vIEdldHRpbmcgZGF0YVxuICAgIGVsc2Uge1xuICAgICAgLy8gTm8gZGF0YSBzdG9yZWRcbiAgICAgIGlmKCFlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtanNvbmVkaXRvci0nK2tleSkpIHJldHVybiBudWxsO1xuXG4gICAgICByZXR1cm4gdGhpcy5fX2RhdGFbZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWpzb25lZGl0b3ItJytrZXkpXTtcbiAgICB9XG4gIH0sXG4gIHJlZ2lzdGVyRWRpdG9yOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvcnMgPSB0aGlzLmVkaXRvcnMgfHwge307XG4gICAgdGhpcy5lZGl0b3JzW2VkaXRvci5wYXRoXSA9IGVkaXRvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdW5yZWdpc3RlckVkaXRvcjogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgdGhpcy5lZGl0b3JzID0gdGhpcy5lZGl0b3JzIHx8IHt9O1xuICAgIHRoaXMuZWRpdG9yc1tlZGl0b3IucGF0aF0gPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBnZXRFZGl0b3I6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighdGhpcy5lZGl0b3JzKSByZXR1cm47XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9yc1twYXRoXTtcbiAgfSxcbiAgd2F0Y2g6IGZ1bmN0aW9uKHBhdGgsY2FsbGJhY2spIHtcbiAgICB0aGlzLndhdGNobGlzdCA9IHRoaXMud2F0Y2hsaXN0IHx8IHt9O1xuICAgIHRoaXMud2F0Y2hsaXN0W3BhdGhdID0gdGhpcy53YXRjaGxpc3RbcGF0aF0gfHwgW107XG4gICAgdGhpcy53YXRjaGxpc3RbcGF0aF0ucHVzaChjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdW53YXRjaDogZnVuY3Rpb24ocGF0aCxjYWxsYmFjaykge1xuICAgIGlmKCF0aGlzLndhdGNobGlzdCB8fCAhdGhpcy53YXRjaGxpc3RbcGF0aF0pIHJldHVybiB0aGlzO1xuICAgIC8vIElmIHJlbW92aW5nIGFsbCBjYWxsYmFja3MgZm9yIGEgcGF0aFxuICAgIGlmKCFjYWxsYmFjaykge1xuICAgICAgdGhpcy53YXRjaGxpc3RbcGF0aF0gPSBudWxsO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIG5ld2xpc3QgPSBbXTtcbiAgICBmb3IodmFyIGk9MDsgaTx0aGlzLndhdGNobGlzdFtwYXRoXS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYodGhpcy53YXRjaGxpc3RbcGF0aF1baV0gPT09IGNhbGxiYWNrKSBjb250aW51ZTtcbiAgICAgIGVsc2UgbmV3bGlzdC5wdXNoKHRoaXMud2F0Y2hsaXN0W3BhdGhdW2ldKTtcbiAgICB9XG4gICAgdGhpcy53YXRjaGxpc3RbcGF0aF0gPSBuZXdsaXN0Lmxlbmd0aD8gbmV3bGlzdCA6IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIG5vdGlmeVdhdGNoZXJzOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXRoaXMud2F0Y2hsaXN0IHx8ICF0aGlzLndhdGNobGlzdFtwYXRoXSkgcmV0dXJuIHRoaXM7XG4gICAgZm9yKHZhciBpPTA7IGk8dGhpcy53YXRjaGxpc3RbcGF0aF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMud2F0Y2hsaXN0W3BhdGhdW2ldKCk7XG4gICAgfVxuICB9LFxuICBpc0VuYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAhdGhpcy5yb290IHx8IHRoaXMucm9vdC5pc0VuYWJsZWQoKTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJvb3QuZW5hYmxlKCk7XG4gIH0sXG4gIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucm9vdC5kaXNhYmxlKCk7XG4gIH0sXG4gIF9nZXREZWZpbml0aW9uczogZnVuY3Rpb24oc2NoZW1hLHBhdGgpIHtcbiAgICBwYXRoID0gcGF0aCB8fCAnIy9kZWZpbml0aW9ucy8nO1xuICAgIGlmKHNjaGVtYS5kZWZpbml0aW9ucykge1xuICAgICAgZm9yKHZhciBpIGluIHNjaGVtYS5kZWZpbml0aW9ucykge1xuICAgICAgICBpZighc2NoZW1hLmRlZmluaXRpb25zLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcbiAgICAgICAgdGhpcy5yZWZzW3BhdGgraV0gPSBzY2hlbWEuZGVmaW5pdGlvbnNbaV07XG4gICAgICAgIGlmKHNjaGVtYS5kZWZpbml0aW9uc1tpXS5kZWZpbml0aW9ucykge1xuICAgICAgICAgIHRoaXMuX2dldERlZmluaXRpb25zKHNjaGVtYS5kZWZpbml0aW9uc1tpXSxwYXRoK2krJy9kZWZpbml0aW9ucy8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX2dldEV4dGVybmFsUmVmczogZnVuY3Rpb24oc2NoZW1hKSB7XG4gICAgdmFyIHJlZnMgPSB7fTtcbiAgICB2YXIgbWVyZ2VfcmVmcyA9IGZ1bmN0aW9uKG5ld3JlZnMpIHtcbiAgICAgIGZvcih2YXIgaSBpbiBuZXdyZWZzKSB7XG4gICAgICAgIGlmKG5ld3JlZnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICByZWZzW2ldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZihzY2hlbWEuJHJlZiAmJiB0eXBlb2Ygc2NoZW1hLiRyZWYgIT09IFwib2JqZWN0XCIgJiYgc2NoZW1hLiRyZWYuc3Vic3RyKDAsMSkgIT09IFwiI1wiICYmICF0aGlzLnJlZnNbc2NoZW1hLiRyZWZdKSB7XG4gICAgICByZWZzW3NjaGVtYS4kcmVmXSA9IHRydWU7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpIGluIHNjaGVtYSkge1xuICAgICAgaWYoIXNjaGVtYS5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICBpZihzY2hlbWFbaV0gJiYgdHlwZW9mIHNjaGVtYVtpXSA9PT0gXCJvYmplY3RcIiAmJiBBcnJheS5pc0FycmF5KHNjaGVtYVtpXSkpIHtcbiAgICAgICAgZm9yKHZhciBqPTA7IGo8c2NoZW1hW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYodHlwZW9mIHNjaGVtYVtpXVtqXT09PVwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIG1lcmdlX3JlZnModGhpcy5fZ2V0RXh0ZXJuYWxSZWZzKHNjaGVtYVtpXVtqXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZihzY2hlbWFbaV0gJiYgdHlwZW9mIHNjaGVtYVtpXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtZXJnZV9yZWZzKHRoaXMuX2dldEV4dGVybmFsUmVmcyhzY2hlbWFbaV0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVmcztcbiAgfSxcbiAgX2xvYWRFeHRlcm5hbFJlZnM6IGZ1bmN0aW9uKHNjaGVtYSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlZnMgPSB0aGlzLl9nZXRFeHRlcm5hbFJlZnMoc2NoZW1hKTtcblxuICAgIHZhciBkb25lID0gMCwgd2FpdGluZyA9IDAsIGNhbGxiYWNrX2ZpcmVkID0gZmFsc2U7XG5cbiAgICAkZWFjaChyZWZzLGZ1bmN0aW9uKHVybCkge1xuICAgICAgaWYoc2VsZi5yZWZzW3VybF0pIHJldHVybjtcbiAgICAgIGlmKCFzZWxmLm9wdGlvbnMuYWpheCkgdGhyb3cgXCJNdXN0IHNldCBhamF4IG9wdGlvbiB0byB0cnVlIHRvIGxvYWQgZXh0ZXJuYWwgcmVmIFwiK3VybDtcbiAgICAgIHNlbGYucmVmc1t1cmxdID0gJ2xvYWRpbmcnO1xuICAgICAgd2FpdGluZysrO1xuXG4gICAgICB2YXIgciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgci5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gICAgICByLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHIucmVhZHlTdGF0ZSAhPSA0KSByZXR1cm47XG4gICAgICAgIC8vIFJlcXVlc3Qgc3VjY2VlZGVkXG4gICAgICAgIGlmKHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZShyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIHRocm93IFwiRmFpbGVkIHRvIHBhcnNlIGV4dGVybmFsIHJlZiBcIit1cmw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCFyZXNwb25zZSB8fCB0eXBlb2YgcmVzcG9uc2UgIT09IFwib2JqZWN0XCIpIHRocm93IFwiRXh0ZXJuYWwgcmVmIGRvZXMgbm90IGNvbnRhaW4gYSB2YWxpZCBzY2hlbWEgLSBcIit1cmw7XG5cbiAgICAgICAgICBzZWxmLnJlZnNbdXJsXSA9IHJlc3BvbnNlO1xuICAgICAgICAgIHNlbGYuX2xvYWRFeHRlcm5hbFJlZnMocmVzcG9uc2UsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgICBpZihkb25lID49IHdhaXRpbmcgJiYgIWNhbGxiYWNrX2ZpcmVkKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrX2ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXF1ZXN0IGZhaWxlZFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cocik7XG4gICAgICAgICAgdGhyb3cgXCJGYWlsZWQgdG8gZmV0Y2ggcmVmIHZpYSBhamF4LSBcIit1cmw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByLnNlbmQoKTtcbiAgICB9KTtcblxuICAgIGlmKCF3YWl0aW5nKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfSxcbiAgZXhwYW5kUmVmczogZnVuY3Rpb24oc2NoZW1hKSB7XG4gICAgc2NoZW1hID0gJGV4dGVuZCh7fSxzY2hlbWEpO1xuXG4gICAgd2hpbGUgKHNjaGVtYS4kcmVmKSB7XG4gICAgICB2YXIgcmVmID0gc2NoZW1hLiRyZWY7XG4gICAgICBkZWxldGUgc2NoZW1hLiRyZWY7XG5cbiAgICAgIGlmKCF0aGlzLnJlZnNbcmVmXSkgcmVmID0gZGVjb2RlVVJJQ29tcG9uZW50KHJlZik7XG5cbiAgICAgIHNjaGVtYSA9IHRoaXMuZXh0ZW5kU2NoZW1hcyhzY2hlbWEsdGhpcy5yZWZzW3JlZl0pO1xuICAgIH1cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9LFxuICBleHBhbmRTY2hlbWE6IGZ1bmN0aW9uKHNjaGVtYSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZXh0ZW5kZWQgPSAkZXh0ZW5kKHt9LHNjaGVtYSk7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBWZXJzaW9uIDMgYHR5cGVgXG4gICAgaWYodHlwZW9mIHNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gQXJyYXkgb2YgdHlwZXNcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkoc2NoZW1hLnR5cGUpKSB7XG4gICAgICAgICRlYWNoKHNjaGVtYS50eXBlLCBmdW5jdGlvbihrZXksdmFsdWUpIHtcbiAgICAgICAgICAvLyBTY2hlbWFcbiAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzY2hlbWEudHlwZVtrZXldID0gc2VsZi5leHBhbmRTY2hlbWEodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBTY2hlbWFcbiAgICAgIGVsc2Uge1xuICAgICAgICBzY2hlbWEudHlwZSA9IHNlbGYuZXhwYW5kU2NoZW1hKHNjaGVtYS50eXBlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVmVyc2lvbiAzIGBkaXNhbGxvd2BcbiAgICBpZih0eXBlb2Ygc2NoZW1hLmRpc2FsbG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gQXJyYXkgb2YgdHlwZXNcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkoc2NoZW1hLmRpc2FsbG93KSkge1xuICAgICAgICAkZWFjaChzY2hlbWEuZGlzYWxsb3csIGZ1bmN0aW9uKGtleSx2YWx1ZSkge1xuICAgICAgICAgIC8vIFNjaGVtYVxuICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNjaGVtYS5kaXNhbGxvd1trZXldID0gc2VsZi5leHBhbmRTY2hlbWEodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBTY2hlbWFcbiAgICAgIGVsc2Uge1xuICAgICAgICBzY2hlbWEuZGlzYWxsb3cgPSBzZWxmLmV4cGFuZFNjaGVtYShzY2hlbWEuZGlzYWxsb3cpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBWZXJzaW9uIDQgYGFueU9mYFxuICAgIGlmKHNjaGVtYS5hbnlPZikge1xuICAgICAgJGVhY2goc2NoZW1hLmFueU9mLCBmdW5jdGlvbihrZXksdmFsdWUpIHtcbiAgICAgICAgc2NoZW1hLmFueU9mW2tleV0gPSBzZWxmLmV4cGFuZFNjaGVtYSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gVmVyc2lvbiA0IGBkZXBlbmRlbmNpZXNgIChzY2hlbWEgZGVwZW5kZW5jaWVzKVxuICAgIGlmKHNjaGVtYS5kZXBlbmRlbmNpZXMpIHtcbiAgICAgICRlYWNoKHNjaGVtYS5kZXBlbmRlbmNpZXMsZnVuY3Rpb24oa2V5LHZhbHVlKSB7XG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhKEFycmF5LmlzQXJyYXkodmFsdWUpKSkge1xuICAgICAgICAgIHNjaGVtYS5kZXBlbmRlbmNpZXNba2V5XSA9IHNlbGYuZXhwYW5kU2NoZW1hKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFZlcnNpb24gNCBgbm90YFxuICAgIGlmKHNjaGVtYS5ub3QpIHtcbiAgICAgIHNjaGVtYS5ub3QgPSB0aGlzLmV4cGFuZFNjaGVtYShzY2hlbWEubm90KTtcbiAgICB9XG5cbiAgICAvLyBhbGxPZiBzY2hlbWFzIHNob3VsZCBiZSBtZXJnZWQgaW50byB0aGUgcGFyZW50XG4gICAgaWYoc2NoZW1hLmFsbE9mKSB7XG4gICAgICBmb3IoaT0wOyBpPHNjaGVtYS5hbGxPZi5sZW5ndGg7IGkrKykge1xuICAgICAgICBleHRlbmRlZCA9IHRoaXMuZXh0ZW5kU2NoZW1hcyhleHRlbmRlZCx0aGlzLmV4cGFuZFNjaGVtYShzY2hlbWEuYWxsT2ZbaV0pKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBleHRlbmRlZC5hbGxPZjtcbiAgICB9XG4gICAgLy8gZXh0ZW5kcyBzY2hlbWFzIHNob3VsZCBiZSBtZXJnZWQgaW50byBwYXJlbnRcbiAgICBpZihzY2hlbWFbXCJleHRlbmRzXCJdKSB7XG4gICAgICAvLyBJZiBleHRlbmRzIGlzIGEgc2NoZW1hXG4gICAgICBpZighKEFycmF5LmlzQXJyYXkoc2NoZW1hW1wiZXh0ZW5kc1wiXSkpKSB7XG4gICAgICAgIGV4dGVuZGVkID0gdGhpcy5leHRlbmRTY2hlbWFzKGV4dGVuZGVkLHRoaXMuZXhwYW5kU2NoZW1hKHNjaGVtYVtcImV4dGVuZHNcIl0pKTtcbiAgICAgIH1cbiAgICAgIC8vIElmIGV4dGVuZHMgaXMgYW4gYXJyYXkgb2Ygc2NoZW1hc1xuICAgICAgZWxzZSB7XG4gICAgICAgIGZvcihpPTA7IGk8c2NoZW1hW1wiZXh0ZW5kc1wiXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGV4dGVuZGVkID0gdGhpcy5leHRlbmRTY2hlbWFzKGV4dGVuZGVkLHRoaXMuZXhwYW5kU2NoZW1hKHNjaGVtYVtcImV4dGVuZHNcIl1baV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIGV4dGVuZGVkW1wiZXh0ZW5kc1wiXTtcbiAgICB9XG4gICAgLy8gcGFyZW50IHNob3VsZCBiZSBtZXJnZWQgaW50byBvbmVPZiBzY2hlbWFzXG4gICAgaWYoc2NoZW1hLm9uZU9mKSB7XG4gICAgICB2YXIgdG1wID0gJGV4dGVuZCh7fSxleHRlbmRlZCk7XG4gICAgICBkZWxldGUgdG1wLm9uZU9mO1xuICAgICAgZm9yKGk9MDsgaTxzY2hlbWEub25lT2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXh0ZW5kZWQub25lT2ZbaV0gPSB0aGlzLmV4dGVuZFNjaGVtYXModGhpcy5leHBhbmRTY2hlbWEoc2NoZW1hLm9uZU9mW2ldKSx0bXApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmV4cGFuZFJlZnMoZXh0ZW5kZWQpO1xuICB9LFxuICBleHRlbmRTY2hlbWFzOiBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG4gICAgb2JqMSA9ICRleHRlbmQoe30sb2JqMSk7XG4gICAgb2JqMiA9ICRleHRlbmQoe30sb2JqMik7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGV4dGVuZGVkID0ge307XG4gICAgJGVhY2gob2JqMSwgZnVuY3Rpb24ocHJvcCx2YWwpIHtcbiAgICAgIC8vIElmIHRoaXMga2V5IGlzIGFsc28gZGVmaW5lZCBpbiBvYmoyLCBtZXJnZSB0aGVtXG4gICAgICBpZih0eXBlb2Ygb2JqMltwcm9wXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBSZXF1aXJlZCBhbmQgZGVmYXVsdFByb3BlcnRpZXMgYXJyYXlzIHNob3VsZCBiZSB1bmlvbmVkIHRvZ2V0aGVyXG4gICAgICAgIGlmKChwcm9wID09PSAncmVxdWlyZWQnfHxwcm9wID09PSAnZGVmYXVsdFByb3BlcnRpZXMnKSAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgIC8vIFVuaW9uIGFycmF5cyBhbmQgdW5pcXVlXG4gICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSB2YWwuY29uY2F0KG9iajJbcHJvcF0pLnJlZHVjZShmdW5jdGlvbihwLCBjKSB7XG4gICAgICAgICAgICBpZiAocC5pbmRleE9mKGMpIDwgMCkgcC5wdXNoKGMpO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgfSwgW10pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFR5cGUgc2hvdWxkIGJlIGludGVyc2VjdGVkIGFuZCBpcyBlaXRoZXIgYW4gYXJyYXkgb3Igc3RyaW5nXG4gICAgICAgIGVsc2UgaWYocHJvcCA9PT0gJ3R5cGUnICYmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkodmFsKSkpIHtcbiAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UncmUgZGVhbGluZyB3aXRoIGFycmF5c1xuICAgICAgICAgIGlmKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHZhbCA9IFt2YWxdO1xuICAgICAgICAgIGlmKHR5cGVvZiBvYmoyLnR5cGUgPT09IFwic3RyaW5nXCIpIG9iajIudHlwZSA9IFtvYmoyLnR5cGVdO1xuXG4gICAgICAgICAgLy8gSWYgdHlwZSBpcyBvbmx5IGRlZmluZWQgaW4gdGhlIGZpcnN0IHNjaGVtYSwga2VlcCBpdFxuICAgICAgICAgIGlmKCFvYmoyLnR5cGUgfHwgIW9iajIudHlwZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGV4dGVuZGVkLnR5cGUgPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHR5cGUgaXMgZGVmaW5lZCBpbiBib3RoIHNjaGVtYXMsIGRvIGFuIGludGVyc2VjdFxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWQudHlwZSA9IHZhbC5maWx0ZXIoZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICByZXR1cm4gb2JqMi50eXBlLmluZGV4T2YobikgIT09IC0xO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgdGhlcmUncyBvbmx5IDEgdHlwZSBhbmQgaXQncyBhIHByaW1pdGl2ZSwgdXNlIGEgc3RyaW5nIGluc3RlYWQgb2YgYXJyYXlcbiAgICAgICAgICBpZihleHRlbmRlZC50eXBlLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgZXh0ZW5kZWQudHlwZVswXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZXh0ZW5kZWQudHlwZSA9IGV4dGVuZGVkLnR5cGVbMF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdHlwZSBwcm9wZXJ0eSBpZiBpdCdzIGVtcHR5XG4gICAgICAgICAgZWxzZSBpZihleHRlbmRlZC50eXBlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIGV4dGVuZGVkLnR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFsbCBvdGhlciBhcnJheXMgc2hvdWxkIGJlIGludGVyc2VjdGVkIChlbnVtLCBldGMuKVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheSh2YWwpKXtcbiAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IHZhbC5maWx0ZXIoZnVuY3Rpb24obikge1xuICAgICAgICAgICAgcmV0dXJuIG9iajJbcHJvcF0uaW5kZXhPZihuKSAhPT0gLTE7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT2JqZWN0cyBzaG91bGQgYmUgcmVjdXJzaXZlbHkgbWVyZ2VkXG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IHNlbGYuZXh0ZW5kU2NoZW1hcyh2YWwsb2JqMltwcm9wXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB1c2UgdGhlIGZpcnN0IHZhbHVlXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UsIGp1c3QgdXNlIHRoZSBvbmUgaW4gb2JqMVxuICAgICAgZWxzZSB7XG4gICAgICAgIGV4dGVuZGVkW3Byb3BdID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIFByb3BlcnRpZXMgaW4gb2JqMiB0aGF0IGFyZW4ndCBpbiBvYmoxXG4gICAgJGVhY2gob2JqMiwgZnVuY3Rpb24ocHJvcCx2YWwpIHtcbiAgICAgIGlmKHR5cGVvZiBvYmoxW3Byb3BdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGV4dGVuZGVkW3Byb3BdID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGV4dGVuZGVkO1xuICB9XG59O1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzID0ge1xuICB0aGVtZXM6IHt9LFxuICB0ZW1wbGF0ZXM6IHt9LFxuICBpY29ubGliczoge30sXG4gIGVkaXRvcnM6IHt9LFxuICBsYW5ndWFnZXM6IHt9LFxuICByZXNvbHZlcnM6IFtdLFxuICBjdXN0b21fdmFsaWRhdG9yczogW11cbn07XG5cbkpTT05FZGl0b3IuVmFsaWRhdG9yID0gQ2xhc3MuZXh0ZW5kKHtcbiAgaW5pdDogZnVuY3Rpb24oanNvbmVkaXRvcixzY2hlbWEsb3B0aW9ucykge1xuICAgIHRoaXMuanNvbmVkaXRvciA9IGpzb25lZGl0b3I7XG4gICAgdGhpcy5zY2hlbWEgPSBzY2hlbWEgfHwgdGhpcy5qc29uZWRpdG9yLnNjaGVtYTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMudHJhbnNsYXRlID0gdGhpcy5qc29uZWRpdG9yLnRyYW5zbGF0ZSB8fCBKU09ORWRpdG9yLmRlZmF1bHRzLnRyYW5zbGF0ZTtcbiAgfSxcbiAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRlU2NoZW1hKHRoaXMuc2NoZW1hLCB2YWx1ZSk7XG4gIH0sXG4gIF92YWxpZGF0ZVNjaGVtYTogZnVuY3Rpb24oc2NoZW1hLHZhbHVlLHBhdGgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGVycm9ycyA9IFtdO1xuICAgIHZhciB2YWxpZCwgaSwgajtcbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cbiAgICBwYXRoID0gcGF0aCB8fCAncm9vdCc7XG5cbiAgICAvLyBXb3JrIG9uIGEgY29weSBvZiB0aGUgc2NoZW1hXG4gICAgc2NoZW1hID0gJGV4dGVuZCh7fSx0aGlzLmpzb25lZGl0b3IuZXhwYW5kUmVmcyhzY2hlbWEpKTtcblxuICAgIC8qXG4gICAgICogVHlwZSBBZ25vc3RpYyBWYWxpZGF0aW9uXG4gICAgICovXG5cbiAgICAvLyBWZXJzaW9uIDMgYHJlcXVpcmVkYFxuICAgIGlmKHNjaGVtYS5yZXF1aXJlZCAmJiBzY2hlbWEucmVxdWlyZWQgPT09IHRydWUpIHtcbiAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICBwcm9wZXJ0eTogJ3JlcXVpcmVkJyxcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZShcImVycm9yX25vdHNldFwiKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDYW4ndCBkbyBhbnkgbW9yZSB2YWxpZGF0aW9uIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVmFsdWUgbm90IGRlZmluZWRcbiAgICBlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gSWYgcmVxdWlyZWRfYnlfZGVmYXVsdCBpcyBzZXQsIGFsbCBmaWVsZHMgYXJlIHJlcXVpcmVkXG4gICAgICBpZih0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5yZXF1aXJlZF9ieV9kZWZhdWx0KSB7XG4gICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgIHByb3BlcnR5OiAncmVxdWlyZWQnLFxuICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKFwiZXJyb3Jfbm90c2V0XCIpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gTm90IHJlcXVpcmVkLCBubyBmdXJ0aGVyIHZhbGlkYXRpb24gbmVlZGVkXG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgZW51bWBcbiAgICBpZihzY2hlbWFbXCJlbnVtXCJdKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgZm9yKGk9MDsgaTxzY2hlbWFbXCJlbnVtXCJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHN0cmluZ2lmaWVkID09PSBKU09OLnN0cmluZ2lmeShzY2hlbWFbXCJlbnVtXCJdW2ldKSkgdmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYoIXZhbGlkKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgIHByb3BlcnR5OiAnZW51bScsXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoXCJlcnJvcl9lbnVtXCIpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGBleHRlbmRzYCAodmVyc2lvbiAzKVxuICAgIGlmKHNjaGVtYVtcImV4dGVuZHNcIl0pIHtcbiAgICAgIGZvcihpPTA7IGk8c2NoZW1hW1wiZXh0ZW5kc1wiXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuX3ZhbGlkYXRlU2NoZW1hKHNjaGVtYVtcImV4dGVuZHNcIl1baV0sdmFsdWUscGF0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGBhbGxPZmBcbiAgICBpZihzY2hlbWEuYWxsT2YpIHtcbiAgICAgIGZvcihpPTA7IGk8c2NoZW1hLmFsbE9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQodGhpcy5fdmFsaWRhdGVTY2hlbWEoc2NoZW1hLmFsbE9mW2ldLHZhbHVlLHBhdGgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgYW55T2ZgXG4gICAgaWYoc2NoZW1hLmFueU9mKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgZm9yKGk9MDsgaTxzY2hlbWEuYW55T2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIXRoaXMuX3ZhbGlkYXRlU2NoZW1hKHNjaGVtYS5hbnlPZltpXSx2YWx1ZSxwYXRoKS5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKCF2YWxpZCkge1xuICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICBwcm9wZXJ0eTogJ2FueU9mJyxcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfYW55T2YnKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgb25lT2ZgXG4gICAgaWYoc2NoZW1hLm9uZU9mKSB7XG4gICAgICB2YWxpZCA9IDA7XG4gICAgICB2YXIgb25lb2ZfZXJyb3JzID0gW107XG4gICAgICBmb3IoaT0wOyBpPHNjaGVtYS5vbmVPZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBTZXQgdGhlIGVycm9yIHBhdGhzIHRvIGJlIHBhdGgub25lT2ZbaV0ucmVzdC5vZi5wYXRoXG4gICAgICAgIHZhciB0bXAgPSB0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEub25lT2ZbaV0sdmFsdWUscGF0aCk7XG4gICAgICAgIGlmKCF0bXAubGVuZ3RoKSB7XG4gICAgICAgICAgdmFsaWQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihqPTA7IGo8dG1wLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdG1wW2pdLnBhdGggPSBwYXRoKycub25lT2ZbJytpKyddJyt0bXBbal0ucGF0aC5zdWJzdHIocGF0aC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIG9uZW9mX2Vycm9ycyA9IG9uZW9mX2Vycm9ycy5jb25jYXQodG1wKTtcblxuICAgICAgfVxuICAgICAgaWYodmFsaWQgIT09IDEpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgcHJvcGVydHk6ICdvbmVPZicsXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoJ2Vycm9yX29uZU9mJywgW3ZhbGlkXSlcbiAgICAgICAgfSk7XG4gICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQob25lb2ZfZXJyb3JzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBgbm90YFxuICAgIGlmKHNjaGVtYS5ub3QpIHtcbiAgICAgIGlmKCF0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEubm90LHZhbHVlLHBhdGgpLmxlbmd0aCkge1xuICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICBwcm9wZXJ0eTogJ25vdCcsXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoJ2Vycm9yX25vdCcpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGB0eXBlYCAoYm90aCBWZXJzaW9uIDMgYW5kIFZlcnNpb24gNCBzdXBwb3J0KVxuICAgIGlmKHNjaGVtYS50eXBlKSB7XG4gICAgICAvLyBVbmlvbiB0eXBlXG4gICAgICBpZihBcnJheS5pc0FycmF5KHNjaGVtYS50eXBlKSkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICBmb3IoaT0wO2k8c2NoZW1hLnR5cGUubGVuZ3RoO2krKykge1xuICAgICAgICAgIGlmKHRoaXMuX2NoZWNrVHlwZShzY2hlbWEudHlwZVtpXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXZhbGlkKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHByb3BlcnR5OiAndHlwZScsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfdHlwZV91bmlvbicpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNpbXBsZSB0eXBlXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYoIXRoaXMuX2NoZWNrVHlwZShzY2hlbWEudHlwZSwgdmFsdWUpKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHByb3BlcnR5OiAndHlwZScsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfdHlwZScsIFtzY2hlbWEudHlwZV0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIGBkaXNhbGxvd2AgKHZlcnNpb24gMylcbiAgICBpZihzY2hlbWEuZGlzYWxsb3cpIHtcbiAgICAgIC8vIFVuaW9uIHR5cGVcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkoc2NoZW1hLmRpc2FsbG93KSkge1xuICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgIGZvcihpPTA7aTxzY2hlbWEuZGlzYWxsb3cubGVuZ3RoO2krKykge1xuICAgICAgICAgIGlmKHRoaXMuX2NoZWNrVHlwZShzY2hlbWEuZGlzYWxsb3dbaV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighdmFsaWQpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdkaXNhbGxvdycsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfZGlzYWxsb3dfdW5pb24nKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTaW1wbGUgdHlwZVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmKHRoaXMuX2NoZWNrVHlwZShzY2hlbWEuZGlzYWxsb3csIHZhbHVlKSkge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ2Rpc2FsbG93JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9kaXNhbGxvdycsIFtzY2hlbWEuZGlzYWxsb3ddKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBUeXBlIFNwZWNpZmljIFZhbGlkYXRpb25cbiAgICAgKi9cblxuICAgIC8vIE51bWJlciBTcGVjaWZpYyBWYWxpZGF0aW9uXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAvLyBgbXVsdGlwbGVPZmAgYW5kIGBkaXZpc2libGVCeWBcbiAgICAgIGlmKHNjaGVtYS5tdWx0aXBsZU9mIHx8IHNjaGVtYS5kaXZpc2libGVCeSkge1xuICAgICAgICB2YXIgZGl2aXNvciA9IHNjaGVtYS5tdWx0aXBsZU9mIHx8IHNjaGVtYS5kaXZpc2libGVCeTtcbiAgICAgICAgLy8gVmFuaWxsYSBKUywgcHJvbmUgdG8gZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIChlLmcuIDEuMTQgLyAuMDEgPT0gMTEzLjk5OTk5KVxuICAgICAgICB2YWxpZCA9ICh2YWx1ZS9kaXZpc29yID09PSBNYXRoLmZsb29yKHZhbHVlL2Rpdmlzb3IpKTtcblxuICAgICAgICAvLyBVc2UgbWF0aC5qcyBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYod2luZG93Lm1hdGgpIHtcbiAgICAgICAgICB2YWxpZCA9IHdpbmRvdy5tYXRoLm1vZCh3aW5kb3cubWF0aC5iaWdudW1iZXIodmFsdWUpLCB3aW5kb3cubWF0aC5iaWdudW1iZXIoZGl2aXNvcikpLmVxdWFscygwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2UgZGVjaW1hbC5qcyBpcyBhdmFpbGFibGVcbiAgICAgICAgZWxzZSBpZih3aW5kb3cuRGVjaW1hbCkge1xuICAgICAgICAgIHZhbGlkID0gKG5ldyB3aW5kb3cuRGVjaW1hbCh2YWx1ZSkpLm1vZChuZXcgd2luZG93LkRlY2ltYWwoZGl2aXNvcikpLmVxdWFscygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF2YWxpZCkge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogc2NoZW1hLm11bHRpcGxlT2Y/ICdtdWx0aXBsZU9mJyA6ICdkaXZpc2libGVCeScsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfbXVsdGlwbGVPZicsIFtkaXZpc29yXSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBgbWF4aW11bWBcbiAgICAgIGlmKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4aW11bScpKSB7XG4gICAgICAgIC8vIFZhbmlsbGEgSlMsIHByb25lIHRvIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9ycyAoZS5nLiAuOTk5OTk5OTk5OTk5OTk5ID09IDEpXG4gICAgICAgIHZhbGlkID0gc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0/ICh2YWx1ZSA8IHNjaGVtYS5tYXhpbXVtKSA6ICh2YWx1ZSA8PSBzY2hlbWEubWF4aW11bSk7XG5cbiAgICAgICAgLy8gVXNlIG1hdGguanMgaXMgYXZhaWxhYmxlXG4gICAgICAgIGlmKHdpbmRvdy5tYXRoKSB7XG4gICAgICAgICAgdmFsaWQgPSB3aW5kb3cubWF0aFtzY2hlbWEuZXhjbHVzaXZlTWF4aW11bT8nc21hbGxlcic6J3NtYWxsZXJFcSddKFxuICAgICAgICAgICAgd2luZG93Lm1hdGguYmlnbnVtYmVyKHZhbHVlKSxcbiAgICAgICAgICAgIHdpbmRvdy5tYXRoLmJpZ251bWJlcihzY2hlbWEubWF4aW11bSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVzZSBEZWNpbWFsLmpzIGlmIGF2YWlsYWJsZVxuICAgICAgICBlbHNlIGlmKHdpbmRvdy5EZWNpbWFsKSB7XG4gICAgICAgICAgdmFsaWQgPSAobmV3IHdpbmRvdy5EZWNpbWFsKHZhbHVlKSlbc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0/J2x0JzonbHRlJ10obmV3IHdpbmRvdy5EZWNpbWFsKHNjaGVtYS5tYXhpbXVtKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdmFsaWQpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdtYXhpbXVtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKFxuICAgICAgICAgICAgICAoc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0/J2Vycm9yX21heGltdW1fZXhjbCc6J2Vycm9yX21heGltdW1faW5jbCcpLFxuICAgICAgICAgICAgICBbc2NoZW1hLm1heGltdW1dXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYG1pbmltdW1gXG4gICAgICBpZihzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21pbmltdW0nKSkge1xuICAgICAgICAvLyBWYW5pbGxhIEpTLCBwcm9uZSB0byBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgKGUuZy4gLjk5OTk5OTk5OTk5OTk5OSA9PSAxKVxuICAgICAgICB2YWxpZCA9IHNjaGVtYS5leGNsdXNpdmVNaW5pbXVtPyAodmFsdWUgPiBzY2hlbWEubWluaW11bSkgOiAodmFsdWUgPj0gc2NoZW1hLm1pbmltdW0pO1xuXG4gICAgICAgIC8vIFVzZSBtYXRoLmpzIGlzIGF2YWlsYWJsZVxuICAgICAgICBpZih3aW5kb3cubWF0aCkge1xuICAgICAgICAgIHZhbGlkID0gd2luZG93Lm1hdGhbc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0/J2xhcmdlcic6J2xhcmdlckVxJ10oXG4gICAgICAgICAgICB3aW5kb3cubWF0aC5iaWdudW1iZXIodmFsdWUpLFxuICAgICAgICAgICAgd2luZG93Lm1hdGguYmlnbnVtYmVyKHNjaGVtYS5taW5pbXVtKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIERlY2ltYWwuanMgaWYgYXZhaWxhYmxlXG4gICAgICAgIGVsc2UgaWYod2luZG93LkRlY2ltYWwpIHtcbiAgICAgICAgICB2YWxpZCA9IChuZXcgd2luZG93LkRlY2ltYWwodmFsdWUpKVtzY2hlbWEuZXhjbHVzaXZlTWluaW11bT8nZ3QnOidndGUnXShuZXcgd2luZG93LkRlY2ltYWwoc2NoZW1hLm1pbmltdW0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF2YWxpZCkge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ21pbmltdW0nLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoXG4gICAgICAgICAgICAgIChzY2hlbWEuZXhjbHVzaXZlTWluaW11bT8nZXJyb3JfbWluaW11bV9leGNsJzonZXJyb3JfbWluaW11bV9pbmNsJyksXG4gICAgICAgICAgICAgIFtzY2hlbWEubWluaW11bV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBTdHJpbmcgc3BlY2lmaWMgdmFsaWRhdGlvblxuICAgIGVsc2UgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBgbWF4TGVuZ3RoYFxuICAgICAgaWYoc2NoZW1hLm1heExlbmd0aCkge1xuICAgICAgICBpZigodmFsdWUrXCJcIikubGVuZ3RoID4gc2NoZW1hLm1heExlbmd0aCkge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ21heExlbmd0aCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfbWF4TGVuZ3RoJywgW3NjaGVtYS5tYXhMZW5ndGhdKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGBtaW5MZW5ndGhgXG4gICAgICBpZihzY2hlbWEubWluTGVuZ3RoKSB7XG4gICAgICAgIGlmKCh2YWx1ZStcIlwiKS5sZW5ndGggPCBzY2hlbWEubWluTGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHByb3BlcnR5OiAnbWluTGVuZ3RoJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKChzY2hlbWEubWluTGVuZ3RoPT09MT8nZXJyb3Jfbm90ZW1wdHknOidlcnJvcl9taW5MZW5ndGgnKSwgW3NjaGVtYS5taW5MZW5ndGhdKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGBwYXR0ZXJuYFxuICAgICAgaWYoc2NoZW1hLnBhdHRlcm4pIHtcbiAgICAgICAgaWYoIShuZXcgUmVnRXhwKHNjaGVtYS5wYXR0ZXJuKSkudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdwYXR0ZXJuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9wYXR0ZXJuJywgW3NjaGVtYS5wYXR0ZXJuXSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBBcnJheSBzcGVjaWZpYyB2YWxpZGF0aW9uXG4gICAgZWxzZSBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIC8vIGBpdGVtc2AgYW5kIGBhZGRpdGlvbmFsSXRlbXNgXG4gICAgICBpZihzY2hlbWEuaXRlbXMpIHtcbiAgICAgICAgLy8gYGl0ZW1zYCBpcyBhbiBhcnJheVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBmb3IoaT0wOyBpPHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGl0ZW0gaGFzIGEgc3BlY2lmaWMgc2NoZW1hIHRpZWQgdG8gaXRcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGFnYWluc3QgaXRcbiAgICAgICAgICAgIGlmKHNjaGVtYS5pdGVtc1tpXSkge1xuICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuX3ZhbGlkYXRlU2NoZW1hKHNjaGVtYS5pdGVtc1tpXSx2YWx1ZVtpXSxwYXRoKycuJytpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBhbGwgYWRkaXRpb25hbCBpdGVtcyBhcmUgYWxsb3dlZFxuICAgICAgICAgICAgZWxzZSBpZihzY2hlbWEuYWRkaXRpb25hbEl0ZW1zID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgYWRkaXRpb25hbCBpdGVtcyBpcyBhIHNjaGVtYVxuICAgICAgICAgICAgLy8gVE9ETzogSW5jb21wYXRpYmlsaXR5IGJldHdlZW4gdmVyc2lvbiAzIGFuZCA0IG9mIHRoZSBzcGVjXG4gICAgICAgICAgICBlbHNlIGlmKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEuYWRkaXRpb25hbEl0ZW1zLHZhbHVlW2ldLHBhdGgrJy4nK2kpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIG5vIGFkZGl0aW9uYWwgaXRlbXMgYXJlIGFsbG93ZWRcbiAgICAgICAgICAgIGVsc2UgaWYoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdhZGRpdGlvbmFsSXRlbXMnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9hZGRpdGlvbmFsSXRlbXMnKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZWZhdWx0IGZvciBgYWRkaXRpb25hbEl0ZW1zYCBpcyBhbiBlbXB0eSBzY2hlbWFcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYGl0ZW1zYCBpcyBhIHNjaGVtYVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBFYWNoIGl0ZW0gaW4gdGhlIGFycmF5IG11c3QgdmFsaWRhdGUgYWdhaW5zdCB0aGUgc2NoZW1hXG4gICAgICAgICAgZm9yKGk9MDsgaTx2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEuaXRlbXMsdmFsdWVbaV0scGF0aCsnLicraSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBgbWF4SXRlbXNgXG4gICAgICBpZihzY2hlbWEubWF4SXRlbXMpIHtcbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID4gc2NoZW1hLm1heEl0ZW1zKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHByb3BlcnR5OiAnbWF4SXRlbXMnLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoJ2Vycm9yX21heEl0ZW1zJywgW3NjaGVtYS5tYXhJdGVtc10pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gYG1pbkl0ZW1zYFxuICAgICAgaWYoc2NoZW1hLm1pbkl0ZW1zKSB7XG4gICAgICAgIGlmKHZhbHVlLmxlbmd0aCA8IHNjaGVtYS5taW5JdGVtcykge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ21pbkl0ZW1zJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9taW5JdGVtcycsIFtzY2hlbWEubWluSXRlbXNdKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGB1bmlxdWVJdGVtc2BcbiAgICAgIGlmKHNjaGVtYS51bmlxdWVJdGVtcykge1xuICAgICAgICB2YXIgc2VlbiA9IHt9O1xuICAgICAgICBmb3IoaT0wOyBpPHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFsaWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZVtpXSk7XG4gICAgICAgICAgaWYoc2Vlblt2YWxpZF0pIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgcHJvcGVydHk6ICd1bmlxdWVJdGVtcycsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl91bmlxdWVJdGVtcycpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWVuW3ZhbGlkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT2JqZWN0IHNwZWNpZmljIHZhbGlkYXRpb25cbiAgICBlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgLy8gYG1heFByb3BlcnRpZXNgXG4gICAgICBpZihzY2hlbWEubWF4UHJvcGVydGllcykge1xuICAgICAgICB2YWxpZCA9IDA7XG4gICAgICAgIGZvcihpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYoIXZhbHVlLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcbiAgICAgICAgICB2YWxpZCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHZhbGlkID4gc2NoZW1hLm1heFByb3BlcnRpZXMpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgcHJvcGVydHk6ICdtYXhQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9tYXhQcm9wZXJ0aWVzJywgW3NjaGVtYS5tYXhQcm9wZXJ0aWVzXSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBgbWluUHJvcGVydGllc2BcbiAgICAgIGlmKHNjaGVtYS5taW5Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhbGlkID0gMDtcbiAgICAgICAgZm9yKGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICBpZighdmFsdWUuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbGlkKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodmFsaWQgPCBzY2hlbWEubWluUHJvcGVydGllcykge1xuICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ21pblByb3BlcnRpZXMnLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy50cmFuc2xhdGUoJ2Vycm9yX21pblByb3BlcnRpZXMnLCBbc2NoZW1hLm1pblByb3BlcnRpZXNdKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFZlcnNpb24gNCBgcmVxdWlyZWRgXG4gICAgICBpZihzY2hlbWEucmVxdWlyZWQgJiYgQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgIGZvcihpPTA7IGk8c2NoZW1hLnJlcXVpcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYodHlwZW9mIHZhbHVlW3NjaGVtYS5yZXF1aXJlZFtpXV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgcHJvcGVydHk6ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlKCdlcnJvcl9yZXF1aXJlZCcsIFtzY2hlbWEucmVxdWlyZWRbaV1dKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGBwcm9wZXJ0aWVzYFxuICAgICAgdmFyIHZhbGlkYXRlZF9wcm9wZXJ0aWVzID0ge307XG4gICAgICBpZihzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICBmb3IoaSBpbiBzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgICAgIGlmKCFzY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgICAgdmFsaWRhdGVkX3Byb3BlcnRpZXNbaV0gPSB0cnVlO1xuICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQodGhpcy5fdmFsaWRhdGVTY2hlbWEoc2NoZW1hLnByb3BlcnRpZXNbaV0sdmFsdWVbaV0scGF0aCsnLicraSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGBwYXR0ZXJuUHJvcGVydGllc2BcbiAgICAgIGlmKHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykge1xuICAgICAgICBmb3IoaSBpbiBzY2hlbWEucGF0dGVyblByb3BlcnRpZXMpIHtcbiAgICAgICAgICBpZighc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoaSk7XG5cbiAgICAgICAgICAvLyBDaGVjayB3aGljaCBwcm9wZXJ0aWVzIG1hdGNoXG4gICAgICAgICAgZm9yKGogaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShqKSkgY29udGludWU7XG4gICAgICAgICAgICBpZihyZWdleC50ZXN0KGopKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlZF9wcm9wZXJ0aWVzW2pdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEucGF0dGVyblByb3BlcnRpZXNbaV0sdmFsdWVbal0scGF0aCsnLicraikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgbm9fYWRkaXRpb25hbF9wcm9wZXJ0aWVzIG9wdGlvbiBjdXJyZW50bHkgZG9lc24ndCB3b3JrIHdpdGggZXh0ZW5kZWQgc2NoZW1hcyB0aGF0IHVzZSBvbmVPZiBvciBhbnlPZlxuICAgICAgaWYodHlwZW9mIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5ub19hZGRpdGlvbmFsX3Byb3BlcnRpZXMgJiYgIXNjaGVtYS5vbmVPZiAmJiAhc2NoZW1hLmFueU9mKSB7XG4gICAgICAgIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBgYWRkaXRpb25hbFByb3BlcnRpZXNgXG4gICAgICBpZih0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGZvcihpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYoIXZhbHVlLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcbiAgICAgICAgICBpZighdmFsaWRhdGVkX3Byb3BlcnRpZXNbaV0pIHtcbiAgICAgICAgICAgIC8vIE5vIGV4dHJhIHByb3BlcnRpZXMgYWxsb3dlZFxuICAgICAgICAgICAgaWYoIXNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICAgICAgICBlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfYWRkaXRpb25hbF9wcm9wZXJ0aWVzJywgW2ldKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGxvd2VkXG4gICAgICAgICAgICBlbHNlIGlmKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE11c3QgbWF0Y2ggc2NoZW1hXG4gICAgICAgICAgICAvLyBUT0RPOiBpbmNvbXBhdGliaWxpdHkgYmV0d2VlbiB2ZXJzaW9uIDMgYW5kIDQgb2YgdGhlIHNwZWNcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuX3ZhbGlkYXRlU2NoZW1hKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyx2YWx1ZVtpXSxwYXRoKycuJytpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGBkZXBlbmRlbmNpZXNgXG4gICAgICBpZihzY2hlbWEuZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIGZvcihpIGluIHNjaGVtYS5kZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgICBpZighc2NoZW1hLmRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgICAvLyBEb2Vzbid0IG5lZWQgdG8gbWVldCB0aGUgZGVwZW5kZW5jeVxuICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZVtpXSA9PT0gXCJ1bmRlZmluZWRcIikgY29udGludWU7XG5cbiAgICAgICAgICAvLyBQcm9wZXJ0eSBkZXBlbmRlbmN5XG4gICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShzY2hlbWEuZGVwZW5kZW5jaWVzW2ldKSkge1xuICAgICAgICAgICAgZm9yKGo9MDsgajxzY2hlbWEuZGVwZW5kZW5jaWVzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZVtzY2hlbWEuZGVwZW5kZW5jaWVzW2ldW2pdXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2RlcGVuZGVuY2llcycsXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZSgnZXJyb3JfZGVwZW5kZW5jeScsIFtzY2hlbWEuZGVwZW5kZW5jaWVzW2ldW2pdXSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBTY2hlbWEgZGVwZW5kZW5jeVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh0aGlzLl92YWxpZGF0ZVNjaGVtYShzY2hlbWEuZGVwZW5kZW5jaWVzW2ldLHZhbHVlLHBhdGgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDdXN0b20gdHlwZSB2YWxpZGF0aW9uIChnbG9iYWwpXG4gICAgJGVhY2goSlNPTkVkaXRvci5kZWZhdWx0cy5jdXN0b21fdmFsaWRhdG9ycyxmdW5jdGlvbihpLHZhbGlkYXRvcikge1xuICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh2YWxpZGF0b3IuY2FsbChzZWxmLHNjaGVtYSx2YWx1ZSxwYXRoKSk7XG4gICAgfSk7XG4gICAgLy8gQ3VzdG9tIHR5cGUgdmFsaWRhdGlvbiAoaW5zdGFuY2Ugc3BlY2lmaWMpXG4gICAgaWYodGhpcy5vcHRpb25zLmN1c3RvbV92YWxpZGF0b3JzKSB7XG4gICAgICAkZWFjaCh0aGlzLm9wdGlvbnMuY3VzdG9tX3ZhbGlkYXRvcnMsZnVuY3Rpb24oaSx2YWxpZGF0b3IpIHtcbiAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdCh2YWxpZGF0b3IuY2FsbChzZWxmLHNjaGVtYSx2YWx1ZSxwYXRoKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3JzO1xuICB9LFxuICBfY2hlY2tUeXBlOiBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgIC8vIFNpbXBsZSB0eXBlc1xuICAgIGlmKHR5cGVvZiB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZih0eXBlPT09XCJzdHJpbmdcIikgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbiAgICAgIGVsc2UgaWYodHlwZT09PVwibnVtYmVyXCIpIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG4gICAgICBlbHNlIGlmKHR5cGU9PT1cImludGVnZXJcIikgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB2YWx1ZSA9PT0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICBlbHNlIGlmKHR5cGU9PT1cImJvb2xlYW5cIikgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCI7XG4gICAgICBlbHNlIGlmKHR5cGU9PT1cImFycmF5XCIpIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICAgIGVsc2UgaWYodHlwZSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmICEoQXJyYXkuaXNBcnJheSh2YWx1ZSkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbiAgICAgIGVsc2UgaWYodHlwZSA9PT0gXCJudWxsXCIpIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbiAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIFNjaGVtYVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICF0aGlzLl92YWxpZGF0ZVNjaGVtYSh0eXBlLHZhbHVlKS5sZW5ndGg7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiBBbGwgZWRpdG9ycyBzaG91bGQgZXh0ZW5kIGZyb20gdGhpcyBjbGFzc1xuICovXG5KU09ORWRpdG9yLkFic3RyYWN0RWRpdG9yID0gQ2xhc3MuZXh0ZW5kKHtcbiAgb25DaGlsZEVkaXRvckNoYW5nZTogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgdGhpcy5vbkNoYW5nZSh0cnVlKTtcbiAgfSxcbiAgbm90aWZ5OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmpzb25lZGl0b3Iubm90aWZ5V2F0Y2hlcnModGhpcy5wYXRoKTtcbiAgfSxcbiAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQub25DaGlsZEVkaXRvckNoYW5nZSh0aGlzKTtcbiAgICBlbHNlIHRoaXMuanNvbmVkaXRvci5vbkNoYW5nZSgpO1xuICB9LFxuICBvbkNoYW5nZTogZnVuY3Rpb24oYnViYmxlKSB7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgICBpZih0aGlzLndhdGNoX2xpc3RlbmVyKSB0aGlzLndhdGNoX2xpc3RlbmVyKCk7XG4gICAgaWYoYnViYmxlKSB0aGlzLmNoYW5nZSgpO1xuICB9LFxuICByZWdpc3RlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5qc29uZWRpdG9yLnJlZ2lzdGVyRWRpdG9yKHRoaXMpO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfSxcbiAgdW5yZWdpc3RlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYoIXRoaXMuanNvbmVkaXRvcikgcmV0dXJuO1xuICAgIHRoaXMuanNvbmVkaXRvci51bnJlZ2lzdGVyRWRpdG9yKHRoaXMpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gMTI7XG4gIH0sXG4gIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLmpzb25lZGl0b3IgPSBvcHRpb25zLmpzb25lZGl0b3I7XG5cbiAgICB0aGlzLnRoZW1lID0gdGhpcy5qc29uZWRpdG9yLnRoZW1lO1xuICAgIHRoaXMudGVtcGxhdGVfZW5naW5lID0gdGhpcy5qc29uZWRpdG9yLnRlbXBsYXRlO1xuICAgIHRoaXMuaWNvbmxpYiA9IHRoaXMuanNvbmVkaXRvci5pY29ubGliO1xuXG4gICAgdGhpcy50cmFuc2xhdGUgPSB0aGlzLmpzb25lZGl0b3IudHJhbnNsYXRlIHx8IEpTT05FZGl0b3IuZGVmYXVsdHMudHJhbnNsYXRlO1xuXG4gICAgdGhpcy5vcmlnaW5hbF9zY2hlbWEgPSBvcHRpb25zLnNjaGVtYTtcbiAgICB0aGlzLnNjaGVtYSA9IHRoaXMuanNvbmVkaXRvci5leHBhbmRTY2hlbWEodGhpcy5vcmlnaW5hbF9zY2hlbWEpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gJGV4dGVuZCh7fSwgKHRoaXMub3B0aW9ucyB8fCB7fSksIChvcHRpb25zLnNjaGVtYS5vcHRpb25zIHx8IHt9KSwgb3B0aW9ucyk7XG5cbiAgICBpZighb3B0aW9ucy5wYXRoICYmICF0aGlzLnNjaGVtYS5pZCkgdGhpcy5zY2hlbWEuaWQgPSAncm9vdCc7XG4gICAgdGhpcy5wYXRoID0gb3B0aW9ucy5wYXRoIHx8ICdyb290JztcbiAgICB0aGlzLmZvcm1uYW1lID0gb3B0aW9ucy5mb3JtbmFtZSB8fCB0aGlzLnBhdGgucmVwbGFjZSgvXFwuKFteLl0rKS9nLCdbJDFdJyk7XG4gICAgaWYodGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZm9ybV9uYW1lX3Jvb3QpIHRoaXMuZm9ybW5hbWUgPSB0aGlzLmZvcm1uYW1lLnJlcGxhY2UoL15yb290XFxbLyx0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5mb3JtX25hbWVfcm9vdCsnWycpO1xuICAgIHRoaXMua2V5ID0gdGhpcy5wYXRoLnNwbGl0KCcuJykucG9wKCk7XG4gICAgdGhpcy5wYXJlbnQgPSBvcHRpb25zLnBhcmVudDtcblxuICAgIHRoaXMubGlua193YXRjaGVycyA9IFtdO1xuXG4gICAgaWYob3B0aW9ucy5jb250YWluZXIpIHRoaXMuc2V0Q29udGFpbmVyKG9wdGlvbnMuY29udGFpbmVyKTtcbiAgfSxcbiAgc2V0Q29udGFpbmVyOiBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICBpZih0aGlzLnNjaGVtYS5pZCkgdGhpcy5jb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXNjaGVtYWlkJyx0aGlzLnNjaGVtYS5pZCk7XG4gICAgaWYodGhpcy5zY2hlbWEudHlwZSAmJiB0eXBlb2YgdGhpcy5zY2hlbWEudHlwZSA9PT0gXCJzdHJpbmdcIikgdGhpcy5jb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXNjaGVtYXR5cGUnLHRoaXMuc2NoZW1hLnR5cGUpO1xuICAgIHRoaXMuY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1zY2hlbWFwYXRoJyx0aGlzLnBhdGgpO1xuICB9LFxuXG4gIHByZUJ1aWxkOiBmdW5jdGlvbigpIHtcblxuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG5cbiAgfSxcbiAgcG9zdEJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldHVwV2F0Y2hMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmFkZExpbmtzKCk7XG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldERlZmF1bHQoKSwgdHJ1ZSk7XG4gICAgdGhpcy51cGRhdGVIZWFkZXJUZXh0KCk7XG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICAgIHRoaXMub25XYXRjaGVkRmllbGRDaGFuZ2UoKTtcbiAgfSxcblxuICBzZXR1cFdhdGNoTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBXYXRjaGVkIGZpZWxkc1xuICAgIHRoaXMud2F0Y2hlZCA9IHt9O1xuICAgIGlmKHRoaXMuc2NoZW1hLnZhcnMpIHRoaXMuc2NoZW1hLndhdGNoID0gdGhpcy5zY2hlbWEudmFycztcbiAgICB0aGlzLndhdGNoZWRfdmFsdWVzID0ge307XG4gICAgdGhpcy53YXRjaF9saXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYoc2VsZi5yZWZyZXNoV2F0Y2hlZEZpZWxkVmFsdWVzKCkpIHtcbiAgICAgICAgc2VsZi5vbldhdGNoZWRGaWVsZENoYW5nZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgaWYodGhpcy5zY2hlbWEuaGFzT3duUHJvcGVydHkoJ3dhdGNoJykpIHtcbiAgICAgIHZhciBwYXRoLHBhdGhfcGFydHMsZmlyc3Qscm9vdCxhZGp1c3RlZF9wYXRoO1xuXG4gICAgICBmb3IodmFyIG5hbWUgaW4gdGhpcy5zY2hlbWEud2F0Y2gpIHtcbiAgICAgICAgaWYoIXRoaXMuc2NoZW1hLndhdGNoLmhhc093blByb3BlcnR5KG5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgcGF0aCA9IHRoaXMuc2NoZW1hLndhdGNoW25hbWVdO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICAgICAgICBpZihwYXRoLmxlbmd0aDwyKSBjb250aW51ZTtcbiAgICAgICAgICBwYXRoX3BhcnRzID0gW3BhdGhbMF1dLmNvbmNhdChwYXRoWzFdLnNwbGl0KCcuJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHBhdGhfcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaWYoIXNlbGYudGhlbWUuY2xvc2VzdChzZWxmLmNvbnRhaW5lciwnW2RhdGEtc2NoZW1haWQ9XCInK3BhdGhfcGFydHNbMF0rJ1wiXScpKSBwYXRoX3BhcnRzLnVuc2hpZnQoJyMnKTtcbiAgICAgICAgfVxuICAgICAgICBmaXJzdCA9IHBhdGhfcGFydHMuc2hpZnQoKTtcblxuICAgICAgICBpZihmaXJzdCA9PT0gJyMnKSBmaXJzdCA9IHNlbGYuanNvbmVkaXRvci5zY2hlbWEuaWQgfHwgJ3Jvb3QnO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIHJvb3Qgbm9kZSBmb3IgdGhpcyB0ZW1wbGF0ZSB2YXJpYWJsZVxuICAgICAgICByb290ID0gc2VsZi50aGVtZS5jbG9zZXN0KHNlbGYuY29udGFpbmVyLCdbZGF0YS1zY2hlbWFpZD1cIicrZmlyc3QrJ1wiXScpO1xuICAgICAgICBpZighcm9vdCkgdGhyb3cgXCJDb3VsZCBub3QgZmluZCBhbmNlc3RvciBub2RlIHdpdGggaWQgXCIrZmlyc3Q7XG5cbiAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgcm9vdCBub2RlIGFuZCBwYXRoIGZvciB1c2Ugd2hlbiByZW5kZXJpbmcgdGhlIHRlbXBsYXRlXG4gICAgICAgIGFkanVzdGVkX3BhdGggPSByb290LmdldEF0dHJpYnV0ZSgnZGF0YS1zY2hlbWFwYXRoJykgKyAnLicgKyBwYXRoX3BhcnRzLmpvaW4oJy4nKTtcblxuICAgICAgICBzZWxmLmpzb25lZGl0b3Iud2F0Y2goYWRqdXN0ZWRfcGF0aCxzZWxmLndhdGNoX2xpc3RlbmVyKTtcblxuICAgICAgICBzZWxmLndhdGNoZWRbbmFtZV0gPSBhZGp1c3RlZF9wYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIER5bmFtaWMgaGVhZGVyXG4gICAgaWYodGhpcy5zY2hlbWEuaGVhZGVyVGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuaGVhZGVyX3RlbXBsYXRlID0gdGhpcy5qc29uZWRpdG9yLmNvbXBpbGVUZW1wbGF0ZSh0aGlzLnNjaGVtYS5oZWFkZXJUZW1wbGF0ZSwgdGhpcy50ZW1wbGF0ZV9lbmdpbmUpO1xuICAgIH1cbiAgfSxcblxuICBhZGRMaW5rczogZnVuY3Rpb24oKSB7XG4gICAgLy8gQWRkIGxpbmtzXG4gICAgaWYoIXRoaXMubm9fbGlua19ob2xkZXIpIHtcbiAgICAgIHRoaXMubGlua19ob2xkZXIgPSB0aGlzLnRoZW1lLmdldExpbmtzSG9sZGVyKCk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxpbmtfaG9sZGVyKTtcbiAgICAgIGlmKHRoaXMuc2NoZW1hLmxpbmtzKSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuc2NoZW1hLmxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5hZGRMaW5rKHRoaXMuZ2V0TGluayh0aGlzLnNjaGVtYS5saW5rc1tpXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG5cbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBidG5DbGFzcyA9ICdqc29uLWVkaXRvci1idG4tJytpY29uO1xuICAgIGlmKCF0aGlzLmljb25saWIpIGljb24gPSBudWxsO1xuICAgIGVsc2UgaWNvbiA9IHRoaXMuaWNvbmxpYi5nZXRJY29uKGljb24pO1xuXG4gICAgaWYoIWljb24gJiYgdGl0bGUpIHtcbiAgICAgIHRleHQgPSB0aXRsZTtcbiAgICAgIHRpdGxlID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYnRuID0gdGhpcy50aGVtZS5nZXRCdXR0b24odGV4dCwgaWNvbiwgdGl0bGUpO1xuICAgIGJ0bi5jbGFzc05hbWUgKz0gJyAnICsgYnRuQ2xhc3MgKyAnICc7XG4gICAgcmV0dXJuIGJ0bjtcbiAgfSxcbiAgc2V0QnV0dG9uVGV4dDogZnVuY3Rpb24oYnV0dG9uLCB0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIGlmKCF0aGlzLmljb25saWIpIGljb24gPSBudWxsO1xuICAgIGVsc2UgaWNvbiA9IHRoaXMuaWNvbmxpYi5nZXRJY29uKGljb24pO1xuXG4gICAgaWYoIWljb24gJiYgdGl0bGUpIHtcbiAgICAgIHRleHQgPSB0aXRsZTtcbiAgICAgIHRpdGxlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50aGVtZS5zZXRCdXR0b25UZXh0KGJ1dHRvbiwgdGV4dCwgaWNvbiwgdGl0bGUpO1xuICB9LFxuICBhZGRMaW5rOiBmdW5jdGlvbihsaW5rKSB7XG4gICAgaWYodGhpcy5saW5rX2hvbGRlcikgdGhpcy5saW5rX2hvbGRlci5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfSxcbiAgZ2V0TGluazogZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBob2xkZXIsIGxpbms7XG5cbiAgICAvLyBHZXQgbWltZSB0eXBlIG9mIHRoZSBsaW5rXG4gICAgdmFyIG1pbWUgPSBkYXRhLm1lZGlhVHlwZSB8fCAnYXBwbGljYXRpb24vamF2YXNjcmlwdCc7XG4gICAgdmFyIHR5cGUgPSBtaW1lLnNwbGl0KCcvJylbMF07XG5cbiAgICAvLyBUZW1wbGF0ZSB0byBnZW5lcmF0ZSB0aGUgbGluayBocmVmXG4gICAgdmFyIGhyZWYgPSB0aGlzLmpzb25lZGl0b3IuY29tcGlsZVRlbXBsYXRlKGRhdGEuaHJlZix0aGlzLnRlbXBsYXRlX2VuZ2luZSk7XG5cbiAgICAvLyBUZW1wbGF0ZSB0byBnZW5lcmF0ZSB0aGUgbGluaydzIGRvd25sb2FkIGF0dHJpYnV0ZVxuICAgIHZhciBkb3dubG9hZCA9IG51bGw7XG4gICAgaWYoZGF0YS5kb3dubG9hZCkgZG93bmxvYWQgPSBkYXRhLmRvd25sb2FkO1xuXG4gICAgaWYoZG93bmxvYWQgJiYgZG93bmxvYWQgIT09IHRydWUpIHtcbiAgICAgIGRvd25sb2FkID0gdGhpcy5qc29uZWRpdG9yLmNvbXBpbGVUZW1wbGF0ZShkb3dubG9hZCwgdGhpcy50ZW1wbGF0ZV9lbmdpbmUpO1xuICAgIH1cblxuICAgIC8vIEltYWdlIGxpbmtzXG4gICAgaWYodHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgaG9sZGVyID0gdGhpcy50aGVtZS5nZXRCbG9ja0xpbmtIb2xkZXIoKTtcbiAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywnX2JsYW5rJyk7XG4gICAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgdGhpcy50aGVtZS5jcmVhdGVJbWFnZUxpbmsoaG9sZGVyLGxpbmssaW1hZ2UpO1xuXG4gICAgICAvLyBXaGVuIGEgd2F0Y2hlZCBmaWVsZCBjaGFuZ2VzLCB1cGRhdGUgdGhlIHVybFxuICAgICAgdGhpcy5saW5rX3dhdGNoZXJzLnB1c2goZnVuY3Rpb24odmFycykge1xuICAgICAgICB2YXIgdXJsID0gaHJlZih2YXJzKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLHVybCk7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd0aXRsZScsZGF0YS5yZWwgfHwgdXJsKTtcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLHVybCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQXVkaW8vVmlkZW8gbGlua3NcbiAgICBlbHNlIGlmKFsnYXVkaW8nLCd2aWRlbyddLmluZGV4T2YodHlwZSkgPj0wKSB7XG4gICAgICBob2xkZXIgPSB0aGlzLnRoZW1lLmdldEJsb2NrTGlua0hvbGRlcigpO1xuXG4gICAgICBsaW5rID0gdGhpcy50aGVtZS5nZXRCbG9ja0xpbmsoKTtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCdfYmxhbmsnKTtcblxuICAgICAgdmFyIG1lZGlhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgIG1lZGlhLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCdjb250cm9scycpO1xuXG4gICAgICB0aGlzLnRoZW1lLmNyZWF0ZU1lZGlhTGluayhob2xkZXIsbGluayxtZWRpYSk7XG5cbiAgICAgIC8vIFdoZW4gYSB3YXRjaGVkIGZpZWxkIGNoYW5nZXMsIHVwZGF0ZSB0aGUgdXJsXG4gICAgICB0aGlzLmxpbmtfd2F0Y2hlcnMucHVzaChmdW5jdGlvbih2YXJzKSB7XG4gICAgICAgIHZhciB1cmwgPSBocmVmKHZhcnMpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsdXJsKTtcbiAgICAgICAgbGluay50ZXh0Q29udGVudCA9IGRhdGEucmVsIHx8IHVybDtcbiAgICAgICAgbWVkaWEuc2V0QXR0cmlidXRlKCdzcmMnLHVybCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gVGV4dCBsaW5rc1xuICAgIGVsc2Uge1xuICAgICAgbGluayA9IGhvbGRlciA9IHRoaXMudGhlbWUuZ2V0QmxvY2tMaW5rKCk7XG4gICAgICBob2xkZXIuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCdfYmxhbmsnKTtcbiAgICAgIGhvbGRlci50ZXh0Q29udGVudCA9IGRhdGEucmVsO1xuXG4gICAgICAvLyBXaGVuIGEgd2F0Y2hlZCBmaWVsZCBjaGFuZ2VzLCB1cGRhdGUgdGhlIHVybFxuICAgICAgdGhpcy5saW5rX3dhdGNoZXJzLnB1c2goZnVuY3Rpb24odmFycykge1xuICAgICAgICB2YXIgdXJsID0gaHJlZih2YXJzKTtcbiAgICAgICAgaG9sZGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsdXJsKTtcbiAgICAgICAgaG9sZGVyLnRleHRDb250ZW50ID0gZGF0YS5yZWwgfHwgdXJsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoZG93bmxvYWQgJiYgbGluaykge1xuICAgICAgaWYoZG93bmxvYWQgPT09IHRydWUpIHtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywnJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5saW5rX3dhdGNoZXJzLnB1c2goZnVuY3Rpb24odmFycykge1xuICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsZG93bmxvYWQodmFycykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihkYXRhLmNsYXNzKSBsaW5rLmNsYXNzTmFtZSA9IGxpbmsuY2xhc3NOYW1lICsgJyAnICsgZGF0YS5jbGFzcztcblxuICAgIHJldHVybiBob2xkZXI7XG4gIH0sXG4gIHJlZnJlc2hXYXRjaGVkRmllbGRWYWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmKCF0aGlzLndhdGNoZWRfdmFsdWVzKSByZXR1cm47XG4gICAgdmFyIHdhdGNoZWQgPSB7fTtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmKHRoaXMud2F0Y2hlZCkge1xuICAgICAgdmFyIHZhbCxlZGl0b3I7XG4gICAgICBmb3IodmFyIG5hbWUgaW4gdGhpcy53YXRjaGVkKSB7XG4gICAgICAgIGlmKCF0aGlzLndhdGNoZWQuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICBlZGl0b3IgPSBzZWxmLmpzb25lZGl0b3IuZ2V0RWRpdG9yKHRoaXMud2F0Y2hlZFtuYW1lXSk7XG4gICAgICAgIHZhbCA9IGVkaXRvcj8gZWRpdG9yLmdldFZhbHVlKCkgOiBudWxsO1xuICAgICAgICBpZihzZWxmLndhdGNoZWRfdmFsdWVzW25hbWVdICE9PSB2YWwpIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB3YXRjaGVkW25hbWVdID0gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdhdGNoZWQuc2VsZiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICBpZih0aGlzLndhdGNoZWRfdmFsdWVzLnNlbGYgIT09IHdhdGNoZWQuc2VsZikgY2hhbmdlZCA9IHRydWU7XG5cbiAgICB0aGlzLndhdGNoZWRfdmFsdWVzID0gd2F0Y2hlZDtcblxuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9LFxuICBnZXRXYXRjaGVkRmllbGRWYWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndhdGNoZWRfdmFsdWVzO1xuICB9LFxuICB1cGRhdGVIZWFkZXJUZXh0OiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmhlYWRlcikge1xuICAgICAgLy8gSWYgdGhlIGhlYWRlciBoYXMgY2hpbGRyZW4sIG9ubHkgdXBkYXRlIHRoZSB0ZXh0IG5vZGUncyB2YWx1ZVxuICAgICAgaWYodGhpcy5oZWFkZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuaGVhZGVyLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZih0aGlzLmhlYWRlci5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlPT09Mykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuY2hpbGROb2Rlc1tpXS5ub2RlVmFsdWUgPSB0aGlzLmdldEhlYWRlclRleHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCBqdXN0IHVwZGF0ZSB0aGUgZW50aXJlIG5vZGVcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmhlYWRlci50ZXh0Q29udGVudCA9IHRoaXMuZ2V0SGVhZGVyVGV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZ2V0SGVhZGVyVGV4dDogZnVuY3Rpb24odGl0bGVfb25seSkge1xuICAgIGlmKHRoaXMuaGVhZGVyX3RleHQpIHJldHVybiB0aGlzLmhlYWRlcl90ZXh0O1xuICAgIGVsc2UgaWYodGl0bGVfb25seSkgcmV0dXJuIHRoaXMuc2NoZW1hLnRpdGxlO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKTtcbiAgfSxcbiAgb25XYXRjaGVkRmllbGRDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YXJzO1xuICAgIGlmKHRoaXMuaGVhZGVyX3RlbXBsYXRlKSB7XG4gICAgICB2YXJzID0gJGV4dGVuZCh0aGlzLmdldFdhdGNoZWRGaWVsZFZhbHVlcygpLHtcbiAgICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgICAgaTogdGhpcy5rZXksXG4gICAgICAgIGkwOiAodGhpcy5rZXkqMSksXG4gICAgICAgIGkxOiAodGhpcy5rZXkqMSsxKSxcbiAgICAgICAgdGl0bGU6IHRoaXMuZ2V0VGl0bGUoKVxuICAgICAgfSk7XG4gICAgICB2YXIgaGVhZGVyX3RleHQgPSB0aGlzLmhlYWRlcl90ZW1wbGF0ZSh2YXJzKTtcblxuICAgICAgaWYoaGVhZGVyX3RleHQgIT09IHRoaXMuaGVhZGVyX3RleHQpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJfdGV4dCA9IGhlYWRlcl90ZXh0O1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclRleHQoKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICAgICAgLy90aGlzLmZpcmVDaGFuZ2VIZWFkZXJFdmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmxpbmtfd2F0Y2hlcnMubGVuZ3RoKSB7XG4gICAgICB2YXJzID0gdGhpcy5nZXRXYXRjaGVkRmllbGRWYWx1ZXMoKTtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMubGlua193YXRjaGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmxpbmtfd2F0Y2hlcnNbaV0odmFycyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH0sXG4gIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfSxcbiAgcmVmcmVzaFZhbHVlOiBmdW5jdGlvbigpIHtcblxuICB9LFxuICBnZXRDaGlsZEVkaXRvcnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMudW5yZWdpc3Rlcih0aGlzKTtcbiAgICAkZWFjaCh0aGlzLndhdGNoZWQsZnVuY3Rpb24obmFtZSxhZGp1c3RlZF9wYXRoKSB7XG4gICAgICBzZWxmLmpzb25lZGl0b3IudW53YXRjaChhZGp1c3RlZF9wYXRoLHNlbGYud2F0Y2hfbGlzdGVuZXIpO1xuICAgIH0pO1xuICAgIHRoaXMud2F0Y2hlZCA9IG51bGw7XG4gICAgdGhpcy53YXRjaGVkX3ZhbHVlcyA9IG51bGw7XG4gICAgdGhpcy53YXRjaF9saXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5oZWFkZXJfdGV4dCA9IG51bGw7XG4gICAgdGhpcy5oZWFkZXJfdGVtcGxhdGUgPSBudWxsO1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIGlmKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUpIHRoaXMuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmpzb25lZGl0b3IgPSBudWxsO1xuICAgIHRoaXMuc2NoZW1hID0gbnVsbDtcbiAgICB0aGlzLnBhdGggPSBudWxsO1xuICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIH0sXG4gIGdldERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuc2NoZW1hW1wiZGVmYXVsdFwiXSkgcmV0dXJuIHRoaXMuc2NoZW1hW1wiZGVmYXVsdFwiXTtcbiAgICBpZih0aGlzLnNjaGVtYVtcImVudW1cIl0pIHJldHVybiB0aGlzLnNjaGVtYVtcImVudW1cIl1bMF07XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuc2NoZW1hLnR5cGUgfHwgdGhpcy5zY2hlbWEub25lT2Y7XG4gICAgaWYodHlwZSAmJiBBcnJheS5pc0FycmF5KHR5cGUpKSB0eXBlID0gdHlwZVswXTtcbiAgICBpZih0eXBlICYmIHR5cGVvZiB0eXBlID09PSBcIm9iamVjdFwiKSB0eXBlID0gdHlwZS50eXBlO1xuICAgIGlmKHR5cGUgJiYgQXJyYXkuaXNBcnJheSh0eXBlKSkgdHlwZSA9IHR5cGVbMF07XG5cbiAgICBpZih0eXBlb2YgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYodHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIDAuMDtcbiAgICAgIGlmKHR5cGUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZih0eXBlID09PSBcImludGVnZXJcIikgcmV0dXJuIDA7XG4gICAgICBpZih0eXBlID09PSBcInN0cmluZ1wiKSByZXR1cm4gXCJcIjtcbiAgICAgIGlmKHR5cGUgPT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcbiAgICAgIGlmKHR5cGUgPT09IFwiYXJyYXlcIikgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBnZXRUaXRsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hLnRpdGxlIHx8IHRoaXMua2V5O1xuICB9LFxuICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gIH0sXG4gIGlzRW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICF0aGlzLmRpc2FibGVkO1xuICB9LFxuICBpc1JlcXVpcmVkOiBmdW5jdGlvbigpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5zY2hlbWEucmVxdWlyZWQgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdGhpcy5zY2hlbWEucmVxdWlyZWQ7XG4gICAgZWxzZSBpZih0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5zY2hlbWEgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnBhcmVudC5zY2hlbWEucmVxdWlyZWQpKSByZXR1cm4gdGhpcy5wYXJlbnQuc2NoZW1hLnJlcXVpcmVkLmluZGV4T2YodGhpcy5rZXkpID4gLTE7XG4gICAgZWxzZSBpZih0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5yZXF1aXJlZF9ieV9kZWZhdWx0KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZ2V0RGlzcGxheVRleHQ6IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciBkaXNwID0gW107XG4gICAgdmFyIHVzZWQgPSB7fTtcblxuICAgIC8vIERldGVybWluZSBob3cgbWFueSB0aW1lcyBlYWNoIGF0dHJpYnV0ZSBuYW1lIGlzIHVzZWQuXG4gICAgLy8gVGhpcyBoZWxwcyB1cyBwaWNrIHRoZSBtb3N0IGRpc3RpbmN0IGRpc3BsYXkgdGV4dCBmb3IgdGhlIHNjaGVtYXMuXG4gICAgJGVhY2goYXJyLGZ1bmN0aW9uKGksZWwpIHtcbiAgICAgIGlmKGVsLnRpdGxlKSB7XG4gICAgICAgIHVzZWRbZWwudGl0bGVdID0gdXNlZFtlbC50aXRsZV0gfHwgMDtcbiAgICAgICAgdXNlZFtlbC50aXRsZV0rKztcbiAgICAgIH1cbiAgICAgIGlmKGVsLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHVzZWRbZWwuZGVzY3JpcHRpb25dID0gdXNlZFtlbC5kZXNjcmlwdGlvbl0gfHwgMDtcbiAgICAgICAgdXNlZFtlbC5kZXNjcmlwdGlvbl0rKztcbiAgICAgIH1cbiAgICAgIGlmKGVsLmZvcm1hdCkge1xuICAgICAgICB1c2VkW2VsLmZvcm1hdF0gPSB1c2VkW2VsLmZvcm1hdF0gfHwgMDtcbiAgICAgICAgdXNlZFtlbC5mb3JtYXRdKys7XG4gICAgICB9XG4gICAgICBpZihlbC50eXBlKSB7XG4gICAgICAgIHVzZWRbZWwudHlwZV0gPSB1c2VkW2VsLnR5cGVdIHx8IDA7XG4gICAgICAgIHVzZWRbZWwudHlwZV0rKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERldGVybWluZSBkaXNwbGF5IHRleHQgZm9yIGVhY2ggZWxlbWVudCBvZiB0aGUgYXJyYXlcbiAgICAkZWFjaChhcnIsZnVuY3Rpb24oaSxlbCkgIHtcbiAgICAgIHZhciBuYW1lO1xuXG4gICAgICAvLyBJZiBpdCdzIGEgc2ltcGxlIHN0cmluZ1xuICAgICAgaWYodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSBuYW1lID0gZWw7XG4gICAgICAvLyBPYmplY3RcbiAgICAgIGVsc2UgaWYoZWwudGl0bGUgJiYgdXNlZFtlbC50aXRsZV08PTEpIG5hbWUgPSBlbC50aXRsZTtcbiAgICAgIGVsc2UgaWYoZWwuZm9ybWF0ICYmIHVzZWRbZWwuZm9ybWF0XTw9MSkgbmFtZSA9IGVsLmZvcm1hdDtcbiAgICAgIGVsc2UgaWYoZWwudHlwZSAmJiB1c2VkW2VsLnR5cGVdPD0xKSBuYW1lID0gZWwudHlwZTtcbiAgICAgIGVsc2UgaWYoZWwuZGVzY3JpcHRpb24gJiYgdXNlZFtlbC5kZXNjcmlwdGlvbl08PTEpIG5hbWUgPSBlbC5kZXNjcmlwdG9uO1xuICAgICAgZWxzZSBpZihlbC50aXRsZSkgbmFtZSA9IGVsLnRpdGxlO1xuICAgICAgZWxzZSBpZihlbC5mb3JtYXQpIG5hbWUgPSBlbC5mb3JtYXQ7XG4gICAgICBlbHNlIGlmKGVsLnR5cGUpIG5hbWUgPSBlbC50eXBlO1xuICAgICAgZWxzZSBpZihlbC5kZXNjcmlwdGlvbikgbmFtZSA9IGVsLmRlc2NyaXB0aW9uO1xuICAgICAgZWxzZSBpZihKU09OLnN0cmluZ2lmeShlbCkubGVuZ3RoIDwgNTApIG5hbWUgPSBKU09OLnN0cmluZ2lmeShlbCk7XG4gICAgICBlbHNlIG5hbWUgPSBcInR5cGVcIjtcblxuICAgICAgZGlzcC5wdXNoKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gUmVwbGFjZSBpZGVudGljYWwgZGlzcGxheSB0ZXh0IHdpdGggXCJ0ZXh0IDFcIiwgXCJ0ZXh0IDJcIiwgZXRjLlxuICAgIHZhciBpbmMgPSB7fTtcbiAgICAkZWFjaChkaXNwLGZ1bmN0aW9uKGksbmFtZSkge1xuICAgICAgaW5jW25hbWVdID0gaW5jW25hbWVdIHx8IDA7XG4gICAgICBpbmNbbmFtZV0rKztcblxuICAgICAgaWYodXNlZFtuYW1lXSA+IDEpIGRpc3BbaV0gPSBuYW1lICsgXCIgXCIgKyBpbmNbbmFtZV07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlzcDtcbiAgfSxcbiAgZ2V0T3B0aW9uOiBmdW5jdGlvbihrZXkpIHtcbiAgICB0cnkge1xuICAgICAgdGhyb3cgXCJnZXRPcHRpb24gaXMgZGVwcmVjYXRlZFwiO1xuICAgIH1cbiAgICBjYXRjaChlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW2tleV07XG4gIH0sXG4gIHNob3dWYWxpZGF0aW9uRXJyb3JzOiBmdW5jdGlvbihlcnJvcnMpIHtcblxuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzW1wibnVsbFwiXSA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vbkNoYW5nZSgpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gMjtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5zdHJpbmcgPSBKU09ORWRpdG9yLkFic3RyYWN0RWRpdG9yLmV4dGVuZCh7XG4gIHJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zdXBlcigpO1xuICAgIGlmKCF0aGlzLmlucHV0KSByZXR1cm47XG4gICAgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLHRoaXMuZm9ybW5hbWUpO1xuICB9LFxuICB1bnJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zdXBlcigpO1xuICAgIGlmKCF0aGlzLmlucHV0KSByZXR1cm47XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgfSxcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLGluaXRpYWwsZnJvbV90ZW1wbGF0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmKHRoaXMudGVtcGxhdGUgJiYgIWZyb21fdGVtcGxhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZih2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB2YWx1ZSA9IFwiXCI7XG4gICAgZWxzZSBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIGVsc2UgaWYodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB2YWx1ZSA9IFwiXCIrdmFsdWU7XG5cbiAgICBpZih2YWx1ZSA9PT0gdGhpcy5zZXJpYWxpemVkKSByZXR1cm47XG5cbiAgICAvLyBTYW5pdGl6ZSB2YWx1ZSBiZWZvcmUgc2V0dGluZyBpdFxuICAgIHZhciBzYW5pdGl6ZWQgPSB0aGlzLnNhbml0aXplKHZhbHVlKTtcblxuICAgIGlmKHRoaXMuaW5wdXQudmFsdWUgPT09IHNhbml0aXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSBzYW5pdGl6ZWQ7XG5cbiAgICAvLyBJZiB1c2luZyBTQ0VkaXRvciwgdXBkYXRlIHRoZSBXWVNJV1lHXG4gICAgaWYodGhpcy5zY2VkaXRvcl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5zY2VkaXRvcl9pbnN0YW5jZS52YWwoc2FuaXRpemVkKTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLmVwaWNlZGl0b3IpIHtcbiAgICAgIHRoaXMuZXBpY2VkaXRvci5pbXBvcnRGaWxlKG51bGwsc2FuaXRpemVkKTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLmFjZV9lZGl0b3IpIHtcbiAgICAgIHRoaXMuYWNlX2VkaXRvci5zZXRWYWx1ZShzYW5pdGl6ZWQpO1xuICAgIH1cblxuICAgIHZhciBjaGFuZ2VkID0gZnJvbV90ZW1wbGF0ZSB8fCB0aGlzLmdldFZhbHVlKCkgIT09IHZhbHVlO1xuXG4gICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcblxuICAgIGlmKGluaXRpYWwpIHRoaXMuaXNfZGlydHkgPSBmYWxzZTtcbiAgICBlbHNlIGlmKHRoaXMuanNvbmVkaXRvci5vcHRpb25zLnNob3dfZXJyb3JzID09PSBcImNoYW5nZVwiKSB0aGlzLmlzX2RpcnR5ID0gdHJ1ZTtcblxuICAgIGlmKHRoaXMuYWRqdXN0X2hlaWdodCkgdGhpcy5hZGp1c3RfaGVpZ2h0KHRoaXMuaW5wdXQpO1xuXG4gICAgLy8gQnViYmxlIHRoaXMgc2V0VmFsdWUgdG8gcGFyZW50cyBpZiB0aGUgdmFsdWUgY2hhbmdlZFxuICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlZCk7XG4gIH0sXG4gIGdldE51bUNvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtaW4gPSBNYXRoLmNlaWwoTWF0aC5tYXgodGhpcy5nZXRUaXRsZSgpLmxlbmd0aCx0aGlzLnNjaGVtYS5tYXhMZW5ndGh8fDAsdGhpcy5zY2hlbWEubWluTGVuZ3RofHwwKS81KTtcbiAgICB2YXIgbnVtO1xuXG4gICAgaWYodGhpcy5pbnB1dF90eXBlID09PSAndGV4dGFyZWEnKSBudW0gPSA2O1xuICAgIGVsc2UgaWYoWyd0ZXh0JywnZW1haWwnXS5pbmRleE9mKHRoaXMuaW5wdXRfdHlwZSkgPj0gMCkgbnVtID0gNDtcbiAgICBlbHNlIG51bSA9IDI7XG5cbiAgICByZXR1cm4gTWF0aC5taW4oMTIsTWF0aC5tYXgobWluLG51bSkpO1xuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBpO1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5oZWFkZXIgPSB0aGlzLmxhYmVsID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIGlmKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKSB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXREZXNjcmlwdGlvbih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbik7XG5cbiAgICB0aGlzLmZvcm1hdCA9IHRoaXMuc2NoZW1hLmZvcm1hdDtcbiAgICBpZighdGhpcy5mb3JtYXQgJiYgdGhpcy5zY2hlbWEubWVkaWEgJiYgdGhpcy5zY2hlbWEubWVkaWEudHlwZSkge1xuICAgICAgdGhpcy5mb3JtYXQgPSB0aGlzLnNjaGVtYS5tZWRpYS50eXBlLnJlcGxhY2UoLyheKGFwcGxpY2F0aW9ufHRleHQpXFwvKHgtKT8oc2NyaXB0XFwuKT8pfCgtc291cmNlJCkvZywnJyk7XG4gICAgfVxuICAgIGlmKCF0aGlzLmZvcm1hdCAmJiB0aGlzLm9wdGlvbnMuZGVmYXVsdF9mb3JtYXQpIHtcbiAgICAgIHRoaXMuZm9ybWF0ID0gdGhpcy5vcHRpb25zLmRlZmF1bHRfZm9ybWF0O1xuICAgIH1cbiAgICBpZih0aGlzLm9wdGlvbnMuZm9ybWF0KSB7XG4gICAgICB0aGlzLmZvcm1hdCA9IHRoaXMub3B0aW9ucy5mb3JtYXQ7XG4gICAgfVxuXG4gICAgLy8gU3BlY2lmaWMgZm9ybWF0XG4gICAgaWYodGhpcy5mb3JtYXQpIHtcbiAgICAgIC8vIFRleHQgQXJlYVxuICAgICAgaWYodGhpcy5mb3JtYXQgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgdGhpcy5pbnB1dF90eXBlID0gJ3RleHRhcmVhJztcbiAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMudGhlbWUuZ2V0VGV4dGFyZWFJbnB1dCgpO1xuICAgICAgfVxuICAgICAgLy8gUmFuZ2UgSW5wdXRcbiAgICAgIGVsc2UgaWYodGhpcy5mb3JtYXQgPT09ICdyYW5nZScpIHtcbiAgICAgICAgdGhpcy5pbnB1dF90eXBlID0gJ3JhbmdlJztcbiAgICAgICAgdmFyIG1pbiA9IHRoaXMuc2NoZW1hLm1pbmltdW0gfHwgMDtcbiAgICAgICAgdmFyIG1heCA9IHRoaXMuc2NoZW1hLm1heGltdW0gfHwgTWF0aC5tYXgoMTAwLG1pbisxKTtcbiAgICAgICAgdmFyIHN0ZXAgPSAxO1xuICAgICAgICBpZih0aGlzLnNjaGVtYS5tdWx0aXBsZU9mKSB7XG4gICAgICAgICAgaWYobWluJXRoaXMuc2NoZW1hLm11bHRpcGxlT2YpIG1pbiA9IE1hdGguY2VpbChtaW4vdGhpcy5zY2hlbWEubXVsdGlwbGVPZikqdGhpcy5zY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICBpZihtYXgldGhpcy5zY2hlbWEubXVsdGlwbGVPZikgbWF4ID0gTWF0aC5mbG9vcihtYXgvdGhpcy5zY2hlbWEubXVsdGlwbGVPZikqdGhpcy5zY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICBzdGVwID0gdGhpcy5zY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRoZW1lLmdldFJhbmdlSW5wdXQobWluLG1heCxzdGVwKTtcbiAgICAgIH1cbiAgICAgIC8vIFNvdXJjZSBDb2RlXG4gICAgICBlbHNlIGlmKFtcbiAgICAgICAgICAnYWN0aW9uc2NyaXB0JyxcbiAgICAgICAgICAnYmF0Y2hmaWxlJyxcbiAgICAgICAgICAnYmJjb2RlJyxcbiAgICAgICAgICAnYycsXG4gICAgICAgICAgJ2MrKycsXG4gICAgICAgICAgJ2NwcCcsXG4gICAgICAgICAgJ2NvZmZlZScsXG4gICAgICAgICAgJ2NzaGFycCcsXG4gICAgICAgICAgJ2NzcycsXG4gICAgICAgICAgJ2RhcnQnLFxuICAgICAgICAgICdkamFuZ28nLFxuICAgICAgICAgICdlanMnLFxuICAgICAgICAgICdlcmxhbmcnLFxuICAgICAgICAgICdnb2xhbmcnLFxuICAgICAgICAgICdncm9vdnknLFxuICAgICAgICAgICdoYW5kbGViYXJzJyxcbiAgICAgICAgICAnaGFza2VsbCcsXG4gICAgICAgICAgJ2hheGUnLFxuICAgICAgICAgICdodG1sJyxcbiAgICAgICAgICAnaW5pJyxcbiAgICAgICAgICAnamFkZScsXG4gICAgICAgICAgJ2phdmEnLFxuICAgICAgICAgICdqYXZhc2NyaXB0JyxcbiAgICAgICAgICAnanNvbicsXG4gICAgICAgICAgJ2xlc3MnLFxuICAgICAgICAgICdsaXNwJyxcbiAgICAgICAgICAnbHVhJyxcbiAgICAgICAgICAnbWFrZWZpbGUnLFxuICAgICAgICAgICdtYXJrZG93bicsXG4gICAgICAgICAgJ21hdGxhYicsXG4gICAgICAgICAgJ215c3FsJyxcbiAgICAgICAgICAnb2JqZWN0aXZlYycsXG4gICAgICAgICAgJ3Bhc2NhbCcsXG4gICAgICAgICAgJ3BlcmwnLFxuICAgICAgICAgICdwZ3NxbCcsXG4gICAgICAgICAgJ3BocCcsXG4gICAgICAgICAgJ3B5dGhvbicsXG4gICAgICAgICAgJ3InLFxuICAgICAgICAgICdydWJ5JyxcbiAgICAgICAgICAnc2FzcycsXG4gICAgICAgICAgJ3NjYWxhJyxcbiAgICAgICAgICAnc2NzcycsXG4gICAgICAgICAgJ3NtYXJ0eScsXG4gICAgICAgICAgJ3NxbCcsXG4gICAgICAgICAgJ3N0eWx1cycsXG4gICAgICAgICAgJ3N2ZycsXG4gICAgICAgICAgJ3R3aWcnLFxuICAgICAgICAgICd2YnNjcmlwdCcsXG4gICAgICAgICAgJ3htbCcsXG4gICAgICAgICAgJ3lhbWwnXG4gICAgICAgIF0uaW5kZXhPZih0aGlzLmZvcm1hdCkgPj0gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuaW5wdXRfdHlwZSA9IHRoaXMuZm9ybWF0O1xuICAgICAgICB0aGlzLnNvdXJjZV9jb2RlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRUZXh0YXJlYUlucHV0KCk7XG4gICAgICB9XG4gICAgICAvLyBIVE1MNSBJbnB1dCB0eXBlXG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnB1dF90eXBlID0gdGhpcy5mb3JtYXQ7XG4gICAgICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRoZW1lLmdldEZvcm1JbnB1dEZpZWxkKHRoaXMuaW5wdXRfdHlwZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5vcm1hbCB0ZXh0IGlucHV0XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmlucHV0X3R5cGUgPSAndGV4dCc7XG4gICAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRGaWVsZCh0aGlzLmlucHV0X3R5cGUpO1xuICAgIH1cblxuICAgIC8vIG1pbkxlbmd0aCwgbWF4TGVuZ3RoLCBhbmQgcGF0dGVyblxuICAgIGlmKHR5cGVvZiB0aGlzLnNjaGVtYS5tYXhMZW5ndGggIT09IFwidW5kZWZpbmVkXCIpIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCdtYXhsZW5ndGgnLHRoaXMuc2NoZW1hLm1heExlbmd0aCk7XG4gICAgaWYodHlwZW9mIHRoaXMuc2NoZW1hLnBhdHRlcm4gIT09IFwidW5kZWZpbmVkXCIpIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCdwYXR0ZXJuJyx0aGlzLnNjaGVtYS5wYXR0ZXJuKTtcbiAgICBlbHNlIGlmKHR5cGVvZiB0aGlzLnNjaGVtYS5taW5MZW5ndGggIT09IFwidW5kZWZpbmVkXCIpIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCdwYXR0ZXJuJywnLnsnK3RoaXMuc2NoZW1hLm1pbkxlbmd0aCsnLH0nKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5jb21wYWN0KSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyBjb21wYWN0JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuaW5wdXRfd2lkdGgpIHRoaXMuaW5wdXQuc3R5bGUud2lkdGggPSB0aGlzLm9wdGlvbnMuaW5wdXRfd2lkdGg7XG4gICAgfVxuXG4gICAgaWYodGhpcy5zY2hlbWEucmVhZE9ubHkgfHwgdGhpcy5zY2hlbWEucmVhZG9ubHkgfHwgdGhpcy5zY2hlbWEudGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuYWx3YXlzX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXRcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIERvbid0IGFsbG93IGNoYW5naW5nIGlmIHRoaXMgZmllbGQgaXMgYSB0ZW1wbGF0ZVxuICAgICAgICBpZihzZWxmLnNjaGVtYS50ZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxmLnZhbHVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIC8vIHNhbml0aXplIHZhbHVlXG4gICAgICAgIHZhciBzYW5pdGl6ZWQgPSBzZWxmLnNhbml0aXplKHZhbCk7XG4gICAgICAgIGlmKHZhbCAhPT0gc2FuaXRpemVkKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHNhbml0aXplZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuaXNfZGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHNlbGYucmVmcmVzaFZhbHVlKCk7XG4gICAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5pbnB1dF9oZWlnaHQpIHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmlucHV0X2hlaWdodDtcbiAgICBpZih0aGlzLm9wdGlvbnMuZXhwYW5kX2hlaWdodCkge1xuICAgICAgdGhpcy5hZGp1c3RfaGVpZ2h0ID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgaWYoIWVsKSByZXR1cm47XG4gICAgICAgIHZhciBpLCBjaD1lbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIC8vIElucHV0IHRvbyBzaG9ydFxuICAgICAgICBpZihlbC5vZmZzZXRIZWlnaHQgPCBlbC5zY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICBpPTA7XG4gICAgICAgICAgd2hpbGUoZWwub2Zmc2V0SGVpZ2h0IDwgZWwuc2Nyb2xsSGVpZ2h0KzMpIHtcbiAgICAgICAgICAgIGlmKGk+MTAwKSBicmVhaztcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNoKys7XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBjaCsncHgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpPTA7XG4gICAgICAgICAgd2hpbGUoZWwub2Zmc2V0SGVpZ2h0ID49IGVsLnNjcm9sbEhlaWdodCszKSB7XG4gICAgICAgICAgICBpZihpPjEwMCkgYnJlYWs7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjaC0tO1xuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gY2grJ3B4JztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gKGNoKzEpKydweCc7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5hZGp1c3RfaGVpZ2h0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmFkanVzdF9oZWlnaHQodGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWRqdXN0X2hlaWdodCgpO1xuICAgIH1cblxuICAgIGlmKHRoaXMuZm9ybWF0KSB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS1zY2hlbWFmb3JtYXQnLHRoaXMuZm9ybWF0KTtcblxuICAgIHRoaXMuY29udHJvbCA9IHRoaXMudGhlbWUuZ2V0Rm9ybUNvbnRyb2wodGhpcy5sYWJlbCwgdGhpcy5pbnB1dCwgdGhpcy5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9sKTtcblxuICAgIC8vIEFueSBzcGVjaWFsIGZvcm1hdHRpbmcgdGhhdCBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIGlucHV0IGlzIGFkZGVkIHRvIHRoZSBkb21cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gU2tpcCBpbiBjYXNlIHRoZSBpbnB1dCBpcyBvbmx5IGEgdGVtcG9yYXJ5IGVkaXRvcixcbiAgICAgIC8vIG90aGVyd2lzZSwgaW4gdGhlIGNhc2Ugb2YgYW4gYWNlX2VkaXRvciBjcmVhdGlvbixcbiAgICAgIC8vIGl0IHdpbGwgZ2VuZXJhdGUgYW4gZXJyb3IgdHJ5aW5nIHRvIGFwcGVuZCBpdCB0byB0aGUgbWlzc2luZyBwYXJlbnROb2RlXG4gICAgICBpZihzZWxmLmlucHV0LnBhcmVudE5vZGUpIHNlbGYuYWZ0ZXJJbnB1dFJlYWR5KCk7XG4gICAgICBpZihzZWxmLmFkanVzdF9oZWlnaHQpIHNlbGYuYWRqdXN0X2hlaWdodChzZWxmLmlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIENvbXBpbGUgYW5kIHN0b3JlIHRoZSB0ZW1wbGF0ZVxuICAgIGlmKHRoaXMuc2NoZW1hLnRlbXBsYXRlKSB7XG4gICAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy5qc29uZWRpdG9yLmNvbXBpbGVUZW1wbGF0ZSh0aGlzLnNjaGVtYS50ZW1wbGF0ZSwgdGhpcy50ZW1wbGF0ZV9lbmdpbmUpO1xuICAgICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnJlZnJlc2hWYWx1ZSgpO1xuICAgIH1cbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5hbHdheXNfZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIC8vIFRPRE86IFdZU0lXWUcgYW5kIE1hcmtkb3duIGVkaXRvcnNcbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgLy8gVE9ETzogV1lTSVdZRyBhbmQgTWFya2Rvd24gZWRpdG9yc1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIGFmdGVySW5wdXRSZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zO1xuXG4gICAgLy8gQ29kZSBlZGl0b3JcbiAgICBpZih0aGlzLnNvdXJjZV9jb2RlKSB7XG4gICAgICAvLyBXWVNJV1lHIGh0bWwgYW5kIGJiY29kZSBlZGl0b3JcbiAgICAgIGlmKHRoaXMub3B0aW9ucy53eXNpd3lnICYmXG4gICAgICAgIFsnaHRtbCcsJ2JiY29kZSddLmluZGV4T2YodGhpcy5pbnB1dF90eXBlKSA+PSAwICYmXG4gICAgICAgIHdpbmRvdy5qUXVlcnkgJiYgd2luZG93LmpRdWVyeS5mbiAmJiB3aW5kb3cualF1ZXJ5LmZuLnNjZWRpdG9yXG4gICAgICApIHtcbiAgICAgICAgb3B0aW9ucyA9ICRleHRlbmQoe30se1xuICAgICAgICAgIHBsdWdpbnM6IHNlbGYuaW5wdXRfdHlwZT09PSdodG1sJz8gJ3hodG1sJyA6ICdiYmNvZGUnLFxuICAgICAgICAgIGVtb3RpY29uc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgaGVpZ2h0OiAzMDBcbiAgICAgICAgfSxKU09ORWRpdG9yLnBsdWdpbnMuc2NlZGl0b3Isc2VsZi5vcHRpb25zLnNjZWRpdG9yX29wdGlvbnN8fHt9KTtcblxuICAgICAgICB3aW5kb3cualF1ZXJ5KHNlbGYuaW5wdXQpLnNjZWRpdG9yKG9wdGlvbnMpO1xuXG4gICAgICAgIHNlbGYuc2NlZGl0b3JfaW5zdGFuY2UgPSB3aW5kb3cualF1ZXJ5KHNlbGYuaW5wdXQpLnNjZWRpdG9yKCdpbnN0YW5jZScpO1xuXG4gICAgICAgIHNlbGYuc2NlZGl0b3JfaW5zdGFuY2UuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBHZXQgZWRpdG9yJ3MgdmFsdWVcbiAgICAgICAgICB2YXIgdmFsID0gd2luZG93LmpRdWVyeShcIjxkaXY+XCIrc2VsZi5zY2VkaXRvcl9pbnN0YW5jZS52YWwoKStcIjwvZGl2PlwiKTtcbiAgICAgICAgICAvLyBSZW1vdmUgc2NlZGl0b3Igc3BhbnMvZGl2c1xuICAgICAgICAgIHdpbmRvdy5qUXVlcnkoJyNzY2VkaXRvci1zdGFydC1tYXJrZXIsI3NjZWRpdG9yLWVuZC1tYXJrZXIsLnNjZWRpdG9yLW5sZicsdmFsKS5yZW1vdmUoKTtcbiAgICAgICAgICAvLyBTZXQgdGhlIHZhbHVlIGFuZCB1cGRhdGVcbiAgICAgICAgICBzZWxmLmlucHV0LnZhbHVlID0gdmFsLmh0bWwoKTtcbiAgICAgICAgICBzZWxmLnZhbHVlID0gc2VsZi5pbnB1dC52YWx1ZTtcbiAgICAgICAgICBzZWxmLmlzX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEVwaWNFZGl0b3IgZm9yIG1hcmtkb3duIChpZiBpdCdzIGxvYWRlZClcbiAgICAgIGVsc2UgaWYgKHRoaXMuaW5wdXRfdHlwZSA9PT0gJ21hcmtkb3duJyAmJiB3aW5kb3cuRXBpY0VkaXRvcikge1xuICAgICAgICB0aGlzLmVwaWNlZGl0b3JfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuaW5wdXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5lcGljZWRpdG9yX2NvbnRhaW5lcix0aGlzLmlucHV0KTtcbiAgICAgICAgdGhpcy5pbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIG9wdGlvbnMgPSAkZXh0ZW5kKHt9LEpTT05FZGl0b3IucGx1Z2lucy5lcGljZWRpdG9yLHtcbiAgICAgICAgICBjb250YWluZXI6IHRoaXMuZXBpY2VkaXRvcl9jb250YWluZXIsXG4gICAgICAgICAgY2xpZW50U2lkZVN0b3JhZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXBpY2VkaXRvciA9IG5ldyB3aW5kb3cuRXBpY0VkaXRvcihvcHRpb25zKS5sb2FkKCk7XG5cbiAgICAgICAgdGhpcy5lcGljZWRpdG9yLmltcG9ydEZpbGUobnVsbCx0aGlzLmdldFZhbHVlKCkpO1xuXG4gICAgICAgIHRoaXMuZXBpY2VkaXRvci5vbigndXBkYXRlJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsID0gc2VsZi5lcGljZWRpdG9yLmV4cG9ydEZpbGUoKTtcbiAgICAgICAgICBzZWxmLmlucHV0LnZhbHVlID0gdmFsO1xuICAgICAgICAgIHNlbGYudmFsdWUgPSB2YWw7XG4gICAgICAgICAgc2VsZi5pc19kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBBQ0UgZWRpdG9yIGZvciBldmVyeXRoaW5nIGVsc2VcbiAgICAgIGVsc2UgaWYod2luZG93LmFjZSkge1xuICAgICAgICB2YXIgbW9kZSA9IHRoaXMuaW5wdXRfdHlwZTtcbiAgICAgICAgLy8gYWxpYXNlcyBmb3IgYy9jcHBcbiAgICAgICAgaWYobW9kZSA9PT0gJ2NwcCcgfHwgbW9kZSA9PT0gJ2MrKycgfHwgbW9kZSA9PT0gJ2MnKSB7XG4gICAgICAgICAgbW9kZSA9ICdjX2NwcCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFjZV9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5hY2VfY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB0aGlzLmFjZV9jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB0aGlzLmFjZV9jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICAgICAgdGhpcy5pbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmFjZV9jb250YWluZXIsdGhpcy5pbnB1dCk7XG4gICAgICAgIHRoaXMuaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5hY2VfZWRpdG9yID0gd2luZG93LmFjZS5lZGl0KHRoaXMuYWNlX2NvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5hY2VfZWRpdG9yLnNldFZhbHVlKHRoaXMuZ2V0VmFsdWUoKSk7XG5cbiAgICAgICAgLy8gVGhlIHRoZW1lXG4gICAgICAgIGlmKEpTT05FZGl0b3IucGx1Z2lucy5hY2UudGhlbWUpIHRoaXMuYWNlX2VkaXRvci5zZXRUaGVtZSgnYWNlL3RoZW1lLycrSlNPTkVkaXRvci5wbHVnaW5zLmFjZS50aGVtZSk7XG4gICAgICAgIC8vIFRoZSBtb2RlXG4gICAgICAgIG1vZGUgPSB3aW5kb3cuYWNlLnJlcXVpcmUoXCJhY2UvbW9kZS9cIittb2RlKTtcbiAgICAgICAgaWYobW9kZSkgdGhpcy5hY2VfZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKG5ldyBtb2RlLk1vZGUoKSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzXG4gICAgICAgIHRoaXMuYWNlX2VkaXRvci5vbignY2hhbmdlJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsID0gc2VsZi5hY2VfZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9IHZhbDtcbiAgICAgICAgICBzZWxmLnJlZnJlc2hWYWx1ZSgpO1xuICAgICAgICAgIHNlbGYuaXNfZGlydHkgPSB0cnVlO1xuICAgICAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlbGYudGhlbWUuYWZ0ZXJJbnB1dFJlYWR5KHNlbGYuaW5wdXQpO1xuICB9LFxuICByZWZyZXNoVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLnZhbHVlICE9PSBcInN0cmluZ1wiKSB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5zZXJpYWxpemVkID0gdGhpcy52YWx1ZTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgLy8gSWYgdXNpbmcgU0NFZGl0b3IsIGRlc3Ryb3kgdGhlIGVkaXRvciBpbnN0YW5jZVxuICAgIGlmKHRoaXMuc2NlZGl0b3JfaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuc2NlZGl0b3JfaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMuZXBpY2VkaXRvcikge1xuICAgICAgdGhpcy5lcGljZWRpdG9yLnVubG9hZCgpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMuYWNlX2VkaXRvcikge1xuICAgICAgdGhpcy5hY2VfZWRpdG9yLmRlc3Ryb3koKTtcbiAgICB9XG5cblxuICAgIHRoaXMudGVtcGxhdGUgPSBudWxsO1xuICAgIGlmKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5wYXJlbnROb2RlKSB0aGlzLmlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5pbnB1dCk7XG4gICAgaWYodGhpcy5sYWJlbCAmJiB0aGlzLmxhYmVsLnBhcmVudE5vZGUpIHRoaXMubGFiZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24ucGFyZW50Tm9kZSkgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgb3ZlcnJpZGRlbiBpbiBkZXJpdmF0aXZlIGVkaXRvcnNcbiAgICovXG4gIHNhbml0aXplOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIFJlLWNhbGN1bGF0ZXMgdGhlIHZhbHVlIGlmIG5lZWRlZFxuICAgKi9cbiAgb25XYXRjaGVkRmllbGRDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcywgdmFycywgajtcblxuICAgIC8vIElmIHRoaXMgZWRpdG9yIG5lZWRzIHRvIGJlIHJlbmRlcmVkIGJ5IGEgbWFjcm8gdGVtcGxhdGVcbiAgICBpZih0aGlzLnRlbXBsYXRlKSB7XG4gICAgICB2YXJzID0gdGhpcy5nZXRXYXRjaGVkRmllbGRWYWx1ZXMoKTtcbiAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy50ZW1wbGF0ZSh2YXJzKSxmYWxzZSx0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBzaG93VmFsaWRhdGlvbkVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYodGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuc2hvd19lcnJvcnMgPT09IFwiYWx3YXlzXCIpIHt9XG4gICAgZWxzZSBpZighdGhpcy5pc19kaXJ0eSAmJiB0aGlzLnByZXZpb3VzX2Vycm9yX3NldHRpbmc9PT10aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5zaG93X2Vycm9ycykgcmV0dXJuO1xuXG4gICAgdGhpcy5wcmV2aW91c19lcnJvcl9zZXR0aW5nID0gdGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuc2hvd19lcnJvcnM7XG5cbiAgICB2YXIgbWVzc2FnZXMgPSBbXTtcbiAgICAkZWFjaChlcnJvcnMsZnVuY3Rpb24oaSxlcnJvcikge1xuICAgICAgaWYoZXJyb3IucGF0aCA9PT0gc2VsZi5wYXRoKSB7XG4gICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZihtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudGhlbWUuYWRkSW5wdXRFcnJvcih0aGlzLmlucHV0LCBtZXNzYWdlcy5qb2luKCcuICcpKycuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy50aGVtZS5yZW1vdmVJbnB1dEVycm9yKHRoaXMuaW5wdXQpO1xuICAgIH1cbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5udW1iZXIgPSBKU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnMuc3RyaW5nLmV4dGVuZCh7XG4gIHNhbml0aXplOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUrXCJcIikucmVwbGFjZSgvW14wLTlcXC5cXC1lRV0vZywnJyk7XG4gIH0sXG4gIGdldE51bUNvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAyO1xuICB9LFxuICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUqMTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5pbnRlZ2VyID0gSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzLm51bWJlci5leHRlbmQoe1xuICBzYW5pdGl6ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW14wLTlcXC1dL2csJycpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gMjtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5vYmplY3QgPSBKU09ORWRpdG9yLkFic3RyYWN0RWRpdG9yLmV4dGVuZCh7XG4gIGdldERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkZXh0ZW5kKHt9LHRoaXMuc2NoZW1hW1wiZGVmYXVsdFwiXSB8fCB7fSk7XG4gIH0sXG4gIGdldENoaWxkRWRpdG9yczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWRpdG9ycztcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYodGhpcy5lZGl0b3JzKSB7XG4gICAgICBmb3IodmFyIGkgaW4gdGhpcy5lZGl0b3JzKSB7XG4gICAgICAgIGlmKCF0aGlzLmVkaXRvcnMuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmVkaXRvcnNbaV0ucmVnaXN0ZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYodGhpcy5lZGl0b3JzKSB7XG4gICAgICBmb3IodmFyIGkgaW4gdGhpcy5lZGl0b3JzKSB7XG4gICAgICAgIGlmKCF0aGlzLmVkaXRvcnMuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmVkaXRvcnNbaV0udW5yZWdpc3RlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZ2V0TnVtQ29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKDEyLHRoaXMubWF4d2lkdGgpLDMpO1xuICB9LFxuICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuZWRpdGpzb25fYnV0dG9uKSB0aGlzLmVkaXRqc29uX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGlmKHRoaXMuYWRkcHJvcGVydHlfYnV0dG9uKSB0aGlzLmFkZHByb3BlcnR5X2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICBpZih0aGlzLmVkaXRvcnMpIHtcbiAgICAgIGZvcih2YXIgaSBpbiB0aGlzLmVkaXRvcnMpIHtcbiAgICAgICAgaWYoIXRoaXMuZWRpdG9ycy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgIHRoaXMuZWRpdG9yc1tpXS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuZWRpdGpzb25fYnV0dG9uKSB0aGlzLmVkaXRqc29uX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgaWYodGhpcy5hZGRwcm9wZXJ0eV9idXR0b24pIHRoaXMuYWRkcHJvcGVydHlfYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLmhpZGVFZGl0SlNPTigpO1xuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICBpZih0aGlzLmVkaXRvcnMpIHtcbiAgICAgIGZvcih2YXIgaSBpbiB0aGlzLmVkaXRvcnMpIHtcbiAgICAgICAgaWYoIXRoaXMuZWRpdG9ycy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgIHRoaXMuZWRpdG9yc1tpXS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBsYXlvdXRFZGl0b3JzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIGksIGo7XG5cbiAgICBpZighdGhpcy5yb3dfY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAvLyBTb3J0IGVkaXRvcnMgYnkgcHJvcGVydHlPcmRlclxuICAgIHRoaXMucHJvcGVydHlfb3JkZXIgPSBPYmplY3Qua2V5cyh0aGlzLmVkaXRvcnMpO1xuICAgIHRoaXMucHJvcGVydHlfb3JkZXIgPSB0aGlzLnByb3BlcnR5X29yZGVyLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgICB2YXIgb3JkZXJhID0gc2VsZi5lZGl0b3JzW2FdLnNjaGVtYS5wcm9wZXJ0eU9yZGVyO1xuICAgICAgdmFyIG9yZGVyYiA9IHNlbGYuZWRpdG9yc1tiXS5zY2hlbWEucHJvcGVydHlPcmRlcjtcbiAgICAgIGlmKHR5cGVvZiBvcmRlcmEgIT09IFwibnVtYmVyXCIpIG9yZGVyYSA9IDEwMDA7XG4gICAgICBpZih0eXBlb2Ygb3JkZXJiICE9PSBcIm51bWJlclwiKSBvcmRlcmIgPSAxMDAwO1xuXG4gICAgICByZXR1cm4gb3JkZXJhIC0gb3JkZXJiO1xuICAgIH0pO1xuXG4gICAgdmFyIGNvbnRhaW5lcjtcblxuICAgIGlmKHRoaXMuZm9ybWF0ID09PSAnZ3JpZCcpIHtcbiAgICAgIHZhciByb3dzID0gW107XG4gICAgICAkZWFjaCh0aGlzLnByb3BlcnR5X29yZGVyLCBmdW5jdGlvbihqLGtleSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gc2VsZi5lZGl0b3JzW2tleV07XG4gICAgICAgIGlmKGVkaXRvci5wcm9wZXJ0eV9yZW1vdmVkKSByZXR1cm47XG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB2YXIgd2lkdGggPSBlZGl0b3Iub3B0aW9ucy5oaWRkZW4/IDAgOiAoZWRpdG9yLm9wdGlvbnMuZ3JpZF9jb2x1bW5zIHx8IGVkaXRvci5nZXROdW1Db2x1bW5zKCkpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gZWRpdG9yLm9wdGlvbnMuaGlkZGVuPyAwIDogZWRpdG9yLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIC8vIFNlZSBpZiB0aGUgZWRpdG9yIHdpbGwgZml0IGluIGFueSBvZiB0aGUgZXhpc3Rpbmcgcm93cyBmaXJzdFxuICAgICAgICBmb3IodmFyIGk9MDsgaTxyb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGVkaXRvciB3aWxsIGZpdCBpbiB0aGUgcm93IGhvcml6b250YWxseVxuICAgICAgICAgIGlmKHJvd3NbaV0ud2lkdGggKyB3aWR0aCA8PSAxMikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGVkaXRvciBpcyBjbG9zZSB0byB0aGUgb3RoZXIgZWxlbWVudHMgaW4gaGVpZ2h0XG4gICAgICAgICAgICAvLyBpLmUuIERvbid0IHB1dCBhIHJlYWxseSB0YWxsIGVkaXRvciBpbiBhbiBvdGhlcndpc2Ugc2hvcnQgcm93IG9yIHZpY2UgdmVyc2FcbiAgICAgICAgICAgIGlmKCFoZWlnaHQgfHwgKHJvd3NbaV0ubWluaCowLjUgPCBoZWlnaHQgJiYgcm93c1tpXS5tYXhoKjIgPiBoZWlnaHQpKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBpc24ndCBhIHNwb3QgaW4gYW55IG9mIHRoZSBleGlzdGluZyByb3dzLCBzdGFydCBhIG5ldyByb3dcbiAgICAgICAgaWYoZm91bmQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgbWluaDogOTk5OTk5LFxuICAgICAgICAgICAgbWF4aDogMCxcbiAgICAgICAgICAgIGVkaXRvcnM6IFtdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm91bmQgPSByb3dzLmxlbmd0aC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcm93c1tmb3VuZF0uZWRpdG9ycy5wdXNoKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAvL2VkaXRvcjogZWRpdG9yLFxuICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgcm93c1tmb3VuZF0ud2lkdGggKz0gd2lkdGg7XG4gICAgICAgIHJvd3NbZm91bmRdLm1pbmggPSBNYXRoLm1pbihyb3dzW2ZvdW5kXS5taW5oLGhlaWdodCk7XG4gICAgICAgIHJvd3NbZm91bmRdLm1heGggPSBNYXRoLm1heChyb3dzW2ZvdW5kXS5tYXhoLGhlaWdodCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gTWFrZSBhbG1vc3QgZnVsbCByb3dzIHdpZHRoIDEyXG4gICAgICAvLyBEbyB0aGlzIGJ5IGluY3JlYXNpbmcgYWxsIGVkaXRvcnMnIHNpemVzIHByb3Byb3Rpb25hdGVseVxuICAgICAgLy8gQW55IGxlZnQgb3ZlciBzcGFjZSBnb2VzIHRvIHRoZSBiaWdnZXN0IGVkaXRvclxuICAgICAgLy8gRG9uJ3QgdG91Y2ggcm93cyB3aXRoIGEgd2lkdGggb2YgNiBvciBsZXNzXG4gICAgICBmb3IoaT0wOyBpPHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYocm93c1tpXS53aWR0aCA8IDEyKSB7XG4gICAgICAgICAgdmFyIGJpZ2dlc3QgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgbmV3X3dpZHRoID0gMDtcbiAgICAgICAgICBmb3Ioaj0wOyBqPHJvd3NbaV0uZWRpdG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoYmlnZ2VzdCA9PT0gZmFsc2UpIGJpZ2dlc3QgPSBqO1xuICAgICAgICAgICAgZWxzZSBpZihyb3dzW2ldLmVkaXRvcnNbal0ud2lkdGggPiByb3dzW2ldLmVkaXRvcnNbYmlnZ2VzdF0ud2lkdGgpIGJpZ2dlc3QgPSBqO1xuICAgICAgICAgICAgcm93c1tpXS5lZGl0b3JzW2pdLndpZHRoICo9IDEyL3Jvd3NbaV0ud2lkdGg7XG4gICAgICAgICAgICByb3dzW2ldLmVkaXRvcnNbal0ud2lkdGggPSBNYXRoLmZsb29yKHJvd3NbaV0uZWRpdG9yc1tqXS53aWR0aCk7XG4gICAgICAgICAgICBuZXdfd2lkdGggKz0gcm93c1tpXS5lZGl0b3JzW2pdLndpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihuZXdfd2lkdGggPCAxMikgcm93c1tpXS5lZGl0b3JzW2JpZ2dlc3RdLndpZHRoICs9IDEyLW5ld193aWR0aDtcbiAgICAgICAgICByb3dzW2ldLndpZHRoID0gMTI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbGF5b3V0IGhhc24ndCBjaGFuZ2VkXG4gICAgICBpZih0aGlzLmxheW91dCA9PT0gSlNPTi5zdHJpbmdpZnkocm93cykpIHJldHVybiBmYWxzZTtcbiAgICAgIHRoaXMubGF5b3V0ID0gSlNPTi5zdHJpbmdpZnkocm93cyk7XG5cbiAgICAgIC8vIExheW91dCB0aGUgZm9ybVxuICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBmb3IoaT0wOyBpPHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMudGhlbWUuZ2V0R3JpZFJvdygpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgZm9yKGo9MDsgajxyb3dzW2ldLmVkaXRvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0gcm93c1tpXS5lZGl0b3JzW2pdLmtleTtcbiAgICAgICAgICB2YXIgZWRpdG9yID0gdGhpcy5lZGl0b3JzW2tleV07XG5cbiAgICAgICAgICBpZihlZGl0b3Iub3B0aW9ucy5oaWRkZW4pIGVkaXRvci5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICBlbHNlIHRoaXMudGhlbWUuc2V0R3JpZENvbHVtblNpemUoZWRpdG9yLmNvbnRhaW5lcixyb3dzW2ldLmVkaXRvcnNbal0ud2lkdGgpO1xuICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0b3IuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3JtYWwgbGF5b3V0XG4gICAgZWxzZSB7XG4gICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICRlYWNoKHRoaXMucHJvcGVydHlfb3JkZXIsIGZ1bmN0aW9uKGksa2V5KSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBzZWxmLmVkaXRvcnNba2V5XTtcbiAgICAgICAgaWYoZWRpdG9yLnByb3BlcnR5X3JlbW92ZWQpIHJldHVybjtcbiAgICAgICAgdmFyIHJvdyA9IHNlbGYudGhlbWUuZ2V0R3JpZFJvdygpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgICAgICBpZihlZGl0b3Iub3B0aW9ucy5oaWRkZW4pIGVkaXRvci5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxzZSBzZWxmLnRoZW1lLnNldEdyaWRDb2x1bW5TaXplKGVkaXRvci5jb250YWluZXIsMTIpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZWRpdG9yLmNvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5yb3dfY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMucm93X2NvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICB9LFxuICBnZXRQcm9wZXJ0eVNjaGVtYTogZnVuY3Rpb24oa2V5KSB7XG4gICAgLy8gU2NoZW1hIGRlY2xhcmVkIGRpcmVjdGx5IGluIHByb3BlcnRpZXNcbiAgICB2YXIgc2NoZW1hID0gdGhpcy5zY2hlbWEucHJvcGVydGllc1trZXldIHx8IHt9O1xuICAgIHNjaGVtYSA9ICRleHRlbmQoe30sc2NoZW1hKTtcbiAgICB2YXIgbWF0Y2hlZCA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNba2V5XT8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLy8gQW55IG1hdGNoaW5nIHBhdHRlcm5Qcm9wZXJ0aWVzIHNob3VsZCBiZSBtZXJnZWQgaW5cbiAgICBpZih0aGlzLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcykge1xuICAgICAgZm9yKHZhciBpIGluIHRoaXMuc2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmKCF0aGlzLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoaSk7XG4gICAgICAgIGlmKHJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICAgIHNjaGVtYS5hbGxPZiA9IHNjaGVtYS5hbGxPZiB8fCBbXTtcbiAgICAgICAgICBzY2hlbWEuYWxsT2YucHVzaCh0aGlzLnNjaGVtYS5wYXR0ZXJuUHJvcGVydGllc1tpXSk7XG4gICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYXNuJ3QgbWF0Y2hlZCBvdGhlciBydWxlcywgdXNlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHNjaGVtYVxuICAgIGlmKCFtYXRjaGVkICYmIHRoaXMuc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICYmIHR5cGVvZiB0aGlzLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgc2NoZW1hID0gJGV4dGVuZCh7fSx0aGlzLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSxcbiAgcHJlQnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG5cbiAgICB0aGlzLmVkaXRvcnMgPSB7fTtcbiAgICB0aGlzLmNhY2hlZF9lZGl0b3JzID0ge307XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5mb3JtYXQgPSB0aGlzLm9wdGlvbnMubGF5b3V0IHx8IHRoaXMub3B0aW9ucy5vYmplY3RfbGF5b3V0IHx8IHRoaXMuc2NoZW1hLmZvcm1hdCB8fCB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5vYmplY3RfbGF5b3V0IHx8ICdub3JtYWwnO1xuXG4gICAgdGhpcy5zY2hlbWEucHJvcGVydGllcyA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXMgfHwge307XG5cbiAgICB0aGlzLm1pbndpZHRoID0gMDtcbiAgICB0aGlzLm1heHdpZHRoID0gMDtcblxuICAgIC8vIElmIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgdGFibGUgcm93XG4gICAgaWYodGhpcy5vcHRpb25zLnRhYmxlX3Jvdykge1xuICAgICAgJGVhY2godGhpcy5zY2hlbWEucHJvcGVydGllcywgZnVuY3Rpb24oa2V5LHNjaGVtYSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gc2VsZi5qc29uZWRpdG9yLmdldEVkaXRvckNsYXNzKHNjaGVtYSk7XG4gICAgICAgIHNlbGYuZWRpdG9yc1trZXldID0gc2VsZi5qc29uZWRpdG9yLmNyZWF0ZUVkaXRvcihlZGl0b3Ise1xuICAgICAgICAgIGpzb25lZGl0b3I6IHNlbGYuanNvbmVkaXRvcixcbiAgICAgICAgICBzY2hlbWE6IHNjaGVtYSxcbiAgICAgICAgICBwYXRoOiBzZWxmLnBhdGgrJy4nK2tleSxcbiAgICAgICAgICBwYXJlbnQ6IHNlbGYsXG4gICAgICAgICAgY29tcGFjdDogdHJ1ZSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5lZGl0b3JzW2tleV0ucHJlQnVpbGQoKTtcblxuICAgICAgICB2YXIgd2lkdGggPSBzZWxmLmVkaXRvcnNba2V5XS5vcHRpb25zLmhpZGRlbj8gMCA6IChzZWxmLmVkaXRvcnNba2V5XS5vcHRpb25zLmdyaWRfY29sdW1ucyB8fCBzZWxmLmVkaXRvcnNba2V5XS5nZXROdW1Db2x1bW5zKCkpO1xuXG4gICAgICAgIHNlbGYubWlud2lkdGggKz0gd2lkdGg7XG4gICAgICAgIHNlbGYubWF4d2lkdGggKz0gd2lkdGg7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubm9fbGlua19ob2xkZXIgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgb2JqZWN0IHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIHRhYmxlXG4gICAgZWxzZSBpZih0aGlzLm9wdGlvbnMudGFibGUpIHtcbiAgICAgIC8vIFRPRE86IHRhYmxlIGRpc3BsYXkgZm9ybWF0XG4gICAgICB0aHJvdyBcIk5vdCBzdXBwb3J0ZWQgeWV0XCI7XG4gICAgfVxuICAgIC8vIElmIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgZGl2XG4gICAgZWxzZSB7XG4gICAgICBpZighdGhpcy5zY2hlbWEuZGVmYXVsdFByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYodGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZGlzcGxheV9yZXF1aXJlZF9vbmx5IHx8IHRoaXMub3B0aW9ucy5kaXNwbGF5X3JlcXVpcmVkX29ubHkpIHtcbiAgICAgICAgICB0aGlzLnNjaGVtYS5kZWZhdWx0UHJvcGVydGllcyA9IFtdO1xuICAgICAgICAgICRlYWNoKHRoaXMuc2NoZW1hLnByb3BlcnRpZXMsIGZ1bmN0aW9uKGsscykge1xuICAgICAgICAgICAgaWYoc2VsZi5pc1JlcXVpcmVkKHtrZXk6IGssIHNjaGVtYTogc30pKSB7XG4gICAgICAgICAgICAgIHNlbGYuc2NoZW1hLmRlZmF1bHRQcm9wZXJ0aWVzLnB1c2goayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2VsZi5zY2hlbWEuZGVmYXVsdFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzZWxmLnNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJbmNyZWFzZSB0aGUgZ3JpZCB3aWR0aCB0byBhY2NvdW50IGZvciBwYWRkaW5nXG4gICAgICBzZWxmLm1heHdpZHRoICs9IDE7XG5cbiAgICAgICRlYWNoKHRoaXMuc2NoZW1hLmRlZmF1bHRQcm9wZXJ0aWVzLCBmdW5jdGlvbihpLGtleSkge1xuICAgICAgICBzZWxmLmFkZE9iamVjdFByb3BlcnR5KGtleSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYoc2VsZi5lZGl0b3JzW2tleV0pIHtcbiAgICAgICAgICBzZWxmLm1pbndpZHRoID0gTWF0aC5tYXgoc2VsZi5taW53aWR0aCwoc2VsZi5lZGl0b3JzW2tleV0ub3B0aW9ucy5ncmlkX2NvbHVtbnMgfHwgc2VsZi5lZGl0b3JzW2tleV0uZ2V0TnVtQ29sdW1ucygpKSk7XG4gICAgICAgICAgc2VsZi5tYXh3aWR0aCArPSAoc2VsZi5lZGl0b3JzW2tleV0ub3B0aW9ucy5ncmlkX2NvbHVtbnMgfHwgc2VsZi5lZGl0b3JzW2tleV0uZ2V0TnVtQ29sdW1ucygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU29ydCBlZGl0b3JzIGJ5IHByb3BlcnR5T3JkZXJcbiAgICB0aGlzLnByb3BlcnR5X29yZGVyID0gT2JqZWN0LmtleXModGhpcy5lZGl0b3JzKTtcbiAgICB0aGlzLnByb3BlcnR5X29yZGVyID0gdGhpcy5wcm9wZXJ0eV9vcmRlci5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgdmFyIG9yZGVyYSA9IHNlbGYuZWRpdG9yc1thXS5zY2hlbWEucHJvcGVydHlPcmRlcjtcbiAgICAgIHZhciBvcmRlcmIgPSBzZWxmLmVkaXRvcnNbYl0uc2NoZW1hLnByb3BlcnR5T3JkZXI7XG4gICAgICBpZih0eXBlb2Ygb3JkZXJhICE9PSBcIm51bWJlclwiKSBvcmRlcmEgPSAxMDAwO1xuICAgICAgaWYodHlwZW9mIG9yZGVyYiAhPT0gXCJudW1iZXJcIikgb3JkZXJiID0gMTAwMDtcblxuICAgICAgcmV0dXJuIG9yZGVyYSAtIG9yZGVyYjtcbiAgICB9KTtcbiAgfSxcbiAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIElmIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgdGFibGUgcm93XG4gICAgaWYodGhpcy5vcHRpb25zLnRhYmxlX3Jvdykge1xuICAgICAgdGhpcy5lZGl0b3JfaG9sZGVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAkZWFjaCh0aGlzLmVkaXRvcnMsIGZ1bmN0aW9uKGtleSxlZGl0b3IpIHtcbiAgICAgICAgdmFyIGhvbGRlciA9IHNlbGYudGhlbWUuZ2V0VGFibGVDZWxsKCk7XG4gICAgICAgIHNlbGYuZWRpdG9yX2hvbGRlci5hcHBlbmRDaGlsZChob2xkZXIpO1xuXG4gICAgICAgIGVkaXRvci5zZXRDb250YWluZXIoaG9sZGVyKTtcbiAgICAgICAgZWRpdG9yLmJ1aWxkKCk7XG4gICAgICAgIGVkaXRvci5wb3N0QnVpbGQoKTtcblxuICAgICAgICBpZihzZWxmLmVkaXRvcnNba2V5XS5vcHRpb25zLmhpZGRlbikge1xuICAgICAgICAgIGhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlbGYuZWRpdG9yc1trZXldLm9wdGlvbnMuaW5wdXRfd2lkdGgpIHtcbiAgICAgICAgICBob2xkZXIuc3R5bGUud2lkdGggPSBzZWxmLmVkaXRvcnNba2V5XS5vcHRpb25zLmlucHV0X3dpZHRoO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIG9iamVjdCBzaG91bGQgYmUgcmVuZGVyZWQgYXMgYSB0YWJsZVxuICAgIGVsc2UgaWYodGhpcy5vcHRpb25zLnRhYmxlKSB7XG4gICAgICAvLyBUT0RPOiB0YWJsZSBkaXNwbGF5IGZvcm1hdFxuICAgICAgdGhyb3cgXCJOb3Qgc3VwcG9ydGVkIHlldFwiO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgb2JqZWN0IHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIGRpdlxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICB0aGlzLmhlYWRlci50ZXh0Q29udGVudCA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRoZW1lLmdldEhlYWRlcih0aGlzLmhlYWRlcik7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuICAgICAgLy8gRWRpdCBKU09OIG1vZGFsXG4gICAgICB0aGlzLmVkaXRqc29uX2hvbGRlciA9IHRoaXMudGhlbWUuZ2V0TW9kYWwoKTtcbiAgICAgIHRoaXMuZWRpdGpzb25fdGV4dGFyZWEgPSB0aGlzLnRoZW1lLmdldFRleHRhcmVhSW5wdXQoKTtcbiAgICAgIHRoaXMuZWRpdGpzb25fdGV4dGFyZWEuc3R5bGUuaGVpZ2h0ID0gJzE3MHB4JztcbiAgICAgIHRoaXMuZWRpdGpzb25fdGV4dGFyZWEuc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICAgICAgdGhpcy5lZGl0anNvbl90ZXh0YXJlYS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZWRpdGpzb25fc2F2ZSA9IHRoaXMuZ2V0QnV0dG9uKCdTYXZlJywnc2F2ZScsJ1NhdmUnKTtcbiAgICAgIHRoaXMuZWRpdGpzb25fc2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHNlbGYuc2F2ZUpTT04oKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lZGl0anNvbl9jYW5jZWwgPSB0aGlzLmdldEJ1dHRvbignQ2FuY2VsJywnY2FuY2VsJywnQ2FuY2VsJyk7XG4gICAgICB0aGlzLmVkaXRqc29uX2NhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHNlbGYuaGlkZUVkaXRKU09OKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZWRpdGpzb25faG9sZGVyLmFwcGVuZENoaWxkKHRoaXMuZWRpdGpzb25fdGV4dGFyZWEpO1xuICAgICAgdGhpcy5lZGl0anNvbl9ob2xkZXIuYXBwZW5kQ2hpbGQodGhpcy5lZGl0anNvbl9zYXZlKTtcbiAgICAgIHRoaXMuZWRpdGpzb25faG9sZGVyLmFwcGVuZENoaWxkKHRoaXMuZWRpdGpzb25fY2FuY2VsKTtcblxuICAgICAgLy8gTWFuYWdlIFByb3BlcnRpZXMgbW9kYWxcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyID0gdGhpcy50aGVtZS5nZXRNb2RhbCgpO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2xpc3Quc3R5bGUud2lkdGggPSAnMjk1cHgnO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0LnN0eWxlLm1heEhlaWdodCA9ICcxNjBweCc7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2xpc3Quc3R5bGUucGFkZGluZyA9ICc1cHggMCc7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2xpc3Quc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0LnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0LnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzVweCc7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2xpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICdwcm9wZXJ0eS1zZWxlY3RvcicpO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9hZGQgPSB0aGlzLmdldEJ1dHRvbignYWRkJywnYWRkJywnYWRkJyk7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2lucHV0ID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRGaWVsZCgndGV4dCcpO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywnUHJvcGVydHkgbmFtZS4uLicpO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9pbnB1dC5zdHlsZS53aWR0aCA9ICcyMjBweCc7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2lucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcwJztcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9hZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZihzZWxmLmFkZHByb3BlcnR5X2lucHV0LnZhbHVlKSB7XG4gICAgICAgICAgaWYoc2VsZi5lZGl0b3JzW3NlbGYuYWRkcHJvcGVydHlfaW5wdXQudmFsdWVdKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ3RoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSB3aXRoIHRoYXQgbmFtZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuYWRkT2JqZWN0UHJvcGVydHkoc2VsZi5hZGRwcm9wZXJ0eV9pbnB1dC52YWx1ZSk7XG4gICAgICAgICAgaWYoc2VsZi5lZGl0b3JzW3NlbGYuYWRkcHJvcGVydHlfaW5wdXQudmFsdWVdKSB7XG4gICAgICAgICAgICBzZWxmLmVkaXRvcnNbc2VsZi5hZGRwcm9wZXJ0eV9pbnB1dC52YWx1ZV0uZGlzYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyLmFwcGVuZENoaWxkKHRoaXMuYWRkcHJvcGVydHlfbGlzdCk7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2hvbGRlci5hcHBlbmRDaGlsZCh0aGlzLmFkZHByb3BlcnR5X2lucHV0KTtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyLmFwcGVuZENoaWxkKHRoaXMuYWRkcHJvcGVydHlfYWRkKTtcbiAgICAgIHZhciBzcGFjZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNwYWNlci5zdHlsZS5jbGVhciA9ICdib3RoJztcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyLmFwcGVuZENoaWxkKHNwYWNlcik7XG5cblxuICAgICAgLy8gRGVzY3JpcHRpb25cbiAgICAgIGlmKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnRoZW1lLmdldERlc2NyaXB0aW9uKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbGlkYXRpb24gZXJyb3IgcGxhY2Vob2xkZXIgYXJlYVxuICAgICAgdGhpcy5lcnJvcl9ob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZXJyb3JfaG9sZGVyKTtcblxuICAgICAgLy8gQ29udGFpbmVyIGZvciBjaGlsZCBlZGl0b3IgYXJlYVxuICAgICAgdGhpcy5lZGl0b3JfaG9sZGVyID0gdGhpcy50aGVtZS5nZXRJbmRlbnRlZFBhbmVsKCk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVkaXRvcl9ob2xkZXIpO1xuXG4gICAgICAvLyBDb250YWluZXIgZm9yIHJvd3Mgb2YgY2hpbGQgZWRpdG9yc1xuICAgICAgdGhpcy5yb3dfY29udGFpbmVyID0gdGhpcy50aGVtZS5nZXRHcmlkQ29udGFpbmVyKCk7XG4gICAgICB0aGlzLmVkaXRvcl9ob2xkZXIuYXBwZW5kQ2hpbGQodGhpcy5yb3dfY29udGFpbmVyKTtcblxuICAgICAgJGVhY2godGhpcy5lZGl0b3JzLCBmdW5jdGlvbihrZXksZWRpdG9yKSB7XG4gICAgICAgIHZhciBob2xkZXIgPSBzZWxmLnRoZW1lLmdldEdyaWRDb2x1bW4oKTtcbiAgICAgICAgc2VsZi5yb3dfY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRlcik7XG5cbiAgICAgICAgZWRpdG9yLnNldENvbnRhaW5lcihob2xkZXIpO1xuICAgICAgICBlZGl0b3IuYnVpbGQoKTtcbiAgICAgICAgZWRpdG9yLnBvc3RCdWlsZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENvbnRyb2wgYnV0dG9uc1xuICAgICAgdGhpcy50aXRsZV9jb250cm9scyA9IHRoaXMudGhlbWUuZ2V0SGVhZGVyQnV0dG9uSG9sZGVyKCk7XG4gICAgICB0aGlzLmVkaXRqc29uX2NvbnRyb2xzID0gdGhpcy50aGVtZS5nZXRIZWFkZXJCdXR0b25Ib2xkZXIoKTtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfY29udHJvbHMgPSB0aGlzLnRoZW1lLmdldEhlYWRlckJ1dHRvbkhvbGRlcigpO1xuICAgICAgdGhpcy50aXRsZS5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlX2NvbnRyb2xzKTtcbiAgICAgIHRoaXMudGl0bGUuYXBwZW5kQ2hpbGQodGhpcy5lZGl0anNvbl9jb250cm9scyk7XG4gICAgICB0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMuYWRkcHJvcGVydHlfY29udHJvbHMpO1xuXG4gICAgICAvLyBTaG93L0hpZGUgYnV0dG9uXG4gICAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy50b2dnbGVfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ2NvbGxhcHNlJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2NvbGxhcHNlJykpO1xuICAgICAgdGhpcy50aXRsZV9jb250cm9scy5hcHBlbmRDaGlsZCh0aGlzLnRvZ2dsZV9idXR0b24pO1xuICAgICAgdGhpcy50b2dnbGVfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoc2VsZi5jb2xsYXBzZWQpIHtcbiAgICAgICAgICBzZWxmLmVkaXRvcl9ob2xkZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIHNlbGYuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5zZXRCdXR0b25UZXh0KHNlbGYudG9nZ2xlX2J1dHRvbiwnJywnY29sbGFwc2UnLHNlbGYudHJhbnNsYXRlKCdidXR0b25fY29sbGFwc2UnKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2VsZi5lZGl0b3JfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgc2VsZi5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICAgIHNlbGYuc2V0QnV0dG9uVGV4dChzZWxmLnRvZ2dsZV9idXR0b24sJycsJ2V4cGFuZCcsc2VsZi50cmFuc2xhdGUoJ2J1dHRvbl9leHBhbmQnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBpdCBzaG91bGQgc3RhcnQgY29sbGFwc2VkXG4gICAgICBpZih0aGlzLm9wdGlvbnMuY29sbGFwc2VkKSB7XG4gICAgICAgICR0cmlnZ2VyKHRoaXMudG9nZ2xlX2J1dHRvbiwnY2xpY2snKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29sbGFwc2UgYnV0dG9uIGRpc2FibGVkXG4gICAgICBpZih0aGlzLnNjaGVtYS5vcHRpb25zICYmIHR5cGVvZiB0aGlzLnNjaGVtYS5vcHRpb25zLmRpc2FibGVfY29sbGFwc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYodGhpcy5zY2hlbWEub3B0aW9ucy5kaXNhYmxlX2NvbGxhcHNlKSB0aGlzLnRvZ2dsZV9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZGlzYWJsZV9jb2xsYXBzZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZV9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cblxuICAgICAgLy8gRWRpdCBKU09OIEJ1dHRvblxuICAgICAgdGhpcy5lZGl0anNvbl9idXR0b24gPSB0aGlzLmdldEJ1dHRvbignSlNPTicsJ2VkaXQnLCdFZGl0IEpTT04nKTtcbiAgICAgIHRoaXMuZWRpdGpzb25fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZi50b2dnbGVFZGl0SlNPTigpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmVkaXRqc29uX2NvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMuZWRpdGpzb25fYnV0dG9uKTtcbiAgICAgIHRoaXMuZWRpdGpzb25fY29udHJvbHMuYXBwZW5kQ2hpbGQodGhpcy5lZGl0anNvbl9ob2xkZXIpO1xuXG4gICAgICAvLyBFZGl0IEpTT04gQnV0dHRvbiBkaXNhYmxlZFxuICAgICAgaWYodGhpcy5zY2hlbWEub3B0aW9ucyAmJiB0eXBlb2YgdGhpcy5zY2hlbWEub3B0aW9ucy5kaXNhYmxlX2VkaXRfanNvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZih0aGlzLnNjaGVtYS5vcHRpb25zLmRpc2FibGVfZWRpdF9qc29uKSB0aGlzLmVkaXRqc29uX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5kaXNhYmxlX2VkaXRfanNvbikge1xuICAgICAgICB0aGlzLmVkaXRqc29uX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICAvLyBPYmplY3QgUHJvcGVydGllcyBCdXR0b25cbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJ1Byb3BlcnRpZXMnLCdlZGl0JywnT2JqZWN0IFByb3BlcnRpZXMnKTtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2VsZi50b2dnbGVBZGRQcm9wZXJ0eSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2NvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMuYWRkcHJvcGVydHlfYnV0dG9uKTtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfY29udHJvbHMuYXBwZW5kQ2hpbGQodGhpcy5hZGRwcm9wZXJ0eV9ob2xkZXIpO1xuICAgICAgdGhpcy5yZWZyZXNoQWRkUHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIC8vIEZpeCB0YWJsZSBjZWxsIG9yZGVyaW5nXG4gICAgaWYodGhpcy5vcHRpb25zLnRhYmxlX3Jvdykge1xuICAgICAgdGhpcy5lZGl0b3JfaG9sZGVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAkZWFjaCh0aGlzLnByb3BlcnR5X29yZGVyLGZ1bmN0aW9uKGksa2V5KSB7XG4gICAgICAgIHNlbGYuZWRpdG9yX2hvbGRlci5hcHBlbmRDaGlsZChzZWxmLmVkaXRvcnNba2V5XS5jb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIExheW91dCBvYmplY3QgZWRpdG9ycyBpbiBncmlkIGlmIG5lZWRlZFxuICAgIGVsc2Uge1xuICAgICAgLy8gSW5pdGlhbCBsYXlvdXRcbiAgICAgIHRoaXMubGF5b3V0RWRpdG9ycygpO1xuICAgICAgLy8gRG8gaXQgYWdhaW4gbm93IHRoYXQgd2Uga25vdyB0aGUgYXBwcm94aW1hdGUgaGVpZ2h0cyBvZiBlbGVtZW50c1xuICAgICAgdGhpcy5sYXlvdXRFZGl0b3JzKCk7XG4gICAgfVxuICB9LFxuICBzaG93RWRpdEpTT046IGZ1bmN0aW9uKCkge1xuICAgIGlmKCF0aGlzLmVkaXRqc29uX2hvbGRlcikgcmV0dXJuO1xuICAgIHRoaXMuaGlkZUFkZFByb3BlcnR5KCk7XG5cbiAgICAvLyBQb3NpdGlvbiB0aGUgZm9ybSBkaXJlY3RseSBiZW5lYXRoIHRoZSBidXR0b25cbiAgICAvLyBUT0RPOiBlZGdlIGRldGVjdGlvblxuICAgIHRoaXMuZWRpdGpzb25faG9sZGVyLnN0eWxlLmxlZnQgPSB0aGlzLmVkaXRqc29uX2J1dHRvbi5vZmZzZXRMZWZ0K1wicHhcIjtcbiAgICB0aGlzLmVkaXRqc29uX2hvbGRlci5zdHlsZS50b3AgPSB0aGlzLmVkaXRqc29uX2J1dHRvbi5vZmZzZXRUb3AgKyB0aGlzLmVkaXRqc29uX2J1dHRvbi5vZmZzZXRIZWlnaHQrXCJweFwiO1xuXG4gICAgLy8gU3RhcnQgdGhlIHRleHRhcmVhIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVcbiAgICB0aGlzLmVkaXRqc29uX3RleHRhcmVhLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRWYWx1ZSgpLG51bGwsMik7XG5cbiAgICAvLyBEaXNhYmxlIHRoZSByZXN0IG9mIHRoZSBmb3JtIHdoaWxlIGVkaXRpbmcgSlNPTlxuICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgdGhpcy5lZGl0anNvbl9ob2xkZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIHRoaXMuZWRpdGpzb25fYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5lZGl0aW5nX2pzb24gPSB0cnVlO1xuICB9LFxuICBoaWRlRWRpdEpTT046IGZ1bmN0aW9uKCkge1xuICAgIGlmKCF0aGlzLmVkaXRqc29uX2hvbGRlcikgcmV0dXJuO1xuICAgIGlmKCF0aGlzLmVkaXRpbmdfanNvbikgcmV0dXJuO1xuXG4gICAgdGhpcy5lZGl0anNvbl9ob2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLmVuYWJsZSgpO1xuICAgIHRoaXMuZWRpdGluZ19qc29uID0gZmFsc2U7XG4gIH0sXG4gIHNhdmVKU09OOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5lZGl0anNvbl9ob2xkZXIpIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UodGhpcy5lZGl0anNvbl90ZXh0YXJlYS52YWx1ZSk7XG4gICAgICB0aGlzLnNldFZhbHVlKGpzb24pO1xuICAgICAgdGhpcy5oaWRlRWRpdEpTT04oKTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgd2luZG93LmFsZXJ0KCdpbnZhbGlkIEpTT04nKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9LFxuICB0b2dnbGVFZGl0SlNPTjogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5lZGl0aW5nX2pzb24pIHRoaXMuaGlkZUVkaXRKU09OKCk7XG4gICAgZWxzZSB0aGlzLnNob3dFZGl0SlNPTigpO1xuICB9LFxuICBpbnNlcnRQcm9wZXJ0eUNvbnRyb2xVc2luZ1Byb3BlcnR5T3JkZXI6IGZ1bmN0aW9uIChwcm9wZXJ0eSwgY29udHJvbCwgY29udGFpbmVyKSB7XG4gICAgdmFyIHByb3BlcnR5T3JkZXI7XG4gICAgaWYgKHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldKVxuICAgICAgcHJvcGVydHlPcmRlciA9IHRoaXMuc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldLnByb3BlcnR5T3JkZXI7XG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0eU9yZGVyICE9PSBcIm51bWJlclwiKSBwcm9wZXJ0eU9yZGVyID0gMTAwMDtcbiAgICBjb250cm9sLnByb3BlcnR5T3JkZXIgPSBwcm9wZXJ0eU9yZGVyO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gY29udGFpbmVyLmNoaWxkTm9kZXNbaV07XG4gICAgICBpZiAoY29udHJvbC5wcm9wZXJ0eU9yZGVyIDwgY2hpbGQucHJvcGVydHlPcmRlcikge1xuICAgICAgICB0aGlzLmFkZHByb3BlcnR5X2xpc3QuaW5zZXJ0QmVmb3JlKGNvbnRyb2wsIGNoaWxkKTtcbiAgICAgICAgY29udHJvbCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29udHJvbCkge1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0LmFwcGVuZENoaWxkKGNvbnRyb2wpO1xuICAgIH1cbiAgfSxcbiAgYWRkUHJvcGVydHlDaGVja2JveDogZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjaGVja2JveCwgbGFiZWwsIGxhYmVsVGV4dCwgY29udHJvbDtcblxuICAgIGNoZWNrYm94ID0gc2VsZi50aGVtZS5nZXRDaGVja2JveCgpO1xuICAgIGNoZWNrYm94LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuXG4gICAgaWYgKHRoaXMuc2NoZW1hLnByb3BlcnRpZXNba2V5XSAmJiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzW2tleV0udGl0bGUpXG4gICAgICBsYWJlbFRleHQgPSB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzW2tleV0udGl0bGU7XG4gICAgZWxzZVxuICAgICAgbGFiZWxUZXh0ID0ga2V5O1xuXG4gICAgbGFiZWwgPSBzZWxmLnRoZW1lLmdldENoZWNrYm94TGFiZWwobGFiZWxUZXh0KTtcblxuICAgIGNvbnRyb2wgPSBzZWxmLnRoZW1lLmdldEZvcm1Db250cm9sKGxhYmVsLGNoZWNrYm94KTtcbiAgICBjb250cm9sLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBjb250cm9sLnN0eWxlLm1hcmdpbkJvdHRvbSA9IGNvbnRyb2wuc3R5bGUucGFkZGluZ1RvcCA9IGNvbnRyb2wuc3R5bGUubWFyZ2luVG9wID0gMDtcbiAgICBjb250cm9sLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAvL2NvbnRyb2wuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cbiAgICB0aGlzLmluc2VydFByb3BlcnR5Q29udHJvbFVzaW5nUHJvcGVydHlPcmRlcihrZXksIGNvbnRyb2wsIHRoaXMuYWRkcHJvcGVydHlfbGlzdCk7XG5cbiAgICBjaGVja2JveC5jaGVja2VkID0ga2V5IGluIHRoaXMuZWRpdG9ycztcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKCkge1xuICAgICAgaWYoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICBzZWxmLmFkZE9iamVjdFByb3BlcnR5KGtleSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5yZW1vdmVPYmplY3RQcm9wZXJ0eShrZXkpO1xuICAgICAgfVxuICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICB9KTtcbiAgICBzZWxmLmFkZHByb3BlcnR5X2NoZWNrYm94ZXNba2V5XSA9IGNoZWNrYm94O1xuXG4gICAgcmV0dXJuIGNoZWNrYm94O1xuICB9LFxuICBzaG93QWRkUHJvcGVydHk6IGZ1bmN0aW9uKCkge1xuICAgIGlmKCF0aGlzLmFkZHByb3BlcnR5X2hvbGRlcikgcmV0dXJuO1xuICAgIHRoaXMuaGlkZUVkaXRKU09OKCk7XG5cbiAgICAvLyBQb3NpdGlvbiB0aGUgZm9ybSBkaXJlY3RseSBiZW5lYXRoIHRoZSBidXR0b25cbiAgICAvLyBUT0RPOiBlZGdlIGRldGVjdGlvblxuICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyLnN0eWxlLmxlZnQgPSB0aGlzLmFkZHByb3BlcnR5X2J1dHRvbi5vZmZzZXRMZWZ0K1wicHhcIjtcbiAgICB0aGlzLmFkZHByb3BlcnR5X2hvbGRlci5zdHlsZS50b3AgPSB0aGlzLmFkZHByb3BlcnR5X2J1dHRvbi5vZmZzZXRUb3AgKyB0aGlzLmFkZHByb3BlcnR5X2J1dHRvbi5vZmZzZXRIZWlnaHQrXCJweFwiO1xuXG4gICAgLy8gRGlzYWJsZSB0aGUgcmVzdCBvZiB0aGUgZm9ybSB3aGlsZSBlZGl0aW5nIEpTT05cbiAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgIHRoaXMuYWRkaW5nX3Byb3BlcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLmFkZHByb3BlcnR5X2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkcHJvcGVydHlfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB0aGlzLnJlZnJlc2hBZGRQcm9wZXJ0aWVzKCk7XG4gIH0sXG4gIGhpZGVBZGRQcm9wZXJ0eTogZnVuY3Rpb24oKSB7XG4gICAgaWYoIXRoaXMuYWRkcHJvcGVydHlfaG9sZGVyKSByZXR1cm47XG4gICAgaWYoIXRoaXMuYWRkaW5nX3Byb3BlcnR5KSByZXR1cm47XG5cbiAgICB0aGlzLmFkZHByb3BlcnR5X2hvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuZW5hYmxlKCk7XG5cbiAgICB0aGlzLmFkZGluZ19wcm9wZXJ0eSA9IGZhbHNlO1xuICB9LFxuICB0b2dnbGVBZGRQcm9wZXJ0eTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5hZGRpbmdfcHJvcGVydHkpIHRoaXMuaGlkZUFkZFByb3BlcnR5KCk7XG4gICAgZWxzZSB0aGlzLnNob3dBZGRQcm9wZXJ0eSgpO1xuICB9LFxuICByZW1vdmVPYmplY3RQcm9wZXJ0eTogZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICBpZih0aGlzLmVkaXRvcnNbcHJvcGVydHldKSB7XG4gICAgICB0aGlzLmVkaXRvcnNbcHJvcGVydHldLnVucmVnaXN0ZXIoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmVkaXRvcnNbcHJvcGVydHldO1xuXG4gICAgICB0aGlzLnJlZnJlc2hWYWx1ZSgpO1xuICAgICAgdGhpcy5sYXlvdXRFZGl0b3JzKCk7XG4gICAgfVxuICB9LFxuICBhZGRPYmplY3RQcm9wZXJ0eTogZnVuY3Rpb24obmFtZSwgcHJlYnVpbGRfb25seSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFByb3BlcnR5IGlzIGFscmVhZHkgYWRkZWRcbiAgICBpZih0aGlzLmVkaXRvcnNbbmFtZV0pIHJldHVybjtcblxuICAgIC8vIFByb3BlcnR5IHdhcyBhZGRlZCBiZWZvcmUgYW5kIGlzIGNhY2hlZFxuICAgIGlmKHRoaXMuY2FjaGVkX2VkaXRvcnNbbmFtZV0pIHtcbiAgICAgIHRoaXMuZWRpdG9yc1tuYW1lXSA9IHRoaXMuY2FjaGVkX2VkaXRvcnNbbmFtZV07XG4gICAgICBpZihwcmVidWlsZF9vbmx5KSByZXR1cm47XG4gICAgICB0aGlzLmVkaXRvcnNbbmFtZV0ucmVnaXN0ZXIoKTtcbiAgICB9XG4gICAgLy8gTmV3IHByb3BlcnR5XG4gICAgZWxzZSB7XG4gICAgICBpZighdGhpcy5jYW5IYXZlQWRkaXRpb25hbFByb3BlcnRpZXMoKSAmJiAoIXRoaXMuc2NoZW1hLnByb3BlcnRpZXMgfHwgIXRoaXMuc2NoZW1hLnByb3BlcnRpZXNbbmFtZV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjaGVtYSA9IHNlbGYuZ2V0UHJvcGVydHlTY2hlbWEobmFtZSk7XG5cblxuICAgICAgLy8gQWRkIHRoZSBwcm9wZXJ0eVxuICAgICAgdmFyIGVkaXRvciA9IHNlbGYuanNvbmVkaXRvci5nZXRFZGl0b3JDbGFzcyhzY2hlbWEpO1xuXG4gICAgICBzZWxmLmVkaXRvcnNbbmFtZV0gPSBzZWxmLmpzb25lZGl0b3IuY3JlYXRlRWRpdG9yKGVkaXRvcix7XG4gICAgICAgIGpzb25lZGl0b3I6IHNlbGYuanNvbmVkaXRvcixcbiAgICAgICAgc2NoZW1hOiBzY2hlbWEsXG4gICAgICAgIHBhdGg6IHNlbGYucGF0aCsnLicrbmFtZSxcbiAgICAgICAgcGFyZW50OiBzZWxmXG4gICAgICB9KTtcbiAgICAgIHNlbGYuZWRpdG9yc1tuYW1lXS5wcmVCdWlsZCgpO1xuXG4gICAgICBpZighcHJlYnVpbGRfb25seSkge1xuICAgICAgICB2YXIgaG9sZGVyID0gc2VsZi50aGVtZS5nZXRDaGlsZEVkaXRvckhvbGRlcigpO1xuICAgICAgICBzZWxmLmVkaXRvcl9ob2xkZXIuYXBwZW5kQ2hpbGQoaG9sZGVyKTtcbiAgICAgICAgc2VsZi5lZGl0b3JzW25hbWVdLnNldENvbnRhaW5lcihob2xkZXIpO1xuICAgICAgICBzZWxmLmVkaXRvcnNbbmFtZV0uYnVpbGQoKTtcbiAgICAgICAgc2VsZi5lZGl0b3JzW25hbWVdLnBvc3RCdWlsZCgpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLmNhY2hlZF9lZGl0b3JzW25hbWVdID0gc2VsZi5lZGl0b3JzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIElmIHdlJ3JlIG9ubHkgcHJlYnVpbGRpbmcgdGhlIGVkaXRvcnMsIGRvbid0IHJlZnJlc2ggdmFsdWVzXG4gICAgaWYoIXByZWJ1aWxkX29ubHkpIHtcbiAgICAgIHNlbGYucmVmcmVzaFZhbHVlKCk7XG4gICAgICBzZWxmLmxheW91dEVkaXRvcnMoKTtcbiAgICB9XG4gIH0sXG4gIG9uQ2hpbGRFZGl0b3JDaGFuZ2U6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIHRoaXMucmVmcmVzaFZhbHVlKCk7XG4gICAgdGhpcy5fc3VwZXIoZWRpdG9yKTtcbiAgfSxcbiAgY2FuSGF2ZUFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMuanNvbmVkaXRvci5vcHRpb25zLm5vX2FkZGl0aW9uYWxfcHJvcGVydGllcztcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgJGVhY2godGhpcy5jYWNoZWRfZWRpdG9ycywgZnVuY3Rpb24oaSxlbCkge1xuICAgICAgZWwuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGlmKHRoaXMuZWRpdG9yX2hvbGRlcikgdGhpcy5lZGl0b3JfaG9sZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGlmKHRoaXMudGl0bGUgJiYgdGhpcy50aXRsZS5wYXJlbnROb2RlKSB0aGlzLnRpdGxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgaWYodGhpcy5lcnJvcl9ob2xkZXIgJiYgdGhpcy5lcnJvcl9ob2xkZXIucGFyZW50Tm9kZSkgdGhpcy5lcnJvcl9ob2xkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVycm9yX2hvbGRlcik7XG5cbiAgICB0aGlzLmVkaXRvcnMgPSBudWxsO1xuICAgIHRoaXMuY2FjaGVkX2VkaXRvcnMgPSBudWxsO1xuICAgIGlmKHRoaXMuZWRpdG9yX2hvbGRlciAmJiB0aGlzLmVkaXRvcl9ob2xkZXIucGFyZW50Tm9kZSkgdGhpcy5lZGl0b3JfaG9sZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lZGl0b3JfaG9sZGVyKTtcbiAgICB0aGlzLmVkaXRvcl9ob2xkZXIgPSBudWxsO1xuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLl9zdXBlcigpO1xuICAgIGlmKHRoaXMuanNvbmVkaXRvci5vcHRpb25zLnJlbW92ZV9lbXB0eV9wcm9wZXJ0aWVzIHx8IHRoaXMub3B0aW9ucy5yZW1vdmVfZW1wdHlfcHJvcGVydGllcykge1xuICAgICAgZm9yKHZhciBpIGluIHJlc3VsdCkge1xuICAgICAgICBpZihyZXN1bHQuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICBpZighcmVzdWx0W2ldKSBkZWxldGUgcmVzdWx0W2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIHJlZnJlc2hWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy52YWx1ZSA9IHt9O1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZvcih2YXIgaSBpbiB0aGlzLmVkaXRvcnMpIHtcbiAgICAgIGlmKCF0aGlzLmVkaXRvcnMuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgdGhpcy52YWx1ZVtpXSA9IHRoaXMuZWRpdG9yc1tpXS5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIGlmKHRoaXMuYWRkaW5nX3Byb3BlcnR5KSB0aGlzLnJlZnJlc2hBZGRQcm9wZXJ0aWVzKCk7XG4gIH0sXG4gIHJlZnJlc2hBZGRQcm9wZXJ0aWVzOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuZGlzYWJsZV9wcm9wZXJ0aWVzIHx8ICh0aGlzLm9wdGlvbnMuZGlzYWJsZV9wcm9wZXJ0aWVzICE9PSBmYWxzZSAmJiB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5kaXNhYmxlX3Byb3BlcnRpZXMpKSB7XG4gICAgICB0aGlzLmFkZHByb3BlcnR5X2NvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNhbl9hZGQgPSBmYWxzZSwgY2FuX3JlbW92ZSA9IGZhbHNlLCBudW1fcHJvcHMgPSAwLCBpLCBzaG93X21vZGFsID0gZmFsc2U7XG5cbiAgICAvLyBHZXQgbnVtYmVyIG9mIGVkaXRvcnNcbiAgICBmb3IoaSBpbiB0aGlzLmVkaXRvcnMpIHtcbiAgICAgIGlmKCF0aGlzLmVkaXRvcnMuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgbnVtX3Byb3BzKys7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHdlIGNhbiBhZGQgYmFjayByZW1vdmVkIHByb3BlcnRpZXNcbiAgICBjYW5fYWRkID0gdGhpcy5jYW5IYXZlQWRkaXRpb25hbFByb3BlcnRpZXMoKSAmJiAhKHR5cGVvZiB0aGlzLnNjaGVtYS5tYXhQcm9wZXJ0aWVzICE9PSBcInVuZGVmaW5lZFwiICYmIG51bV9wcm9wcyA+PSB0aGlzLnNjaGVtYS5tYXhQcm9wZXJ0aWVzKTtcblxuICAgIGlmKHRoaXMuYWRkcHJvcGVydHlfY2hlY2tib3hlcykge1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9saXN0LmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgICB0aGlzLmFkZHByb3BlcnR5X2NoZWNrYm94ZXMgPSB7fTtcblxuICAgIC8vIENoZWNrIGZvciB3aGljaCBlZGl0b3JzIGNhbid0IGJlIHJlbW92ZWQgb3IgYWRkZWQgYmFja1xuICAgIGZvcihpIGluIHRoaXMuY2FjaGVkX2VkaXRvcnMpIHtcbiAgICAgIGlmKCF0aGlzLmNhY2hlZF9lZGl0b3JzLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgdGhpcy5hZGRQcm9wZXJ0eUNoZWNrYm94KGkpO1xuXG4gICAgICBpZih0aGlzLmlzUmVxdWlyZWQodGhpcy5jYWNoZWRfZWRpdG9yc1tpXSkgJiYgaSBpbiB0aGlzLmVkaXRvcnMpIHtcbiAgICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9jaGVja2JveGVzW2ldLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYodHlwZW9mIHRoaXMuc2NoZW1hLm1pblByb3BlcnRpZXMgIT09IFwidW5kZWZpbmVkXCIgJiYgbnVtX3Byb3BzIDw9IHRoaXMuc2NoZW1hLm1pblByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9jaGVja2JveGVzW2ldLmRpc2FibGVkID0gdGhpcy5hZGRwcm9wZXJ0eV9jaGVja2JveGVzW2ldLmNoZWNrZWQ7XG4gICAgICAgIGlmKCF0aGlzLmFkZHByb3BlcnR5X2NoZWNrYm94ZXNbaV0uY2hlY2tlZCkgc2hvd19tb2RhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCEoaSBpbiB0aGlzLmVkaXRvcnMpKSB7XG4gICAgICAgIGlmKCFjYW5fYWRkICAmJiAhdGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgIHRoaXMuYWRkcHJvcGVydHlfY2hlY2tib3hlc1tpXS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9jaGVja2JveGVzW2ldLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgc2hvd19tb2RhbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzaG93X21vZGFsID0gdHJ1ZTtcbiAgICAgICAgY2FuX3JlbW92ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodGhpcy5jYW5IYXZlQWRkaXRpb25hbFByb3BlcnRpZXMoKSkge1xuICAgICAgc2hvd19tb2RhbCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkaXRpb25hbCBhZGRwcm9wZXJ0eSBjaGVja2JveGVzIG5vdCB0aWVkIHRvIGEgY3VycmVudCBlZGl0b3JcbiAgICBmb3IoaSBpbiB0aGlzLnNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBpZighdGhpcy5zY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICBpZih0aGlzLmNhY2hlZF9lZGl0b3JzW2ldKSBjb250aW51ZTtcbiAgICAgIHNob3dfbW9kYWwgPSB0cnVlO1xuICAgICAgdGhpcy5hZGRQcm9wZXJ0eUNoZWNrYm94KGkpO1xuICAgIH1cblxuICAgIC8vIElmIG5vIGVkaXRvcnMgY2FuIGJlIGFkZGVkIG9yIHJlbW92ZWQsIGhpZGUgdGhlIG1vZGFsIGJ1dHRvblxuICAgIGlmKCFzaG93X21vZGFsKSB7XG4gICAgICB0aGlzLmhpZGVBZGRQcm9wZXJ0eSgpO1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9jb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICAvLyBJZiBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYXJlIGRpc2FibGVkXG4gICAgZWxzZSBpZighdGhpcy5jYW5IYXZlQWRkaXRpb25hbFByb3BlcnRpZXMoKSkge1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9hZGQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgLy8gSWYgbm8gbmV3IHByb3BlcnRpZXMgY2FuIGJlIGFkZGVkXG4gICAgZWxzZSBpZighY2FuX2FkZCkge1xuICAgICAgdGhpcy5hZGRwcm9wZXJ0eV9hZGQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBJZiBuZXcgcHJvcGVydGllcyBjYW4gYmUgYWRkZWRcbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWRkcHJvcGVydHlfYWRkLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBpc1JlcXVpcmVkOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICBpZih0eXBlb2YgZWRpdG9yLnNjaGVtYS5yZXF1aXJlZCA9PT0gXCJib29sZWFuXCIpIHJldHVybiBlZGl0b3Iuc2NoZW1hLnJlcXVpcmVkO1xuICAgIGVsc2UgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnNjaGVtYS5yZXF1aXJlZCkpIHJldHVybiB0aGlzLnNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGVkaXRvci5rZXkpID4gLTE7XG4gICAgZWxzZSBpZih0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5yZXF1aXJlZF9ieV9kZWZhdWx0KSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBpbml0aWFsKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhbHVlID0gdmFsdWUgfHwge307XG5cbiAgICBpZih0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0ge307XG5cbiAgICAvLyBGaXJzdCwgc2V0IHRoZSB2YWx1ZXMgZm9yIGFsbCBvZiB0aGUgZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgJGVhY2godGhpcy5jYWNoZWRfZWRpdG9ycywgZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgICAgIC8vIFZhbHVlIGV4cGxpY2l0bHkgc2V0XG4gICAgICBpZih0eXBlb2YgdmFsdWVbaV0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgc2VsZi5hZGRPYmplY3RQcm9wZXJ0eShpKTtcbiAgICAgICAgZWRpdG9yLnNldFZhbHVlKHZhbHVlW2ldLGluaXRpYWwpO1xuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCByZW1vdmUgdmFsdWUgdW5sZXNzIHRoaXMgaXMgdGhlIGluaXRpYWwgc2V0IG9yIGl0J3MgcmVxdWlyZWRcbiAgICAgIGVsc2UgaWYoIWluaXRpYWwgJiYgIXNlbGYuaXNSZXF1aXJlZChlZGl0b3IpKSB7XG4gICAgICAgIHNlbGYucmVtb3ZlT2JqZWN0UHJvcGVydHkoaSk7XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UsIHNldCB0aGUgdmFsdWUgdG8gdGhlIGRlZmF1bHRcbiAgICAgIGVsc2Uge1xuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoZWRpdG9yLmdldERlZmF1bHQoKSxpbml0aWFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRlYWNoKHZhbHVlLCBmdW5jdGlvbihpLHZhbCkge1xuICAgICAgaWYoIXNlbGYuY2FjaGVkX2VkaXRvcnNbaV0pIHtcbiAgICAgICAgc2VsZi5hZGRPYmplY3RQcm9wZXJ0eShpKTtcbiAgICAgICAgaWYoc2VsZi5lZGl0b3JzW2ldKSBzZWxmLmVkaXRvcnNbaV0uc2V0VmFsdWUodmFsLGluaXRpYWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcbiAgICB0aGlzLmxheW91dEVkaXRvcnMoKTtcbiAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gIH0sXG4gIHNob3dWYWxpZGF0aW9uRXJyb3JzOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBHZXQgYWxsIHRoZSBlcnJvcnMgdGhhdCBwZXJ0YWluIHRvIHRoaXMgZWRpdG9yXG4gICAgdmFyIG15X2Vycm9ycyA9IFtdO1xuICAgIHZhciBvdGhlcl9lcnJvcnMgPSBbXTtcbiAgICAkZWFjaChlcnJvcnMsIGZ1bmN0aW9uKGksZXJyb3IpIHtcbiAgICAgIGlmKGVycm9yLnBhdGggPT09IHNlbGYucGF0aCkge1xuICAgICAgICBteV9lcnJvcnMucHVzaChlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb3RoZXJfZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2hvdyBlcnJvcnMgZm9yIHRoaXMgZWRpdG9yXG4gICAgaWYodGhpcy5lcnJvcl9ob2xkZXIpIHtcbiAgICAgIGlmKG15X2Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBbXTtcbiAgICAgICAgdGhpcy5lcnJvcl9ob2xkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuZXJyb3JfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgJGVhY2gobXlfZXJyb3JzLCBmdW5jdGlvbihpLGVycm9yKSB7XG4gICAgICAgICAgc2VsZi5lcnJvcl9ob2xkZXIuYXBwZW5kQ2hpbGQoc2VsZi50aGVtZS5nZXRFcnJvck1lc3NhZ2UoZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEhpZGUgZXJyb3IgYXJlYVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3JfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2hvdyBlcnJvciBmb3IgdGhlIHRhYmxlIHJvdyBpZiB0aGlzIGlzIGluc2lkZSBhIHRhYmxlXG4gICAgaWYodGhpcy5vcHRpb25zLnRhYmxlX3Jvdykge1xuICAgICAgaWYobXlfZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRoZW1lLmFkZFRhYmxlUm93RXJyb3IodGhpcy5jb250YWluZXIpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMudGhlbWUucmVtb3ZlVGFibGVSb3dFcnJvcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2hvdyBlcnJvcnMgZm9yIGNoaWxkIGVkaXRvcnNcbiAgICAkZWFjaCh0aGlzLmVkaXRvcnMsIGZ1bmN0aW9uKGksZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iuc2hvd1ZhbGlkYXRpb25FcnJvcnMob3RoZXJfZXJyb3JzKTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5hcnJheSA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgZ2V0RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1hW1wiZGVmYXVsdFwiXSB8fCBbXTtcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYodGhpcy5yb3dzKSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yb3dzW2ldLnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zdXBlcigpO1xuICAgIGlmKHRoaXMucm93cykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucm93c1tpXS51bnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5mbyA9IHRoaXMuZ2V0SXRlbUluZm8oMCk7XG4gICAgLy8gVGFicyByZXF1aXJlIGV4dHJhIGhvcml6b250YWwgc3BhY2VcbiAgICBpZih0aGlzLnRhYnNfaG9sZGVyKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oMTIsaW5mby53aWR0aCsyKSw0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gaW5mby53aWR0aDtcbiAgICB9XG4gIH0sXG4gIGVuYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5hZGRfcm93X2J1dHRvbikgdGhpcy5hZGRfcm93X2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGlmKHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbikgdGhpcy5yZW1vdmVfYWxsX3Jvd3NfYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgaWYodGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uKSB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGlmKHRoaXMucm93cykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucm93c1tpXS5lbmFibGUoKTtcblxuICAgICAgICBpZih0aGlzLnJvd3NbaV0ubW92ZXVwX2J1dHRvbikgdGhpcy5yb3dzW2ldLm1vdmV1cF9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbikgdGhpcy5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICBpZih0aGlzLnJvd3NbaV0uZGVsZXRlX2J1dHRvbikgdGhpcy5yb3dzW2ldLmRlbGV0ZV9idXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5hZGRfcm93X2J1dHRvbikgdGhpcy5hZGRfcm93X2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgaWYodGhpcy5yZW1vdmVfYWxsX3Jvd3NfYnV0dG9uKSB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGlmKHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbikgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIGlmKHRoaXMucm93cykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucm93c1tpXS5kaXNhYmxlKCk7XG5cbiAgICAgICAgaWYodGhpcy5yb3dzW2ldLm1vdmV1cF9idXR0b24pIHRoaXMucm93c1tpXS5tb3ZldXBfYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgaWYodGhpcy5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbikgdGhpcy5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGlmKHRoaXMucm93c1tpXS5kZWxldGVfYnV0dG9uKSB0aGlzLnJvd3NbaV0uZGVsZXRlX2J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIHByZUJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zdXBlcigpO1xuXG4gICAgdGhpcy5yb3dzID0gW107XG4gICAgdGhpcy5yb3dfY2FjaGUgPSBbXTtcblxuICAgIHRoaXMuaGlkZV9kZWxldGVfYnV0dG9ucyA9IHRoaXMub3B0aW9ucy5kaXNhYmxlX2FycmF5X2RlbGV0ZSB8fCB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5kaXNhYmxlX2FycmF5X2RlbGV0ZTtcbiAgICB0aGlzLmhpZGVfZGVsZXRlX2FsbF9yb3dzX2J1dHRvbnMgPSB0cnVlOyAvL3RoaXMuaGlkZV9kZWxldGVfYnV0dG9ucyB8fCB0aGlzLm9wdGlvbnMuZGlzYWJsZV9hcnJheV9kZWxldGVfYWxsX3Jvd3MgfHwgdGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZGlzYWJsZV9hcnJheV9kZWxldGVfYWxsX3Jvd3M7IFJFQlxuICAgIHRoaXMuaGlkZV9kZWxldGVfbGFzdF9yb3dfYnV0dG9ucyA9IHRydWU7IC8vdGhpcy5oaWRlX2RlbGV0ZV9idXR0b25zIHx8IHRoaXMub3B0aW9ucy5kaXNhYmxlX2FycmF5X2RlbGV0ZV9sYXN0X3JvdyB8fCB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5kaXNhYmxlX2FycmF5X2RlbGV0ZV9sYXN0X3JvdzsgUkVCXG4gICAgdGhpcy5oaWRlX21vdmVfYnV0dG9ucyA9IHRoaXMub3B0aW9ucy5kaXNhYmxlX2FycmF5X3Jlb3JkZXIgfHwgdGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZGlzYWJsZV9hcnJheV9yZW9yZGVyO1xuICAgIHRoaXMuaGlkZV9hZGRfYnV0dG9uID0gdGhpcy5vcHRpb25zLmRpc2FibGVfYXJyYXlfYWRkIHx8IHRoaXMuanNvbmVkaXRvci5vcHRpb25zLmRpc2FibGVfYXJyYXlfYWRkO1xuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy5jb21wYWN0KSB7XG4gICAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHRoaXMuaGVhZGVyLnRleHRDb250ZW50ID0gdGhpcy5nZXRUaXRsZSgpO1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGhlbWUuZ2V0SGVhZGVyKHRoaXMuaGVhZGVyKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgICAgdGhpcy50aXRsZV9jb250cm9scyA9IHRoaXMudGhlbWUuZ2V0SGVhZGVyQnV0dG9uSG9sZGVyKCk7XG4gICAgICB0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMudGl0bGVfY29udHJvbHMpO1xuICAgICAgaWYodGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMudGhlbWUuZ2V0RGVzY3JpcHRpb24odGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXJyb3JfaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVycm9yX2hvbGRlcik7XG5cbiAgICAgIGlmKHRoaXMuc2NoZW1hLmZvcm1hdCA9PT0gJ3RhYnMnKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLnRoZW1lLmdldEhlYWRlckJ1dHRvbkhvbGRlcigpO1xuICAgICAgICB0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbHMpO1xuICAgICAgICB0aGlzLnRhYnNfaG9sZGVyID0gdGhpcy50aGVtZS5nZXRUYWJIb2xkZXIoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJzX2hvbGRlcik7XG4gICAgICAgIHRoaXMucm93X2hvbGRlciA9IHRoaXMudGhlbWUuZ2V0VGFiQ29udGVudEhvbGRlcih0aGlzLnRhYnNfaG9sZGVyKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZV90YWIgPSBudWxsO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWwgPSB0aGlzLnRoZW1lLmdldEluZGVudGVkUGFuZWwoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgICAgIHRoaXMucm93X2hvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMucm93X2hvbGRlcik7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLnRoZW1lLmdldEJ1dHRvbkhvbGRlcigpO1xuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5wYW5lbCA9IHRoaXMudGhlbWUuZ2V0SW5kZW50ZWRQYW5lbCgpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICAgICAgdGhpcy5jb250cm9scyA9IHRoaXMudGhlbWUuZ2V0QnV0dG9uSG9sZGVyKCk7XG4gICAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9scyk7XG4gICAgICAgIHRoaXMucm93X2hvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMucm93X2hvbGRlcik7XG4gICAgfVxuXG4gICAgLy8gQWRkIGNvbnRyb2xzXG4gICAgdGhpcy5hZGRDb250cm9scygpO1xuICB9LFxuICBvbkNoaWxkRWRpdG9yQ2hhbmdlOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICB0aGlzLnJlZnJlc2hWYWx1ZSgpO1xuICAgIHRoaXMucmVmcmVzaFRhYnModHJ1ZSk7XG4gICAgdGhpcy5fc3VwZXIoZWRpdG9yKTtcbiAgfSxcbiAgZ2V0SXRlbVRpdGxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5pdGVtX3RpdGxlKSB7XG4gICAgICBpZih0aGlzLnNjaGVtYS5pdGVtcyAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLnNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgdmFyIHRtcCA9IHRoaXMuanNvbmVkaXRvci5leHBhbmRSZWZzKHRoaXMuc2NoZW1hLml0ZW1zKTtcbiAgICAgICAgdGhpcy5pdGVtX3RpdGxlID0gdG1wLnRpdGxlIHx8ICdpdGVtJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLml0ZW1fdGl0bGUgPSAnaXRlbSc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLml0ZW1fdGl0bGU7XG4gIH0sXG4gIGdldEl0ZW1TY2hlbWE6IGZ1bmN0aW9uKGkpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMuc2NoZW1hLml0ZW1zKSkge1xuICAgICAgaWYoaSA+PSB0aGlzLnNjaGVtYS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgaWYodGhpcy5zY2hlbWEuYWRkaXRpb25hbEl0ZW1zPT09dHJ1ZSkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuICAgICAgICAgIHJldHVybiAkZXh0ZW5kKHt9LHRoaXMuc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJGV4dGVuZCh7fSx0aGlzLnNjaGVtYS5pdGVtc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEuaXRlbXMpIHtcbiAgICAgIHJldHVybiAkZXh0ZW5kKHt9LHRoaXMuc2NoZW1hLml0ZW1zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9LFxuICBnZXRJdGVtSW5mbzogZnVuY3Rpb24oaSkge1xuICAgIHZhciBzY2hlbWEgPSB0aGlzLmdldEl0ZW1TY2hlbWEoaSk7XG5cbiAgICAvLyBDaGVjayBpZiBpdCdzIGNhY2hlZFxuICAgIHRoaXMuaXRlbV9pbmZvID0gdGhpcy5pdGVtX2luZm8gfHwge307XG4gICAgdmFyIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkoc2NoZW1hKTtcbiAgICBpZih0eXBlb2YgdGhpcy5pdGVtX2luZm9bc3RyaW5naWZpZWRdICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdGhpcy5pdGVtX2luZm9bc3RyaW5naWZpZWRdO1xuXG4gICAgLy8gR2V0IHRoZSBzY2hlbWEgZm9yIHRoaXMgaXRlbVxuICAgIHNjaGVtYSA9IHRoaXMuanNvbmVkaXRvci5leHBhbmRSZWZzKHNjaGVtYSk7XG5cbiAgICB0aGlzLml0ZW1faW5mb1tzdHJpbmdpZmllZF0gPSB7XG4gICAgICB0aXRsZTogc2NoZW1hLnRpdGxlIHx8IFwiaXRlbVwiLFxuICAgICAgJ2RlZmF1bHQnOiBzY2hlbWFbXCJkZWZhdWx0XCJdLFxuICAgICAgd2lkdGg6IDEyLFxuICAgICAgY2hpbGRfZWRpdG9yczogc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLml0ZW1zXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLml0ZW1faW5mb1tzdHJpbmdpZmllZF07XG4gIH0sXG4gIGdldEVsZW1lbnRFZGl0b3I6IGZ1bmN0aW9uKGkpIHtcbiAgICB2YXIgaXRlbV9pbmZvID0gdGhpcy5nZXRJdGVtSW5mbyhpKTtcbiAgICB2YXIgc2NoZW1hID0gdGhpcy5nZXRJdGVtU2NoZW1hKGkpO1xuICAgIHNjaGVtYSA9IHRoaXMuanNvbmVkaXRvci5leHBhbmRSZWZzKHNjaGVtYSk7XG4gICAgc2NoZW1hLnRpdGxlID0gaXRlbV9pbmZvLnRpdGxlKycgJysoaSsxKTtcblxuICAgIHZhciBlZGl0b3IgPSB0aGlzLmpzb25lZGl0b3IuZ2V0RWRpdG9yQ2xhc3Moc2NoZW1hKTtcblxuICAgIHZhciBob2xkZXI7XG4gICAgaWYodGhpcy50YWJzX2hvbGRlcikge1xuICAgICAgaG9sZGVyID0gdGhpcy50aGVtZS5nZXRUYWJDb250ZW50KCk7XG4gICAgfVxuICAgIGVsc2UgaWYoaXRlbV9pbmZvLmNoaWxkX2VkaXRvcnMpIHtcbiAgICAgIGhvbGRlciA9IHRoaXMudGhlbWUuZ2V0Q2hpbGRFZGl0b3JIb2xkZXIoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBob2xkZXIgPSB0aGlzLnRoZW1lLmdldEluZGVudGVkUGFuZWwoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvd19ob2xkZXIuYXBwZW5kQ2hpbGQoaG9sZGVyKTtcblxuICAgIHZhciByZXQgPSB0aGlzLmpzb25lZGl0b3IuY3JlYXRlRWRpdG9yKGVkaXRvcix7XG4gICAgICBqc29uZWRpdG9yOiB0aGlzLmpzb25lZGl0b3IsXG4gICAgICBzY2hlbWE6IHNjaGVtYSxcbiAgICAgIGNvbnRhaW5lcjogaG9sZGVyLFxuICAgICAgcGF0aDogdGhpcy5wYXRoKycuJytpLFxuICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9KTtcbiAgICByZXQucHJlQnVpbGQoKTtcbiAgICByZXQuYnVpbGQoKTtcbiAgICByZXQucG9zdEJ1aWxkKCk7XG5cbiAgICBpZighcmV0LnRpdGxlX2NvbnRyb2xzKSB7XG4gICAgICByZXQuYXJyYXlfY29udHJvbHMgPSB0aGlzLnRoZW1lLmdldEJ1dHRvbkhvbGRlcigpO1xuICAgICAgaG9sZGVyLmFwcGVuZENoaWxkKHJldC5hcnJheV9jb250cm9scyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbXB0eSh0cnVlKTtcbiAgICBpZih0aGlzLnRpdGxlICYmIHRoaXMudGl0bGUucGFyZW50Tm9kZSkgdGhpcy50aXRsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMudGl0bGUpO1xuICAgIGlmKHRoaXMuZGVzY3JpcHRpb24gJiYgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlKSB0aGlzLmRlc2NyaXB0aW9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgaWYodGhpcy5yb3dfaG9sZGVyICYmIHRoaXMucm93X2hvbGRlci5wYXJlbnROb2RlKSB0aGlzLnJvd19ob2xkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnJvd19ob2xkZXIpO1xuICAgIGlmKHRoaXMuY29udHJvbHMgJiYgdGhpcy5jb250cm9scy5wYXJlbnROb2RlKSB0aGlzLmNvbnRyb2xzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jb250cm9scyk7XG4gICAgaWYodGhpcy5wYW5lbCAmJiB0aGlzLnBhbmVsLnBhcmVudE5vZGUpIHRoaXMucGFuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnBhbmVsKTtcblxuICAgIHRoaXMucm93cyA9IHRoaXMucm93X2NhY2hlID0gdGhpcy50aXRsZSA9IHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnJvd19ob2xkZXIgPSB0aGlzLnBhbmVsID0gdGhpcy5jb250cm9scyA9IG51bGw7XG5cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBlbXB0eTogZnVuY3Rpb24oaGFyZCkge1xuICAgIGlmKCF0aGlzLnJvd3MpIHJldHVybjtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJGVhY2godGhpcy5yb3dzLGZ1bmN0aW9uKGkscm93KSB7XG4gICAgICBpZihoYXJkKSB7XG4gICAgICAgIGlmKHJvdy50YWIgJiYgcm93LnRhYi5wYXJlbnROb2RlKSByb3cudGFiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocm93LnRhYik7XG4gICAgICAgIHNlbGYuZGVzdHJveVJvdyhyb3csdHJ1ZSk7XG4gICAgICAgIHNlbGYucm93X2NhY2hlW2ldID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHNlbGYucm93c1tpXSA9IG51bGw7XG4gICAgfSk7XG4gICAgc2VsZi5yb3dzID0gW107XG4gICAgaWYoaGFyZCkgc2VsZi5yb3dfY2FjaGUgPSBbXTtcbiAgfSxcbiAgZGVzdHJveVJvdzogZnVuY3Rpb24ocm93LGhhcmQpIHtcbiAgICB2YXIgaG9sZGVyID0gcm93LmNvbnRhaW5lcjtcbiAgICBpZihoYXJkKSB7XG4gICAgICByb3cuZGVzdHJveSgpO1xuICAgICAgaWYoaG9sZGVyLnBhcmVudE5vZGUpIGhvbGRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGhvbGRlcik7XG4gICAgICBpZihyb3cudGFiICYmIHJvdy50YWIucGFyZW50Tm9kZSkgcm93LnRhYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvdy50YWIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmKHJvdy50YWIpIHJvdy50YWIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcm93LnVucmVnaXN0ZXIoKTtcbiAgICB9XG4gIH0sXG4gIGdldE1heDogZnVuY3Rpb24oKSB7XG4gICAgaWYoKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEuaXRlbXMpKSAmJiB0aGlzLnNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gTWF0aC5taW4odGhpcy5zY2hlbWEuaXRlbXMubGVuZ3RoLHRoaXMuc2NoZW1hLm1heEl0ZW1zIHx8IEluZmluaXR5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlbWEubWF4SXRlbXMgfHwgSW5maW5pdHk7XG4gICAgfVxuICB9LFxuICByZWZyZXNoVGFiczogZnVuY3Rpb24ocmVmcmVzaF9oZWFkZXJzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICRlYWNoKHRoaXMucm93cywgZnVuY3Rpb24oaSxyb3cpIHtcbiAgICAgIGlmKCFyb3cudGFiKSByZXR1cm47XG5cbiAgICAgIGlmKHJlZnJlc2hfaGVhZGVycykge1xuICAgICAgICByb3cudGFiX3RleHQudGV4dENvbnRlbnQgPSByb3cuZ2V0SGVhZGVyVGV4dCgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmKHJvdy50YWIgPT09IHNlbGYuYWN0aXZlX3RhYikge1xuICAgICAgICAgIHNlbGYudGhlbWUubWFya1RhYkFjdGl2ZShyb3cudGFiKTtcbiAgICAgICAgICByb3cuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzZWxmLnRoZW1lLm1hcmtUYWJJbmFjdGl2ZShyb3cudGFiKTtcbiAgICAgICAgICByb3cuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBpbml0aWFsKSB7XG4gICAgLy8gVXBkYXRlIHRoZSBhcnJheSdzIHZhbHVlLCBhZGRpbmcvcmVtb3Zpbmcgcm93cyB3aGVuIG5lY2Vzc2FyeVxuICAgIHZhbHVlID0gdmFsdWUgfHwgW107XG5cbiAgICBpZighKEFycmF5LmlzQXJyYXkodmFsdWUpKSkgdmFsdWUgPSBbdmFsdWVdO1xuXG4gICAgdmFyIHNlcmlhbGl6ZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgaWYoc2VyaWFsaXplZCA9PT0gdGhpcy5zZXJpYWxpemVkKSByZXR1cm47XG5cbiAgICAvLyBNYWtlIHN1cmUgdmFsdWUgaGFzIGJldHdlZW4gbWluSXRlbXMgYW5kIG1heEl0ZW1zIGl0ZW1zIGluIGl0XG4gICAgaWYodGhpcy5zY2hlbWEubWluSXRlbXMpIHtcbiAgICAgIHdoaWxlKHZhbHVlLmxlbmd0aCA8IHRoaXMuc2NoZW1hLm1pbkl0ZW1zKSB7XG4gICAgICAgIHZhbHVlLnB1c2godGhpcy5nZXRJdGVtSW5mbyh2YWx1ZS5sZW5ndGgpW1wiZGVmYXVsdFwiXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMuZ2V0TWF4KCkgJiYgdmFsdWUubGVuZ3RoID4gdGhpcy5nZXRNYXgoKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgwLHRoaXMuZ2V0TWF4KCkpO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAkZWFjaCh2YWx1ZSxmdW5jdGlvbihpLHZhbCkge1xuICAgICAgaWYoc2VsZi5yb3dzW2ldKSB7XG4gICAgICAgIC8vIFRPRE86IGRvbid0IHNldCB0aGUgcm93J3MgdmFsdWUgaWYgaXQgaGFzbid0IGNoYW5nZWRcbiAgICAgICAgc2VsZi5yb3dzW2ldLnNldFZhbHVlKHZhbCxpbml0aWFsKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYoc2VsZi5yb3dfY2FjaGVbaV0pIHtcbiAgICAgICAgc2VsZi5yb3dzW2ldID0gc2VsZi5yb3dfY2FjaGVbaV07XG4gICAgICAgIHNlbGYucm93c1tpXS5zZXRWYWx1ZSh2YWwsaW5pdGlhbCk7XG4gICAgICAgIHNlbGYucm93c1tpXS5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBpZihzZWxmLnJvd3NbaV0udGFiKSBzZWxmLnJvd3NbaV0udGFiLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgc2VsZi5yb3dzW2ldLnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5hZGRSb3codmFsLGluaXRpYWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yKHZhciBqPXZhbHVlLmxlbmd0aDsgajxzZWxmLnJvd3MubGVuZ3RoOyBqKyspIHtcbiAgICAgIHNlbGYuZGVzdHJveVJvdyhzZWxmLnJvd3Nbal0pO1xuICAgICAgc2VsZi5yb3dzW2pdID0gbnVsbDtcbiAgICB9XG4gICAgc2VsZi5yb3dzID0gc2VsZi5yb3dzLnNsaWNlKDAsdmFsdWUubGVuZ3RoKTtcblxuICAgIC8vIFNldCB0aGUgYWN0aXZlIHRhYlxuICAgIHZhciBuZXdfYWN0aXZlX3RhYiA9IG51bGw7XG4gICAgJGVhY2goc2VsZi5yb3dzLCBmdW5jdGlvbihpLHJvdykge1xuICAgICAgaWYocm93LnRhYiA9PT0gc2VsZi5hY3RpdmVfdGFiKSB7XG4gICAgICAgIG5ld19hY3RpdmVfdGFiID0gcm93LnRhYjtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKCFuZXdfYWN0aXZlX3RhYiAmJiBzZWxmLnJvd3MubGVuZ3RoKSBuZXdfYWN0aXZlX3RhYiA9IHNlbGYucm93c1swXS50YWI7XG5cbiAgICBzZWxmLmFjdGl2ZV90YWIgPSBuZXdfYWN0aXZlX3RhYjtcblxuICAgIHNlbGYucmVmcmVzaFZhbHVlKGluaXRpYWwpO1xuICAgIHNlbGYucmVmcmVzaFRhYnModHJ1ZSk7XG4gICAgc2VsZi5yZWZyZXNoVGFicygpO1xuXG4gICAgc2VsZi5vbkNoYW5nZSgpO1xuXG4gICAgLy8gVE9ETzogc29ydGFibGVcbiAgfSxcbiAgcmVmcmVzaFZhbHVlOiBmdW5jdGlvbihmb3JjZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgb2xkaSA9IHRoaXMudmFsdWU/IHRoaXMudmFsdWUubGVuZ3RoIDogMDtcbiAgICB0aGlzLnZhbHVlID0gW107XG5cbiAgICAkZWFjaCh0aGlzLnJvd3MsZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgICAgIC8vIEdldCB0aGUgdmFsdWUgZm9yIHRoaXMgZWRpdG9yXG4gICAgICBzZWxmLnZhbHVlW2ldID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgfSk7XG5cbiAgICBpZihvbGRpICE9PSB0aGlzLnZhbHVlLmxlbmd0aCB8fCBmb3JjZSkge1xuICAgICAgLy8gSWYgd2UgY3VycmVudGx5IGhhdmUgbWluSXRlbXMgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgICB2YXIgbWluSXRlbXMgPSB0aGlzLnNjaGVtYS5taW5JdGVtcyAmJiB0aGlzLnNjaGVtYS5taW5JdGVtcyA+PSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgICAkZWFjaCh0aGlzLnJvd3MsZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgICAgICAgLy8gSGlkZSB0aGUgbW92ZSBkb3duIGJ1dHRvbiBmb3IgdGhlIGxhc3Qgcm93XG4gICAgICAgIGlmKGVkaXRvci5tb3ZlZG93bl9idXR0b24pIHtcbiAgICAgICAgICBpZihpID09PSBzZWxmLnJvd3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZWRpdG9yLm1vdmVkb3duX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvci5tb3ZlZG93bl9idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhpZGUgdGhlIGRlbGV0ZSBidXR0b24gaWYgd2UgaGF2ZSBtaW5JdGVtcyBpdGVtc1xuICAgICAgICBpZihlZGl0b3IuZGVsZXRlX2J1dHRvbikge1xuICAgICAgICAgIGlmKG1pbkl0ZW1zKSB7XG4gICAgICAgICAgICBlZGl0b3IuZGVsZXRlX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvci5kZWxldGVfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIGZvciB0aGlzIGVkaXRvclxuICAgICAgICBzZWxmLnZhbHVlW2ldID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGNvbnRyb2xzX25lZWRlZCA9IGZhbHNlO1xuXG4gICAgICBpZighdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbWluSXRlbXMgaXRlbXMgaW4gdGhlIGFycmF5LCBvciBjb25maWd1cmVkIHRvIGhpZGUgdGhlIGRlbGV0ZV9sYXN0X3JvdyBidXR0b24sIGhpZGUgdGhlIGRlbGV0ZSBidXR0b24gYmVuZWF0aCB0aGUgcm93c1xuICAgICAgICBpZihtaW5JdGVtcyB8fCB0aGlzLmhpZGVfZGVsZXRlX2xhc3Rfcm93X2J1dHRvbnMpIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIGNvbnRyb2xzX25lZWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZihtaW5JdGVtcyB8fCB0aGlzLmhpZGVfZGVsZXRlX2xhc3Rfcm93X2J1dHRvbnMpIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIGNvbnRyb2xzX25lZWRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW5JdGVtcyB8fCB0aGlzLmhpZGVfZGVsZXRlX2FsbF9yb3dzX2J1dHRvbnMpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIGNvbnRyb2xzX25lZWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlcmUgYXJlIG1heEl0ZW1zIGluIHRoZSBhcnJheSwgaGlkZSB0aGUgYWRkIGJ1dHRvbiBiZW5lYXRoIHRoZSByb3dzXG4gICAgICBpZigodGhpcy5nZXRNYXgoKSAmJiB0aGlzLmdldE1heCgpIDw9IHRoaXMucm93cy5sZW5ndGgpIHx8IHRoaXMuaGlkZV9hZGRfYnV0dG9uKXtcbiAgICAgICAgdGhpcy5hZGRfcm93X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkX3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBjb250cm9sc19uZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZighdGhpcy5jb2xsYXBzZWQgJiYgY29udHJvbHNfbmVlZGVkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGFkZFJvdzogZnVuY3Rpb24odmFsdWUsIGluaXRpYWwpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGkgPSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgc2VsZi5yb3dzW2ldID0gdGhpcy5nZXRFbGVtZW50RWRpdG9yKGkpO1xuICAgIHNlbGYucm93X2NhY2hlW2ldID0gc2VsZi5yb3dzW2ldO1xuXG4gICAgaWYoc2VsZi50YWJzX2hvbGRlcikge1xuICAgICAgc2VsZi5yb3dzW2ldLnRhYl90ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgc2VsZi5yb3dzW2ldLnRhYl90ZXh0LnRleHRDb250ZW50ID0gc2VsZi5yb3dzW2ldLmdldEhlYWRlclRleHQoKTtcbiAgICAgIHNlbGYucm93c1tpXS50YWIgPSBzZWxmLnRoZW1lLmdldFRhYihzZWxmLnJvd3NbaV0udGFiX3RleHQpO1xuICAgICAgc2VsZi5yb3dzW2ldLnRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgc2VsZi5hY3RpdmVfdGFiID0gc2VsZi5yb3dzW2ldLnRhYjtcbiAgICAgICAgc2VsZi5yZWZyZXNoVGFicygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcblxuICAgICAgc2VsZi50aGVtZS5hZGRUYWIoc2VsZi50YWJzX2hvbGRlciwgc2VsZi5yb3dzW2ldLnRhYik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRyb2xzX2hvbGRlciA9IHNlbGYucm93c1tpXS50aXRsZV9jb250cm9scyB8fCBzZWxmLnJvd3NbaV0uYXJyYXlfY29udHJvbHM7XG5cbiAgICAvLyBCdXR0b25zIHRvIGRlbGV0ZSByb3csIG1vdmUgcm93IHVwLCBhbmQgbW92ZSByb3cgZG93blxuICAgIGlmKCFzZWxmLmhpZGVfZGVsZXRlX2J1dHRvbnMpIHtcbiAgICAgIHNlbGYucm93c1tpXS5kZWxldGVfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ2RlbGV0ZScsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9kZWxldGVfcm93X3RpdGxlJyxbc2VsZi5nZXRJdGVtVGl0bGUoKV0pKTsgLy8gUkVCXG4gICAgICBzZWxmLnJvd3NbaV0uZGVsZXRlX2J1dHRvbi5jbGFzc05hbWUgKz0gJyBkZWxldGUnO1xuICAgICAgc2VsZi5yb3dzW2ldLmRlbGV0ZV9idXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWknLGkpO1xuICAgICAgc2VsZi5yb3dzW2ldLmRlbGV0ZV9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWknKSoxO1xuXG4gICAgICAgIHZhciB2YWx1ZSA9IHNlbGYuZ2V0VmFsdWUoKTtcblxuICAgICAgICB2YXIgbmV3dmFsID0gW107XG4gICAgICAgIHZhciBuZXdfYWN0aXZlX3RhYiA9IG51bGw7XG4gICAgICAgICRlYWNoKHZhbHVlLGZ1bmN0aW9uKGoscm93KSB7XG4gICAgICAgICAgaWYoaj09PWkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBvbmUgd2UncmUgZGVsZXRpbmcgaXMgdGhlIGFjdGl2ZSB0YWJcbiAgICAgICAgICAgIGlmKHNlbGYucm93c1tqXS50YWIgPT09IHNlbGYuYWN0aXZlX3RhYikge1xuICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBuZXh0IHRhYiBhY3RpdmUgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgICAgICAgIC8vIE5vdGU6IHRoZSBuZXh0IHRhYiBpcyBnb2luZyB0byBiZSB0aGUgY3VycmVudCB0YWIgYWZ0ZXIgZGVsZXRpb25cbiAgICAgICAgICAgICAgaWYoc2VsZi5yb3dzW2orMV0pIG5ld19hY3RpdmVfdGFiID0gc2VsZi5yb3dzW2pdLnRhYjtcbiAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBtYWtlIHRoZSBwcmV2aW91cyB0YWIgYWN0aXZlIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgICBlbHNlIGlmKGopIG5ld19hY3RpdmVfdGFiID0gc2VsZi5yb3dzW2otMV0udGFiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47IC8vIElmIHRoaXMgaXMgdGhlIG9uZSB3ZSdyZSBkZWxldGluZ1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXd2YWwucHVzaChyb3cpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5zZXRWYWx1ZShuZXd2YWwpO1xuICAgICAgICBpZihuZXdfYWN0aXZlX3RhYikge1xuICAgICAgICAgIHNlbGYuYWN0aXZlX3RhYiA9IG5ld19hY3RpdmVfdGFiO1xuICAgICAgICAgIHNlbGYucmVmcmVzaFRhYnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYoY29udHJvbHNfaG9sZGVyKSB7XG4gICAgICAgIGNvbnRyb2xzX2hvbGRlci5hcHBlbmRDaGlsZChzZWxmLnJvd3NbaV0uZGVsZXRlX2J1dHRvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoaSAmJiAhc2VsZi5oaWRlX21vdmVfYnV0dG9ucykge1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmV1cF9idXR0b24gPSB0aGlzLmdldEJ1dHRvbignJywnbW92ZXVwJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX21vdmVfdXBfdGl0bGUnKSk7XG4gICAgICBzZWxmLnJvd3NbaV0ubW92ZXVwX2J1dHRvbi5jbGFzc05hbWUgKz0gJyBtb3ZldXAnO1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmV1cF9idXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWknLGkpO1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmV1cF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWknKSoxO1xuXG4gICAgICAgIGlmKGk8PTApIHJldHVybjtcbiAgICAgICAgdmFyIHJvd3MgPSBzZWxmLmdldFZhbHVlKCk7XG4gICAgICAgIHZhciB0bXAgPSByb3dzW2ktMV07XG4gICAgICAgIHJvd3NbaS0xXSA9IHJvd3NbaV07XG4gICAgICAgIHJvd3NbaV0gPSB0bXA7XG5cbiAgICAgICAgc2VsZi5zZXRWYWx1ZShyb3dzKTtcbiAgICAgICAgc2VsZi5hY3RpdmVfdGFiID0gc2VsZi5yb3dzW2ktMV0udGFiO1xuICAgICAgICBzZWxmLnJlZnJlc2hUYWJzKCk7XG5cbiAgICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZihjb250cm9sc19ob2xkZXIpIHtcbiAgICAgICAgY29udHJvbHNfaG9sZGVyLmFwcGVuZENoaWxkKHNlbGYucm93c1tpXS5tb3ZldXBfYnV0dG9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighc2VsZi5oaWRlX21vdmVfYnV0dG9ucykge1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbiA9IHRoaXMuZ2V0QnV0dG9uKCcnLCdtb3ZlZG93bicsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9tb3ZlX2Rvd25fdGl0bGUnKSk7XG4gICAgICBzZWxmLnJvd3NbaV0ubW92ZWRvd25fYnV0dG9uLmNsYXNzTmFtZSArPSAnIG1vdmVkb3duJztcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZlZG93bl9idXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWknLGkpO1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciBpID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaScpKjE7XG5cbiAgICAgICAgdmFyIHJvd3MgPSBzZWxmLmdldFZhbHVlKCk7XG4gICAgICAgIGlmKGk+PXJvd3MubGVuZ3RoLTEpIHJldHVybjtcbiAgICAgICAgdmFyIHRtcCA9IHJvd3NbaSsxXTtcbiAgICAgICAgcm93c1tpKzFdID0gcm93c1tpXTtcbiAgICAgICAgcm93c1tpXSA9IHRtcDtcblxuICAgICAgICBzZWxmLnNldFZhbHVlKHJvd3MpO1xuICAgICAgICBzZWxmLmFjdGl2ZV90YWIgPSBzZWxmLnJvd3NbaSsxXS50YWI7XG4gICAgICAgIHNlbGYucmVmcmVzaFRhYnMoKTtcbiAgICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZihjb250cm9sc19ob2xkZXIpIHtcbiAgICAgICAgY29udHJvbHNfaG9sZGVyLmFwcGVuZENoaWxkKHNlbGYucm93c1tpXS5tb3ZlZG93bl9idXR0b24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHZhbHVlKSBzZWxmLnJvd3NbaV0uc2V0VmFsdWUodmFsdWUsIGluaXRpYWwpO1xuICAgIHNlbGYucmVmcmVzaFRhYnMoKTtcbiAgfSxcbiAgYWRkQ29udHJvbHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgdGhpcy50b2dnbGVfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ2NvbGxhcHNlJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2NvbGxhcHNlJykpO1xuICAgIHRoaXMudGl0bGVfY29udHJvbHMuYXBwZW5kQ2hpbGQodGhpcy50b2dnbGVfYnV0dG9uKTtcbiAgICB2YXIgcm93X2hvbGRlcl9kaXNwbGF5ID0gc2VsZi5yb3dfaG9sZGVyLnN0eWxlLmRpc3BsYXk7XG4gICAgdmFyIGNvbnRyb2xzX2Rpc3BsYXkgPSBzZWxmLmNvbnRyb2xzLnN0eWxlLmRpc3BsYXk7XG4gICAgdGhpcy50b2dnbGVfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYoc2VsZi5jb2xsYXBzZWQpIHtcbiAgICAgICAgc2VsZi5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgaWYoc2VsZi5wYW5lbCkgc2VsZi5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIHNlbGYucm93X2hvbGRlci5zdHlsZS5kaXNwbGF5ID0gcm93X2hvbGRlcl9kaXNwbGF5O1xuICAgICAgICBpZihzZWxmLnRhYnNfaG9sZGVyKSBzZWxmLnRhYnNfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgc2VsZi5jb250cm9scy5zdHlsZS5kaXNwbGF5ID0gY29udHJvbHNfZGlzcGxheTtcbiAgICAgICAgc2VsZi5zZXRCdXR0b25UZXh0KHRoaXMsJycsJ2NvbGxhcHNlJyxzZWxmLnRyYW5zbGF0ZSgnYnV0dG9uX2NvbGxhcHNlJykpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbGYuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5yb3dfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmKHNlbGYudGFic19ob2xkZXIpIHNlbGYudGFic19ob2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZi5jb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZihzZWxmLnBhbmVsKSBzZWxmLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGYuc2V0QnV0dG9uVGV4dCh0aGlzLCcnLCdleHBhbmQnLHNlbGYudHJhbnNsYXRlKCdidXR0b25fZXhwYW5kJykpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgaXQgc2hvdWxkIHN0YXJ0IGNvbGxhcHNlZFxuICAgIGlmKHRoaXMub3B0aW9ucy5jb2xsYXBzZWQpIHtcbiAgICAgICR0cmlnZ2VyKHRoaXMudG9nZ2xlX2J1dHRvbiwnY2xpY2snKTtcbiAgICB9XG5cbiAgICAvLyBDb2xsYXBzZSBidXR0b24gZGlzYWJsZWRcbiAgICBpZih0aGlzLnNjaGVtYS5vcHRpb25zICYmIHR5cGVvZiB0aGlzLnNjaGVtYS5vcHRpb25zLmRpc2FibGVfY29sbGFwc2UgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmKHRoaXMuc2NoZW1hLm9wdGlvbnMuZGlzYWJsZV9jb2xsYXBzZSkgdGhpcy50b2dnbGVfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5qc29uZWRpdG9yLm9wdGlvbnMuZGlzYWJsZV9jb2xsYXBzZSkge1xuICAgICAgdGhpcy50b2dnbGVfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgLy8gQWRkIFwibmV3IHJvd1wiIGFuZCBcImRlbGV0ZSBsYXN0XCIgYnV0dG9ucyBiZWxvdyBlZGl0b3JcbiAgICB0aGlzLmFkZF9yb3dfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ2FkZCcsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9hZGRfcm93X3RpdGxlJyxbdGhpcy5nZXRJdGVtVGl0bGUoKV0pKTtcblxuICAgIHRoaXMuYWRkX3Jvd19idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB2YXIgaSA9IHNlbGYucm93cy5sZW5ndGg7XG4gICAgICBpZihzZWxmLnJvd19jYWNoZVtpXSkge1xuICAgICAgICBzZWxmLnJvd3NbaV0gPSBzZWxmLnJvd19jYWNoZVtpXTtcbiAgICAgICAgc2VsZi5yb3dzW2ldLnNldFZhbHVlKHNlbGYucm93c1tpXS5nZXREZWZhdWx0KCksIHRydWUpO1xuICAgICAgICBzZWxmLnJvd3NbaV0uY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgaWYoc2VsZi5yb3dzW2ldLnRhYikgc2VsZi5yb3dzW2ldLnRhYi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIHNlbGYucm93c1tpXS5yZWdpc3RlcigpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbGYuYWRkUm93KCk7XG4gICAgICB9XG4gICAgICBzZWxmLmFjdGl2ZV90YWIgPSBzZWxmLnJvd3NbaV0udGFiO1xuICAgICAgc2VsZi5yZWZyZXNoVGFicygpO1xuICAgICAgc2VsZi5yZWZyZXNoVmFsdWUoKTtcbiAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgfSk7XG4gICAgc2VsZi5jb250cm9scy5hcHBlbmRDaGlsZCh0aGlzLmFkZF9yb3dfYnV0dG9uKTtcblxuICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbiA9IHRoaXMuZ2V0QnV0dG9uKHRoaXMudHJhbnNsYXRlKCdidXR0b25fZGVsZXRlX2xhc3QnLFt0aGlzLmdldEl0ZW1UaXRsZSgpXSksJ2RlbGV0ZScsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9kZWxldGVfbGFzdF90aXRsZScsW3RoaXMuZ2V0SXRlbVRpdGxlKCldKSk7XG4gICAgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdmFyIHJvd3MgPSBzZWxmLmdldFZhbHVlKCk7XG5cbiAgICAgIHZhciBuZXdfYWN0aXZlX3RhYiA9IG51bGw7XG4gICAgICBpZihzZWxmLnJvd3MubGVuZ3RoID4gMSAmJiBzZWxmLnJvd3Nbc2VsZi5yb3dzLmxlbmd0aC0xXS50YWIgPT09IHNlbGYuYWN0aXZlX3RhYikgbmV3X2FjdGl2ZV90YWIgPSBzZWxmLnJvd3Nbc2VsZi5yb3dzLmxlbmd0aC0yXS50YWI7XG5cbiAgICAgIHJvd3MucG9wKCk7XG4gICAgICBzZWxmLnNldFZhbHVlKHJvd3MpO1xuICAgICAgaWYobmV3X2FjdGl2ZV90YWIpIHtcbiAgICAgICAgc2VsZi5hY3RpdmVfdGFiID0gbmV3X2FjdGl2ZV90YWI7XG4gICAgICAgIHNlbGYucmVmcmVzaFRhYnMoKTtcbiAgICAgIH1cbiAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgfSk7XG4gICAgc2VsZi5jb250cm9scy5hcHBlbmRDaGlsZCh0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24pO1xuXG4gICAgdGhpcy5yZW1vdmVfYWxsX3Jvd3NfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24odGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9kZWxldGVfYWxsJyksJ2RlbGV0ZScsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9kZWxldGVfYWxsX3RpdGxlJykpO1xuICAgIHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNlbGYuc2V0VmFsdWUoW10pO1xuICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICB9KTtcbiAgICBzZWxmLmNvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbik7XG5cbiAgICBpZihzZWxmLnRhYnMpIHtcbiAgICAgIHRoaXMuYWRkX3Jvd19idXR0b24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICB0aGlzLmFkZF9yb3dfYnV0dG9uLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIHRoaXMuYWRkX3Jvd19idXR0b24uc3R5bGUubWFyZ2luQm90dG9tID0gJzNweCc7XG5cbiAgICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbi5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uc3R5bGUubWFyZ2luQm90dG9tID0gJzNweCc7XG5cbiAgICAgIHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgIHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbi5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUubWFyZ2luQm90dG9tID0gJzNweCc7XG4gICAgfVxuICB9LFxuICBzaG93VmFsaWRhdGlvbkVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gR2V0IGFsbCB0aGUgZXJyb3JzIHRoYXQgcGVydGFpbiB0byB0aGlzIGVkaXRvclxuICAgIHZhciBteV9lcnJvcnMgPSBbXTtcbiAgICB2YXIgb3RoZXJfZXJyb3JzID0gW107XG4gICAgJGVhY2goZXJyb3JzLCBmdW5jdGlvbihpLGVycm9yKSB7XG4gICAgICBpZihlcnJvci5wYXRoID09PSBzZWxmLnBhdGgpIHtcbiAgICAgICAgbXlfZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG90aGVyX2Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNob3cgZXJyb3JzIGZvciB0aGlzIGVkaXRvclxuICAgIGlmKHRoaXMuZXJyb3JfaG9sZGVyKSB7XG4gICAgICBpZihteV9lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gW107XG4gICAgICAgIHRoaXMuZXJyb3JfaG9sZGVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmVycm9yX2hvbGRlci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICRlYWNoKG15X2Vycm9ycywgZnVuY3Rpb24oaSxlcnJvcikge1xuICAgICAgICAgIHNlbGYuZXJyb3JfaG9sZGVyLmFwcGVuZENoaWxkKHNlbGYudGhlbWUuZ2V0RXJyb3JNZXNzYWdlKGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBIaWRlIGVycm9yIGFyZWFcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yX2hvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNob3cgZXJyb3JzIGZvciBjaGlsZCBlZGl0b3JzXG4gICAgJGVhY2godGhpcy5yb3dzLCBmdW5jdGlvbihpLHJvdykge1xuICAgICAgcm93LnNob3dWYWxpZGF0aW9uRXJyb3JzKG90aGVyX2Vycm9ycyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnMudGFibGUgPSBKU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnMuYXJyYXkuZXh0ZW5kKHtcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYodGhpcy5yb3dzKSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yb3dzW2ldLnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9zdXBlcigpO1xuICAgIGlmKHRoaXMucm93cykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucm93c1tpXS51bnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oMTIsdGhpcy53aWR0aCksMyk7XG4gIH0sXG4gIHByZUJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbV9zY2hlbWEgPSB0aGlzLmpzb25lZGl0b3IuZXhwYW5kUmVmcyh0aGlzLnNjaGVtYS5pdGVtcyB8fCB7fSk7XG5cbiAgICB0aGlzLml0ZW1fdGl0bGUgPSBpdGVtX3NjaGVtYS50aXRsZSB8fCAncm93JztcbiAgICB0aGlzLml0ZW1fZGVmYXVsdCA9IGl0ZW1fc2NoZW1hW1wiZGVmYXVsdFwiXSB8fCBudWxsO1xuICAgIHRoaXMuaXRlbV9oYXNfY2hpbGRfZWRpdG9ycyA9IGl0ZW1fc2NoZW1hLnByb3BlcnRpZXMgfHwgaXRlbV9zY2hlbWEuaXRlbXM7XG4gICAgdGhpcy53aWR0aCA9IDEyO1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIGJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50YWJsZSA9IHRoaXMudGhlbWUuZ2V0VGFibGUoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlKTtcbiAgICB0aGlzLnRoZWFkID0gdGhpcy50aGVtZS5nZXRUYWJsZUhlYWQoKTtcbiAgICB0aGlzLnRhYmxlLmFwcGVuZENoaWxkKHRoaXMudGhlYWQpO1xuICAgIHRoaXMuaGVhZGVyX3JvdyA9IHRoaXMudGhlbWUuZ2V0VGFibGVSb3coKTtcbiAgICB0aGlzLnRoZWFkLmFwcGVuZENoaWxkKHRoaXMuaGVhZGVyX3Jvdyk7XG4gICAgdGhpcy5yb3dfaG9sZGVyID0gdGhpcy50aGVtZS5nZXRUYWJsZUJvZHkoKTtcbiAgICB0aGlzLnRhYmxlLmFwcGVuZENoaWxkKHRoaXMucm93X2hvbGRlcik7XG5cbiAgICAvLyBEZXRlcm1pbmUgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYXJyYXkgZWxlbWVudFxuICAgIHZhciB0bXAgPSB0aGlzLmdldEVsZW1lbnRFZGl0b3IoMCx0cnVlKTtcbiAgICB0aGlzLml0ZW1fZGVmYXVsdCA9IHRtcC5nZXREZWZhdWx0KCk7XG4gICAgdGhpcy53aWR0aCA9IHRtcC5nZXROdW1Db2x1bW5zKCkgKyAyO1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy5jb21wYWN0KSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy50aGVtZS5nZXRIZWFkZXIodGhpcy5nZXRUaXRsZSgpKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgICAgdGhpcy50aXRsZV9jb250cm9scyA9IHRoaXMudGhlbWUuZ2V0SGVhZGVyQnV0dG9uSG9sZGVyKCk7XG4gICAgICB0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMudGl0bGVfY29udHJvbHMpO1xuICAgICAgaWYodGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMudGhlbWUuZ2V0RGVzY3JpcHRpb24odGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFuZWwgPSB0aGlzLnRoZW1lLmdldEluZGVudGVkUGFuZWwoKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgICAgdGhpcy5lcnJvcl9ob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5lcnJvcl9ob2xkZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIH1cblxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50YWJsZSk7XG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMudGhlbWUuZ2V0QnV0dG9uSG9sZGVyKCk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzKTtcblxuICAgIGlmKHRoaXMuaXRlbV9oYXNfY2hpbGRfZWRpdG9ycykge1xuICAgICAgdmFyIGNlID0gdG1wLmdldENoaWxkRWRpdG9ycygpO1xuICAgICAgdmFyIG9yZGVyID0gdG1wLnByb3BlcnR5X29yZGVyIHx8IE9iamVjdC5rZXlzKGNlKTtcbiAgICAgIGZvcih2YXIgaT0wOyBpPG9yZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0aCA9IHNlbGYudGhlbWUuZ2V0VGFibGVIZWFkZXJDZWxsKGNlW29yZGVyW2ldXS5nZXRUaXRsZSgpKTtcbiAgICAgICAgaWYoY2Vbb3JkZXJbaV1dLm9wdGlvbnMuaGlkZGVuKSB0aC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzZWxmLmhlYWRlcl9yb3cuYXBwZW5kQ2hpbGQodGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNlbGYuaGVhZGVyX3Jvdy5hcHBlbmRDaGlsZChzZWxmLnRoZW1lLmdldFRhYmxlSGVhZGVyQ2VsbCh0aGlzLml0ZW1fdGl0bGUpKTtcbiAgICB9XG5cbiAgICB0bXAuZGVzdHJveSgpO1xuICAgIHRoaXMucm93X2hvbGRlci5pbm5lckhUTUwgPSAnJztcblxuICAgIC8vIFJvdyBDb250cm9scyBjb2x1bW5cbiAgICB0aGlzLmNvbnRyb2xzX2hlYWRlcl9jZWxsID0gc2VsZi50aGVtZS5nZXRUYWJsZUhlYWRlckNlbGwoXCIgXCIpO1xuICAgIHNlbGYuaGVhZGVyX3Jvdy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzX2hlYWRlcl9jZWxsKTtcblxuICAgIC8vIEFkZCBjb250cm9sc1xuICAgIHRoaXMuYWRkQ29udHJvbHMoKTtcbiAgfSxcbiAgb25DaGlsZEVkaXRvckNoYW5nZTogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBnZXRJdGVtRGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICRleHRlbmQoe30se1wiZGVmYXVsdFwiOnRoaXMuaXRlbV9kZWZhdWx0fSlbXCJkZWZhdWx0XCJdO1xuICB9LFxuICBnZXRJdGVtVGl0bGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1fdGl0bGU7XG4gIH0sXG4gIGdldEVsZW1lbnRFZGl0b3I6IGZ1bmN0aW9uKGksaWdub3JlKSB7XG4gICAgdmFyIHNjaGVtYV9jb3B5ID0gJGV4dGVuZCh7fSx0aGlzLnNjaGVtYS5pdGVtcyk7XG4gICAgdmFyIGVkaXRvciA9IHRoaXMuanNvbmVkaXRvci5nZXRFZGl0b3JDbGFzcyhzY2hlbWFfY29weSwgdGhpcy5qc29uZWRpdG9yKTtcbiAgICB2YXIgcm93ID0gdGhpcy5yb3dfaG9sZGVyLmFwcGVuZENoaWxkKHRoaXMudGhlbWUuZ2V0VGFibGVSb3coKSk7XG4gICAgdmFyIGhvbGRlciA9IHJvdztcbiAgICBpZighdGhpcy5pdGVtX2hhc19jaGlsZF9lZGl0b3JzKSB7XG4gICAgICBob2xkZXIgPSB0aGlzLnRoZW1lLmdldFRhYmxlQ2VsbCgpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGhvbGRlcik7XG4gICAgfVxuXG4gICAgdmFyIHJldCA9IHRoaXMuanNvbmVkaXRvci5jcmVhdGVFZGl0b3IoZWRpdG9yLHtcbiAgICAgIGpzb25lZGl0b3I6IHRoaXMuanNvbmVkaXRvcixcbiAgICAgIHNjaGVtYTogc2NoZW1hX2NvcHksXG4gICAgICBjb250YWluZXI6IGhvbGRlcixcbiAgICAgIHBhdGg6IHRoaXMucGF0aCsnLicraSxcbiAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICB0YWJsZV9yb3c6IHRydWVcbiAgICB9KTtcblxuICAgIHJldC5wcmVCdWlsZCgpO1xuICAgIGlmKCFpZ25vcmUpIHtcbiAgICAgIHJldC5idWlsZCgpO1xuICAgICAgcmV0LnBvc3RCdWlsZCgpO1xuXG4gICAgICByZXQuY29udHJvbHNfY2VsbCA9IHJvdy5hcHBlbmRDaGlsZCh0aGlzLnRoZW1lLmdldFRhYmxlQ2VsbCgpKTtcbiAgICAgIHJldC5yb3cgPSByb3c7XG4gICAgICByZXQudGFibGVfY29udHJvbHMgPSB0aGlzLnRoZW1lLmdldEJ1dHRvbkhvbGRlcigpO1xuICAgICAgcmV0LmNvbnRyb2xzX2NlbGwuYXBwZW5kQ2hpbGQocmV0LnRhYmxlX2NvbnRyb2xzKTtcbiAgICAgIHJldC50YWJsZV9jb250cm9scy5zdHlsZS5tYXJnaW4gPSAwO1xuICAgICAgcmV0LnRhYmxlX2NvbnRyb2xzLnN0eWxlLnBhZGRpbmcgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gICAgaWYodGhpcy50aXRsZSAmJiB0aGlzLnRpdGxlLnBhcmVudE5vZGUpIHRoaXMudGl0bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24ucGFyZW50Tm9kZSkgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIGlmKHRoaXMucm93X2hvbGRlciAmJiB0aGlzLnJvd19ob2xkZXIucGFyZW50Tm9kZSkgdGhpcy5yb3dfaG9sZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5yb3dfaG9sZGVyKTtcbiAgICBpZih0aGlzLnRhYmxlICYmIHRoaXMudGFibGUucGFyZW50Tm9kZSkgdGhpcy50YWJsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMudGFibGUpO1xuICAgIGlmKHRoaXMucGFuZWwgJiYgdGhpcy5wYW5lbC5wYXJlbnROb2RlKSB0aGlzLnBhbmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5wYW5lbCk7XG5cbiAgICB0aGlzLnJvd3MgPSB0aGlzLnRpdGxlID0gdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm93X2hvbGRlciA9IHRoaXMudGFibGUgPSB0aGlzLnBhbmVsID0gbnVsbDtcblxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgaW5pdGlhbCkge1xuICAgIC8vIFVwZGF0ZSB0aGUgYXJyYXkncyB2YWx1ZSwgYWRkaW5nL3JlbW92aW5nIHJvd3Mgd2hlbiBuZWNlc3NhcnlcbiAgICB2YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXG4gICAgLy8gTWFrZSBzdXJlIHZhbHVlIGhhcyBiZXR3ZWVuIG1pbkl0ZW1zIGFuZCBtYXhJdGVtcyBpdGVtcyBpbiBpdFxuICAgIGlmKHRoaXMuc2NoZW1hLm1pbkl0ZW1zKSB7XG4gICAgICB3aGlsZSh2YWx1ZS5sZW5ndGggPCB0aGlzLnNjaGVtYS5taW5JdGVtcykge1xuICAgICAgICB2YWx1ZS5wdXNoKHRoaXMuZ2V0SXRlbURlZmF1bHQoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMuc2NoZW1hLm1heEl0ZW1zICYmIHZhbHVlLmxlbmd0aCA+IHRoaXMuc2NoZW1hLm1heEl0ZW1zKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsdGhpcy5zY2hlbWEubWF4SXRlbXMpO1xuICAgIH1cblxuICAgIHZhciBzZXJpYWxpemVkID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmKHNlcmlhbGl6ZWQgPT09IHRoaXMuc2VyaWFsaXplZCkgcmV0dXJuO1xuXG4gICAgdmFyIG51bXJvd3NfY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICRlYWNoKHZhbHVlLGZ1bmN0aW9uKGksdmFsKSB7XG4gICAgICBpZihzZWxmLnJvd3NbaV0pIHtcbiAgICAgICAgLy8gVE9ETzogZG9uJ3Qgc2V0IHRoZSByb3cncyB2YWx1ZSBpZiBpdCBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICBzZWxmLnJvd3NbaV0uc2V0VmFsdWUodmFsKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZWxmLmFkZFJvdyh2YWwpO1xuICAgICAgICBudW1yb3dzX2NoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yKHZhciBqPXZhbHVlLmxlbmd0aDsgajxzZWxmLnJvd3MubGVuZ3RoOyBqKyspIHtcbiAgICAgIHZhciBob2xkZXIgPSBzZWxmLnJvd3Nbal0uY29udGFpbmVyO1xuICAgICAgaWYoIXNlbGYuaXRlbV9oYXNfY2hpbGRfZWRpdG9ycykge1xuICAgICAgICBzZWxmLnJvd3Nbal0ucm93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5yb3dzW2pdLnJvdyk7XG4gICAgICB9XG4gICAgICBzZWxmLnJvd3Nbal0uZGVzdHJveSgpO1xuICAgICAgaWYoaG9sZGVyLnBhcmVudE5vZGUpIGhvbGRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGhvbGRlcik7XG4gICAgICBzZWxmLnJvd3Nbal0gPSBudWxsO1xuICAgICAgbnVtcm93c19jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgc2VsZi5yb3dzID0gc2VsZi5yb3dzLnNsaWNlKDAsdmFsdWUubGVuZ3RoKTtcblxuICAgIHNlbGYucmVmcmVzaFZhbHVlKCk7XG4gICAgaWYobnVtcm93c19jaGFuZ2VkIHx8IGluaXRpYWwpIHNlbGYucmVmcmVzaFJvd0J1dHRvbnMoKTtcblxuICAgIHNlbGYub25DaGFuZ2UoKTtcblxuICAgIC8vIFRPRE86IHNvcnRhYmxlXG4gIH0sXG4gIHJlZnJlc2hSb3dCdXR0b25zOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBJZiB3ZSBjdXJyZW50bHkgaGF2ZSBtaW5JdGVtcyBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICB2YXIgbWluSXRlbXMgPSB0aGlzLnNjaGVtYS5taW5JdGVtcyAmJiB0aGlzLnNjaGVtYS5taW5JdGVtcyA+PSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgdmFyIG5lZWRfcm93X2J1dHRvbnMgPSBmYWxzZTtcbiAgICAkZWFjaCh0aGlzLnJvd3MsZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgICAgIC8vIEhpZGUgdGhlIG1vdmUgZG93biBidXR0b24gZm9yIHRoZSBsYXN0IHJvd1xuICAgICAgaWYoZWRpdG9yLm1vdmVkb3duX2J1dHRvbikge1xuICAgICAgICBpZihpID09PSBzZWxmLnJvd3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGVkaXRvci5tb3ZlZG93bl9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBuZWVkX3Jvd19idXR0b25zID0gdHJ1ZTtcbiAgICAgICAgICBlZGl0b3IubW92ZWRvd25fYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBIaWRlIHRoZSBkZWxldGUgYnV0dG9uIGlmIHdlIGhhdmUgbWluSXRlbXMgaXRlbXNcbiAgICAgIGlmKGVkaXRvci5kZWxldGVfYnV0dG9uKSB7XG4gICAgICAgIGlmKG1pbkl0ZW1zKSB7XG4gICAgICAgICAgZWRpdG9yLmRlbGV0ZV9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBuZWVkX3Jvd19idXR0b25zID0gdHJ1ZTtcbiAgICAgICAgICBlZGl0b3IuZGVsZXRlX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYoZWRpdG9yLm1vdmV1cF9idXR0b24pIHtcbiAgICAgICAgbmVlZF9yb3dfYnV0dG9ucyA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaG93L2hpZGUgY29udHJvbHMgY29sdW1uIGluIHRhYmxlXG4gICAgJGVhY2godGhpcy5yb3dzLGZ1bmN0aW9uKGksZWRpdG9yKSB7XG4gICAgICBpZihuZWVkX3Jvd19idXR0b25zKSB7XG4gICAgICAgIGVkaXRvci5jb250cm9sc19jZWxsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlZGl0b3IuY29udHJvbHNfY2VsbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKG5lZWRfcm93X2J1dHRvbnMpIHtcbiAgICAgIHRoaXMuY29udHJvbHNfaGVhZGVyX2NlbGwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuY29udHJvbHNfaGVhZGVyX2NlbGwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICB2YXIgY29udHJvbHNfbmVlZGVkID0gZmFsc2U7XG5cbiAgICBpZighdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5yZW1vdmVfYWxsX3Jvd3NfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLnRhYmxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy52YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMudGFibGUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgdGhpcy5yZW1vdmVfYWxsX3Jvd3NfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIC8vIElmIHRoZXJlIGFyZSBtaW5JdGVtcyBpdGVtcyBpbiB0aGUgYXJyYXksIG9yIGNvbmZpZ3VyZWQgdG8gaGlkZSB0aGUgZGVsZXRlX2xhc3Rfcm93IGJ1dHRvbiwgaGlkZSB0aGUgZGVsZXRlIGJ1dHRvbiBiZW5lYXRoIHRoZSByb3dzXG4gICAgICBpZihtaW5JdGVtcyB8fCB0aGlzLmhpZGVfZGVsZXRlX2xhc3Rfcm93X2J1dHRvbnMpIHtcbiAgICAgICAgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgY29udHJvbHNfbmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnRhYmxlLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgaWYobWluSXRlbXMgfHwgdGhpcy5oaWRlX2RlbGV0ZV9sYXN0X3Jvd19idXR0b25zKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZGVsZXRlX2xhc3Rfcm93X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGNvbnRyb2xzX25lZWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmKG1pbkl0ZW1zIHx8IHRoaXMuaGlkZV9kZWxldGVfYWxsX3Jvd3NfYnV0dG9ucykge1xuICAgICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBjb250cm9sc19uZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBtYXhJdGVtcyBpbiB0aGUgYXJyYXksIGhpZGUgdGhlIGFkZCBidXR0b24gYmVuZWF0aCB0aGUgcm93c1xuICAgIGlmKCh0aGlzLnNjaGVtYS5tYXhJdGVtcyAmJiB0aGlzLnNjaGVtYS5tYXhJdGVtcyA8PSB0aGlzLnJvd3MubGVuZ3RoKSB8fCB0aGlzLmhpZGVfYWRkX2J1dHRvbikge1xuICAgICAgdGhpcy5hZGRfcm93X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWRkX3Jvd19idXR0b24uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY29udHJvbHNfbmVlZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZighY29udHJvbHNfbmVlZGVkKSB7XG4gICAgICB0aGlzLmNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5jb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICB9LFxuICByZWZyZXNoVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnZhbHVlID0gW107XG5cbiAgICAkZWFjaCh0aGlzLnJvd3MsZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgICAgIC8vIEdldCB0aGUgdmFsdWUgZm9yIHRoaXMgZWRpdG9yXG4gICAgICBzZWxmLnZhbHVlW2ldID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zZXJpYWxpemVkID0gSlNPTi5zdHJpbmdpZnkodGhpcy52YWx1ZSk7XG4gIH0sXG4gIGFkZFJvdzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGkgPSB0aGlzLnJvd3MubGVuZ3RoO1xuXG4gICAgc2VsZi5yb3dzW2ldID0gdGhpcy5nZXRFbGVtZW50RWRpdG9yKGkpO1xuXG4gICAgdmFyIGNvbnRyb2xzX2hvbGRlciA9IHNlbGYucm93c1tpXS50YWJsZV9jb250cm9scztcblxuICAgIC8vIEJ1dHRvbnMgdG8gZGVsZXRlIHJvdywgbW92ZSByb3cgdXAsIGFuZCBtb3ZlIHJvdyBkb3duXG4gICAgaWYoIXRoaXMuaGlkZV9kZWxldGVfYnV0dG9ucykge1xuICAgICAgc2VsZi5yb3dzW2ldLmRlbGV0ZV9idXR0b24gPSB0aGlzLmdldEJ1dHRvbignJywnZGVsZXRlJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2RlbGV0ZV9yb3dfdGl0bGVfc2hvcnQnKSk7XG4gICAgICBzZWxmLnJvd3NbaV0uZGVsZXRlX2J1dHRvbi5jbGFzc05hbWUgKz0gJyBkZWxldGUnO1xuICAgICAgc2VsZi5yb3dzW2ldLmRlbGV0ZV9idXR0b24uc2V0QXR0cmlidXRlKCdkYXRhLWknLGkpO1xuICAgICAgc2VsZi5yb3dzW2ldLmRlbGV0ZV9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWknKSoxO1xuXG4gICAgICAgIHZhciB2YWx1ZSA9IHNlbGYuZ2V0VmFsdWUoKTtcblxuICAgICAgICB2YXIgbmV3dmFsID0gW107XG4gICAgICAgICRlYWNoKHZhbHVlLGZ1bmN0aW9uKGoscm93KSB7XG4gICAgICAgICAgaWYoaj09PWkpIHJldHVybjsgLy8gSWYgdGhpcyBpcyB0aGUgb25lIHdlJ3JlIGRlbGV0aW5nXG4gICAgICAgICAgbmV3dmFsLnB1c2gocm93KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuc2V0VmFsdWUobmV3dmFsKTtcbiAgICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29udHJvbHNfaG9sZGVyLmFwcGVuZENoaWxkKHNlbGYucm93c1tpXS5kZWxldGVfYnV0dG9uKTtcbiAgICB9XG5cblxuICAgIGlmKGkgJiYgIXRoaXMuaGlkZV9tb3ZlX2J1dHRvbnMpIHtcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZldXBfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ21vdmV1cCcsdGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9tb3ZlX3VwX3RpdGxlJykpO1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmV1cF9idXR0b24uY2xhc3NOYW1lICs9ICcgbW92ZXVwJztcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZldXBfYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pJyxpKTtcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZldXBfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIGkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1pJykqMTtcblxuICAgICAgICBpZihpPD0wKSByZXR1cm47XG4gICAgICAgIHZhciByb3dzID0gc2VsZi5nZXRWYWx1ZSgpO1xuICAgICAgICB2YXIgdG1wID0gcm93c1tpLTFdO1xuICAgICAgICByb3dzW2ktMV0gPSByb3dzW2ldO1xuICAgICAgICByb3dzW2ldID0gdG1wO1xuXG4gICAgICAgIHNlbGYuc2V0VmFsdWUocm93cyk7XG4gICAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRyb2xzX2hvbGRlci5hcHBlbmRDaGlsZChzZWxmLnJvd3NbaV0ubW92ZXVwX2J1dHRvbik7XG4gICAgfVxuXG4gICAgaWYoIXRoaXMuaGlkZV9tb3ZlX2J1dHRvbnMpIHtcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZlZG93bl9idXR0b24gPSB0aGlzLmdldEJ1dHRvbignJywnbW92ZWRvd24nLHRoaXMudHJhbnNsYXRlKCdidXR0b25fbW92ZV9kb3duX3RpdGxlJykpO1xuICAgICAgc2VsZi5yb3dzW2ldLm1vdmVkb3duX2J1dHRvbi5jbGFzc05hbWUgKz0gJyBtb3ZlZG93bic7XG4gICAgICBzZWxmLnJvd3NbaV0ubW92ZWRvd25fYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS1pJyxpKTtcbiAgICAgIHNlbGYucm93c1tpXS5tb3ZlZG93bl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgaSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWknKSoxO1xuICAgICAgICB2YXIgcm93cyA9IHNlbGYuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYoaT49cm93cy5sZW5ndGgtMSkgcmV0dXJuO1xuICAgICAgICB2YXIgdG1wID0gcm93c1tpKzFdO1xuICAgICAgICByb3dzW2krMV0gPSByb3dzW2ldO1xuICAgICAgICByb3dzW2ldID0gdG1wO1xuXG4gICAgICAgIHNlbGYuc2V0VmFsdWUocm93cyk7XG4gICAgICAgIHNlbGYub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRyb2xzX2hvbGRlci5hcHBlbmRDaGlsZChzZWxmLnJvd3NbaV0ubW92ZWRvd25fYnV0dG9uKTtcbiAgICB9XG5cbiAgICBpZih2YWx1ZSkgc2VsZi5yb3dzW2ldLnNldFZhbHVlKHZhbHVlKTtcbiAgfSxcbiAgYWRkQ29udHJvbHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgdGhpcy50b2dnbGVfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24oJycsJ2NvbGxhcHNlJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2NvbGxhcHNlJykpO1xuICAgIGlmKHRoaXMudGl0bGVfY29udHJvbHMpIHtcbiAgICAgIHRoaXMudGl0bGVfY29udHJvbHMuYXBwZW5kQ2hpbGQodGhpcy50b2dnbGVfYnV0dG9uKTtcbiAgICAgIHRoaXMudG9nZ2xlX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYoc2VsZi5jb2xsYXBzZWQpIHtcbiAgICAgICAgICBzZWxmLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYucGFuZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgIHNlbGYuc2V0QnV0dG9uVGV4dCh0aGlzLCcnLCdjb2xsYXBzZScsc2VsZi50cmFuc2xhdGUoJ2J1dHRvbl9jb2xsYXBzZScpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzZWxmLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgICAgc2VsZi5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHNlbGYuc2V0QnV0dG9uVGV4dCh0aGlzLCcnLCdleHBhbmQnLHNlbGYudHJhbnNsYXRlKCdidXR0b25fZXhwYW5kJykpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgaXQgc2hvdWxkIHN0YXJ0IGNvbGxhcHNlZFxuICAgICAgaWYodGhpcy5vcHRpb25zLmNvbGxhcHNlZCkge1xuICAgICAgICAkdHJpZ2dlcih0aGlzLnRvZ2dsZV9idXR0b24sJ2NsaWNrJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIENvbGxhcHNlIGJ1dHRvbiBkaXNhYmxlZFxuICAgICAgaWYodGhpcy5zY2hlbWEub3B0aW9ucyAmJiB0eXBlb2YgdGhpcy5zY2hlbWEub3B0aW9ucy5kaXNhYmxlX2NvbGxhcHNlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmKHRoaXMuc2NoZW1hLm9wdGlvbnMuZGlzYWJsZV9jb2xsYXBzZSkgdGhpcy50b2dnbGVfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKHRoaXMuanNvbmVkaXRvci5vcHRpb25zLmRpc2FibGVfY29sbGFwc2UpIHtcbiAgICAgICAgdGhpcy50b2dnbGVfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIFwibmV3IHJvd1wiIGFuZCBcImRlbGV0ZSBsYXN0XCIgYnV0dG9ucyBiZWxvdyBlZGl0b3JcbiAgICB0aGlzLmFkZF9yb3dfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24odGhpcy5nZXRJdGVtVGl0bGUoKSwnYWRkJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2FkZF9yb3dfdGl0bGUnLFt0aGlzLmdldEl0ZW1UaXRsZSgpXSkpO1xuICAgIHRoaXMuYWRkX3Jvd19idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHNlbGYuYWRkUm93KCk7XG4gICAgICBzZWxmLnJlZnJlc2hWYWx1ZSgpO1xuICAgICAgc2VsZi5yZWZyZXNoUm93QnV0dG9ucygpO1xuICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICB9KTtcbiAgICBzZWxmLmNvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMuYWRkX3Jvd19idXR0b24pO1xuXG4gICAgdGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uID0gdGhpcy5nZXRCdXR0b24odGhpcy50cmFuc2xhdGUoJ2J1dHRvbl9kZWxldGVfbGFzdCcsW3RoaXMuZ2V0SXRlbVRpdGxlKCldKSwnZGVsZXRlJyx0aGlzLnRyYW5zbGF0ZSgnYnV0dG9uX2RlbGV0ZV9sYXN0X3RpdGxlJyxbdGhpcy5nZXRJdGVtVGl0bGUoKV0pKTtcbiAgICB0aGlzLmRlbGV0ZV9sYXN0X3Jvd19idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHZhciByb3dzID0gc2VsZi5nZXRWYWx1ZSgpO1xuICAgICAgcm93cy5wb3AoKTtcbiAgICAgIHNlbGYuc2V0VmFsdWUocm93cyk7XG4gICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgIH0pO1xuICAgIHNlbGYuY29udHJvbHMuYXBwZW5kQ2hpbGQodGhpcy5kZWxldGVfbGFzdF9yb3dfYnV0dG9uKTtcblxuICAgIHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbiA9IHRoaXMuZ2V0QnV0dG9uKHRoaXMudHJhbnNsYXRlKCdidXR0b25fZGVsZXRlX2FsbCcpLCdkZWxldGUnLHRoaXMudHJhbnNsYXRlKCdidXR0b25fZGVsZXRlX2FsbF90aXRsZScpKTtcbiAgICB0aGlzLnJlbW92ZV9hbGxfcm93c19idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHNlbGYuc2V0VmFsdWUoW10pO1xuICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICB9KTtcbiAgICBzZWxmLmNvbnRyb2xzLmFwcGVuZENoaWxkKHRoaXMucmVtb3ZlX2FsbF9yb3dzX2J1dHRvbik7XG4gIH1cbn0pO1xuXG4vLyBNdWx0aXBsZSBFZGl0b3IgKGZvciB3aGVuIGB0eXBlYCBpcyBhbiBhcnJheSlcbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5tdWx0aXBsZSA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuZWRpdG9ycykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5lZGl0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKCF0aGlzLmVkaXRvcnNbaV0pIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmVkaXRvcnNbaV0udW5yZWdpc3RlcigpO1xuICAgICAgfVxuICAgICAgaWYodGhpcy5lZGl0b3JzW3RoaXMudHlwZV0pIHRoaXMuZWRpdG9yc1t0aGlzLnR5cGVdLnJlZ2lzdGVyKCk7XG4gICAgfVxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYodGhpcy5lZGl0b3JzKSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLmVkaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIXRoaXMuZWRpdG9yc1tpXSkgY29udGludWU7XG4gICAgICAgIHRoaXMuZWRpdG9yc1tpXS51bnJlZ2lzdGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5lZGl0b3JzW3RoaXMudHlwZV0pIHJldHVybiA0O1xuICAgIHJldHVybiBNYXRoLm1heCh0aGlzLmVkaXRvcnNbdGhpcy50eXBlXS5nZXROdW1Db2x1bW5zKCksNCk7XG4gIH0sXG4gIGVuYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5lZGl0b3JzKSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLmVkaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIXRoaXMuZWRpdG9yc1tpXSkgY29udGludWU7XG4gICAgICAgIHRoaXMuZWRpdG9yc1tpXS5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zd2l0Y2hlci5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuZWRpdG9ycykge1xuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5lZGl0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKCF0aGlzLmVkaXRvcnNbaV0pIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmVkaXRvcnNbaV0uZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN3aXRjaGVyLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBzd2l0Y2hFZGl0b3I6IGZ1bmN0aW9uKGkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZighdGhpcy5lZGl0b3JzW2ldKSB7XG4gICAgICB0aGlzLmJ1aWxkQ2hpbGRFZGl0b3IoaSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRfdmFsdWUgPSBzZWxmLmdldFZhbHVlKCk7XG5cbiAgICBzZWxmLnR5cGUgPSBpO1xuXG4gICAgc2VsZi5yZWdpc3RlcigpO1xuXG4gICAgJGVhY2goc2VsZi5lZGl0b3JzLGZ1bmN0aW9uKHR5cGUsZWRpdG9yKSB7XG4gICAgICBpZighZWRpdG9yKSByZXR1cm47XG4gICAgICBpZihzZWxmLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgaWYoc2VsZi5rZWVwX3ZhbHVlcykgZWRpdG9yLnNldFZhbHVlKGN1cnJlbnRfdmFsdWUsdHJ1ZSk7XG4gICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgfVxuICAgICAgZWxzZSBlZGl0b3IuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gICAgc2VsZi5yZWZyZXNoVmFsdWUoKTtcbiAgICBzZWxmLnJlZnJlc2hIZWFkZXJUZXh0KCk7XG4gIH0sXG4gIGJ1aWxkQ2hpbGRFZGl0b3I6IGZ1bmN0aW9uKGkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHR5cGUgPSB0aGlzLnR5cGVzW2ldO1xuICAgIHZhciBob2xkZXIgPSBzZWxmLnRoZW1lLmdldENoaWxkRWRpdG9ySG9sZGVyKCk7XG4gICAgc2VsZi5lZGl0b3JfaG9sZGVyLmFwcGVuZENoaWxkKGhvbGRlcik7XG5cbiAgICB2YXIgc2NoZW1hO1xuXG4gICAgaWYodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHNjaGVtYSA9ICRleHRlbmQoe30sc2VsZi5zY2hlbWEpO1xuICAgICAgc2NoZW1hLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHNjaGVtYSA9ICRleHRlbmQoe30sc2VsZi5zY2hlbWEsdHlwZSk7XG4gICAgICBzY2hlbWEgPSBzZWxmLmpzb25lZGl0b3IuZXhwYW5kUmVmcyhzY2hlbWEpO1xuXG4gICAgICAvLyBJZiB3ZSBuZWVkIHRvIG1lcmdlIGByZXF1aXJlZGAgYXJyYXlzXG4gICAgICBpZih0eXBlLnJlcXVpcmVkICYmIEFycmF5LmlzQXJyYXkodHlwZS5yZXF1aXJlZCkgJiYgc2VsZi5zY2hlbWEucmVxdWlyZWQgJiYgQXJyYXkuaXNBcnJheShzZWxmLnNjaGVtYS5yZXF1aXJlZCkpIHtcbiAgICAgICAgc2NoZW1hLnJlcXVpcmVkID0gc2VsZi5zY2hlbWEucmVxdWlyZWQuY29uY2F0KHR5cGUucmVxdWlyZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlZGl0b3IgPSBzZWxmLmpzb25lZGl0b3IuZ2V0RWRpdG9yQ2xhc3Moc2NoZW1hKTtcblxuICAgIHNlbGYuZWRpdG9yc1tpXSA9IHNlbGYuanNvbmVkaXRvci5jcmVhdGVFZGl0b3IoZWRpdG9yLHtcbiAgICAgIGpzb25lZGl0b3I6IHNlbGYuanNvbmVkaXRvcixcbiAgICAgIHNjaGVtYTogc2NoZW1hLFxuICAgICAgY29udGFpbmVyOiBob2xkZXIsXG4gICAgICBwYXRoOiBzZWxmLnBhdGgsXG4gICAgICBwYXJlbnQ6IHNlbGYsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0pO1xuICAgIHNlbGYuZWRpdG9yc1tpXS5wcmVCdWlsZCgpO1xuICAgIHNlbGYuZWRpdG9yc1tpXS5idWlsZCgpO1xuICAgIHNlbGYuZWRpdG9yc1tpXS5wb3N0QnVpbGQoKTtcblxuICAgIGlmKHNlbGYuZWRpdG9yc1tpXS5oZWFkZXIpIHNlbGYuZWRpdG9yc1tpXS5oZWFkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIHNlbGYuZWRpdG9yc1tpXS5vcHRpb24gPSBzZWxmLnN3aXRjaGVyX29wdGlvbnNbaV07XG5cbiAgICBob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlX2hlYWRlcl90ZXh0JyxmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucmVmcmVzaEhlYWRlclRleHQoKTtcbiAgICB9KTtcblxuICAgIGlmKGkgIT09IHNlbGYudHlwZSkgaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0sXG4gIHByZUJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnR5cGVzID0gW107XG4gICAgdGhpcy50eXBlID0gMDtcbiAgICB0aGlzLmVkaXRvcnMgPSBbXTtcbiAgICB0aGlzLnZhbGlkYXRvcnMgPSBbXTtcblxuICAgIHRoaXMua2VlcF92YWx1ZXMgPSB0cnVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy5rZWVwX29uZW9mX3ZhbHVlcyAhPT0gXCJ1bmRlZmluZWRcIikgdGhpcy5rZWVwX3ZhbHVlcyA9IHRoaXMuanNvbmVkaXRvci5vcHRpb25zLmtlZXBfb25lb2ZfdmFsdWVzO1xuICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMua2VlcF9vbmVvZl92YWx1ZXMgIT09IFwidW5kZWZpbmVkXCIpIHRoaXMua2VlcF92YWx1ZXMgPSB0aGlzLm9wdGlvbnMua2VlcF9vbmVvZl92YWx1ZXM7XG5cbiAgICBpZih0aGlzLnNjaGVtYS5vbmVPZikge1xuICAgICAgdGhpcy5vbmVPZiA9IHRydWU7XG4gICAgICB0aGlzLnR5cGVzID0gdGhpcy5zY2hlbWEub25lT2Y7XG4gICAgICBkZWxldGUgdGhpcy5zY2hlbWEub25lT2Y7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEuYW55T2YpIHtcbiAgICAgIHRoaXMuYW55T2YgPSB0cnVlO1xuICAgICAgdGhpcy50eXBlcyA9IHRoaXMuc2NoZW1hLmFueU9mO1xuICAgICAgZGVsZXRlIHRoaXMuc2NoZW1hLmFueU9mO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmKCF0aGlzLnNjaGVtYS50eXBlIHx8IHRoaXMuc2NoZW1hLnR5cGUgPT09IFwiYW55XCIpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IFsnc3RyaW5nJywnbnVtYmVyJywnaW50ZWdlcicsJ2Jvb2xlYW4nLCdvYmplY3QnLCdhcnJheScsJ251bGwnXTtcblxuICAgICAgICAvLyBJZiBhbnkgb2YgdGhlc2UgcHJpbWl0aXZlIHR5cGVzIGFyZSBkaXNhbGxvd2VkXG4gICAgICAgIGlmKHRoaXMuc2NoZW1hLmRpc2FsbG93KSB7XG4gICAgICAgICAgdmFyIGRpc2FsbG93ID0gdGhpcy5zY2hlbWEuZGlzYWxsb3c7XG4gICAgICAgICAgaWYodHlwZW9mIGRpc2FsbG93ICE9PSAnb2JqZWN0JyB8fCAhKEFycmF5LmlzQXJyYXkoZGlzYWxsb3cpKSkge1xuICAgICAgICAgICAgZGlzYWxsb3cgPSBbZGlzYWxsb3ddO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgYWxsb3dlZF90eXBlcyA9IFtdO1xuICAgICAgICAgICRlYWNoKHRoaXMudHlwZXMsZnVuY3Rpb24oaSx0eXBlKSB7XG4gICAgICAgICAgICBpZihkaXNhbGxvdy5pbmRleE9mKHR5cGUpID09PSAtMSkgYWxsb3dlZF90eXBlcy5wdXNoKHR5cGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMudHlwZXMgPSBhbGxvd2VkX3R5cGVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEudHlwZSkpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IHRoaXMuc2NoZW1hLnR5cGU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IFt0aGlzLnNjaGVtYS50eXBlXTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLnNjaGVtYS50eXBlO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheV90ZXh0ID0gdGhpcy5nZXREaXNwbGF5VGV4dCh0aGlzLnR5cGVzKTtcbiAgfSxcbiAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG5cbiAgICB0aGlzLmhlYWRlciA9IHRoaXMubGFiZWwgPSB0aGlzLnRoZW1lLmdldEZvcm1JbnB1dExhYmVsKHRoaXMuZ2V0VGl0bGUoKSk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5oZWFkZXIpO1xuXG4gICAgdGhpcy5zd2l0Y2hlciA9IHRoaXMudGhlbWUuZ2V0U3dpdGNoZXIodGhpcy5kaXNwbGF5X3RleHQpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN3aXRjaGVyKTtcbiAgICB0aGlzLnN3aXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgc2VsZi5zd2l0Y2hFZGl0b3Ioc2VsZi5kaXNwbGF5X3RleHQuaW5kZXhPZih0aGlzLnZhbHVlKSk7XG4gICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lZGl0b3JfaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yX2hvbGRlcik7XG5cblxuICAgIHZhciB2YWxpZGF0b3Jfb3B0aW9ucyA9IHt9O1xuICAgIGlmKHNlbGYuanNvbmVkaXRvci5vcHRpb25zLmN1c3RvbV92YWxpZGF0b3JzKSB7XG4gICAgICB2YWxpZGF0b3Jfb3B0aW9ucy5jdXN0b21fdmFsaWRhdG9ycyA9IHNlbGYuanNvbmVkaXRvci5vcHRpb25zLmN1c3RvbV92YWxpZGF0b3JzO1xuICAgIH1cblxuICAgIHRoaXMuc3dpdGNoZXJfb3B0aW9ucyA9IHRoaXMudGhlbWUuZ2V0U3dpdGNoZXJPcHRpb25zKHRoaXMuc3dpdGNoZXIpO1xuICAgICRlYWNoKHRoaXMudHlwZXMsZnVuY3Rpb24oaSx0eXBlKSB7XG4gICAgICBzZWxmLmVkaXRvcnNbaV0gPSBmYWxzZTtcblxuICAgICAgdmFyIHNjaGVtYTtcblxuICAgICAgaWYodHlwZW9mIHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgc2NoZW1hID0gJGV4dGVuZCh7fSxzZWxmLnNjaGVtYSk7XG4gICAgICAgIHNjaGVtYS50eXBlID0gdHlwZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzY2hlbWEgPSAkZXh0ZW5kKHt9LHNlbGYuc2NoZW1hLHR5cGUpO1xuXG4gICAgICAgIC8vIElmIHdlIG5lZWQgdG8gbWVyZ2UgYHJlcXVpcmVkYCBhcnJheXNcbiAgICAgICAgaWYodHlwZS5yZXF1aXJlZCAmJiBBcnJheS5pc0FycmF5KHR5cGUucmVxdWlyZWQpICYmIHNlbGYuc2NoZW1hLnJlcXVpcmVkICYmIEFycmF5LmlzQXJyYXkoc2VsZi5zY2hlbWEucmVxdWlyZWQpKSB7XG4gICAgICAgICAgc2NoZW1hLnJlcXVpcmVkID0gc2VsZi5zY2hlbWEucmVxdWlyZWQuY29uY2F0KHR5cGUucmVxdWlyZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYudmFsaWRhdG9yc1tpXSA9IG5ldyBKU09ORWRpdG9yLlZhbGlkYXRvcihzZWxmLmpzb25lZGl0b3Isc2NoZW1hLHZhbGlkYXRvcl9vcHRpb25zKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3dpdGNoRWRpdG9yKDApO1xuICB9LFxuICBvbkNoaWxkRWRpdG9yQ2hhbmdlOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICBpZih0aGlzLmVkaXRvcnNbdGhpcy50eXBlXSkge1xuICAgICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcbiAgICAgIHRoaXMucmVmcmVzaEhlYWRlclRleHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICByZWZyZXNoSGVhZGVyVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpc3BsYXlfdGV4dCA9IHRoaXMuZ2V0RGlzcGxheVRleHQodGhpcy50eXBlcyk7XG4gICAgJGVhY2godGhpcy5zd2l0Y2hlcl9vcHRpb25zLCBmdW5jdGlvbihpLG9wdGlvbikge1xuICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZGlzcGxheV90ZXh0W2ldO1xuICAgIH0pO1xuICB9LFxuICByZWZyZXNoVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmVkaXRvcnNbdGhpcy50eXBlXS5nZXRWYWx1ZSgpO1xuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsLGluaXRpYWwpIHtcbiAgICAvLyBEZXRlcm1pbmUgdHlwZSBieSBnZXR0aW5nIHRoZSBmaXJzdCBvbmUgdGhhdCB2YWxpZGF0ZXNcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgJGVhY2godGhpcy52YWxpZGF0b3JzLCBmdW5jdGlvbihpLHZhbGlkYXRvcikge1xuICAgICAgaWYoIXZhbGlkYXRvci52YWxpZGF0ZSh2YWwpLmxlbmd0aCkge1xuICAgICAgICBzZWxmLnR5cGUgPSBpO1xuICAgICAgICBzZWxmLnN3aXRjaGVyLnZhbHVlID0gc2VsZi5kaXNwbGF5X3RleHRbaV07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3dpdGNoRWRpdG9yKHRoaXMudHlwZSk7XG5cbiAgICB0aGlzLmVkaXRvcnNbdGhpcy50eXBlXS5zZXRWYWx1ZSh2YWwsaW5pdGlhbCk7XG5cbiAgICB0aGlzLnJlZnJlc2hWYWx1ZSgpO1xuICAgIHNlbGYub25DaGFuZ2UoKTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgJGVhY2godGhpcy5lZGl0b3JzLCBmdW5jdGlvbih0eXBlLGVkaXRvcikge1xuICAgICAgaWYoZWRpdG9yKSBlZGl0b3IuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGlmKHRoaXMuZWRpdG9yX2hvbGRlciAmJiB0aGlzLmVkaXRvcl9ob2xkZXIucGFyZW50Tm9kZSkgdGhpcy5lZGl0b3JfaG9sZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lZGl0b3JfaG9sZGVyKTtcbiAgICBpZih0aGlzLnN3aXRjaGVyICYmIHRoaXMuc3dpdGNoZXIucGFyZW50Tm9kZSkgdGhpcy5zd2l0Y2hlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3dpdGNoZXIpO1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIHNob3dWYWxpZGF0aW9uRXJyb3JzOiBmdW5jdGlvbihlcnJvcnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBvbmVPZiBhbmQgYW55T2YgZXJyb3IgcGF0aHMgbmVlZCB0byByZW1vdmUgdGhlIG9uZU9mW2ldIHBhcnQgYmVmb3JlIHBhc3NpbmcgdG8gY2hpbGQgZWRpdG9yc1xuICAgIGlmKHRoaXMub25lT2YgfHwgdGhpcy5hbnlPZikge1xuICAgICAgdmFyIGNoZWNrX3BhcnQgPSB0aGlzLm9uZU9mPyAnb25lT2YnIDogJ2FueU9mJztcbiAgICAgICRlYWNoKHRoaXMuZWRpdG9ycyxmdW5jdGlvbihpLGVkaXRvcikge1xuICAgICAgICBpZighZWRpdG9yKSByZXR1cm47XG4gICAgICAgIHZhciBjaGVjayA9IHNlbGYucGF0aCsnLicrY2hlY2tfcGFydCsnWycraSsnXSc7XG4gICAgICAgIHZhciBuZXdfZXJyb3JzID0gW107XG4gICAgICAgICRlYWNoKGVycm9ycywgZnVuY3Rpb24oaixlcnJvcikge1xuICAgICAgICAgIGlmKGVycm9yLnBhdGguc3Vic3RyKDAsY2hlY2subGVuZ3RoKT09PWNoZWNrKSB7XG4gICAgICAgICAgICB2YXIgbmV3X2Vycm9yID0gJGV4dGVuZCh7fSxlcnJvcik7XG4gICAgICAgICAgICBuZXdfZXJyb3IucGF0aCA9IHNlbGYucGF0aCtuZXdfZXJyb3IucGF0aC5zdWJzdHIoY2hlY2subGVuZ3RoKTtcbiAgICAgICAgICAgIG5ld19lcnJvcnMucHVzaChuZXdfZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRpdG9yLnNob3dWYWxpZGF0aW9uRXJyb3JzKG5ld19lcnJvcnMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJGVhY2godGhpcy5lZGl0b3JzLGZ1bmN0aW9uKHR5cGUsZWRpdG9yKSB7XG4gICAgICAgIGlmKCFlZGl0b3IpIHJldHVybjtcbiAgICAgICAgZWRpdG9yLnNob3dWYWxpZGF0aW9uRXJyb3JzKGVycm9ycyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBFbnVtIEVkaXRvciAodXNlZCBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzIHdpdGggZW51bWVyYXRlZCB2YWx1ZXMpXG5KU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnNbXCJlbnVtXCJdID0gSlNPTkVkaXRvci5BYnN0cmFjdEVkaXRvci5leHRlbmQoe1xuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gNDtcbiAgfSxcbiAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5oZWFkZXIgPSB0aGlzLmxhYmVsID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuXG4gICAgdGhpcy5vcHRpb25zLmVudW1fdGl0bGVzID0gdGhpcy5vcHRpb25zLmVudW1fdGl0bGVzIHx8IFtdO1xuXG4gICAgdGhpc1tcImVudW1cIl0gPSB0aGlzLnNjaGVtYVtcImVudW1cIl07XG4gICAgdGhpcy5zZWxlY3RlZCA9IDA7XG4gICAgdGhpcy5zZWxlY3Rfb3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuaHRtbF92YWx1ZXMgPSBbXTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmb3IodmFyIGk9MDsgaTx0aGlzW1wiZW51bVwiXS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zZWxlY3Rfb3B0aW9uc1tpXSA9IHRoaXMub3B0aW9ucy5lbnVtX3RpdGxlc1tpXSB8fCBcIlZhbHVlIFwiKyhpKzEpO1xuICAgICAgdGhpcy5odG1sX3ZhbHVlc1tpXSA9IHRoaXMuZ2V0SFRNTCh0aGlzW1wiZW51bVwiXVtpXSk7XG4gICAgfVxuXG4gICAgLy8gU3dpdGNoZXJcbiAgICB0aGlzLnN3aXRjaGVyID0gdGhpcy50aGVtZS5nZXRTd2l0Y2hlcih0aGlzLnNlbGVjdF9vcHRpb25zKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN3aXRjaGVyKTtcblxuICAgIC8vIERpc3BsYXkgYXJlYVxuICAgIHRoaXMuZGlzcGxheV9hcmVhID0gdGhpcy50aGVtZS5nZXRJbmRlbnRlZFBhbmVsKCk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5X2FyZWEpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmhpZGVfZGlzcGxheSkgdGhpcy5kaXNwbGF5X2FyZWEuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgdGhpcy5zd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYuc2VsZWN0X29wdGlvbnMuaW5kZXhPZih0aGlzLnZhbHVlKTtcbiAgICAgIHNlbGYudmFsdWUgPSBzZWxmW1wiZW51bVwiXVtzZWxmLnNlbGVjdGVkXTtcbiAgICAgIHNlbGYucmVmcmVzaFZhbHVlKCk7XG4gICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzW1wiZW51bVwiXVswXTtcbiAgICB0aGlzLnJlZnJlc2hWYWx1ZSgpO1xuXG4gICAgaWYodGhpc1tcImVudW1cIl0ubGVuZ3RoID09PSAxKSB0aGlzLnN3aXRjaGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0sXG4gIHJlZnJlc2hWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuc2VsZWN0ZWQgPSAtMTtcbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKTtcbiAgICAkZWFjaCh0aGlzW1wiZW51bVwiXSwgZnVuY3Rpb24oaSwgZWwpIHtcbiAgICAgIGlmKHN0cmluZ2lmaWVkID09PSBKU09OLnN0cmluZ2lmeShlbCkpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZCA9IGk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKHNlbGYuc2VsZWN0ZWQ8MCkge1xuICAgICAgc2VsZi5zZXRWYWx1ZShzZWxmW1wiZW51bVwiXVswXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zd2l0Y2hlci52YWx1ZSA9IHRoaXMuc2VsZWN0X29wdGlvbnNbdGhpcy5zZWxlY3RlZF07XG4gICAgdGhpcy5kaXNwbGF5X2FyZWEuaW5uZXJIVE1MID0gdGhpcy5odG1sX3ZhbHVlc1t0aGlzLnNlbGVjdGVkXTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5hbHdheXNfZGlzYWJsZWQpIHRoaXMuc3dpdGNoZXIuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN3aXRjaGVyLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBnZXRIVE1MOiBmdW5jdGlvbihlbCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmKGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJzxlbT5udWxsPC9lbT4nO1xuICAgIH1cbiAgICAvLyBBcnJheSBvciBPYmplY3RcbiAgICBlbHNlIGlmKHR5cGVvZiBlbCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgLy8gVE9ETzogdXNlIHRoZW1lXG4gICAgICB2YXIgcmV0ID0gJyc7XG5cbiAgICAgICRlYWNoKGVsLGZ1bmN0aW9uKGksY2hpbGQpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBzZWxmLmdldEhUTUwoY2hpbGQpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUga2V5cyB0byBvYmplY3QgY2hpbGRyZW5cbiAgICAgICAgaWYoIShBcnJheS5pc0FycmF5KGVsKSkpIHtcbiAgICAgICAgICAvLyBUT0RPOiB1c2UgdGhlbWVcbiAgICAgICAgICBodG1sID0gJzxkaXY+PGVtPicraSsnPC9lbT46ICcraHRtbCsnPC9kaXY+JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHVzZSB0aGVtZVxuICAgICAgICByZXQgKz0gJzxsaT4nK2h0bWwrJzwvbGk+JztcbiAgICAgIH0pO1xuXG4gICAgICBpZihBcnJheS5pc0FycmF5KGVsKSkgcmV0ID0gJzxvbD4nK3JldCsnPC9vbD4nO1xuICAgICAgZWxzZSByZXQgPSBcIjx1bCBzdHlsZT0nbWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MDtwYWRkaW5nLXRvcDowO3BhZGRpbmctYm90dG9tOjA7Jz5cIityZXQrJzwvdWw+JztcblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgLy8gQm9vbGVhblxuICAgIGVsc2UgaWYodHlwZW9mIGVsID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIGVsPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cbiAgICAvLyBTdHJpbmdcbiAgICBlbHNlIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIGVsLnJlcGxhY2UoLyYvZywnJmFtcDsnKS5yZXBsYWNlKC88L2csJyZsdDsnKS5yZXBsYWNlKC8+L2csJyZndDsnKTtcbiAgICB9XG4gICAgLy8gTnVtYmVyXG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZWw7XG4gICAgfVxuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsKSB7XG4gICAgaWYodGhpcy52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5yZWZyZXNoVmFsdWUoKTtcbiAgICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuZGlzcGxheV9hcmVhICYmIHRoaXMuZGlzcGxheV9hcmVhLnBhcmVudE5vZGUpIHRoaXMuZGlzcGxheV9hcmVhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kaXNwbGF5X2FyZWEpO1xuICAgIGlmKHRoaXMudGl0bGUgJiYgdGhpcy50aXRsZS5wYXJlbnROb2RlKSB0aGlzLnRpdGxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgaWYodGhpcy5zd2l0Y2hlciAmJiB0aGlzLnN3aXRjaGVyLnBhcmVudE5vZGUpIHRoaXMuc3dpdGNoZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN3aXRjaGVyKTtcblxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH1cbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnMuc2VsZWN0ID0gSlNPTkVkaXRvci5BYnN0cmFjdEVkaXRvci5leHRlbmQoe1xuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUsaW5pdGlhbCkge1xuICAgIHZhbHVlID0gdGhpcy50eXBlY2FzdCh2YWx1ZXx8JycpO1xuXG4gICAgLy8gU2FuaXRpemUgdmFsdWUgYmVmb3JlIHNldHRpbmcgaXRcbiAgICB2YXIgc2FuaXRpemVkID0gdmFsdWU7XG4gICAgaWYodGhpcy5lbnVtX3ZhbHVlcy5pbmRleE9mKHNhbml0aXplZCkgPCAwKSB7XG4gICAgICBzYW5pdGl6ZWQgPSB0aGlzLmVudW1fdmFsdWVzWzBdO1xuICAgIH1cblxuICAgIGlmKHRoaXMudmFsdWUgPT09IHNhbml0aXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB0aGlzLmVudW1fb3B0aW9uc1t0aGlzLmVudW1fdmFsdWVzLmluZGV4T2Yoc2FuaXRpemVkKV07XG4gICAgaWYodGhpcy5zZWxlY3QyKSB0aGlzLnNlbGVjdDIuc2VsZWN0MigndmFsJyx0aGlzLmlucHV0LnZhbHVlKTtcbiAgICB0aGlzLnZhbHVlID0gc2FuaXRpemVkO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsdGhpcy5mb3JtbmFtZSk7XG4gIH0sXG4gIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5lbnVtX29wdGlvbnMpIHJldHVybiAzO1xuICAgIHZhciBsb25nZXN0X3RleHQgPSB0aGlzLmdldFRpdGxlKCkubGVuZ3RoO1xuICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuZW51bV9vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb25nZXN0X3RleHQgPSBNYXRoLm1heChsb25nZXN0X3RleHQsdGhpcy5lbnVtX29wdGlvbnNbaV0ubGVuZ3RoKzQpO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4oMTIsTWF0aC5tYXgobG9uZ2VzdF90ZXh0LzcsMikpO1xuICB9LFxuICB0eXBlY2FzdDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZih0aGlzLnNjaGVtYS50eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuICEhdmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEudHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIDEqdmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEudHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlKjEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBcIlwiK3ZhbHVlO1xuICAgIH1cbiAgfSxcbiAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9LFxuICBwcmVCdWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuaW5wdXRfdHlwZSA9ICdzZWxlY3QnO1xuICAgIHRoaXMuZW51bV9vcHRpb25zID0gW107XG4gICAgdGhpcy5lbnVtX3ZhbHVlcyA9IFtdO1xuICAgIHRoaXMuZW51bV9kaXNwbGF5ID0gW107XG4gICAgdmFyIGk7XG5cbiAgICAvLyBFbnVtIG9wdGlvbnMgZW51bWVyYXRlZFxuICAgIGlmKHRoaXMuc2NoZW1hW1wiZW51bVwiXSkge1xuICAgICAgdmFyIGRpc3BsYXkgPSB0aGlzLnNjaGVtYS5vcHRpb25zICYmIHRoaXMuc2NoZW1hLm9wdGlvbnMuZW51bV90aXRsZXMgfHwgW107XG5cbiAgICAgICRlYWNoKHRoaXMuc2NoZW1hW1wiZW51bVwiXSxmdW5jdGlvbihpLG9wdGlvbikge1xuICAgICAgICBzZWxmLmVudW1fb3B0aW9uc1tpXSA9IFwiXCIrb3B0aW9uO1xuICAgICAgICBzZWxmLmVudW1fZGlzcGxheVtpXSA9IFwiXCIrKGRpc3BsYXlbaV0gfHwgb3B0aW9uKTtcbiAgICAgICAgc2VsZi5lbnVtX3ZhbHVlc1tpXSA9IHNlbGYudHlwZWNhc3Qob3B0aW9uKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighdGhpcy5pc1JlcXVpcmVkKCkpe1xuICAgICAgICBzZWxmLmVudW1fZGlzcGxheS51bnNoaWZ0KCcgJyk7XG4gICAgICAgIHNlbGYuZW51bV9vcHRpb25zLnVuc2hpZnQoJ3VuZGVmaW5lZCcpO1xuICAgICAgICBzZWxmLmVudW1fdmFsdWVzLnVuc2hpZnQodW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvLyBCb29sZWFuXG4gICAgZWxzZSBpZih0aGlzLnNjaGVtYS50eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgc2VsZi5lbnVtX2Rpc3BsYXkgPSB0aGlzLnNjaGVtYS5vcHRpb25zICYmIHRoaXMuc2NoZW1hLm9wdGlvbnMuZW51bV90aXRsZXMgfHwgWyd0cnVlJywnZmFsc2UnXTtcbiAgICAgIHNlbGYuZW51bV9vcHRpb25zID0gWycxJywnJ107XG4gICAgICBzZWxmLmVudW1fdmFsdWVzID0gW3RydWUsZmFsc2VdO1xuXG4gICAgICBpZighdGhpcy5pc1JlcXVpcmVkKCkpe1xuICAgICAgICBzZWxmLmVudW1fZGlzcGxheS51bnNoaWZ0KCcgJyk7XG4gICAgICAgIHNlbGYuZW51bV9vcHRpb25zLnVuc2hpZnQoJ3VuZGVmaW5lZCcpO1xuICAgICAgICBzZWxmLmVudW1fdmFsdWVzLnVuc2hpZnQodW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvLyBEeW5hbWljIEVudW1cbiAgICBlbHNlIGlmKHRoaXMuc2NoZW1hLmVudW1Tb3VyY2UpIHtcbiAgICAgIHRoaXMuZW51bVNvdXJjZSA9IFtdO1xuICAgICAgdGhpcy5lbnVtX2Rpc3BsYXkgPSBbXTtcbiAgICAgIHRoaXMuZW51bV9vcHRpb25zID0gW107XG4gICAgICB0aGlzLmVudW1fdmFsdWVzID0gW107XG5cbiAgICAgIC8vIFNob3J0Y3V0IGRlY2xhcmF0aW9uIGZvciB1c2luZyBhIHNpbmdsZSBhcnJheVxuICAgICAgaWYoIShBcnJheS5pc0FycmF5KHRoaXMuc2NoZW1hLmVudW1Tb3VyY2UpKSkge1xuICAgICAgICBpZih0aGlzLnNjaGVtYS5lbnVtVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmVudW1Tb3VyY2UgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5zY2hlbWEuZW51bVNvdXJjZSxcbiAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2NoZW1hLmVudW1WYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZm9yKGk9MDsgaTx0aGlzLnNjaGVtYS5lbnVtU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gU2hvcnRoYW5kIGZvciB3YXRjaGVkIHZhcmlhYmxlXG4gICAgICAgICAgaWYodHlwZW9mIHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXSA9IHtcbiAgICAgICAgICAgICAgc291cmNlOiB0aGlzLnNjaGVtYS5lbnVtU291cmNlW2ldXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYWtlIGEgY29weSBvZiB0aGUgc2NoZW1hXG4gICAgICAgICAgZWxzZSBpZighKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEuZW51bVNvdXJjZVtpXSkpKSB7XG4gICAgICAgICAgICB0aGlzLmVudW1Tb3VyY2VbaV0gPSAkZXh0ZW5kKHt9LHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXSA9IHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdywgZW51bVNvdXJjZSBpcyBhbiBhcnJheSBvZiBzb3VyY2VzXG4gICAgICAvLyBXYWxrIHRocm91Z2ggdGhpcyBhcnJheSBhbmQgZml4IHVwIHRoZSB2YWx1ZXNcbiAgICAgIGZvcihpPTA7IGk8dGhpcy5lbnVtU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHRoaXMuZW51bVNvdXJjZVtpXS52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXS52YWx1ZSA9IHRoaXMuanNvbmVkaXRvci5jb21waWxlVGVtcGxhdGUodGhpcy5lbnVtU291cmNlW2ldLnZhbHVlLCB0aGlzLnRlbXBsYXRlX2VuZ2luZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLnRpdGxlKSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlW2ldLnRpdGxlID0gdGhpcy5qc29uZWRpdG9yLmNvbXBpbGVUZW1wbGF0ZSh0aGlzLmVudW1Tb3VyY2VbaV0udGl0bGUsIHRoaXMudGVtcGxhdGVfZW5naW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVudW1Tb3VyY2VbaV0uZmlsdGVyKSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlW2ldLmZpbHRlciA9IHRoaXMuanNvbmVkaXRvci5jb21waWxlVGVtcGxhdGUodGhpcy5lbnVtU291cmNlW2ldLmZpbHRlciwgdGhpcy50ZW1wbGF0ZV9lbmdpbmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE90aGVyLCBub3Qgc3VwcG9ydGVkXG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBcIidzZWxlY3QnIGVkaXRvciByZXF1aXJlcyB0aGUgZW51bSBwcm9wZXJ0eSB0byBiZSBzZXQuXCI7XG4gICAgfVxuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5oZWFkZXIgPSB0aGlzLmxhYmVsID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIGlmKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKSB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXREZXNjcmlwdGlvbih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbik7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lICs9ICcgY29tcGFjdCc7XG5cbiAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRTZWxlY3RJbnB1dCh0aGlzLmVudW1fb3B0aW9ucyk7XG4gICAgdGhpcy50aGVtZS5zZXRTZWxlY3RPcHRpb25zKHRoaXMuaW5wdXQsdGhpcy5lbnVtX29wdGlvbnMsdGhpcy5lbnVtX2Rpc3BsYXkpO1xuXG4gICAgaWYodGhpcy5zY2hlbWEucmVhZE9ubHkgfHwgdGhpcy5zY2hlbWEucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuYWx3YXlzX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgc2VsZi5vbklucHV0Q2hhbmdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLnRoZW1lLmdldEZvcm1Db250cm9sKHRoaXMubGFiZWwsIHRoaXMuaW5wdXQsIHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbCk7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5lbnVtX3ZhbHVlc1swXTtcbiAgfSxcbiAgb25JbnB1dENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbCA9IHRoaXMuaW5wdXQudmFsdWU7XG5cbiAgICB2YXIgbmV3X3ZhbDtcbiAgICAvLyBJbnZhbGlkIG9wdGlvbiwgdXNlIGZpcnN0IG9wdGlvbiBpbnN0ZWFkXG4gICAgaWYodGhpcy5lbnVtX29wdGlvbnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgbmV3X3ZhbCA9IHRoaXMuZW51bV92YWx1ZXNbMF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbmV3X3ZhbCA9IHRoaXMuZW51bV92YWx1ZXNbdGhpcy5lbnVtX29wdGlvbnMuaW5kZXhPZih2YWwpXTtcbiAgICB9XG5cbiAgICAvLyBJZiB2YWxpZCBoYXNuJ3QgY2hhbmdlZFxuICAgIGlmKG5ld192YWwgPT09IHRoaXMudmFsdWUpIHJldHVybjtcblxuICAgIC8vIFN0b3JlIG5ldyB2YWx1ZSBhbmQgcHJvcG9nYXRlIGNoYW5nZSBldmVudFxuICAgIHRoaXMudmFsdWUgPSBuZXdfdmFsO1xuICAgIHRoaXMub25DaGFuZ2UodHJ1ZSk7XG4gIH0sXG4gIHNldHVwU2VsZWN0MjogZnVuY3Rpb24oKSB7XG4gICAgLy8gSWYgdGhlIFNlbGVjdDIgbGlicmFyeSBpcyBsb2FkZWQgdXNlIGl0IHdoZW4gd2UgaGF2ZSBsb3RzIG9mIGl0ZW1zXG4gICAgaWYod2luZG93LmpRdWVyeSAmJiB3aW5kb3cualF1ZXJ5LmZuICYmIHdpbmRvdy5qUXVlcnkuZm4uc2VsZWN0MiAmJiAodGhpcy5lbnVtX29wdGlvbnMubGVuZ3RoID4gMiB8fCAodGhpcy5lbnVtX29wdGlvbnMubGVuZ3RoICYmIHRoaXMuZW51bVNvdXJjZSkpKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9ICRleHRlbmQoe30sSlNPTkVkaXRvci5wbHVnaW5zLnNlbGVjdDIpO1xuICAgICAgaWYodGhpcy5zY2hlbWEub3B0aW9ucyAmJiB0aGlzLnNjaGVtYS5vcHRpb25zLnNlbGVjdDJfb3B0aW9ucykgb3B0aW9ucyA9ICRleHRlbmQob3B0aW9ucyx0aGlzLnNjaGVtYS5vcHRpb25zLnNlbGVjdDJfb3B0aW9ucyk7XG4gICAgICB0aGlzLnNlbGVjdDIgPSB3aW5kb3cualF1ZXJ5KHRoaXMuaW5wdXQpLnNlbGVjdDIob3B0aW9ucyk7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB0aGlzLnNlbGVjdDIub24oJ3NlbGVjdDItYmx1cicsZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaW5wdXQudmFsdWUgPSBzZWxmLnNlbGVjdDIuc2VsZWN0MigndmFsJyk7XG4gICAgICAgIHNlbGYub25JbnB1dENoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNlbGVjdDIub24oJ2NoYW5nZScsZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaW5wdXQudmFsdWUgPSBzZWxmLnNlbGVjdDIuc2VsZWN0MigndmFsJyk7XG4gICAgICAgIHNlbGYub25JbnB1dENoYW5nZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3QyID0gbnVsbDtcbiAgICB9XG4gIH0sXG4gIHBvc3RCdWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICB0aGlzLnRoZW1lLmFmdGVySW5wdXRSZWFkeSh0aGlzLmlucHV0KTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9LFxuICBvbldhdGNoZWRGaWVsZENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCB2YXJzLCBqO1xuXG4gICAgLy8gSWYgdGhpcyBlZGl0b3IgdXNlcyBhIGR5bmFtaWMgc2VsZWN0IGJveFxuICAgIGlmKHRoaXMuZW51bVNvdXJjZSkge1xuICAgICAgdmFycyA9IHRoaXMuZ2V0V2F0Y2hlZEZpZWxkVmFsdWVzKCk7XG4gICAgICB2YXIgc2VsZWN0X29wdGlvbnMgPSBbXTtcbiAgICAgIHZhciBzZWxlY3RfdGl0bGVzID0gW107XG5cbiAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuZW51bVNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBDb25zdGFudCB2YWx1ZXNcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmVudW1Tb3VyY2VbaV0pKSB7XG4gICAgICAgICAgc2VsZWN0X29wdGlvbnMgPSBzZWxlY3Rfb3B0aW9ucy5jb25jYXQodGhpcy5lbnVtU291cmNlW2ldKTtcbiAgICAgICAgICBzZWxlY3RfdGl0bGVzID0gc2VsZWN0X3RpdGxlcy5jb25jYXQodGhpcy5lbnVtU291cmNlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgICAvLyBTdGF0aWMgbGlzdCBvZiBpdGVtc1xuICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5lbnVtU291cmNlW2ldLnNvdXJjZSkpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gdGhpcy5lbnVtU291cmNlW2ldLnNvdXJjZTtcbiAgICAgICAgICAvLyBBIHdhdGNoZWQgZmllbGRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbXMgPSB2YXJzW3RoaXMuZW51bVNvdXJjZVtpXS5zb3VyY2VdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKGl0ZW1zKSB7XG4gICAgICAgICAgICAvLyBPbmx5IHVzZSBhIHByZWRlZmluZWQgcGFydCBvZiB0aGUgYXJyYXlcbiAgICAgICAgICAgIGlmKHRoaXMuZW51bVNvdXJjZVtpXS5zbGljZSkge1xuICAgICAgICAgICAgICBpdGVtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShpdGVtcyx0aGlzLmVudW1Tb3VyY2VbaV0uc2xpY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmlsdGVyIHRoZSBpdGVtc1xuICAgICAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLmZpbHRlcikge1xuICAgICAgICAgICAgICB2YXIgbmV3X2l0ZW1zID0gW107XG4gICAgICAgICAgICAgIGZvcihqPTA7IGo8aXRlbXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVudW1Tb3VyY2VbaV0uZmlsdGVyKHtpOmosaXRlbTppdGVtc1tqXSx3YXRjaGVkOnZhcnN9KSkgbmV3X2l0ZW1zLnB1c2goaXRlbXNbal0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGl0ZW1zID0gbmV3X2l0ZW1zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXRlbV90aXRsZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBpdGVtX3ZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGo9MDsgajxpdGVtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2pdO1xuXG4gICAgICAgICAgICAgIC8vIFJlbmRlcmVkIHZhbHVlXG4gICAgICAgICAgICAgIGlmKHRoaXMuZW51bVNvdXJjZVtpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGl0ZW1fdmFsdWVzW2pdID0gdGhpcy5lbnVtU291cmNlW2ldLnZhbHVlKHtcbiAgICAgICAgICAgICAgICAgIGk6IGosXG4gICAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gVXNlIHZhbHVlIGRpcmVjdGx5XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1fdmFsdWVzW2pdID0gaXRlbXNbal07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBSZW5kZXJlZCB0aXRsZVxuICAgICAgICAgICAgICBpZih0aGlzLmVudW1Tb3VyY2VbaV0udGl0bGUpIHtcbiAgICAgICAgICAgICAgICBpdGVtX3RpdGxlc1tqXSA9IHRoaXMuZW51bVNvdXJjZVtpXS50aXRsZSh7XG4gICAgICAgICAgICAgICAgICBpOiBqLFxuICAgICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFVzZSB2YWx1ZSBhcyB0aGUgdGl0bGUgYWxzb1xuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtX3RpdGxlc1tqXSA9IGl0ZW1fdmFsdWVzW2pdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IHNvcnRcblxuICAgICAgICAgICAgc2VsZWN0X29wdGlvbnMgPSBzZWxlY3Rfb3B0aW9ucy5jb25jYXQoaXRlbV92YWx1ZXMpO1xuICAgICAgICAgICAgc2VsZWN0X3RpdGxlcyA9IHNlbGVjdF90aXRsZXMuY29uY2F0KGl0ZW1fdGl0bGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHByZXZfdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICB0aGlzLnRoZW1lLnNldFNlbGVjdE9wdGlvbnModGhpcy5pbnB1dCwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF90aXRsZXMpO1xuICAgICAgdGhpcy5lbnVtX29wdGlvbnMgPSBzZWxlY3Rfb3B0aW9ucztcbiAgICAgIHRoaXMuZW51bV9kaXNwbGF5ID0gc2VsZWN0X3RpdGxlcztcbiAgICAgIHRoaXMuZW51bV92YWx1ZXMgPSBzZWxlY3Rfb3B0aW9ucztcblxuICAgICAgaWYodGhpcy5zZWxlY3QyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0Mi5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBwcmV2aW91cyB2YWx1ZSBpcyBzdGlsbCBpbiB0aGUgbmV3IHNlbGVjdCBvcHRpb25zLCBzdGljayB3aXRoIGl0XG4gICAgICBpZihzZWxlY3Rfb3B0aW9ucy5pbmRleE9mKHByZXZfdmFsdWUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gcHJldl92YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHByZXZfdmFsdWU7XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UsIHNldCB0aGUgdmFsdWUgdG8gdGhlIGZpcnN0IHNlbGVjdCBvcHRpb25cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gc2VsZWN0X29wdGlvbnNbMF07XG4gICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3Rfb3B0aW9uc1swXSB8fCBcIlwiO1xuICAgICAgICBpZih0aGlzLnBhcmVudCkgdGhpcy5wYXJlbnQub25DaGlsZEVkaXRvckNoYW5nZSh0aGlzKTtcbiAgICAgICAgZWxzZSB0aGlzLmpzb25lZGl0b3Iub25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5qc29uZWRpdG9yLm5vdGlmeVdhdGNoZXJzKHRoaXMucGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0dXBTZWxlY3QyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5hbHdheXNfZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGlmKHRoaXMuc2VsZWN0MikgdGhpcy5zZWxlY3QyLnNlbGVjdDIoXCJlbmFibGVcIix0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgaWYodGhpcy5zZWxlY3QyKSB0aGlzLnNlbGVjdDIuc2VsZWN0MihcImVuYWJsZVwiLGZhbHNlKTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmxhYmVsICYmIHRoaXMubGFiZWwucGFyZW50Tm9kZSkgdGhpcy5sYWJlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubGFiZWwpO1xuICAgIGlmKHRoaXMuZGVzY3JpcHRpb24gJiYgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlKSB0aGlzLmRlc2NyaXB0aW9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgaWYodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LnBhcmVudE5vZGUpIHRoaXMuaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmlucHV0KTtcbiAgICBpZih0aGlzLnNlbGVjdDIpIHtcbiAgICAgIHRoaXMuc2VsZWN0Mi5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgICB0aGlzLnNlbGVjdDIgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH1cbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmVkaXRvcnMuc2VsZWN0aXplID0gSlNPTkVkaXRvci5BYnN0cmFjdEVkaXRvci5leHRlbmQoe1xuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUsaW5pdGlhbCkge1xuICAgIHZhbHVlID0gdGhpcy50eXBlY2FzdCh2YWx1ZXx8JycpO1xuXG4gICAgLy8gU2FuaXRpemUgdmFsdWUgYmVmb3JlIHNldHRpbmcgaXRcbiAgICB2YXIgc2FuaXRpemVkID0gdmFsdWU7XG4gICAgaWYodGhpcy5lbnVtX3ZhbHVlcy5pbmRleE9mKHNhbml0aXplZCkgPCAwKSB7XG4gICAgICBzYW5pdGl6ZWQgPSB0aGlzLmVudW1fdmFsdWVzWzBdO1xuICAgIH1cblxuICAgIGlmKHRoaXMudmFsdWUgPT09IHNhbml0aXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB0aGlzLmVudW1fb3B0aW9uc1t0aGlzLmVudW1fdmFsdWVzLmluZGV4T2Yoc2FuaXRpemVkKV07XG5cbiAgICBpZih0aGlzLnNlbGVjdGl6ZSkge1xuICAgICAgdGhpcy5zZWxlY3RpemVbMF0uc2VsZWN0aXplLmFkZEl0ZW0oc2FuaXRpemVkKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gc2FuaXRpemVkO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsdGhpcy5mb3JtbmFtZSk7XG4gIH0sXG4gIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5lbnVtX29wdGlvbnMpIHJldHVybiAzO1xuICAgIHZhciBsb25nZXN0X3RleHQgPSB0aGlzLmdldFRpdGxlKCkubGVuZ3RoO1xuICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuZW51bV9vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb25nZXN0X3RleHQgPSBNYXRoLm1heChsb25nZXN0X3RleHQsdGhpcy5lbnVtX29wdGlvbnNbaV0ubGVuZ3RoKzQpO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4oMTIsTWF0aC5tYXgobG9uZ2VzdF90ZXh0LzcsMikpO1xuICB9LFxuICB0eXBlY2FzdDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZih0aGlzLnNjaGVtYS50eXBlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuICEhdmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEudHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIDEqdmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5zY2hlbWEudHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbHVlKjEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBcIlwiK3ZhbHVlO1xuICAgIH1cbiAgfSxcbiAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9LFxuICBwcmVCdWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuaW5wdXRfdHlwZSA9ICdzZWxlY3QnO1xuICAgIHRoaXMuZW51bV9vcHRpb25zID0gW107XG4gICAgdGhpcy5lbnVtX3ZhbHVlcyA9IFtdO1xuICAgIHRoaXMuZW51bV9kaXNwbGF5ID0gW107XG4gICAgdmFyIGk7XG5cbiAgICAvLyBFbnVtIG9wdGlvbnMgZW51bWVyYXRlZFxuICAgIGlmKHRoaXMuc2NoZW1hLmVudW0pIHtcbiAgICAgIHZhciBkaXNwbGF5ID0gdGhpcy5zY2hlbWEub3B0aW9ucyAmJiB0aGlzLnNjaGVtYS5vcHRpb25zLmVudW1fdGl0bGVzIHx8IFtdO1xuXG4gICAgICAkZWFjaCh0aGlzLnNjaGVtYS5lbnVtLGZ1bmN0aW9uKGksb3B0aW9uKSB7XG4gICAgICAgIHNlbGYuZW51bV9vcHRpb25zW2ldID0gXCJcIitvcHRpb247XG4gICAgICAgIHNlbGYuZW51bV9kaXNwbGF5W2ldID0gXCJcIisoZGlzcGxheVtpXSB8fCBvcHRpb24pO1xuICAgICAgICBzZWxmLmVudW1fdmFsdWVzW2ldID0gc2VsZi50eXBlY2FzdChvcHRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEJvb2xlYW5cbiAgICBlbHNlIGlmKHRoaXMuc2NoZW1hLnR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBzZWxmLmVudW1fZGlzcGxheSA9IHRoaXMuc2NoZW1hLm9wdGlvbnMgJiYgdGhpcy5zY2hlbWEub3B0aW9ucy5lbnVtX3RpdGxlcyB8fCBbJ3RydWUnLCdmYWxzZSddO1xuICAgICAgc2VsZi5lbnVtX29wdGlvbnMgPSBbJzEnLCcwJ107XG4gICAgICBzZWxmLmVudW1fdmFsdWVzID0gW3RydWUsZmFsc2VdO1xuICAgIH1cbiAgICAvLyBEeW5hbWljIEVudW1cbiAgICBlbHNlIGlmKHRoaXMuc2NoZW1hLmVudW1Tb3VyY2UpIHtcbiAgICAgIHRoaXMuZW51bVNvdXJjZSA9IFtdO1xuICAgICAgdGhpcy5lbnVtX2Rpc3BsYXkgPSBbXTtcbiAgICAgIHRoaXMuZW51bV9vcHRpb25zID0gW107XG4gICAgICB0aGlzLmVudW1fdmFsdWVzID0gW107XG5cbiAgICAgIC8vIFNob3J0Y3V0IGRlY2xhcmF0aW9uIGZvciB1c2luZyBhIHNpbmdsZSBhcnJheVxuICAgICAgaWYoIShBcnJheS5pc0FycmF5KHRoaXMuc2NoZW1hLmVudW1Tb3VyY2UpKSkge1xuICAgICAgICBpZih0aGlzLnNjaGVtYS5lbnVtVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmVudW1Tb3VyY2UgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5zY2hlbWEuZW51bVNvdXJjZSxcbiAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2NoZW1hLmVudW1WYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZm9yKGk9MDsgaTx0aGlzLnNjaGVtYS5lbnVtU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gU2hvcnRoYW5kIGZvciB3YXRjaGVkIHZhcmlhYmxlXG4gICAgICAgICAgaWYodHlwZW9mIHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXSA9IHtcbiAgICAgICAgICAgICAgc291cmNlOiB0aGlzLnNjaGVtYS5lbnVtU291cmNlW2ldXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYWtlIGEgY29weSBvZiB0aGUgc2NoZW1hXG4gICAgICAgICAgZWxzZSBpZighKEFycmF5LmlzQXJyYXkodGhpcy5zY2hlbWEuZW51bVNvdXJjZVtpXSkpKSB7XG4gICAgICAgICAgICB0aGlzLmVudW1Tb3VyY2VbaV0gPSAkZXh0ZW5kKHt9LHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXSA9IHRoaXMuc2NoZW1hLmVudW1Tb3VyY2VbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdywgZW51bVNvdXJjZSBpcyBhbiBhcnJheSBvZiBzb3VyY2VzXG4gICAgICAvLyBXYWxrIHRocm91Z2ggdGhpcyBhcnJheSBhbmQgZml4IHVwIHRoZSB2YWx1ZXNcbiAgICAgIGZvcihpPTA7IGk8dGhpcy5lbnVtU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHRoaXMuZW51bVNvdXJjZVtpXS52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZW51bVNvdXJjZVtpXS52YWx1ZSA9IHRoaXMuanNvbmVkaXRvci5jb21waWxlVGVtcGxhdGUodGhpcy5lbnVtU291cmNlW2ldLnZhbHVlLCB0aGlzLnRlbXBsYXRlX2VuZ2luZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLnRpdGxlKSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlW2ldLnRpdGxlID0gdGhpcy5qc29uZWRpdG9yLmNvbXBpbGVUZW1wbGF0ZSh0aGlzLmVudW1Tb3VyY2VbaV0udGl0bGUsIHRoaXMudGVtcGxhdGVfZW5naW5lKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmVudW1Tb3VyY2VbaV0uZmlsdGVyKSB7XG4gICAgICAgICAgdGhpcy5lbnVtU291cmNlW2ldLmZpbHRlciA9IHRoaXMuanNvbmVkaXRvci5jb21waWxlVGVtcGxhdGUodGhpcy5lbnVtU291cmNlW2ldLmZpbHRlciwgdGhpcy50ZW1wbGF0ZV9lbmdpbmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE90aGVyLCBub3Qgc3VwcG9ydGVkXG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBcIidzZWxlY3QnIGVkaXRvciByZXF1aXJlcyB0aGUgZW51bSBwcm9wZXJ0eSB0byBiZSBzZXQuXCI7XG4gICAgfVxuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5oZWFkZXIgPSB0aGlzLmxhYmVsID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIGlmKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKSB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXREZXNjcmlwdGlvbih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbik7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lICs9ICcgY29tcGFjdCc7XG5cbiAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRTZWxlY3RJbnB1dCh0aGlzLmVudW1fb3B0aW9ucyk7XG4gICAgdGhpcy50aGVtZS5zZXRTZWxlY3RPcHRpb25zKHRoaXMuaW5wdXQsdGhpcy5lbnVtX29wdGlvbnMsdGhpcy5lbnVtX2Rpc3BsYXkpO1xuXG4gICAgaWYodGhpcy5zY2hlbWEucmVhZE9ubHkgfHwgdGhpcy5zY2hlbWEucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMuYWx3YXlzX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgc2VsZi5vbklucHV0Q2hhbmdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLnRoZW1lLmdldEZvcm1Db250cm9sKHRoaXMubGFiZWwsIHRoaXMuaW5wdXQsIHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbCk7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5lbnVtX3ZhbHVlc1swXTtcbiAgfSxcbiAgb25JbnB1dENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbCA9IHRoaXMuaW5wdXQudmFsdWU7XG5cbiAgICB2YXIgc2FuaXRpemVkID0gdmFsO1xuICAgIGlmKHRoaXMuZW51bV9vcHRpb25zLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgIHNhbml0aXplZCA9IHRoaXMuZW51bV9vcHRpb25zWzBdO1xuICAgIH1cblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmVudW1fdmFsdWVzW3RoaXMuZW51bV9vcHRpb25zLmluZGV4T2YodmFsKV07XG4gICAgdGhpcy5vbkNoYW5nZSh0cnVlKTtcbiAgfSxcbiAgc2V0dXBTZWxlY3RpemU6IGZ1bmN0aW9uKCkge1xuICAgIC8vIElmIHRoZSBTZWxlY3RpemUgbGlicmFyeSBpcyBsb2FkZWQgdXNlIGl0IHdoZW4gd2UgaGF2ZSBsb3RzIG9mIGl0ZW1zXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKHdpbmRvdy5qUXVlcnkgJiYgd2luZG93LmpRdWVyeS5mbiAmJiB3aW5kb3cualF1ZXJ5LmZuLnNlbGVjdGl6ZSAmJiAodGhpcy5lbnVtX29wdGlvbnMubGVuZ3RoID49IDIgfHwgKHRoaXMuZW51bV9vcHRpb25zLmxlbmd0aCAmJiB0aGlzLmVudW1Tb3VyY2UpKSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSAkZXh0ZW5kKHt9LEpTT05FZGl0b3IucGx1Z2lucy5zZWxlY3RpemUpO1xuICAgICAgaWYodGhpcy5zY2hlbWEub3B0aW9ucyAmJiB0aGlzLnNjaGVtYS5vcHRpb25zLnNlbGVjdGl6ZV9vcHRpb25zKSBvcHRpb25zID0gJGV4dGVuZChvcHRpb25zLHRoaXMuc2NoZW1hLm9wdGlvbnMuc2VsZWN0aXplX29wdGlvbnMpO1xuICAgICAgdGhpcy5zZWxlY3RpemUgPSB3aW5kb3cualF1ZXJ5KHRoaXMuaW5wdXQpLnNlbGVjdGl6ZSgkZXh0ZW5kKG9wdGlvbnMsXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZTogdHJ1ZSxcbiAgICAgICAgb25DaGFuZ2UgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLm9uSW5wdXRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0aXplID0gbnVsbDtcbiAgICB9XG4gIH0sXG4gIHBvc3RCdWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICB0aGlzLnRoZW1lLmFmdGVySW5wdXRSZWFkeSh0aGlzLmlucHV0KTtcbiAgICB0aGlzLnNldHVwU2VsZWN0aXplKCk7XG4gIH0sXG4gIG9uV2F0Y2hlZEZpZWxkQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIHZhcnMsIGo7XG5cbiAgICAvLyBJZiB0aGlzIGVkaXRvciB1c2VzIGEgZHluYW1pYyBzZWxlY3QgYm94XG4gICAgaWYodGhpcy5lbnVtU291cmNlKSB7XG4gICAgICB2YXJzID0gdGhpcy5nZXRXYXRjaGVkRmllbGRWYWx1ZXMoKTtcbiAgICAgIHZhciBzZWxlY3Rfb3B0aW9ucyA9IFtdO1xuICAgICAgdmFyIHNlbGVjdF90aXRsZXMgPSBbXTtcblxuICAgICAgZm9yKHZhciBpPTA7IGk8dGhpcy5lbnVtU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIENvbnN0YW50IHZhbHVlc1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KHRoaXMuZW51bVNvdXJjZVtpXSkpIHtcbiAgICAgICAgICBzZWxlY3Rfb3B0aW9ucyA9IHNlbGVjdF9vcHRpb25zLmNvbmNhdCh0aGlzLmVudW1Tb3VyY2VbaV0pO1xuICAgICAgICAgIHNlbGVjdF90aXRsZXMgPSBzZWxlY3RfdGl0bGVzLmNvbmNhdCh0aGlzLmVudW1Tb3VyY2VbaV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEEgd2F0Y2hlZCBmaWVsZFxuICAgICAgICBlbHNlIGlmKHZhcnNbdGhpcy5lbnVtU291cmNlW2ldLnNvdXJjZV0pIHtcbiAgICAgICAgICB2YXIgaXRlbXMgPSB2YXJzW3RoaXMuZW51bVNvdXJjZVtpXS5zb3VyY2VdO1xuXG4gICAgICAgICAgLy8gT25seSB1c2UgYSBwcmVkZWZpbmVkIHBhcnQgb2YgdGhlIGFycmF5XG4gICAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLnNsaWNlKSB7XG4gICAgICAgICAgICBpdGVtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShpdGVtcyx0aGlzLmVudW1Tb3VyY2VbaV0uc2xpY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBGaWx0ZXIgdGhlIGl0ZW1zXG4gICAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLmZpbHRlcikge1xuICAgICAgICAgICAgdmFyIG5ld19pdGVtcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGo9MDsgajxpdGVtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICBpZih0aGlzLmVudW1Tb3VyY2VbaV0uZmlsdGVyKHtpOmosaXRlbTppdGVtc1tqXX0pKSBuZXdfaXRlbXMucHVzaChpdGVtc1tqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtcyA9IG5ld19pdGVtcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXRlbV90aXRsZXMgPSBbXTtcbiAgICAgICAgICB2YXIgaXRlbV92YWx1ZXMgPSBbXTtcbiAgICAgICAgICBmb3Ioaj0wOyBqPGl0ZW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2pdO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXJlZCB2YWx1ZVxuICAgICAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGl0ZW1fdmFsdWVzW2pdID0gdGhpcy5lbnVtU291cmNlW2ldLnZhbHVlKHtcbiAgICAgICAgICAgICAgICBpOiBqLFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVc2UgdmFsdWUgZGlyZWN0bHlcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpdGVtX3ZhbHVlc1tqXSA9IGl0ZW1zW2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZW5kZXJlZCB0aXRsZVxuICAgICAgICAgICAgaWYodGhpcy5lbnVtU291cmNlW2ldLnRpdGxlKSB7XG4gICAgICAgICAgICAgIGl0ZW1fdGl0bGVzW2pdID0gdGhpcy5lbnVtU291cmNlW2ldLnRpdGxlKHtcbiAgICAgICAgICAgICAgICBpOiBqLFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVc2UgdmFsdWUgYXMgdGhlIHRpdGxlIGFsc29cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpdGVtX3RpdGxlc1tqXSA9IGl0ZW1fdmFsdWVzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFRPRE86IHNvcnRcblxuICAgICAgICAgIHNlbGVjdF9vcHRpb25zID0gc2VsZWN0X29wdGlvbnMuY29uY2F0KGl0ZW1fdmFsdWVzKTtcbiAgICAgICAgICBzZWxlY3RfdGl0bGVzID0gc2VsZWN0X3RpdGxlcy5jb25jYXQoaXRlbV90aXRsZXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2X3ZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgdGhpcy50aGVtZS5zZXRTZWxlY3RPcHRpb25zKHRoaXMuaW5wdXQsIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdGl0bGVzKTtcbiAgICAgIHRoaXMuZW51bV9vcHRpb25zID0gc2VsZWN0X29wdGlvbnM7XG4gICAgICB0aGlzLmVudW1fZGlzcGxheSA9IHNlbGVjdF90aXRsZXM7XG4gICAgICB0aGlzLmVudW1fdmFsdWVzID0gc2VsZWN0X29wdGlvbnM7XG5cbiAgICAgIC8vIElmIHRoZSBwcmV2aW91cyB2YWx1ZSBpcyBzdGlsbCBpbiB0aGUgbmV3IHNlbGVjdCBvcHRpb25zLCBzdGljayB3aXRoIGl0XG4gICAgICBpZihzZWxlY3Rfb3B0aW9ucy5pbmRleE9mKHByZXZfdmFsdWUpICE9PSAtMSkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gcHJldl92YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHByZXZfdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgc2V0IHRoZSB2YWx1ZSB0byB0aGUgZmlyc3Qgc2VsZWN0IG9wdGlvblxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSBzZWxlY3Rfb3B0aW9uc1swXTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdF9vcHRpb25zWzBdIHx8IFwiXCI7XG4gICAgICAgIGlmKHRoaXMucGFyZW50KSB0aGlzLnBhcmVudC5vbkNoaWxkRWRpdG9yQ2hhbmdlKHRoaXMpO1xuICAgICAgICBlbHNlIHRoaXMuanNvbmVkaXRvci5vbkNoYW5nZSgpO1xuICAgICAgICB0aGlzLmpzb25lZGl0b3Iubm90aWZ5V2F0Y2hlcnModGhpcy5wYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5zZWxlY3RpemUpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBTZWxlY3RpemUgb3B0aW9uc1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGl6ZU9wdGlvbnMoc2VsZWN0X29wdGlvbnMpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0dXBTZWxlY3RpemUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9XG4gIH0sXG4gIHVwZGF0ZVNlbGVjdGl6ZU9wdGlvbnM6IGZ1bmN0aW9uKHNlbGVjdF9vcHRpb25zKSB7XG4gICAgdmFyIHNlbGVjdGl6ZWQgPSB0aGlzLnNlbGVjdGl6ZVswXS5zZWxlY3RpemUsXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZWN0aXplZC5vZmYoKTtcbiAgICBzZWxlY3RpemVkLmNsZWFyT3B0aW9ucygpO1xuICAgIGZvcih2YXIgbiBpbiBzZWxlY3Rfb3B0aW9ucykge1xuICAgICAgc2VsZWN0aXplZC5hZGRPcHRpb24oe3ZhbHVlOnNlbGVjdF9vcHRpb25zW25dLHRleHQ6c2VsZWN0X29wdGlvbnNbbl19KTtcbiAgICB9XG4gICAgc2VsZWN0aXplZC5hZGRJdGVtKHRoaXMudmFsdWUpO1xuICAgIHNlbGVjdGl6ZWQub24oJ2NoYW5nZScsZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLm9uSW5wdXRDaGFuZ2UoKTtcbiAgICB9KTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5hbHdheXNfZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIGlmKHRoaXMuc2VsZWN0aXplKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aXplWzBdLnNlbGVjdGl6ZS51bmxvY2soKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgaWYodGhpcy5zZWxlY3RpemUpIHtcbiAgICAgIHRoaXMuc2VsZWN0aXplWzBdLnNlbGVjdGl6ZS5sb2NrKCk7XG4gICAgfVxuICAgIHRoaXMuX3N1cGVyKCk7XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMubGFiZWwgJiYgdGhpcy5sYWJlbC5wYXJlbnROb2RlKSB0aGlzLmxhYmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgaWYodGhpcy5kZXNjcmlwdGlvbiAmJiB0aGlzLmRlc2NyaXB0aW9uLnBhcmVudE5vZGUpIHRoaXMuZGVzY3JpcHRpb24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICBpZih0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQucGFyZW50Tm9kZSkgdGhpcy5pbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaW5wdXQpO1xuICAgIGlmKHRoaXMuc2VsZWN0aXplKSB7XG4gICAgICB0aGlzLnNlbGVjdGl6ZVswXS5zZWxlY3RpemUuZGVzdHJveSgpO1xuICAgICAgdGhpcy5zZWxlY3RpemUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzLm11bHRpc2VsZWN0ID0gSlNPTkVkaXRvci5BYnN0cmFjdEVkaXRvci5leHRlbmQoe1xuICBwcmVCdWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICB2YXIgaTtcblxuICAgIHRoaXMuc2VsZWN0X29wdGlvbnMgPSB7fTtcbiAgICB0aGlzLnNlbGVjdF92YWx1ZXMgPSB7fTtcblxuICAgIHZhciBpdGVtc19zY2hlbWEgPSB0aGlzLmpzb25lZGl0b3IuZXhwYW5kUmVmcyh0aGlzLnNjaGVtYS5pdGVtcyB8fCB7fSk7XG5cbiAgICB2YXIgZSA9IGl0ZW1zX3NjaGVtYVtcImVudW1cIl0gfHwgW107XG4gICAgdmFyIHQgPSBpdGVtc19zY2hlbWEub3B0aW9ucz8gaXRlbXNfc2NoZW1hLm9wdGlvbnMuZW51bV90aXRsZXMgfHwgW10gOiBbXTtcbiAgICB0aGlzLm9wdGlvbl9rZXlzID0gW107XG4gICAgdGhpcy5vcHRpb25fdGl0bGVzID0gW107XG4gICAgZm9yKGk9MDsgaTxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBJZiB0aGUgc2FuaXRpemVkIHZhbHVlIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBlbnVtIHZhbHVlLCBkb24ndCBpbmNsdWRlIGl0XG4gICAgICBpZih0aGlzLnNhbml0aXplKGVbaV0pICE9PSBlW2ldKSBjb250aW51ZTtcblxuICAgICAgdGhpcy5vcHRpb25fa2V5cy5wdXNoKGVbaV0rXCJcIik7XG4gICAgICB0aGlzLm9wdGlvbl90aXRsZXMucHVzaCgodFtpXXx8ZVtpXSkrXCJcIik7XG4gICAgICB0aGlzLnNlbGVjdF92YWx1ZXNbZVtpXStcIlwiXSA9IGVbaV07XG4gICAgfVxuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBpO1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuY29tcGFjdCkgdGhpcy5oZWFkZXIgPSB0aGlzLmxhYmVsID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIGlmKHRoaXMuc2NoZW1hLmRlc2NyaXB0aW9uKSB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXREZXNjcmlwdGlvbih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbik7XG5cbiAgICBpZigoIXRoaXMuc2NoZW1hLmZvcm1hdCAmJiB0aGlzLm9wdGlvbl9rZXlzLmxlbmd0aCA8IDgpIHx8IHRoaXMuc2NoZW1hLmZvcm1hdCA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICB0aGlzLmlucHV0X3R5cGUgPSAnY2hlY2tib3hlcyc7XG5cbiAgICAgIHRoaXMuaW5wdXRzID0ge307XG4gICAgICB0aGlzLmNvbnRyb2xzID0ge307XG4gICAgICBmb3IoaT0wOyBpPHRoaXMub3B0aW9uX2tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbnB1dHNbdGhpcy5vcHRpb25fa2V5c1tpXV0gPSB0aGlzLnRoZW1lLmdldENoZWNrYm94KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0X29wdGlvbnNbdGhpcy5vcHRpb25fa2V5c1tpXV0gPSB0aGlzLmlucHV0c1t0aGlzLm9wdGlvbl9rZXlzW2ldXTtcbiAgICAgICAgdmFyIGxhYmVsID0gdGhpcy50aGVtZS5nZXRDaGVja2JveExhYmVsKHRoaXMub3B0aW9uX3RpdGxlc1tpXSk7XG4gICAgICAgIHRoaXMuY29udHJvbHNbdGhpcy5vcHRpb25fa2V5c1tpXV0gPSB0aGlzLnRoZW1lLmdldEZvcm1Db250cm9sKGxhYmVsLCB0aGlzLmlucHV0c1t0aGlzLm9wdGlvbl9rZXlzW2ldXSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMudGhlbWUuZ2V0TXVsdGlDaGVja2JveEhvbGRlcih0aGlzLmNvbnRyb2xzLHRoaXMubGFiZWwsdGhpcy5kZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dF90eXBlID0gJ3NlbGVjdCc7XG4gICAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRTZWxlY3RJbnB1dCh0aGlzLm9wdGlvbl9rZXlzKTtcbiAgICAgIHRoaXMudGhlbWUuc2V0U2VsZWN0T3B0aW9ucyh0aGlzLmlucHV0LHRoaXMub3B0aW9uX2tleXMsdGhpcy5vcHRpb25fdGl0bGVzKTtcbiAgICAgIHRoaXMuaW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgdGhpcy5pbnB1dC5zaXplID0gTWF0aC5taW4oMTAsdGhpcy5vcHRpb25fa2V5cy5sZW5ndGgpO1xuXG4gICAgICBmb3IoaT0wOyBpPHRoaXMub3B0aW9uX2tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rfb3B0aW9uc1t0aGlzLm9wdGlvbl9rZXlzW2ldXSA9IHRoaXMuaW5wdXQuY2hpbGRyZW5baV07XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuc2NoZW1hLnJlYWRPbmx5IHx8IHRoaXMuc2NoZW1hLnJlYWRvbmx5KSB7XG4gICAgICAgIHRoaXMuYWx3YXlzX2Rpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMudGhlbWUuZ2V0Rm9ybUNvbnRyb2wodGhpcy5sYWJlbCwgdGhpcy5pbnB1dCwgdGhpcy5kZXNjcmlwdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9sKTtcbiAgICB0aGlzLmNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB2YXIgbmV3X3ZhbHVlID0gW107XG4gICAgICBmb3IoaSA9IDA7IGk8c2VsZi5vcHRpb25fa2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihzZWxmLnNlbGVjdF9vcHRpb25zW3NlbGYub3B0aW9uX2tleXNbaV1dLnNlbGVjdGVkIHx8IHNlbGYuc2VsZWN0X29wdGlvbnNbc2VsZi5vcHRpb25fa2V5c1tpXV0uY2hlY2tlZCkgbmV3X3ZhbHVlLnB1c2goc2VsZi5zZWxlY3RfdmFsdWVzW3NlbGYub3B0aW9uX2tleXNbaV1dKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi51cGRhdGVWYWx1ZShuZXdfdmFsdWUpO1xuICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICB9KTtcbiAgfSxcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBpbml0aWFsKSB7XG4gICAgdmFyIGk7XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBbXTtcbiAgICBpZih0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHZhbHVlID0gW3ZhbHVlXTtcbiAgICBlbHNlIGlmKCEoQXJyYXkuaXNBcnJheSh2YWx1ZSkpKSB2YWx1ZSA9IFtdO1xuXG4gICAgLy8gTWFrZSBzdXJlIHdlIGFyZSBkZWFsaW5nIHdpdGggYW4gYXJyYXkgb2Ygc3RyaW5ncyBzbyB3ZSBjYW4gY2hlY2sgZm9yIHN0cmljdCBlcXVhbGl0eVxuICAgIGZvcihpPTA7IGk8dmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHR5cGVvZiB2YWx1ZVtpXSAhPT0gXCJzdHJpbmdcIikgdmFsdWVbaV0gKz0gXCJcIjtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgc2VsZWN0ZWQgc3RhdHVzIG9mIG9wdGlvbnNcbiAgICBmb3IoaSBpbiB0aGlzLnNlbGVjdF9vcHRpb25zKSB7XG4gICAgICBpZighdGhpcy5zZWxlY3Rfb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgIHRoaXMuc2VsZWN0X29wdGlvbnNbaV1bdGhpcy5pbnB1dF90eXBlID09PSBcInNlbGVjdFwiPyBcInNlbGVjdGVkXCIgOiBcImNoZWNrZWRcIl0gPSAodmFsdWUuaW5kZXhPZihpKSAhPT0gLTEpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfSxcbiAgc2V0dXBTZWxlY3QyOiBmdW5jdGlvbigpIHtcbiAgICBpZih3aW5kb3cualF1ZXJ5ICYmIHdpbmRvdy5qUXVlcnkuZm4gJiYgd2luZG93LmpRdWVyeS5mbi5zZWxlY3QyKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gd2luZG93LmpRdWVyeS5leHRlbmQoe30sSlNPTkVkaXRvci5wbHVnaW5zLnNlbGVjdDIpO1xuICAgICAgICBpZih0aGlzLnNjaGVtYS5vcHRpb25zICYmIHRoaXMuc2NoZW1hLm9wdGlvbnMuc2VsZWN0Ml9vcHRpb25zKSBvcHRpb25zID0gJGV4dGVuZChvcHRpb25zLHRoaXMuc2NoZW1hLm9wdGlvbnMuc2VsZWN0Ml9vcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZWxlY3QyID0gd2luZG93LmpRdWVyeSh0aGlzLmlucHV0KS5zZWxlY3QyKG9wdGlvbnMpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2VsZWN0Mi5vbignc2VsZWN0Mi1ibHVyJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPXNlbGYuc2VsZWN0Mi5zZWxlY3QyKCd2YWwnKTtcbiAgICAgICAgICAgIHNlbGYudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0MiA9IG51bGw7XG4gICAgfVxuICB9LFxuICBvbklucHV0Q2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0cnVlKTtcbiAgfSxcbiAgcG9zdEJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9LFxuICByZWdpc3RlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICBpZighdGhpcy5pbnB1dCkgcmV0dXJuO1xuICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJyx0aGlzLmZvcm1uYW1lKTtcbiAgfSxcbiAgdW5yZWdpc3RlcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgICBpZighdGhpcy5pbnB1dCkgcmV0dXJuO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlQXR0cmlidXRlKCduYW1lJyk7XG4gIH0sXG4gIGdldE51bUNvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb25nZXN0X3RleHQgPSB0aGlzLmdldFRpdGxlKCkubGVuZ3RoO1xuICAgIGZvcih2YXIgaSBpbiB0aGlzLnNlbGVjdF92YWx1ZXMpIHtcbiAgICAgIGlmKCF0aGlzLnNlbGVjdF92YWx1ZXMuaGFzT3duUHJvcGVydHkoaSkpIGNvbnRpbnVlO1xuICAgICAgbG9uZ2VzdF90ZXh0ID0gTWF0aC5tYXgobG9uZ2VzdF90ZXh0LCh0aGlzLnNlbGVjdF92YWx1ZXNbaV0rXCJcIikubGVuZ3RoKzQpO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLm1pbigxMixNYXRoLm1heChsb25nZXN0X3RleHQvNywyKSk7XG4gIH0sXG4gIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5ld192YWx1ZSA9IFtdO1xuICAgIGZvcih2YXIgaT0wOyBpPHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5zZWxlY3Rfb3B0aW9uc1t2YWx1ZVtpXStcIlwiXSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgc2FuaXRpemVkID0gdGhpcy5zYW5pdGl6ZSh0aGlzLnNlbGVjdF92YWx1ZXNbdmFsdWVbaV1dKTtcbiAgICAgIG5ld192YWx1ZS5wdXNoKHNhbml0aXplZCk7XG4gICAgICBpZihzYW5pdGl6ZWQgIT09IHZhbHVlW2ldKSBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IG5ld192YWx1ZTtcbiAgICBpZih0aGlzLnNlbGVjdDIpIHRoaXMuc2VsZWN0Mi5zZWxlY3QyKCd2YWwnLHRoaXMudmFsdWUpO1xuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9LFxuICBzYW5pdGl6ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZih0aGlzLnNjaGVtYS5pdGVtcy50eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gMSp2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLnNjaGVtYS5pdGVtcy50eXBlID09PSBcImludGVnZXJcIikge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsdWUqMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFwiXCIrdmFsdWU7XG4gICAgfVxuICB9LFxuICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKCF0aGlzLmFsd2F5c19kaXNhYmxlZCkge1xuICAgICAgaWYodGhpcy5pbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKHRoaXMuaW5wdXRzKSB7XG4gICAgICAgIGZvcih2YXIgaSBpbiB0aGlzLmlucHV0cykge1xuICAgICAgICAgIGlmKCF0aGlzLmlucHV0cy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgICAgdGhpcy5pbnB1dHNbaV0uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYodGhpcy5zZWxlY3QyKSB0aGlzLnNlbGVjdDIuc2VsZWN0MihcImVuYWJsZVwiLHRydWUpO1xuICAgIH1cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmlucHV0KSB7XG4gICAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLmlucHV0cykge1xuICAgICAgZm9yKHZhciBpIGluIHRoaXMuaW5wdXRzKSB7XG4gICAgICAgIGlmKCF0aGlzLmlucHV0cy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICAgIHRoaXMuaW5wdXRzW2ldLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5zZWxlY3QyKSB0aGlzLnNlbGVjdDIuc2VsZWN0MihcImVuYWJsZVwiLGZhbHNlKTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnNlbGVjdDIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3QyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5zZWxlY3QyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5iYXNlNjQgPSBKU09ORWRpdG9yLkFic3RyYWN0RWRpdG9yLmV4dGVuZCh7XG4gIGdldE51bUNvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiA0O1xuICB9LFxuICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmhlYWRlciA9IHRoaXMubGFiZWwgPSB0aGlzLnRoZW1lLmdldEZvcm1JbnB1dExhYmVsKHRoaXMuZ2V0VGl0bGUoKSk7XG5cbiAgICAvLyBJbnB1dCB0aGF0IGhvbGRzIHRoZSBiYXNlNjQgc3RyaW5nXG4gICAgdGhpcy5pbnB1dCA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RmllbGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaW5wdXQpO1xuXG4gICAgLy8gRG9uJ3Qgc2hvdyB1cGxvYWRlciBpZiB0aGlzIGlzIHJlYWRvbmx5XG4gICAgaWYoIXRoaXMuc2NoZW1hLnJlYWRPbmx5ICYmICF0aGlzLnNjaGVtYS5yZWFkb25seSkge1xuICAgICAgaWYoIXdpbmRvdy5GaWxlUmVhZGVyKSB0aHJvdyBcIkZpbGVSZWFkZXIgcmVxdWlyZWQgZm9yIGJhc2U2NCBlZGl0b3JcIjtcblxuICAgICAgLy8gRmlsZSB1cGxvYWRlclxuICAgICAgdGhpcy51cGxvYWRlciA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RmllbGQoJ2ZpbGUnKTtcblxuICAgICAgdGhpcy51cGxvYWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmKHRoaXMuZmlsZXMgJiYgdGhpcy5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgc2VsZi52YWx1ZSA9IGV2dC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgc2VsZi5yZWZyZXNoUHJldmlldygpO1xuICAgICAgICAgICAgc2VsZi5vbkNoYW5nZSh0cnVlKTtcbiAgICAgICAgICAgIGZyID0gbnVsbDtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZyLnJlYWRBc0RhdGFVUkwodGhpcy5maWxlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlldyA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RGVzY3JpcHRpb24odGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldmlldyk7XG5cbiAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLnRoZW1lLmdldEZvcm1Db250cm9sKHRoaXMubGFiZWwsIHRoaXMudXBsb2FkZXJ8fHRoaXMuaW5wdXQsIHRoaXMucHJldmlldyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9sKTtcbiAgfSxcbiAgcmVmcmVzaFByZXZpZXc6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMubGFzdF9wcmV2aWV3ID09PSB0aGlzLnZhbHVlKSByZXR1cm47XG4gICAgdGhpcy5sYXN0X3ByZXZpZXcgPSB0aGlzLnZhbHVlO1xuXG4gICAgdGhpcy5wcmV2aWV3LmlubmVySFRNTCA9ICcnO1xuXG4gICAgaWYoIXRoaXMudmFsdWUpIHJldHVybjtcblxuICAgIHZhciBtaW1lID0gdGhpcy52YWx1ZS5tYXRjaCgvXmRhdGE6KFteOyxdKylbOyxdLyk7XG4gICAgaWYobWltZSkgbWltZSA9IG1pbWVbMV07XG5cbiAgICBpZighbWltZSkge1xuICAgICAgdGhpcy5wcmV2aWV3LmlubmVySFRNTCA9ICc8ZW0+SW52YWxpZCBkYXRhIFVSSTwvZW0+JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnByZXZpZXcuaW5uZXJIVE1MID0gJzxzdHJvbmc+VHlwZTo8L3N0cm9uZz4gJyttaW1lKycsIDxzdHJvbmc+U2l6ZTo8L3N0cm9uZz4gJytNYXRoLmZsb29yKCh0aGlzLnZhbHVlLmxlbmd0aC10aGlzLnZhbHVlLnNwbGl0KCcsJylbMF0ubGVuZ3RoLTEpLzEuMzMzMzMpKycgYnl0ZXMnO1xuICAgICAgaWYobWltZS5zdWJzdHIoMCw1KT09PVwiaW1hZ2VcIikge1xuICAgICAgICB0aGlzLnByZXZpZXcuaW5uZXJIVE1MICs9ICc8YnI+JztcbiAgICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWcuc3R5bGUubWF4V2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGltZy5zdHlsZS5tYXhIZWlnaHQgPSAnMTAwcHgnO1xuICAgICAgICBpbWcuc3JjID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy5wcmV2aWV3LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBlbmFibGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMudXBsb2FkZXIpIHRoaXMudXBsb2FkZXIuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnVwbG9hZGVyKSB0aGlzLnVwbG9hZGVyLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsKSB7XG4gICAgaWYodGhpcy52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnJlZnJlc2hQcmV2aWV3KCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfVxuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnByZXZpZXcgJiYgdGhpcy5wcmV2aWV3LnBhcmVudE5vZGUpIHRoaXMucHJldmlldy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMucHJldmlldyk7XG4gICAgaWYodGhpcy50aXRsZSAmJiB0aGlzLnRpdGxlLnBhcmVudE5vZGUpIHRoaXMudGl0bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICBpZih0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQucGFyZW50Tm9kZSkgdGhpcy5pbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaW5wdXQpO1xuICAgIGlmKHRoaXMudXBsb2FkZXIgJiYgdGhpcy51cGxvYWRlci5wYXJlbnROb2RlKSB0aGlzLnVwbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy51cGxvYWRlcik7XG5cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzLnVwbG9hZCA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgZ2V0TnVtQ29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIDQ7XG4gIH0sXG4gIGJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMuaGVhZGVyID0gdGhpcy5sYWJlbCA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0TGFiZWwodGhpcy5nZXRUaXRsZSgpKTtcblxuICAgIC8vIElucHV0IHRoYXQgaG9sZHMgdGhlIGJhc2U2NCBzdHJpbmdcbiAgICB0aGlzLmlucHV0ID0gdGhpcy50aGVtZS5nZXRGb3JtSW5wdXRGaWVsZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dCk7XG5cbiAgICAvLyBEb24ndCBzaG93IHVwbG9hZGVyIGlmIHRoaXMgaXMgcmVhZG9ubHlcbiAgICBpZighdGhpcy5zY2hlbWEucmVhZE9ubHkgJiYgIXRoaXMuc2NoZW1hLnJlYWRvbmx5KSB7XG5cbiAgICAgIGlmKCF0aGlzLmpzb25lZGl0b3Iub3B0aW9ucy51cGxvYWQpIHRocm93IFwiVXBsb2FkIGhhbmRsZXIgcmVxdWlyZWQgZm9yIHVwbG9hZCBlZGl0b3JcIjtcblxuICAgICAgLy8gRmlsZSB1cGxvYWRlclxuICAgICAgdGhpcy51cGxvYWRlciA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RmllbGQoJ2ZpbGUnKTtcblxuICAgICAgdGhpcy51cGxvYWRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmKHRoaXMuZmlsZXMgJiYgdGhpcy5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgc2VsZi5wcmV2aWV3X3ZhbHVlID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICBzZWxmLnJlZnJlc2hQcmV2aWV3KCk7XG4gICAgICAgICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgICAgICAgICAgZnIgPSBudWxsO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZnIucmVhZEFzRGF0YVVSTCh0aGlzLmZpbGVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5zY2hlbWEuZGVzY3JpcHRpb247XG4gICAgaWYgKCFkZXNjcmlwdGlvbikgZGVzY3JpcHRpb24gPSAnJztcblxuICAgIHRoaXMucHJldmlldyA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pO1xuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucHJldmlldyk7XG5cbiAgICB0aGlzLmNvbnRyb2wgPSB0aGlzLnRoZW1lLmdldEZvcm1Db250cm9sKHRoaXMubGFiZWwsIHRoaXMudXBsb2FkZXJ8fHRoaXMuaW5wdXQsIHRoaXMucHJldmlldyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9sKTtcbiAgfSxcbiAgcmVmcmVzaFByZXZpZXc6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMubGFzdF9wcmV2aWV3ID09PSB0aGlzLnByZXZpZXdfdmFsdWUpIHJldHVybjtcbiAgICB0aGlzLmxhc3RfcHJldmlldyA9IHRoaXMucHJldmlld192YWx1ZTtcblxuICAgIHRoaXMucHJldmlldy5pbm5lckhUTUwgPSAnJztcblxuICAgIGlmKCF0aGlzLnByZXZpZXdfdmFsdWUpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBtaW1lID0gdGhpcy5wcmV2aWV3X3ZhbHVlLm1hdGNoKC9eZGF0YTooW147LF0rKVs7LF0vKTtcbiAgICBpZihtaW1lKSBtaW1lID0gbWltZVsxXTtcbiAgICBpZighbWltZSkgbWltZSA9ICd1bmtub3duJztcblxuICAgIHZhciBmaWxlID0gdGhpcy51cGxvYWRlci5maWxlc1swXTtcblxuICAgIHRoaXMucHJldmlldy5pbm5lckhUTUwgPSAnPHN0cm9uZz5UeXBlOjwvc3Ryb25nPiAnK21pbWUrJywgPHN0cm9uZz5TaXplOjwvc3Ryb25nPiAnK2ZpbGUuc2l6ZSsnIGJ5dGVzJztcbiAgICBpZihtaW1lLnN1YnN0cigwLDUpPT09XCJpbWFnZVwiKSB7XG4gICAgICB0aGlzLnByZXZpZXcuaW5uZXJIVE1MICs9ICc8YnI+JztcbiAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGltZy5zdHlsZS5tYXhXaWR0aCA9ICcxMDAlJztcbiAgICAgIGltZy5zdHlsZS5tYXhIZWlnaHQgPSAnMTAwcHgnO1xuICAgICAgaW1nLnNyYyA9IHRoaXMucHJldmlld192YWx1ZTtcbiAgICAgIHRoaXMucHJldmlldy5hcHBlbmRDaGlsZChpbWcpO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlldy5pbm5lckhUTUwgKz0gJzxicj4nO1xuICAgIHZhciB1cGxvYWRCdXR0b24gPSB0aGlzLmdldEJ1dHRvbignVXBsb2FkJywgJ3VwbG9hZCcsICdVcGxvYWQnKTtcbiAgICB0aGlzLnByZXZpZXcuYXBwZW5kQ2hpbGQodXBsb2FkQnV0dG9uKTtcbiAgICB1cGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB1cGxvYWRCdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIHNlbGYudGhlbWUucmVtb3ZlSW5wdXRFcnJvcihzZWxmLnVwbG9hZGVyKTtcblxuICAgICAgaWYgKHNlbGYudGhlbWUuZ2V0UHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgc2VsZi5wcm9ncmVzc0JhciA9IHNlbGYudGhlbWUuZ2V0UHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgc2VsZi5wcmV2aWV3LmFwcGVuZENoaWxkKHNlbGYucHJvZ3Jlc3NCYXIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLmpzb25lZGl0b3Iub3B0aW9ucy51cGxvYWQoc2VsZi5wYXRoLCBmaWxlLCB7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgIHNlbGYuc2V0VmFsdWUodXJsKTtcblxuICAgICAgICAgIGlmKHNlbGYucGFyZW50KSBzZWxmLnBhcmVudC5vbkNoaWxkRWRpdG9yQ2hhbmdlKHNlbGYpO1xuICAgICAgICAgIGVsc2Ugc2VsZi5qc29uZWRpdG9yLm9uQ2hhbmdlKCk7XG5cbiAgICAgICAgICBpZiAoc2VsZi5wcm9ncmVzc0Jhcikgc2VsZi5wcmV2aWV3LnJlbW92ZUNoaWxkKHNlbGYucHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgIHVwbG9hZEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbHVyZTogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBzZWxmLnRoZW1lLmFkZElucHV0RXJyb3Ioc2VsZi51cGxvYWRlciwgZXJyb3IpO1xuICAgICAgICAgIGlmIChzZWxmLnByb2dyZXNzQmFyKSBzZWxmLnByZXZpZXcucmVtb3ZlQ2hpbGQoc2VsZi5wcm9ncmVzc0Jhcik7XG4gICAgICAgICAgdXBsb2FkQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVQcm9ncmVzczogZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcbiAgICAgICAgICBpZiAoc2VsZi5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzKSBzZWxmLnRoZW1lLnVwZGF0ZVByb2dyZXNzQmFyKHNlbGYucHJvZ3Jlc3NCYXIsIHByb2dyZXNzKTtcbiAgICAgICAgICAgIGVsc2Ugc2VsZi50aGVtZS51cGRhdGVQcm9ncmVzc0JhclVua25vd24oc2VsZi5wcm9ncmVzc0Jhcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnVwbG9hZGVyKSB0aGlzLnVwbG9hZGVyLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy51cGxvYWRlcikgdGhpcy51cGxvYWRlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbCkge1xuICAgIGlmKHRoaXMudmFsdWUgIT09IHZhbCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSgpO1xuICAgIH1cbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5wcmV2aWV3ICYmIHRoaXMucHJldmlldy5wYXJlbnROb2RlKSB0aGlzLnByZXZpZXcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnByZXZpZXcpO1xuICAgIGlmKHRoaXMudGl0bGUgJiYgdGhpcy50aXRsZS5wYXJlbnROb2RlKSB0aGlzLnRpdGxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgaWYodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LnBhcmVudE5vZGUpIHRoaXMuaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmlucHV0KTtcbiAgICBpZih0aGlzLnVwbG9hZGVyICYmIHRoaXMudXBsb2FkZXIucGFyZW50Tm9kZSkgdGhpcy51cGxvYWRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMudXBsb2FkZXIpO1xuXG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5jaGVja2JveCA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlLGluaXRpYWwpIHtcbiAgICB0aGlzLnZhbHVlID0gISF2YWx1ZTtcbiAgICB0aGlzLmlucHV0LmNoZWNrZWQgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UoKTtcbiAgfSxcbiAgcmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsdGhpcy5mb3JtbmFtZSk7XG4gIH0sXG4gIHVucmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgaWYoIXRoaXMuaW5wdXQpIHJldHVybjtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICB9LFxuICBnZXROdW1Db2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oMTIsTWF0aC5tYXgodGhpcy5nZXRUaXRsZSgpLmxlbmd0aC83LDIpKTtcbiAgfSxcbiAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZighdGhpcy5vcHRpb25zLmNvbXBhY3QpIHtcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmhlYWRlciA9IHRoaXMudGhlbWUuZ2V0Q2hlY2tib3hMYWJlbCh0aGlzLmdldFRpdGxlKCkpO1xuICAgIH1cbiAgICBpZih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbikgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMudGhlbWUuZ2V0Rm9ybUlucHV0RGVzY3JpcHRpb24odGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pO1xuICAgIGlmKHRoaXMub3B0aW9ucy5jb21wYWN0KSB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyBjb21wYWN0JztcblxuICAgIHRoaXMuaW5wdXQgPSB0aGlzLnRoZW1lLmdldENoZWNrYm94KCk7XG4gICAgdGhpcy5jb250cm9sID0gdGhpcy50aGVtZS5nZXRGb3JtQ29udHJvbCh0aGlzLmxhYmVsLCB0aGlzLmlucHV0LCB0aGlzLmRlc2NyaXB0aW9uKTtcblxuICAgIGlmKHRoaXMuc2NoZW1hLnJlYWRPbmx5IHx8IHRoaXMuc2NoZW1hLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmFsd2F5c19kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNlbGYudmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250cm9sKTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5hbHdheXNfZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbnB1dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5sYWJlbCAmJiB0aGlzLmxhYmVsLnBhcmVudE5vZGUpIHRoaXMubGFiZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24ucGFyZW50Tm9kZSkgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIGlmKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5wYXJlbnROb2RlKSB0aGlzLmlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5pbnB1dCk7XG4gICAgdGhpcy5fc3VwZXIoKTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycy5hcnJheVNlbGVjdGl6ZSA9IEpTT05FZGl0b3IuQWJzdHJhY3RFZGl0b3IuZXh0ZW5kKHtcbiAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRoZW1lLmdldEZvcm1JbnB1dExhYmVsKHRoaXMuZ2V0VGl0bGUoKSk7XG5cbiAgICB0aGlzLnRpdGxlX2NvbnRyb2xzID0gdGhpcy50aGVtZS5nZXRIZWFkZXJCdXR0b25Ib2xkZXIoKTtcbiAgICB0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMudGl0bGVfY29udHJvbHMpO1xuICAgIHRoaXMuZXJyb3JfaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZih0aGlzLnNjaGVtYS5kZXNjcmlwdGlvbikge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMudGhlbWUuZ2V0RGVzY3JpcHRpb24odGhpcy5zY2hlbWEuZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcblxuICAgIHZhciBncm91cCA9IHRoaXMudGhlbWUuZ2V0Rm9ybUNvbnRyb2wodGhpcy50aXRsZSwgdGhpcy5pbnB1dCwgdGhpcy5kZXNjcmlwdGlvbik7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChncm91cCk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lcnJvcl9ob2xkZXIpO1xuXG4gICAgd2luZG93LmpRdWVyeSh0aGlzLmlucHV0KS5zZWxlY3RpemUoe1xuICAgICAgZGVsaW1pdGVyOiBmYWxzZSxcbiAgICAgIGNyZWF0ZU9uQmx1cjogdHJ1ZSxcbiAgICAgIGNyZWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9LFxuICBwb3N0QnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5pbnB1dC5zZWxlY3RpemUub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgc2VsZi5yZWZyZXNoVmFsdWUoKTtcbiAgICAgICAgICBzZWxmLm9uQ2hhbmdlKHRydWUpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZW1wdHkodHJ1ZSk7XG4gICAgaWYodGhpcy50aXRsZSAmJiB0aGlzLnRpdGxlLnBhcmVudE5vZGUpIHRoaXMudGl0bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24ucGFyZW50Tm9kZSkgdGhpcy5kZXNjcmlwdGlvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIGlmKHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5wYXJlbnROb2RlKSB0aGlzLmlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5pbnB1dCk7XG5cbiAgICB0aGlzLl9zdXBlcigpO1xuICB9LFxuICBlbXB0eTogZnVuY3Rpb24oaGFyZCkge30sXG4gIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgaW5pdGlhbCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBVcGRhdGUgdGhlIGFycmF5J3MgdmFsdWUsIGFkZGluZy9yZW1vdmluZyByb3dzIHdoZW4gbmVjZXNzYXJ5XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBbXTtcbiAgICBpZighKEFycmF5LmlzQXJyYXkodmFsdWUpKSkgdmFsdWUgPSBbdmFsdWVdO1xuXG4gICAgdGhpcy5pbnB1dC5zZWxlY3RpemUuY2xlYXJPcHRpb25zKCk7XG4gICAgdGhpcy5pbnB1dC5zZWxlY3RpemUuY2xlYXIodHJ1ZSk7XG5cbiAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHNlbGYuaW5wdXQuc2VsZWN0aXplLmFkZE9wdGlvbih7dGV4dDogaXRlbSwgdmFsdWU6IGl0ZW19KTtcbiAgICB9KTtcbiAgICB0aGlzLmlucHV0LnNlbGVjdGl6ZS5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICB0aGlzLnJlZnJlc2hWYWx1ZShpbml0aWFsKTtcbiAgfSxcbiAgcmVmcmVzaFZhbHVlOiBmdW5jdGlvbihmb3JjZSkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnNlbGVjdGl6ZS5nZXRWYWx1ZSgpO1xuICB9LFxuICBzaG93VmFsaWRhdGlvbkVycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gR2V0IGFsbCB0aGUgZXJyb3JzIHRoYXQgcGVydGFpbiB0byB0aGlzIGVkaXRvclxuICAgIHZhciBteV9lcnJvcnMgPSBbXTtcbiAgICB2YXIgb3RoZXJfZXJyb3JzID0gW107XG4gICAgJGVhY2goZXJyb3JzLCBmdW5jdGlvbihpLGVycm9yKSB7XG4gICAgICBpZihlcnJvci5wYXRoID09PSBzZWxmLnBhdGgpIHtcbiAgICAgICAgbXlfZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG90aGVyX2Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNob3cgZXJyb3JzIGZvciB0aGlzIGVkaXRvclxuICAgIGlmKHRoaXMuZXJyb3JfaG9sZGVyKSB7XG5cbiAgICAgIGlmKG15X2Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBbXTtcbiAgICAgICAgdGhpcy5lcnJvcl9ob2xkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuZXJyb3JfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgJGVhY2gobXlfZXJyb3JzLCBmdW5jdGlvbihpLGVycm9yKSB7XG4gICAgICAgICAgc2VsZi5lcnJvcl9ob2xkZXIuYXBwZW5kQ2hpbGQoc2VsZi50aGVtZS5nZXRFcnJvck1lc3NhZ2UoZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEhpZGUgZXJyb3IgYXJlYVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3JfaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxudmFyIG1hdGNoS2V5ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgaWYgKGVsZW0ubWF0Y2hlcykgcmV0dXJuICdtYXRjaGVzJztcbiAgZWxzZSBpZiAoZWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHJldHVybiAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJztcbiAgZWxzZSBpZiAoZWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IpIHJldHVybiAnbW96TWF0Y2hlc1NlbGVjdG9yJztcbiAgZWxzZSBpZiAoZWxlbS5tc01hdGNoZXNTZWxlY3RvcikgcmV0dXJuICdtc01hdGNoZXNTZWxlY3Rvcic7XG4gIGVsc2UgaWYgKGVsZW0ub01hdGNoZXNTZWxlY3RvcikgcmV0dXJuICdvTWF0Y2hlc1NlbGVjdG9yJztcbn0pKCk7XG5cbkpTT05FZGl0b3IuQWJzdHJhY3RUaGVtZSA9IENsYXNzLmV4dGVuZCh7XG4gIGdldENvbnRhaW5lcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9LFxuICBnZXRGbG9hdFJpZ2h0TGlua0hvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuc3R5bGUgPSBlbC5zdHlsZSB8fCB7fTtcbiAgICBlbC5zdHlsZS5jc3NGbG9hdCA9ICdyaWdodCc7XG4gICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldE1vZGFsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIGVsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgIGVsLnN0eWxlLmJveFNoYWRvdyA9ICczcHggM3B4IGJsYWNrJztcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuc3R5bGUuekluZGV4ID0gJzEwJztcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0R3JpZENvbnRhaW5lcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRHcmlkUm93OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAncm93JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEdyaWRDb2x1bW46IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgc2V0R3JpZENvbHVtblNpemU6IGZ1bmN0aW9uKGVsLHNpemUpIHtcblxuICB9LFxuICBnZXRMaW5rOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsJyMnKTtcbiAgICBlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBkaXNhYmxlSGVhZGVyOiBmdW5jdGlvbihoZWFkZXIpIHtcbiAgICBoZWFkZXIuc3R5bGUuY29sb3IgPSAnI2NjYyc7XG4gIH0sXG4gIGRpc2FibGVMYWJlbDogZnVuY3Rpb24obGFiZWwpIHtcbiAgICBsYWJlbC5zdHlsZS5jb2xvciA9ICcjY2NjJztcbiAgfSxcbiAgZW5hYmxlSGVhZGVyOiBmdW5jdGlvbihoZWFkZXIpIHtcbiAgICBoZWFkZXIuc3R5bGUuY29sb3IgPSAnJztcbiAgfSxcbiAgZW5hYmxlTGFiZWw6IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgbGFiZWwuc3R5bGUuY29sb3IgPSAnJztcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldENoZWNrYm94TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLmdldEZvcm1JbnB1dExhYmVsKHRleHQpO1xuICAgIGVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEhlYWRlcjogZnVuY3Rpb24odGV4dCkge1xuICAgIC8vdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXG4gICAgLy8gUkVCXG4gICAgLy8gaWYodHlwZW9mIHRleHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyAgIGVsLnRleHRDb250ZW50ID0gJ3RleHQnO1xuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgIGVsLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIC8vIH1cblxuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Q2hlY2tib3g6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0Rm9ybUlucHV0RmllbGQoJ2NoZWNrYm94Jyk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgIGVsLnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0TXVsdGlDaGVja2JveEhvbGRlcjogZnVuY3Rpb24oY29udHJvbHMsbGFiZWwsZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmKGxhYmVsKSB7XG4gICAgICBsYWJlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIGVsLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgaW4gY29udHJvbHMpIHtcbiAgICAgIGlmKCFjb250cm9scy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICBjb250cm9sc1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICBjb250cm9sc1tpXS5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNvbnRyb2xzW2ldKTtcbiAgICB9XG5cbiAgICBpZihkZXNjcmlwdGlvbikgZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRTZWxlY3RJbnB1dDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICBpZihvcHRpb25zKSB0aGlzLnNldFNlbGVjdE9wdGlvbnMoc2VsZWN0LCBvcHRpb25zKTtcbiAgICByZXR1cm4gc2VsZWN0O1xuICB9LFxuICBnZXRTd2l0Y2hlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBzd2l0Y2hlciA9IHRoaXMuZ2V0U2VsZWN0SW5wdXQob3B0aW9ucyk7XG4gICAgc3dpdGNoZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICBzd2l0Y2hlci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgc3dpdGNoZXIuc3R5bGUuZm9udFN0eWxlID0gJ2l0YWxpYyc7XG4gICAgc3dpdGNoZXIuc3R5bGUuZm9udFdlaWdodCA9ICdub3JtYWwnO1xuICAgIHN3aXRjaGVyLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICBzd2l0Y2hlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIHN3aXRjaGVyLnN0eWxlLm1hcmdpbkxlZnQgPSAnNXB4JztcbiAgICBzd2l0Y2hlci5zdHlsZS5wYWRkaW5nID0gJzAgMCAwIDNweCc7XG4gICAgc3dpdGNoZXIuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgcmV0dXJuIHN3aXRjaGVyO1xuICB9LFxuICBnZXRTd2l0Y2hlck9wdGlvbnM6IGZ1bmN0aW9uKHN3aXRjaGVyKSB7XG4gICAgcmV0dXJuIHN3aXRjaGVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKTtcbiAgfSxcbiAgc2V0U3dpdGNoZXJPcHRpb25zOiBmdW5jdGlvbihzd2l0Y2hlciwgb3B0aW9ucywgdGl0bGVzKSB7XG4gICAgdGhpcy5zZXRTZWxlY3RPcHRpb25zKHN3aXRjaGVyLCBvcHRpb25zLCB0aXRsZXMpO1xuICB9LFxuICBzZXRTZWxlY3RPcHRpb25zOiBmdW5jdGlvbihzZWxlY3QsIG9wdGlvbnMsIHRpdGxlcykge1xuICAgIHRpdGxlcyA9IHRpdGxlcyB8fCBbXTtcbiAgICBzZWxlY3QuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yKHZhciBpPTA7IGk8b3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLG9wdGlvbnNbaV0pO1xuICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gdGl0bGVzW2ldIHx8IG9wdGlvbnNbaV07XG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9XG4gIH0sXG4gIGdldFRleHRhcmVhSW5wdXQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZWwuc3R5bGUgPSBlbC5zdHlsZSB8fCB7fTtcbiAgICBlbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSAnMzAwcHgnO1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldFJhbmdlSW5wdXQ6IGZ1bmN0aW9uKG1pbixtYXgsc3RlcCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0Rm9ybUlucHV0RmllbGQoJ3JhbmdlJyk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdtaW4nLG1pbik7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdtYXgnLG1heCk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdzdGVwJyxzdGVwKTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1JbnB1dEZpZWxkOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLHR5cGUpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWZ0ZXJJbnB1dFJlYWR5OiBmdW5jdGlvbihpbnB1dCkge1xuXG4gIH0sXG4gIGdldEZvcm1Db250cm9sOiBmdW5jdGlvbihsYWJlbCwgaW5wdXQsIGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCc7XG4gICAgaWYobGFiZWwpIGVsLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBpZihpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBsYWJlbC5pbnNlcnRCZWZvcmUoaW5wdXQsbGFiZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIH1cblxuICAgIGlmKGRlc2NyaXB0aW9uKSBlbC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRJbmRlbnRlZFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5zdHlsZSA9IGVsLnN0eWxlIHx8IHt9O1xuICAgIGVsLnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzEwcHgnO1xuICAgIGVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTBweCc7XG4gICAgZWwuc3R5bGUuYm9yZGVyTGVmdCA9ICcxcHggc29saWQgI2NjYyc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRDaGlsZEVkaXRvckhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9LFxuICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBlbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Q2hlY2tib3hEZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHJldHVybiB0aGlzLmdldERlc2NyaXB0aW9uKHRleHQpO1xuICB9LFxuICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHJldHVybiB0aGlzLmdldERlc2NyaXB0aW9uKHRleHQpO1xuICB9LFxuICBnZXRIZWFkZXJCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldEJ1dHRvbkhvbGRlcigpO1xuICB9LFxuICBnZXRCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgfSxcbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVsLnR5cGUgPSAnYnV0dG9uJztcbiAgICB0aGlzLnNldEJ1dHRvblRleHQoZWwsdGV4dCxpY29uLHRpdGxlKTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIHNldEJ1dHRvblRleHQ6IGZ1bmN0aW9uKGJ1dHRvbiwgdGV4dCwgaWNvbiwgdGl0bGUpIHtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJyc7XG4gICAgaWYoaWNvbikge1xuICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgYnV0dG9uLmlubmVySFRNTCArPSAnICc7XG4gICAgfVxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgaWYodGl0bGUpIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJyx0aXRsZSk7XG4gIH0sXG4gIGdldFRhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgfSxcbiAgZ2V0VGFibGVSb3c6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICB9LFxuICBnZXRUYWJsZUhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICB9LFxuICBnZXRUYWJsZUJvZHk6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICB9LFxuICBnZXRUYWJsZUhlYWRlckNlbGw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldFRhYmxlQ2VsbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEVycm9yTWVzc2FnZTogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBlbC5zdHlsZSA9IGVsLnN0eWxlIHx8IHt9O1xuICAgIGVsLnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWRkSW5wdXRFcnJvcjogZnVuY3Rpb24oaW5wdXQsIHRleHQpIHtcbiAgfSxcbiAgcmVtb3ZlSW5wdXRFcnJvcjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgfSxcbiAgYWRkVGFibGVSb3dFcnJvcjogZnVuY3Rpb24ocm93KSB7XG4gIH0sXG4gIHJlbW92ZVRhYmxlUm93RXJyb3I6IGZ1bmN0aW9uKHJvdykge1xuICB9LFxuICBnZXRUYWJIb2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmlubmVySFRNTCA9IFwiPGRpdiBzdHlsZT0nZmxvYXQ6IGxlZnQ7IHdpZHRoOiAxMzBweDsnIGNsYXNzPSd0YWJzJz48L2Rpdj48ZGl2IGNsYXNzPSdjb250ZW50JyBzdHlsZT0nbWFyZ2luLWxlZnQ6IDEzMHB4Oyc+PC9kaXY+PGRpdiBzdHlsZT0nY2xlYXI6Ym90aDsnPjwvZGl2PlwiO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYXBwbHlTdHlsZXM6IGZ1bmN0aW9uKGVsLHN0eWxlcykge1xuICAgIGVsLnN0eWxlID0gZWwuc3R5bGUgfHwge307XG4gICAgZm9yKHZhciBpIGluIHN0eWxlcykge1xuICAgICAgaWYoIXN0eWxlcy5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG4gICAgICBlbC5zdHlsZVtpXSA9IHN0eWxlc1tpXTtcbiAgICB9XG4gIH0sXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGVsZW0gJiYgZWxlbSAhPT0gZG9jdW1lbnQpIHtcbiAgICAgIGlmIChlbGVtW21hdGNoS2V5XSkge1xuICAgICAgICBpZiAoZWxlbVttYXRjaEtleV0oc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBnZXRUYWI6IGZ1bmN0aW9uKHNwYW4pIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICBlbC5zdHlsZSA9IGVsLnN0eWxlIHx8IHt9O1xuICAgIHRoaXMuYXBwbHlTdHlsZXMoZWwse1xuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNjY2MnLFxuICAgICAgYm9yZGVyV2lkdGg6ICcxcHggMCAxcHggMXB4JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsaW5lSGVpZ2h0OiAnMzBweCcsXG4gICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxuICAgICAgYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM6IDAsXG4gICAgICBib3JkZXJUb3BSaWdodFJhZGl1czogMCxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfSk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJDb250ZW50SG9sZGVyOiBmdW5jdGlvbih0YWJfaG9sZGVyKSB7XG4gICAgcmV0dXJuIHRhYl9ob2xkZXIuY2hpbGRyZW5bMV07XG4gIH0sXG4gIGdldFRhYkNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldEluZGVudGVkUGFuZWwoKTtcbiAgfSxcbiAgbWFya1RhYkFjdGl2ZTogZnVuY3Rpb24odGFiKSB7XG4gICAgdGhpcy5hcHBseVN0eWxlcyh0YWIse1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZSdcbiAgICB9KTtcbiAgfSxcbiAgbWFya1RhYkluYWN0aXZlOiBmdW5jdGlvbih0YWIpIHtcbiAgICB0aGlzLmFwcGx5U3R5bGVzKHRhYix7XG4gICAgICBvcGFjaXR5OjAuNSxcbiAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgfSk7XG4gIH0sXG4gIGFkZFRhYjogZnVuY3Rpb24oaG9sZGVyLCB0YWIpIHtcbiAgICBob2xkZXIuY2hpbGRyZW5bMF0uYXBwZW5kQ2hpbGQodGFiKTtcbiAgfSxcbiAgZ2V0QmxvY2tMaW5rOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHJldHVybiBsaW5rO1xuICB9LFxuICBnZXRCbG9ja0xpbmtIb2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0TGlua3NIb2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgY3JlYXRlTWVkaWFMaW5rOiBmdW5jdGlvbihob2xkZXIsbGluayxtZWRpYSkge1xuICAgIGhvbGRlci5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBtZWRpYS5zdHlsZS53aWR0aD0nMTAwJSc7XG4gICAgaG9sZGVyLmFwcGVuZENoaWxkKG1lZGlhKTtcbiAgfSxcbiAgY3JlYXRlSW1hZ2VMaW5rOiBmdW5jdGlvbihob2xkZXIsbGluayxpbWFnZSkge1xuICAgIGhvbGRlci5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmJvb3RzdHJhcDIgPSBKU09ORWRpdG9yLkFic3RyYWN0VGhlbWUuZXh0ZW5kKHtcbiAgZ2V0UmFuZ2VJbnB1dDogZnVuY3Rpb24obWluLCBtYXgsIHN0ZXApIHtcbiAgICAvLyBUT0RPOiB1c2UgYm9vdHN0cmFwIHNsaWRlclxuICAgIHJldHVybiB0aGlzLl9zdXBlcihtaW4sIG1heCwgc3RlcCk7XG4gIH0sXG4gIGdldEdyaWRDb250YWluZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdjb250YWluZXItZmx1aWQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0R3JpZFJvdzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3Jvdy1mbHVpZCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRGb3JtSW5wdXRMYWJlbDogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQpO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICBlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgc2V0R3JpZENvbHVtblNpemU6IGZ1bmN0aW9uKGVsLHNpemUpIHtcbiAgICBlbC5jbGFzc05hbWUgPSAnc3Bhbicrc2l6ZTtcbiAgfSxcbiAgZ2V0U2VsZWN0SW5wdXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgaW5wdXQgPSB0aGlzLl9zdXBlcihvcHRpb25zKTtcbiAgICBpbnB1dC5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICBpbnB1dC5zdHlsZS5tYXhXaWR0aCA9ICc5OCUnO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0RmllbGQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0eXBlKTtcbiAgICBlbC5zdHlsZS53aWR0aCA9ICc5OCUnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWZ0ZXJJbnB1dFJlYWR5OiBmdW5jdGlvbihpbnB1dCkge1xuICAgIGlmKGlucHV0LmNvbnRyb2xncm91cCkgcmV0dXJuO1xuICAgIGlucHV0LmNvbnRyb2xncm91cCA9IHRoaXMuY2xvc2VzdChpbnB1dCwnLmNvbnRyb2wtZ3JvdXAnKTtcbiAgICBpbnB1dC5jb250cm9scyA9IHRoaXMuY2xvc2VzdChpbnB1dCwnLmNvbnRyb2xzJyk7XG4gICAgaWYodGhpcy5jbG9zZXN0KGlucHV0LCcuY29tcGFjdCcpKSB7XG4gICAgICBpbnB1dC5jb250cm9sZ3JvdXAuY2xhc3NOYW1lID0gaW5wdXQuY29udHJvbGdyb3VwLmNsYXNzTmFtZS5yZXBsYWNlKC9jb250cm9sLWdyb3VwL2csJycpLnJlcGxhY2UoL1sgXXsyLH0vZywnICcpO1xuICAgICAgaW5wdXQuY29udHJvbHMuY2xhc3NOYW1lID0gaW5wdXQuY29udHJvbGdyb3VwLmNsYXNzTmFtZS5yZXBsYWNlKC9jb250cm9scy9nLCcnKS5yZXBsYWNlKC9bIF17Mix9L2csJyAnKTtcbiAgICAgIGlucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IDA7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogdXNlIGJvb3RzdHJhcCBzbGlkZXJcbiAgfSxcbiAgZ2V0SW5kZW50ZWRQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3dlbGwgd2VsbC1zbWFsbCc7XG4gICAgZWwuc3R5bGUucGFkZGluZ0JvdHRvbSA9IDA7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAnaGVscC1pbmxpbmUnO1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1Db250cm9sOiBmdW5jdGlvbihsYWJlbCwgaW5wdXQsIGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHJldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldC5jbGFzc05hbWUgPSAnY29udHJvbC1ncm91cCc7XG5cbiAgICB2YXIgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250cm9scy5jbGFzc05hbWUgPSAnY29udHJvbHMnO1xuXG4gICAgaWYobGFiZWwgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdjaGVja2JveCcpIHtcbiAgICAgIHJldC5hcHBlbmRDaGlsZChjb250cm9scyk7XG4gICAgICBsYWJlbC5jbGFzc05hbWUgKz0gJyBjaGVja2JveCc7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICBjb250cm9scy5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICBjb250cm9scy5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYobGFiZWwpIHtcbiAgICAgICAgbGFiZWwuY2xhc3NOYW1lICs9ICcgY29udHJvbC1sYWJlbCc7XG4gICAgICAgIHJldC5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICB9XG4gICAgICBjb250cm9scy5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICByZXQuYXBwZW5kQ2hpbGQoY29udHJvbHMpO1xuICAgIH1cblxuICAgIGlmKGRlc2NyaXB0aW9uKSBjb250cm9scy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuICBnZXRIZWFkZXJCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0QnV0dG9uSG9sZGVyKCk7XG4gICAvLyBlbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwcHgnOyBSRUJcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEJ1dHRvbkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2J0bi1ncm91cCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRCdXR0b246IGZ1bmN0aW9uKHRleHQsIGljb24sIHRpdGxlKSB7XG4gICAgdmFyIGVsID0gIHRoaXMuX3N1cGVyKHRleHQsIGljb24sIHRpdGxlKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyBidG4gYnRuLWRlZmF1bHQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3RhYmxlIHRhYmxlLWJvcmRlcmVkJztcbiAgICBlbC5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICBlbC5zdHlsZS5tYXhXaWR0aCA9ICdub25lJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGFkZElucHV0RXJyb3I6IGZ1bmN0aW9uKGlucHV0LHRleHQpIHtcbiAgICBpZighaW5wdXQuY29udHJvbGdyb3VwIHx8ICFpbnB1dC5jb250cm9scykgcmV0dXJuO1xuICAgIGlucHV0LmNvbnRyb2xncm91cC5jbGFzc05hbWUgKz0gJyBlcnJvcic7XG4gICAgaWYoIWlucHV0LmVycm1zZykge1xuICAgICAgaW5wdXQuZXJybXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgaW5wdXQuZXJybXNnLmNsYXNzTmFtZSA9ICdoZWxwLWJsb2NrIGVycm9ybXNnJztcbiAgICAgIGlucHV0LmNvbnRyb2xzLmFwcGVuZENoaWxkKGlucHV0LmVycm1zZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5wdXQuZXJybXNnLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG5cbiAgICBpbnB1dC5lcnJtc2cudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxuICByZW1vdmVJbnB1dEVycm9yOiBmdW5jdGlvbihpbnB1dCkge1xuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHJldHVybjtcbiAgICBpbnB1dC5lcnJtc2cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBpbnB1dC5jb250cm9sZ3JvdXAuY2xhc3NOYW1lID0gaW5wdXQuY29udHJvbGdyb3VwLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHM/ZXJyb3IvZywnJyk7XG4gIH0sXG4gIGdldFRhYkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3RhYmJhYmxlIHRhYnMtbGVmdCc7XG4gICAgZWwuaW5uZXJIVE1MID0gXCI8dWwgY2xhc3M9J25hdiBuYXYtdGFicyBzcGFuMicgc3R5bGU9J21hcmdpbi1yaWdodDogMDsnPjwvdWw+PGRpdiBjbGFzcz0ndGFiLWNvbnRlbnQgc3BhbjEwJyBzdHlsZT0nb3ZlcmZsb3c6dmlzaWJsZTsnPjwvZGl2PlwiO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFiOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsJyMnKTtcbiAgICBhLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIGVsLmFwcGVuZENoaWxkKGEpO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFiQ29udGVudEhvbGRlcjogZnVuY3Rpb24odGFiX2hvbGRlcikge1xuICAgIHJldHVybiB0YWJfaG9sZGVyLmNoaWxkcmVuWzFdO1xuICB9LFxuICBnZXRUYWJDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAndGFiLXBhbmUgYWN0aXZlJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIG1hcmtUYWJBY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICB9LFxuICBtYXJrVGFiSW5hY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccz9hY3RpdmUvZywnJyk7XG4gIH0sXG4gIGFkZFRhYjogZnVuY3Rpb24oaG9sZGVyLCB0YWIpIHtcbiAgICBob2xkZXIuY2hpbGRyZW5bMF0uYXBwZW5kQ2hpbGQodGFiKTtcbiAgfSxcbiAgZ2V0UHJvZ3Jlc3NCYXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3Byb2dyZXNzJztcblxuICAgIHZhciBiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYXIuY2xhc3NOYW1lID0gJ2Jhcic7XG4gICAgYmFyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmFyKTtcblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH0sXG4gIHVwZGF0ZVByb2dyZXNzQmFyOiBmdW5jdGlvbihwcm9ncmVzc0JhciwgcHJvZ3Jlc3MpIHtcbiAgICBpZiAoIXByb2dyZXNzQmFyKSByZXR1cm47XG5cbiAgICBwcm9ncmVzc0Jhci5maXJzdENoaWxkLnN0eWxlLndpZHRoID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgfSxcbiAgdXBkYXRlUHJvZ3Jlc3NCYXJVbmtub3duOiBmdW5jdGlvbihwcm9ncmVzc0Jhcikge1xuICAgIGlmICghcHJvZ3Jlc3NCYXIpIHJldHVybjtcblxuICAgIHByb2dyZXNzQmFyLmNsYXNzTmFtZSA9ICdwcm9ncmVzcyBwcm9ncmVzcy1zdHJpcGVkIGFjdGl2ZSc7XG4gICAgcHJvZ3Jlc3NCYXIuZmlyc3RDaGlsZC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmJvb3RzdHJhcDMgPSBKU09ORWRpdG9yLkFic3RyYWN0VGhlbWUuZXh0ZW5kKHtcbiAgZ2V0U2VsZWN0SW5wdXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcihvcHRpb25zKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJ2Zvcm0tY29udHJvbCc7XG4gICAgLy9lbC5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIHNldEdyaWRDb2x1bW5TaXplOiBmdW5jdGlvbihlbCxzaXplKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2NvbC1tZC0nK3NpemU7XG4gIH0sXG4gIGFmdGVySW5wdXRSZWFkeTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICBpZihpbnB1dC5jb250cm9sZ3JvdXApIHJldHVybjtcbiAgICBpbnB1dC5jb250cm9sZ3JvdXAgPSB0aGlzLmNsb3Nlc3QoaW5wdXQsJy5mb3JtLWdyb3VwJyk7XG4gICAgaWYodGhpcy5jbG9zZXN0KGlucHV0LCcuY29tcGFjdCcpKSB7XG4gICAgICBpbnB1dC5jb250cm9sZ3JvdXAuc3R5bGUubWFyZ2luQm90dG9tID0gMDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiB1c2UgYm9vdHN0cmFwIHNsaWRlclxuICB9LFxuICBnZXRUZXh0YXJlYUlucHV0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0UmFuZ2VJbnB1dDogZnVuY3Rpb24obWluLCBtYXgsIHN0ZXApIHtcbiAgICAvLyBUT0RPOiB1c2UgYmV0dGVyIHNsaWRlclxuICAgIHJldHVybiB0aGlzLl9zdXBlcihtaW4sIG1heCwgc3RlcCk7XG4gIH0sXG4gIGdldEZvcm1JbnB1dEZpZWxkOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIodHlwZSk7XG4gICAgaWYodHlwZSAhPT0gJ2NoZWNrYm94Jykge1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICdmb3JtLWNvbnRyb2wnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1Db250cm9sOiBmdW5jdGlvbihsYWJlbCwgaW5wdXQsIGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBpZihsYWJlbCAmJiBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBncm91cC5jbGFzc05hbWUgKz0gJyBjaGVja2JveCc7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICAgIGdyb3VwLnN0eWxlLm1hcmdpblRvcCA9ICcwJztcbiAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIGlucHV0LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGlucHV0LnN0eWxlLmNzc0Zsb2F0ID0gJ2xlZnQnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdyb3VwLmNsYXNzTmFtZSArPSAnIGZvcm0tZ3JvdXAnO1xuICAgICAgaWYobGFiZWwpIHtcbiAgICAgICAgbGFiZWwuY2xhc3NOYW1lICs9ICcgY29udHJvbC1sYWJlbCc7XG4gICAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICB9XG5cbiAgICBpZihkZXNjcmlwdGlvbikgZ3JvdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9LFxuICBnZXRJbmRlbnRlZFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAnd2VsbCB3ZWxsLXNtJztcbiAgICBlbC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1JbnB1dERlc2NyaXB0aW9uOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdoZWxwLWJsb2NrJztcbiAgICBlbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0SGVhZGVyQnV0dG9uSG9sZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSB0aGlzLmdldEJ1dHRvbkhvbGRlcigpO1xuICAgLy8gZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JzsgUkVCXG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdidG4tZ3JvdXAnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQsIGljb24sIHRpdGxlKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJ2J0biBidG4tZGVmYXVsdCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAndGFibGUgdGFibGUtYm9yZGVyZWQnO1xuICAgIGVsLnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgIGVsLnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcblxuICBhZGRJbnB1dEVycm9yOiBmdW5jdGlvbihpbnB1dCx0ZXh0KSB7XG4gICAgaWYoIWlucHV0LmNvbnRyb2xncm91cCkgcmV0dXJuO1xuICAgIGlucHV0LmNvbnRyb2xncm91cC5jbGFzc05hbWUgKz0gJyBoYXMtZXJyb3InO1xuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHtcbiAgICAgIGlucHV0LmVycm1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGlucHV0LmVycm1zZy5jbGFzc05hbWUgPSAnaGVscC1ibG9jayBlcnJvcm1zZyc7XG4gICAgICBpbnB1dC5jb250cm9sZ3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXQuZXJybXNnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpbnB1dC5lcnJtc2cuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICAgIGlucHV0LmVycm1zZy50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH0sXG4gIHJlbW92ZUlucHV0RXJyb3I6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgaWYoIWlucHV0LmVycm1zZykgcmV0dXJuO1xuICAgIGlucHV0LmVycm1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGlucHV0LmNvbnRyb2xncm91cC5jbGFzc05hbWUgPSBpbnB1dC5jb250cm9sZ3JvdXAuY2xhc3NOYW1lLnJlcGxhY2UoL1xccz9oYXMtZXJyb3IvZywnJyk7XG4gIH0sXG4gIGdldFRhYkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSd0YWJzIGxpc3QtZ3JvdXAgY29sLW1kLTInPjwvZGl2PjxkaXYgY2xhc3M9J2NvbC1tZC0xMCc+PC9kaXY+XCI7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3Jvd3MnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFiOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdsaXN0LWdyb3VwLWl0ZW0nO1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsJyMnKTtcbiAgICBlbC5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIG1hcmtUYWJBY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICB9LFxuICBtYXJrVGFiSW5hY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccz9hY3RpdmUvZywnJyk7XG4gIH0sXG4gIGdldFByb2dyZXNzQmFyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWluID0gMCwgbWF4ID0gMTAwLCBzdGFydCA9IDA7XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICdwcm9ncmVzcyc7XG5cbiAgICB2YXIgYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFyLmNsYXNzTmFtZSA9ICdwcm9ncmVzcy1iYXInO1xuICAgIGJhci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJvZ3Jlc3NiYXInKTtcbiAgICBiYXIuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93Jywgc3RhcnQpO1xuICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtaW4nLCBtaW4pO1xuICAgIGJhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVuYXgnLCBtYXgpO1xuICAgIGJhci5pbm5lckhUTUwgPSBzdGFydCArIFwiJVwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChiYXIpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfSxcbiAgdXBkYXRlUHJvZ3Jlc3NCYXI6IGZ1bmN0aW9uKHByb2dyZXNzQmFyLCBwcm9ncmVzcykge1xuICAgIGlmICghcHJvZ3Jlc3NCYXIpIHJldHVybjtcblxuICAgIHZhciBiYXIgPSBwcm9ncmVzc0Jhci5maXJzdENoaWxkO1xuICAgIHZhciBwZXJjZW50YWdlID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgICBiYXIuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93JywgcHJvZ3Jlc3MpO1xuICAgIGJhci5zdHlsZS53aWR0aCA9IHBlcmNlbnRhZ2U7XG4gICAgYmFyLmlubmVySFRNTCA9IHBlcmNlbnRhZ2U7XG4gIH0sXG4gIHVwZGF0ZVByb2dyZXNzQmFyVW5rbm93bjogZnVuY3Rpb24ocHJvZ3Jlc3NCYXIpIHtcbiAgICBpZiAoIXByb2dyZXNzQmFyKSByZXR1cm47XG5cbiAgICB2YXIgYmFyID0gcHJvZ3Jlc3NCYXIuZmlyc3RDaGlsZDtcbiAgICBwcm9ncmVzc0Jhci5jbGFzc05hbWUgPSAncHJvZ3Jlc3MgcHJvZ3Jlc3Mtc3RyaXBlZCBhY3RpdmUnO1xuICAgIGJhci5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnKTtcbiAgICBiYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgYmFyLmlubmVySFRNTCA9ICcnO1xuICB9XG59KTtcblxuLy8gQmFzZSBGb3VuZGF0aW9uIHRoZW1lXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRoZW1lcy5mb3VuZGF0aW9uID0gSlNPTkVkaXRvci5BYnN0cmFjdFRoZW1lLmV4dGVuZCh7XG4gIGdldENoaWxkRWRpdG9ySG9sZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRTZWxlY3RJbnB1dDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKG9wdGlvbnMpO1xuICAgIGVsLnN0eWxlLm1pbldpZHRoID0gJ25vbmUnO1xuICAgIGVsLnN0eWxlLnBhZGRpbmcgPSAnNXB4JztcbiAgICBlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnM3B4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldFN3aXRjaGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIob3B0aW9ucyk7XG4gICAgZWwuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzhweCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBhZnRlcklucHV0UmVhZHk6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgaWYodGhpcy5jbG9zZXN0KGlucHV0LCcuY29tcGFjdCcpKSB7XG4gICAgICBpbnB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIH1cbiAgICBpbnB1dC5ncm91cCA9IHRoaXMuY2xvc2VzdChpbnB1dCwnLmZvcm0tY29udHJvbCcpO1xuICB9LFxuICBnZXRGb3JtSW5wdXRMYWJlbDogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQpO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1JbnB1dEZpZWxkOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIodHlwZSk7XG4gICAgZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgZWwuc3R5bGUubWFyZ2luQm90dG9tID0gdHlwZT09PSdjaGVja2JveCc/ICcwJyA6ICcxMnB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1JbnB1dERlc2NyaXB0aW9uOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnLTEwcHgnO1xuICAgIGVsLnN0eWxlLmZvbnRTdHlsZSA9ICdpdGFsaWMnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0SW5kZW50ZWRQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcbiAgICBlbC5zdHlsZS5wYWRkaW5nQm90dG9tID0gMDtcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEhlYWRlckJ1dHRvbkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gdGhpcy5nZXRCdXR0b25Ib2xkZXIoKTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JztcbiAgICBlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ21pZGRsZSc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdidXR0b24tZ3JvdXAnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQsIGljb24sIHRpdGxlKTtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyBzbWFsbCBidXR0b24nO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWRkSW5wdXRFcnJvcjogZnVuY3Rpb24oaW5wdXQsdGV4dCkge1xuICAgIGlmKCFpbnB1dC5ncm91cCkgcmV0dXJuO1xuICAgIGlucHV0Lmdyb3VwLmNsYXNzTmFtZSArPSAnIGVycm9yJztcblxuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHtcbiAgICAgIGlucHV0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCc8c21hbGwgY2xhc3M9XCJlcnJvclwiPjwvc21hbGw+Jyk7XG4gICAgICBpbnB1dC5lcnJtc2cgPSBpbnB1dC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Vycm9yJylbMF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5wdXQuZXJybXNnLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG5cbiAgICBpbnB1dC5lcnJtc2cudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxuICByZW1vdmVJbnB1dEVycm9yOiBmdW5jdGlvbihpbnB1dCkge1xuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHJldHVybjtcbiAgICBpbnB1dC5ncm91cC5jbGFzc05hbWUgPSBpbnB1dC5ncm91cC5jbGFzc05hbWUucmVwbGFjZSgvIGVycm9yL2csJycpO1xuICAgIGlucHV0LmVycm1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9LFxuICBnZXRQcm9ncmVzc0JhcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByb2dyZXNzQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvZ3Jlc3NCYXIuY2xhc3NOYW1lID0gJ3Byb2dyZXNzJztcblxuICAgIHZhciBtZXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtZXRlci5jbGFzc05hbWUgPSAnbWV0ZXInO1xuICAgIG1ldGVyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICBwcm9ncmVzc0Jhci5hcHBlbmRDaGlsZChtZXRlcik7XG4gICAgcmV0dXJuIHByb2dyZXNzQmFyO1xuICB9LFxuICB1cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24ocHJvZ3Jlc3NCYXIsIHByb2dyZXNzKSB7XG4gICAgaWYgKCFwcm9ncmVzc0JhcikgcmV0dXJuO1xuICAgIHByb2dyZXNzQmFyLmZpcnN0Q2hpbGQuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJztcbiAgfSxcbiAgdXBkYXRlUHJvZ3Jlc3NCYXJVbmtub3duOiBmdW5jdGlvbihwcm9ncmVzc0Jhcikge1xuICAgIGlmICghcHJvZ3Jlc3NCYXIpIHJldHVybjtcbiAgICBwcm9ncmVzc0Jhci5maXJzdENoaWxkLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICB9XG59KTtcblxuLy8gRm91bmRhdGlvbiAzIFNwZWNpZmljIFRoZW1lXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRoZW1lcy5mb3VuZGF0aW9uMyA9IEpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmZvdW5kYXRpb24uZXh0ZW5kKHtcbiAgZ2V0SGVhZGVyQnV0dG9uSG9sZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcigpO1xuICAgIGVsLnN0eWxlLmZvbnRTaXplID0gJy42ZW0nO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0ZXh0KTtcbiAgICBlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFiSG9sZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAncm93JztcbiAgICBlbC5pbm5lckhUTUwgPSBcIjxkbCBjbGFzcz0ndGFicyB2ZXJ0aWNhbCB0d28gY29sdW1ucyc+PC9kbD48ZGl2IGNsYXNzPSd0YWJzLWNvbnRlbnQgdGVuIGNvbHVtbnMnPjwvZGl2PlwiO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgc2V0R3JpZENvbHVtblNpemU6IGZ1bmN0aW9uKGVsLHNpemUpIHtcbiAgICB2YXIgc2l6ZXMgPSBbJ3plcm8nLCdvbmUnLCd0d28nLCd0aHJlZScsJ2ZvdXInLCdmaXZlJywnc2l4Jywnc2V2ZW4nLCdlaWdodCcsJ25pbmUnLCd0ZW4nLCdlbGV2ZW4nLCd0d2VsdmUnXTtcbiAgICBlbC5jbGFzc05hbWUgPSAnY29sdW1ucyAnK3NpemVzW3NpemVdO1xuICB9LFxuICBnZXRUYWI6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZCcpO1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywnIycpO1xuICAgIGEuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgZWwuYXBwZW5kQ2hpbGQoYSk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJDb250ZW50SG9sZGVyOiBmdW5jdGlvbih0YWJfaG9sZGVyKSB7XG4gICAgcmV0dXJuIHRhYl9ob2xkZXIuY2hpbGRyZW5bMV07XG4gIH0sXG4gIGdldFRhYkNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdjb250ZW50IGFjdGl2ZSc7XG4gICAgZWwuc3R5bGUucGFkZGluZ0xlZnQgPSAnNXB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIG1hcmtUYWJBY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICB9LFxuICBtYXJrVGFiSW5hY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccyphY3RpdmUvZywnJyk7XG4gIH0sXG4gIGFkZFRhYjogZnVuY3Rpb24oaG9sZGVyLCB0YWIpIHtcbiAgICBob2xkZXIuY2hpbGRyZW5bMF0uYXBwZW5kQ2hpbGQodGFiKTtcbiAgfVxufSk7XG5cbi8vIEZvdW5kYXRpb24gNCBTcGVjaWZpYyBUaGVtZVxuSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZXMuZm91bmRhdGlvbjQgPSBKU09ORWRpdG9yLmRlZmF1bHRzLnRoZW1lcy5mb3VuZGF0aW9uLmV4dGVuZCh7XG4gIGdldEhlYWRlckJ1dHRvbkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIoKTtcbiAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcuNmVtJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIHNldEdyaWRDb2x1bW5TaXplOiBmdW5jdGlvbihlbCxzaXplKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2NvbHVtbnMgbGFyZ2UtJytzaXplO1xuICB9LFxuICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQpO1xuICAgIGVsLnN0eWxlLmZvbnRTaXplID0gJy44cmVtJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1JbnB1dExhYmVsOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIodGV4dCk7XG4gICAgZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXR1cm4gZWw7XG4gIH1cbn0pO1xuXG4vLyBGb3VuZGF0aW9uIDUgU3BlY2lmaWMgVGhlbWVcbkpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmZvdW5kYXRpb241ID0gSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZXMuZm91bmRhdGlvbi5leHRlbmQoe1xuICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQpO1xuICAgIGVsLnN0eWxlLmZvbnRTaXplID0gJy44cmVtJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIHNldEdyaWRDb2x1bW5TaXplOiBmdW5jdGlvbihlbCxzaXplKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2NvbHVtbnMgbWVkaXVtLScrc2l6ZTtcbiAgfSxcbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQsaWNvbix0aXRsZSk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL1xccypzbWFsbC9nLCcnKSArICcgdGlueSc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJIb2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmlubmVySFRNTCA9IFwiPGRsIGNsYXNzPSd0YWJzIHZlcnRpY2FsJz48L2RsPjxkaXYgY2xhc3M9J3RhYnMtY29udGVudCB2ZXJ0aWNhbCc+PC9kaXY+XCI7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWI6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZCcpO1xuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywnIycpO1xuICAgIGEuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgZWwuYXBwZW5kQ2hpbGQoYSk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJDb250ZW50SG9sZGVyOiBmdW5jdGlvbih0YWJfaG9sZGVyKSB7XG4gICAgcmV0dXJuIHRhYl9ob2xkZXIuY2hpbGRyZW5bMV07XG4gIH0sXG4gIGdldFRhYkNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdjb250ZW50IGFjdGl2ZSc7XG4gICAgZWwuc3R5bGUucGFkZGluZ0xlZnQgPSAnNXB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIG1hcmtUYWJBY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICB9LFxuICBtYXJrVGFiSW5hY3RpdmU6IGZ1bmN0aW9uKHRhYikge1xuICAgIHRhYi5jbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lLnJlcGxhY2UoL1xccyphY3RpdmUvZywnJyk7XG4gIH0sXG4gIGFkZFRhYjogZnVuY3Rpb24oaG9sZGVyLCB0YWIpIHtcbiAgICBob2xkZXIuY2hpbGRyZW5bMF0uYXBwZW5kQ2hpbGQodGFiKTtcbiAgfVxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmZvdW5kYXRpb242ID0gSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZXMuZm91bmRhdGlvbjUuZXh0ZW5kKHtcbiAgZ2V0SW5kZW50ZWRQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2NhbGxvdXQgc2Vjb25kYXJ5JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEJ1dHRvbkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2J1dHRvbi1ncm91cCB0aW55JztcbiAgICBlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAwO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0ZXh0KTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEZvcm1Db250cm9sOiBmdW5jdGlvbihsYWJlbCwgaW5wdXQsIGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCc7XG4gICAgaWYobGFiZWwpIGVsLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBpZihpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBsYWJlbC5pbnNlcnRCZWZvcmUoaW5wdXQsbGFiZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxhYmVsKSB7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICB9XG5cbiAgICBpZihkZXNjcmlwdGlvbikgbGFiZWwuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWRkSW5wdXRFcnJvcjogZnVuY3Rpb24oaW5wdXQsdGV4dCkge1xuICAgIGlmKCFpbnB1dC5ncm91cCkgcmV0dXJuO1xuICAgIGlucHV0Lmdyb3VwLmNsYXNzTmFtZSArPSAnIGVycm9yJztcblxuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHtcbiAgICAgIHZhciBlcnJvckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgZXJyb3JFbC5jbGFzc05hbWUgPSAnZm9ybS1lcnJvciBpcy12aXNpYmxlJztcbiAgICAgIGlucHV0Lmdyb3VwLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsYWJlbCcpWzBdLmFwcGVuZENoaWxkKGVycm9yRWwpO1xuXG4gICAgICBpbnB1dC5jbGFzc05hbWUgPSBpbnB1dC5jbGFzc05hbWUgKyAnIGlzLWludmFsaWQtaW5wdXQnO1xuXG4gICAgICBpbnB1dC5lcnJtc2cgPSBlcnJvckVsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlucHV0LmVycm1zZy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBpbnB1dC5jbGFzc05hbWUgPSAnJztcbiAgICB9XG5cbiAgICBpbnB1dC5lcnJtc2cudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9LFxuICByZW1vdmVJbnB1dEVycm9yOiBmdW5jdGlvbihpbnB1dCkge1xuICAgIGlmKCFpbnB1dC5lcnJtc2cpIHJldHVybjtcbiAgICBpbnB1dC5jbGFzc05hbWUgPSBpbnB1dC5jbGFzc05hbWUucmVwbGFjZSgvIGlzLWludmFsaWQtaW5wdXQvZywnJyk7XG4gICAgaWYoaW5wdXQuZXJybXNnLnBhcmVudE5vZGUpIHtcbiAgICAgIGlucHV0LmVycm1zZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0LmVycm1zZyk7XG4gICAgfVxuICB9LFxufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGhlbWVzLmh0bWwgPSBKU09ORWRpdG9yLkFic3RyYWN0VGhlbWUuZXh0ZW5kKHtcbiAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0ZXh0KTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnM3B4JztcbiAgICBlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0RGVzY3JpcHRpb246IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0ZXh0KTtcbiAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcuOGVtJztcbiAgICBlbC5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICBlbC5zdHlsZS5mb250U3R5bGUgPSAnaXRhbGljJztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEluZGVudGVkUGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKCk7XG4gICAgZWwuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjZGRkJztcbiAgICBlbC5zdHlsZS5wYWRkaW5nID0gJzVweCc7XG4gICAgZWwuc3R5bGUubWFyZ2luID0gJzVweCc7XG4gICAgZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzNweCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRDaGlsZEVkaXRvckhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIoKTtcbiAgICBlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGdldEhlYWRlckJ1dHRvbkhvbGRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gdGhpcy5nZXRCdXR0b25Ib2xkZXIoKTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JztcbiAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcuOGVtJztcbiAgICBlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ21pZGRsZSc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gdGhpcy5fc3VwZXIoKTtcbiAgICBlbC5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkICNjY2MnO1xuICAgIGVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgYWRkSW5wdXRFcnJvcjogZnVuY3Rpb24oaW5wdXQsIHRleHQpIHtcbiAgICBpbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICdyZWQnO1xuXG4gICAgaWYoIWlucHV0LmVycm1zZykge1xuICAgICAgdmFyIGdyb3VwID0gdGhpcy5jbG9zZXN0KGlucHV0LCcuZm9ybS1jb250cm9sJyk7XG4gICAgICBpbnB1dC5lcnJtc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGlucHV0LmVycm1zZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywnZXJybXNnJyk7XG4gICAgICBpbnB1dC5lcnJtc2cuc3R5bGUgPSBpbnB1dC5lcnJtc2cuc3R5bGUgfHwge307XG4gICAgICBpbnB1dC5lcnJtc2cuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGlucHV0LmVycm1zZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5wdXQuZXJybXNnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIGlucHV0LmVycm1zZy5pbm5lckhUTUwgPSAnJztcbiAgICBpbnB1dC5lcnJtc2cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICB9LFxuICByZW1vdmVJbnB1dEVycm9yOiBmdW5jdGlvbihpbnB1dCkge1xuICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XG4gICAgaWYoaW5wdXQuZXJybXNnKSBpbnB1dC5lcnJtc2cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSxcbiAgZ2V0UHJvZ3Jlc3NCYXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXggPSAxMDAsIHN0YXJ0ID0gMDtcblxuICAgIHZhciBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Byb2dyZXNzJyk7XG4gICAgcHJvZ3Jlc3NCYXIuc2V0QXR0cmlidXRlKCdtYXgnLCBtYXgpO1xuICAgIHByb2dyZXNzQmFyLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBzdGFydCk7XG4gICAgcmV0dXJuIHByb2dyZXNzQmFyO1xuICB9LFxuICB1cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24ocHJvZ3Jlc3NCYXIsIHByb2dyZXNzKSB7XG4gICAgaWYgKCFwcm9ncmVzc0JhcikgcmV0dXJuO1xuICAgIHByb2dyZXNzQmFyLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBwcm9ncmVzcyk7XG4gIH0sXG4gIHVwZGF0ZVByb2dyZXNzQmFyVW5rbm93bjogZnVuY3Rpb24ocHJvZ3Jlc3NCYXIpIHtcbiAgICBpZiAoIXByb2dyZXNzQmFyKSByZXR1cm47XG4gICAgcHJvZ3Jlc3NCYXIucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZXMuanF1ZXJ5dWkgPSBKU09ORWRpdG9yLkFic3RyYWN0VGhlbWUuZXh0ZW5kKHtcbiAgZ2V0VGFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKCk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdjZWxscGFkZGluZycsNSk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdjZWxsc3BhY2luZycsMCk7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRUYWJsZUhlYWRlckNlbGw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcih0ZXh0KTtcbiAgICBlbC5jbGFzc05hbWUgPSAndWktc3RhdGUtYWN0aXZlJztcbiAgICBlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0VGFibGVDZWxsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSB0aGlzLl9zdXBlcigpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICd1aS13aWRnZXQtY29udGVudCc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRIZWFkZXJCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0QnV0dG9uSG9sZGVyKCk7XG4gICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JztcbiAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcuNmVtJztcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0RGVzY3JpcHRpb24odGV4dCk7XG4gICAgZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcxMHB4JztcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRGb3JtQ29udHJvbDogZnVuY3Rpb24obGFiZWwsIGlucHV0LCBkZXNjcmlwdGlvbikge1xuICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKGxhYmVsLGlucHV0LGRlc2NyaXB0aW9uKTtcbiAgICBpZihpbnB1dC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBlbC5zdHlsZS5saW5lSGVpZ2h0ID0gJzI1cHgnO1xuXG4gICAgICBlbC5zdHlsZS5wYWRkaW5nID0gJzNweCAwJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbC5zdHlsZS5wYWRkaW5nID0gJzRweCAwIDhweCAwJztcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXREZXNjcmlwdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcuOGVtJztcbiAgICBlbC5zdHlsZS5mb250U3R5bGUgPSAnaXRhbGljJztcbiAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgcmV0dXJuIGVsO1xuICB9LFxuICBnZXRCdXR0b25Ib2xkZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICd1aS1idXR0b25zZXQnO1xuICAgIGVsLnN0eWxlLmZvbnRTaXplID0gJy43ZW0nO1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIHJldHVybiBlbDtcbiAgfSxcbiAgZ2V0QnV0dG9uOiBmdW5jdGlvbih0ZXh0LCBpY29uLCB0aXRsZSkge1xuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAndWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnO1xuXG4gICAgLy8gSWNvbiBvbmx5XG4gICAgaWYoaWNvbiAmJiAhdGV4dCkge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSAnIHVpLWJ1dHRvbi1pY29uLW9ubHknO1xuICAgICAgaWNvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24taWNvbi1wcmltYXJ5IHVpLWljb24tcHJpbWFyeSc7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgfVxuICAgIC8vIEljb24gYW5kIFRleHRcbiAgICBlbHNlIGlmKGljb24pIHtcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24tdGV4dC1pY29uLXByaW1hcnknO1xuICAgICAgaWNvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24taWNvbi1wcmltYXJ5IHVpLWljb24tcHJpbWFyeSc7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgfVxuICAgIC8vIFRleHQgb25seVxuICAgIGVsc2Uge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSAnIHVpLWJ1dHRvbi10ZXh0LW9ubHknO1xuICAgIH1cblxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbC5jbGFzc05hbWUgPSAndWktYnV0dG9uLXRleHQnO1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dHx8dGl0bGV8fFwiLlwiO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsdGl0bGUpO1xuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfSxcbiAgc2V0QnV0dG9uVGV4dDogZnVuY3Rpb24oYnV0dG9uLHRleHQsIGljb24sIHRpdGxlKSB7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICcnO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAndWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnO1xuXG4gICAgLy8gSWNvbiBvbmx5XG4gICAgaWYoaWNvbiAmJiAhdGV4dCkge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSAnIHVpLWJ1dHRvbi1pY29uLW9ubHknO1xuICAgICAgaWNvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24taWNvbi1wcmltYXJ5IHVpLWljb24tcHJpbWFyeSc7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgfVxuICAgIC8vIEljb24gYW5kIFRleHRcbiAgICBlbHNlIGlmKGljb24pIHtcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24tdGV4dC1pY29uLXByaW1hcnknO1xuICAgICAgaWNvbi5jbGFzc05hbWUgKz0gJyB1aS1idXR0b24taWNvbi1wcmltYXJ5IHVpLWljb24tcHJpbWFyeSc7XG4gICAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgfVxuICAgIC8vIFRleHQgb25seVxuICAgIGVsc2Uge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSArPSAnIHVpLWJ1dHRvbi10ZXh0LW9ubHknO1xuICAgIH1cblxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbC5jbGFzc05hbWUgPSAndWktYnV0dG9uLXRleHQnO1xuICAgIGVsLnRleHRDb250ZW50ID0gdGV4dHx8dGl0bGV8fFwiLlwiO1xuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICBidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsdGl0bGUpO1xuICB9LFxuICBnZXRJbmRlbnRlZFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc05hbWUgPSAndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc7XG4gICAgZWwuc3R5bGUucGFkZGluZyA9ICcxZW0gMS40ZW0nO1xuICAgIGVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyMHB4JztcbiAgICByZXR1cm4gZWw7XG4gIH0sXG4gIGFmdGVySW5wdXRSZWFkeTogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICBpZihpbnB1dC5jb250cm9scykgcmV0dXJuO1xuICAgIGlucHV0LmNvbnRyb2xzID0gdGhpcy5jbG9zZXN0KGlucHV0LCcuZm9ybS1jb250cm9sJyk7XG4gIH0sXG4gIGFkZElucHV0RXJyb3I6IGZ1bmN0aW9uKGlucHV0LHRleHQpIHtcbiAgICBpZighaW5wdXQuY29udHJvbHMpIHJldHVybjtcbiAgICBpZighaW5wdXQuZXJybXNnKSB7XG4gICAgICBpbnB1dC5lcnJtc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGlucHV0LmVycm1zZy5jbGFzc05hbWUgPSAndWktc3RhdGUtZXJyb3InO1xuICAgICAgaW5wdXQuY29udHJvbHMuYXBwZW5kQ2hpbGQoaW5wdXQuZXJybXNnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpbnB1dC5lcnJtc2cuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICAgIGlucHV0LmVycm1zZy50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH0sXG4gIHJlbW92ZUlucHV0RXJyb3I6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgaWYoIWlucHV0LmVycm1zZykgcmV0dXJuO1xuICAgIGlucHV0LmVycm1zZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9LFxuICBtYXJrVGFiQWN0aXZlOiBmdW5jdGlvbih0YWIpIHtcbiAgICB0YWIuY2xhc3NOYW1lID0gdGFiLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMqdWktd2lkZ2V0LWhlYWRlci9nLCcnKSsnIHVpLXN0YXRlLWFjdGl2ZSc7XG4gIH0sXG4gIG1hcmtUYWJJbmFjdGl2ZTogZnVuY3Rpb24odGFiKSB7XG4gICAgdGFiLmNsYXNzTmFtZSA9IHRhYi5jbGFzc05hbWUucmVwbGFjZSgvXFxzKnVpLXN0YXRlLWFjdGl2ZS9nLCcnKSsnIHVpLXdpZGdldC1oZWFkZXInO1xuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy50aGVtZXMuYmFyZWJvbmVzID0gSlNPTkVkaXRvci5BYnN0cmFjdFRoZW1lLmV4dGVuZCh7XG4gICAgZ2V0Rm9ybUlucHV0TGFiZWw6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKHRleHQpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfSxcbiAgICBnZXRGb3JtSW5wdXREZXNjcmlwdGlvbjogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5fc3VwZXIodGV4dCk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9LFxuICAgIGdldEluZGVudGVkUGFuZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH0sXG4gICAgZ2V0Q2hpbGRFZGl0b3JIb2xkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH0sXG4gICAgZ2V0SGVhZGVyQnV0dG9uSG9sZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZ2V0QnV0dG9uSG9sZGVyKCk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9LFxuICAgIGdldFRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbCA9IHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9LFxuICAgIGFkZElucHV0RXJyb3I6IGZ1bmN0aW9uIChpbnB1dCwgdGV4dCkge1xuICAgICAgICBpZiAoIWlucHV0LmVycm1zZykge1xuICAgICAgICAgICAgdmFyIGdyb3VwID0gdGhpcy5jbG9zZXN0KGlucHV0LCAnLmZvcm0tY29udHJvbCcpO1xuICAgICAgICAgICAgaW5wdXQuZXJybXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpbnB1dC5lcnJtc2cuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlcnJtc2cnKTtcbiAgICAgICAgICAgIGdyb3VwLmFwcGVuZENoaWxkKGlucHV0LmVycm1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC5lcnJtc2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dC5lcnJtc2cuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlucHV0LmVycm1zZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgfSxcbiAgICByZW1vdmVJbnB1dEVycm9yOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcbiAgICAgICAgaWYgKGlucHV0LmVycm1zZykgaW5wdXQuZXJybXNnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSxcbiAgICBnZXRQcm9ncmVzc0JhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWF4ID0gMTAwLCBzdGFydCA9IDA7XG5cbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcbiAgICAgICAgcHJvZ3Jlc3NCYXIuc2V0QXR0cmlidXRlKCdtYXgnLCBtYXgpO1xuICAgICAgICBwcm9ncmVzc0Jhci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgc3RhcnQpO1xuICAgICAgICByZXR1cm4gcHJvZ3Jlc3NCYXI7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24gKHByb2dyZXNzQmFyLCBwcm9ncmVzcykge1xuICAgICAgICBpZiAoIXByb2dyZXNzQmFyKSByZXR1cm47XG4gICAgICAgIHByb2dyZXNzQmFyLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBwcm9ncmVzcyk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9ncmVzc0JhclVua25vd246IGZ1bmN0aW9uIChwcm9ncmVzc0Jhcikge1xuICAgICAgICBpZiAoIXByb2dyZXNzQmFyKSByZXR1cm47XG4gICAgICAgIHByb2dyZXNzQmFyLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICB9XG59KTtcblxuSlNPTkVkaXRvci5BYnN0cmFjdEljb25MaWIgPSBDbGFzcy5leHRlbmQoe1xuICBtYXBwaW5nOiB7XG4gICAgY29sbGFwc2U6ICcnLFxuICAgIGV4cGFuZDogJycsXG4gICAgXCJkZWxldGVcIjogJycsXG4gICAgZWRpdDogJycsXG4gICAgYWRkOiAnJyxcbiAgICBjYW5jZWw6ICcnLFxuICAgIHNhdmU6ICcnLFxuICAgIG1vdmV1cDogJycsXG4gICAgbW92ZWRvd246ICcnXG4gIH0sXG4gIGljb25fcHJlZml4OiAnJyxcbiAgZ2V0SWNvbkNsYXNzOiBmdW5jdGlvbihrZXkpIHtcbiAgICBpZih0aGlzLm1hcHBpbmdba2V5XSkgcmV0dXJuIHRoaXMuaWNvbl9wcmVmaXgrdGhpcy5tYXBwaW5nW2tleV07XG4gICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgfSxcbiAgZ2V0SWNvbjogZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGljb25jbGFzcyA9IHRoaXMuZ2V0SWNvbkNsYXNzKGtleSk7XG5cbiAgICBpZighaWNvbmNsYXNzKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIGkuY2xhc3NOYW1lID0gaWNvbmNsYXNzO1xuICAgIHJldHVybiBpO1xuICB9XG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5pY29ubGlicy5ib290c3RyYXAyID0gSlNPTkVkaXRvci5BYnN0cmFjdEljb25MaWIuZXh0ZW5kKHtcbiAgbWFwcGluZzoge1xuICAgIGNvbGxhcHNlOiAnY2hldnJvbi1kb3duJyxcbiAgICBleHBhbmQ6ICdjaGV2cm9uLXVwJyxcbiAgICBcImRlbGV0ZVwiOiAndHJhc2gnLFxuICAgIGVkaXQ6ICdwZW5jaWwnLFxuICAgIGFkZDogJ3BsdXMnLFxuICAgIGNhbmNlbDogJ2Jhbi1jaXJjbGUnLFxuICAgIHNhdmU6ICdvaycsXG4gICAgbW92ZXVwOiAnYXJyb3ctdXAnLFxuICAgIG1vdmVkb3duOiAnYXJyb3ctZG93bidcbiAgfSxcbiAgaWNvbl9wcmVmaXg6ICdpY29uLSdcbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmljb25saWJzLmJvb3RzdHJhcDMgPSBKU09ORWRpdG9yLkFic3RyYWN0SWNvbkxpYi5leHRlbmQoe1xuICBtYXBwaW5nOiB7XG4gICAgY29sbGFwc2U6ICdjaGV2cm9uLWRvd24nLFxuICAgIGV4cGFuZDogJ2NoZXZyb24tcmlnaHQnLFxuICAgIFwiZGVsZXRlXCI6ICdyZW1vdmUnLFxuICAgIGVkaXQ6ICdwZW5jaWwnLFxuICAgIGFkZDogJ3BsdXMnLFxuICAgIGNhbmNlbDogJ2Zsb3BweS1yZW1vdmUnLFxuICAgIHNhdmU6ICdmbG9wcHktc2F2ZWQnLFxuICAgIG1vdmV1cDogJ2Fycm93LXVwJyxcbiAgICBtb3ZlZG93bjogJ2Fycm93LWRvd24nXG4gIH0sXG4gIGljb25fcHJlZml4OiAnZ2x5cGhpY29uIGdseXBoaWNvbi0nXG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5pY29ubGlicy5mb250YXdlc29tZTMgPSBKU09ORWRpdG9yLkFic3RyYWN0SWNvbkxpYi5leHRlbmQoe1xuICBtYXBwaW5nOiB7XG4gICAgY29sbGFwc2U6ICdjaGV2cm9uLWRvd24nLFxuICAgIGV4cGFuZDogJ2NoZXZyb24tcmlnaHQnLFxuICAgIFwiZGVsZXRlXCI6ICdyZW1vdmUnLFxuICAgIGVkaXQ6ICdwZW5jaWwnLFxuICAgIGFkZDogJ3BsdXMnLFxuICAgIGNhbmNlbDogJ2Jhbi1jaXJjbGUnLFxuICAgIHNhdmU6ICdzYXZlJyxcbiAgICBtb3ZldXA6ICdhcnJvdy11cCcsXG4gICAgbW92ZWRvd246ICdhcnJvdy1kb3duJ1xuICB9LFxuICBpY29uX3ByZWZpeDogJ2ljb24tJ1xufSk7XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMuaWNvbmxpYnMuZm9udGF3ZXNvbWU0ID0gSlNPTkVkaXRvci5BYnN0cmFjdEljb25MaWIuZXh0ZW5kKHtcbiAgbWFwcGluZzoge1xuICAgIGNvbGxhcHNlOiAnY2FyZXQtc3F1YXJlLW8tZG93bicsXG4gICAgZXhwYW5kOiAnY2FyZXQtc3F1YXJlLW8tcmlnaHQnLFxuICAgIFwiZGVsZXRlXCI6ICd0aW1lcycsXG4gICAgZWRpdDogJ3BlbmNpbCcsXG4gICAgYWRkOiAncGx1cycsXG4gICAgY2FuY2VsOiAnYmFuJyxcbiAgICBzYXZlOiAnc2F2ZScsXG4gICAgbW92ZXVwOiAnYXJyb3ctdXAnLFxuICAgIG1vdmVkb3duOiAnYXJyb3ctZG93bidcbiAgfSxcbiAgaWNvbl9wcmVmaXg6ICdmYSBmYS0nXG59KTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy5pY29ubGlicy5mb3VuZGF0aW9uMiA9IEpTT05FZGl0b3IuQWJzdHJhY3RJY29uTGliLmV4dGVuZCh7XG4gIG1hcHBpbmc6IHtcbiAgICBjb2xsYXBzZTogJ21pbnVzJyxcbiAgICBleHBhbmQ6ICdwbHVzJyxcbiAgICBcImRlbGV0ZVwiOiAncmVtb3ZlJyxcbiAgICBlZGl0OiAnZWRpdCcsXG4gICAgYWRkOiAnYWRkLWRvYycsXG4gICAgY2FuY2VsOiAnZXJyb3InLFxuICAgIHNhdmU6ICdjaGVja21hcmsnLFxuICAgIG1vdmV1cDogJ3VwLWFycm93JyxcbiAgICBtb3ZlZG93bjogJ2Rvd24tYXJyb3cnXG4gIH0sXG4gIGljb25fcHJlZml4OiAnZm91bmRpY29uLSdcbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmljb25saWJzLmZvdW5kYXRpb24zID0gSlNPTkVkaXRvci5BYnN0cmFjdEljb25MaWIuZXh0ZW5kKHtcbiAgbWFwcGluZzoge1xuICAgIGNvbGxhcHNlOiAnbWludXMnLFxuICAgIGV4cGFuZDogJ3BsdXMnLFxuICAgIFwiZGVsZXRlXCI6ICd4JyxcbiAgICBlZGl0OiAncGVuY2lsJyxcbiAgICBhZGQ6ICdwYWdlLWFkZCcsXG4gICAgY2FuY2VsOiAneC1jaXJjbGUnLFxuICAgIHNhdmU6ICdzYXZlJyxcbiAgICBtb3ZldXA6ICdhcnJvdy11cCcsXG4gICAgbW92ZWRvd246ICdhcnJvdy1kb3duJ1xuICB9LFxuICBpY29uX3ByZWZpeDogJ2ZpLSdcbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLmljb25saWJzLmpxdWVyeXVpID0gSlNPTkVkaXRvci5BYnN0cmFjdEljb25MaWIuZXh0ZW5kKHtcbiAgbWFwcGluZzoge1xuICAgIGNvbGxhcHNlOiAndHJpYW5nbGUtMS1zJyxcbiAgICBleHBhbmQ6ICd0cmlhbmdsZS0xLWUnLFxuICAgIFwiZGVsZXRlXCI6ICd0cmFzaCcsXG4gICAgZWRpdDogJ3BlbmNpbCcsXG4gICAgYWRkOiAncGx1c3RoaWNrJyxcbiAgICBjYW5jZWw6ICdjbG9zZXRoaWNrJyxcbiAgICBzYXZlOiAnZGlzaycsXG4gICAgbW92ZXVwOiAnYXJyb3d0aGljay0xLW4nLFxuICAgIG1vdmVkb3duOiAnYXJyb3d0aGljay0xLXMnXG4gIH0sXG4gIGljb25fcHJlZml4OiAndWktaWNvbiB1aS1pY29uLSdcbn0pO1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRlbXBsYXRlc1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgdmFyIG1hdGNoZXMgPSB0ZW1wbGF0ZS5tYXRjaCgve3tcXHMqKFthLXpBLVowLTlcXC1fIFxcLl0rKVxccyp9fS9nKTtcbiAgICAgIHZhciBsID0gbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aDtcblxuICAgICAgLy8gU2hvcnRjdXQgaWYgdGhlIHRlbXBsYXRlIGNvbnRhaW5zIG5vIHZhcmlhYmxlc1xuICAgICAgaWYoIWwpIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHRlbXBsYXRlOyB9O1xuXG4gICAgICAvLyBQcmUtY29tcHV0ZSB0aGUgc2VhcmNoL3JlcGxhY2UgZnVuY3Rpb25zXG4gICAgICAvLyBUaGlzIGRyYXN0aWNhbGx5IHNwZWVkcyB1cCB0ZW1wbGF0ZSBleGVjdXRpb25cbiAgICAgIHZhciByZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgIHZhciBnZXRfcmVwbGFjZW1lbnQgPSBmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBwID0gbWF0Y2hlc1tpXS5yZXBsYWNlKC9be31dKy9nLCcnKS50cmltKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIG4gPSBwLmxlbmd0aDtcbiAgICAgICAgdmFyIGZ1bmM7XG5cbiAgICAgICAgaWYobiA+IDEpIHtcbiAgICAgICAgICB2YXIgY3VyO1xuICAgICAgICAgIGZ1bmMgPSBmdW5jdGlvbih2YXJzKSB7XG4gICAgICAgICAgICBjdXIgPSB2YXJzO1xuICAgICAgICAgICAgZm9yKGk9MDsgaTxuOyBpKyspIHtcbiAgICAgICAgICAgICAgY3VyID0gY3VyW3BbaV1dO1xuICAgICAgICAgICAgICBpZighY3VyKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXI7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwID0gcFswXTtcbiAgICAgICAgICBmdW5jID0gZnVuY3Rpb24odmFycykge1xuICAgICAgICAgICAgcmV0dXJuIHZhcnNbcF07XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICBzOiBtYXRjaGVzW2ldLFxuICAgICAgICAgIHI6IGZ1bmNcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgZm9yKHZhciBpPTA7IGk8bDsgaSsrKSB7XG4gICAgICAgIGdldF9yZXBsYWNlbWVudChpKTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFycykge1xuICAgICAgICB2YXIgcmV0ID0gdGVtcGxhdGUrXCJcIjtcbiAgICAgICAgdmFyIHI7XG4gICAgICAgIGZvcihpPTA7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgciA9IHJlcGxhY2VtZW50c1tpXTtcbiAgICAgICAgICByZXQgPSByZXQucmVwbGFjZShyLnMsIHIucih2YXJzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy50ZW1wbGF0ZXMuZWpzID0gZnVuY3Rpb24oKSB7XG4gIGlmKCF3aW5kb3cuRUpTKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgdmFyIGNvbXBpbGVkID0gbmV3IHdpbmRvdy5FSlMoe1xuICAgICAgICB0ZXh0OiB0ZW1wbGF0ZVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb21waWxlZC5yZW5kZXIoY29udGV4dCk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGVtcGxhdGVzLmhhbmRsZWJhcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdpbmRvdy5IYW5kbGViYXJzO1xufTtcblxuSlNPTkVkaXRvci5kZWZhdWx0cy50ZW1wbGF0ZXMuaG9nYW4gPSBmdW5jdGlvbigpIHtcbiAgaWYoIXdpbmRvdy5Ib2dhbikgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB7XG4gICAgY29tcGlsZTogZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgIHZhciBjb21waWxlZCA9IHdpbmRvdy5Ib2dhbi5jb21waWxlKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb21waWxlZC5yZW5kZXIoY29udGV4dCk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGVtcGxhdGVzLm1hcmt1cCA9IGZ1bmN0aW9uKCkge1xuICBpZighd2luZG93Lk1hcmsgfHwgIXdpbmRvdy5NYXJrLnVwKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5NYXJrLnVwKHRlbXBsYXRlLGNvbnRleHQpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59O1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRlbXBsYXRlcy5tdXN0YWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZighd2luZG93Lk11c3RhY2hlKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZpZXcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5NdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59O1xuXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRlbXBsYXRlcy5zd2lnID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aW5kb3cuc3dpZztcbn07XG5cbkpTT05FZGl0b3IuZGVmYXVsdHMudGVtcGxhdGVzLnVuZGVyc2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgaWYoIXdpbmRvdy5fKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21waWxlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5fLnRlbXBsYXRlKHRlbXBsYXRlLCBjb250ZXh0KTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcblxuLy8gU2V0IHRoZSBkZWZhdWx0IHRoZW1lXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRoZW1lID0gJ2h0bWwnO1xuXG4vLyBTZXQgdGhlIGRlZmF1bHQgdGVtcGxhdGUgZW5naW5lXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRlbXBsYXRlID0gJ2RlZmF1bHQnO1xuXG4vLyBEZWZhdWx0IG9wdGlvbnMgd2hlbiBpbml0aWFsaXppbmcgSlNPTiBFZGl0b3JcbkpTT05FZGl0b3IuZGVmYXVsdHMub3B0aW9ucyA9IHt9O1xuXG4vLyBTdHJpbmcgdHJhbnNsYXRlIGZ1bmN0aW9uXG5KU09ORWRpdG9yLmRlZmF1bHRzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKGtleSwgdmFyaWFibGVzKSB7XG4gIHZhciBsYW5nID0gSlNPTkVkaXRvci5kZWZhdWx0cy5sYW5ndWFnZXNbSlNPTkVkaXRvci5kZWZhdWx0cy5sYW5ndWFnZV07XG4gIGlmKCFsYW5nKSB0aHJvdyBcIlVua25vd24gbGFuZ3VhZ2UgXCIrSlNPTkVkaXRvci5kZWZhdWx0cy5sYW5ndWFnZTtcblxuICB2YXIgc3RyaW5nID0gbGFuZ1trZXldIHx8IEpTT05FZGl0b3IuZGVmYXVsdHMubGFuZ3VhZ2VzW0pTT05FZGl0b3IuZGVmYXVsdHMuZGVmYXVsdF9sYW5ndWFnZV1ba2V5XTtcblxuICBpZih0eXBlb2Ygc3RyaW5nID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBcIlVua25vd24gdHJhbnNsYXRlIHN0cmluZyBcIitrZXk7XG5cbiAgaWYodmFyaWFibGVzKSB7XG4gICAgZm9yKHZhciBpPTA7IGk8dmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxce1xcXFx7JytpKyd9fScsJ2cnKSx2YXJpYWJsZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHJpbmc7XG59O1xuXG4vLyBUcmFuc2xhdGlvbiBzdHJpbmdzIGFuZCBkZWZhdWx0IGxhbmd1YWdlc1xuSlNPTkVkaXRvci5kZWZhdWx0cy5kZWZhdWx0X2xhbmd1YWdlID0gJ2VuJztcbkpTT05FZGl0b3IuZGVmYXVsdHMubGFuZ3VhZ2UgPSBKU09ORWRpdG9yLmRlZmF1bHRzLmRlZmF1bHRfbGFuZ3VhZ2U7XG5KU09ORWRpdG9yLmRlZmF1bHRzLmxhbmd1YWdlcy5lbiA9IHtcbiAgLyoqXG4gICAqIFdoZW4gYSBwcm9wZXJ0eSBpcyBub3Qgc2V0XG4gICAqL1xuICBlcnJvcl9ub3RzZXQ6IFwiUHJvcGVydHkgbXVzdCBiZSBzZXRcIixcbiAgLyoqXG4gICAqIFdoZW4gYSBzdHJpbmcgbXVzdCBub3QgYmUgZW1wdHlcbiAgICovXG4gIGVycm9yX25vdGVtcHR5OiBcIlZhbHVlIHJlcXVpcmVkXCIsXG4gIC8qKlxuICAgKiBXaGVuIGEgdmFsdWUgaXMgbm90IG9uZSBvZiB0aGUgZW51bWVyYXRlZCB2YWx1ZXNcbiAgICovXG4gIGVycm9yX2VudW06IFwiVmFsdWUgbXVzdCBiZSBvbmUgb2YgdGhlIGVudW1lcmF0ZWQgdmFsdWVzXCIsXG4gIC8qKlxuICAgKiBXaGVuIGEgdmFsdWUgZG9lc24ndCB2YWxpZGF0ZSBhbnkgc2NoZW1hIG9mIGEgJ2FueU9mJyBjb21iaW5hdGlvblxuICAgKi9cbiAgZXJyb3JfYW55T2Y6IFwiVmFsdWUgbXVzdCB2YWxpZGF0ZSBhZ2FpbnN0IGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgc2NoZW1hc1wiLFxuICAvKipcbiAgICogV2hlbiBhIHZhbHVlIGRvZXNuJ3QgdmFsaWRhdGVcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBudW1iZXIgb2Ygc2NoZW1hcyB0aGUgdmFsdWUgZG9lcyBub3QgdmFsaWRhdGVcbiAgICovXG4gIGVycm9yX29uZU9mOiAnVmFsdWUgbXVzdCB2YWxpZGF0ZSBhZ2FpbnN0IGV4YWN0bHkgb25lIG9mIHRoZSBwcm92aWRlZCBzY2hlbWFzLiBJdCBjdXJyZW50bHkgdmFsaWRhdGVzIGFnYWluc3Qge3swfX0gb2YgdGhlIHNjaGVtYXMuJyxcbiAgLyoqXG4gICAqIFdoZW4gYSB2YWx1ZSBkb2VzIG5vdCB2YWxpZGF0ZSBhICdub3QnIHNjaGVtYVxuICAgKi9cbiAgZXJyb3Jfbm90OiBcIlZhbHVlIG11c3Qgbm90IHZhbGlkYXRlIGFnYWluc3QgdGhlIHByb3ZpZGVkIHNjaGVtYVwiLFxuICAvKipcbiAgICogV2hlbiBhIHZhbHVlIGRvZXMgbm90IG1hdGNoIGFueSBvZiB0aGUgcHJvdmlkZWQgdHlwZXNcbiAgICovXG4gIGVycm9yX3R5cGVfdW5pb246IFwiVmFsdWUgbXVzdCBiZSBvbmUgb2YgdGhlIHByb3ZpZGVkIHR5cGVzXCIsXG4gIC8qKlxuICAgKiBXaGVuIGEgdmFsdWUgZG9lcyBub3QgbWF0Y2ggdGhlIGdpdmVuIHR5cGVcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSB0eXBlIHRoZSB2YWx1ZSBzaG91bGQgYmUgb2ZcbiAgICovXG4gIGVycm9yX3R5cGU6IFwiVmFsdWUgbXVzdCBiZSBvZiB0eXBlIHt7MH19XCIsXG4gIC8qKlxuICAgKiAgV2hlbiB0aGUgdmFsdWUgdmFsaWRhdGVzIG9uZSBvZiB0aGUgZGlzYWxsb3dlZCB0eXBlc1xuICAgKi9cbiAgZXJyb3JfZGlzYWxsb3dfdW5pb246IFwiVmFsdWUgbXVzdCBub3QgYmUgb25lIG9mIHRoZSBwcm92aWRlZCBkaXNhbGxvd2VkIHR5cGVzXCIsXG4gIC8qKlxuICAgKiAgV2hlbiB0aGUgdmFsdWUgdmFsaWRhdGVzIGEgZGlzYWxsb3dlZCB0eXBlXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgdHlwZSB0aGUgdmFsdWUgc2hvdWxkIG5vdCBiZSBvZlxuICAgKi9cbiAgZXJyb3JfZGlzYWxsb3c6IFwiVmFsdWUgbXVzdCBub3QgYmUgb2YgdHlwZSB7ezB9fVwiLFxuICAvKipcbiAgICogV2hlbiBhIHZhbHVlIGlzIG5vdCBhIG11bHRpcGxlIG9mIG9yIGRpdmlzaWJsZSBieSBhIGdpdmVuIG51bWJlclxuICAgKiBAdmFyaWFibGVzIFRoaXMga2V5IHRha2VzIG9uZSB2YXJpYWJsZTogVGhlIG51bWJlciBtZW50aW9uZWQgYWJvdmVcbiAgICovXG4gIGVycm9yX211bHRpcGxlT2Y6IFwiVmFsdWUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIHt7MH19XCIsXG4gIC8qKlxuICAgKiBXaGVuIGEgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIGl0J3Mgc3VwcG9zZWQgdG8gYmUgKGV4Y2x1c2l2ZSlcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBtYXhpbXVtXG4gICAqL1xuICBlcnJvcl9tYXhpbXVtX2V4Y2w6IFwiVmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4ge3swfX1cIixcbiAgLyoqXG4gICAqIFdoZW4gYSB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gaXQncyBzdXBwb3NlZCB0byBiZSAoaW5jbHVzaXZlXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbWF4aW11bVxuICAgKi9cbiAgZXJyb3JfbWF4aW11bV9pbmNsOiBcIlZhbHVlIG11c3QgYmUgYXQgbW9zdCB7ezB9fVwiLFxuICAvKipcbiAgICogV2hlbiBhIHZhbHVlIGlzIGxlc3NlciB0aGFuIGl0J3Mgc3VwcG9zZWQgdG8gYmUgKGV4Y2x1c2l2ZSlcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBtaW5pbXVtXG4gICAqL1xuICBlcnJvcl9taW5pbXVtX2V4Y2w6IFwiVmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4ge3swfX1cIixcbiAgLyoqXG4gICAqIFdoZW4gYSB2YWx1ZSBpcyBsZXNzZXIgdGhhbiBpdCdzIHN1cHBvc2VkIHRvIGJlIChpbmNsdXNpdmUpXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbWluaW11bVxuICAgKi9cbiAgZXJyb3JfbWluaW11bV9pbmNsOiBcIlZhbHVlIG11c3QgYmUgYXQgbGVhc3Qge3swfX1cIixcbiAgLyoqXG4gICAqIFdoZW4gYSB2YWx1ZSBoYXZlIHRvbyBtYW55IGNoYXJhY3RlcnNcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBtYXhpbXVtIGNoYXJhY3RlciBjb3VudFxuICAgKi9cbiAgZXJyb3JfbWF4TGVuZ3RoOiBcIlZhbHVlIG11c3QgYmUgYXQgbW9zdCB7ezB9fSBjaGFyYWN0ZXJzIGxvbmdcIixcbiAgLyoqXG4gICAqIFdoZW4gYSB2YWx1ZSBkb2VzIG5vdCBoYXZlIGVub3VnaCBjaGFyYWN0ZXJzXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbWluaW11bSBjaGFyYWN0ZXIgY291bnRcbiAgICovXG4gIGVycm9yX21pbkxlbmd0aDogXCJWYWx1ZSBtdXN0IGJlIGF0IGxlYXN0IHt7MH19IGNoYXJhY3RlcnMgbG9uZ1wiLFxuICAvKipcbiAgICogV2hlbiBhIHZhbHVlIGRvZXMgbm90IG1hdGNoIGEgZ2l2ZW4gcGF0dGVyblxuICAgKi9cbiAgZXJyb3JfcGF0dGVybjogXCJWYWx1ZSBtdXN0IG1hdGNoIHRoZSBwYXR0ZXJuIHt7MH19XCIsXG4gIC8qKlxuICAgKiBXaGVuIGFuIGFycmF5IGhhcyBhZGRpdGlvbmFsIGl0ZW1zIHdoZXJlYXMgaXQgaXMgbm90IHN1cHBvc2VkIHRvXG4gICAqL1xuICBlcnJvcl9hZGRpdGlvbmFsSXRlbXM6IFwiTm8gYWRkaXRpb25hbCBpdGVtcyBhbGxvd2VkIGluIHRoaXMgYXJyYXlcIixcbiAgLyoqXG4gICAqIFdoZW4gdGhlcmUgYXJlIHRvIG1hbnkgaXRlbXMgaW4gYW4gYXJyYXlcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBtYXhpbXVtIGl0ZW0gY291bnRcbiAgICovXG4gIGVycm9yX21heEl0ZW1zOiBcIlZhbHVlIG11c3QgaGF2ZSBhdCBtb3N0IHt7MH19IGl0ZW1zXCIsXG4gIC8qKlxuICAgKiBXaGVuIHRoZXJlIGFyZSBub3QgZW5vdWdoIGl0ZW1zIGluIGFuIGFycmF5XG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbWluaW11bSBpdGVtIGNvdW50XG4gICAqL1xuICBlcnJvcl9taW5JdGVtczogXCJWYWx1ZSBtdXN0IGhhdmUgYXQgbGVhc3Qge3swfX0gaXRlbXNcIixcbiAgLyoqXG4gICAqIFdoZW4gYW4gYXJyYXkgaXMgc3VwcG9zZWQgdG8gaGF2ZSB1bmlxdWUgaXRlbXMgYnV0IGhhcyBkdXBsaWNhdGVzXG4gICAqL1xuICBlcnJvcl91bmlxdWVJdGVtczogXCJBcnJheSBtdXN0IGhhdmUgdW5pcXVlIGl0ZW1zXCIsXG4gIC8qKlxuICAgKiBXaGVuIHRoZXJlIGFyZSB0b28gbWFueSBwcm9wZXJ0aWVzIGluIGFuIG9iamVjdFxuICAgKiBAdmFyaWFibGVzIFRoaXMga2V5IHRha2VzIG9uZSB2YXJpYWJsZTogVGhlIG1heGltdW0gcHJvcGVydHkgY291bnRcbiAgICovXG4gIGVycm9yX21heFByb3BlcnRpZXM6IFwiT2JqZWN0IG11c3QgaGF2ZSBhdCBtb3N0IHt7MH19IHByb3BlcnRpZXNcIixcbiAgLyoqXG4gICAqIFdoZW4gdGhlcmUgYXJlIG5vdCBlbm91Z2ggcHJvcGVydGllcyBpbiBhbiBvYmplY3RcbiAgICogQHZhcmlhYmxlcyBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSBtaW5pbXVtIHByb3BlcnR5IGNvdW50XG4gICAqL1xuICBlcnJvcl9taW5Qcm9wZXJ0aWVzOiBcIk9iamVjdCBtdXN0IGhhdmUgYXQgbGVhc3Qge3swfX0gcHJvcGVydGllc1wiLFxuICAvKipcbiAgICogV2hlbiBhIHJlcXVpcmVkIHByb3BlcnR5IGlzIG5vdCBkZWZpbmVkXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbmFtZSBvZiB0aGUgbWlzc2luZyBwcm9wZXJ0eVxuICAgKi9cbiAgZXJyb3JfcmVxdWlyZWQ6IFwiT2JqZWN0IGlzIG1pc3NpbmcgdGhlIHJlcXVpcmVkIHByb3BlcnR5ICd7ezB9fSdcIixcbiAgLyoqXG4gICAqIFdoZW4gdGhlcmUgaXMgYW4gYWRkaXRpb25hbCBwcm9wZXJ0eSBpcyBzZXQgd2hlcmVhcyB0aGVyZSBzaG91bGQgYmUgbm9uZVxuICAgKiBAdmFyaWFibGVzIFRoaXMga2V5IHRha2VzIG9uZSB2YXJpYWJsZTogVGhlIG5hbWUgb2YgdGhlIGFkZGl0aW9uYWwgcHJvcGVydHlcbiAgICovXG4gIGVycm9yX2FkZGl0aW9uYWxfcHJvcGVydGllczogXCJObyBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYWxsb3dlZCwgYnV0IHByb3BlcnR5IHt7MH19IGlzIHNldFwiLFxuICAvKipcbiAgICogV2hlbiBhIGRlcGVuZGVuY3kgaXMgbm90IHJlc29sdmVkXG4gICAqIEB2YXJpYWJsZXMgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgbmFtZSBvZiB0aGUgbWlzc2luZyBwcm9wZXJ0eSBmb3IgdGhlIGRlcGVuZGVuY3lcbiAgICovXG4gIGVycm9yX2RlcGVuZGVuY3k6IFwiTXVzdCBoYXZlIHByb3BlcnR5IHt7MH19XCIsXG4gIC8qKlxuICAgKiBUZXh0IG9uIERlbGV0ZSBBbGwgYnV0dG9uc1xuICAgKi9cbiAgYnV0dG9uX2RlbGV0ZV9hbGw6IFwiQWxsXCIsXG4gIC8qKlxuICAgKiBUaXRsZSBvbiBEZWxldGUgQWxsIGJ1dHRvbnNcbiAgICovXG4gIGJ1dHRvbl9kZWxldGVfYWxsX3RpdGxlOiBcIkRlbGV0ZSBBbGxcIixcbiAgLyoqXG4gICAgKiBUZXh0IG9uIERlbGV0ZSBMYXN0IGJ1dHRvbnNcbiAgICAqIEB2YXJpYWJsZSBUaGlzIGtleSB0YWtlcyBvbmUgdmFyaWFibGU6IFRoZSB0aXRsZSBvZiBvYmplY3QgdG8gZGVsZXRlXG4gICAgKi9cbiAgYnV0dG9uX2RlbGV0ZV9sYXN0OiBcIkxhc3Qge3swfX1cIixcbiAgLyoqXG4gICAgKiBUaXRsZSBvbiBEZWxldGUgTGFzdCBidXR0b25zXG4gICAgKiBAdmFyaWFibGUgVGhpcyBrZXkgdGFrZXMgb25lIHZhcmlhYmxlOiBUaGUgdGl0bGUgb2Ygb2JqZWN0IHRvIGRlbGV0ZVxuICAgICovXG4gIGJ1dHRvbl9kZWxldGVfbGFzdF90aXRsZTogXCJEZWxldGUgTGFzdCB7ezB9fVwiLFxuICAvKipcbiAgICAqIFRpdGxlIG9uIEFkZCBSb3cgYnV0dG9uc1xuICAgICogQHZhcmlhYmxlIFRoaXMga2V5IHRha2VzIG9uZSB2YXJpYWJsZTogVGhlIHRpdGxlIG9mIG9iamVjdCB0byBhZGRcbiAgICAqL1xuICBidXR0b25fYWRkX3Jvd190aXRsZTogXCJBZGQge3swfX1cIixcbiAgLyoqXG4gICAgKiBUaXRsZSBvbiBNb3ZlIERvd24gYnV0dG9uc1xuICAgICovXG4gIGJ1dHRvbl9tb3ZlX2Rvd25fdGl0bGU6IFwiTW92ZSBkb3duXCIsXG4gIC8qKlxuICAgICogVGl0bGUgb24gTW92ZSBVcCBidXR0b25zXG4gICAgKi9cbiAgYnV0dG9uX21vdmVfdXBfdGl0bGU6IFwiTW92ZSB1cFwiLFxuICAvKipcbiAgICAqIFRpdGxlIG9uIERlbGV0ZSBSb3cgYnV0dG9uc1xuICAgICogQHZhcmlhYmxlIFRoaXMga2V5IHRha2VzIG9uZSB2YXJpYWJsZTogVGhlIHRpdGxlIG9mIG9iamVjdCB0byBkZWxldGVcbiAgICAqL1xuICBidXR0b25fZGVsZXRlX3Jvd190aXRsZTogXCJEZWxldGUge3swfX1cIixcbiAgLyoqXG4gICAgKiBUaXRsZSBvbiBEZWxldGUgUm93IGJ1dHRvbnMsIHNob3J0IHZlcnNpb24gKG5vIHBhcmFtZXRlciB3aXRoIHRoZSBvYmplY3QgdGl0bGUpXG4gICAgKi9cbiAgYnV0dG9uX2RlbGV0ZV9yb3dfdGl0bGVfc2hvcnQ6IFwiRGVsZXRlXCIsXG4gIC8qKlxuICAgICogVGl0bGUgb24gQ29sbGFwc2UgYnV0dG9uc1xuICAgICovXG4gIGJ1dHRvbl9jb2xsYXBzZTogXCJDb2xsYXBzZVwiLFxuICAvKipcbiAgICAqIFRpdGxlIG9uIEV4cGFuZCBidXR0b25zXG4gICAgKi9cbiAgYnV0dG9uX2V4cGFuZDogXCJFeHBhbmRcIlxufTtcblxuLy8gTWlzY2VsbGFuZW91cyBQbHVnaW4gU2V0dGluZ3NcbkpTT05FZGl0b3IucGx1Z2lucyA9IHtcbiAgYWNlOiB7XG4gICAgdGhlbWU6ICcnXG4gIH0sXG4gIGVwaWNlZGl0b3I6IHtcblxuICB9LFxuICBzY2VkaXRvcjoge1xuXG4gIH0sXG4gIHNlbGVjdDI6IHtcblxuICB9LFxuICBzZWxlY3RpemU6IHtcbiAgfVxufTtcblxuLy8gRGVmYXVsdCBwZXItZWRpdG9yIG9wdGlvbnNcbiRlYWNoKEpTT05FZGl0b3IuZGVmYXVsdHMuZWRpdG9ycywgZnVuY3Rpb24oaSxlZGl0b3IpIHtcbiAgSlNPTkVkaXRvci5kZWZhdWx0cy5lZGl0b3JzW2ldLm9wdGlvbnMgPSBlZGl0b3Iub3B0aW9ucyB8fCB7fTtcbn0pO1xuXG4vLyBTZXQgdGhlIGRlZmF1bHQgcmVzb2x2ZXJzXG4vLyBVc2UgXCJtdWx0aXBsZVwiIGFzIGEgZmFsbCBiYWNrIGZvciBldmVyeXRoaW5nXG5KU09ORWRpdG9yLmRlZmF1bHRzLnJlc29sdmVycy51bnNoaWZ0KGZ1bmN0aW9uKHNjaGVtYSkge1xuICBpZih0eXBlb2Ygc2NoZW1hLnR5cGUgIT09IFwic3RyaW5nXCIpIHJldHVybiBcIm11bHRpcGxlXCI7XG59KTtcbi8vIElmIHRoZSB0eXBlIGlzIG5vdCBzZXQgYnV0IHByb3BlcnRpZXMgYXJlIGRlZmluZWQsIHdlIGNhbiBpbmZlciB0aGUgdHlwZSBpcyBhY3R1YWxseSBvYmplY3RcbkpTT05FZGl0b3IuZGVmYXVsdHMucmVzb2x2ZXJzLnVuc2hpZnQoZnVuY3Rpb24oc2NoZW1hKSB7XG4gIC8vIElmIHRoZSBzY2hlbWEgaXMgYSBzaW1wbGUgdHlwZVxuICBpZighc2NoZW1hLnR5cGUgJiYgc2NoZW1hLnByb3BlcnRpZXMgKSByZXR1cm4gXCJvYmplY3RcIjtcbn0pO1xuLy8gSWYgdGhlIHR5cGUgaXMgc2V0IGFuZCBpdCdzIGEgYmFzaWMgdHlwZSwgdXNlIHRoZSBwcmltaXRpdmUgZWRpdG9yXG5KU09ORWRpdG9yLmRlZmF1bHRzLnJlc29sdmVycy51bnNoaWZ0KGZ1bmN0aW9uKHNjaGVtYSkge1xuICAvLyBJZiB0aGUgc2NoZW1hIGlzIGEgc2ltcGxlIHR5cGVcbiAgaWYodHlwZW9mIHNjaGVtYS50eXBlID09PSBcInN0cmluZ1wiKSByZXR1cm4gc2NoZW1hLnR5cGU7XG59KTtcbi8vIEJvb2xlYW4gZWRpdG9yc1xuSlNPTkVkaXRvci5kZWZhdWx0cy5yZXNvbHZlcnMudW5zaGlmdChmdW5jdGlvbihzY2hlbWEpIHtcbiAgaWYoc2NoZW1hLnR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIElmIGV4cGxpY2l0bHkgc2V0IHRvICdjaGVja2JveCcsIHVzZSB0aGF0XG4gICAgaWYoc2NoZW1hLmZvcm1hdCA9PT0gXCJjaGVja2JveFwiIHx8IChzY2hlbWEub3B0aW9ucyAmJiBzY2hlbWEub3B0aW9ucy5jaGVja2JveCkpIHtcbiAgICAgIHJldHVybiBcImNoZWNrYm94XCI7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgZGVmYXVsdCB0byBzZWxlY3QgbWVudVxuICAgIHJldHVybiAoSlNPTkVkaXRvci5wbHVnaW5zLnNlbGVjdGl6ZS5lbmFibGUpID8gJ3NlbGVjdGl6ZScgOiAnc2VsZWN0JztcbiAgfVxufSk7XG4vLyBVc2UgdGhlIG11bHRpcGxlIGVkaXRvciBmb3Igc2NoZW1hcyB3aGVyZSB0aGUgYHR5cGVgIGlzIHNldCB0byBcImFueVwiXG5KU09ORWRpdG9yLmRlZmF1bHRzLnJlc29sdmVycy51bnNoaWZ0KGZ1bmN0aW9uKHNjaGVtYSkge1xuICAvLyBJZiB0aGUgc2NoZW1hIGNhbiBiZSBvZiBhbnkgdHlwZVxuICBpZihzY2hlbWEudHlwZSA9PT0gXCJhbnlcIikgcmV0dXJuIFwibXVsdGlwbGVcIjtcbn0pO1xuLy8gRWRpdG9yIGZvciBiYXNlNjQgZW5jb2RlZCBmaWxlc1xuSlNPTkVkaXRvci5kZWZhdWx0cy5yZXNvbHZlcnMudW5zaGlmdChmdW5jdGlvbihzY2hlbWEpIHtcbiAgLy8gSWYgdGhlIHNjaGVtYSBjYW4gYmUgb2YgYW55IHR5cGVcbiAgaWYoc2NoZW1hLnR5cGUgPT09IFwic3RyaW5nXCIgJiYgc2NoZW1hLm1lZGlhICYmIHNjaGVtYS5tZWRpYS5iaW5hcnlFbmNvZGluZz09PVwiYmFzZTY0XCIpIHtcbiAgICByZXR1cm4gXCJiYXNlNjRcIjtcbiAgfVxufSk7XG4vLyBFZGl0b3IgZm9yIHVwbG9hZGluZyBmaWxlc1xuSlNPTkVkaXRvci5kZWZhdWx0cy5yZXNvbHZlcnMudW5zaGlmdChmdW5jdGlvbihzY2hlbWEpIHtcbiAgaWYoc2NoZW1hLnR5cGUgPT09IFwic3RyaW5nXCIgJiYgc2NoZW1hLmZvcm1hdCA9PT0gXCJ1cmxcIiAmJiBzY2hlbWEub3B0aW9ucyAmJiBzY2hlbWEub3B0aW9ucy51cGxvYWQgPT09IHRydWUpIHtcbiAgICBpZih3aW5kb3cuRmlsZVJlYWRlcikgcmV0dXJuIFwidXBsb2FkXCI7XG4gIH1cbn0pO1xuLy8gVXNlIHRoZSB0YWJsZSBlZGl0b3IgZm9yIGFycmF5cyB3aXRoIHRoZSBmb3JtYXQgc2V0IHRvIGB0YWJsZWBcbkpTT05FZGl0b3IuZGVmYXVsdHMucmVzb2x2ZXJzLnVuc2hpZnQoZnVuY3Rpb24oc2NoZW1hKSB7XG4gIC8vIFR5cGUgYGFycmF5YCB3aXRoIGZvcm1hdCBzZXQgdG8gYHRhYmxlYFxuICBpZihzY2hlbWEudHlwZSA9PSBcImFycmF5XCIgJiYgc2NoZW1hLmZvcm1hdCA9PSBcInRhYmxlXCIpIHtcbiAgICByZXR1cm4gXCJ0YWJsZVwiO1xuICB9XG59KTtcbi8vIFVzZSB0aGUgYHNlbGVjdGAgZWRpdG9yIGZvciBkeW5hbWljIGVudW1Tb3VyY2UgZW51bXNcbkpTT05FZGl0b3IuZGVmYXVsdHMucmVzb2x2ZXJzLnVuc2hpZnQoZnVuY3Rpb24oc2NoZW1hKSB7XG4gIGlmKHNjaGVtYS5lbnVtU291cmNlKSByZXR1cm4gKEpTT05FZGl0b3IucGx1Z2lucy5zZWxlY3RpemUuZW5hYmxlKSA/ICdzZWxlY3RpemUnIDogJ3NlbGVjdCc7XG59KTtcbi8vIFVzZSB0aGUgYGVudW1gIG9yIGBzZWxlY3RgIGVkaXRvcnMgZm9yIHNjaGVtYXMgd2l0aCBlbnVtZXJhdGVkIHByb3BlcnRpZXNcbkpTT05FZGl0b3IuZGVmYXVsdHMucmVzb2x2ZXJzLnVuc2hpZnQoZnVuY3Rpb24oc2NoZW1hKSB7XG4gIGlmKHNjaGVtYVtcImVudW1cIl0pIHtcbiAgICBpZihzY2hlbWEudHlwZSA9PT0gXCJhcnJheVwiIHx8IHNjaGVtYS50eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gXCJlbnVtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYoc2NoZW1hLnR5cGUgPT09IFwibnVtYmVyXCIgfHwgc2NoZW1hLnR5cGUgPT09IFwiaW50ZWdlclwiIHx8IHNjaGVtYS50eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gKEpTT05FZGl0b3IucGx1Z2lucy5zZWxlY3RpemUuZW5hYmxlKSA/ICdzZWxlY3RpemUnIDogJ3NlbGVjdCc7XG4gICAgfVxuICB9XG59KTtcbi8vIFNwZWNpYWxpemVkIGVkaXRvcnMgZm9yIGFycmF5cyBvZiBzdHJpbmdzXG5KU09ORWRpdG9yLmRlZmF1bHRzLnJlc29sdmVycy51bnNoaWZ0KGZ1bmN0aW9uKHNjaGVtYSkge1xuICBpZihzY2hlbWEudHlwZSA9PT0gXCJhcnJheVwiICYmIHNjaGVtYS5pdGVtcyAmJiAhKEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSkgJiYgc2NoZW1hLnVuaXF1ZUl0ZW1zICYmIFsnc3RyaW5nJywnbnVtYmVyJywnaW50ZWdlciddLmluZGV4T2Yoc2NoZW1hLml0ZW1zLnR5cGUpID49IDApIHtcbiAgICAvLyBGb3IgZW51bWVyYXRlZCBzdHJpbmdzLCBudW1iZXIsIG9yIGludGVnZXJzXG4gICAgaWYoc2NoZW1hLml0ZW1zLmVudW0pIHtcbiAgICAgIHJldHVybiAnbXVsdGlzZWxlY3QnO1xuICAgIH1cbiAgICAvLyBGb3Igbm9uLWVudW1lcmF0ZWQgc3RyaW5ncyAodGFnIGVkaXRvcilcbiAgICBlbHNlIGlmKEpTT05FZGl0b3IucGx1Z2lucy5zZWxlY3RpemUuZW5hYmxlICYmIHNjaGVtYS5pdGVtcy50eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gJ2FycmF5U2VsZWN0aXplJztcbiAgICB9XG4gIH1cbn0pO1xuLy8gVXNlIHRoZSBtdWx0aXBsZSBlZGl0b3IgZm9yIHNjaGVtYXMgd2l0aCBgb25lT2ZgIHNldFxuSlNPTkVkaXRvci5kZWZhdWx0cy5yZXNvbHZlcnMudW5zaGlmdChmdW5jdGlvbihzY2hlbWEpIHtcbiAgLy8gSWYgdGhpcyBzY2hlbWEgdXNlcyBgb25lT2ZgIG9yIGBhbnlPZmBcbiAgaWYoc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZikgcmV0dXJuIFwibXVsdGlwbGVcIjtcbn0pO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBzbWFsbCB3cmFwcGVyIGZvciB1c2luZyBKU09OIEVkaXRvciBsaWtlIGEgdHlwaWNhbCBqUXVlcnkgcGx1Z2luLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gIGlmKHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvKSB7XG4gICAgdmFyICQgPSB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0bztcbiAgICAkLmpzb25lZGl0b3IgPSBKU09ORWRpdG9yLmRlZmF1bHRzO1xuXG4gICAgJC5mbi5qc29uZWRpdG9yID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGVkaXRvciA9IHRoaXMuZGF0YSgnanNvbmVkaXRvcicpO1xuICAgICAgaWYob3B0aW9ucyA9PT0gJ3ZhbHVlJykge1xuICAgICAgICBpZighZWRpdG9yKSB0aHJvdyBcIk11c3QgaW5pdGlhbGl6ZSBqc29uZWRpdG9yIGJlZm9yZSBnZXR0aW5nL3NldHRpbmcgdGhlIHZhbHVlXCI7XG5cbiAgICAgICAgLy8gU2V0IHZhbHVlXG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgZWRpdG9yLnNldFZhbHVlKGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IHZhbHVlXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZihvcHRpb25zID09PSAndmFsaWRhdGUnKSB7XG4gICAgICAgIGlmKCFlZGl0b3IpIHRocm93IFwiTXVzdCBpbml0aWFsaXplIGpzb25lZGl0b3IgYmVmb3JlIHZhbGlkYXRpbmdcIjtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBhIHNwZWNpZmljIHZhbHVlXG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci52YWxpZGF0ZShhcmd1bWVudHNbMV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci52YWxpZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmKG9wdGlvbnMgPT09ICdkZXN0cm95Jykge1xuICAgICAgICBpZihlZGl0b3IpIHtcbiAgICAgICAgICBlZGl0b3IuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuZGF0YSgnanNvbmVkaXRvcicsbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBEZXN0cm95IGZpcnN0XG4gICAgICAgIGlmKGVkaXRvcikge1xuICAgICAgICAgIGVkaXRvci5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgZWRpdG9yXG4gICAgICAgIGVkaXRvciA9IG5ldyBKU09ORWRpdG9yKHRoaXMuZ2V0KDApLG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmRhdGEoJ2pzb25lZGl0b3InLGVkaXRvcik7XG5cbiAgICAgICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGVkaXRvci5vbignY2hhbmdlJyxmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWRpdG9yLm9uKCdyZWFkeScsZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi50cmlnZ2VyKCdyZWFkeScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxufSkoKTtcblxuICB3aW5kb3cuSlNPTkVkaXRvciA9IEpTT05FZGl0b3I7XG59KSgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc29uZWRpdG9yLmpzLm1hcCJdfQ==
