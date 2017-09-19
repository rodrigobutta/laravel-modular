<?php
namespace App\Modules\Job;

use App\Modules\Job\JobModel;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface JobRepositoryInterface{

    public function getById($id);

    public function getBySlug($slug);

    public function getAll();

    public function incrementViews($job);

    public function search($input);

    public function delete($id);

}
