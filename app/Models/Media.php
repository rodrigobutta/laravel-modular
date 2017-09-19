<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Profiled
{
    // use SoftDeletes;

    protected $table = 'media';
    protected $softDelete = false;
    protected $dates = ['deleted_at'];

    public function info(){
        return $this->hasOne(MediaInfo::class, 'media_id');
    }

    public function getOriginalPath(){
        return sprintf('%s/uploads/media/%s', base_path(), $this->name);
    }

}
