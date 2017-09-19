@extends('admin/master/index')

@section('head')

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>
  <script src="https://code.highcharts.com/modules/heatmap.js"></script>

@endsection

@section('content')



  <section class="content">


    <div class="row">

        <section class="content-header">
          <h1>
            Reporte demografico
            {{-- <small>MuyPunch</small> --}}
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Reportes</a></li>
            <li class="active">Demografico</li>
          </ol>
        </section>

    </div>





      <div class="row">
        <div class="col-md-12">
          <div class="box ratio" data-ratio="1.7">
            <div class="box-header with-border">
              <h3 class="box-title">Mapa de Calor de días y horarios</h3>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                       <div id="chart_heat_day_hour"></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>



      <div class="row">
        <div class="col-md-12">
          <div class="box ratio" data-ratio="1.7">
            <div class="box-header with-border">
              <h3 class="box-title">Mes sesiones y paginas vistas</h3>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                       <div id="chart_sessions_pageviews_date"></div>
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

    {!! HTML::script('public/admin/js/reports-demographic.js') !!}

    <script>

        $(document).ready(function() {

        });

    </script>

@endsection
