<?php
namespace App\Modules\Client;

use App\Modules\Client\ClientModel;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface ClientRepositoryInterface{

    public function getById($id);

    public function getBySlug($slug);

    public function getAll();

    public function incrementViews($client);

    public function search($input);

    public function delete($id);

}
