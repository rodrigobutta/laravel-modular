<?php

namespace App\Http\Requests\Admin;

// reb para el override del response, por tema ajax 422
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Request;
use Carbon\Carbon;

class BranchRequest extends Request
{


    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'title'    => ['required'],
            'slug'    => ['required'],
            'categories'    => ['required'],
            // 'countries'    => ['required'],
            // 'states'    => ['required'],
            // 'address'    => ['required'],
            // 'email'    => ['email']
        ];
    }


    public function messages()
    {
        return [
            'required' => 'El camo ":attribute" es obligatorio.',
            'email.email' => 'El e-mail ingresado no es válido.',
            'categories.required' => 'El elemento debe pertenecer al menos a una categoría.',
        ];
    }


}
