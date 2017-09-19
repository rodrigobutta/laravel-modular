(function($) {

    $.formSlug = function(element, options) {

        var defaults = {
            name: null,
            value: null,
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;


        plugin.init = function() {
          	plugin.settings = $.extend({}, defaults, options);

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.name==null && $element.attr('name')){
            	plugin.settings.name = $element.attr('name');
            }

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.value==null && $element.attr('value')){
            	plugin.settings.value = $element.attr('value');
            }

            // $element.addClass('form-control');

            $element.on('keypress', function (event) {
                var regex = new RegExp("^[a-zA-Z0-9-\--\.]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                   event.preventDefault();
                   return false;
                }
            });

            $element.bind('paste', function(event) {
                var _this = $(this);
                setTimeout( function() {
                    _this.val( formatSlug(_this.val()) );
                }, 100);
            });

            if(plugin.settings.value!=null){
                $element.val(plugin.settings.value);
            }

        }

        plugin.init();

    }

    var formatSlug = function(text) {

      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text

    }


    $.fn.formSlug = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formSlug')) {
                var plugin = new $.formSlug(this, options);
                $(this).data('formSlug', plugin);
            }
        });

    }

})(jQuery);