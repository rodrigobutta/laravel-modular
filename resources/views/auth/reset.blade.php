@extends('master/plain')

@section('head')

    {!! HTML::style('public/css/bootstrap-form.css') !!}

    {!! HTML::style('public/css/grid_system.css') !!}

@endsection

@section('content')

    <section class='section-main'>

        <div class="wp grid-container">

            <div class="row">

                <div class="col-5">

                    {!! Form::open()  !!}
                        <input type="hidden" name="token" value="{{ $token }}">
                        <div class="form-group">
                            <label for="email">{{ t('E-mail') }}<small>*</small></label>
                            {!! Form::text('email',null,['class'=>'form-control input-lg','id'=>'email','placeholder'=>'','required'=>'required'])  !!}
                        </div>
                        <div class="form-group">
                            <label for="password">{{ t('Password') }}<small>*</small></label>
                            {!! Form::password('password',['class'=>'form-control input-lg','id'=>'email','placeholder'=>'','required'=>'required'])  !!}
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">{{ t('Confirm Password') }}<small>*</small></label>
                            {!! Form::password('password_confirmation',['class'=>'form-control input-lg','id'=>'email','placeholder'=>'','required'=>'required'])  !!}
                        </div>
                        <div class="form-group">
                            {!! Form::submit(t('Accept'),['class'=>'btn btn-success'])  !!}
                        </div>
                    {!! Form::close() !!}

                 </div>

             </div>

         </div>

    </section>

@endsection