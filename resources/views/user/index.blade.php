@extends('master/index')
@section('meta')
   <meta name="description" content="{{ $user->fullname.' '.siteSettings('description') }}">
   <meta name="keywords" content="{{ $user->fullname. ' ' .$user->username }}">
   <meta property="og:title" content="{{ ucfirst($user->fullname) }}'s {{ t('profile') }} - {{ siteSettings('siteName') }}"/>
   <meta property="og:type" content="article"/>
   <meta property="og:url" content="{{ route('user', ['id' => $user->username]) }}"/>
   <meta property="og:description" content="{{ $user->fullname.' '.siteSettings('description') }}"/>
   <meta property="og:image" content="{{ Resize::img($user->avatar,'mainAvatar') }}"/>
@endsection
@section('content')
   @include('user/rightsidebar')
@endsection
@section('sidebar')
@endsection
@section('pagination')
@endsection