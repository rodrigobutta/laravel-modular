<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Models\Content;
use App\Models\Section;
use App\Models\SectionType;

use App\Http\Requests\Admin\ContentRequest;
use App\Repository\ContentRepositoryInterface;


class ContentController extends Controller
{

    public function getIndex(Request $request)
    {

        $title = sprintf('List of %s contents', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('admin.content.index', compact('title', 'type'));
    }

    public function getData(Request $request)
    {
        $contents = Content::select([
            'contents.id',
            'contents.name',
            'contents.title',
            'contents.type',
            'contents.created_at',
            'contents.updated_at',
            'contents.id',
            'users.fullname as user_fullname',
            'profiles.title as profile_name'
        ])
        ->leftJoin('users', 'users.id', '=', 'contents.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'contents.profile_id');


        $datatables = app('datatables')->of($contents);

        $datatables->addColumn('actions', function ($content) {
            return '
                    <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                        <a href="' . route('admin.contents.edit', [$content->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-gear"></i> Propiedades </a>
                        <a href="' . route('admin.contents.value', [$content->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-pencil"></i> Editar </a>
                        <a href="' . route('admin.contents.clone', [$content->id]) . '" class="btn btn-sm btn-warning"><i class="fa fa-clone"></i> '.t('Clone').' </a>
                    </div>';
        });

        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->editColumn('title', '{!! str_limit($title, 60) !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);

    }

    public function edit($id){

        $content = Content::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.content.edit', compact('content', 'title', 'profiles'));
    }

    public function patch(ContentRequest $request){

        $item = Content::whereId($request->route('id'))->firstOrFail();

        $item->name = $request->get('name');
        $item->title = $request->get('title');
        $item->type = $request->get('type');
        $item->schema = $request->get('schema');
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

    public function valueEdit($id){

        $content = Content::whereId($id)->with('user')->firstOrFail();

        $title = t('Edit');

        return iView('admin.content.value', compact('content', 'title'));
    }

    public function valuePatch(ContentRequest $request){

        $item = Content::whereId($request->route('id'))->firstOrFail();

        $item->value = $request->get('value');

        $item->save();

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
        $title = 'Creating new content';

        return iView('admin.content.create', compact('title'));
    }


    public function put(Request $request)
    {
        $item = new Content();

        $item->title = $request->get('title');
        $item->name  = @str_slug($request->get('title'));
        $item->type = $request->get('type');

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        return redirect()->route('admin.contents.edit', ['id' => $item->id])->with('flashSuccess', 'Content is now crated');
    }


    public function delete($id)
    {

        // if (Request::ajax()) {
        // if (Request::isMethod('delete')){

        $content = Content::findOrFail($id);

        $content->delete();

        return redirect()->route('admin.contents')->with('flashSuccess', 'deleted');

    }

    public function doClone($id){

        $source_content = Content::findOrFail($id);

        $content = $source_content->replicate();
        $content->push();

        $title = t('Edit the Clone');

        // return iView('admin.content.edit', compact('content', 'title'));
        return redirect()->route('admin.contents.edit',['id' => $content->id])->with('flashSuccess', 'Clonado');
    }


}
