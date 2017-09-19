

// var colors = Highcharts.getOptions().colors;

var colors = ['#00c0ef', '#337ab7','#00a65a','#f39c12','#00a65a','#7cb5ec','#434348','#90ed7d'];

Highcharts.setOptions({colors: colors});

// VER COMO PONER ESTO COMO FILTRO
var sessions_min = 50;





$(function () {






    // mes nuevos vs reincidentes
    getGoogleAnalyticsData('ga:sessions','ga:userType,ga:day,ga:month','','','','', function (data) {
      // console.log(data);

      var tech_data_new = [];
      var tech_data_returning = [];

      var graph_x = [];


      for (j = 0; j < data.rows.length; j += 1) {

        if(data.rows[j]["ga:userType"]=='New Visitor'){
          tech_data_new.push(parseInt(data.rows[j]["ga:sessions"]));

          graph_x.push(data.rows[j]["ga:day"] + '/' + data.rows[j]["ga:month"]);

        }
        else if(data.rows[j]["ga:userType"]=='Returning Visitor'){
          tech_data_returning.push(parseInt(data.rows[j]["ga:sessions"]));
        }

        // if(data.rows[j]["ga:date"]!=graph_x[graph_x.length]){
        //   graph_x.push(data.rows[j]["ga:date"]);
        // }

      }

      Highcharts.chart('chart_sessions_date', {
          chart: {
              type: 'column'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          xAxis: {

              categories: graph_x,

          },

          yAxis: {
              min: 0,
              title: {
                  text: 'asdsadsa'
              },
              stackLabels: {
                   enabled: true,
                   style: {
                       fontWeight: 'bold',
                       color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                   }
               }
          },
          plotOptions: {
              column: {
                  stacking: 'normal',
                  dataLabels: {
                      enabled: true,
                      color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                  }
              }
          },
          series: [{
              name: 'Nuevos',
              data: tech_data_new
          }, {
              name: 'Reincidentes',
              data: tech_data_returning
          }]
      });


    });





    // referrals
    getGoogleAnalyticsData('ga:sessions','ga:fullReferrer','','-ga:sessions','','10', function (data) {
        // console.log(data);


        var tech_data = [];
        for (j = 0; j < data.rows.length; j += 1) {

           tech_data.push({
               name: data.rows[j]["ga:fullReferrer"],
               y: parseInt( data.rows[j]["ga:sessions"] ),
               // color: Highcharts.Color(data[i].color).get()
           });


          $('#table_top_referrals tbody').append('<tr><td>'+data.rows[j]["ga:fullReferrer"]+'</td><td>'+data.rows[j]["ga:sessions"]+'</td></tr>');

        }

        Highcharts.chart('chart_top_referrals', {
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









    // arrival pages
    getGoogleAnalyticsData('ga:sessions','ga:pagePath,ga:pageTitle','','-ga:sessions','','10', function (data) {
        // console.log(data);

        for (j = 0; j < data.rows.length; j += 1) {

          $('#table_arrival_pages tbody').append('<tr><td>'+data.rows[j]["ga:pageTitle"]+'</td><td>'+data.rows[j]["ga:pagePath"]+'</td><td>'+data.rows[j]["ga:sessions"]+'</td></tr>');

        }



    });








    // new vs returning
    getGoogleAnalyticsData('ga:sessions','ga:userType','','','','', function (data) {
        // console.log(data);


        var tech_data = [];
        for (j = 0; j < data.rows.length; j += 1) {

           tech_data.push({
               name: data.rows[j]["ga:userType"],
               y: parseInt( data.rows[j]["ga:sessions"] ),
               // color: Highcharts.Color(data[i].color).get()
           });

        }

        Highcharts.chart('chart_new_vs_returning', {
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
