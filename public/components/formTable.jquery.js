(function($) {

    $.formTable = function(element, options) {

        var defaults = {
        	tooltip: '...',
            name: null,
            value: null,
			columns: [],
            button: {
                remove: {
                    title: 'Eliminar fila'
                },
                add: {
                    title: 'Agregar fila'
                }
            },
            new_item: {}
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;

		var $plugin_container = null;
        var $button_add = null;
        var $table = null;
        var $tooltip = null;
        var $thead = null;
        var $tbody = null;

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

			$plugin_container = $("<div/>", {
			    class: 'form-table'
			}).insertAfter($element);

            $button_add = $("<button/>", {
                class: 'btn btn-sm btn-success pull-right btn-add',
                type: 'button',
                html: '<i class="fa fa-plus"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.add.title
            }).appendTo($plugin_container);

            $table = $("<table/>", {
                class: 'table table-striped table-bordered'
            }).appendTo($plugin_container);

            $tooltip = $("<caption/>", {
                html: plugin.settings.tooltip
            }).appendTo($table);

            $thead = $("<thead/>", {
            }).appendTo($table);

            $thead = $("<tr/>", {
            }).appendTo($thead);

            for (var i = 0; i < plugin.settings.columns.length; i++) {

                $th = $("<th/>", {
                    html: plugin.settings.columns[i].title
                }).appendTo($thead);

                if(plugin.settings.columns[i].type=='hidden'){
                    $th.attr('style','display:none');
                }

            };

            $("<th/>", {
            }).appendTo($thead);

            $tbody = $("<tbody/>", {
            }).appendTo($table);


            $tbody.sortable({
                nested: false,
                containerPath: "tr",
                itemSelector: 'tr',
                placeholder: '',
                stop: function() {
                    updateValue();
                }
            });


            if(plugin.settings.value!=null){

	            var tmp_arr = JSON.parse(plugin.settings.value);
	            for (var i = 0; i < tmp_arr.length; i++) {

                    // conversion entre nombres de parametros
	            	// tmp_arr[i].text = tmp_arr[i][plugin.settings.format.input.text];
                    //
	            	addItem(tmp_arr[i]);

	            };

            }

            $button_add.on('click',function (e) {
                e.preventDefault();
                addItem(plugin.settings.new_item);
                updateValue();
                binds();
            });

            updateValue();
			binds();

        }


        // actualizo el json sacado de la lista en el campo hidden original
        var updateValue = function() {
            // sin el timeout algunos updates de dom no llegaban a concretarse previo value
            setTimeout(function() {
                $element.val(getValueJson());
            }, 250);
        }

        // funcion publica para obtener el valor json de la lista por si necesito hacerlo desde JS
        plugin.getJsonString = function() {
        	return getValueJson();
        }

        // Obtengo el JSON collection de todos los items en la lista, por ahora ID y logic de prueba
        var getValueJson = function() {
        	var res = [];

            $tbody.find('tr').each(function(){

                // el ix es el order
                var item = {};

                for (var i = 0; i < plugin.settings.columns.length; i++) {

                    var $td = $(this).find('.field[data-field="'+plugin.settings.columns[i].field+'"]');

                    var value = '';
                    if(plugin.settings.columns[i].type=='select'){
                        value = $td.attr('data-value');
                    }
                    else{
                        value = $td.html();
                    }

                    item[plugin.settings.columns[i].field] = value;

                };

                res.push(item);
            });

            return JSON.stringify(res);
        }


        var binds = function() {

            $tbody.on('click','.remove',function (e) {
                e.preventDefault();
                $(this).closest('tr').animate({ height: 'toggle', opacity: 'toggle' }, 'fast',function(){
                    $(this).remove();

                     updateValue();
                });
            });


            // $tbody.on('click','.editable-input > select',function (e) {
            //     console.log('selecttt');
            // });

            $tbody.on('click','.editable-submit',function (e) {
                // console.log('click ok');

                // me fijo si es un select
                var el = $(this).parent().prev().find('select').first();
                if(el.length){
                    // Es un select

                }
                else{
                    // Es un input

                    el = $(this).parent().prev().find('input').first();

                }

                var value = el.val();

                var $td = el.closest('.editable-container').prev(); // td

                var $tr = $td.parent();

                var field = $td.attr('data-field');

                if (options.onValueChanged !== undefined) {
                    options.onValueChanged($tr,field,value);
                }

            });





            for (var i = 0; i < plugin.settings.columns.length; i++) {

                // si no es columna de tipo hidden, instancio el jquery.editable para esa celda
                if(plugin.settings.columns[i].type!='hidden'){

                    var initial_value = null;

                    var source = [];
                    if(plugin.settings.columns[i].source && plugin.settings.columns[i].source.length>0){
                        source = plugin.settings.columns[i].source;
                    }

                    var $td = $tbody.find('.field[data-field="'+plugin.settings.columns[i].field+'"]');

                    // si tiene data-value es porque es un select, entonces formatear editable
                    var attr = $td.attr('data-value');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        initial_value = $td.attr('data-value');
                    }

                    $td.editable({
                        unsavedclass: null,
                        value: initial_value,
                        type: plugin.settings.columns[i].type,
                        source: source,
                        success: function(response, newValue) {

                            var attr = $(this).attr('data-value');
                            if (typeof attr !== typeof undefined && attr !== false) {
                                $(this).attr('data-value',newValue);
                            }

                            updateValue();
                        }
                    });

                }

            };

        }

        var addItem = function(obj) {

            $tr = $("<tr/>", {
            });

            for (var i = 0; i < plugin.settings.columns.length; i++) {

                $td = $("<td/>", {
                    class: 'field',
                    'data-field': plugin.settings.columns[i].field,
                    html: obj[plugin.settings.columns[i].field]
                }).appendTo($tr);

                // si la columna es select, necesito agregar atributo adicional para formatear el select y vaciar el html
                if(plugin.settings.columns[i].type=='select'){

                    // si no tiene valor inicializo en "" para que exista el atributo data-value y despues no tenga problema al guardar
                    var value = "";
                    if(obj[plugin.settings.columns[i].field]!=null){
                        value = obj[plugin.settings.columns[i].field];
                    }
                    $td.attr('data-value',value);

                    $td.html('');
                }

                if(plugin.settings.columns[i].type=='hidden'){
                    $td.attr('style','display:none');
                }

            };

            $td = $("<td/>", {
                html: '<button type="button" class="btn btn-sm btn-danger remove" data-toggle="tooltip" title="'+plugin.settings.button.remove.title+'"><i class="fa fa-close"></i></button>',
                style: 'white-space: nowrap; width: 1px;'
            }).appendTo($tr);

            $tr.appendTo($tbody);

            if (options.onItemAdded !== undefined) {
                options.onItemAdded($tr);
            }


        }

        plugin.init();

    }

    $.fn.formTable = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formTable')) {
                var plugin = new $.formTable(this, options);
                $(this).data('formTable', plugin);
            }
        });

    }

})(jQuery);