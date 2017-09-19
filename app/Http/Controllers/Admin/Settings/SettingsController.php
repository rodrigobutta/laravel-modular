<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    public function getSiteDetails()
    {
        $settings = DB::table('sitesettings')->get();
        $title = 'Site Details/Info Settings';

        return iView('admin.settings.details', compact('settings', 'title'));
    }

    public function getLimitSettings()
    {
        $title = 'Limit Settings';

        return iView('admin.settings.limits', compact('title'));
    }

    public function getCacheSettings()
    {
        return iView('admin.settings.cache')->with('title', 'Cache Settings');
    }
}
