<?php
namespace App\Modules\Job;


use App\Modules\Job\JobModel;
use App\Modules\Job\JobInfoModel;

use App\Modules\Job\JobRepositoryInterface;
use App\Modules\Job\JobAdminRequest;



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



class JobAdminController extends Controller{

    public function __construct(JobRepositoryInterface $p){

        // view()->addNamespace('job', app_path('Modules/job/views/'));

        $this->jobRepository = $p;
    }



    public function getList(){
        $title = 'Items';

        $items = JobModel::orderBy('lft', 'asc')->get();

        return iView('job::admin.list', compact('title','items'));
    }



    public function put(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
        ]);

        $item = new JobModel();

        $item->title = $request->get('title');

        $item->slug = @str_slug($request->get('title'));

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        $info_data = [
            'brief' => '',
        ];
        $item->info()->create($info_data);

        // Grilla interna
        $grid = new Grid();
        $grid->title = 'job_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();
        $item->grid_id = $grid->id;
        $item->save();

        return redirect()->back()->with('flashSuccess', t('Added'));
    }


    public function reorder(Request $request)
    {
        $tree = $request->get('tree');
        foreach ($tree as $k => $v) {
            if ($v['depth'] == -1) {
                continue;
            }
            if ($v['parent_id'] == 'root') {
                $v['parent_id'] = 0;
            }

            $item = JobModel::whereId($v['item_id'])->first();
            $item->parent_id = $v['parent_id'];
            $item->depth = $v['depth'];
            $item->lft = $v['left'] - 1;
            $item->rgt = $v['right'] - 1;
            $item->save();
        }
        // Artisan::call('cache:clear');
    }



    public function edit($id){

        $item = JobModel::whereId($id)->with('user', 'info')->firstOrFail();

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', t('Insufficient permissions for this object'));
        }

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('job::admin.edit', compact('item', 'title', 'profiles'));
    }


    public function patch(JobAdminRequest $request)
    {
        // $job = JobModel::whereId($request->route('id'))->firstOrFail();
        $item = JobModel::findOrFail($request->route('id'));

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

        // if ($request->get('featured_at') && $item->featured_at == null) {
        //     $item->featured_at = Carbon::now();
        // } elseif ($request->get('featured_at') == null && $item->featured_at) {
        //     $item->featured_at = null;
        // }

        $item->save();

        $item->info->brief = $request->get('brief');

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

        $item = JobModel::findOrFail($request->route('id'));

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

        if($this->jobRepository->delete($id)){
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
            return redirect()->route('admin.job.list')->with('flashSuccess', $response);
        }

    }


    public function approve(Request $request)
    {
        $item = JobModel::whereId($request->get('id'))->first();
        if (!$item) {
            return 'Error';
        }
        if ($request->get('approve') == 1) {
            $item->approved_at = Carbon::now();
            $item->save();

            return 'Approved';
        }
        if ($request->get('approve') == 0) {
            $delete = new ResizeHelper($item->main_image, 'job');
            $delete->delete();
            $item->delete();

            return 'Deleted';
        }
    }


    public function clearCache($id)
    {

        $job = JobModel::whereId($id);

        // if(!isset($job->main_image)){
        //    $job->main_image = 'default.png';
        // }

        $cache = new ResizeHelper($job->main_image, 'job');
        $cache->clearCache();
        return 'Cache is cleared, reload the page';


    }


    public function doClone($id){

        $source = JobModel::findOrFail($id);
        $item = $source->replicate();

        $clon_suffix = 'copy_' . str_random(4);
        $item->title = sprintf('%s (%s)', $item->title, $clon_suffix);
        $item->slug = sprintf('%s-%s', $item->slug, $clon_suffix);

        $item->published = 0;

        // genero copia de imagen y reemplazo el nombre en el registro
        if($item->main_image && $item->main_image!=''){
            $rh = new ResizeHelper( $item->main_image, 'job');
            $item->main_image = $rh->duplicate();
        }

        $item->push();

        // replicar el 1:1 con info
        $new_info = $source->info->replicate();

        $item->info()->save($new_info);

        // creo la grilla adjunta privada para ese jobo (no es necesario copiar original porque no tiene datos particulares salvo share)
        $grid = new Grid();
        $grid->title = 'job_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        // replico todos los sections atachados a ese grid
        foreach($source->grid->sections as $s){
            $section = $s->replicate();
            $section->grid()->associate($grid->id);
            $section->push();
        }

        // actualizo el jobo recien creado con el Id del grid que cree
        $item->grid_id = $grid->id;
        $item->save();


        // atachar las mismas grillas compartidas que el origen
        foreach($source->grids as $grid){
            $item->grids()->attach([$grid->id => ['order'=>$grid->pivot->order]]);
        }


        $title = t('Edit the Clone');

        return redirect()->route('admin.job.edit',['id' => $item->id])->with('flashSuccess', 'Clonado');
    }



    public function search(Request $request){

        $term = $request->get('term');

        $job = $this->jobRepository->search($term);
        // $job = JobModel::all();

        $res =  [];
        $ix=0;
        foreach ($job as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['sku'] = $p->sku;
            $res[$ix]['link'] = $p->getLink();
            $res[$ix]['title'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            $res[$ix]['slug'] = $p->slug;
            $res[$ix]['image'] = Resize::img($p->main_image, 'sidebarJob');
            $ix++;
        }

        return json_encode($res);
    }


}
