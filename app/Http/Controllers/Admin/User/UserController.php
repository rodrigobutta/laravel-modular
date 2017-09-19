<?php

namespace App\Http\Controllers\Admin\User;

use App\Helpers\Resize;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Repository\UsersRepositoryInterface;

class UserController extends Controller
{

    public function __construct(UsersRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function getIndex(Request $request)
    {
        $title = sprintf('List of %s users', ucfirst($request->get('type')));
        $type = $request->get('type');

        return iView('admin.user.index', compact('title', 'type'));
    }

    public function getAddUser()
    {
        $title = t('Add') . ' ' . t('user');

        return iView('admin.user.add', compact('title'));
    }

    public function getData(Request $request)
    {
        $users = User::select([
            'users.*'
        ]);

        switch ($request->get('type')) {
            case 'approved':
                $users->whereNotNull('users.confirmed_at');
                break;
            case 'approvalRequired':
                $users->whereNull('users.confirmed_at');
                break;
            case 'banned':
                $users->wherePermission('ban');
                break;
            default:
              //  $users->whereNotNull('users.confirmed_at');
        }

        $datatables = app('datatables')->of($users);

        $datatables->addColumn('buttons', function ($user) {
            return '<a href="' . route('admin.users.edit', [$user->id]) . '" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Editar </a>';
        });

        $datatables->addColumn('method', function ($user) {

            $method = $user->auth_method;

            $method_tooltip = $method;

            if($method=="form"){
                $method = 'user';
                $method_tooltip = 'User Form';
            }
            else if($method=="admin"){
                $method = 'user-circle-o';
                $method_tooltip = 'Administrator';
            }
            else if($method=="" || is_null($method)){
                $method = 'user-circle';
                $method_tooltip = 'Sistema';
            }

            return '<i class="fa fa-' . $method . '" title="'. strtoupper($method_tooltip).'" data-toggle="tooltip"></i>';
        });

        $datatables->addColumn('approved', function ($user) {

            if($user->isApproved()){
                return '<i class="fa fa-check"></i>';
            }
            else{
                return '<i class="fa fa-close"></i>';
            }

        });


        $datatables->addColumn('profiles', function ($user) {

            $str = '';
            foreach ($user->profiles as $profile) {

                $str .= ', ' .  ', <a href="' . route('admin.profiles.edit', [$profile->id]) . '" class="text-primary">'.$profile->title.'</a>';
            }

            return ltrim($str,', ');


        });


        return $datatables->editColumn('created_at', '{!! $created_at->diffForHumans() !!}')
            ->editColumn('updated_at', '{!! $updated_at->diffForHumans() !!}')
            ->editColumn('fullname', '{!! str_limit($fullname, 60) !!}')
            ->make(true);

    }

    public function search(Request $request){

        $term = $request->get('term');

        $items = $this->users->search($term);

        $res =  [];
        $ix=0;
        foreach ($items as $p) {
            $res[$ix]['id'] = $p->id;
            $res[$ix]['fullname'] = $p->fullname;
            $res[$ix]['email'] = $p->email;
            $ix++;
        }

        return json_encode($res);
    }

}
