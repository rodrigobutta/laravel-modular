<?php
namespace App\Http\Requests\Admin;

use Illuminate\Http\JsonResponse;
use App\Http\Requests\Request;


class ContactsRequest extends Request {

	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [];
	}

}