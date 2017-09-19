<?php
namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{

    use Authenticatable, Authorizable, CanResetPassword, SoftDeletes;

    protected $table = 'users';

    protected $hidden = ['password', 'email_confirmation', 'remember_token'];

    protected $softDelete = true;

    protected $dates = ['deleted_at', 'featured_at'];

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getReminderEmail()
    {
        return $this->email;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

    public function scopeConfirmed()
    {
        return static::whereNotNull('confirmed_at');
    }

    public function getFullnameAttribute($value)
    {
        return ucfirst($value);
    }

    public function isSocial(){

        if($this->fbid || $this->gbid){
            return true;
        }
        else{
            return false;
        }

    }

    public function isApproved(){
        return $this->confirmed_at?true:false;
    }


    // public function authService(){

    //     if($this->fbid){
    //         return 'facebook';
    //     }
    //     else if($this->gbid){
    //         return 'google';
    //     }
    //     else if($this->gbid){
    //         return 'form';
    //     }

    // }


    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }


    public function profiles()
    {
        return $this->belongsToMany('App\Models\Profile', 'user_x_profile', 'user_id', 'profile_id');
    }

    public function actions($table)
    {
        if($table == 'task') {
            return $this->belongsToMany('App\Models\TaskAction', 'task_followers', 'user_id', 'profile_id');
        }
        elseif ($table == 'family') {
            return $this->belongsToMany('App\Models\TaskAction', 'task_category_followers', 'user_id', 'profile_id');
        }
    }


    public function isSuper(){
        return $this->profiles()->where('profile_id', 1)->first();
    }

    public function isAdmin(){
        if($this->isSuper()){
            return true;
        }
        return $this->profiles()->where('profile_id', 2)->first();
    }

    public function defaultProfile(){
        return $this->profiles()->first();
    }


}
