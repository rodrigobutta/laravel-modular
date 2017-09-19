<?php

namespace App\Repository\Eloquent;

use App\Models\Profile;
use App\Repository\ProfileRepositoryInterface;
use App\Repository\UsersRepositoryInterface;
use Illuminate\Support\Facades\URL;
use Roumen\Feed\Facades\Feed;

class ProfileRepository implements ProfileRepositoryInterface
{

    public function  __construct(Profile $model, UsersRepositoryInterface $user)
    {
        $this->model = $model;
        $this->user = $user;
    }

    public function getBySlug($slug)
    {
        return $this->model->whereSlug($slug)->firstOrFail();
    }

    function getItems()
    {
        // return Cache::rememberForever('profiles', function () {
            return $this->model->all();
        // });
    }




    public function search($search)
    {

        $extends = explode(' ', $search);

        $items = $this->model->where('name', 'LIKE', '%' . $search . '%')
            ->orWhere('title', 'LIKE', '%' . $search . '%');

        foreach ($extends as $extend) {

            $items->orWhere('name', 'LIKE', '%' . $extend . '%')
                ->orWhere('title', 'LIKE', '%' . $extend . '%');

        }

        return $items = $items->whereNull('deleted_at')->paginate(perPage());

    }

}
