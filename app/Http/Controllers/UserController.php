<?php

namespace App\Http\Controllers;

use App\Helpers\ResizeHelper;

use App\Repository\UsersRepositoryInterface;
use App\Http\Requests\User\UpdateAvatar;
use App\Http\Requests\User\UpdatePassword;
use App\Http\Requests\User\UpdateProfile;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(UsersRepositoryInterface $user)
    {
        $this->user = $user;
    }

    public function getUser($user)
    {
        $user = $this->user->getByUsername($user);
        $title = ucfirst($user->fullname);

        return iView('user.index', compact('user', 'title'));
    }


    public function getAll()
    {
        $users = $this->user->getTrendingUsers();
        $title = t('Users');

        return iView('user.users', compact('users', 'title'));
    }

    public function getNotifications()
    {
        $notifications = $this->user->notifications(auth()->user()->id);
        $title = t('Notifications');

        return iView('user.notifications', compact('notifications', 'title'));
    }


    public function getSettings()
    {
        $user = auth()->user();
        $title = t('Settings');

        return iView('user.settings', compact('user', 'title'));
    }

    public function postUpdateAvatar(UpdateAvatar $request)
    {
        $i = new ResizeHelper(auth()->user()->avatar, 'uploads/avatars');
        $i->delete();

        $i = new ResizeHelper($request->file('avatar'), 'uploads/avatars');
        list($name, $type) = $i->saveOriginal();

        $update = auth()->user();
        $update->avatar = sprintf('%s.%s', $name, $type);
        $update->save();

        return redirect()->back()->with('flashSuccess', t('Your avatar is now updated'));
    }


    public function postUpdateProfile(UpdateProfile $request)
    {
        $this->user->updateProfile($request);

        return redirect()->back()->with('flashSuccess', t('Your profile is updated'));
    }

    public function postChangePassword(UpdatePassword $request)
    {
        if ( ! $this->user->updatePassword($request)) {
            return redirect()->back()->with('flashError', t('Old password is not valid'));
        }

        return redirect()->back()->with('flashSuccess', t('Your password is updated'));
    }

    public function postMailSettings(Request $request)
    {
        $this->user->updateMail($request);

        return redirect()->back()->with('flashSuccess', t('Your mail settings are now update'));
    }
}
