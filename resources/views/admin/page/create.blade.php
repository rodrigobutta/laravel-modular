@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open(['method' => 'PUT', 'route' => 'admin.pages.create']) !!}
            <div class="form-group">
                {!! Form::label('title') !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
            </div>

            <div class="form-group">
                {!! Form::submit('Create',['class'=>'btn btn-success'])  !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('extra-js')

@endsection