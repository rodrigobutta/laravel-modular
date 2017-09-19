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

                    @if (session('status'))

                        <h2>{{session('status')}}</h2>

                    @else

                        {!! Form::open()  !!}

                            <div class="form-group">
                                {!! Form::label('email', t('E-mail')) !!}
                                {!! Form::text('email',null,['class'=>'form-control input-lg','id'=>'username','placeholder'=> t('E-mail'), 'required']) !!}
                            </div>
                            <div class="form-group">
                                {!! Recaptcha::render() !!}
                            </div>
                            <div class="form-group">
                                 {!! Form::submit(t('Accept'),['class'=>'btn btn-success'])  !!}
                             </div>

                         {!! Form::close() !!}


                    @endif


                 </div>

             </div>

         </div>

    </section>

@endsection