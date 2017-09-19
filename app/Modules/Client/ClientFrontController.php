<?php
namespace App\Modules\Client;

use App\Modules\Client\ClientRepositoryInterface;


use App\Helpers\Resize;
use App\Helpers\ResizeHelper;
use App\Repository\PageRepositoryInterface;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;
use MP;

class ClientFrontController extends Controller
{

    public function __construct(ClientRepositoryInterface $client, PageRepositoryInterface $page)
    {

        // view()->addNamespace('client', app_path('Modules/client/views/'));


        $this->client = $client;
        $this->page = $page;
    }


    public function getList(Request $request){

        $breadcrumb = [];


        $items = $this->client->getall();

        $page = $this->page->getBySlug('emprendimientos');
        $title = $page->title;

        // filtrar solo los clientos publicados
        // $client = $client->filter(function ($item) {
        //     return $item->isPublished();
        // })->values();



        return iView('client::front.index', compact( 'items', 'page', 'title'));

    }



    public function getIndex($slug)
    {

        $item = $this->client->getBySlug($slug);

        $categories = $item->categories;


        \Event::fire('App\Events', $item);


        if ($item->categories->isEmpty() ) {
            return redirect()->route('client.all')->with('flashError', 'El cliento no tiene familia asociada');;
        }


        $firstCategory = $item->categories[0];
        $ancestors = $firstCategory->getAncestors();
        $breadcrumb = [];

        foreach ($ancestors as $i => $cat){

            $bc = new \stdClass();
                $bc->link = $cat->getLink();
                $bc->target = $cat->getLinkTarget();
                $bc->name = $cat->name;
            array_push($breadcrumb, $bc);

        }

        foreach ($item->categories as $cat) {
            $cat->link = $cat->getLink();
            $cat->target = $cat->getLinkTarget();
        }

        $isCategory = false;
        $title = $item->title;

        $mainCategories = $item->mainCategories();




        return iView('client.view', compact('item', 'title','breadcrumb', 'isCategory', 'mainCategories'));
    }


    public function getData(Request $request)
    {
        $item = $this->client->getById($request->get('id'));
        $item->img = Resize::img($item->main_image,'mainClient');
        $item->properties = $item->filtrableProperties();

        return new JsonResponse($item);
    }

    // prueba de integracion con MercadoPago

    public function buy($id, $slug = null)
    {

        $client = $this->client->getById($id);

        $preference_data = array (
            "items" => array (
                array (
                    "title" => $client->title,
                    "description" => "sdf dsfjsdf sdklfsdj flskf jdskf jdskf jsdkfl jsdflk sjfksd flsjf",
                    "picture_url" => Resize::img($client->main_image,'mainClient') ,
                    "quantity" => 1,
                    "currency_id" => "ARS", //ISO_4217
                    "unit_price" => 5.0
                )
            )
        );


        try {

            $response = MP::create_preference($preference_data);

            $return_url = env('MP_SANDBOX') ? 'sandbox_init_point' : 'init_point';

            return redirect()->to($response['response'][$return_url]);

        } catch (Exception $e){
            dd($e->getMessage());
        }

    }


    public function membership(){

        $preapproval_data = [
          'payer_email' => 'rbutta@gmail.com',
          // 'back_url' => 'http://labhor.com.ar/laravel/public/preapproval',
          'reason' => 'Subscripción a paquete premium',
          // 'external_reference' => $subscription->id,
          'auto_recurring' => [
            'frequency' => 1,
            'frequency_type' => 'months',
            'transaction_amount' => 99,
            'currency_id' => 'ARS',
            'start_date' => Carbon::now()->addHour()->format('Y-m-d\TH:i:s.BP'),
            'end_date' => Carbon::now()->addMonth()->format('Y-m-d\TH:i:s.BP'),
          ],
        ];

        $response = MP::create_preapproval_payment($preapproval_data);

        $return_url = env('MP_SANDBOX') ? 'sandbox_init_point' : 'init_point';

        return redirect()->to($response['response'][$return_url]);
    }

}
