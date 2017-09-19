@extends('master/index')


@section('content')

<div id="intranet_home" >

   <div id="intranet_slogan" class="" style="background-image: url('{{getContent('home-cover-image','homeCover')}}');">

     <div class="container">
       <div class="row">
         <div class="col-md-12">
           <div class="intranet-full-wrapper">
              <div class="intranet-full-wrapper-inner">
                 <h1 class="in-animate ">Bienvenido</h1>
                 <h2 class="in-animate ">En construcción</h2>
              </div>
           </div>
         </div>
       </div>
     </div>

   </div>

  <div class="intranet-spacer intranet-spacer-sm"></div>

  <div id="intranet-main">
    <div class="container">
      <div class="row" id="intranet_about">
          <div class="col-md-6  col-md-offse222t-2 text-centessr intranet-section-heading about-box">
            <div class="intranet-spacer intranet-spacer-xs"></div>
            <h2 class="intranet-lead">Bienvenido a nuestra intranet</h2>
            <p class="intranet-sub">aldk as;ldkasl;d kas;ld ask'as;ldkas d'al;skd 'asdja sjkdha sdljkashd ajlksdh aslkjdh asjd ashdlj hasjdas hdlaksjd haslkjdhas ldkjash djlkashd jadh ajsdl as</p>
          </div>
          <div class="col-md-6 text-center intranet-section-heading about-box">
          </div>
      </div>
    </div>

      <div class="intranet-spacer intranet-spacer-sm"></div>

      <div class="container" style="overflow: hidden">

        <div class="row" id="intranet-features">


               <div class="col-md-12 text-center intranet-section-heading">
                  <h2 class="intranet-lead">Areas</h2>
               </div>

          <div class="col-md-12" >
            <div id="servicios_wrapper" >

                @foreach($areas as $area)
                  <a href="{{$area->getLink()}}">
                    <div class="text-center intranet-feature feature-box">
                        <div class="intranet-feature-icon">
                          <i class="fa {{$area->info->icon}}"></i>
                        </div>
                        <h3 class="heading">{!!$area->getPrintTitle()!!}</h3>
                        <p>{{$area->info->subline}}</p>
                    </div>
                  </a>
                @endforeach

            </div>
          </div>
        </div>
        <!-- END row -->

      </div>
      <!-- END container -->




    </div>


    <div class="intranet-spacer intranet-spacer-md"></div>


</div>


@endsection


@section('extra-js')

    <script>


      $(function(){

          $("#main_menu_home").addClass('active');

      });



    </script>

@endsection
