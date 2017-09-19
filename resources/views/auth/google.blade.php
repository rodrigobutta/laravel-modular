@extends('master/plain')

@section('head')

    {!! HTML::style('public/css/bootstrap-form.css') !!}

    {!! HTML::style('public/css/grid_system.css') !!}
    {!! HTML::style('public/css/_login.css') !!}

@endsection

@section('content')
    @if (Session::has('error'))
        <div class="alert alert-danger fade in">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>{{ trans(Session::get('reason')) }}</strong>
        </div>
    @endif

    <section class='section-main'>

        <div class="wp grid-container ">
            <div class="row">
                <div class="col-5">

                    {!! Form::open() !!}
                        {!! Form::submit(t('Continue as') . ' ' . $oauth_user->name ,array('class'=>'btn btn-success'))  !!}
                    {!! Form::close()  !!}

                </div>
            </div>
        </div>

    </section>

@endsection