@extends('master/index')

@section('content')


  <div id="intranet_taskos">

      <div class="container-fluid cover" style="background-image:url(public/img/emprendimientos/cover.jpg)"></div>

      <div class="intranet-spacer intranet-spacer-md"></div>

      <div class="container-fluid tasko-title" id="arquitectas" style="background-image:url(xxxxpublic/img/emprendimientos/2.jpg)">
        <div class="container">
          <div class="row ">
            <div class="col-md-4 sticky-parent">
                <figure class="sticky"><a href="#"><img class="img-responsive" src="public/img/taskos-logos/arquitectas-sustentables.svg" alt="Arquitectas Sustentables"></a></figure>
            </div>
              <div class="col-md-7 col-md-offset-1">
                <p><strong>ArquitectasSustentables</strong> nace con el objetivo de generar un <strong>espacio</strong> de intercambio, consultas, formulación y trabajo, para las Profesionales de la Industria de la Arquitectura y Diseño Sustentable.</p>
                <p>Creemos que los Profesionales de la Construcción tienen mucho que decir y aportar a la Industria de la Arquitectura y Diseño Sustentable.</p>
                <p><strong>Por qué Profesionales mujeres?</strong> Pues entendemos que las mujeres son más entusiastas a la hora de incorporar temáticas nuevas a su quehacer laboral y cotidiano.</p>
                <p><strong>Por qué Arquitectura y Diseño Sustentable?</strong> Porque estamos convencidos que construir sustentablemente es pensar en el bienestar de la Comunidad, valorando los recursos y utilizándolos de manera adecuada. Es invertir para no mal gastar.</p>
                <p><a href="#" class="btn btn-solid btn-md">Conocé Más</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="intranet-spacer intranet-spacer-md"></div>

      <div class="container-fluid tasko-title" id="vademecum">
        <div class="container">
          <div class="row ">
            <div class="col-md-4 sticky-parent">
                <figure class="sticky"><a href="#"><img class="img-responsive" src="public/img/taskos-logos/vademecum.svg" alt="Vademecum Sustentable"></a></figure>
            </div>
              <div class="col-md-7 col-md-offset-1">
                <p><strong>vademecumsustentable</strong> es una herramienta digital que reúne  todos los taskos y soluciones sustentables de la Industria de la Construcción y el Diseño. Aporta un espacio único de encuentro, de exhibición de taskos | soluciones constructivas, y de capacitación.</p>
                <p>Esta herramienta está dirigida a los Profesionales y Estudiantes de la Industria de la Arquitectura y Diseño Sustentable y al público consumidor final “verde”, interesado en conocer y adquirir bienes y soluciones constructivas  que no dañen el medio ambiente, sean saludables y sustentables en sus procesos.</p>
                <p>Por qué vademecumsustentable? Porque creemos que la <strong>construcción sustentable</strong> engloba disc iplinas que hacen bien, por lo cual pensar en <strong>construcción y diseño sustentable</strong>, es pensar en la salud, el bienestar de las personas y de la comunidad, valorando los recursos y utilizándolos de manera adecuada. Es invertir para no mal gastar.</p>
                <p><a href="#" class="btn btn-solid btn-md">Conocé Más</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="intranet-spacer intranet-spacer-md"></div>

  </div>


@endsection


@section('extra-js')


  {!! HTML::script('resources/assets/vendor/fixto/dist/fixto.min.js') !!}


  <script>

    $(function(){

        $("#main_menu_emprendimientos").addClass('active');

        $("header").addClass("always small");


        /*
        $('.sticky-parent').each(function(){
            $(this).css({'height':$(this).closest(".row").height()});
        })

        $(".sticky").fixTo('.sticky-parent', {
            zIndex: 10,
            useNativeSticky: false,
            top: $('header').height() + 20
        });
        */


    });

  </script>

@endsection


