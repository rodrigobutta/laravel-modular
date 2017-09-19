<?php
namespace App\Modules\Portfolio;

use Illuminate\Database\Eloquent\Model;

class PortfolioInfoModel extends Model{

    public $timestamps = false;

    protected $table = 'portfolio_info';

    protected $fillable = ['cover_image', 'cover_title'];

}