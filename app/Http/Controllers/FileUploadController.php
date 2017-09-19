<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Requests\FileUploadRequest;
use App\Http\Controllers\Controller;

use App\Models\Task;


class FileUploadController extends Controller
{

    public function display(){
        $title = 'Upload';
        return iView('upload', compact('title'));
    }

    public function uploadDocument(FileUploadRequest $request){
        $file = $request->file;
        $archive = $request->archive;
        $file_size = $file->getClientSize();
        $max_size = $request->maxSize;
        $file_ext = $file->getClientOriginalExtension();
        $store = true;
        $status = 0;
        $response = array();

        //Validate size
        if($file_size > $max_size) {
            $store = false;
            $status = 1;
        }

        //Validate ext
        if($request->acceptedExt) {
            $ext = explode(',', $request->acceptedExt);
            if(!in_array($file_ext, $ext)) {
                $store = false;
                $status = 2;
            }
        }

        //Return if valid
        if($store) {
            //Sanitize / rename
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $new_filename = str_slug($name).'-'.str_random(3).'.'.$file_ext;

            //Move Uploaded File
            if($file->move('uploads/'.$archive ,$new_filename)) {
                $status = 0;
            }
            else {
                $status = 3;
            }


            $response['status'] = $status;
            $response['file'] = $new_filename;
            $response['path'] = $archive.'/'.$new_filename;
            $resp = json_encode($response);
        }
        else {
            $response['status'] = $status;
            $resp = json_encode($response);
        }

        return $resp;
    }

}
