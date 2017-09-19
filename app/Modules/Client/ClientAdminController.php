<?php
namespace App\Modules\Client;


use App\Modules\Client\ClientModel;
use App\Modules\Client\ClientInfoModel;

use App\Modules\Client\ClientRepositoryInterface;
use App\Modules\Client\ClientAdminRequest;



use Cache;
use Excel;
use App\Helpers\Resize;
use App\Helpers\ResizeHelper;

use App\Models\Profile;
use App\Models\Grid;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;



class ClientAdminController extends Controller{

    public function __construct(ClientRepositoryInterface $p){

        // view()->addNamespace('client', app_path('Modules/client/views/'));

        $this->clientRepository = $p;
    }

    public function getList(Request $request){

        $title = t('List') . sprintf(': %s', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('client::admin.list', compact('title', 'type'));
    }

    public function getData(Request $request){

        $client = ClientModel::select([
            'client.*','users.fullname as user_fullname','profiles.title as profile_name'
            ])
        ->leftJoin('users', 'users.id', '=', 'client.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'client.profile_id')
        ->orderBy('sort');

        // si no es superadmin, filtro el lote por los perfiles que el usuario posea
        if(!auth()->user()->isSuper()){
            $client->whereIn('profile_id', auth()->user()->profiles()->lists('id')); // lo segundo es un array de ids
        }

        switch ($request->get('type')) {
            case 'approved':
                $client->approved(); // es del scopeApproved en el Model
                break;
            case 'approvalRequired':
                $client->whereNull('client.approved_at');
                break;
            default:
                $client->approved();
        }


        $datatables = app('datatables')->of($client);

        if ($request->get('type') == 'approvalRequired') {
            $datatables->addColumn('actions', function ($client) {
                return '
                <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                    <a href="#" class="client-approve btn btn-success" data-approve="' . $client->id . '"><i class="fa fa-check"></i></a>
                    <a href="#" class="client-disapprove btn btn-danger" data-disapprove="' . $client->id . '"><i class="fa fa-times"></i></a>
                </div>';
            });
        } else {
            $datatables->addColumn('actions', function ($client) {
                return '
                <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                    <a href="' . route('client.view', [$client->slug]) . '" class="btn btn-success" target="_blank"><i class="fa fa-eye"></i> '.t('View').'</a>
                    <a href="' . route('admin.client.edit', [$client->id]) . '" class="btn btn-primary"><i class="fa fa-edit"></i> '.t('Edit').'</a>
                    <a href="' . route('admin.client.clone', [$client->id]) . '" class="btn btn-sm btn-warning"><i class="fa fa-clone"></i> '.t('Clone').' </a>
                    <a href="' . route('admin.client.edit', [$client->id]) . '" class="btn btn-danger" rel="delete"><i class="fa fa-trash"></i> '.t('Delete').'</a>
                </div>';
            });
        }

        // $datatables->addColumn('category_description', function ($client) {
        //     $res = '';

        //     if(count($client->categories)){
        //         foreach ($client->categories as $i) {

        //             if($i->depth()>0){
        //                 $res .= "<i class=\"fa fa-sitemap\"></i>&nbsp;" . $i->getRootCategory()->name . " (" . $i->name . ")"  . "<br>";
        //             }
        //             else{
        //                 $res .= "<i class=\"fa fa-sitemap\"></i>&nbsp;" . $i->name . "<br>";
        //             }

        //         }

        //     }

        //     return $res;
        // });



        return $datatables->addColumn('thumbnail', function ($client) {
            return '<img src="' . Resize::img( $client->main_image, $client->receipts['clientAdminList'] ) . '" style="max-height:40px"/>';
        })
            ->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('title', function ($client) {
                    $pub = $client->published == 0 ? '<i class="fa fa-times text-danger" aria-hidden="true"></i>' : '<i class="fa fa-check text-success" aria-hidden="true"></i>';
                    return $pub . '&nbsp;<strong>' . $client->title . '</strong>';
            })
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);
    }


    public function put(Request $request){

        $item = new Client();

        $item->title = $request->get('title');

        // TODO chequear que no exista
        $item->slug = @str_slug($request->get('title'));

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();


        $info_data = [
            'brief' => ''
        ];
        $item->info()->create($info_data);

        // Grilla interna
        $grid = new Grid();
        $grid->title = 'client_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        $item->grid_id = $grid->id;
        $item->save();
        // fin Grilla interna

        return redirect()->route('admin.client.edit', ['id' => $item->id])->with('flashSuccess', t('Element created'));
    }


    public function reorder(Request $request){

        $ordered_ids = $request->get('order');

        $query = "UPDATE client SET sort = (CASE id ";
        foreach($ordered_ids as $sort => $id) {
          $query .= " WHEN {$id} THEN {$sort}";
        }
        $query .= " END) WHERE id IN (" . implode(",", $ordered_ids) . ")";

        $affected = DB::update($query);

        return $affected;

    }


    public function edit($id){

        $item = ClientModel::whereId($id)->with('user', 'info')->firstOrFail();

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('client::admin.edit', compact('item', 'title', 'profiles'));
    }


    public function patch(ClientAdminRequest $request)
    {
        // $client = ClientModel::whereId($request->route('id'))->firstOrFail();
        $item = ClientModel::findOrFail($request->route('id'));

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }


        if ($request->get('tags')) {
            $tags = implode(',', $request->get('tags'));
        } else {
            $tags = null;
        }
        $item->tags = $tags;

        $slug = @str_slug($request->get('slug'));
        if (!$slug) {
            $slug = str_random(8);
        }
        $item->slug = $slug;

        $item->title = $request->get('title');
        $item->description = $request->get('description');
        // $item->is_microsite = $request->has('is_microsite') ? 1 : 0;
        // $item->microsite = $request->get('microsite');
        $item->main_image = $request->get('main_image');
        // $item->og_image = $request->get('og_image');
        // $item->og_description = $request->get('og_description');

        $item->profile()->associate($request->get('profile'));

        $item->save();

        $item->info->brief = $request->get('brief');
        $item->info->website = $request->get('website');

        $item->info->save();

        // save grids (json array)
        $tmp_json_list = json_decode($request->get('grids'));
        $tmp_arr = [];
        foreach ($tmp_json_list as $key => $i) {
            // $tmp_arr[$i->id]['logic'] = $i->logic;
            $tmp_arr[$i->id]['order'] = $key;
        }
        $item->grids()->sync($tmp_arr);


        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }


    public function state(Request $request){

        $item = ClientModel::findOrFail($request->route('id'));

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        switch (strtoupper($request->get('state'))) {

            case 'PUBLISH':

                $item->published = 1;
                $item->save();

                $response = t('Published');
                break;

            case 'DRAFT':

                $item->published = 0;
                $item->save();

                $response = t('Sent to Draft');
                break;

            default:
                $response = 'No action';
                break;
        }

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse($response, 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', $response);
        }

    }

    public function delete($id, Request $request){

        if($this->clientRepository->delete($id)){
            $response = t('The element has been deleted');
        }
        else{
            $response = 'Error deleting item';
        }

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse($response, 200);
        }
        else{
            return redirect()->route('admin.client.list')->with('flashSuccess', $response);
        }

    }


    public function approve(Request $request)
    {
        $item = ClientModel::whereId($request->get('id'))->first();
        if (!$item) {
            return 'Error';
        }
        if ($request->get('approve') == 1) {
            $item->approved_at = Carbon::now();
            $item->save();

            return 'Approved';
        }
        if ($request->get('approve') == 0) {
            $delete = new ResizeHelper($item->main_image, 'client');
            $delete->delete();
            $item->delete();

            return 'Deleted';
        }
    }


    public function clearCache($id)
    {

        $client = ClientModel::whereId($id);

        // if(!isset($client->main_image)){
        //    $client->main_image = 'default.png';
        // }

        $cache = new ResizeHelper($client->main_image, 'client');
        $cache->clearCache();
        return 'Cache is cleared, reload the page';


    }


    public function doClone($id){

        $source = ClientModel::findOrFail($id);
        $item = $source->replicate();

        $clon_suffix = 'copy_' . str_random(4);
        $item->title = sprintf('%s (%s)', $item->title, $clon_suffix);
        $item->slug = sprintf('%s-%s', $item->slug, $clon_suffix);

        $item->published = 0;

        // genero copia de imagen y reemplazo el nombre en el registro
        if($item->main_image && $item->main_image!=''){
            $rh = new ResizeHelper( $item->main_image, 'client');
            $item->main_image = $rh->duplicate();
        }

        $item->push();

        // replicar el 1:1 con info
        $new_info = $source->info->replicate();
        $item->info()->save($new_info);

        // creo la grilla adjunta privada para ese cliento (no es necesario copiar original porque no tiene datos particulares salvo share)
        $grid = new Grid();
        $grid->title = 'client_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        // replico todos los sections atachados a ese grid
        foreach($source->grid->sections as $s){
            $section = $s->replicate();
            $section->grid()->associate($grid->id);
            $section->push();
        }

        // actualizo el cliento recien creado con el Id del grid que cree
        $item->grid_id = $grid->id;
        $item->save();

        // atachar las mismas grillas compartidas que el origen
        foreach($source->grids as $grid){
            $item->grids()->attach([$grid->id => ['order'=>$grid->pivot->order]]);
        }


        $title = t('Edit the Clone');

        return redirect()->route('admin.client.edit',['id' => $item->id])->with('flashSuccess', 'Clonado');
    }



    public function search(Request $request){

        $term = $request->get('term');

        $client = $this->clientRepository->search($term);
        // $client = ClientModel::all();

        $res =  [];
        $ix=0;
        foreach ($client as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['link'] = $p->getLink();
            $res[$ix]['title'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            $res[$ix]['slug'] = $p->slug;
            $res[$ix]['image'] = Resize::img($p->main_image, 'sidebarClient');
            $ix++;
        }

        return json_encode($res);
    }


    public function exportToExcel() {
        //Contact array
        $items = ClientModel::all();
        $client = [];

        foreach ($items as $item) {
            $props['ID'] = $item->id;
            $props['Título'] = $item->title;

            $props['Descripción'] = $item->description;
            $props['Tags'] = str_replace(',', ', ', $item->tags);
            $props['Categorías'] = '';
            $props['Vistas'] = $item->views;
            $props['Fecha'] = date('d/m/Y', strtotime($item->created_at));

            foreach ($item->categories as $cat) {
                $props['Categorías'] .= $cat->name . ', ';
            }
            $props['Categorías'] = rtrim($props['Categorías'], ', ');
            array_push($client, $props);
        }

        //File
        $file = Excel::create('clientos_' . date('d-m-Y'), function($excel) use($client) {
            $excel->sheet('Clientos Sullair', function($sheet) use($client) {
                //Cargo lista
                $sheet->fromArray( $client );
                //Armo cabecera
                $sheet->prependRow(array('LISTA DE PRODUCTOS (' .date('d-m-Y'). ')'));
                $sheet->prependRow(2, array(' '));
                $sheet->cells('A1', function($cells) {
                    $cells->setFontWeight('bold');
                    $cells->setFontSize(16);
                });
                $sheet->cells('A3:K3', function($cells) {
                    $cells->setFontWeight('bold');
                });
            });
        })->export('xls');

        return $file;
    }

    public function importExcel(Request $request) {
        $title = 'Importar desde Excel';

        return iView('client::admin.import', compact('title'));
    }

    public function processExcel(Request $request) {
        if($request->hasFile('excel')) {
            $file = $request->file('excel');

            Excel::load($file, function($reader) {
                $results = $reader->all();
                // dd(get_class($results));
                if(is_a($results, 'Maatwebsite\Excel\Collections\SheetCollection')) {
                    foreach($results as $sheet) {
                        $this->processSheet($sheet);
                    }
                } else {
                    $this->processSheet($results);
                }
            });
        }

        return redirect()->route('admin.client.import')->with('flashSuccess', 'Datos importados correctamente');
    }

    private function processSheet($sheet) {
        // echo 'sheet_start';
        for($i = 0; $i < count($sheet); $i++) {
            $row = $sheet->get($i);
            // echo $row->id;
            $client = ClientModel::find($row->id);
            if($client) {
                // var_dump($client);
                // echo "<pre>titulo: $row->titulo</pre>";
                // echo "<pre>modelo: $row->modelo</pre>";
                // echo "<pre>descripcion: $row->descripcion</pre>";
                // echo "<pre>total_props: " . (count($row) - 4) . "</pre>";

                $client->title = $row->titulo;
                $client->description = $row->descripcion;

                $client->save();

                // foreach($row as $key=>$value) {
                //     if($key != 'titulo' && $key != 'modelo' && $key != 'descripcion' && $key != 'id' && trim($value) !== '') {
                //         $prop_id = ClientProperty::where('name','=', $key)->first()->id;
                //         $prod_prop = $client->properties->where('id', $prop_id)->first();
                //         if($prod_prop) {
                //             $prod_prop->pivot->value = $value;
                //             $prod_prop->pivot->save();
                //         }
                //     }
                // }
            } else{
                // echo "$row->id not found";
            }
        }

        // echo 'sheet_end';
    }

}
