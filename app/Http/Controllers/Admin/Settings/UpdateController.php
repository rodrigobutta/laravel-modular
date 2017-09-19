<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Blog;
use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class UpdateController extends Controller{

    public function postSiteDetails(Request $request){

        // if ($request->hasFile('fav_icon')) {
        //     $request->file('fav_icon')->move(public_path(), 'favicon.ico');
        // }

        DB::table('sitesettings')->where('option', 'siteName')->update(['value' => $request->get('sitename')]);
        DB::table('sitesettings')->where('option', 'description')->update(['value' => $request->get('description')]);
        DB::table('sitesettings')->where('option', 'tos')->update(['value' => $request->get('tos')]);
        DB::table('sitesettings')->where('option', 'og_image')->update(['value' => $request->get('og_image')]);

        DB::table('sitesettings')->where('option', 'favIcon')->update(['value' => $request->get('fav_icon')]);

        if ($request->get('tags')) {
            $tags = implode(',', $request->get('tags'));
        } else {
            $tags = null;
        }
        DB::table('sitesettings')->where('option', 'tags')->update(['value' => $tags]);

        Artisan::call('cache:clear');

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }

    public function postLimitSettings(Request $request)
    {
        $this->validate($request, [
            'tagsLimit'             => 'required',
            'maxImageSize'          => 'required',
        ]);

        DB::table('sitesettings')->where('option', 'tagsLimit')->update(['value' => (int)$request->get('tagsLimit')]);
        DB::table('sitesettings')->where('option', 'maxImageSize')->update(['value' => $request->get('maxImageSize')]);

        Artisan::call('cache:clear');

        return redirect()->back()->with('flashSuccess', 'Your limits are now updated');
    }

    public function postCacheSettings(Request $request)
    {
        if ($request->get('settings_cache')) {
            Artisan::call('cache:clear');
        }

        if ($request->get('template_cache')) {
            Artisan::call('view:clear');
        }
        if ($request->get('route_cache')) {
            Artisan::call('route:clear');
            Artisan::call('route:cache');
        }

        return redirect()->back()->with('flashSuccess', 'Cache is cleared now');
    }

    /**
     * @return mixed
     */
    public function updateSiteMap()
    {
        $sitemap = app()->make("sitemap");
        $blogs = Blog::orderBy('created_at', 'desc')->get();
        foreach ($blogs as $blog) {
            $sitemap->add(route('blog', ['id' => $blog->id, 'slug' => $blog->slug]), $blog->updated_at, '0.9');
        }
        $posts = Image::orderBy('created_at', 'desc')->get();
        foreach ($posts as $post) {
            $sitemap->add(route('image', ['id' => $post->id, 'slug' => $post->slug]), $post->approved_at, '0.9');
        }
        $users = User::orderBy('created_at', 'desc')->get();
        foreach ($users as $user) {
            $sitemap->add(route('user', ['username' => $user->username]), $user->created_at, '0.5');
        }
        $sitemap->store('xml', 'sitemap');

        return redirect()->route('admin')->with('flashSuccess', 'sitemap.xml is now updated');
    }
}
