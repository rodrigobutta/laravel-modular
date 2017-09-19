@extends('admin.master.index')
@section('content')
    <div class="row">
        <div class="col-md-3">
            {{-- <img src="{{ Resize::img($user->avatar,'mainAvatar') }}" class="thumbnail img-responsive"> --}}
            <ul class="list-group">
                <a href="#" class="list-group-item disabled">Statics</a>
                <li class="list-group-item"><strong>Agregado</strong> {{ $user->created_at->diffForHumans() }} </li>
                <li class="list-group-item"><strong>Actualizado</strong> {{ $user->updated_at->diffForHumans() }} </li>
            </ul>
        </div>
        <div class="col-md-5">
            {!! Form::open() !!}
            <div class="form-group">
                {!! Form::label('username', 'Nombre') !!}
                {!! Form::text('username', $user->username, ['class' => 'form-control input-lg', 'placeholder' => '', 'disabled']) !!}
            </div>
            <div class="form-group">
                {!! Form::label('fullname', 'Descripción') !!}
                {!! Form::text('fullname', $user->fullname, ['class' => 'form-control input-lg', 'placeholder' => '']) !!}
            </div>
            <div class="form-group">
                {!! Form::label('email', 'Email') !!}
                {!! Form::text('email', $user->email, ['class' => 'form-control input-lg', 'placeholder' => '']) !!}
            </div>
            <div class="form-group">
                {!! Form::label('profiles', 'Perfiles') !!}
                <select id="profiles" class="form-control input-lg tagging" multiple="multiple" name="profiles[]">
                    @foreach($field_profiles as $p)
                        <option value="{{ $p['id'] }}" {{ $p['value'] ? "selected=\"selected\"" : "" }}>{{ $p['title'] }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group">
                <label for="delete">Click aqui para eliminar usuario</label>
                {!! Form::checkbox('delete',true, false) !!}
            </div>

            {!! Form::submit('Guardar', ['class' => 'btn btn-success btn-lg']) !!}
            {!! Form::close() !!}
        </div>
        <div class="col-md-4">

        </div>
    </div>
@endsection
@section('extra-js')
    <script>
        $(function () {
            $(".tagging").select2({
                theme: "bootstrap",
                // minimumInputLength: 2,
                maximumSelectionLength: {{ (int)siteSettings('tagsLimit') }},
                tags: true,
                tokenSeparators: [","]
            })
        });
    </script>
@endsection