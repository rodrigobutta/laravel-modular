@extends('admin.master.plain')

@section('head')

	@if(env('APP_DEBUG'))
        {{--  {!! HTML::style('public/css/vendor.css') !!}  --}}
        {!! HTML::style('public/css/app.css') !!}
        {{--  {!! HTML::script('public/js/vendor.js') !!}  --}}
        {{--  {!! HTML::script('public/js/app.js') !!}  --}}
    @else
        {{--  {!! HTML::style('public/build/vendor.min.css') !!}  --}}
        {!! HTML::style('public/build/app.min.css') !!}
        {{--  {!! HTML::script('public/build/vendor.min.js') !!}  --}}
        {{--  {!! HTML::script('public/build/app.min.js') !!}  --}}
    @endif




	{{-- GRID STYLES FRONT --}}
	{{--  {!! HTML::style('public/admin/css/tmp/_section_types.css') !!}  --}}

	{{-- GRID STYLES BACK --}}
	{!! HTML::style('public/admin/css/grids.css') !!}



	{!! HTML::script('resources/assets/vendor/Sortable/Sortable.min.js') !!}

	{!! HTML::style('resources/assets/vendor/froala-wysiwyg-editor/css/froala_editor.min.css') !!}
	{!! HTML::style('resources/assets/vendor/froala-wysiwyg-editor/css/froala_style.min.css') !!}
	{!! HTML::style('resources/assets/vendor/froala-wysiwyg-editor/css/plugins/colors.min.css') !!}

	{!! HTML::script('resources/assets/vendor/froala-wysiwyg-editor/js/froala_editor.min.js') !!}
	{!! HTML::script('resources/assets/vendor/froala-wysiwyg-editor/js/plugins/colors.min.js') !!}
	{!! HTML::script('resources/assets/vendor/froala-wysiwyg-editor/js/plugins/font_size.min.js') !!}
	{!! HTML::script('resources/assets/vendor/froala-wysiwyg-editor/js/plugins/link.min.js') !!}


	{!! HTML::script('resources/assets/vendor/he/he.js') !!}


	{{-- se usa para encriptar los jason values --}}
	{!! HTML::script('public/admin/plugins/aes.js') !!}


	{!! HTML::script('public/components/inlineImage.jquery.js') !!}






@endsection

@section('content')

<div class="intranet-spacer intranet-spacer-md"></div>

<div class="live-container">

	<section id="toolbar" class="admin">
		<button type="button" id="btn_add" class="btn btn-default"><i class="fa fa-plus"></i>&nbsp;{{t('Add')}} {{t('Block')}}</button>

		<button type="button" id="zoom" class="btn btn-default">
			<i class="fa fa-search-plus hidden" aria-hidden="true"></i>
			<i class="fa fa-search-minus" aria-hidden="true"></i>
		</button>

		<button type="button" id="btn_close" class="btn btn-default pull-right"><i class="fa fa-power-off"></i>&nbsp;{{t('Close')}}</button>
		<button type="button" id="btn_submit" class="btn btn-primary pull-right hidden"><i class="fa fa-save"></i>&nbsp;{{t('Save')}}</button>
	</section>

	<section class="module">
		<ul id="sections" data-editable data-name="sections-content">

			@foreach($item->sections as $section)
				{!! $section->getHtml(true) !!}
			@endforeach
		</ul>
	</section>

  	<div id="modal_sector" class="admin modal fade" role="dialog">
	    {!! Form::open(['method' => 'PATCH', 'files' => true, 'id' => 'form_add']) !!}
	      <div class="modal-dialog">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal">&times;</button>
	            <h4 class="modal-title">Nuevo modulo</h4>
	          </div>
	          <div class="modal-body">
	          	<img class="loader" src="{{asset('public/admin/img/loading.gif')}}"/>
	            <p class="modal-tip">Seleccione el tipo de modulo que quiere agregar</p>
	            <div id="section_type">
		            <select id="sel_section_type" title="Tipo" class="selectpicker bootstrap-select">
					 	<option>{{t('Select')}}..</option>
						@foreach($section_types as $t)
							<option data-thumbnail="{{ Resize::img($t->main_image,'listingMedia') }}" value="{{ $t->id }}">{{ $t->title }}</option>
						@endforeach
					</select>
				</div>
	            <div id="section_content">
		            <select id="sel_section_content" title="Contenido" class="selectpicker bootstrap-select">
					</select>
				</div>
				<div id="section_static_fields">
					<div class="form-group">
						<label for="anchor">Identificador</label>
						<small>Usado para ser linkeado por el menú superior. Para editar dichos links ir a la edición del tasko bajo el segmento "Links"</small>
						<input type="text" class="form-control" name="anchor" placeholder="Identificador" value="">
					</div>
				</div>
				<ul id="section_dynamic_fields">
				</ul>
	          </div>
	          <div class="modal-footer">
	          	<input  type="hidden" id="object_type_id" value="">
	          	<input  type="hidden" id="object_content_id" value="">
	          	<button type="button" class="btn btn-primary" role="add">Aceptar</button>
	          	<button type="button" class="btn btn-primary" role="update">Aceptar</button>
	            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          </div>
	        </div>
	      </div>
	     {!! Form::close() !!}
    </div>

	<script id="template_input_type_image" type="x-tmpl-mustache">
		<div class="form-group">
            <label for="@{{name}}">@{{title}}</label>
            <input name="@{{name}}" type="hidden" class="image-field value field" value="@{{value}}" data-preview-recipe="featuredMedia">
        </div>
	</script>

	<script id="template_input_type_text" type="x-tmpl-mustache">
		<div class="form-group">
			<label for="@{{name}}">@{{title}}</label>
			<input type="text" class="field form-control" name="@{{name}}" placeholder="@{{title}}" value="@{{value}}"/>
		</div>
	</script>

	<script id="template_input_type_textarea" type="x-tmpl-mustache">
		<div class="form-group">
			<label for="@{{name}}">@{{title}}</label>
			<textarea name="@{{name}}" id="@{{name}}" class="field">@{{value}}</textarea>
		</div>
	</script>

	<script id="template_input_type_link" type="x-tmpl-mustache">
		<div class="form-group">
			<label for="@{{name}}">@{{title}}</label>
			<input type="hidden" class="field" name="@{{name}}" placeholder="@{{title}}" value="@{{value}}">
		</div>
	</script>

	<script id="template_section_tools" type="x-tmpl-mustache">
		<div class="tools">
			<div class="label-section-type"><strong>@{{section_anchor}}</strong> (<span>@{{section_type_title}}</span> {{t('with')}} <span>@{{section_content_title}}</span>)</div>
			<div class="tool handler"><i class="fa fa-arrows-alt"></i></div>
			<div class="tool delete"><i class="fa fa-trash"></i></div>
			<div class="tool clone"><i class="fa fa-copy"></i></div>
			<div class="tool edit"><i class="fa fa-pencil"></i></div>
		</div>
	</script>

</div>

@endsection

@section('extra-js')

   <script type="text/javascript">

   		var is_dirty = false;
		var sortable;
		var modal_on = false;

		CKEDITOR.dtd.$removeEmpty['span'] = false;

		// flag para saber que algo fue modificado y advertir si quiere salir sin guardar cambios
		function dirty(){
			$('#btn_submit').removeClass('hidden');
			is_dirty=true;
		}

		function window_close(){
			window.close();
		}

		window.onload = function() {

		    window.addEventListener("beforeunload", function (e) {
		        if (!is_dirty) {
		            return undefined;
		        }
		        var confirmationMessage = '{{t('Exit without saving changes?')}}';
		        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
		        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
		    });

		};


		$(document).ready(function() {

			// bind del live del cover (fuera del scope del grid)
			$('.live-html').froalaEditor({
				toolbarInline: true,
				pastePlain: true,
				enter: $.FroalaEditor.ENTER_BR,
				charCounterCount: false,
				placeholderText: '[sin texto]',
				// toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color' , 'subscript', 'superscript', '-', 'fontFamily', 'fontSize', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertLink', 'undo', 'redo', 'html', 'removeFormat', 'createLink', 'selectAll', 'formatBlock'],
				// colorsBackground: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE']
			}).on('froalaEditor.contentChanged', function (e, editor) {
				$(this).find('.static-field').addClass('dirty');
				dirty();
			});

			// $('.live-html').froalaEditor('events.on', 'keydown', (e) => {
			// 	if (e.which == "13" || e. which == "10") {
			// 	  	e.preventDefault();
			// 	    e.stopPropagation();
			// 	    e.stopImmediatePropagation();
			// 	    // document.execCommand('insertHTML', false, '<br>');
			// 	    return false;
			//   	}
			// }, true);

			$('.live-image').inlineImage({
			    ajax: {
			        url: '{{ route('admin.media.bulkupload') }}',
			        archive: 'tasks',
			        fugitive: false
			    },
			    recipe: 'mainTask'
			});

			// cancelar links de contenidos para evitar que al intentar editar algo, se vaya al link en vez de abrir dialogo admin
			$("#sections").on('click','article > a',function(e){
				e.preventDefault();
			})

			$("#toolbar").draggable({
				// handle: "h1",
				containment: 'window',
    			scroll: false
			});

			$('button#btn_add').on('click',function(){
				clear_section_form();
				$('#modal_sector button[role="add"]').show();
				$('#modal_sector button[role="update"]').hide();
				$("#section_type").show();
				$("#modal_sector .modal-title").html("{{t('New')}}");
				$("#modal_sector .modal-tip").show();

				modal_show();
			});

			$('button#btn_submit').on('click',function(){
				save_grid();
			});


			$('button#zoom').on('click',function(e){
				$('section.module').toggleClass('zoom');
				$(this).find('i').toggleClass('hidden');
			});

			$('button#btn_close').on('click',function(){
				window_close();
			});

			$('button[role="add"]').on('click',function(){
				var type_id = $('#sel_section_type').val();
				var content_id = $('#sel_section_content').val();
				var anchor = $('input[name="anchor"]').val();
				parse_section(true, type_id, content_id, anchor);
				modal_hide();
			});

			$('button[role="update"]').on('click',function(){
				var type_id = $('#modal_sector #object_type_id').val();
				var content_id = $('#modal_sector #object_content_id').val();
				var anchor = $('input[name="anchor"]').val();
				parse_section(false, type_id, content_id, anchor);
				modal_hide();
			});

			$('#sel_section_type').on('change',function(){
				var id = $(this).val();

				$('.modal-body').addClass('loading');

				$.ajax({
	                type: "GET",
	                url: "{{ route('admin.sectiontypes.getcontents') }}",
	                data: {
	                    id: id
	                },
	                globalLoading: true,
	                success : function (response){
	                	$('.modal-body').removeClass('loading');

	                	clear_section_form();

	                	$("#sel_section_content").empty().append("<option>{{t('Select')}}..</option>");

	                	// populo el select encadenado
	                	for (i = 0; i < response.items.length; i++) {
	                	    $("#sel_section_content").append('<option data-thumbnail="'+response.items[i].image+'" value="'+response.items[i].id+'">'+response.items[i].title+'</option>');
	                	}

	                	$('#sel_section_content').selectpicker('refresh');

	                	if(response.items.length>0){
	                		$('#section_content').show();
	                	}
	                	else{
	                		toastr["error"]('No se encontraron tipos de contenido para este bloque');
	                		$('#section_content').hide();
	                	}


	                },
	                error : function (response){
	                	$('.modal-body').removeClass('loading');
	                    toastr["error"](response);
	                    console.log(response);
	                }
	            });

			});

			$('#sel_section_content').on('change',function(){
				var id = $(this).val();

				$('.modal-body').addClass('loading');

				$.ajax({
	                type: "GET",
	                url: "{{ route('admin.sectioncontent.getfields') }}",
	                data: {
	                    id: id
	                },
	                globalLoading: true,
	                success : function (response){
	                	$('.modal-body').removeClass('loading');

	                    print_section_form(response.fields);
						binds();

	                },
	                error : function (response){
	                	$('.modal-body').removeClass('loading');
	                    toastr["error"](response);
	                    console.log(response);
	                }
	            });

			});



			binds();

	    });

		function edit_section(el){

			var type_id = el.find('section_properties').attr("type-id");
			var content_id = el.find('section_properties').attr("content-id");
			var anchor = el.find('section_properties').attr("anchor");

			$('#modal_sector #object_type_id').val(type_id);
			$('#modal_sector #object_content_id').val(content_id);

            $('input[name="anchor"]').val(anchor);

			var fields = [];
			if(typeof el.find('section_fields').html() !== 'undefined' && el.find('section_fields').html()!=''){
				fields = JSON.parse(el.find('section_fields').html());
			}

			var values = [];
			if(typeof el.find('section_data').html() !== 'undefined' && el.find('section_data').html()!=''){
				values = JSON.parse(el.find('section_data').html());
			}

			$("#section_type").hide();
			$('#modal_sector button[role="add"]').hide();
			$('#modal_sector button[role="update"]').show();

            print_section_form(fields,values);

            $("#modal_sector .modal-title").html("{{t('Update')}}");
            $("#modal_sector .modal-tip").hide();
            $("#modal_sector .modal-title");

            modal_show(true);
		}

		function modal_show(editing=false){

			$('#modal_sector').on('shown.bs.modal', function () {
				$('#modal_sector').off('shown.bs.modal');

				if(editing){
					$('input[name="anchor"]').focus();
					$('#section_dynamic_fields .field').first().focus();
				}
				else{
					$('#sel_section_type').focus();
				}


			})

			modal_on = true;

			$('#modal_sector').modal({ backdrop: 'static', keyboard: true });

			$('#modal_sector .modal-body').on('keypress',function(e){
			   if(e.which == 13) {

		   		if($('#modal_sector button[role="update"]').is(':visible') ){
		   			$('#modal_sector button[role="update"]').trigger('click');
		   		}
		   		else if($('#modal_sector button[role="add"]').is(':visible') ){
		   			$('#modal_sector button[role="add"]').trigger('click');
		   		}

			   }
			 })

		}

		function modal_hide(){
			modal_on = false;
			$('#modal_sector .modal-body').off('keypress');
			$("#modal_sector").modal("hide");
		}

		function clear_section_form(){
			$("#section_dynamic_fields").empty();
			$("#section_static_fields").hide();
		}

		function print_section_form(fields, values){
            clear_section_form();

            $("#section_static_fields").show();

            jQuery.each(fields, function(i, e) {
            	// console.log(e);

            	var value = '';
            	if(typeof values !== 'undefined'){
            		if(values[e.name]){
            			value = values[e.name];
            		}
            	}

            	// en base al tipo de campo definido en el json fields, imprimo dinamicamente los campos

				if(e.type=='image'){

					$("#section_dynamic_fields").append(
						Mustache.render(
							$('#template_input_type_image').html(),{
								name: e.name,
								title: e.title,
								value: value
							}
						)
					);

					$('input[name="'+e.name+'"]').formImage({
		                ajax: {
		                    url: '{{ route('admin.media.bulkupload') }}',
		                    archive: 'media',
		                    fugitive: true
		                },
		                preview: {
		                    path: '{{URL::to('/')}}/image/{name}/{recipe}'
		                },
		            });

				}
				else if(e.type=='text'){

					$("#section_dynamic_fields").append(
						Mustache.render(
							$('#template_input_type_text').html(),{
								name: e.name,
								title: e.title,
								value: value
							}
						)
					);

				}
				else if(e.type=='html'){

					$("#section_dynamic_fields").append(
						Mustache.render(
							$('#template_input_type_textarea').html(),{
								name: e.name,
								title: e.title,
								value: $("<div/>").html(value).text()
							}
						)
					);

					$('textarea[name="'+e.name+'"]').formHtml();

				}
				else if(e.type=='link'){

					$("#section_dynamic_fields").append(
						Mustache.render(
							$('#template_input_type_link').html(),{
								name: e.name,
								title: e.title,
								value: value
							}
						)
					);

					$('input[name="'+e.name+'"]').formLink({
						placeholder: 'http://',
		                search: {
		                	placeholder: '{{t('Search..')}}',
		                    url: '{{ route('admin.service.search') }}'
		                }
		            });

				}

			});


		}

		function binds(){

			// agrgo barra de herramientas en todos los bloques de grid
    		$('#sections li.section:not(.no-live)').each(function(){

    			var properties = $(this).find('section_properties');

    			// si ya tenia el tools agregado, no hago nada
    			if($(this).find('.tools').length==0){

	            	$(this).find('article:first').append(
						Mustache.render(
							$('#template_section_tools').html(),{
								section_type_title: properties.attr('type-title'),
								section_content_title: properties.attr('content-title'),
								section_anchor: properties.attr('anchor')
							}
						)
					);

	            }

            })

    		// herramientas: boton de eliminar bloque
			$('.tool.delete').off('mouseup').on('mouseup',function(e) {

				var el = $(this).closest('.section');

			    BootstrapDialog.show({
			    	type: BootstrapDialog.TYPE_DANGER,
			    	title: '{{t('Delete')}}',
			        message: '{{t('Are you sure you want to delete the element?')}}',
			        buttons: [{
			            label: '{{t('Confirm')}}',
			            cssClass: 'btn-danger',
			            action: function(dlg){
			            	dlg.close();
			            	el.fadeOut(function(){
			            		el.remove();
			            		dirty();
			            	});
			            }
			        }, {
			            label: '{{t('Cancel')}}',
			            cssClass: 'btn-default',
			            action: function(dlg){
			                dlg.close();
			            }
			        }]
			    });

			});

			// herramientas: boton de clonar bloque (crea una copia del mismo inmediatamente despues)
			$('.tool.clone').off('mouseup').on('mouseup',function(e) {
				if(e.button==2) return false;

				var $el = $(this).closest('.section');
				var $clone = $el.clone(false);
					// $clone.attr('data-id','-1');
					$el.after($clone);
					$el.removeClass('selected');

				binds();

				dirty();

			});

			// herramientas: boton que abre el dialogo para ese bloque
			$('.tool.edit').off('mouseup').on('mouseup',function(e) {
				if(e.button==2) return false;
				var $el = $(this).closest('.section');
				edit_section($el);
			});

			// seleccion de bloque y open de dialog
			$('.section').off('mousedown').on('mousedown',function() {
				$('.section').removeClass('selected');
				$(this).addClass('selected');
			}).off('dblclick').on('dblclick',function() {
				$(this).find('.tool.edit').trigger('mouseup');
			});

			// hago sorteables los bloques del grid, y en cada sort, marco is_dirty
			var el = document.getElementById('sections');
  			sortable = new Sortable(el, {
			    delay: 0,
			    disabled: false,
			    animation: 150,
			    handle: ".handler",
			    draggable: ".section",
			    ghostClass: "sortable-ghost",
			    chosenClass: "sortable-chosen",
			    dragClass: "sortable-drag",
			    dataIdAttr: 'data-id',
			    onEnd: function (evt) {
			    	dirty();
			    },
			});

  			// ### edicion inline de textos en los bloques
  			// los campos dentro de los bloques que tengan el atributo live-field se van a convertir en inline edit actualizando luego el section_data. Este atriburo se defne en el template del sectioj typr

  			// $('li.section:not(.no-live) .contents').froalaEditor('destroy');
  			// $('li.section:not(.no-live) .contents').froalaEditor({
  			// 	toolbarInline: true,
  			// 	pastePlain: true,
  			// 	enter: $.FroalaEditor.ENTER_BR,
  			// 	charCounterCount: false,
  			// //	toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo', 'redo']
  			// }).on('froalaEditor.contentChanged', function (e, editor) {
  			// 	console.log('froalaEditor.contentChanged');

  			// 	var section_data = $(this).closest('article').find('section_data');

  			// 	if(typeof section_data.text() !== 'undefined' && section_data.text()!=''){
  			// 		// *** uso text() en vez de html() en todo el bloque para que no quiera parsearme el html.

  			// 		// retrieve del campo que esto editando para actualizarlo en el json del section_data
  			// 		var field = $(this).closest('.fr-inline').attr('live-field');

  			// 		// convierto el string en objeto para poder reemplazar el campo que corresponda y vuelvo a convertirlo a json string
  			// 		var data = JSON.parse(section_data.text());
  			// 			data[field] = editor.html.get(); // reemplazo valor por el valor modificado del Froala editor
	  		// 			data = JSON.stringify(data);

  			// 		section_data.text(data);
  			// 	}

  			// 	dirty();

  			// });


		}


        function save_grid(){

        	// proceso los grids
         	var items = [];
            $('#sections li.section:not(.no-live)').each(function(){

            	var properties = $(this).find('section_properties');
            	var data = $(this).find('section_data').html();

                item = {};
                item.id = $(this).data('id');
                // item.type = $(this).data('type');
				item.data = data;

				item.anchor = properties.attr("anchor");
				item.type = properties.attr("type-id");
				item.content = properties.attr("content-id");

                items.push(item);
            });

            // recupero campos estaticos para mandarlos aparte de los grids
         	var statics = [];
            $('.static-field.dirty').each(function(){
                item = {};
                item.field = $(this).data('field');

                // si tiene data-value es que es una imagen o algo cuyo contenido no esta dentor dle html como un textarea
                var attr = $(this).attr('data-value');
                if (typeof attr !== typeof undefined && attr !== false) {
                    item.value = $(this).attr('data-value');
                }
                else{
                	item.value = $(this).html();
                }

                statics.push(item);
            });

            var data = {};
            	data.items = items;
            	data.statics = statics;

            $.ajax({
                type: "PATCH",
                url: "{{ route('admin.grids.live', ['id' => $item->id]) }}",
                data: data,
                globalLoading: true,
                success : function (response){
                    // console.log('success');
                    // console.log(response);
                    toastr["success"](response);
                    $("#items").fadeTo("fast" ,1);
                    is_dirty=false;
                    $('#btn_submit').addClass('hidden');
                },
                error : function (response){
                    // console.log('error');
                    toastr["error"](response);
                    // console.log(response);
                }
            });

        }

        // cada vez que se acepte el dialogo de propiedades de un bloque (ya sea por nuevo bloque o por editar actual, se envian los datos al modelo y el modelo devuelve el html decodificado)
        function parse_section(is_insert, type_id, content_id, anchor){

        	console.log('parse_section ' + is_insert + ', '+ type_id + ', '+ content_id );

         	var data = new FormData();
			$('.field').each(function() { // $('input[name^="field"]').each(function() {
			    data.append(this.name, this.value);
			});
			data.append('type_id', type_id);
			data.append('content_id', content_id);
			data.append('anchor', anchor);

			$.ajax({
                type: "POST",
                url: "{{ route('admin.section.parse') }}",
                data: data,
				cache: false,
				contentType: false,
				processData: false,
                globalLoading: true,
                success : function (response){
                    dirty();

                    var new_el = $(response);
                    // new_el.attr('added',''); // deprecado porque ya se envia y remueve todo en cada save

                    // si es elemento nuevo o edicion de existente
                    if(is_insert){

                    	// si habia elemento seleccionado, lo inserto despues del mismo, caso contrario va al final de todo
	                    if ($('.section.selected').length){
							$('.section.selected').after(new_el);
	                    }
	                    else{
							$('#sections').append(new_el);
	                    }

                    }
                    else{

                	    var el = $('.section.selected');
                	    	el.replaceWith(new_el);

                	    new_el.addClass('highlighted');
                		setTimeout(function() {
                			new_el.removeClass('highlighted');
                		}, 300);

                    }

                    binds();

                },
                error : function (response){
                    console.log('error');
                    toastr["error"](response);
                    console.log(response);
                }
            });

        }

        $('.live-container a').on('click', function(e){
        	e.preventDefault();
        });

    </script>

@endsection