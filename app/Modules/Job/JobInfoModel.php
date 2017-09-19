<?php
namespace App\Modules\Job;

use Illuminate\Database\Eloquent\Model;

class JobInfoModel extends Model{

    public $timestamps = false;

    protected $table = 'job_info';

    protected $fillable = ['cover_image', 'cover_title'];

}