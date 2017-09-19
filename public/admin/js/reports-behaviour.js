

// var colors = Highcharts.getOptions().colors;

var colors = ['#00c0ef', '#337ab7','#00a65a','#f39c12','#00a65a','#7cb5ec','#434348','#90ed7d'];

Highcharts.setOptions({colors: colors});

// VER COMO PONER ESTO COMO FILTRO
var sessions_min = 50;



$(function () {





    // mes sesiones vs pageviews
    getGoogleAnalyticsData('ga:sessions,ga:pageviews','ga:day,ga:month','','','','', function (data) {
      // console.log(data);

      var graph_sessions = [];
      var graph_pageviews = [];
      var graph_x = [];

      for (j = 0; j < data.rows.length; j += 1) {

          graph_sessions.push(parseInt(data.rows[j]["ga:sessions"]));
          graph_pageviews.push(parseInt(data.rows[j]["ga:pageviews"]));

          graph_x.push(data.rows[j]["ga:day"] + '/' + data.rows[j]["ga:month"]);

      }

      Highcharts.chart('chart_sessions_pageviews_date', {
          chart: {
              type: 'line'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: graph_x
          },
          yAxis: {
              title: {
                  text: ''
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: false
              }
          },
          series: [{
              name: 'Sesiones',
              data: graph_sessions
          }, {
              name: 'Páginas vistas',
              data: graph_pageviews
          }]
      });


    });





    // top pages
    getGoogleAnalyticsData('ga:sessions','ga:pagePath,ga:pageTitle','','-ga:sessions','','10', function (data) {
        // console.log(data);


        var tech_data = [];
        for (j = 0; j < data.rows.length; j += 1) {

           tech_data.push({
               name: data.rows[j]["ga:pagePath"],
               y: parseInt( data.rows[j]["ga:sessions"] ),
               // color: Highcharts.Color(data[i].color).get()
           });


          $('#table_top_pages tbody').append('<tr><td>'+data.rows[j]["ga:pageTitle"]+'</td><td>'+data.rows[j]["ga:pagePath"]+'</td><td>'+data.rows[j]["ga:sessions"]+'</td></tr>');

        }

        Highcharts.chart('chart_top_pages', {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y:.0f})'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: tech_data
            }]
        });


    });










});
