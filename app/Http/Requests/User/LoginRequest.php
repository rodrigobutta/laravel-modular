<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Session;

class LoginRequest extends Request
{

    public function authorize()
    {
        if (auth()->check()) {
            return false;
        }

        return true;
    }


    public function rules()
    {

        // return [
        //     'username'             => ['required'],
        //     'password'             => ['required'],
        //     'g-recaptcha-response' => ['required', 'recaptcha']
        // ];

        return [
            'username' => ['required'],
            'password' => ['required']
        ];
    }
}
