<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';
    const CREATED_AT = 'fecha';
    const UPDATED_AT = null;


    public function actions(){
         return $this->belongsToMany('App\Models\TaskAction', 'contact_x_task_action', 'contact_id', 'task_action_id');
    }

    public function companyCategory(){
        return $this->hasOne(CompanyCategory::class, 'id', 'company_category_id');
    }

    public function country(){
        return $this->hasOne(Country::class, 'id', 'countries_id');
    }

    public function state(){
        return $this->hasOne(State::class, 'id', 'states_id');
    }

    public function city(){
        return $this->hasOne(City::class, 'id', 'cities_id');
    }




    public function getCompanyCategoryDescription(){

        if($this->companyCategory){
            return $this->companyCategory->name;
        }
        else{
            return '';
        }

    }

    public function getCountryDescription(){

        if($this->country){
            return $this->country->name;
        }
        else{
            return '-';
        }

    }

    public function getStateDescription(){

        if($this->state){
            return $this->state->name;
        }
        else{
            return '-';
        }

    }

    public function getCityDescription(){

        if($this->city){
            return $this->city->name;
        }
        else if($this->city_txt){
            return $this->city_txt;
        }
        else{
            return '';
        }

    }

    public function getTypeDescription(){

        if($this->type){
            switch ($this->type) {
                // case 'task':
                //     return t('Task');
                //     break;

                // case 'category':
                //     return t('Family');
                //     break;

                // case 'download':
                //     return t('Download');
                //     break;

                case 'contact':
                    return t('Contact');
                    break;

                default:
                    return '';
                    break;
            }
        }
        else{
            return t('General');
        }

    }

}
