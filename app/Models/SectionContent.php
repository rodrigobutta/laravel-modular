<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SectionContent extends Profiled
{
	use SoftDeletes;

    protected $table = 'section_contents';

    protected $softDelete = true;

}
