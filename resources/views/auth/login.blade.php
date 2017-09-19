@extends('master/index')

@section('bodyclass', 'login-page')

@section('content')

    <div id='intranet_login'>
        <div class="intranet-spacer intranet-spacer-lg"></div>
        <div class="container">
            <div class="row">

                <div class="col-md-5">

                    {!! Form::open() !!}
                    <div class="form-group">
                        {!! Form::label('username', 'Usuario') !!}
                        {!! Form::text('username',null,array('class'=>'form-control input-lg','id'=>'username','placeholder'=> '', 'required')) !!}
                    </div>
                    <div class="form-group">
                        {!! Form::label('password', 'Contraseña') !!}
                        {!! Form::password('password',['class'=>'form-control input-lg','id'=>'password','placeholder'=>'','autocomplete'=>'off', 'required']) !!}
                    </div>
                    {{-- <div class="form-group">
                        <label>
                            Recordame {!! Form::checkbox('remember-me', 'value') !!}
                        </label>
                    </div> --}}
                     <div class="form-group">
                        <a href="{{ route('password.reminder') }}">Olvidaste tu contraseña?</a>
                    </div>

          {{--               <div class="form-group">
                            <label for="recaptcha">{{ t('Type these words') }}
                                <small>*</small>
                            </label>
                            {!! Recaptcha::render() !!}
                        </div>
                  --}}
                    <div class="form-inline">
                        <div class="form-group">
                            <div class="form-group">{!! Form::submit(t('Login'),['class'=>'btn btn-primary btn-lg']) !!}</div>
                        </div>
                    </div>
                    {!! Form::close() !!}

                </div>

                <div class="col-md-7">

                    <div class="form-group pull-right">
                        {{-- <div class="form-group">&nbsp;<a href="{{ url('auth/facebook') }}"><img src="{{ asset('public/img/f.png') }}"></a></div> --}}
                        {{-- <div class="form-group">&nbsp;<a href="{{ url('auth/google') }}"><img src="{{ asset('public/img/g.png') }}"></a></div> --}}
                        {{-- <div class="form-group">&nbsp;<a href="{{ url('auth/twitter') }}"><img src="{{ asset('public/img/t.png') }}"></a></div> --}}
                    </div>

                </div>

            </div>

        </div>
        <div class="intranet-spacer intranet-spacer-lg"></div>
    </div>

@endsection
