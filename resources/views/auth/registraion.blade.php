@extends('master/index')

@section('head')

    {!! HTML::style('public/css/bootstrap-form.css') !!}

    {!! HTML::style('public/css/grid_system.css') !!}

@endsection


@section('content')
    @if (Session::has('error'))
        <div class="alert alert-danger fade in">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>{{ trans(Session::get('reason')) }}</strong>
        </div>
    @endif

    <section class='section-main'>

        <div class="wp grid-container">

            <div class="row">

                <div class="col-3">

                    <h3 class="content-heading">
                        <div class="form-inline">
                            <div class="form-group">
                                <div class="form-group">&nbsp;<a href="{{ url('auth/facebook') }}"><img src="{{ asset('public/img/f.png') }}"></a></div>
                                <div class="form-group">&nbsp;<a href="{{ url('auth/google') }}"><img src="{{ asset('public/img/g.png') }}"></a></div>
                            </div>
                         </div>
                    </h3>

                </div>
                <div class="col-5">

                    {!! Form::open() !!}

                        <div class="form-group">
                            <label for="username">{{ t('Username') }}
                                <small>*</small>
                            </label>
                            {!! Form::text('username',null,['class'=>'form-control input-lg','id'=>'username','placeholder'=>'','required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="email">{{ t('E-mail') }}
                                <small>*</small>
                            </label>
                            {!! Form::text('email',null,['class'=>'form-control input-lg','type'=>'email','id'=>'email','placeholder'=>'','required']) !!}
                        </div>
                        <div class="form-group">
                            <label for="fullname">{{ t('Full Name') }}
                                <small>*</small>
                            </label>
                            {!! Form::text('fullname',null,['class'=>'form-control input-lg','id'=>'fullname','placeholder'=>'','required'=>'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="gender">{{ t('Gender') }}
                                <small>*</small>
                            </label>
                            {!! Form::select('gender', ['male' => t('Male'), 'female' => t('Female')], 'male',['class'=>'form-control input-lg','required'=>'required']) !!}
                        </div>


                        <div class="form-group">
                            <label for="password">{{ t('Password') }}
                                <small>*</small>
                            </label>
                            {!! Form::password('password',['class'=>'form-control input-lg','placeholder'=>'','autocomplete'=>'off','required'=>'required']) !!}
                        </div>

                        <div class="form-group">
                            <label for="password_confirmation">{{ t('Retype Password') }}
                                <small>*</small>
                            </label>
                            {!! Form::password('password_confirmation',['class'=>'form-control input-lg','placeholder'=>'','autocomplete'=>'off','required'=>'required']) !!}
                        </div>

                        <div class="form-group">
                            {!! Recaptcha::render() !!}
                        </div>
                        <div class="form-group">
                            {!! Form::submit(t('Accept'),['class'=>'btn btn-success btn-lg']) !!}
                        </div>

                    {!! Form::close() !!}


                </div>

            </div>

        </div>

    </section>


@endsection