@extends('emails/master/generic')

@section('title', 'descarga')

@section('subject', $subject)

@section('left_col')

    @include('emails.master.field', ['label' => 'Nombre', 'value' => $name])
    @include('emails.master.field', ['label' => 'Email', 'value' => $email])

@endsection

@section('right_col')
    @include('emails.master.field', ['label' => 'Apellido', 'value' => $surname])
    @include('emails.master.field', ['label' => 'Teléfono', 'value' => $phone])
@endsection