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
use App\Models\SectionType;
use App\Models\Grid;

use App\Http\Requests\Admin\SectionTypeRequest;
use App\Repository\SectionRepositoryInterface;


class SectionTypeController extends Controller{


    public function getIndex(Request $request){

        $title = sprintf('List of %s sectiontypes', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('admin.sectiontype.index', compact('title', 'type'));
    }


    public function getData(Request $request){

        $sectiontypes = SectionType::select([
            'section_types.id',
            'section_types.title',
            'section_types.created_at',
            'section_types.updated_at',
            'section_types.id',
            'section_types.main_image',
            'users.fullname as user_fullname',
            'profiles.title as profile_name'
        ])
        ->leftJoin('users', 'users.id', '=', 'section_types.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'section_types.profile_id');


        $datatables = app('datatables')->of($sectiontypes);

        $datatables->addColumn('actions', function ($sectiontype) {
            return '
                    <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                        <a href="' . route('admin.sectiontypes.edit', [$sectiontype->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Edit </a>
                    </div>';
        });

        $datatables->addColumn('thumbnail', function ($sectiontype) {
            return '<img aaa="'.$sectiontype->main_image.'" src="' . Resize::img($sectiontype->main_image, 'listingMedia') . '"/>';
        });

        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('title', '{!! str_limit($title, 60) !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);

    }


    public function edit($id){

        $sectiontype = SectionType::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.sectiontype.edit', compact('sectiontype', 'title', 'profiles'));
    }


    public function patch(SectionTypeRequest $request){

        $item = SectionType::whereId($request->route('id'))->firstOrFail();

        $item->title = $request->get('title');
        $item->class = $request->get('class');
        $item->main_image = $request->get('main_image');
        $item->width = $request->get('width');
        $item->height = $request->get('height');
        $item->group = $request->has('group') ? 1 : 0;
        $item->absolute = $request->has('absolute') ? 1 : 0;
        $item->fullscreen = $request->has('fullscreen') ? 1 : 0;
        $item->right = $request->has('right') ? 1 : 0;
        // $item->template = $request->get('template');
        // $item->fields = $request->get('fields');
        $item->profile()->associate($request->get('profile'));
        $item->save();

        // save grids (json array)
        $tmp_json_list = json_decode($request->get('contents'));
        $tmp_arr = [];
        foreach ($tmp_json_list as $key => $i) {
            // $tmp_arr[$i->id]['logic'] = $i->logic;
            $tmp_arr[$i->id]['order'] = $key;
        }
        $item->contents()->sync($tmp_arr);

        if ($request->ajax() || $request->wantsJson()) {
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }


    public function create(){
        $title = 'Creating new sectiontype';
        return iView('admin.sectiontype.create', compact('title'));
    }


    public function put(Request $request){

        $item = new SectionType();
        $item->title = $request->get('title');
        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;
        $item->save();

        return redirect()->route('admin.sectiontypes.edit', ['id' => $item->id])->with('flashSuccess', 'SectionType is now crated');
    }


    public function delete($id){

        $item = SectionType::findOrFail($id);
        $item->delete();

        return redirect()->route('admin.sectiontypes')->with('flashSuccess', 'deleted');
    }

    public function doClone($id){

        $source = SectionType::findOrFail($id);

        $item = $source->replicate();
        $item->title = $source->title . ' (clon)';
        $item->name = $source->name . '_clon';
        $item->push();

        $title = t('Edit the Clone');

        // return iView('admin.sectiontype.edit', compact('sectiontype', 'title'));
        return redirect()->route('admin.sectiontypes.edit',['id' => $item->id])->with('flashSuccess', 'Clonado');
    }


    public function doClonex($id,$site){

        $conn_str  = 'mysql_' . $site;

        $source = SectionType::findOrFail($id);

        $item = new SectionType();
        $item->setConnection($conn_str);
        $item->title = $source->title . ' (clon)';
        $item->name = $source->name . '_clon';
        $item->user_id = auth()->user()->id; /////////////////////////
        $item->save();

        return redirect()->route('admin.grids.edit',['id' => $source->id])->with('flashSuccess', 'Clonado en ' . strtoupper($site));
    }



}
