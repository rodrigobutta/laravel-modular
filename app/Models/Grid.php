<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grid extends Profiled
{

    protected $table = 'grids';
    protected $dates = ['deleted_at'];

    protected $casts = [
        'shared' => 'boolean',
    ];

    public function sections(){
        return $this->hasMany(Section::class)->orderBy('order', 'asc');
    }

    public function isEmpty(){

        if(sizeof($this->sections)==0){
            return true;
        }
        else{
            return false;
        }

    }

}
