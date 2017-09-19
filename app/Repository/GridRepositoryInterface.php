<?php
namespace App\Repository;

use App\Models\Grid;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface GridRepositoryInterface
{

    public function getById($id);

    public function search($input);

    public function delete($id);

}


