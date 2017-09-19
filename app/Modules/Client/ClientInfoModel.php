<?php
namespace App\Modules\Client;

use Illuminate\Database\Eloquent\Model;

class ClientInfoModel extends Model{

    public $timestamps = false;

    protected $table = 'client_info';

    // protected $fillable = ['cover_image', 'cover_title'];

}