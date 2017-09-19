<?php
namespace App\Http\Controllers;

use App\Helpers\ResizeHelper;
use App\Repository\PageRepositoryInterface;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\PageCustomController;
use App\Models\Content;
use App\Models\Country;

use App\Modules\Area\AreaRepositoryInterface;
use App\Modules\Client\ClientRepositoryInterface;

class HomeController extends Controller {

    public function __construct(    PageRepositoryInterface $page,
                                    PageCustomController $controller,
                                    Content $contents,
                                    Country $country,
                                    AreaRepositoryInterface $area,
                                    ClientRepositoryInterface $client
                                    ) {
        $this->page = $page;
        $this->custom_controller = $controller;
        $this->contents = $contents;
        $this->area = $area;
        $this->client = $client;
    }

    /**
     * @return mixed
     */
    public function getIndex()
    {
        $page = $this->page->getById(1);
        \Event::fire('App\Events', $page);
        $title = ucfirst($page->title);
        $sitecode = strtolower(siteSettings('siteCode'));


        \Analytics::trackEvent('viewww', 'hhhhome', 'algun-label', '111');


        // $content_slider = getContent('home-slider');

        // Content: Featured
        // $content_featured = $this->contents->where('name', 'home-featured')->first();
        // if ($content_featured) {
	    //     if ($content_featured->value) {
	    //     	$content_featured = json_decode($content_featured->value);
	    //     	if ($content_featured->disabled)
	    //     		$content_featured = null;
	    //     } else
	    //     	$content_featured = null;
	    // }


        $areas = $this->area->getAll();

        $clients = $this->client->getAll();


        $testimonials = getContent('home-testimonials');

        return iView('page.home', compact('page', 'title', 'areas', 'clients', 'testimonials'));
    }

}