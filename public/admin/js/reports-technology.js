

// var colors = Highcharts.getOptions().colors;

var colors = ['#00c0ef', '#337ab7','#00a65a','#f39c12','#00a65a','#7cb5ec','#434348','#90ed7d'];

Highcharts.setOptions({colors: colors});

// VER COMO PONER ESTO COMO FILTRO
var sessions_min = 50;



var tech_data = []


function graphDataAdd(device,os,browser,version,value){

  if(device in tech_data){
    tech_data[device].sessions += value
  }
  else{
    tech_data[device] = {
      sessions: value,
      label: device,
      childs: []
    }
  }

  if(os in tech_data[device].childs){
    tech_data[device].childs[os].sessions += value
  }
  else{
    tech_data[device].childs[os] = {
      sessions: value,
      label: os,
      childs: []
    }
  }

  if(browser in tech_data[device].childs[os].childs){
    tech_data[device].childs[os].childs[browser].sessions += value
  }
  else{
    tech_data[device].childs[os].childs[browser] = {
      sessions: value,
      label: browser,
      childs: []
    }
  }

  if(version in tech_data[device].childs[os].childs[browser].childs){
    tech_data[device].childs[os].childs[browser].childs[version].sessions += value
  }
  else{
    tech_data[device].childs[os].childs[browser].childs[version] = {
      sessions: value
    }
  }


}



$(function () {




    getGoogleAnalyticsData('ga:sessions','ga:deviceCategory,ga:operatingSystem,ga:browser,ga:browserVersion','','','ga:sessions>'+sessions_min,'', function (data) {
        // console.log(data);

        for (var i = 0; i < data.rows.length; i++) {
          graphDataAdd(data.rows[i]["ga:deviceCategory"],data.rows[i]["ga:operatingSystem"],data.rows[i]["ga:browser"],data.rows[i]["ga:browserVersion"],parseInt(data.rows[i]["ga:sessions"]))
        }
        // console.log(tech_data);


        var arr_device = []
        var arr_os = []
        var arr_browser = []
        var dd_browser = [];

        var ix = 0;

        for (var device_key in tech_data) {
          arr_device.push({
            name: device_key,
            y: tech_data[device_key].sessions,
            color: colors[ix],
          })

          for (var os_key in tech_data[device_key].childs) {
            arr_os.push({
              name: os_key,
              y: tech_data[device_key].childs[os_key].sessions,
              color: Highcharts.Color(colors[ix]).brighten(0.075).get(),
            })

            for (var browser_key in tech_data[device_key].childs[os_key].childs) {

              arr_browser.push({
                name: browser_key,
                y: tech_data[device_key].childs[os_key].childs[browser_key].sessions,
                color: Highcharts.Color(colors[ix]).brighten(0.15).get(),
                drilldown: device_key + '-' + os_key + '-' + browser_key
              })

              // drilldown
              var tmp = {
                id: device_key + '-' + os_key + '-' + browser_key,
                name: device_key + ' > ' + os_key + ' > ' + browser_key,
                data: []
              }
              for (var version_key in tech_data[device_key].childs[os_key].childs[browser_key].childs) {
                tmp.data.push([ version_key , tech_data[device_key].childs[os_key].childs[browser_key].childs[version_key].sessions ])
              }
              dd_browser.push(tmp)

            }

          }

          ix++;

        }


        // console.log(arr_browser)
        // console.log(dd_browser)



        // Create the chart
          $('#chart_browser').highcharts({
              chart: {
                  type: 'pie',
                  margin: [0, 0, 0, 0]
              },
              title: {
                  text: ''
              },
              tooltip: {
                  pointFormat: '{series.name}<br>{point.percentage:.1f}%<br>{point.y:.0f} sesiones'
              },
              series: [
                  {
                      name: 'Devices',
                      data: arr_device,
                      size: '40%',
                      dataLabels: {
                          formatter: function() {
                              return this.percentage > 1 ? ''+ this.point.name + '<br>' + this.percentage.toFixed(1) + '%' : null;
                          },
                          distance: -65,
                          color: '#ffffff',
                      }
                  },
                   {
                      name: 'Os',
                      data: arr_os,
                      size: '70%',
                      innerSize: '40%',
                      dataLabels: {
                          formatter: function() {
                              return this.percentage > 1 ? ''+ this.point.name + '<br>' + this.percentage.toFixed(1) + '%' : null;
                          },
                          distance: -70,
                          color: '#ffffff',
                      }
                  },
                   {
                      name: 'Browser',
                      data: arr_browser,
                      size: '80%',
                      innerSize: '70%',
                      dataLabels: {
                          enabled: true,
                          formatter: function() {
                              return this.y > 10 ? ''+ this.point.name + '<br>' + this.percentage.toFixed(1) + '%' : null;
                          }
                      }
                  }
              ],
              drilldown: {
                series: dd_browser
              }
          });






          arr_device = []
          arr_os = []
          arr_browser = []
          dd_browser = [];

          ix = 0;

          for (var device_key in tech_data) {
            arr_device.push({
              name: device_key,
              y: tech_data[device_key].sessions,
              // color: colors[ix],
              drilldown: device_key
            })

            // drilldown
            var tmp = {
              id: device_key,
              name: device_key,
              data: []
            }
            for (var os_key in tech_data[device_key].childs) {
              tmp.data.push({
                  name: os_key,
                  y: tech_data[device_key].childs[os_key].sessions ,
                  drilldown: device_key + '-' + os_key,
                })
            }
            dd_browser.push(tmp)



            for (var os_key in tech_data[device_key].childs) {
              arr_os.push({
                name: os_key,
                y: tech_data[device_key].childs[os_key].sessions,
                // color: Highcharts.Color(colors[ix]).brighten(0.1).get(),
                drilldown: device_key + '-' + os_key
              })


              // drilldown
              var tmp = {
                id: device_key + '-' + os_key,
                name: device_key + ' > ' + os_key,
                data: []
              }
              for (var browser_key in tech_data[device_key].childs[os_key].childs) {
                tmp.data.push({
                    name: browser_key,
                    y: tech_data[device_key].childs[os_key].childs[browser_key].sessions ,
                    drilldown: device_key + '-' + os_key + '-' + browser_key,
                  })
              }
              dd_browser.push(tmp)


              for (var browser_key in tech_data[device_key].childs[os_key].childs) {

                // drilldown
                var tmp = {
                  id: device_key + '-' + os_key + '-' + browser_key,
                  name: device_key + ' > ' + os_key + ' > ' + browser_key,
                  data: []
                }
                for (var version_key in tech_data[device_key].childs[os_key].childs[browser_key].childs) {
                  tmp.data.push([ version_key , tech_data[device_key].childs[os_key].childs[browser_key].childs[version_key].sessions ])
                }
                dd_browser.push(tmp)

              }

            }

            ix++;

          }



          $('#chart_device').highcharts({
              chart: {
                  type: 'pie',
                  margin: [0, 0, 0, 0]
              },
              title: {
                  text: ''
              },
              tooltip: {
                  pointFormat: '{series.name}<br>{point.percentage:.1f}%<br>{point.y:.0f} sesiones'
              },
              series: [
                  {
                      name: 'Devices',
                      data: arr_device,
                      size: '80%',
                      dataLabels: {
                          formatter: function() {
                              return this.percentage > 1 ? ''+ this.point.name + '<br>' + this.percentage.toFixed(1) + '%' : null;
                          },
                          distance: -70,
                         color: '#ffffff',
                      }
                  },
                  //  {
                  //     name: 'Os',
                  //     data: arr_os,
                  //     size: '70%',
                  //     innerSize: '40%',
                  //     dataLabels: {
                  //         formatter: function() {
                  //             return this.percentage > 1 ? ''+ this.point.name + '<br>' + this.percentage.toFixed(1) + '%' : null;
                  //         },
                  //         distance: -80
                  //     }
                  // }
              ],
              drilldown: {
                series: dd_browser
              }
          });






    });










});
