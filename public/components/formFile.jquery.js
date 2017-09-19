(function($) {

    $.formFile = function(element, options) {

        var defaults = {
            name: null,
            value: null,
			ajax: {
				url: null,
				archive: 'documents'
			},
            button: {
                open: {
                    title: 'Seleccionar desde su computadora'
                },
                clear: {
                    title: 'Eliminar archivo'
                }
            },
			maxSize: 5242880,
			acceptedExt: null, //comma separated string
			success: 'El archivo se subió correctamente.',
			failSize: 'El archivo seleccionado es demasiado grande.',
			failExt: 'El tipo de archivo seleccionado no está soportado',
			failSave: 'El archivo no pudo guardarse correctamente.',
			placeholder: 'Suba un archivo...'
        }

        var plugin = this;
        	plugin.settings = {}

        var $element = $(element),
            element = element;

		var $plugin_container = null;
		var $input_display = null;
        var $button_open = null;
        var $button_clear = null;
        var $file_input = null;
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


			$plugin_container = $("<div/>", {
			    class: 'form-input-file'
			}).insertAfter($element);

			$input_display = $("<div/>", {
			    class: 'form-input-file-display',
			    placeholder: plugin.settings.placeholder
			}).appendTo($plugin_container);

			$button_container = $("<div/>", {
			    class: 'form-input-file-button-container'
			}).appendTo($plugin_container);

			$button_clear = $("<button/>", {
				type: 'button',
				class: 'btn btn-danger form-input-file-btn form-input-file-btn-clear btn-sm',
			    html: '<i class="fa fa-close"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.clear.title
			}).appendTo($button_container);

			$button_open = $("<button/>", {
				type: 'button',
				class: 'btn btn-success form-input-file-btn form-input-file-btn-open btn-sm',
			    html: '<i class="fa fa-folder-open"></i>',
                'data-toggle':'tooltip',
                'title': plugin.settings.button.open.title
			}).appendTo($button_container);


			$loading_frame = $("<span/>", {
				class: 'form-input-file-loading',
			    html: '<span class="sr-only">Loading..</span>'
			});


			var file_wrapper = $("<div/>", {
			    class: 'form-input-file-hide'
			}).insertAfter($element);

			$file_input = $("<input/>", {
				type: 'file',
				name: plugin.settings.name + '_file'
			}).appendTo(file_wrapper);

			// $file_input.attr('name',plugin.settings.name);


			$input_display.each(function() {
				if($(element).val() == '') {
					$(this).addClass('empty').text( $(this).attr('placeholder') );
				}
				else {
					$(this).removeClass('empty').text( $(element).val() );
				}
			});

			binds();
        }


        var binds = function() {

			$button_open.click(function(){
				$file_input.trigger('click');
			});

	        $button_clear.on('click',function(){
	            $file_input.val('');
	            $input_display.addClass('empty').text( plugin.settings.placeholder );
	            $element.val('');
	        });

            $input_display.on('click',function(){
                var url = plugin.settings.preview.path;
                url = url.replace("{path}", $(this).text());
                window.open(url);
            });

			$file_input.change(function(){

	            var el = $(this)[0];
	            if (el.files && el.files[0]) {

	            	$loading_frame.appendTo($plugin_container).css('opacity',1);

                    var data = new FormData();
					jQuery.each(el.files, function(i, file) {
					    data.append('file', file);
					});
					data.append('archive', plugin.settings.ajax.archive);
					data.append('maxSize', plugin.settings.maxSize);
					if(plugin.settings.acceptedExt != null) { data.append('acceptedExt', plugin.settings.acceptedExt); }

					jQuery.ajax({
					    url: plugin.settings.ajax.url,
					    data: data,
					    cache: false,
					    contentType: false,
					    processData: false,
					    dataType: 'JSON',
					    type: 'POST'
					}).done(function(data) {
					    $element.val( data.path );

					    switch(data.status) {
					    	case 0: toastr["success"]( plugin.settings.success ); break;
					    	case 1: toastr["error"]( plugin.settings.failExt ); break;
					    	case 2: toastr["error"]( plugin.settings.failSize ); break;
					    	case 3: toastr["error"]( plugin.settings.failSave ); break;
					    }

					    $input_display.removeClass('empty').text(data.file);

					}).fail(function(data) {
						console.log(data);
					    toastr["error"]( plugin.settings.failSave );

					}).always(function() {
					    $loading_frame.remove();
					});
	            }
	        });
        }

        plugin.init();

    }

    $.fn.formFile = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('formFile')) {
                var plugin = new $.formFile(this, options);
                $(this).data('formFile', plugin);
            }
        });

    }

})(jQuery);
