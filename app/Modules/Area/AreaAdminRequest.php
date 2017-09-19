<?php

namespace App\Modules\Area;

// reb para el override del response, por tema ajax 422
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Request;
use Carbon\Carbon;

class AreaAdminRequest extends Request
{


    public function authorize(){
        return true;
    }

    public function rules()
    {
        return [
            // 'files'          => ['required', 'area', 'mimes:jpeg,jpg,bmp,png,gif', 'max:' . (int)siteSettings('maxAreaSize') * 1000],
            'title'    => ['required'],
            'slug'    => ['required'],
            // 'categories'    => ['required'],
            // 'cover_image' => ['image','dimensions:min_width=1000,min_height=200'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'El campo de título es obligatorio',
            'slug.required' => 'El campo slug es necesario para ser utilizado como nombre dentro de la URL',
            // 'categories.required' => 'El elemento debe pertenecer al menos a una familia',
        ];
    }


}
