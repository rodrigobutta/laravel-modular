<?php
namespace App\Modules\Area;

use App\Modules\Area\AreaModel;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface AreaRepositoryInterface{

    public function getById($id);

    public function getBySlug($slug);

    public function getAll();

    public function incrementViews($area);

    public function search($input);

    public function delete($id);

}
