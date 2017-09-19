@extends('master/plain')

@section('head')

    {!! HTML::style('public/css/bootstrap-form.css') !!}

    {!! HTML::style('public/css/grid_system.css') !!}
    {!! HTML::style('public/css/_login.css') !!}

@endsection

@section('content')

    <section class='section-main'>

        <div class="wp grid-container">

            <div class="row">

                <div class="col-12">

                      <div class="user-panel">
                          <div class="pull-left">
                            <img src="{{ Resize::img(auth()->user()->avatar,'user128') }}" alt="User Image">
                          </div>
                          <div class="pull-left">
                            <p>{{ auth()->user()->fullname }}</p>

                            @if (auth()->user()->isSuper() || auth()->user()->isAdmin())
                                <a class="btn btn-primary" href="{{ route('admin') }}">{{t('Admin')}}</a>
                            @endif

                            <a class="btn btn-success" href="{{ route('users.settings') }}">{{t('Profile')}}</a>
                            <a class="btn btn-warning" href="{{ route('logout') }}">{{t('Logout')}}</a>
                          </div>
                      </div>

                </div>

            </div>

        </div>

    </section>

@endsection