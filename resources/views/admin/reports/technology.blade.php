@extends('admin/master/index')

@section('head')

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>

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


    <div class="row">

        <section class="content-header">
          <h1>
            Reporte de tecnología
            {{-- <small>MuyPunch</small> --}}
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Reportes</a></li>
            <li class="active">Tecnología</li>
          </ol>
        </section>

    </div>



      <div class="row">
        <div class="col-md-12">
          <div class="box ratio" data-ratio="1.7">
            <div class="box-header with-border">
              <h3 class="box-title">Tecnología</h3>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                       <div id="chart_browser" style="height: 500px"></div>
                      <div id="chart_device" style="height: 500px"></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>





    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <script id="template_most_visited_row" type="x-tmpl-mustache">
      <tr>
        <td><a href="@{{url}}">@{{url}}</a></td>
        <td>@{{page_title}}</td>
        <td>@{{page_views}}</td>
      </tr>
  </script>

  <script id="template_graph_loader" type="x-tmpl-mustache">

        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>

  </script>

@endsection

@section('extra-js')

    {!! HTML::script('public/admin/js/reports-technology.js') !!}

    <script>

        $(document).ready(function() {

        });

    </script>





@endsection
