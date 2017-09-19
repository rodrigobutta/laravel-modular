(function($) {

    $.inlineImage = function(element, options) {

        var defaults = {
            name: null,
            value: null,
			recipe: 'not-defined',
			ajax: {
				url: null,
				fugitive: true,
				archive: 'media'
			},
            button: {
                open: {
                    title: 'Seleccionar desde su computadora'
                },
                clear: {
                    title: 'Eliminar imagen'
                },
                back: {
                    title: 'Deshacer'
                }
            },
            // imageChanged: function() {}
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;

        var $original_value = '';
        // var $original_preview_value = '';

		var $plugin_container = null;
        var $button_open = null;
        var $button_back = null;
        var $button_clear = null;
        var $file_input = null;
        var $loading_frame = null;
        // var $element = null;
        // var $span_label = null;

        var is_ajax = false;

        plugin.init = function() {
          	plugin.settings = $.extend({}, defaults, options);

          	if( plugin.settings.ajax.url!=null && plugin.settings.ajax.url!='' ){
          		is_ajax=true;
          	}

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.name==null && $element.attr('name')){
            	plugin.settings.name = $element.attr('name');
            }

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.value==null && $element.attr('data-value')){
            	plugin.settings.value = $element.attr('data-value');
            }

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.recipe==null && $element.data('preview-recipe')){
            	plugin.settings.recipe = $element.data('preview-recipe');
            }

            // console.log('plugin.init ' + plugin.settings.name + ' (preview: ' + plugin.settings.recipe + ')');

            // salvo el valor original para un back
            $original_value = plugin.settings.value;
            // $original_preview_value = get_image_path(plugin.settings.value);


			$plugin_container = $("<div/>", {
			    class: 'inline-input-image-container'
			}).insertBefore($element);


			$button_container = $("<div/>", {
			    class: 'inline-input-image-container-buttons'
			}).appendTo($plugin_container);

			$button_clear = $("<button/>", {
				type: 'button',
				class: 'btn btn-danger inline-input-image-btn inline-input-image-btn-clear btn-sm',
			    html: '<i class="fa fa-close"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.clear.title
			}).appendTo($button_container);

			$button_open = $("<button/>", {
				type: 'button',
				class: 'btn btn-success inline-input-image-btn inline-input-image-btn-open btn-sm',
			    html: '<i class="fa fa-folder-open"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.open.title
			}).appendTo($button_container)

			$button_back = $("<button/>", {
				type: 'button',
				class: 'btn btn-default inline-input-image-btn inline-input-image-btn-back btn-sm',
			    html: '<i class="fa fa-step-backward"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.back.title
			}).appendTo($button_container);

            $loading_frame = $("<div/>", {
                class: 'inline-input-image-loading progress progress-striped active',
                html: '<div class="progress-bar progress-bar-primary" style="width:100%"></div>'
            });


			var file_wrapper = $("<div/>", {
			    class: 'inline-input-image-hide'
			}).insertAfter($element);

			$file_input = $("<input/>", {
				type: 'file',
				name: plugin.settings.name + '_file'
			}).appendTo(file_wrapper);

			if(!is_ajax){
				$file_input.attr('name',plugin.settings.name);
				$element.attr('name',plugin.settings.name + '_file');
			}
			// else{
				// $file_input.attr('name',plugin.settings.name + '_file');
				// $element.attr('name',plugin.settings.name);
			// }


			binds();

        }

        plugin.public_method = function() {
        }


        var get_image_path = function(name) {
        	console.log('get_image_path ' + name)

        	if(name==null || name==''){
        		return '';
        	}

        	var host = window.location.host;
        	if(host=='localhost'){
        		host += '/bgh';
        	}

        	return window.location.protocol + "//" + host + "/image/" + name + '/' + plugin.settings.recipe
        }


        var updateValue = function(value) {

            if($element.is("img")){
                $element.attr("src", get_image_path(value));
            }
            else{
                $element.css("background-image", "url('" + get_image_path(value) + "')");
            }

            $element.attr('data-value',value).addClass('dirty');

        }

        var binds = function() {

			$button_open.click(function(){
				$file_input.trigger('click');
			});

			$button_back.on('click',function(){
	            $file_input.val('');
	            $button_back.hide();
                updateValue($original_value);
	        });

	        $button_clear.on('click',function(){
	            $file_input.val('');
	            $button_back.show();
                updateValue('');
	        });

			$file_input.change(function(){

	            var el = $(this)[0];
	            if (el.files && el.files[0]) {

	            	$loading_frame.appendTo($plugin_container);
                    $button_container.hide();
                    $element.css('opacity',0.7);

	                var reader = new FileReader();
	                reader.onload = function (e) {

                        if($element.is("img")){
                            $element.attr('src', e.target.result);
                        }
                        else{
                            $element.css("background-image", "url('" + e.target.result + "')");
                        }

	                    $button_back.show();

	                    var data = new FormData();
						jQuery.each(el.files, function(i, file) {
						    data.append('files', file);
						});
						data.append('fugitive', plugin.settings.ajax.fugitive);
						data.append('archive', plugin.settings.ajax.archive);

						jQuery.ajax({
						    url: plugin.settings.ajax.url,
						    data: data,
						    cache: false,
						    contentType: false,
						    processData: false,
						    type: 'POST',
						    success: function(data){

                                $button_container.show();
						    	$loading_frame.remove();
						    	$button_back.show();
                                $element.css('opacity',1);

                                updateValue(data.files[0].name);

						    }
						});

	                }
	                reader.readAsDataURL(el.files[0]);

	            }

	        });


        }

        plugin.init();

    }

    $.fn.inlineImage = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('inlineImage')) {
                var plugin = new $.inlineImage(this, options);
                $(this).data('inlineImage', plugin);
            }
        });

    }

})(jQuery);