(function($) {

    $.formLink = function(element, options) {

        var defaults = {
        	placeholder: 'http://',
            name: null,
            value: null,
			search: {
                placeholder: 'search..',
				url: null,
				minimumInputLength: 1,
				maximumInputLength: 50
			}
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;

		var $plugin_container = null;
        var $select = null;
        var $select2 = null;
        var $select_combo = null;
        var $textbox = null;
        var $button_search = null;
        var $loading_frame = null;

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

            // console.log('plugin.init ' + plugin.settings.name);

			$plugin_container = $("<div/>", {
			    class: 'form-input-link'
			}).insertAfter($element);

            $textbox = $("<input/>", {
                class: 'form-control form-input-link-text',
                type: 'text',
                placeholder: plugin.settings.placeholder,
            }).appendTo($plugin_container);

            $button_search = $("<button/>", {
                class: 'btn btn-sm btn-success pull-right form-input-link-btn-search',
                type: 'button',
                html: '<i class="fa fa-search"></i>'
            }).appendTo($plugin_container);

			$select = $("<select/>", {
				class: 'form-control'
			}).appendTo($plugin_container);

			$loading_frame = $("<span/>", {
				class: 'form-input-link-loading',
			    html: '<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading..</span>'
			});

 			$select.select2({
                placeholder: plugin.settings.search.placeholder,
                allowClear: true,
                templateResult: listFormat,
                templateSelection: listFormatSelection,
                escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                minimumInputLength: plugin.settings.search.minimumInputLength,
                maximumInputLength: plugin.settings.search.maximumInputLength,
                ajax: {
                    dataType: 'json',
                    url: plugin.settings.search.url,
                    delay: 250,
                    data: function(params) {
                        // console.log(params);
                        return {
                            term: params.term,
                            otro: 'dsdsdsdsdsdsds'
                        }
                    },
                    processResults: function (data, page) {
                        // console.log(data);
                        return {
                            results: data
                        };
                    }
                }
            }).on("change", function(e) {

                var tmp_arr = $select.select2("data");

                if(tmp_arr.length>0){
                    $textbox.val(tmp_arr[0].link);
                    updateValue(tmp_arr[0].link);
                }

                $select_combo.hide();
                $select.empty();

            });

            $select_combo = $plugin_container.find('.select2');
            $select_combo.hide();

            $textbox.on('change', function(){
                // console.log('asda: ' + $(this).val());
                updateValue($(this).val());
            });

            $button_search.on('click', function(){
                $select_combo.show();
                $select.select2('open');
            });

            if(plugin.settings.value!=null){
                $textbox.val(plugin.settings.value);
                updateValue(plugin.settings.value);
            }

        }

        var updateValue = function(val){
            $element.val(val);
        }


        var listFormat = function(data) {
            if (data.loading) return data.text;

            var markup = "<div class='select2-result-data clearfix'>" +
            "<div class='select2-result-data__image'><img src='" + data.image + "' /></div>" +
            "<div class='select2-result-data__meta'>" +
              "<div class='select2-result-data__title'>" + data.text + "</div>" ;


            markup += "<div class='select2-result-data__statistics'>" +
            "<div class='select2-result-data__id'><strong>ID:</strong> " + data.id + "</div>" +
            "<div class='select2-result-data__created'><i class='fa fa-calendar-o'></i> " + data.created + "</div>" +
            "</div>" +
            "</div></div>";

            return markup;
        }

        var listFormatSelection = function(data) {
            return data.text || data.id;
        }


        plugin.init();

    }

    $.fn.formLink = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formLink')) {
                var plugin = new $.formLink(this, options);
                $(this).data('formLink', plugin);
            }
        });

    }

})(jQuery);