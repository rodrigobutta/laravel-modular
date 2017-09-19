<?php
use App\Models\Contact;
use App\Models\CampaignContact;
use App\Models\Profile;
use App\Models\Task;
use App\Models\TaskCategory;
use App\Models\User;
use App\Models\Country;
use App\Models\Budget;


use Jenssegers\Agent\Agent as Agent;

// helper string length  (Máximo de caracteres)
function stringWrap($string,$caracteres,$sufFix = "..."){

    if (strlen($string) < $caracteres) {
        return $string;
    }
    else{
       return  substr( $string, 0 , $caracteres - strlen($sufFix) ) . $sufFix;
    }

}

// traducir texto
function t($string){
    return trans('text.' . $string, [], null, session('my.locale'));
}



function iView($view = null, $data = [], $mergeData = []){

    $Agent = new Agent();
    if ($Agent->isMobile()) {

        view()->share('is_mobile', true);
        view()->share('mobile_class', 'mobile');

        $mobile_view = 'mobile.' . $view;
        if(\View::exists($mobile_view)){
            $view = $mobile_view;
        }

    } else {
        view()->share('is_mobile', false);
        view()->share('mobile_class', '');
    }

    return view($view, $data, $mergeData);
}

// metodo que devuelve la ruta hasta /uploads/
function uploaded($folder_and_file){
    return asset('uploads/' . $folder_and_file);
}

function siteSettings($request){
    return Cache::rememberForever($request, function () use ($request) {
        $request = DB::table('sitesettings')->whereOption($request)->first();
        return $request->value;
    });
}


/**
* Decrypt data from a CryptoJS json encoding string
*
* @param mixed $passphrase
* @param mixed $jsonString
* @return mixed
*/
function cryptoJsAesDecrypt($passphrase, $jsonString){
    $jsondata = json_decode($jsonString, true);
    try {
        $salt = hex2bin($jsondata["s"]);
        $iv  = hex2bin($jsondata["iv"]);
    } catch(Exception $e) { return null; }
    $ct = base64_decode($jsondata["ct"]);
    $concatedPassphrase = $passphrase.$salt;
    $md5 = array();
    $md5[0] = md5($concatedPassphrase, true);
    $result = $md5[0];
    for ($i = 1; $i < 3; $i++) {
        $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
        $result .= $md5[$i];
    }
    $key = substr($result, 0, 32);
    $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
    return json_decode($data, true);
}
/**
* Encrypt value to a cryptojs compatiable json encoding string
*
* @param mixed $passphrase
* @param mixed $value
* @return string
*/
function cryptoJsAesEncrypt($passphrase, $value){
    $salt = openssl_random_pseudo_bytes(8);
    $salted = '';
    $dx = '';
    while (strlen($salted) < 48) {
        $dx = md5($dx.$passphrase.$salt, true);
        $salted .= $dx;
    }
    $key = substr($salted, 0, 32);
    $iv  = substr($salted, 32,16);
    $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
    $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
    return json_encode($data);
}


function trunc($phrase, $max_words) {
   $phrase_array = explode(' ',$phrase);
   if(count($phrase_array) > $max_words && $max_words > 0)
      $phrase = implode(' ',array_slice($phrase_array, 0, $max_words)).'...';
   return $phrase;
}



function has($value){
    if(isset($value) && $value != null && $value!='')
        return true;
    else
        return false;
}

function color_pallete($ix=null){

    $arr_colors = array('#00a65a', '#00c0ef', '#f39c12', '#dd4b39', '#3c8dbc', '#39cccc', '#ff851b', '#f012be', '#696969', '#d81b60');

    if($ix==null){
        return $arr_colors;
    }
    else if($ix>sizeof($ix)-1){
        return '#000000';
    }
    else{
        return $arr_colors[$ix];
    }

}

// contenidos varios que se guardan en tabla única para ser usados mediante estas funciones y administrados desde el admin
function getContent($content_name,$modificator=''){

    return Cache::rememberForever($content_name, function () use ($content_name,$modificator) {

        $item = DB::table('contents')->whereName($content_name)->first();

        if($item->type=='json'){

            return json_decode($item->value);

        }
        else if($item->type=='image'){

            if($modificator=='') $modificator = 'mainMedia';
            return Resize::img($item->value, $modificator) ;

        }
        else{

            return $item->value;

        }

    });

}

function setContent($content_name,$value,$type='general'){
    // if(!auth()->user()->isSuper()) return false;

    if (is_null(DB::table('contents')->whereName($content_name)->first())) {

        DB::table('contents')
            ->where('name', $content_name)
            ->insert(['name' => $content_name , 'value' => $value, 'type' => $type]);

    } else {

        Cache::forget($content_name);

        DB::table('contents')
            ->where('name', $content_name)
            ->update(['value' => $value]);

    }

    return true;
}



function removeDuplicates($array){

    $tmp = [];
    foreach($array as $k => $v){
        $tmp[$k] = $v->id;
    }

    $tmp = array_unique($tmp);

    foreach($array as $k => $v){

        if (!array_key_exists($k, $tmp)){
            unset($array[$k]);
        }

    }

    return $array;

}


function getContents(){

    return Cache::rememberForever('contents_list', function () {
        return \App\Models\Content::orderBy('title', 'asc')->get();
    });

}

function helperCompanyCategories(){

    return Cache::rememberForever('company_categories', function () {
        return \App\Models\CompanyCategory::orderBy('lft', 'asc')->get();
    });

}


function countries(){

    return Cache::rememberForever('countries', function () {
        $res = [];

        foreach (Country::all() as $c) {
            $res[$c->id] = $c->name;
        }

        return $res;
    });

}


function currentCountry(){

    $res = 0;
    $actual = '';

    $countries= Country::all();

    switch (siteSettings('siteCode')) {
        case 'AR':
            $actual = 'Argentina';
            break;
        case 'UY':
            $actual = 'Uruguay';
            break;
        case 'PE':
            $actual = 'Peru';
            break;
    }

    foreach ($countries as $c) {
        if($actual == $c->name) {
            $res = $c->id;
        }
    }

    return $res;

}



function perPage($int = 20){
    return 20;
}

function tagLimit($int = 5){
    return $int;
}

function limitPerDay($int = 100)
{
    if (siteSettings('limitPerDay') == '') {
        return $int;
    }

    return siteSettings('limitPerDay');
}

function checkFavorite($id)
{
    if (auth()->check() == false) {
        return false;
    }

    if (Favorite::whereImageId($id)->whereUserId(auth()->user()->id)->count()) {
        return true;
    }

    return false;
}


function contactHasUnread(){
    return !Contact::where('read',0)->get()->isEmpty();
}
function contactUnreadCount(){
    return Contact::where('read',0)->get()->count() + CampaignContact::where('read',0)->get()->count();
}
function contactContactHasUnread(){
    return !Contact::where('read',0)->whereType('contact')->get()->isEmpty();
}
function contactContactUnreadCount(){
    return Contact::where('read',0)->whereType('contact')->get()->count();
}



function makeLinks($text)
{
    return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@',
        '<a href="$1" rel="nofollow" target="_blank">$1</a>', $text);
}

function addhttp($url)
{
    if (!preg_match('~^(?:f|ht)tps?://~i', $url)) {
        $url = 'http://' . $url;
    }

    return $url;
}

function countryIsoCodeMatch($input)
{
    if (preg_match('/AF|AL|DZ|AS|AD|AG|AI|AG|AR|AA|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BL|BA|BW|BR|BC|BN|BG|BF|BI|KH|CM|CA|IC|CV|KY|CF|TD|CD|CL|CN|CI|CS|CO|CC|CG|CK|CR|CT|HR|CU|CB|CY|CZ|DK|DJ|DM|DO|TM|EC|EG|SV|GQ|ER|EE|ET|FA|FO|FJ|FI|FR|GF|PF|FS|GA|GM|GE|DE|GH|GI|GB|GR|GL|GD|GP|GU|GT|GN|GY|HT|HW|HN|HK|HU|IS|IN|ID|IA|IQ|IR|IM|IL|IT|JM|JP|JO|KZ|KE|KI|NK|KS|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MY|MW|MV|ML|MT|MH|MQ|MR|MU|ME|MX|MI|MD|MC|MN|MS|MA|MZ|MM|NA|NU|NP|AN|NL|NV|NC|NZ|NI|NE|NG|NW|NF|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PO|PL|PT|PR|QA|ME|RS|RE|RO|RU|RW|NT|EU|HE|KN|LC|MB|PM|VC|SP|SO|AS|SM|ST|SA|SN|RS|SC|SL|SG|SK|SI|SB|OI|ZA|ES|LK|SD|SR|SZ|SE|CH|SY|TA|TW|TJ|TZ|TH|TG|TK|TO|TT|TN|TR|TU|TC|TV|UG|UA|AE|GB|US|UY|UZ|VU|VS|VE|VN|VB|VA|WK|WF|YE|ZR|ZM|ZW/',
        $input)) {
        return true;
    }

    return false;
}

function maxUploadSize()
{
    $max_upload = (int)(ini_get('upload_max_filesize'));
    $max_post = (int)(ini_get('post_max_size'));

    return min($max_upload, $max_post);
}

function query_params($except = [])
{
    $query = Input::query();

    if (!is_array($except)) {
        $except = [$except];
    }

    foreach ($except as $key => $value) {
        if (is_string($key)) {
            $query[$key] = $value;
        } else {
            unset($query[$value]);
        }
    }

    return (http_build_query($query));
}




function selectableProfiles(){

    if(auth()->check() && auth()->user()->isSuper()){
        // si es Super levanto todos los perfiles disponibles
        return Profile::all();
    }
    else{
        // levanto todos los perfiles del usuario para que pueda seleccionar el que corresponda al tasko en SELECT
        return auth()->user()->profiles();
    }

}


function convertArrayToObjectArray($array){

    return array_map(function($element) {
        return (object) $element;
    }, $array);

}


function findObjectInArrayByProperty($arr,$property,$value){
    $res_obj = NULL;
    $res_key = -1;

    foreach($arr as $key => $obj) {
        if ($value == $obj->{$property}) {
            $res_obj = $obj;
            $res_key = $key;
            break;
        }
    }

    if(!is_null($res_obj)){
        return [$res_key, $res_obj];
    }
    else{
        return false;
    }

}



function pathUploads(){
    return Cache::rememberForever('path_uploads', function () {
        return siteSettings('uploadPath');
    });
}

function getOriginalMediaPathByName($name){
    return sprintf('%s/%s/media/%s', base_path(), pathUploads(), $name);
}



// REB: http://laravel-tricks.com/tricks/using-bootstrap-error-classes-for-flash-message

  // |  #Usage in the controller
  // |  ...->('message', Helper::notification('You have been logged in','success'));
  // |
  // |  #Usage in the view
  // |    @if(Session::has('message'))
  // |    {{Session::get('message')}}
  // |  @endif

class Helper{
    public static function notification($message,$type)
    {
         return '<div class="alert alert-'.$type.'">'.$message.'</div>';
    }
}
