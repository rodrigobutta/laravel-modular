<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Models\Page;
use App\Models\Section;
use App\Models\SectionType;
use App\Models\Grid;
use Illuminate\Support\Facades\Artisan;

use App\Http\Requests\Admin\PageRequest;

use App\Repository\PageRepositoryInterface;

use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{

    public function __construct(PageRepositoryInterface $p){
        $this->pageRepository = $p;
    }

    public function getIndex(Request $request)
    {

        $title = 'Páginas';

        $pages = Page::orderBy('lft', 'asc')->get();


        return iView('admin.page.index', compact('title', 'pages'));
    }


    public function getData(Request $request)
    {
        $pages = Page::select([
            'pages.id',
            'pages.slug',
            'pages.title',
            'pages.created_at',
            'pages.updated_at',
            'pages.id',
            'users.fullname as user_fullname',
            'profiles.title as profile_name',
            'b.title as parent_title'
        ])
        ->leftJoin('users', 'users.id', '=', 'pages.user_id')
        ->leftJoin('pages as b', 'b.id', '=', 'pages.parent_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'pages.profile_id');


        $datatables = app('datatables')->of($pages);

        $datatables->addColumn('actions', function ($page) {
            return '
                    <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                        <a href="' . route('page', [$page->slug]) . '" class="btn btn-sm btn-success" target="_blank"><i class="fa fa-eye"></i> '. t('View') .'</a>
                        <a href="' . route('admin.pages.edit', [$page->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> '. t('Edit') .'</a>
                    </div>';
        });

        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->editColumn('title', function($page) {
                return ($page->parent_title != '') ? '(' . $page->parent_title . ') ' . str_limit($page->title, 60) : str_limit($page->title, 60);
            })
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);

    }


    public function edit($id)
    {
        $page = Page::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        $pages = Page::where('id', '>',5)->where('id', '!=',$page->id)->orderBy('title', 'asc')->pluck('title', 'id')->toArray();

        return iView('admin.page.edit', compact('page', 'title', 'profiles', 'pages'));
    }

    public function reorderPage(Request $request)
    {
        $tree = $request->get('tree');
        foreach ($tree as $k => $v) {
            if ($v['depth'] == -1) {
                continue;
            }
            if ($v['parent_id'] == 'root') {
                $v['parent_id'] = 0;
            }

            $item = Page::whereId($v['item_id'])->first();
            $item->parent_id = $v['parent_id'];
            $item->depth = $v['depth'];
            $item->lft = $v['left'] - 1;
            $item->rgt = $v['right'] - 1;
            $item->save();
        }
        Artisan::call('cache:clear');
    }


    public function patch(PageRequest $request)
    {
        $item = Page::whereId($request->route('id'))->firstOrFail();


        // save custom properties
        if ($request->get('tags')) {
            $tags = implode(',', $request->get('tags'));
        } else {
            $tags = null;
        }
        $item->tags = $tags;


        if(!$item->isSystem()){
            $slug = @str_slug($request->get('slug'));
            if (!$slug) $slug = str_random(8);
            $item->slug = $slug;    
        }
        
        $item->title = $request->get('title');
        $item->description = $request->get('description');

        $item->og_image = $request->get('og_image');
        $item->og_description = $request->get('og_description');

        $item->profile()->associate($request->get('profile'));


        $item->parent_id = $request->get('parent_id');

        $item->save();


        // save grids (json array)
        $grids = json_decode($request->get('grids'));
        $grids_arr = [];
        foreach ($grids as $key => $i) {
            // $grids_arr[$i->id]['logic'] = $i->logic;
            $grids_arr[$i->id]['order'] = $key;
        }
        $item->grids()->sync($grids_arr);


        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }


    public function create()
    {
        $title = 'Creating new page';

        return iView('admin.page.create', compact('title'));
    }


    public function put(Request $request)
    {
        $item = new Page();
        $item->title = $request->get('title');

        $slug = @str_slug($request->get('title'));
        if (!$slug) {
            $slug = str_random(7);
        }
        $item->slug = $slug;

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        $grid = new Grid();
        $grid->title = 'PAGE_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        $item->grid_id = $grid->id;
        $item->save();

        return redirect()->route('admin.pages.edit', ['id' => $item->id])->with('flashSuccess', 'Page is now crated');
    }


    public function delete($id)
    {

        // if (Request::ajax()) {
        // if (Request::isMethod('delete')){

        if($this->pageRepository->delete($id)){
            $response = t('The element has been deleted');
        }
        else{
            $response = 'Error deleting item';
        }

        if( isset($request) && ($request->ajax() || $request->wantsJson() )) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse($response, 200);
        }
        else{
            return redirect()->route('admin.pages')->with('flashSuccess', $response);
        }


    }

    public function doClone($id)
    {

        $source_page = Page::findOrFail($id);

        $page = $source_page->replicate();
        $page->push();

        $title = t('Edit the Clone');

        // return iView('admin.page.edit', compact('page', 'title'));
        return redirect()->route('admin.pages.edit',['id' => $page->id])->with('flashSuccess', 'Clonado');
    }


    public function doClonex($id,$site){

        $conn_str  = 'mysql_' . $site;

        $source = Page::findOrFail($id);

        $item = new Page();
        $item->setConnection($conn_str);
        $item->title = $source->title . ' (clonex)';
        $item->slug = $source->slug . '-clonex';
        $item->user_id = auth()->user()->id; /////////////////////////
        $item->save();

        $grid = new Grid();
        $grid->setConnection($conn_str);
        $grid->title = 'PAGE_' . $item->id;
        $grid->shared = false;
        $grid->user_id = auth()->user()->id;
        $grid->save();

        return redirect()->route('admin.grids.edit',['id' => $source->id])->with('flashSuccess', 'Clonado en ' . strtoupper($site));
    }


    public function screenshot(Request $request, $id){

        if($request->get('imgBase64')){

            $req = $request->get('imgBase64');
            $base64_str = substr($req, strpos($req, ",")+1);
            $image = base64_decode($base64_str);

            $path = sprintf('%s/%s/%s_%s.%s', pathUploads(), 'screenshots', 'page', $id, 'png');

            Storage::put($path,$image);

        }

    }




    public function state(Request $request){

        $item = Page::findOrFail($request->route('id'));

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


    public function search(Request $request){

        $term = $request->get('term');

        $pages = $this->pageRepository->search($term);

        $res =  [];
        $ix=0;
        foreach ($pages as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['link'] = $p->getLink();
            $res[$ix]['title'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            $res[$ix]['slug'] = $p->slug;
            $ix++;
        }

        return json_encode($res);
    }

}
