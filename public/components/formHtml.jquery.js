(function($) {

    $.formHtml = function(element, options) {

        var defaults = {
        	autoParagraph: false,
            placeholder: '',
            name: null,
            value: null,
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;

        var $ck = null;


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

            $element.addClass('form-control');

            var $ck = CKEDITOR.replace( element, {
                height: 150,
                enterMode : CKEDITOR.ENTER_BR,
                shiftEnterMode: CKEDITOR.ENTER_P,
                autoParagraph: false,
                contentsCss: ["body {font-size: 14px; font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif}"],
                toolbarGroups: [
                   { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'links', groups: [ 'links' ] },
                    { name: 'insert', groups: [ 'insert' ] },
                    { name: 'forms', groups: [ 'forms' ] },
                    { name: 'tools', groups: [ 'tools' ] },
                    { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                    { name: 'others', groups: [ 'others' ] },
                    '/',
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                    { name: 'styles', groups: [ 'styles' ] },
                    { name: 'colors', groups: [ 'colors' ] },
                ],
                removeButtons: 'Scayt,Maximize,About,Cut,Copy,Paste,PasteText,PasteFromWord',

                // entities: false,
                // basicEntities: false,
                // entities_greek: false,
                // entities_latin: false,


            } );


            $ck.on( 'change', function( evt ) {
                $element.val(evt.editor.getData());
            });

            if(plugin.settings.value!=null){
                $element.val(plugin.settings.value);
            }

        }

        plugin.init();

    }

    $.fn.formHtml = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formHtml')) {
                var plugin = new $.formHtml(this, options);
                $(this).data('formHtml', plugin);
            }
        });

    }

})(jQuery);