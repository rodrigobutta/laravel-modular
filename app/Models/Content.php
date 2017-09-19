<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Profiled
{

    protected $table = 'contents';
    protected $dates = ['deleted_at'];

}
