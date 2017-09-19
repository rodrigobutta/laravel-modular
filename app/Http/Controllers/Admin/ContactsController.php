<?php
namespace App\Http\Controllers\Admin;

use Mail;
use Excel;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Repository\ContactsRepositoryInterface;
use App\Repository\LocationRepositoryInterface;
// use App\Http\Requests\Request;
use App\Http\Requests\Admin\ContactsRequest;

use Illuminate\Http\Request;


class ContactsController extends Controller
{

    public function __construct(ContactsRepositoryInterface $contRepo, LocationRepositoryInterface $locRepo)
    {
        $this->contRepo = $contRepo;
        $this->locRepo = $locRepo;
    }


    public function getList(Request $request){

        $type = $request->get('type');
        $title = t('Contacts') . sprintf(': %s', ucfirst($type));


        // $items = Contact::orderBy('fecha', 'desc')->whereType('task')->get();
        $items = Contact::orderBy('fecha', 'desc');

        switch ($request->get('type')) {
            // case 'task':
            //     $items->whereType('task');
            //     break;
            // case 'category':
            //     $items->whereType('category');
            //     break;
            // case 'download':
            //     $items->whereType('download');
            //     break;
            case 'contact':
                $items->whereType('contact');
                break;
            default:
                // $items->approved();
        }

        $items = $items->get();

        // $items =  $this->contRepo->getFollowing();

        foreach ($items as $item) {
            $alert = false;

            $item->state_description = $item->getStateDescription();
            $item->type_description = $item->getTypeDescription();

            if($item->read == 1 && $item->replied == 1){
                $item->status = "<i class=\"fa fa-reply text-success\"></i>";
            }
            else if($item->read == 1 && $item->replied == 0){
                $item->status = "<i class=\"fa fa-envelope-open-o\"></i>";
            }
            else {
                $item->status = "<i class=\"fa fa-envelope\"></i>";
                $alert = true;
            }

            $item->fullName = ltrim($item->surname . ', ' . $item->name,', ');


            $item->actions_description = '';
            if(count($item->actions)){
                foreach ($item->actions as $key => $i) {

                    // if($i->depth()>0){
                    //     $item->family .= "<i class=\"fa fa-sitemap\"></i>&nbsp;" . $i->getRootCategory()->name . " (" . $i->name . ")"  . "<br>";
                    // }
                    // else{
                        $item->actions_description .= "<i class=\"fa fa-tag\"></i>&nbsp;" . $i->title . "<br>";
                    // }

                }

            }


            $item->dateForm = $item->fecha->diffForHumans();

            $item->buttons = '<div class="btn-group pull-right btn-group-sm" role="group" aria-label="Actions">';
            $item->buttons .= "<a href=\"#\" target=\"_blank\" class=\"btn btn-danger btn-delete btn-sm pull-right \" data-id=\"".$item->id."\"><i class='fa fa-trash'></i> " . t("Delete") . "</a>";
            $item->buttons .= "<a href=\"#\" target=\"_blank\" class=\"btn btn-success btn-view btn-sm pull-right \" data-id=\"".$item->id."\"><i class='fa fa-eye'></i> " . t("View") . "</a>";
            $item->buttons .= '</div>';

            if($alert){
                // $item->dateForm = '<strong>' . $item->dateForm . '</strong>';
                // $item->fullName = '<strong>' . $item->fullName . '</strong>';
                // $item->states_id = '<strong>' . $item->states_id . '</strong>';
                // $item->family = '<strong>' . $item->family . '</strong>';
            }
            else{
                // $item->actions .= "<a href=\"#\" target=\"_blank\" class=\"btn btn-danger btn-delete btn-sm pull-right \" data-id=\"".$item->id."\"><i class='fa fa-trash'></i> " . t("Delete") . "</a>";
            }

        }

        return iView('admin.contacts.list', compact('title', 'items', 'type'));
    }


    public function getById(ContactsRequest $request) {

        $contact = $this->contRepo->getById($request->get('id'));

        $contact->country_description = $contact->getCountryDescription();
        $contact->company_category_description = $contact->getCompanyCategoryDescription();
        $contact->state_description = $contact->getStateDescription();
        $contact->city_description = $contact->getCityDescription();

        $contact->dateForm = $contact->fecha->diffForHumans();
        $contact->fullName = ltrim($contact->surname . ', ' . $contact->name,', ');

        $contact->family = '';
        if(count($contact->categories)){
            foreach ($contact->categories as $key => $i) {

                if($i->depth()>0){
                    $contact->family .= "" . $i->getRootCategory()->name . " (" . $i->name . ")"  . ", ";
                }
                else{
                    $contact->family .= "" . $i->name . ", ";
                }

            }

        }
        if(count($contact->tasks)){
            foreach ($contact->tasks as $key => $i) {
                $contact->family .= "<i class=\"fa fa-circle\"></i>&nbsp;" . $i->categories[0]->getRootCategory()->name . " (" . $i->title . ")"  . ", ";
            }
        }
        $contact->family = rtrim($contact->family, ', ');

        return $contact;
    }


    public function delete($id, ContactsRequest $request){

        $type = $request->get('type')?$request->get('type'):null;

        if($this->contRepo->delete($id)){
            $response = t('The element has been deleted');
        }
        else{
            $response = 'Error deleting item';
        }

        if ($request->ajax() || $request->wantsJson()) {
            return new JsonResponse($response, 200);
        }
        else{
            return redirect()->route('admin.contacts.list', ['type' => $type])->with('flashSuccess', $response);
        }

    }


    public function reply(ContactsRequest $request) {

        $contact = $this->contRepo->getById($request->get('id'));
        $mail = $contact->email;
        $name = $contact->name;

        $reply = clean($request->get('reply')); /* clean() es una función de Purifier que convierte text2html */

        //SEND MAIL
        Mail::send(
            'emails.contact.reply', //View con el cuerpo del mail
            ['reply' => $reply, 'name' => $name], //Parámetros pasados al view
            function ($msg) use ($mail, $name) { //No olvidar pasar con 'use' las variables usadas dentro
                $msg->from(env('SENDERS_EMAIL', ''), env('SENDERS_NAME', ''));
                $msg->to($mail, $name);
                $msg->subject('Sullair - Respuesta a su consulta');
            }
        );

        //UPDATE DB
        Contact::where('id', $request->get('id'))->update(['reply_msg' => $request->get('reply'), 'replied' => 1]);
    }


    public function exportToExcel($type = '') {
        //Contact array
        $array = [];

        $items = Contact::orderBy('fecha', 'desc');
        $name = 'Todos';

        switch ($type) {
            case 'task':
                $items->whereType('task');
                $name = 'tasko';
                break;
            case 'category':
                $items->whereType('category');
                $name = 'familia';
                break;
            case 'download':
                $items->whereType('download');
                $name = 'descargas';
                break;
            case 'contact':
                $items->whereType('contact');
                $name = 'contacto';
                break;
            default:
                break;
        }

        $items = $items->get();

        foreach ($items as $it) {
            $sub = [];
            $sub['FECHA'] = date('d/m/Y', strtotime($it->fecha));
            $sub['NOMBRE'] = $it->name;
            $sub['APELLIDO'] = $it->surname;
            $sub['EMAIL'] = $it->email;
            $sub['MENSAJE'] = strip_tags($it->message);
            $sub['COMPAÑIA'] = $it->company != NULL ? $it->company : '';
            $sub['ÁREA'] = $it->area != NULL ? $it->area : '';
            $sub['TELÉFONO'] = $it->phone != NULL ? $it->phone : '';
            $sub['PAÍS'] = $it->countries_id != NULL ? $this->locRepo->getCountryById($it->countries_id)->name : '';
            $sub['PROVINCIA'] = $it->states_id != NULL ? $this->locRepo->getStateById($it->states_id)->name : '';
            $sub['CIUDAD'] = $it->cities_id != NULL ? $this->locRepo->getCityById($it->cities_id)->name : $it->city_txt;

            array_push($array, $sub);
        }

        //File
        $file = Excel::create('consultas_' .$name. '_' . date('d-m-Y'), function($excel) use($array, $name) {
            $excel->sheet('Consultas Sullair', function($sheet) use($array, $name) {
                $sheet->fromArray($array);
                $sheet->prependRow(array('LISTA DE CONTACTOS: ' .$name. ' (' .date('d-m-Y'). ')'));
                $sheet->prependRow(2, array(' '));
                $sheet->cells('A1', function($cells) {
                    $cells->setFontWeight('bold');
                    $cells->setFontSize(16);
                });
                $sheet->cells('A3:K3', function($cells) {
                    $cells->setFontWeight('bold');
                });
            });
        })->export('xls');

        return $file;
    }

}
