<?php
namespace App\Http\Requests;

use App\Http\Requests\Request;

class ContactRequest extends Request {

	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'name' => 'required',
			'surname' => 'required',
			'email' => 'required|email',
			'phone' => 'required',
			// 'message' => 'required'
		];
	}

	public function messages()
	{
	    return [
	        'name.required' => 'El campo Nombre es obligatorio.',
	        'surname.required' => 'El campo Apellido es obligatorio.',
	        'phone.required' => 'El campo Teléfono es obligatorio.',
	        'email.required' => 'El campo E-mail es obligatorio.',
	        'email.email' => 'El email ingresado no es válido.',
	        // 'message.required'  => 'El campo Mensaje es obligatorio.'
	    ];
	}

}