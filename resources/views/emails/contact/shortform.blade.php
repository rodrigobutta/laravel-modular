@extends('emails/master/generic')

@section('title', 'contacto')

@section('subject', $subject)

@section('actions', $actions)

@section('left_col')
    @include('emails.master.field', ['label' => 'Nombre', 'value' => $name . ' ' . $surname])
    @include('emails.master.field', ['label' => 'Teléfono', 'value' => $phone])
@endsection

@section('right_col')
    @include('emails.master.field', ['label' => 'Email', 'value' => $email])
    @include('emails.master.field', ['label' => 'Mensaje', 'value' => $mail_message])
@endsection