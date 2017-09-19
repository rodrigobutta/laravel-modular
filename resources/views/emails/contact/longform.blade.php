@extends('emails/master/generic')

@section('title', 'contacto')

@section('subject', $subject)

@section('actions', $actions)

@section('left_col')
    @include('emails.master.field', ['label' => 'Nombre', 'value' => $name . ' ' . $surname])
    @include('emails.master.field', ['label' => 'Rubro', 'value' => $company_category])
    @include('emails.master.field', ['label' => 'Teléfono', 'value' => $phone])
    @include('emails.master.field', ['label' => 'Provincia / Estado', 'value' => $state])
    @include('emails.master.field', ['label' => 'Mensaje', 'value' => $mail_message])
@endsection


@section('right_col')
    @include('emails.master.field', ['label' => 'Empresa', 'value' => $company])
    @include('emails.master.field', ['label' => 'Email', 'value' => $email])
    @include('emails.master.field', ['label' => 'País', 'value' => $country])    
    @include('emails.master.field', ['label' => 'Ciudad', 'value' => $city])
@endsection