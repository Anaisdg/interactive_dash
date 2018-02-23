
// STEP ONE:
// Create sample selector populated by data from /names route from app.py using
// AJAX requests

// Define the url
var url = '/names';

// Make an asynchronous call to get the data
Plotly.d3.json(url, function(error, names){
  console.log(names);
  select_elem = document.getElementById("selDataset")
  if(select_elem){
      for(var i = 0; i < names.length; i++) {
          var option = document.createElement('option');
          option.innerHTML = names[i];
          option.value = names[i];
          select_elem.appendChild(option);
        };
      };
    });

// Create a function that allows you to change the option and creates urls for future data calls
function optionChanged(sel){
  console.log('Option Changed Called');
  var value = sel;
  var url2 = '/metadata/' + value;
  var url3 = '/wfreq/'  + value;
  var url4 = '/samples/' + value;
    console.log(url4);

    // STEP TWO

    // Create a PIE chart that uses data from routes /samples/<sample> and /otu to display the top 10 samples.

    Plotly.d3.json(url4, function (error, pieData) {

            var pie_labels = pieData['id']

            var pie_values = pieData['sample']

            var data = [{
                values: pie_values,
                labels: pie_labels,
                type: "pie"
            }];

            var layout = {
                height: 500,
                width: 700,
                title: "Biodiversity Pie Chart",
            };
            Plotly.newPlot("piechart", data, layout);

        });

        // STEP THREE

        // Create a Bubble Chart that uses data from your routes /samples/<sample> and /otu to plot the Sample Value vs the OTU ID for the selected sample.


        Plotly.d3.json(url4, function (error, bubbleData) {

                var labels = bubbleData['id']

                var values = bubbleData['sample']

                var data = [{
                    y: values,
                    x: labels,
                    mode: 'markers',
                    marker: {
                        color: labels, colorscale: 'Viridis', colorbar: {
                            titleside: 'right'}, size: values, sizeref: 1 },
                    type: 'scatter'
                }];

                var layout = {
                    height: 500,
                    width: 1000,
                    title: "Bacteria Diversity Bubble Plot",
                    xaxis: { range: [0, 4000], dtick: 1000, title: "OTU ID" },
                    yaxis: { range: [0, 2600], title: "Bacteria Count" },
                };
                Plotly.newPlot("bubbleplot", data, layout);

            });

            // STEP FOUR

            // Display the sample metadata from the route /metadata/<sample>



                Plotly.d3.json(url2, function (error, metadata) {
                    console.log(metadata);

                    var keys = metadata['keys']
                    var data = [metadata['data']]

                    console.log(data);
                    //
                    // Plotly.d3.select("#table").append("table").append("tr")
                    // .html(`<th>${keys[0]}</th><th>${keys[1]}</th><th>${keys[2]}</th><th>${keys[3]}</th><th>${keys[4]}</th><th>${keys[5]}</th>`)
                    // .append("/tr")
                    // .selectAll("/tr")
                    // .data(data)
                    // .enter()
                    // .append("tr")
                    // .html(function (d) {
                    //     return `<td>${d.AGE}</td><td>${d.BBTYPE}</td><td>${d.ETHNICITY}</td><td>${d.GENDER}</td><td>${d.LOCATION}</td><td>${d.SAMPLEID}</td>`
                    // });


                    //
                    // function tabulate(data, columns){
                    // var table = Plotly.d3.select("#table").append("table").attr("class", "table");
                    // var header = table.append("thead").append("tr");
                    // header
                    //         .selectAll("th")
                    //         .data(columns)
                    //         .enter()
                    //         .append("th")
                    //         .text(function(d) { return d; });
                    // var tablebody = table.append("tbody");
                    // rows = tablebody
                    //         .selectAll("tr")
                    //         .data(data)
                    //         .enter()
                    //         .append("tr");
                    // // We built the rows using the nested array - now each row has its own array.
                    // cells = rows.selectAll("td")
                    //     // each row has data associated; we get it and enter it for the cells.
                    //         .data(function (row) {
                    //   		    return columns.map(function (column) {
                    //   		      return {column: column, value: row[column]};
                    //   		    })})
                    //         .enter()
                    //         .append("td")
                    //         .text(function(d) {
                    //             return d.value
                    //         });
                    //       };
                    //
                    //       tabulate(data,columns)
                });

                //STEP FIVE

                //Create a gauage chart

                Plotly.d3.json(url3, function (error, wfreq) {
                    console.log(wfreq);
                    var wfreq_level=wfreq['WFREQ']
                    //convert level from 0 to 10 to 0 to 180
                    var level = wfreq_level * 18;

                    // Trig to calc meter point
                    var degrees = 180 - level,
                         radius = .5;
                    var radians = degrees * Math.PI / 180;
                    var x = radius * Math.cos(radians);
                    var y = radius * Math.sin(radians);

                    // Path: may have to change to create a better triangle
                    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
                         pathX = String(x),
                         space = ' ',
                         pathY = String(y),
                         pathEnd = ' Z';
                    var path = mainPath.concat(pathX,space,pathY,pathEnd);

                    var data = [{ type: 'scatter',
                       x: [0], y:[0],
                        marker: {size: 14, color:'850000'},
                        showlegend: false,
                        name: 'speed',
                        text: level,
                        hoverinfo: 'text+name'},
                      { values: [50 / 5, 50 / 5, 50 / 5, 50 / 5, 50 / 5, 50],
                      rotation: 90,
                      text: ['>8', '6-8', '4-6', '2-4', '0-2', ''],
                      textinfo: 'text',
                      textposition:'inside',
                      marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                             'rgba(210, 206, 145, .5)',
                                             'rgba(255, 255, 255, 0)']},
                      labels: ['>8', '6-8', '4-6', '2-4', '0-2', ''],
                      hoverinfo: 'label',
                      hole: .5,
                      type: 'pie',
                      showlegend: false
                    }];

                    var layout = {
                      shapes:[{
                          type: 'path',
                          path: path,
                          fillcolor: '850000',
                          line: {
                            color: '850000'
                          }
                        }],
                      title: 'Washing Frequency Gauge Chart',
                      height: 500,
                      width: 500,
                      xaxis: {zeroline:false, showticklabels:false,
                                 showgrid: false, range: [-1, 1]},
                      yaxis: {zeroline:false, showticklabels:false,
                                 showgrid: false, range: [-1, 1]}
                    };

                    Plotly.newPlot('gaugechart', data, layout);
                  });



    // Plotly.d3.json(url2, function (error, metaData) {
    //       console.log(metaData);
    //       Plotly.d3.select("tbody")
    //           .html("")
    //           .selectAll("tr")
    //           .data(metaData)
    //           .enter()
    //           .append("tr")
    //           .html(function (d) {
    //               return `<td>${d.t0}</td><td>${d.t1}</td>`
    //           });
    //   });


// bracket below connect to top dont delete
}




//  function make_drop_down(sample_names, element_id){
//   select_elem = document.getElementById(element_id)
//   if(select_elem){
//       for(var i = 0; i < list_of_names.length; i++) {
//           var option = document.createElement('option');
//           option.innerHTML = sample_names[i];
//           option.value = sample_names[i];
//           select_elem.appendChild(option);
//         }
//       }
//     };
//
// make_drop_down(data,"selDataset")

// var url = "/names";
//
// function buildPlot() {
//     Plotly.d3.json(url, function(error, response) {
//
//         console.log(response);
//       };
//     };
//
// buildPlot()

//
// function build_dropdown(base_url){
//   console.log('build_dropdown working' )
//   var url = base_url + "/names"
//
//   d3.json(url, function(error, response) {
//         if (error) return console.warn(error);
//
//         select_elem = document.getElementById('#selSamples')
//         if(select_elem){
//             for(var i = 0; i < response.length; i++) {
//                 var option = document.createElement('option');
//                 option.innerHTML = response[i];
//                 option.value = response[i];
//                 select_elem.appendChild('option');
//               };
//             };
//           });
//
// };
//
// build_dropdown(base_url);
