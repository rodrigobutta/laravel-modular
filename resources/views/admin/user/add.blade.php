@extends('admin/master/index')
@section('content')
    <div class="box">
        <div class="box-body">
            {!! Form::open() !!}

            <div class="form-group">
                <label for="username">Nombre</label>
                {!! Form::text('username',null ,array('class'=>'form-control','placeholder'=>'Sin espacios ni caracteres especiales')) !!}
            </div>

            <div class="form-group">
                <label for="username">Descripción</label>
                {!! Form::text('fullname',null ,array('class'=>'form-control','placeholder'=>'Por ej. Nombre y Apellido o Sector')) !!}
            </div>

            <div class="form-group">
                <label for="username">Email</label>
                {!! Form::text('email',null ,array('class'=>'form-control','placeholder'=>'')) !!}
            </div>

            <div class="form-group">
                <label for="username">Contraseña</label>
                {!! Form::password('password',array('class'=>'form-control','placeholder'=>'')) !!}
            </div>

            <div class="form-group">
                {!! Form::submit('Agregar',array('class'=>'btn btn-success')) !!}
            </div>

            {!! Form::close() !!}
        </div>
    </div>
@endsection
