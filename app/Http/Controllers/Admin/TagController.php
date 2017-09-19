<?php

namespace App\Http\Controllers\Admin;

use App\Models\Tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\JsonResponse;

use Carbon\Carbon;

class TagController extends Controller
{

    public function getList(Request $request){

        $title = 'Tags';

        return iView('admin.tag.list', compact('title'));
    }

    public function getData(Request $request){

        $tags = Tag::select([
            'tags.*'
            ]);

        $datatables = app('datatables')->of($tags);

        $datatables->addColumn('actions', function ($tag) {
            return '
            <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                <a href="' . route('admin.tags.edit', [$tag->id]) . '" class="btn btn-primary"><i class="fa fa-edit"></i> '.t('Edit').'</a>
                <a href="' . route('admin.tags.edit', [$tag->id]) . '" class="btn btn-danger" rel="delete"><i class="fa fa-trash"></i> '.t('Delete').'</a>
            </div>';
        });

        return $datatables->make(true);
    }

    public function put(Request $request) {
    	$name = $request->input('name', '');

    	if ($name !== '') {
    		$tag = new Tag();
    		$tag->name = $name;

    		$tag->save();

    		return redirect()->route('admin.tags.edit', ['id' => $tag->id])->with('flashSuccess', t('Element created'));
    	}
    }

    public function edit (Request $request, $id) {
    	$tag = Tag::findOrFail($id);

    	return iView('admin.tag.edit', compact('tag'));

    	return json_encode($tag);
    }

    public function patch(Request $request) {
        $item = Tag::findOrFail($request->route('id'));


        $item->name = $request->get('name');

        $item->save();

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }
    }

    public function delete($id, Request $request){

        $item = Tag::findOrFail($id);

        if($item->delete()){
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
            return redirect()->route('admin.tags')->with('flashSuccess', $response);
        }

    }

}
