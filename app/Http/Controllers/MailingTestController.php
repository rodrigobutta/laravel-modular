<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;


class MailingTestController extends Controller {



    public function long() {

    	$mail_data = [
           'name' => 'Juan Julio',
           'surname' => 'Spinetto',
           'company' => 'Agencia EGO',
           'company_category' => 'Digital',
           'email' => 'julio.spinetto@agenciaego.com',
           'phone' => '45784578',
           'country' => 'Argentina',
           'state' => 'Ciudad de Buenos Aires',
           'city' => 'Villa Crespo',
           'categories' => 'Camiones Articulados',
           'subject' => 'Camiones Articulados, Compresores estaticos',
           'actions' => 'Alquiler, Compra Usado',
           'mail_message' => 'Me pongo en contacto con uds'
        ];


        return iView('emails.contact.longform', $mail_data);
    }

    public function short() {

    	$mail_data = [
           'name' => 'Juan Julio',
           'surname' => 'Spinetto',
           'company' => 'Agencia EGO',
           'company_category' => 'Digital',
           'email' => 'julio.spinetto@agenciaego.com',
           'phone' => '45784578',
           'country' => 'Argentina',
           'state' => 'Ciudad de Buenos Aires',
           'city' => 'Villa Crespo',
           'categories' => 'Camiones Articulados, Compresores estaticos',
           'subject' => 'Compresor ES-L6.5',
           'actions' => 'Alquiler, Compra Usado',
           'mail_message' => 'Me pongo en contacto con uds'
        ];


        return iView('emails.contact.shortform', $mail_data);
    }

    public function download() {

    	$mail_data = [
           'name' => 'Juan Julio',
           'surname' => 'Spinetto',
           'company' => 'Agencia EGO',
           'company_category' => 'Digital',
           'email' => 'julio.spinetto@agenciaego.com',
           'phone' => '45784578',
           'country' => 'Argentina',
           'state' => 'Ciudad de Buenos Aires',
           'city' => 'Villa Crespo',
           'categories' => 'Camiones Articulados, Compresores estaticos',
           'subject' => 'Compresor ES-L6.5',
           'actions' => 'Alquiler, Compra Usado',
           'mail_message' => 'Me pongo en contacto con uds'
        ];


        return iView('emails.contact.download', $mail_data);
    }



}
