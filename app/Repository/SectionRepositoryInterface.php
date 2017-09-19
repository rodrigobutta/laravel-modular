<?php
namespace App\Repository;

use App\Models\SectionType;
use App\Models\Section;
use App\Models\SectionContent;
use Auth;
use Cache;
use DB;
use File;
use Str;

interface SectionRepositoryInterface
{

    public function getById($id);

    public function searchContent($input);

}


