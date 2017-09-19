<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Models\Section;
use App\Models\SectionContent;
use App\Models\Grid;

use App\Repository\SectionRepositoryInterface;

class SectionContentController extends Controller{

    public function __construct(SectionRepositoryInterface $r){
        $this->sectionRepository = $r;
    }


    public function getIndex(Request $request){

        $title = 'List';
        $type = $request->get('type');

        return iView('admin.sectioncontent.index', compact('title', 'type'));
    }


    public function getData(Request $request){

        $sectioncontents = SectionContent::select([
            'section_contents.id',
            'section_contents.title',
            'section_contents.created_at',
            'section_contents.updated_at',
            'section_contents.main_image',
            'users.fullname as user_fullname',
            'profiles.title as profile_name'
        ])
        ->leftJoin('users', 'users.id', '=', 'section_contents.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'section_contents.profile_id');


        $datatables = app('datatables')->of($sectioncontents);

        $datatables->addColumn('actions', function ($sectioncontent) {
            return '
                    <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                        <a href="' . route('admin.sectioncontents.edit', [$sectioncontent->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Edit </a>
                    </div>';
        });

        $datatables->addColumn('thumbnail', function ($sectioncontent) {
            return '<img aaa="'.$sectioncontent->main_image.'" src="' . Resize::img($sectioncontent->main_image, 'listingMedia') . '"/>';
        });

        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('title', '{!! str_limit($title, 60) !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);

    }


    public function edit($id){

        $sectioncontent = SectionContent::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.sectioncontent.edit', compact('sectioncontent', 'title', 'profiles'));
    }


    public function patch(Request $request){

        $item = SectionContent::whereId($request->route('id'))->firstOrFail();

        $item->title = $request->get('item_title');
        $item->class = $request->get('class');
        $item->main_image = $request->get('main_image');

        $item->template = $request->get('template');
        $item->fields = $request->get('fields');

        $item->profile()->associate($request->get('profile'));
        $item->save();

        if ($request->ajax() || $request->wantsJson()) {
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }


    public function create(){
        $title = 'Creating new sectioncontent';
        return iView('admin.sectioncontent.create', compact('title'));
    }


    public function put(Request $request){

        $item = new SectionContent();
        $item->title = $request->get('title');
        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;
        $item->save();

        return redirect()->route('admin.sectioncontents.edit', ['id' => $item->id])->with('flashSuccess', 'SectionContent is now crated');
    }


    public function delete($id){

        $item = SectionContent::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.sectioncontents')->with('flashSuccess', 'deleted');
    }

    public function doClone($id){

        $source = SectionContent::findOrFail($id);

        $item = $source->replicate();
        $item->title = $source->title . ' (clon)';
        $item->name = $source->name . '_clon';
        $item->push();

        $title = t('Edit the Clone');

        // return iView('admin.sectioncontent.edit', compact('sectioncontent', 'title'));
        return redirect()->route('admin.sectioncontents.edit',['id' => $item->id])->with('flashSuccess', 'Clonado');
    }


    public function doClonex($id,$site){

        $conn_str  = 'mysql_' . $site;

        $source = SectionContent::findOrFail($id);

        $item = new SectionContent();
        $item->setConnection($conn_str);
        $item->title = $source->title . ' (clon)';
        $item->name = $source->name . '_clon';
        $item->user_id = auth()->user()->id; /////////////////////////
        $item->save();

        return redirect()->route('admin.grids.edit',['id' => $source->id])->with('flashSuccess', 'Clonado en ' . strtoupper($site));
    }


    public function search(Request $request){

        $term = $request->get('term');

        // $items = Media::all();
        $items = $this->sectionRepository->searchContent($term);


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
