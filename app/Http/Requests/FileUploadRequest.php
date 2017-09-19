<?php
namespace App\Http\Requests;

use App\Http\Requests\Request;

class FileUploadRequest extends Request {

	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			// 'file' => 'required|max:10000|mimes:doc,docx';
		];
	}

	public function messages()
	{
	    return [
	        // 'file.required' => 'Please, select a file to upload.',
	        // 'file.max' => 'The selected file is too big.'
	    ];
	}

}