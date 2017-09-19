@extends('master/index')
@section('content')
   <h3 class="content-heading">{{ t('Notifications') }}</h3>
   @foreach($notifications as $notice)
      @if($notice->user)
         <div class="media">
            <a class="pull-left" href="#">
               <img class="media-object" alt="{{ $notice->user->fullname }}" src="{{ Resize::img($notice->user->avatar, 'avatar') }}">
            </a>
            <div class="media-body">
               <h4 class="media-heading black"><a href="{{ route('user', ['username' => $notice->user->username]) }}">{{ $notice->user->fullname }}</a>
         <span class="msg-time pull-right">
         <small><i class="glyphicon glyphicon-time"></i>&nbsp;<abbr class="timeago comment-time" title="{{ $notice->created_at->toISO8601String() }}">{{ $notice->created_at->toISO8601String() }}</abbr>&nbsp;</small>
         </span>
               </h4>
               @if($notice->type == 'zcxzcz')
                  <p>asdsdsd sad yofdffdu</p>
               @elseif($notice->type == 'asdsadac')
                  <p>bbbcx on your xvdd</p>

               @endif
            </div>
         </div>
         <hr>
      @endif
   @endforeach
@endsection
@section('pagination')
    <div class="container">
        {!! $notifications->render()  !!}
    </div>
@endsection