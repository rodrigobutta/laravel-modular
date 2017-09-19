<?php
namespace App\Modules\Portfolio;


use App\Modules\Portfolio\PortfolioModel;
use App\Modules\Portfolio\PortfolioInfoModel;

use App\Modules\Portfolio\PortfolioRepositoryInterface;
use App\Modules\Portfolio\PortfolioAdminRequest;



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



class PortfolioAdminController extends Controller{

    public function __construct(PortfolioRepositoryInterface $p){

        // view()->addNamespace('portfolio', app_path('Modules/portfolio/views/'));

        $this->portfolioRepository = $p;
    }

    public function getList(Request $request){

        $title = t('List') . sprintf(': %s', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('portfolio::admin.list', compact('title', 'type'));
    }

    public function getData(Request $request){

        $portfolio = PortfolioModel::select([
            'portfolio.*','users.fullname as user_fullname','profiles.title as profile_name'
            ])
        ->leftJoin('users', 'users.id', '=', 'portfolio.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'portfolio.profile_id')
        ->orderBy('sort');

        // si no es superadmin, filtro el lote por los perfiles que el usuario posea
        if(!auth()->user()->isSuper()){
            $portfolio->whereIn('profile_id', auth()->user()->profiles()->lists('id')); // lo segundo es un array de ids
        }

        switch ($request->get('type')) {
            case 'approved':
                $portfolio->approved(); // es del scopeApproved en el Model
                break;
            case 'featured':
                $portfolio->whereNotNull('portfolio.featured_at');
                break;
            case 'approvalRequired':
                $portfolio->whereNull('portfolio.approved_at');
                break;
            default:
                $portfolio->approved();
        }


        $datatables = app('datatables')->of($portfolio);

        if ($request->get('type') == 'approvalRequired') {
            $datatables->addColumn('actions', function ($portfolio) {
                return '
                <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                    <a href="#" class="portfolio-approve btn btn-success" data-approve="' . $portfolio->id . '"><i class="fa fa-check"></i></a>
                    <a href="#" class="portfolio-disapprove btn btn-danger" data-disapprove="' . $portfolio->id . '"><i class="fa fa-times"></i></a>
                </div>';
            });
        } else {
            $datatables->addColumn('actions', function ($portfolio) {
                return '
                <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                    <a href="' . route('portfolio.view', [$portfolio->slug]) . '" class="btn btn-success" target="_blank"><i class="fa fa-eye"></i> '.t('View').'</a>
                    <a href="' . route('admin.portfolio.edit', [$portfolio->id]) . '" class="btn btn-primary"><i class="fa fa-edit"></i> '.t('Edit').'</a>
                    <a href="' . route('admin.portfolio.clone', [$portfolio->id]) . '" class="btn btn-sm btn-warning"><i class="fa fa-clone"></i> '.t('Clone').' </a>
                    <a href="' . route('admin.portfolio.edit', [$portfolio->id]) . '" class="btn btn-danger" rel="delete"><i class="fa fa-trash"></i> '.t('Delete').'</a>
                </div>';
            });
        }

        // $datatables->addColumn('category_description', function ($portfolio) {
        //     $res = '';

        //     if(count($portfolio->categories)){
        //         foreach ($portfolio->categories as $i) {

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



        return $datatables->addColumn('thumbnail', function ($portfolio) {
            return '<img src="' . Resize::img( $portfolio->main_image, $portfolio->receipts['listingPortfolio'] ) . '" style="max-height:40px"/>';
        })
            ->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            // ->editColumn('featured_at', function ($portfolio) {
            //     if ($portfolio->featured_at !== null) {
            //         $portfolio->featured_at->diffForHumans();
            //     }

            //     return 'Not Featured';
            // })
            ->editColumn('title', function ($portfolio) {
                    $pub = $portfolio->published == 0 ? '<i class="fa fa-times text-danger" aria-hidden="true"></i>' : '<i class="fa fa-check text-success" aria-hidden="true"></i>';
                    return $pub . '&nbsp;<strong>' . $portfolio->title . '</strong>';
            })
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);
    }


    public function put(Request $request){

        $item = new Portfolio();

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
        $grid->title = 'PORTFOLIO_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        $item->grid_id = $grid->id;
        $item->save();
        // fin Grilla interna

        return redirect()->route('admin.portfolio.edit', ['id' => $item->id])->with('flashSuccess', t('Element created'));
    }


    public function reorder(Request $request){

        $ordered_ids = $request->get('order');

        $query = "UPDATE portfolio SET sort = (CASE id ";
        foreach($ordered_ids as $sort => $id) {
          $query .= " WHEN {$id} THEN {$sort}";
        }
        $query .= " END) WHERE id IN (" . implode(",", $ordered_ids) . ")";

        $affected = DB::update($query);

        return $affected;

    }


    public function edit($id){

        $item = PortfolioModel::whereId($id)->with('user', 'info')->firstOrFail();

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('portfolio::admin.edit', compact('item', 'title', 'profiles'));
    }


    public function patch(PortfolioAdminRequest $request)
    {
        // $portfolio = PortfolioModel::whereId($request->route('id'))->firstOrFail();
        $item = PortfolioModel::findOrFail($request->route('id'));

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        if ($request->get('categories')) {
            $categories = $request->get('categories');
            $item->categories()->sync($categories);
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
        $item->job = $request->get('job');
        $item->description = $request->get('description');

        // $item->is_microsite = $request->has('is_microsite') ? 1 : 0;
        // $item->microsite = $request->get('microsite');

        $item->main_image = $request->get('main_image');

        // $item->og_image = $request->get('og_image');
        // $item->og_description = $request->get('og_description');

        $item->profile()->associate($request->get('profile'));

        // if ($request->get('featured_at') && $item->featured_at == null) {
        //     $item->featured_at = Carbon::now();
        // } elseif ($request->get('featured_at') == null && $item->featured_at) {
        //     $item->featured_at = null;
        // }

        $item->save();

        $item->info->brief = $request->get('brief');
        $item->info->manuales = $request->get('manuales');
        $item->info->manuales_label = $request->get('manuales_label');
        $item->info->flyer = $request->get('flyer');
        $item->info->flyer_label = $request->get('flyer_label');

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

        $item = PortfolioModel::findOrFail($request->route('id'));

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

        if($this->portfolioRepository->delete($id)){
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
            return redirect()->route('admin.portfolio.list')->with('flashSuccess', $response);
        }

    }


    public function approve(Request $request)
    {
        $item = PortfolioModel::whereId($request->get('id'))->first();
        if (!$item) {
            return 'Error';
        }
        if ($request->get('approve') == 1) {
            $item->approved_at = Carbon::now();
            $item->save();

            return 'Approved';
        }
        if ($request->get('approve') == 0) {
            $delete = new ResizeHelper($item->main_image, 'portfolio');
            $delete->delete();
            $item->delete();

            return 'Deleted';
        }
    }


    public function clearCache($id)
    {

        $portfolio = PortfolioModel::whereId($id);

        // if(!isset($portfolio->main_image)){
        //    $portfolio->main_image = 'default.png';
        // }

        $cache = new ResizeHelper($portfolio->main_image, 'portfolio');
        $cache->clearCache();
        return 'Cache is cleared, reload the page';


    }


    public function doClone($id){

        $source = PortfolioModel::findOrFail($id);
        $item = $source->replicate();

        $clon_suffix = 'copy_' . str_random(4);
        $item->title = sprintf('%s (%s)', $item->title, $clon_suffix);
        $item->slug = sprintf('%s-%s', $item->slug, $clon_suffix);

        $item->published = 0;

        // genero copia de imagen y reemplazo el nombre en el registro
        if($item->main_image && $item->main_image!=''){
            $rh = new ResizeHelper( $item->main_image, 'portfolio');
            $item->main_image = $rh->duplicate();
        }

        $item->push();

        // replicar el 1:1 con info
        $new_info = $source->info->replicate();

        $item->info()->save($new_info);

        // creo la grilla adjunta privada para ese portfolioo (no es necesario copiar original porque no tiene datos particulares salvo share)
        $grid = new Grid();
        $grid->title = 'portfolio_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        // replico todos los sections atachados a ese grid
        foreach($source->grid->sections as $s){
            $section = $s->replicate();
            $section->grid()->associate($grid->id);
            $section->push();
        }

        // actualizo el portfolioo recien creado con el Id del grid que cree
        $item->grid_id = $grid->id;
        $item->save();


        // atachar las mismas grillas compartidas que el origen
        foreach($source->grids as $grid){
            $item->grids()->attach([$grid->id => ['order'=>$grid->pivot->order]]);
        }


        $title = t('Edit the Clone');

        return redirect()->route('admin.portfolio.edit',['id' => $item->id])->with('flashSuccess', 'Clonado');
    }



    public function search(Request $request){

        $term = $request->get('term');

        $portfolio = $this->portfolioRepository->search($term);
        // $portfolio = PortfolioModel::all();

        $res =  [];
        $ix=0;
        foreach ($portfolio as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['sku'] = $p->sku;
            $res[$ix]['link'] = $p->getLink();
            $res[$ix]['title'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            $res[$ix]['slug'] = $p->slug;
            $res[$ix]['image'] = Resize::img($p->main_image, 'sidebarPortfolio');
            $ix++;
        }

        return json_encode($res);
    }


    public function exportToExcel() {
        //Contact array
        $items = PortfolioModel::all();
        $portfolio = [];

        foreach ($items as $item) {
            $props['ID'] = $item->id;
            $props['Título'] = $item->title;
            $props['Modelo'] = $item->sku;
            $props['Descripción'] = $item->description;
            $props['Tags'] = str_replace(',', ', ', $item->tags);
            $props['Categorías'] = '';
            $props['Vistas'] = $item->views;
            $props['Fecha'] = date('d/m/Y', strtotime($item->created_at));

            foreach ($item->categories as $cat) {
                $props['Categorías'] .= $cat->name . ', ';
            }
            $props['Categorías'] = rtrim($props['Categorías'], ', ');
            array_push($portfolio, $props);
        }

        //File
        $file = Excel::create('portfolioos_' . date('d-m-Y'), function($excel) use($portfolio) {
            $excel->sheet('Portfolioos Sullair', function($sheet) use($portfolio) {
                //Cargo lista
                $sheet->fromArray( $portfolio );
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

        return iView('portfolio::admin.import', compact('title'));
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

        return redirect()->route('admin.portfolio.import')->with('flashSuccess', 'Datos importados correctamente');

        // return iView('admin.portfolio.import', compact('title'));
    }

    private function processSheet($sheet) {
        // echo 'sheet_start';
        for($i = 0; $i < count($sheet); $i++) {
            $row = $sheet->get($i);
            // echo $row->id;
            $portfolio = PortfolioModel::find($row->id);
            if($portfolio) {
                // var_dump($portfolio);
                // echo "<pre>titulo: $row->titulo</pre>";
                // echo "<pre>modelo: $row->modelo</pre>";
                // echo "<pre>descripcion: $row->descripcion</pre>";
                // echo "<pre>total_props: " . (count($row) - 4) . "</pre>";

                $portfolio->title = $row->titulo;
                $portfolio->sku = $row->modelo;
                $portfolio->description = $row->descripcion;

                $portfolio->save();

                // foreach($row as $key=>$value) {
                //     if($key != 'titulo' && $key != 'modelo' && $key != 'descripcion' && $key != 'id' && trim($value) !== '') {
                //         $prop_id = PortfolioProperty::where('name','=', $key)->first()->id;
                //         $prod_prop = $portfolio->properties->where('id', $prop_id)->first();
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
