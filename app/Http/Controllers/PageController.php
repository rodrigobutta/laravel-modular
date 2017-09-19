<?php
namespace App\Http\Controllers;

use App\Helpers\ResizeHelper;
use App\Repository\PageRepositoryInterface;
use Illuminate\Support\Facades\Crypt;

use App\Http\Controllers\PageCustomController;

class PageController extends Controller
{

    public function __construct(PageRepositoryInterface $page, PageCustomController $controller){
        $this->page = $page;
        $this->custom_controller = $controller;
    }

    public function goHome(){
        return $this->getSlug('home');
    }

    public function equipos() {
        return $this->getSlug('equipos');
    }

    public function getSlug($slug = null){

        /*
        EK: fix temporal para url anidadas. Lo ideal seria ir validando la url
        Este fix solo toma la ultima parte en caso de que se pasen (/) y sigue
        todo normal
        */
        $slug = explode('/', $slug);
        $slug = array_pop($slug);

        // si no viene parametro (root) asumo que es la page home
        if($slug==null||$slug=='home'){
            $slug='home';
            $page = $this->page->getById(1);
        }
        else{
            $page = $this->page->getBySlug($slug);
        }

        if (empty($slug) or $slug != $page->slug) {
            // return redirect()->route('home', 301);
            abort(404);
        }

        \Event::fire('App\Events', $page);

        $title = ucfirst($page->title);

        $sitecode = strtolower(siteSettings('siteCode'));


        // CUSTOM CONTROLLER METHOD

        // para un slug "/funcion-custom" de existir un metodo _FuncionCustom() dentro de PageCustomController, seguiria por ese lado
        $custom_method = '_' . str_replace(' ','',ucwords(str_replace('-', ' ', $slug)));
        if(method_exists($this->custom_controller,$custom_method)){
            return call_user_func_array([$this->custom_controller, $custom_method],[$page,$title]);
        }


        // CUSTOM VIEW

        // si existe un custom view para ese slug y para ese país, lo levanto por ej: \resources\views\page\uy\test.blade.php
        if (\View::exists('page.' . $sitecode . '.' . $slug)){
            return iView('page.' . $sitecode . '.' . $slug, compact('page', 'title'));
        } // si existe un custom view para ese slug pero no para ese país (siteCode), busco un generico para ese slug
        elseif (\View::exists('page.' . $slug)){
            return iView('page.' . $slug, compact('page', 'title'));
        } // si no encuentro ninguno de los anteriores, el contenido de la pagina lo maneja el page.view
        else{
            return iView('page.view', compact('page', 'title'));
        }

    }

    public function getByTags($tag)
    {
        $pages = $this->pages->getByTags($tag);
        $title = sprintf('%s %s', t('Tagged With'), ucfirst($tag));

        return iView('gallery.index', compact('pages', 'title'));
    }

    public function search(Request $request)
    {
        $this->validate($request, ['q' => 'required']);

        $pages = $this->pages->search($request->get('q'), $request->get('category'), $request->get('timeframe'));

        $title = sprintf('%s %s', t('Searching for'), ucfirst($request->get('q')));

        return iView('gallery.index', compact('title', 'pages'));
    }

}
