<div class="col-md-3">
    <a href="{{ route('user', ['username' => $user->username]) }}" class="thumbnail">
        <img src="{{ Resize::img($user->avatar,'mainAvatar') }}" alt="{{ $user->username }}">
    </a>

    <h1 class="profile-fullname">
        <span>{{ $user->fullname }}</span>
        <p>
            <small>{{ $user->username }}</small>
        </p>
    </h1>

    <hr>
    <h2 class="profile-social">
        @if(strlen($user->fb_link) > 2)
            <a href="{{ addhttp($user->fb_link) }}" class="black entypo-facebook" target="_blank"></a>
        @endif
        @if(strlen($user->tw_link) > 2)
            <a href="{{ addhttp($user->tw_link) }}" class="black entypo-twitter" target="_blank"></a>
        @endif
    </h2>
    <hr>
    @if(auth()->check() == true)
        @if(auth()->user()->id == $user->id)
            <span>sos este usuario</span>
            <a href="{{ route('users.settings') }}" type="button" class="btn btn-info btn-lg btn-block">{{ t('Edit My Profile') }}</a>
        @else
            <span>no sos este usuario</span>
        @endif
        <hr>
    @endif

</div>