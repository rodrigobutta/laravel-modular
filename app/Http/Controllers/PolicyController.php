<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Session;

class PolicyController extends Controller
{
    /**
     * Terms and services
     *
     * @return mixed
     */
    public function getTos()
    {
        $title = t('Terms of Services');

        return iView('policy.tos', compact('title'));
    }

    /**
     * Privacy Policies
     *
     * @return mixed
     */
    public function getPrivacy()
    {
        $title = t('Privacy Policy');

        return iView('policy.privacy', compact('title'));
    }

    /**
     * Faq of the site
     *
     * @return mixed
     */
    public function getFaq()
    {
        $title = t('FAQ');

        return iView('policy.faq', compact('title'));
    }

    /**
     * About us
     *
     * @return mixed
     */
    public function getAbout()
    {
        $title = t('About Us');

        return iView('policy.about', compact('title'));
    }

    /**
     * @param $lang
     * @return \Illuminate\Http\RedirectResponse
     */
    public function switchLang($lang)
    {
        Session::forget('my.locale');
        if (in_array($lang, languageArray())) {
            Session::put('my.locale', $lang);
            return redirect()->route('home');
        }
        Session::put('my.locale', 'en');

        return redirect()->route('home');
    }

    /**
     * @return mixed
     */
    public function queue()
    {
        return Queue::marshal();
    }
}
