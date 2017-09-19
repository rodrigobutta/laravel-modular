@extends('admin/master/index')

@section('head')

  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/data.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/drilldown.js"></script>

@endsection

@section('content')


  <section class="content">


    <div class="row">

        <section class="content-header">
          <h1>
            Reporte de adquisición
            {{-- <small>MuyPunch</small> --}}
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Reportes</a></li>
            <li class="active">Adquisición</li>
          </ol>
        </section>

    </div>


    <div class="row">
      <div class="col-md-12">
        <div class="box ratio" data-ratio="1.7">
          <div class="box-header with-border">
            <h3 class="box-title">Mes visitas nuevas y reincidentes</h3>
          </div>
          <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                     <div id="chart_sessions_date"></div>
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
              <h3 class="box-title">Nuevos VS Reincidentes</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                       <div id="chart_new_vs_returning"></div>
                  </div>
                </div>
            </div>
            <div class="box-footer clearfix">
              <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Abrir en Analytics</a>
              <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">Ver más</a>
            </div>
          </div>


          <div class="box ratio" data-ratio="1.7">
            <div class="box-header with-border">
              <h3 class="box-title">Páginas de llegada</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table id="table_arrival_pages" class="table no-margin">
                        <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Url</th>
                          <th>Visitas</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </div>
            <div class="box-footer clearfix">
              <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Abrir en Analytics</a>
              <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">Ver más</a>
            </div>
          </div>


          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title">Referidos</h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                     <div id="chart_top_referrals"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="chart-responsive ratio" data-ratio="1">
                      <table id="table_top_referrals" class="table no-margin">
                        <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Visitas</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-footer no-padding">
              <ul id="graph_referrers_list" class="nav nav-pills nav-stacked graph-list">
              </ul>
            </div>
          </div>



        </div>
        <!-- /.col -->

      </div>
      <!-- /.row -->


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

    {!! HTML::script('public/admin/js/reports-aquisition.js') !!}

    <script>

        $(document).ready(function() {

        });

    </script>

@endsection