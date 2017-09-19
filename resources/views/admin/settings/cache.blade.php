@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open() !!}
            <div class="form-group">
                {!! Form::label('settings_cache', 'Limpiar Cache de configuración') !!}
                {!! Form::checkbox('settings_cache') !!}
            </div>
            <div class="form-group">
                {!! Form::label('template_cache', 'Limpiar Cache de las vistas') !!}
                {!! Form::checkbox('template_cache') !!}
            </div>
            <div class="form-group">
                {!! Form::label('route_cache', 'Limpiar Cache de rutas') !!}
                {!! Form::checkbox('route_cache') !!}
            </div>
            <div class="form-group">
                {!! Form::submit('Procesar',array('class'=>'btn btn-success')) !!}
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection

