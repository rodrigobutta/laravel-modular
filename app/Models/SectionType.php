<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SectionType extends Profiled
{
	use SoftDeletes;

    protected $table = 'section_types';

    protected $softDelete = true;

    protected $casts = [
        'fullscreen' => 'boolean',
        'absolute' => 'boolean',
        'right' => 'boolean',
        'group' => 'boolean'
    ];

    public function contents(){
        return $this->belongsToMany('App\Models\SectionContent', 'section_type_x_section_content', 'section_type_id', 'section_content_id')->orderBy('order', 'asc')->withPivot('order');
    }

   	public static function getHtmlById($id){
   		$type = SectionType::find($id);
		return $type->getContainerHtml();
   	}

   	public function getContainerHtml($edit=false, $no_wapper=false){

   		$html = "";

		$class = "width_" . $this->width . " height_" . $this->height;

		if($no_wapper) {
			$html = "%contents%";
			return $html;
		}

		if($this->group){

			$html .= "<li data-inner-id=\"%anchor%\" class=\"section group " . $this->class . "\">";
			// $html .= "<span class=\"heighter $class \"></span>";
			$html .= "%contents%";
			$html .= "</li>";

		}else{

			$mainclass = '';
			$heighter = '';
			if($this->fullscreen){
				$mainclass = 'full';
			}else if($this->absolute){
				$heighter = "<span class=\"heighter $class \"></span>";
				$mainclass = 'group';
				$class .= " pa";
			}else{
				$mainclass = 'wp';
			}

			if($this->right){
				$class .= " fr";
			}

			$html .= "<li class=\"section $mainclass " . $this->class . "\">";
            $html .= $heighter;
			$html .= "<article id=\"%anchor%\" class=\"$class vhcenter\">%contents%</article>";
			$html .= "</li>";

		}

		return $html;
   	}

}
