<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;
use App\Models\Tag;


class TagController extends Controller {

    public function search(Request $request) {
        $q = $request->input('q', '');

        $res = [];

        if($q !== '') {
            $tags = Tag::where('name', 'like', "%$q%")->get();
            $n = 0;
            foreach($tags as $tag) {
                $res[$n]['id'] = $tag->name;
                $res[$n]['text'] = $tag->name;
            }

        } else {
            
        }

        return json_encode($res);
    }

}
