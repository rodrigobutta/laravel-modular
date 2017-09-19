<?php
namespace App\Modules\Portfolio;

use App\Modules\Portfolio\PortfolioModel;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface PortfolioRepositoryInterface{

    public function getById($id);

    public function getBySlug($slug);

    public function getAll();

    public function incrementViews($portfolio);

    public function search($input);

    public function delete($id);

}
