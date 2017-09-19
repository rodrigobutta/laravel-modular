@extends('admin/master/index')

@section('head')

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>
  <script src="https://code.highcharts.com/modules/heatmap.js"></script>


@endsection

@section('content')

    {{-- {!! HTML::style('public/admin/plugins/jvectormap/jquery-jvectormap-1.2.2.css') !!} --}}
    {{-- {!! HTML::script('public/admin/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js') !!} --}}
    {{-- {!! HTML::script('public/admin/plugins/jvectormap/jquery-jvectormap-world-mill-en.js') !!} --}}

    {{-- {!! HTML::script('resources/assets/vendor/chart.js/dist/Chart.js') !!} --}}

    {{-- {!! HTML::script('resources/assets/vendor/jquery.sparkline/dist/jquery.sparkline.min.js') !!} --}}

    {{-- {!! HTML::script('resources/assets/vendor/jquery-knob/dist/jquery.knob.min.js') !!} --}}

    {!! HTML::script('resources/assets/vendor/moment/moment.js') !!}

    {{-- {!! HTML::script('resources/assets/vendor/morris.js/morris.min.js') !!} --}}
    {{-- {!! HTML::style('resources/assets/vendor/morris.js/morris.css') !!} --}}


    {{-- {!! HTML::script('resources/assets/vendor/bootstrap-daterangepicker/daterangepicker.js') !!} --}}
    {{-- {!! HTML::style('resources/assets/vendor/bootstrap-daterangepicker/daterangepicker.css') !!} --}}

    {{-- {!! HTML::script('resources/assets/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') !!} --}}
    {{-- {!! HTML::style('resources/assets/vendor/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css') !!} --}}


  <section class="content">

{{--  
    <div class="row">

        <section class="content-header">
          <h1>
            Panel de administración            
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
          </ol>
        </section>

    </div>  --}}


    @if(env('APP_DEBUG'))
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="callout callout-warning lead">
                <h4>Modo depuración</h4>
                <p>El sitio se encuentra en modo de depuración y ciertas funcionalidades pueden verse afectadas por esto. Al momento de activarse producción, este modo debería ser desactivado.</p>
            </div>
        </div>
    </div>
    @endif


{{--  

      <div class="row">

        <div class="col-lg-3 col-xs-6 col-md-3">
          <div class="small-box bg-green">
            <div class="inner">
              <h3>0</h3>
              <p>Visitas</p>
            </div>
            <div class="icon">
              <i class="fa fa-user"></i>
            </div>
            <a href="#" class="small-box-footer">{{t('More info')}} <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6 col-md-3">
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>0<sup style="font-size: 20px">%</sup></h3>
              <p>{{t('Bounce Rate')}}</p>
            </div>
            <div class="icon">
              <i class="fa fa-pie-chart"></i>
            </div>
            <a href="#" class="small-box-footer">{{t('More info')}} <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6 col-md-3">
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>0</h3>
              <p>Conversión Ventas</p>
            </div>
            <div class="icon">
              <i class="fa fa-shopping-cart"></i>
            </div>
            <a href="#" class="small-box-footer">{{t('More info')}} <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6 col-md-3">
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>0</h3>
              <p>Conversión Alquileres</p>
            </div>
            <div class="icon">
              <i class="fa fa-shopping-cart"></i>
            </div>
            <a href="#" class="small-box-footer">{{t('More info')}} <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>

      </div>

  --}}


    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


@endsection

@section('extra-js')

    {!! HTML::script('public/admin/js/dashboard.js') !!}

    <script>

        $(document).ready(function() {

            preserveAspect();
            $(window).resize(preserveAspect);

        });

        function preserveAspect() {

          // var scaled = $(".ratio");

          // scaled.height("100%").css("box-sizing", "border-box");

          // var ratio = scaled.data('ratio');
          // var w = scaled.outerWidth();

          // scaled.height(w/ratio);

        }


    </script>





@endsection
