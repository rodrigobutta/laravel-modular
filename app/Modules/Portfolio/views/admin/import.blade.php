@extends('admin/master/index')
@section('content')

    <div class="row">
        <div class="col-md-12">
            <h1>{{$title}}</h1>

            {!! Form::open(['route' => 'admin.portfolio.import', 'files' => true]) !!}
                <div class="form-group">
                    {!! Form::file('excel', ['class' => 'form-control', 'style' => 'padding-bottom: 33px; padding-left: 7px;']) !!}
                </div>
                <div class="form-group">
                    {!! Form::button('<i class="fa fa-download"></i> ' . t('Import'), ['type' => 'submit', 'class' => 'btn btn-primary ']) !!}
                </div>
            {!! Form::close() !!}
        </div>
    </div>





@endsection