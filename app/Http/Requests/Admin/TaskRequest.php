<?php

namespace App\Http\Requests\Admin;

// reb para el override del response, por tema ajax 422
use Illuminate\Http\JsonResponse;

use App\Http\Requests\Request;
use Carbon\Carbon;

class TaskRequest extends Request
{


    public function authorize(){
        return true;
    }

    public function rules()
    {
        return [
            // 'files'          => ['required', 'task', 'mimes:jpeg,jpg,bmp,png,gif', 'max:' . (int)siteSettings('maxTaskSize') * 1000],
            'title'    => ['required'],
            'slug'    => ['required'],
            'sku'    => ['required'],
            'categories'    => ['required'],
            // 'cover_image' => ['image','dimensions:min_width=1000,min_height=200'],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'El campo de título es obligatorio',
            'slug.required' => 'El campo slug es necesario para ser utilizado como nombre dentro de la URL',
            'sku.required' => 'El campo de modelo es obligatorio y puede ser igual al del título',
            'categories.required' => 'El elemento debe pertenecer al menos a una familia',
            // 'cover_image.image' => 'no parece ser una imagen',
            // 'cover_image.dimensions' => 'el tamaño de la foto de cover es invalido',
        ];
    }


}
