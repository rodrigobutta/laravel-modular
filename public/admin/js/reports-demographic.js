

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







    // heat hour day
    getGoogleAnalyticsData('ga:sessions','ga:dayOfWeek,ga:hour','','','ga:sessions>10','', function (data) {
        // console.log(data);



        var tech_data = [];
        for (j = 0; j < data.rows.length; j += 1) {

           tech_data.push([parseInt(data.rows[j]["ga:hour"]),parseInt(data.rows[j]["ga:dayOfWeek"]),parseInt(data.rows[j]["ga:sessions"])]);

        }


        // console.log(tech_data);




        Highcharts.chart('chart_heat_day_hour', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: ''
            },

            xAxis: {
                categories: ['00hs', '01hs', '02hs', '03hs', '04hs', '05hs', '06hs', '07hs', '08hs', '09hs', '10hs', '11hs', '12hs', '13hs', '14hs', '15hs', '16hs', '17hs', '18hs', '19hs', '20hs', '21hs', '22hs', '23hs']
            },

            yAxis: {
                categories: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                title: null
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                formatter: function () {
                    return '' + this.point.value + ', ' + this.series.xAxis.categories[this.point.x] + 'hs,<br>' + this.series.yAxis.categories[this.point.y] + ' sesiones';
                }
            },

            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                /*X Y VAL*/
                data: tech_data,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]

        });



    });






});
