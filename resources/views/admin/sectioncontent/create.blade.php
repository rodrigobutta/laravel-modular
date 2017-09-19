@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open(['method' => 'PUT', 'route' => 'admin.sectioncontents.create']) !!}
                <div class="form-group">
                    {!! Form::label('title', t('Title')) !!}
                    {!! Form::text('title',null,['class'=>'form-control']) !!}
                </div>
                <div class="form-group">
                    {!! Form::submit(t('Accept'),['class'=>'btn btn-primary'])  !!}
                    <a class="btn btn-default" href="{{ route('admin.sectioncontents') }}">{{t('Cancel')}}</a>
                </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection