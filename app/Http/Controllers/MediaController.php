<?php
namespace App\Http\Controllers;

use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Helpers\VideoStream;

use App\Repository\MediaRepositoryInterface;
use App\Http\Requests\Media\EditRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;


class MediaController extends Controller
{

    public function __construct(MediaRepositoryInterface $media)
    {
        $this->media = $media;
    }


    public function getMedia(Request $request, $name, $recipe = null){

        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if($ext=='mp4'){
            return $this->getVideo($request, $name);
        }
        else{
            return $this->getImage($request, $name, $recipe);
        }

    }

    public function getImage(Request $request, $name, $recipe = null){

        if ($recipe==null) {
            $recipe = 'mainMedia';
        }

        if ($request->exists('download')) {
            return response()->download(Resize::imgreal($name,$recipe));
        }
        else{
            return response()->file(Resize::imgreal($name,$recipe));
        }

    }

    public function getVideo(Request $request, $name){

        if ($request->exists('download')) {
            return response()->download(getOriginalMediaPathByName($name));
        }
        else{
            $stream = new VideoStream(getOriginalMediaPathByName($name));
            $stream->start();
        }

    }

    public function getPlayer(Request $request, $name){

        $mime = "video/mp4"; // TODO sacar el mime type automaticamente

        $video = $name;

        return iView('media.player', compact('video', 'mime'));
    }

    public function download($id)
    {
        $id = Crypt::decrypt($id);
        $media = $this->media->getById($id);

        $file = new ResizeHelper($media->name, 'uploads/media');
        $file = $file->download();

        return response()->download($file, $media->slug . '.' . $media->type, ['content-type' => 'image/jpg'])->deleteFileAfterSend(true);
    }

    public function getByTags($tag)
    {
        $media = $this->media->getByTags($tag);
        $title = sprintf('%s %s', t('Tagged With'), ucfirst($tag));

        return iView('gallery.index', compact('media', 'title'));
    }

    public function search(Request $request)
    {
        $this->validate($request, ['q' => 'required']);

        $media = $this->media->search($request->get('q'), $request->get('category'), $request->get('timeframe'));

        $title = sprintf('%s %s', t('Searching for'), ucfirst($request->get('q')));

        return iView('gallery.index', compact('title', 'media'));
    }

}
