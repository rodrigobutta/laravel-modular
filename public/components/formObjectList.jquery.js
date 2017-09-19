(function($) {

    $.formObjectList = function(element, options) {

        var defaults = {
        	placeholder: '...',
            name: null,
            value: null,
            sortable: true,
            button: {
                remove: {
                    title: 'Quitar de la lista'
                }
            },
			search: {
				url: null,
				minimumInputLength: 1,
				maximumInputLength: 50,
                format: { // fieldset esperado del retorno ajax de search
                    input: {
                        text: 'text',
                        id: 'id',
                        extra: ''
                    },
                },
			},
			format: { // fieldset para print value inicial desde html dom
				input: {
					text: 'text',
					id: 'id'
				},
			},
            extra_fields: [
            ],
            no_results: {
                text: "No results found",
                add: {
                    enabled: false,
                    text: 'Add'
                }
            }
        }

        var plugin = this;
        	plugin.settings = {};

        var $element = $(element),
             element = element;

		var $plugin_container = null;
        var $select = null;
        var $list = null;
        var $loading_frame = null;

        var current_param = '';

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
			    class: 'form-input-object-list'
			}).insertAfter($element);

			$select = $("<select/>", {
				class: 'form-control'
			}).appendTo($plugin_container);

			$list = $("<ol/>", {
			}).appendTo($plugin_container);

			$loading_frame = $("<span/>", {
				class: 'form-input-object-list-loading',
			    html: '<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading..</span>'
			});

 			$select.select2({
                placeholder: plugin.settings.placeholder,
                allowClear: true,
                templateResult: listFormat,
                templateSelection: listFormatSelection,
                escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                minimumInputLength: plugin.settings.search.minimumInputLength,
                maximumInputLength: plugin.settings.search.maximumInputLength,

                language: {
                     noResults: function(term) {

                        var res = plugin.settings.no_results.text
                        if(plugin.settings.no_results.add.enabled){
                            res = res + ". <div id='"+plugin.settings.name+"_add' class='not-found-add'>"+plugin.settings.no_results.add.text+" <strong>"+current_param+"</strong></div>?";
                        }

                        return res;
                    }
                },

                ajax: {
                    dataType: 'json',
                    url: plugin.settings.search.url,
                    delay: 250,
                    data: function(params) {

                        current_param=params.term;

                        return {
                            term: params.term,
                          //  otro: 'dsdsdsdsdsdsds'
                        }

                    },
                    processResults: function (data, page) {
                        // console.log(data);

                        for (var i = 0; i < data.length; i++) {
                            data[i].text = data[i][plugin.settings.search.format.input.text];
                            data[i].extra = data[i][plugin.settings.search.format.input.extra];
                        };

                        return {
                            results: data
                        };
                    }
                }
            }).on("change", function(e) {

                var tmp_arr = $select.select2("data");
                if(tmp_arr.length > 0){

                	addItem(tmp_arr[0]);

                    binds();

	                $select.empty();

	                updateValue();

                }

            });

            if(plugin.settings.sortable){

                $list.nestedSortable({
    	            forcePlaceholderSize: true,
    	            disableNestingClass: 'no-nesting',
                    disableNesting: 'no-nesting',
    	            // handle: 'div',
    	            helper: 'clone',
    	            items: 'li',
    	            listType: 'ol',
    	            maxLevels: 1,
    	            // opacity: .6,
    	            // placeholder: 'placeholder',
    	            tolerance: 'pointer',
    	            // toleranceElement: '> div',
    	            stop: function() {
    	            	updateValue();
    	            }
    	        });

            }


            if(plugin.settings.value!=null){

	            var tmp_arr = JSON.parse(plugin.settings.value);

	            for (var i = 0; i < tmp_arr.length; i++) {

	            	tmp_arr[i].text = tmp_arr[i][plugin.settings.format.input.text];

                    // for (var e = 0; e < plugin.settings.extra_fields.length; e++) {
                    //     tmp_arr[i][plugin.settings.extra_fields[e].name] = tmp_arr[i].pivot[plugin.settings.extra_fields[e].name];
                    // };

	            	addItem(tmp_arr[i]);

	            };

            }

            updateValue();

			binds();

            $(document).on('click',"#" + plugin.settings.name + "_add",function(){
                console.log('add' + "#" + plugin.settings.name + "_add");
                addItem();
                $select.select2("close");
            });

        }



        // actualizo el json sacado de la lista en el campo hidden original
        var updateValue = function() {
            console.log('updateValue');
        	$element.val(getValueJson());
        }

        // funcion publica para obtener el valor json de la lista por si necesito hacerlo desde JS
        plugin.getJsonString = function() {
        	return getValueJson();
        }

        // Obtengo el JSON collection de todos los items en la lista, por ahora ID y logic de prueba
        var getValueJson = function() {

        	var res = [];
            $list.find('li').each(function(){
                // el ix es el order
                item = {};
                item.id = $(this).data('id');

                if(item.id=='0'){
                    item.field_label = $(this).find('.field-label').html();
                    if (plugin.settings.no_results.add.companion) {
                       var $companion_field = $(this).find('.companion');
                       item[$companion_field.attr('name')] = $companion_field.val();
                    }
                }

                for (var i = 0; i < plugin.settings.extra_fields.length; i++) {

                    var value = '';

                    if(plugin.settings.extra_fields[i].type=='text'){

                        value = $(this).find('input[name="'+plugin.settings.extra_fields[i].name+'"]').val();

                    }
                    else if(plugin.settings.extra_fields[i].type=='boolean'){

                        if($(this).find('input[name="'+plugin.settings.extra_fields[i].name+'"]').is(':checked')){
                            value = '1';
                        }
                        else{
                            value = '0';
                        }

                    }
                    else if(plugin.settings.extra_fields[i].type=='collection'){

                        value = $(this).find('input[name="'+plugin.settings.extra_fields[i].name+'"]').attr('data-json');

                    }

                    item[plugin.settings.extra_fields[i].name] = value;

                };

                res.push(item);
            });

            return JSON.stringify(res);
        }


        var binds = function() {

        	$list.on('click','.remove',function (e) {
                e.preventDefault();
                $(this).closest('li').animate({ height: 'toggle', opacity: 'toggle' }, 'fast',function(){
                    $(this).remove();
                     updateValue();
                });
            });

            $list.off('change').on('change','.extra-field',function (e) {
                updateValue();
            });

            // ***** TODO FIX
            // $(document).off('click').on('click',"#" + plugin.settings.name + "_add",function(){
            //     console.log('add' + "#" + plugin.settings.name + "_add");
            //     addItem();
            //     $select.select2("close");
            // });

        }

        var addItem = function(obj=null) {

         //   console.log('addItem', plugin);

            if(obj==null){
                var obj = {};
                    obj.text = current_param;
                    obj.id = 0;
            }
//            console.log(obj);

            $li = $("<li/>", {
                'data-id': obj.id,
                'class': 'no-nesting'
            });

            $span = $("<span/>", {
                class: 'field-label',
                html: obj.text
            }).appendTo($li);

            $button = $("<button/>", {
                class: 'remove pull-right btn btn-danger btn-sm',
                html: '<i class="fa fa-close"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.remove.title
            }).appendTo($li);


            if('extra_fields' in plugin.settings){

                for (var i = 0; i < plugin.settings.extra_fields.length; i++) {

                    var value = '';

                    if('pivot' in obj){
                        if(plugin.settings.extra_fields[i].name in obj.pivot){
                            value = obj.pivot[plugin.settings.extra_fields[i].name];
                        }
                    }

                    if(plugin.settings.extra_fields[i].type=='text'){

                        $el = $("<input/>", {
                            class: 'extra-field',
                            'data-ix': i,
                            name: plugin.settings.extra_fields[i].name,
                            type: 'text',
                            value: value,
                            'data-toggle':'tooltip',
                            'title': plugin.settings.extra_fields[i].title
                        }).appendTo($li);

                    }
                    else if(plugin.settings.extra_fields[i].type=='boolean'){

                        $el = $("<input/>", {
                            class: 'extra-field',
                            'data-ix': i,
                            name: plugin.settings.extra_fields[i].name,
                            type: 'checkbox',
                            value: '1',
                            'data-toggle':'tooltip',
                            'title': plugin.settings.extra_fields[i].title
                        }).appendTo($li);

                        // $el.on('click',function(){
                            // $list.find('input[name="'+$(this).attr('name')+'"]').attr('checked',false);
                        // });

                        if(value=='1'){
                            $el.attr('checked',true);
                        }

                    }
                    else if(plugin.settings.extra_fields[i].type=='collection'){

                        $el = $("<input/>", {
                            class: 'extra-field',
                            'data-ix': i,
                            name: plugin.settings.extra_fields[i].name,
                            type: 'button',
                            value: plugin.settings.extra_fields[i].title,
                            'data-json': value,
                            'data-toggle':'tooltip',
                            'title': plugin.settings.extra_fields[i].title
                        }).appendTo($li).on('click',function(){

                            var extra_field = plugin.settings.extra_fields[$(this).attr('data-ix')];

                            openDialog($(this),extra_field);

                        });

                    }

                };

            }
            // EK: se fija si esta definido el companion field para unidades
            if(plugin.settings.no_results.add.companion && obj.id == 0) {
               var companion = $(plugin.settings.no_results.add.companion);
               companion.addClass('extra-field companion');
               companion.insertAfter($el);
            }

            $list.append($li);

        }


        var listFormat = function(data) {
            if (data.loading) return data.text;

            if (data.extra == null){
                data.extra = '';
            }

            var markup = "<div class='select2-result-data clearfix'>" +
           // "<div class='select2-result-data__image'><img src='" + data.image + "' /></div>" +
            "<div class='select2-result-data__meta'>" +
              "<div class='select2-result-data__title'>" + data.text + "</div>" ;


            markup += "<div class='select2-result-data__statistics'>" +
            "<div class='select2-result-data__id'><strong>" + data.extra + "</div>" +
          //  "<div class='select2-result-data__created'><i class='fa fa-calendar-o'></i> " + data.created + "</div>" +
            "</div>" +
            "</div></div>";

            return markup;
        }

        var listFormatSelection = function(data) {
            return data.text || data.id;
        }



        var openDialog = function($el,extra_field) {


            var hh = '';
                hh += '<div class="modal-dialog">';
                hh += ' <div class="modal-content">';
                hh += '    <div class="modal-header">';
                hh += '      <button type="button" class="close" data-dismiss="modal">&times;</button>';
                hh += '      <h4 class="modal-title">Valores del filtro</h4>';
                hh += '    </div>';
                hh += '    <div class="modal-body">';
                hh += '    </div>';
                hh += '    <div class="modal-footer">';
                hh += '      <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>';
                hh += '      <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>';
                hh += '    </div>';
                hh += '  </div>';
                hh += '</div>';

            var $dialog = $("<div/>", {
                class: 'modal fade',
                role: 'dialog',
                html: hh
            }).appendTo("html");


            var inner_component = $("<input/>", {
                                    name: 'res',
                                    type: 'hidden'
                            }).appendTo($dialog.find('.modal-body'));

                if($el.attr('data-json')!=''){
                   inner_component.val($el.attr('data-json'));
                }

                // le paso los parametros del inner_component formTable interno que se agregan como behaviour en la llamada del principal, en este caso, las columnas
                inner_component.formTable(extra_field.behaviour);

            var $btn_accept = $dialog.find('.modal-footer button.btn-primary');
                $btn_accept.on('click',function(){

                    $el.attr('data-json',inner_component.val());

                    updateValue();
                });


            $dialog.modal('show');

            $dialog.on('hidden.bs.modal', function () {
                $(this).data('bs.modal', null);
                $(this).remove();
            });

        }



        plugin.init();

    }

    $.fn.formObjectList = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formObjectList')) {
                var plugin = new $.formObjectList(this, options);
                $(this).data('formObjectList', plugin);
            }
        });

    }

})(jQuery);
