<?php

namespace App\Http\Controllers\Admin;

use App\Models\Task;
use App\Models\User;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{

    public function getIndex(){


        // activity()->log('Dashboarddd');

        // activity()
        // ->causedBy(User)
        // ->performedOn(Task)
        // ->log('edited');

        // activity('test-log')->log("dashboard");

        // var_dump(Activity::all()->last());


        // $startDate = Carbon::now()->subDays(30);
        // $signup = User::where('created_at', '>=', $startDate)
        //     ->groupBy('date')
        //     ->get([
        //         DB::raw('Date(created_at) as date'),
        //         DB::raw('COUNT(*) as value')
        //     ])
        //     ->toJSON();

        // $tasks = Task::where('approved_at', '>=', $startDate)
        //     ->groupBy('date')
        //     ->get([
        //         DB::raw('Date(created_at) as date'),
        //         DB::raw('COUNT(*) as value')
        //     ])->toJson();

        $title = 'Dashboard';




        \JavaScript::put([
          'admin_report_gaquery_url' => route('admin.report.gaquery'),
            // 'admin_report_weeks' => route('admin.report.weeks'),
            // 'admin_report_referrers' => route('admin.report.referrers'),
            // 'admin_report_pages' => route('admin.report.pages'),
            // 'admin_report_visitors' => route('admin.report.visitors'),
            // 'admin_report_browsers' => route('admin.report.browsers'),
            // 'admin_report_desktop_mobile' => route('admin.report.desktop_mobile'),
            // 'user' => $graph_browser,
            // 'ageee' => 29
        ]);




       //  $start = (new Carbon('first day of this month'))->hour(0)->minute(0)->second(0);
       //  $end = (new Carbon('last day of this month'))->hour(23)->minute(59)->second(59);
       //  // var_dump($start);
       //  // var_dump($end);
       //  $this->ga->setupDates($start,$end);

       //  // $results = $this->ga->getUsersAndPageviewsOverTime();
       //  // $results = $this->ga->getBrowserAndOperatingSystem();



       // $this->ga->setParams([
       //      'metrics'    => 'ga:sessions',
       //      'dimensions' => 'ga:browser,ga:browserVersion,ga:operatingSystem',
       //      // 'segment'    => 'gaid::-14',
       //  ]);
       // $results =  $this->ga->execute();

       //  var_dump($results);








        return iView('admin/sitedetails/index', compact('title'));
    }


    public function pageReportsTechonology(){

        $title = 'Tecnología';

        \JavaScript::put([
          'admin_report_gaquery_url' => route('admin.report.gaquery'),
        ]);

        return iView('admin.reports.technology', compact('title'));
    }


    public function pageReportsDemographic(){

        $title = 'Demografico';

        \JavaScript::put([
          'admin_report_gaquery_url' => route('admin.report.gaquery'),
        ]);

        return iView('admin.reports.demographic', compact('title'));
    }

    public function pageReportsBehaviour(){

        $title = 'Comportamento';

        \JavaScript::put([
          'admin_report_gaquery_url' => route('admin.report.gaquery'),
        ]);

        return iView('admin.reports.behaviour', compact('title'));
    }


    public function pageReportsAquisition(){

        $title = 'Adquisición';

        \JavaScript::put([
          'admin_report_gaquery_url' => route('admin.report.gaquery'),
        ]);

        return iView('admin.reports.aquisition', compact('title'));
    }



}
