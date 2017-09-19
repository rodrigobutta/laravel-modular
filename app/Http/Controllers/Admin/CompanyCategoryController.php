<?php

namespace App\Http\Controllers\Admin;

use App\Models\CompanyCategory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\JsonResponse;

use App\Repository\CompanyCategoryRepositoryInterface;

class CompanyCategoryController extends Controller
{

    public function __construct(CompanyCategoryRepositoryInterface $c){
        $this->category = $c;
    }


    public function index()
    {
        $title = t('Families');

        $categories = CompanyCategory::orderBy('lft', 'asc')->get();

        return iView('admin.companycategory.index', compact('title','categories'));
    }


    public function put(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            // 'slug' => 'required',
        ]);

        $item = new CompanyCategory();

        $item->name = $request->get('name');

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        return redirect()->back()->with('flashSuccess', t('Added'));
    }

    public function reorderCategory(Request $request)
    {
        $tree = $request->get('tree');
        foreach ($tree as $k => $v) {
            if ($v['depth'] == -1) {
                continue;
            }
            if ($v['parent_id'] == 'root') {
                $v['parent_id'] = 0;
            }

            $item = CompanyCategory::whereId($v['item_id'])->first();
            $item->parent_id = $v['parent_id'];
            $item->depth = $v['depth'];
            $item->lft = $v['left'] - 1;
            $item->rgt = $v['right'] - 1;
            $item->save();
        }
        Artisan::call('cache:clear');
    }


    public function delete($id, Request $request = null){

        if($this->category->delete($id)){
            $response = t('The element has been deleted');
        }
        else{
            $response = 'Error deleting item';
        }

        if ($request->ajax() || $request->wantsJson()) {
            return new JsonResponse($response, 200);
        }
        else{
            return redirect()->route('admin.companycategories')->with('flashSuccess', $response);
        }

    }


    public function edit($id)
    {
        $title = t('Edit');

        // $item = CompanyCategory::findOrFail($id);
        $item = CompanyCategory::whereId($id)->with('user')->firstOrFail();

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', 'no tiene permisos suicientes para editar este elemento');
        }

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.companycategory.edit', compact('title','item', 'profiles'));

    }

    public function patch($id, Request $request)
    {
        $this->validate($request, [
            'name' => ['required']
        ]);

        $item = CompanyCategory::findOrFail($id);

        $item->name = $request->get('name');

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




}
