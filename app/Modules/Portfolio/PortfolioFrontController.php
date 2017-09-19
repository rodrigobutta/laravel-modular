<?php
namespace App\Modules\Portfolio;

use App\Modules\Portfolio\PortfolioRepositoryInterface;


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

class PortfolioFrontController extends Controller
{

    public function __construct(PortfolioRepositoryInterface $portfolio, PageRepositoryInterface $page)
    {

        // view()->addNamespace('portfolio', app_path('Modules/portfolio/views/'));


        $this->portfolio = $portfolio;
        $this->page = $page;
    }


    public function getList(Request $request){

        $breadcrumb = [];


        $items = $this->portfolio->getall();

        $page = $this->page->getBySlug('portfolio');
        $title = $page->title;

        // filtrar solo los portfolioos publicados
        // $portfolio = $portfolio->filter(function ($item) {
        //     return $item->isPublished();
        // })->values();



        return iView('portfolio::front.index', compact( 'items', 'page', 'title'));

    }



    public function getIndex($slug)
    {

        $item = $this->portfolio->getBySlug($slug);


        \Event::fire('App\Events', $item);


        $title = $item->title;


        return iView('portfolio::front.view', compact('item', 'title'));
    }


    public function getData(Request $request)
    {
        $item = $this->portfolio->getById($request->get('id'));
        $item->img = Resize::img($item->main_image,'mainPortfolio');
        $item->properties = $item->filtrableProperties();

        return new JsonResponse($item);
    }


    // prueba de integracion con MercadoPago

    public function buy($id, $slug = null)
    {

        $portfolio = $this->portfolio->getById($id);

        $preference_data = array (
            "items" => array (
                array (
                    "title" => $portfolio->title,
                    "description" => "sdf dsfjsdf sdklfsdj flskf jdskf jdskf jsdkfl jsdflk sjfksd flsjf",
                    "picture_url" => Resize::img($portfolio->main_image,'mainPortfolio') ,
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
