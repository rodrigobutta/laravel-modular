<?php
namespace App\Helpers;

use App\Models\Image;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\NamespacedItemResolver;
use Intervention\Image\Facades\Image as ImageResize;
use Symfony\Component\HttpFoundation\File\UploadedFile;

// reb http://image.intervention.io/api/greyscale para jugar con las imagenes que se generan

class ResizeHelper extends NamespacedItemResolver
{
    protected $cacheDir = 'cache';

    private $source;
    private $width;
    private $height;
    private $type;
    private $recipe;

    public function __construct($name, $dir = null, $recipe = '', $width = null, $height = null, $type = 'fit', $watermark = false, $bnw = false, $couldbegif = false)
    {

        if(!isset($name)){
           $name = '_default.png';
        }
        $this->name = $name;

        $this->extension = strtolower(pathinfo($this->name, PATHINFO_EXTENSION));
        $this->filename = str_replace('.'.pathinfo($this->name, PATHINFO_EXTENSION),'',$this->name);
        $this->dir = sprintf('%s', $dir);
        $this->source = sprintf('%s/%s', $dir, $name);
        $this->recipe = $recipe;
        $this->width = $width;
        $this->height = $height;
        $this->type = $type;
        $this->watermark = $watermark;
        $this->bnw = $bnw;
        $this->couldbegif = $couldbegif;
        $this->key = $this->createKey($this->source, $this->recipe);
    }

    protected function createKey($source, $recipe = 'default'){
        return sprintf('%s.%s', substr(hash('sha1', $source), 0, 8), $recipe);
    }

    public function resize($inpath = false, $with_properties = false){

        $img = new \stdClass();

        $rare_file_type = false;

        // soportar gifs animados (sin tocar nada si la receta indica que mantenga original, por ejemplo mainMedia)
        if($this->extension=='svg'){
            $rare_file_type = true;
            $real_path = sprintf('%s/%s', public_path(), $this->absoluteSoucePath());
            $img->url = asset($this->absoluteSoucePath()) ;
        }
        else if($this->extension=='gif' && $this->couldbegif){
            // $rare_file_type = true;
            $real_path = sprintf('%s/%s', public_path(), $this->absoluteSoucePath());
            $img->url = asset($this->absoluteSoucePath()) ;
        }
        else{
            $real_path = sprintf('%s/%s', public_path(), $this->getCachedFileAbsolutePath());
            $img->url = $this->checkIfCacheExits($inpath);
        }
        $img->real = $real_path;

        if($with_properties){
            
            // si es un svg o archivo raro, no saco el tamaño de la imagem
            if($rare_file_type){
                $img->width = 0;
                $img->height = 0;
            }
            else{
                list($w, $h) = getimagesize($real_path);
                $img->width = $w;
                $img->height = $h;
            }
            
        }

        return $img;
    }

    protected function checkIfCacheExits($inpath = false)
    {

        if (config('filesystems.default') == 'local') {
            $this->createCache();
            return $this->url($inpath);
        }

        if (Cache::store('image')->has($this->key)) {
            return Cache::store('image')->get($this->key);
        }

        return Cache::store('image')->rememberForever($this->key, function () {
            $this->createCache();
            return $this->url();
        });

    }

    protected function createCache(){

        if (Storage::exists($this->getCachedFileAbsolutePath()) == false) {

            if (Storage::exists($this->absoluteSoucePath())) {
                $this->createCacheDir();
                $content = Storage::read($this->absoluteSoucePath());
            } else {
                // $content = Storage::read(pathUploads() . '/assets/placeholder.png');
                $content = Storage::read('resources/assets/images/default.png');
            }

            list($image, $filename) = $this->doResize($content);
            Storage::put($filename, (string)$image, 'public');
        }

    }

    protected function getCachedFileAbsolutePath(){

        $name = explode('.',$this->name);
        $res = sprintf('%s/%s/%s/%s.%s', pathUploads(), 'cache', $name[0], $this->recipe, $name[1]);

        return $res;
    }


    private function absoluteSoucePath(){

        $res = sprintf('%s/%s', pathUploads(), $this->source);

        return $res;
    }

    protected function createCacheDir(){

        $path = $this->getCacheDir();

        if (Storage::exists($path)) {
            return $path;
        }
        Storage::makeDirectory($path);

        return $path;
    }

    protected function getCacheDir(){

        $name = explode('.',$this->name);
        $res = sprintf('%s/%s/%s', pathUploads(), 'cache', $name[0]);

        return $res;
    }

    protected function doResize($content){

        if ($this->type == 'resize') {
            $image = ImageResize::make($content)->resize($this->width, $this->height, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
        } else {
            $image = ImageResize::make($content)->fit($this->width, $this->height);
        }

        if($this->bnw){
            $image = $image->greyscale();
        }

        if ($this->watermark == true && env('WATERMARK') == true) {
            $image->insert(pathUploads() . '/assets/watermark.png', env('WATERMARK_POSITION', 'bottom-right'), 0, 0);
        }

        $image->interlace();
        $image = (string)$image->encode($this->resolveMime($image), 100);
        $filename = $this->getCachedFileAbsolutePath();

        return [$image, $filename];
    }

    private function resolveMime($image)
    {
        if ($image instanceof UploadedFile) {
            $mime = str_replace('image/', '', $image->getMimeType());
        } else {
            $mime = str_replace('image/', '', $image->mime);
        }
        if ($mime == 'jpg') {
            return 'jpeg';
        }

        return $mime;
    }


    private function resolveExtension($image)
    {
        if ($image instanceof UploadedFile) {
            $name = $image->getClientOriginalName();
        } else {
            $name = $image->name;
        }
        
        $res = pathinfo($name, PATHINFO_EXTENSION);

        return $res;
    }

    protected function url($inpath = false)
    {

        if (config('filesystems.default') == 'local') {

            if($inpath){
                return  sprintf('%s/%s', base_path(), $this->getCachedFileAbsolutePath());
            }
            else{
                return asset($this->getCachedFileAbsolutePath());
            }


        }

        // if (config('filesystems.default') == 's3') {
        //     if (config('filesystems.disks.s3.distribution_url')) {
        //         return sprintf('//%s%s', config('filesystems.disks.s3.distribution_url'),
        //             $this->getCachedFileAbsolutePath());
        //     }

        //     return sprintf('//%s.s3.amazonaws.com%s', config('filesystems.disks.s3.bucket'),
        //         $this->getCachedFileAbsolutePath());
        // }

        // if (config('filesystems.default') == 'dropbox') {
        //     return sprintf('//dl.dropboxusercontent.com/u/%s/%s',
        //         config('filesystems.disks.dropbox.userId'),
        //         str_replace('Public', '', $this->getCachedFileAbsolutePath()));
        // }

        // if (config('filesystems.default') == 'copy') {
        //     $link = Storage::getDriver()->getAdapter()->getClient()->createLink($this->getCachedFileAbsolutePath());

        //     return sprintf('%s/%s', $link->url, $link->name);
        // }
    }

    public function saveOriginal($fugitive = false){

        $hashname = $this->newFileName($fugitive);

        $mime = $this->resolveMime($this->name);

        $ext = $this->resolveExtension($this->name);

        $filename = sprintf('%s.%s', $hashname, $ext);

        // nombre del archivo a guardar
        $filefullpath = sprintf('%s/%s/%s', pathUploads(), $this->dir, $filename);

        Storage::put($filefullpath,file_get_contents($this->name));

        return [$filename, $mime, $filefullpath];
    }

    private function newFileName($fugitive = false, $sitecode = null){

        if($sitecode == null){
            $siteCode = strtoupper(siteSettings('siteCode'));
        }

        $str = $siteCode . ($fugitive ? "FUG" : "MED") . str_random(10);
        return $str;
    }


    public function delete(){

        $file_path = sprintf('%s/%s', pathUploads(), $this->source);

        if (Storage::exists($file_path)) {
            Storage::delete($file_path);
        }

        if (Storage::exists($this->getCacheDir())) {
            Storage::deleteDirectory($this->getCacheDir());
        }

        $this->clearCacheKeys();

        return true;

    }

    public function duplicate(){

        // genero nombre alias para la copia cuidando siempre mantener los primeros caracteres para no generar nombres kilometricos y recien ahi sumar sufijo random
        $copy = sprintf('%s%s.%s', substr($this->filename, 0, 15), str_random(5), $this->extension);

        $source_path = sprintf('%s/%s', pathUploads(), $this->source);
        $copy_path = sprintf('%s/%s/%s', pathUploads(), $this->dir, $copy);
        if (Storage::exists($source_path)) {
            Storage::copy($source_path,$copy_path);
            return $copy;
        }

        return $this->name;
    }

    public function clearCacheKeys(){

        $sizes = Resize::getSizes();
        foreach ($sizes as $size) {
            $key = $this->createKey($this->source, $size['recipe']);
            Cache::store('image')->forget($key);
        }

    }

    public function clearCache(){

        if (Storage::exists($this->getCacheDir())) {
            Storage::deleteDirectory($this->getCacheDir());
        }
        $this->clearCacheKeys();

        return true;
    }


    public function download()
    {
        $file = Storage::read($this->absoluteSoucePath());
        $image = ImageResize::make($file);
        $mime = substr($this->source, strrpos($this->source, '.') + 1);
        $mime = ($mime == 'jpeg' ? 'jpg' : $mime);
        if (env('WATERMARK') == true) {
            $image->insert(pathUploads() . '/assets/watermark.png', env('WATERMARK_POSITION', 'bottom-right'), 10, 10);
        }
        $filename = sprintf('%s/%s.%s', 'cache', str_random(), $mime);
        Storage::drive('local')->put($filename, (string)$image->encode($mime, 100), 'public');

        return $filename;
    }
}
