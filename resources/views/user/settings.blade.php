@extends('master/index')

@section('head')

    {!! HTML::style('public/css/bootstrap-form.css') !!}

    {!! HTML::style('public/css/grid_system.css') !!}
    {!! HTML::style('public/css/_login.css') !!}

@endsection

@section('content')

    <section class='section-main'>

        <div class="wp grid-container">

            <div class="row">


                <div class="col-3">


                    <img src="{{ Resize::img($user->avatar,'mainAvatar') }}" alt="{{ $user->username }}" class="settings-avatar">

                    {!! Form::open(['url'=>'settings/updateavatar','files'=> true,'role'=>'form']) !!}
                    <div class="form-group">
                        {!! Form::file('avatar',['accept'=>'image/*']) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::submit(t('Update Avatar'),['class'=>'btn btn-default btn-lg btn-success']) !!}
                    </div>
                    {!! Form::close() !!}

                </div>

                <div class="col-5">

                    {!! Form::open(['url' => 'settings/updateprofile']) !!}
                    <div class="form-group">
                        <label for="username">{{ t('Username') }}
                            <small>( username can't be changed )</small>
                        </label>
                        {!! Form::text('username',$user->username,['class'=>'form-control input-lg','disabled'=>'disabled']) !!}
                    </div>
                    <div class="form-group">
                        <label for="fullname">{{ t('Fullname') }}</label>
                        {!! Form::text('fullname',$user->fullname,['class'=>'form-control input-lg','required'=>'required']) !!}
                    </div>
                    <div class="form-group">
                        <label for="gender">{{ t('Gender') }}
                            <small>*</small>
                        </label>
                        {!! Form::select('gender', ['male' => t('Male'), 'female' => t('Female')], auth()->user()->gender, ['id'=>'gender','class'=>'form-control input-lg','required'=>'required']) !!}
                    </div>

                    {!! Form::submit(t('Update'),['class'=>'btn btn-default btn-lg btn-success']) !!}
                    {!! Form::close() !!}
                    <br>


                    <h3 class="content-heading"><i class="fa fa-envelope-o fa-fw"></i> {{ t('Email Settings') }}</h3>
                    {!! Form::open(['url' => 'settings/mailsettings']) !!}
                    <div class="form-group">
                        <label for="emailcomment">{{ t('Email preferencias 1') }}</label>
                        {!! Form::checkbox('email_comment',1,$user->email_comment) !!}
                    </div>
                    <div class="form-group">
                        <label for="emailreply">{{ t('Email preferencias 2') }}</label>
                        {!! Form::checkbox('email_reply',1,$user->email_reply) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::submit(t('Update Mail Settings'),['class'=>'btn btn-default btn-lg btn-success']) !!}
                    </div>
                    {!! Form::close() !!}
                    <br>

                    @if (!$user->isSocial())


                       <h3 class="content-heading"><i class="fa fa-key fa-fw"></i> {{ t('Change Password') }}</h3>
                       {!! Form::open(['url'=>'settings/changepassword']) !!}
                       <div class="form-group">
                           <label for="currentpassword">{{ t('Current Password') }}</label>
                           {!! Form::password('currentpassword',['class'=>'form-control input-lg', 'required']) !!}
                       </div>
                       <div class="form-group">
                           <label for="password">{{ t('New Password') }}</label>
                           {!! Form::password('password',['class'=>'form-control input-lg', 'required']) !!}
                       </div>
                       <div class="form-group">
                           <label for="password_confirmation">{{ t('Confirm Password') }}</label>
                           {!! Form::password('password_confirmation',['class'=>'form-control input-lg', 'required']) !!}
                       </div>
                       <div class="form-group">
                           {!! Form::submit(t('Change Password'),['class'=>'btn btn-default btn-lg btn-success']) !!}
                       </div>
                       {!! Form::close() !!}



                    @endif

                </div>

            </div>

        </div>

    </section>

@endsection