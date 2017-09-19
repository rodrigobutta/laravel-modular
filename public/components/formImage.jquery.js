(function($) {

    $.formImage = function(element, options) {

        var defaults = {
            name: null,
            value: null,
            preview: {
				recipe: null,
                path: window.location.protocol + "//" + window.location.host + "/image/{name}/{recipe}"
			},
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
			init: function() {},
            imageChanged: function() {}
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
             element = element;

        var $original_value = '';
        var $original_preview_value = '';

		var $plugin_container = null;
        var $button_open = null;
        var $button_back = null;
        var $button_clear = null;
        var $file_input = null;
        var $loading_frame = null;
        var $image_preview = null;
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
            if(plugin.settings.value==null && $element.attr('value')){
            	plugin.settings.value = $element.attr('value');
            }

            // si vino un atributo value cargado en el elemento origen y no se especifico un value en la isntancia, entonces tomo ese valor
            if(plugin.settings.preview.recipe==null && $element.data('preview-recipe')){
            	plugin.settings.preview.recipe = $element.data('preview-recipe');
            }

            // console.log('plugin.init ' + plugin.settings.name + ' (preview: ' + plugin.settings.preview.recipe + ')');

            // salvo el valor original para un back
            $original_value = plugin.settings.value;
            $original_preview_value = get_image_path(plugin.settings.value);


			$plugin_container = $("<div/>", {
			    class: 'form-input-image-images'
			}).insertAfter($element);


			$button_container = $("<div/>", {
			    class: 'form-input-image-images-button-container'
			}).appendTo($plugin_container);

			$button_clear = $("<button/>", {
				type: 'button',
				class: 'btn btn-danger form-input-image-btn form-input-image-btn-clear btn-sm',
			    html: '<i class="fa fa-close"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.clear.title
			}).appendTo($button_container);

			$button_open = $("<button/>", {
				type: 'button',
				class: 'btn btn-success form-input-image-btn form-input-image-btn-open btn-sm',
			    html: '<i class="fa fa-folder-open"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.open.title
			}).appendTo($button_container)

			$button_back = $("<button/>", {
				type: 'button',
				class: 'btn btn-default form-input-image-btn form-input-image-btn-back btn-sm',
			    html: '<i class="fa fa-step-backward"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.back.title
			}).appendTo($button_container);



			$loading_frame = $("<span/>", {
				class: 'form-input-image-loading',
			    html: '<i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading..</span>'
			});

			$image_preview = $("<img/>", {
				class: 'form-input-image-image-preview',
			    src: $original_preview_value
			}).appendTo($plugin_container);

			check_preview();

			// $span_label = $("<span/>", {
			// 	class: 'form-input-image-label'
			// });

			var file_wrapper = $("<div/>", {
			    class: 'form-input-image-hide'
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

			if (typeof plugin.settings.init === 'function')
				plugin.settings.init()
        }

        plugin.public_method = function() {
        }


        var get_image_path = function(name) {
        	// console.log('get_image_path ' + name)

        	if(name==null || name==''){
        		return '';
        	}

        	// var host = window.location.host;
        	// if(host=='localhost'){
        	// 	host += '/bgh';
        	// }

            var url = plugin.settings.preview.path;

            var recipe = plugin.settings.preview.recipe;

            url = url.replace("{name}", name);
            url = url.replace("{recipe}", recipe);

            return url;
        }

        var check_preview = function (){

			if($image_preview.attr('src') != ''){
				$image_preview.show();
				$button_clear.show();

				if($image_preview.attr('src').indexOf('.png') !== -1) {
		    		$plugin_container.addClass('png');
		    	}
		    	else {
		    		$plugin_container.removeClass('png');
		    	}
			}
			else {
				$image_preview.hide();
				$button_clear.hide();
			}

        }

        var binds = function() {

			$button_open.click(function(){
				// console.log('$button_open.click');
				$file_input.trigger('click');
			});

			$button_back.on('click',function(){
	            $file_input.val('');
	            // $span_label.remove();
	            $image_preview.attr('src', $original_preview_value);
	            check_preview();
	            $button_back.hide();
	            $element.val($original_value);
	        });

	        $button_clear.on('click',function(){
	            $file_input.val('');
	            // $span_label.remove();
	            $image_preview.attr('src', '');
	            check_preview();
	            $button_back.show();
	            // $button_clear.hide();
	            $element.val('');

	            $plugin_container.removeClass('png');
	        });

			$file_input.change(function(){
				// console.log('$file_input.change');

	            var el = $(this)[0];
	            if (el.files && el.files[0]) {

	            	$loading_frame.appendTo($plugin_container).css('opacity',1);
					// $span_label.html(el.files[0].name).appendTo($plugin_container);

	                var reader = new FileReader();
	                reader.onload = function (e) {

	                    $image_preview.attr('src', e.target.result);
	                    check_preview();
	                    $button_back.show();

	                    var reg_ext = /(?:\.([^.]+))?$/;
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

						    	console.log('Ext: '+reg_ext.exec( data.files[0].name )[1]);
								if (typeof plugin.settings.imageChanged === 'function')
									plugin.settings.imageChanged(data.files[0].name, $file_input)

						    	if(reg_ext.exec( data.files[0].name )[1] != undefined && reg_ext.exec( data.files[0].name )[1] == 'png') {
						    		$plugin_container.addClass('png');
						    	}
						    	else {
						    		$plugin_container.removeClass('png');
						    	}

						    	$loading_frame.remove();
						    	$button_back.show();

						    	$element.val( data.files[0].name );

						    }
						});

	                }
	                reader.readAsDataURL(el.files[0]);

	            }

	        });


        }

        plugin.init();

    }

    $.fn.formImage = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formImage')) {
                var plugin = new $.formImage(this, options);
                $(this).data('formImage', plugin);
            }
        });

    }

})(jQuery);