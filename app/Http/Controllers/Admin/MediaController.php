<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Helpers\ImageHelper;

use App\Models\Profile;
use App\Models\Media;
use App\Models\MediaInfo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Thumbnail;

use Illuminate\Http\JsonResponse;

use App\Repository\MediaRepositoryInterface;
use Carbon\Carbon;

use App\Http\Requests\Admin\MediaRequest;


class MediaController extends Controller
{

    public function __construct(MediaRepositoryInterface $m)
    {
        $this->mediaRepository = $m;
    }

    public function getList(Request $request)
    {

        $title = t('List') . sprintf(': %s', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('admin.media.list', compact('title', 'type'));
    }

    public function getData(Request $request)
    {

        $media = Media::select([
            'media.*','users.fullname as user_fullname','profiles.title as profile_name'
            ])
        ->leftJoin('users', 'users.id', '=', 'media.user_id')
        ->leftJoin('profiles', 'profiles.id', '=', 'media.profile_id');


        // si no es superadmin, filtro el lote por los perfiles que el usuario posea
        if(!auth()->user()->isSuper()){
            $media->whereIn('profile_id', auth()->user()->profiles()->lists('id')); // lo segundo es un array de ids
        }


        $datatables = app('datatables')->of($media);

        $datatables->addColumn('actions', function ($media) {
            return '
            <div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">
                <a href="' . route('media.view', [$media->name]) . '" target="_blank" class="btn btn-default"><i class="fa fa-eye"></i> View </a>
                <a href="' . route('admin.media.edit', [$media->id]) . '" class="btn btn-default"><i class="fa fa-edit"></i> Edit </a>
                <a href="' . route('admin.media.use', [$media->id]) . '" class="btn btn-default"><i class="fa fa-share-alt"></i> Use</a>
                <a href="' . route('admin.media.edit', [$media->id]) . '" class="btn btn-default" rel="delete"><i class="fa fa-trash"></i> Delete</a>
            </div>';
        });

        return $datatables->addColumn('thumbnail', function ($media) {
            return '<img src="' . Resize::img($media->thumbnail, 'listingMedia') . '"/>';
        })
            ->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->addColumn('user', '{!! $user_fullname !!}')
            ->addColumn('profile', '{!! $profile_name !!}')
            ->make(true);
    }



    public function getUse($id)
    {
        $media = Media::whereId($id)->with('info')->firstOrFail();

        $title = t('Use');

        return iView('admin.media.use', compact('media', 'title'));
    }



    // #################################
    // REB metodos que responden al routes en modo REST con verbs (PUT, PATCH, DELETE) para no usar el post en distitnas rutas y ser mas organico
    // #################################




    public function create(Request $request)
    {
        $title = 'Creating new media';

        $type = $request->get('type');

        return iView('admin.media.create', compact('title','type'));
    }


    public function put(Request $request)
    {
        $item = new Media();
        $item->title = $request->get('title');
        $item->type = $request->get('type');

        $slug = @str_slug($request->get('slug'));
        if (!$slug) {
            $slug = str_random(7);
        }
        $item->slug = $slug;

        $item->user_id = auth()->user()->id;
        $item->profile_id = auth()->user()->defaultProfile()->id;

        $item->save();

        $info_data = [
            'mime_type' => $item->type,
        ];
        $item->info()->create($info_data);

        return redirect()->route('admin.media.edit', ['id' => $item->id])->with('flashSuccess', 'Media is now crated');
    }


    public function edit($id)
    {
        $media = Media::whereId($id)->with('user', 'info')->firstOrFail();

        if(!$media->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', 'sin acceso a editar este mediao');
        }

        $title = t('Edit');

        $profiles = selectableProfiles()->lists('title','id');

        return iView('admin.media.edit', compact('media', 'title', 'profiles'));
    }


    public function patch(MediaRequest $request)
    {
        // $media = Media::whereId($request->route('id'))->firstOrFail();
        $item = Media::findOrFail($request->route('id'));

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', 'sin acceso a editar este mediao');
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

        // solo si es video de youtube o vimeo, caso contrario no se deberia tocar porque es url de la imagen en server
        $item->name = $request->get('name');

        $item->title = $request->get('title');
        $item->description = $request->get('description');
        $item->headline = $request->get('headline');
        $item->brief = $request->get('brief');

        $item->profile()->associate($request->get('profile'));

        $item->thumbnail = $request->get('thumbnail');

        $item->save();


        // if ($request->hasFile('cover_image')){
        //     if ($request->file('cover_image')->isValid()){
        //         $save = new ResizeHelper($request->file('cover_image'), 'media');
        //         list($fName, $fType) = $save->saveOriginal();
        //         $item->info->cover_image = $fName . "." . $fType;
        //         // $request->file('cover_image')->move($destinationPath, $fileName);
        //     }
        // }

        $item->info->save();


//******************************************

        if ($request->ajax() || $request->wantsJson()) {
            // return response()->json(['dato' => 'valor', 'otrodato' => 'otrovalor']);
            return new JsonResponse(t('Saved'), 200);
        }
        else{
            return redirect()->back()->with('flashSuccess', t('Saved'));
        }

    }




    public function delete($id){

        $item = Media::findOrFail($id);

        if(!$item->canHandle()){
            return redirect()->route('admin')->with('flashSuccess', 'sin acceso a editar este mediao');
        }

        $item->tasks()->detach();

        $delete = new ResizeHelper( $item->name, 'media' );
        $delete->delete();

        $item->info()->delete();
        $item->delete();

        return redirect()->route('admin.media')->with('flashSuccess', 'deleted');
    }


    // public function clearCache($id){

    //     $media = Media::whereId($id);

    //     if(!isset($media->name)){
    //        $media->name = 'default.png';
    //     }

    //     $cache = new ResizeHelper($media->name);
    //     $cache->clearCache();
    //     return 'Cache is cleared, reload the page';


    // }

    public function getBulkUpload(){
        $title = t('Add');

        return iView('admin.media.bulkupload', compact('title'));
    }

    public function postBulkUpload(Request $request){

        $output_files = [];

        // ahora el MediaController puede recibir request de uploads de cualquier form, asi que ponermos parametro archive que especifique destino
        if($request->get('archive')){
            $archive = $request->get('archive');
        }
        else{
            $archive = 'media';
        }

        // indica si la imagen, ademas de guardada va a ser ingresada en la tabla MEDIA de la base de datos
        if($request->get('fugitive')){
            $fugitive = true;
        }
        else{
            $fugitive = false;
        }

        if(!$fugitive){

            $tags = null;
            if ($request->get('tags')) {
                $tags = implode(',', $request->get('tags'));
            }

            $description = $request->get('description');

        }

        $files = [];
        if(is_array($request->file('files'))){
            $files = $request->file('files');
        }
        else{
            array_push($files, $request->file('files'));
        }

        foreach ($files as $file) {

            $original_name = $file->getClientOriginalName();
            $ext = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));

            $title = str_replace('.' . $ext, '', $original_name);

            $slug = @str_slug($title);
            if (!$slug) $slug = str_random(9);

            $mimetype = $file->getClientMimeType();

            $type = $this->getTypeOfExtension($ext);

            $info = [
                'mime_type'     => $mimetype,
                'original'      => $original_name,
            ];

            if($type=="image"){

                $save = new ResizeHelper($file, $archive);
                list($newname, $extension, $new_file_fullpath) = $save->saveOriginal($fugitive);

                $new_file_fullpath = sprintf('%s/%s', base_path(), $new_file_fullpath);

                list($width, $height) = getimagesize($new_file_fullpath);
                if($width==$height){
                    $orientation = 'square';
                }
                elseif($width<$height){
                    $orientation = 'portrait';
                }
                else{
                    $orientation = 'landscape';
                }
                $info['orientation'] = $orientation;
                $info['width'] = $width;
                $info['height'] = $height;


                // exif_read_data no puede leer en todas las imagenes.
                try {

                    $exif = @exif_read_data($new_file_fullpath, 0, true);

                    $rearea = (isset($exif['IFD0']['XRearea']) && strlen($exif['IFD0']['XRearea']) > 0 ? $exif['IFD0']['XRearea'] : null);
                    if($rearea!=null){
                        $tmp = @explode('/', $rearea);
                        $rearea = intval($tmp[0]) / intval($tmp[1]);
                    }

                    $focal = (isset($exif['EXIF']['FocalLength']) && strlen($exif['EXIF']['FocalLength']) > 0 ? $exif['EXIF']['FocalLength'] : null);
                    if($focal!=null){
                        $tmp = @explode('/', $focal);
                        $focal = intval($tmp[0]);
                    }

                    $taken_at = (isset($exif['EXIF']['DateTimeOriginal']) && strlen($exif['EXIF']['DateTimeOriginal']) > 0 ? $exif['EXIF']['DateTimeOriginal'] : null);
                    if($taken_at!=null){
                        $taken_at = strtotime($taken_at);
                    }

                    $info['camera'] = (isset($exif['IFD0']['Model']) && strlen($exif['IFD0']['Model']) > 0 ? $exif['IFD0']['Model'] : null);
                    $info['focal_length'] = $focal;
                    $info['shutter_speed'] = (isset($exif['EXIF']['ExposureTime']) && strlen($exif['EXIF']['ExposureTime']) > 0 ? $exif['EXIF']['ExposureTime'] : null);
                    $info['aperture'] = (isset($exif['COMPUTED']['ApertureFNumber']) && strlen($exif['COMPUTED']['ApertureFNumber']) > 0 ? $exif['COMPUTED']['ApertureFNumber'] : null);
                    $info['iso'] = (isset($exif['EXIF']['ISOSpeedRatings']) && strlen($exif['EXIF']['ISOSpeedRatings']) > 0 ? $exif['EXIF']['ISOSpeedRatings'] : null);
                    $info['copyright'] = (isset($exif['COMPUTED']['Copyright']) && strlen($exif['COMPUTED']['Copyright']) > 0 ? $exif['COMPUTED']['Copyright'] : null);
                    $info['rearea'] = $rearea;
                    $info['software'] = (isset($exif['IFD0']['Software']) && strlen($exif['IFD0']['Software']) > 0 ? $exif['IFD0']['Software'] : null);
                    $info['taken_at'] = $taken_at;

                } catch (Exception $e) {
                }



                if($info["mime_type"]!="image/svg+xml"){

                    $image_helper = new ImageHelper($new_file_fullpath);

                    list ($color1, $color2) = $image_helper->getDominantColors();
                    $info['color_1'] = $color1;
                    $info['color_2'] = $color2;

                    $brightness_factor = $image_helper->getOverallBrigthness();
                    $info['brightness_factor'] = $brightness_factor;

                }

                $thumbnail = $newname;

                $file_view_path = route('media.image', ['name' => $newname, 'recipe' => 'mainMedia']);


            }
            else if($type=="video"){

                $fileName = "CVR" . str_random(9);
                $newname = $fileName . "." . $ext;
                $extension = $ext;

                $real_path = sprintf('%s/%s/%s/%s', base_path(), pathUploads(), $archive, $newname);
                $thumbnail_path = sprintf('%s/%s/', base_path(), $archive);
                $thumbnail_image = sprintf('%s.%s', $fileName, 'png');

                $file->move(sprintf('%s/%s/%s', base_path(), pathUploads(), $archive), $newname);

                // https://github.com/lakshmajim/Thumbnail#installation
                // $thumbnail_status = Thumbnail::getThumbnail($real_path,$thumbnail_path,$thumbnail_image,160,128,2,$water_mark,true);
                try{

                    if(Thumbnail::getThumbnail($real_path,$thumbnail_path,$thumbnail_image)){
                        $thumbnail = $thumbnail_image;

                        // $image_helper = new ImageHelper($real);
                        // list ($color1, $color2) = $image_helper->getDominantColors();
                        // $info['color_1'] = $color1;
                        // $info['color_2'] = $color2;

                        // $brightness_factor = $image_helper->getOverallBrigthness();
                        // $info['brightness_factor'] = $brightness_factor;

                    }
                    else{
                        $thumbnail = '';
                    }

                }
                catch(\Exception $e){
                    $thumbnail = '';
                }

                $file_view_path = route('media.video', ['name' => $newname]);

            }

            sleep(1);

            $output_file = new \stdClass();


            if(!$fugitive){

                $media = new Media();
                $media->user_id = $request->user()->id;
                $media->name = $newname;
                $media->thumbnail = $thumbnail;
                $media->title = $title;
                $media->slug = $slug;
                $media->type = $type;
                $media->extension = $extension;
                $media->tags = $tags;
                $media->description = $description;

                $media->save();
                $media->info()->create($info);

                // asociar media subido a los taskos que aparezcan en el array de ids
                if ($request->get('assoc_tasks')) {
                    $assoc_tasks = explode(',', $request->get('assoc_tasks'));
                    $media->tasks()->attach($assoc_tasks);
                }

                $output_file->slug = 'aaa2';//route('media', ['id' => $media->id, 'slug' => $media->slug]);
                $output_file->title = $media->title;

            }
            else{

                $output_file->slug = '';
                $output_file->title = $original_name;

            }

            $output_file->status = 200;
            $output_file->message = 'Uploaded';
            $output_file->original = $original_name;
            $output_file->name = $newname;
            $output_file->thumbnail = $thumbnail;
            $output_file->recipes = [];

            if($request->get('custom_image_recipes')){
                $recipes = explode(',', $request->get('custom_image_recipes'));
            }
            else{
                $recipes = ['listingMedia'];
            }

            foreach ($recipes as $recipe_name) {

                // uso thumbnail y no name porque en videos se guarda ahi el cover. thumbnail es mismo que name en el resto de los casos fuera del nombre erroneo
                $resized = Resize::image($thumbnail, $recipe_name);

                $recipe = new \stdClass();
                $recipe->url = $resized->url;
                $recipe->name = $recipe_name;
                $recipe->width = $resized->width;
                $recipe->height = $resized->height;

                array_push($output_file->recipes, $recipe);
            }


            if(!$fugitive){

                // redundancia para que funcione jquery-file-uploader
                $output_file->success = 'Uploaded';
                $output_file->successSlug = $file_view_path;
                $output_file->successTitle = $title;
                $output_file->thumbnail = Resize::img($thumbnail, $recipes[0]);
                //fin de redundancia

            }

            array_push($output_files, $output_file);

        }

        $response = [];
        $response['archive'] = $archive;
        $response['fugitive'] = $fugitive;
        $response['files'] = $output_files;

        return $response;

    }


    private function getTypeOfExtension($ext){

        $mime_types = array(

            'png' => 'image',
            'jpe' => 'image',
            'jpeg' => 'image',
            'jpg' => 'image',
            'gif' => 'image',
            'bmp' => 'image',
            'ico' => 'image',
            'tiff' => 'image',
            'tif' => 'image',
            'svg' => 'image',
            'svgz' => 'image',

            'zip' => 'compressed',
            'rar' => 'compressed',

            'mp3' => 'audio',

            'qt' => 'video',
            'mov' => 'video',
            'mp4' => 'video',
            'wmv' => 'video',

            'pdf' => 'adobe',
            'psd' => 'adobe',
            'ai' => 'adobe',
            'eps' => 'adobe',
            'ps' => 'adobe',

            'doc' => 'office',
            'rtf' => 'office',
            'xls' => 'office',
            'ppt' => 'office',
            'odt' => 'office',
            'ods' => 'office',

        );

        return $mime_types[strtolower($ext)];

    }




    public function getAll(Request $request)
    {

        $term = $request->get('term');

        // $items = Media::all();
        $items = $this->mediaRepository->search($term);


        $res =  [];
        $ix=0;
        foreach ($items as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['text'] = $p->title;
            $res[$ix]['created'] = $p->created_at->diffForHumans();
            $res[$ix]['slug'] = $p->slug;
            $res[$ix]['image'] = Resize::img($p->thumbnail, 'listingMedia');
            $ix++;
        }

        return json_encode($res);
    }


}
