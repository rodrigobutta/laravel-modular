<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Models\Grid;
use App\Models\Section;
use App\Models\SectionType;
use App\Models\SectionContent;

use App\Models\Task;

use App\Http\Requests\Admin\GridRequest;
use App\Repository\GridRepositoryInterface;


class GridController extends Controller
{


    public function __construct(GridRepositoryInterface $gr){
        $this->gridRepository = $gr;
    }



    public function getIndex(Request $request){

        $title = sprintf('List of %s grids', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('admin.grid.index', compact('title', 'type'));
    }

    public function getData(Request $request){

        $grids = Grid::select([
            'grids.id',
            'grids.title',
            'grids.created_at',
            'grids.updated_at',
            'grids.id',
            'users.fullname as user_fullname',
            'profiles.title as profile_name'
        ])
        ->leftJoin('users', 'users.id', '=', 'grids.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'grids.profile_id')
        ->where('shared', 1);

        $datatables = app('datatables')->of($grids);

        $datatables->addColumn('actions', function ($item) {
            return iView('admin.grid.item-actions-small', compact('item'))->render();
        });

        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->editColumn('title', '{!! str_limit($title, 60) !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);

    }

    public function live($id){

        $item = Grid::whereId($id)->with('user')->firstOrFail();

        $section_types = SectionType::all();

        $title = t('Live');

        // si es grilla de un tasko, intento ponerle el fixed cover para que se vea mas real
        $task = Task::where('grid_id', $item->id)->first();

        // \Debugbar::error('Error!');

        return iView('admin.grid.live', compact('item', 'title', 'section_types', 'task'));
    }


    public function patchLive($id, Request $request){

        $grid = Grid::whereId($id)->firstOrFail();


        // SALVADO DE CAMPOS ESTATICOS (como el titulo de cover del tasko)

        $statics = (array) $request->get('statics');
        $statics = convertArrayToObjectArray($statics);

        // primero tengo que asegurarme que tengo un tasko asociado, caso contrario, no es GRILLA DE PRODUCTO
        $task = Task::where('grid_id', $grid->id)->first();
        if($task){

            $reach_subobjects = []; // flag que indica si ha bia un campo compuesto por ej info>cover_title para que luego despues el info tenga su save
            foreach ($statics as $static) {
                // var_dump( $task{"info"}{"cover_title"} );

                $parts = explode('>', $static->field);
                if(sizeof($parts)==1){
                    $task{$parts[0]} = $static->value;
                }
                else if(sizeof($parts)==2){
                    array_push($reach_subobjects, $parts[0]);
                    $task{$parts[0]}{$parts[1]} = $static->value;
                }

            }

            // si hay campos que llegaron para cambiar, entro en logica de saves
            if(sizeof($statics)>0){

                // si hay elementos en el array quiere decir que hubo objetos derivados, por ej un Producr -> Info, elimino duplicados por distintos campos de mismo objeto y salvo
                $reach_subobjects = array_unique($reach_subobjects);
                foreach ($reach_subobjects as $subobject) {
                    $task{$subobject}->save();
                }

                $task->save();

            }

        }

        // SALVADO DE GRILLAS

        $items = (array) $request->get('items');
        $items = convertArrayToObjectArray($items);

        $sections_arr = [];
        foreach ($items as $key => $i) {

            $it = new Section();
            $it->order = $key;

            if(!isset($i->data)){
                $it->data = "";
            }
            else{
                $it->data = htmlspecialchars_decode($i->data); // el encode está en el Model Section
            }

            $it->anchor = $i->anchor;

            // $it->type()->associate($i->type); // le indico al section del type es
            $it->section_type_id = $i->type; // le indico al section del type es
            $it->section_content_id = $i->content; // le indico al section del type es

            array_push($sections_arr, $it);

        }

        $grid->sections()->delete();
        $grid->sections()->saveMany($sections_arr);

        echo 'Grid saved';
    }



    // CREO que no lo uso mas porque ahora genero section con los valores del form aunque n salvo
    // public function getSectionTypeHtml(Request $request){
    //     $id = $request->get('id');
    //     $html = Section::getBlank($id); // volar el blank
    //     return $html;
    // }



    // para dialogo de live nuevo bloque
    public function getSectionTypeContents(Request $request){

        $type_id = $request->get('id');

        $el = SectionType::find($type_id);

        $arr_contents = [];
        foreach ($el->contents as $c) {

            $item = new \stdClass();
            $item->id = $c->id;
            $item->title = $c->title;
            $item->image = Resize::img($c->main_image,'listingMedia');

            array_push($arr_contents, $item);
        }

        $response = new \stdClass();
        $response->items = $arr_contents;

        return new JsonResponse($response, 200);
    }

    // para dialogo de live nuevo bloque
    public function getSectionContentFields(Request $request){

        $id = $request->get('id');

        $el = SectionContent::find($id);

        $response = new \stdClass();
        $response->fields = json_decode($el->fields);

        return new JsonResponse($response, 200);
    }



    public function parseSection(Request $request){

        // creo un nuevo section para trabajarlo aunque no lo guardo nunca
        $el = new Section();

        $el->anchor = $request->get('anchor');

        $content_id = $request->get('content_id');
        $content_el = SectionContent::find($content_id);
        $el->content()->associate($content_el);

        $type_id = $request->get('type_id');
        $type_el = SectionType::find($type_id);
        $el->type()->associate($type_el);




        // genero objeto json con el data que viene del form que asigno al section creado
        $data = new \stdClass();
        foreach ($request->all() as $field => $value) {

            // var_dump('00000');
            // var_dump($value);

            if(    $field!='anchor'
                    && $field!='type_id'
                    && $field!='content_id')
            {

                $data->{$field} = $value;

            }
        }

        // var_dump('1111111111111111111111');
        // var_dump($data);

        $el->data = json_encode($data);

        // var_dump('2222222222222222222');
        // var_dump($data);


        // var_dump($el->data);

        // retorno el html del section entero y pongo true en parametro para que me agregue tags de <section_data y <section_fields
        $html = $el->getHtml(true);


        // var_dump('5555555555555');
        // var_dump($html);

        // $html = str_replace('%anchor%', $el->anchor, $html);
        // $html = str_replace('%data%', $data, $html);

        return $html;
    }


    public function edit($id){

        $item = Grid::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit') . ' ' . $item->title;

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.grid.edit', compact('item', 'title', 'profiles'));
    }


    public function patch(GridRequest $request){

        $item = Grid::whereId($request->route('id'))->firstOrFail();

        $item->title = $request->get('title');

        $item->profile()->associate($request->get('profile'));

        $item->save();

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }


    public function create(){

        $title = 'Creating new grid';

        return iView('admin.grid.create', compact('title'));
    }


    public function put(Request $request){

        $item = new Grid();
        $item->title = $request->get('title');
        $item->shared = true;

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        return redirect()->route('admin.grids.edit', ['id' => $item->id])->with('flashSuccess', 'Grid is now crated');
    }


    public function delete($id, Request $request){

        if($this->gridRepository->delete($id)){
           $response = 'Element deleted';
        }
        else{
           $response = 'Error deleting item';
        }

        if ($request->ajax() || $request->wantsJson()) {
           return new JsonResponse($response, 200);
        }
        else{
           return redirect()->back()->with('flashSuccess', $response);
        }

    }


    public function doClone($id){

        $source_grid = Grid::findOrFail($id);

        $grid = $source_grid->replicate();
        $grid->title = $grid->title . ' (clon)';
        $grid->push();

        // replico todos los sections atachados a ese grid
        foreach($source_grid->sections as $s){
            $section = $s->replicate();
            $section->grid()->associate($grid->id);
            $section->push();
        }

        $title = t('Edit the Clone');

        // return iView('admin.grid.edit', compact('grid', 'title'));
        return redirect()->route('admin.grids.edit',['id' => $grid->id])->with('flashSuccess', 'Clonado');
    }


    public function search(Request $request){

        $term = $request->get('term');

        // $items = Media::all();
        $items = $this->gridRepository->search($term);


        $res =  [];
        $ix=0;
        foreach ($items as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['text'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            // $res[$ix]['slug'] = $p->slug;
            // $res[$ix]['image'] = Resize::img($p->thumbnail, 'listingMedia');
            $ix++;
        }

        return json_encode($res);
    }


}
