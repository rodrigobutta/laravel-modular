@extends('emails/master/generic')

@section('title', 'solicitud de repuestos')

@section('subject', $subject)

@section('left_col')
    @include('emails.master.field', ['label' => 'Nombre', 'value' => $name . ' ' . $surname])
    @include('emails.master.field', ['label' => 'CUIT', 'value' => $cuit])
    @include('emails.master.field', ['label' => 'Teléfono', 'value' => $phone])
    @include('emails.master.field', ['label' => 'Serie', 'value' => $serie])
    @include('emails.master.field', ['label' => 'Códigos', 'value' => $codes])
@endsection

@section('right_col')
    @include('emails.master.field', ['label' => 'Empresa', 'value' => $company])
    @include('emails.master.field', ['label' => 'Email', 'value' => $email])
    @include('emails.master.field', ['label' => 'Modelo', 'value' => $model])
    @include('emails.master.field', ['label' => 'Horómetro', 'value' => $horometro])
    @include('emails.master.field', ['label' => 'Mensaje', 'value' => $mail_message])
@endsection