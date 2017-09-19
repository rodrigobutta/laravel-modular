@extends('master/index')

@section('content')

    <div class="container-fluid">
        <div class="row">
            <div id="intranet_full_map"></div>
        </div>
    </div>

    <div id="contact_box" class="container">
        <div class="intranet-spacer intranet-spacer-md"></div>
        <div class="row">
           {{--  <div class="col-md-12">
                <h2 class="fh5co-uppercase-heading-sm text-center">Form</h2>
                <div class="fh5co-spacer fh5co-spacer-sm"></div>
            </div> --}}
            <div class="col-md-5">


                    <h3 class="intranet-contact-heading">Ponete en contacto con nosotros</h3>
                    {{-- <p>asd jak djkslajd sk daksd jasl djas djaks djakls djalsk djaskd laksjd alkdjalkjakdja</p> --}}
                    <ul class="list-data">
                        @if(getContent("datos-de-contacto")->address!="")
                            <li><a href="{{getContent("datos-de-contacto")->mapsurl}}" target="blank" rel="nofollow"><i class="fa fa-map-marker"></i><span>{{getContent("datos-de-contacto")->address}}
                            @if(getContent("datos-de-contacto")->address2!="")
                                <br>{{getContent("datos-de-contacto")->address2}}
                            @endif
                            </span></a></li>
                        @endif
                        @if(getContent("datos-de-contacto")->email!="")
                            <li><a href="mailto:{{getContent("datos-de-contacto")->email}}?subject=Consulta Web"><i class="fa fa-envelope"></i><span>{{getContent("datos-de-contacto")->email}}</span></a></li>
                        @endif
                        @if(getContent("datos-de-contacto")->phone!="")
                            <li><a href="tel{{getContent("datos-de-contacto")->phone}}"><i class="fa fa-phone"></i><span>{{getContent("datos-de-contacto")->phone}}</span></a></li>
                        @endif
                        @if(getContent("datos-de-contacto")->cellphone!="")
                            <li><a href="tel:{{getContent("datos-de-contacto")->cellphone}}"><i class="fa fa-mobile"></i><span>{{getContent("datos-de-contacto")->cellphone}}</span></a></li>
                        @endif
                    </ul>
                    <div class="intranet-spacer intranet-spacer-md"></div>

                    @if(getContent("redes-sociales")->linkedin!=""||getContent("redes-sociales")->facebook!=""||getContent("redes-sociales")->instagram!=""||getContent("redes-sociales")->google!="")
                        <h3 class="intranet-contact-heading">Seguinos en las redes Sociales</h3>
                    @endif
                    <ul class="intranet-social-icons">
                        @if(getContent("redes-sociales")->linkedin!="")
                            <li><a href="{{getContent("redes-sociales")->linkedin}}" target="_blank" rel="nofollow"><i class="fa fa-linkedin"></i></a></li>
                        @endif
                        @if(getContent("redes-sociales")->facebook!="")
                            <li><a href="{{getContent("redes-sociales")->facebook}}" target="_blank" rel="nofollow"><i class="fa fa-facebook"></i></a></li>
                        @endif
                        @if(getContent("redes-sociales")->instagram!="")
                            <li><a href="{{getContent("redes-sociales")->instagram}}" target="_blank" rel="nofollow"><i class="fa fa-instagram"></i></a></li>
                        @endif
                        @if(getContent("redes-sociales")->google!="")
                            <li><a href="{{getContent("redes-sociales")->google}}" target="_blank" rel="nofollow"><i class="fa fa-google"></i></a></li>
                        @endif
                        @if(getContent("redes-sociales")->twitter!="")
                            <li><a href="{{getContent("redes-sociales")->twitter}}" target="_blank" rel="nofollow"><i class="fa fa-twitter"></i></a></li>
                        @endif
                    </ul>

            </div>
            <div class="col-md-7 {{-- col-md-offset-2 --}}">
                <div id="form_wrapper">
                    @include('master/form', ['type' => 'contact'])
                </div>
            </div>
        </div>
    </div>


    <div class="intranet-spacer intranet-spacer-md"></div>



@endsection


@section('extra-js')


    <script type="text/javascript">
        var route_contact_states = '{{ route('contact.states') }}';
        var route_contact_cities = '{{ route('contact.cities') }}';
        var route_contact_store = '{{ route('contact.store') }}';
    </script>




    <script>


        load_map = true;

        $(function(){

            $("#main_menu_contacto").addClass('active');

            $("header").addClass("always small");

            contactFormBind();

        });

    </script>

@endsection
