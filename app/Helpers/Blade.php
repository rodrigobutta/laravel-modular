<?php


function sidebarMenuState($menu=null, $submenu=null, $type=null){


    $suburl = strtolower(ltrim(rtrim(Request::path())));

    $segments = explode('/', $suburl);


    $request_type = null;
    if(Request::get('type')){
        $request_type = Request::get('type');
    }

    // 0 es /admin

    if($menu==null && $submenu==null && !isset($segments[1])  && ($type==null && $request_type==null || $type==$request_type) ){
        return 'active';
    }

    if(!isset($segments[1])){
        return '';
    }

    if($segments[1]==$menu && $submenu==null && ($type==null || $type==$request_type)){
        return 'active';
    }
    else if($segments[1]==$menu && $submenu==null && $type=='-' && $request_type==null){
        return 'active';
    }
    // else if($segments[1]==$menu && $submenu==null && ($type==null && $request_type==null || $type==$request_type)){
    //     return 'active';
    // }
    else if($segments[1]==$menu && $submenu=='default' && !isset($segments[2]) && ($type==null && $request_type==null || $type==$request_type)){
        return 'active';
    }
    else if($segments[1]==$menu && isset($segments[2]) && $segments[2]==$submenu && ($type==null && $request_type==null || $type==$request_type)){
        return 'active';
    }
    else{
        return '';
    }


}




