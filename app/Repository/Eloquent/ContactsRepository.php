<?php

namespace App\Repository\Eloquent;

use App\Models\Contact;
use App\Repository\ContactsRepositoryInterface;

class ContactsRepository implements ContactsRepositoryInterface
{

    public function __construct(Contact $contacts){
        $this->contacts = $contacts;
    }


    public function getById($id){
    	Contact::where('id', $id)->update(['read' => 1]);

        return Contact::find($id);
    }

    public function getFollowing(){


        // $this->contacts->whereIn('profile_id', auth()->user()->profiles()->lists('id')); // lo segundo es un array de ids

        $items = $this->contacts->get();

        $items = $items->filter(function ($item) {

            var_dump($item->categories);

            return true;
        })->values();



        exit();

        // if(auth()->check() && (auth()->user()->isSuper() || auth()->user()->isAdmin())){
        //     $posts = $this->contacts;
        // }
        // else{
        //     $posts = $this->contacts->approved()->published();
        // }


        return $items;

    }

    public function delete($id){

        $item = Contact::findOrFail($id);
        $item->delete();
        return true;
    }
}
