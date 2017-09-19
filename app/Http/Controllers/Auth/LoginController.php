<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    use ThrottlesLogins;

    private $providers = [
        'facebook' => 'fbid',
        'google'   => 'gid',
        'twitter'  => 'twid'
    ];

    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    public function postLogin(LoginRequest $request)
    {


        if ($this->hasTooManyLoginAttempts($request)) {
            $request->session()->put('force_captcha', 1);

            return $this->sendLockoutResponse($request);
        }

        if (filter_var($request->get('username'), FILTER_VALIDATE_EMAIL)) {
            $input = [
                'email'    => $request->get('username'),
                'password' => $request->get('password')
            ];
        } else {
            $input = [
                'username' => $request->get('username'),
                'password' => $request->get('password')
            ];
        }
        if (auth()->attempt($input, (bool)$request->get('remember-me'))) {
            $request->session()->forget('force_captcha');

            if (auth()->user()->confirmed_at == null) {
                auth()->logout();

                return redirect()->route('login')->with('flashError', t('Email activation is required'));
            }
            if (auth()->user()->permission == 'ban') {
                auth()->logout();

                return redirect()->route('login')->with('flashError', t('You are not allowed'));
            }
            auth()->user()->ip_address = $request->getClientIp();
            auth()->user()->save();


            $welcome_message = t('Welcome') . ' <strong>' . auth()->user()->fullname . "</strong>!";
            if(auth()->user()->profiles->contains(1) || auth()->user()->profiles->contains(2)){ // 0: SUPERADMIN 1: ADMIN
                return redirect()->route('admin')->with('flashSuccess', $welcome_message);
            }
            else{
                return redirect()->route('home')->with('flashSuccess', $welcome_message);
            }


        }
        $this->incrementLoginAttempts($request);

        return redirect()->route('login')->with('flashError', t('Your username/password combination was incorrect'));
    }


    public function getLogin()
    {
        $title = t('Login');

        if(auth()->user()){
            return redirect()->route('user.panel')->with('flashWarning', t('Already logged'));
        }

        return iView('auth.login', compact('title'));
    }

    public function getUser()
    {
        $title = t('User');

        return iView('auth.user', compact('title'));
    }

    public function getLogout()
    {
        auth()->logout();

        return redirect()->route('login')->with('flashSuccess', t('Logged out'));;
    }

    public function getFacebook()
    {
        return Socialite::with('facebook')->redirect();
    }

    public function getSocial($provider = 'facebook'){
        try {
            if ($provider == 'google') {
                return Socialite::driver($provider)->scopes(['email'])->redirect();
            }

            return Socialite::driver($provider)->redirect();
        } catch (Exception $e) {
            return redirect('auth/' . $provider);
        }
    }

    public function getSocialCallback($provider = 'facebook', Request $request){
        // var_dump('getSocialCallback');
        // var_dump($provider);

        // tiene los datos de usuario del oAuth
        $social = Socialite::with($provider)->user();
        // var_dump($social);

        if ($this->checkIfValidUser($social, $provider)) {
            return redirect('/')->with('flashSuccess', t('You are now logged in'));
        }

        $request->session()->put($provider . '_register', $social);

        return redirect()->to('registration/' . $provider);
    }

    private function checkIfValidUser($social, $provider){


        if ($user = User::where($this->providers[$provider], '=', $social->getId())->first()) {
            auth()->login($user, true);

            return true;
        }

        if ($user = User::whereEmail($social->getEmail())->first()) {
            auth()->login($user, true);
            $user->{$this->providers[$provider]} = $social->getId();
            $user->save();

            return true;
        }

        return false;
    }


    private function loginUsername()
    {
        return 'username';
    }


    // REB UPGRADE 5.2
    // private function loginPath()
    // {
    //     return route('login');
    // }
}
