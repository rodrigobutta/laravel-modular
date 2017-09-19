<?php

namespace App\Repository\Eloquent;

use App\Helpers\ResizeHelper;
use App\Models\Section;
use App\Models\SectionType;
use App\Models\SectionContent;
use App\Notifier\SectionTypeNotifier;
use App\Repository\SectionRepositoryInterface;
use Auth;
use Carbon\Carbon;
use DB;
use File;
use Illuminate\Support\Facades\Cache;

class SectionRepository implements SectionRepositoryInterface{


    public function __construct(Section $section, SectionType $sectiontype, SectionContent $sectioncontent){
        $this->section = $section;
        $this->sectiontype = $sectiontype;
        $this->sectioncontent = $sectioncontent;
    }


    public function getById($id){
        return $this->sectiontypes->where('id', $id)->with('user', 'info')->firstOrFail();
    }


    private function contents(){

        // si es admin o superadmin no limitar el universo a los aprobados
        // if(auth()->check() && (auth()->user()->isSuper() || auth()->user()->isAdmin())){
            $posts = $this->sectioncontent;
        // }
        // else{
        //     $posts = $this->sectioncontent->approved()->published();
        // }

        return $posts;
    }

    public function searchContent($search)
    {
        $extends = explode(' ', $search);

        $items = $this->contents()->where('title', 'LIKE', '%' . $search . '%')
            ->whereNull('deleted_at')->orderBy('title', 'asc');

        foreach ($extends as $extend) {
            $items->orWhere('title', 'LIKE', '%' . $search . '%')->whereNull('deleted_at');
        }

        return $items = $items->whereNull('deleted_at')->paginate(perPage());
    }

}
