@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open(['method' => 'PUT', 'route' => 'admin.contents.create']) !!}
            <div class="form-group">
                {!! Form::label( t('Title') ) !!}
                {!! Form::text('title',null,['class'=>'form-control']) !!}
            </div>
            <div class="form-group">
                {!! Form::label('type', t('Type')) !!}
                {!! Form::select('type', array('html' => 'HTML', 'json' => 'JSON', 'image' => 'Imagen' , 'general' => 'General')) !!}
            </div>
            <div class="form-group">
                {!! Form::submit(t('Create'),['class'=>'btn btn-success'])  !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

@section('extra-js')
    <script src="//cdnjs.cloudflare.com/ajax/libs/ckeditor/4.2/ckeditor.js"></script>
@endsection