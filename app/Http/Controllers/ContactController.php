<?php
namespace App\Http\Controllers;

use Mail;
// use Mailer as Mail;
// use Illuminate\Mail\Mailer as Mail;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\LocationRequest;
use App\Models\Contact;
use App\Models\Country;
use App\Models\State;
use App\Models\City;
use App\Models\Task;
use App\Models\TaskCategory;
use App\Models\CompanyCategory;

use App\Repository\LocationRepositoryInterface;
use App\Repository\TaskRepositoryInterface;
use App\Repository\TaskCategoryRepositoryInterface;

class ContactController extends Controller {


    public function __construct(TaskRepositoryInterface $p,
                                TaskCategoryRepositoryInterface $pc,
                                LocationRepositoryInterface $location)
    {
        $this->locRepo = $location;
        $this->taskRepository = $p;
        $this->taskCategoryRepository = $pc;
    }


    //LOCATION METHODS
    public function getStatesByCountryArr(LocationRequest $request)
    {
        $country_id = $request->get('id');
        $states = $this->locRepo->getPublishedStatesByCountry($country_id);
        $states_array = array();
            foreach ($states as $key => $value) {
                $states_array[$value->id] = $value->name;
            }

        return $states_array;
    }

    public function getCitiesByStateArr(LocationRequest $request)
    {
        $state_id = $request->get('id');
        $cities = $this->locRepo->getCitiesByState($state_id);
        $cities_array = array();
            foreach ($cities as $key => $value) {
                $cities_array[$value->id] = $value->name;
            }

        return $cities_array;
    }


    // solo sirve para landing de contacto
	public function createForm(){
		$title = t('Contact');
		return iView('contact.contact', compact('title'));
	}

	public function storeData(ContactRequest $request){
      $type = $request->input('type', '');
    	$name = $request->input('name', '');
      $surname = $request->input('surname', '');
      $company = $request->get('company', '');
      $company_category = $request->input('company_category', null);
    	$email = $request->input('email', '');
      $phone = $request->input('phone', '');


      /*
      EK: seteo defaults para que no de error
      */
      $country_name = '';
      $state_name = '';
      $city_name = '';
      $categories = [];



        if($request->get('countries') && is_numeric($request->get('countries'))) {
            $country = $request->get('countries');
            $country_name = $this->locRepo->getCountryById($country)->name;
        }

        if($request->get('txt_states')) {
            $state_name = $request->get('txt_states');
        } else {
            if($request->get('states') && is_numeric($request->get('states'))) {
                $state = $request->get('states');
                $state_name = $this->locRepo->getStateById($state)->name;
            }
        }

        if($request->get('cities') && is_numeric($request->get('cities'))) {
            $city = $request->get('cities');
            $city_name = $this->locRepo->getCityById($city)->name;
        } else{
            if($request->get('txt_cities')) {
                $city_name = $request->get('txt_cities');
            }
        }


    	$mail_message = $request->input('message', ''); /* clean() es una función de Purifier que convierte text2html */

    	//SAVE TO DB
        $item = new Contact;

        $item->name = $name;
        $item->surname = $surname;
        $item->email = $email;
        $item->phone = $phone;

        $item->type = $type;

        $item->countries_id = isset($country) ? $country : NULL;
        $item->states_id = isset($state) ? $state : NULL;
        $item->cities_id = isset($city) ? $city : NULL;
        $item->city_txt = isset($city_name) ? $city_name : NULL;

        $item->company = isset($company) ? $company : NULL;
        $item->company_category_id = isset($company_category) ? $company_category : NULL;
        // $item->area = isset($area) ? $area : NULL;

        $item->message = $mail_message;

        $item->save();

        $actions = [];
        if ($request->get('actions')) {
            $actions = $request->get('actions');
            $item->actions()->sync($actions);
        }

        $followers_emails[] = env('MAIL_FROM', 'rbutta@gmail.com');


        $item->save();


        $mail_template = ($type == 'contact') ? 'emails.contact.longform' : 'emails.contact.shortform';


        $mail_actions = array_map(function($action){
           switch($action) {
             case 1:
               return 'Alquiler';
               break;
            case 4:
               return 'Venta usado';
               break;
            case 3:
               return 'Venta nuevo';
               break;
          }
        }, $actions);

        $subject = 'email de contacto';

        $mail_data = [
           'name' => $name,
           'surname' => $surname,
           'company' => $company,
           'company_category' => ($company_category != '') ? CompanyCategory::find($company_category)->name : '',
           'email' => $email,
           'phone' => $phone,
           'country' => $country_name,
           'state' => $state_name,
           'city' => $city_name,
           'subject' => $subject,
           'actions' => implode(', ', $mail_actions),
           'mail_message' => $mail_message
        ];



        // //SEND MAIL
        // try {

        //   Mail::send(
        //       $mail_template, //View con el cuerpo del mail
        //       $mail_data, //Parámetros pasados al view
        //       function ($msg) use ($name, $surname, $email, $followers_emails) { //No olvidar pasar con 'use' las variables usadas dentro
        //           $msg->to($followers_emails);
        //           $msg->from(env('MAIL_FROM', 'muypunch@mailfrom.com'),env('MAIL_FROM_NAME', 'Ego De'));
        //           $msg->replyTo($email, $name . ' ' . $surname);
        //           $msg->subject('Nuevo contacto');
        //       }
        //   );

        // } catch (Exception $e) {

        //   $response = "El mensaje ha sido enviado con éxito. NMS";
        //   return response($response);

        // }


        $response = "El mensaje ha sido enviado con éxito.";

        //RETURN RESPONSE
        return response($response);
    }

}
