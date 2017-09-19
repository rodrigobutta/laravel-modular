<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

class Section extends Model
{

    protected $table = 'sections';
    public $timestamps = false;

  public function type(){
    return $this->belongsTo(SectionType::class, 'section_type_id');
  }

  public function content(){
    return $this->belongsTo(SectionContent::class, 'section_content_id');
  }

	public function grid(){
        return $this->belongsTo(Page::class, 'grid_id');
   	}

   	// obtener html full del section (con contenidos reemplazados por los valores y con el scope del grid mismo)
    // si el parametro edit es true, agrega al html los tags con propiedades fieldset y demas que luego usan el javascript de live.blade
   	public function getHtml($edit=false, $no_wapper=false){

   		// html final con los divs del grid y los contenidos dentro
   		$html = $this->type->getContainerHtml($edit,$no_wapper);
   		$html = str_replace('%anchor%', $this->anchor, $html);

   		// la definicion de los campos en el type
   		$fields_definition = json_decode($this->content->fields);

   		// los datos guardados para ese section
   		$fields_data = json_decode($this->data);

   		// contenidos original del template con el reemplazo de cada dato
   		$contents = $this->content->template;

   		// si hay datos cargados, reemplazo los keys en el template
   		if(is_object($fields_data)){
	   		foreach ($fields_data as $key => $value) {

	   			$key_replace_hash = '[[' . $key . ']]';

	   			// primero busco la definicion para ese campo que estoy por imprimir, para saber si necesita un preproceso
	   			if(is_array($fields_definition)){
					if(list($k,$obj) = findObjectInArrayByProperty($fields_definition,'name', $key)){

				   		if($obj->type=="image"){
				   			$recipe = ($obj->recipe)? $obj->recipe : 'listingMedia';

				   			// si no tengo imagen a cargar porque hice clear en form o lo que sea, no proceso para que no aparezca default
				   			if($value!=''){
				   				$img_path = Resize::img($value,$recipe);
				   			}
				   			else{
				   				$img_path = "";
				   			}
				   			$contents = str_replace($key_replace_hash, $img_path, $contents);

				   		}
				   		else{
                            // texto GENERAL

                  $value = html_entity_decode($value); // tengo que decodificar los &acute y similares guardados dentro del json data en la base de datos
				   			  $contents = str_replace($key_replace_hash, $value, $contents);

              }

					}
		   		}
		   		else{
					//si no existe definicion de campos es porque algo anda mal
			   		$contents = str_replace($key_replace_hash, 'ERR:NO_FIELD_DEFINITIONS', $contents);
		   		}

	   		}

	   		if($edit){
                $this->data = html_entity_decode($this->data); // tengo que decodificar los &acute y similares guardados dentro del json data en la base de datos
	   			$contents .= "<section_data>" . htmlspecialchars($this->data) . "</section_data>";
	   		}

   		}


   		if($edit){
   			$contents .= "<section_properties anchor=\"".$this->anchor."\" type-class=\"".$this->type->class."\" type-title=\"".$this->type->title."\" type-id=\"".$this->type->id."\" content-class=\"".$this->content->class."\" content-title=\"".$this->content->title."\" content-id=\"".$this->content->id."\"></section_properties>";
   			$contents .= "<section_fields>".$this->content->fields."</section_fields>";
   		}


   		// en el bloque del grid, reemplazo los contenidos por lo resuelto recien
   		$html = str_replace('%contents%', $contents, $html);

   		// // TODO TMP por el momento el posible segundo bloque va a tener los mismos contenidos que el primero
   		// $html = str_replace('%contents2%', $contents, $html);
      

      /*
        EK: me fijo si me quedo algun tag colgado sin reemplazar y lo borro      
       */ 
      $tag_pattern = '/(\[){2}(.*)(\]){2}/';
      $html = preg_replace($tag_pattern, '', $html);

      
		return $html;
   }

}

