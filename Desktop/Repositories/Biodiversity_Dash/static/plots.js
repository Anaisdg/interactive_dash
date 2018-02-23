// pie graph

// Use the Sample Value as the values for the PIE chart
// Use the OTU ID as the labels for the pie chart
// Use the OTU Description as the hovertext for the chart
// Use Plotly.restyle to update the chart whenever a new sample is selected

var data = [{
  values: [1,2,3,4,5,6,7,8,9,10],  //"OTU Sample Values"
  labels: ["Test 1","Test 2","Test 3","Test 4","Test 5","Test 6","Test 7","Test 8","Test 9","Test 10"], //"OTU ID"
  type: 'pie',
  name: 'Top Ten Samples',
  // marker: {
  //   colors: ultimateColors[0]
  // },   <------------------------------need to fix
  hoverinfo: 'none', //'OTU Description'
  textinfo: 'none'
}];

var layout = {
  height: 400,
  width: 500
};

Plotly.newPlot('pie', data, layout);


// bubble chart

// Create a Bubble Chart that uses data from your routes /samples/<sample> and /otu to plot the Sample Value vs the OTU ID for the selected sample.

// Use the OTU IDs for the x values
// Use the Sample Values for the y values
// Use the Sample Values for the marker size
// Use the OTU IDs for the marker colors
// Use the OTU Description Data for the text values
// Use Plotly.restyle to update the chart whenever a new sample is selected

var trace1 = {
    x: [1,2,3,4,5,6,7,8,9,10], // OTU ID
    y: [10,20,30,10,20,30,10,20,30,10], // Sample Values
    mode: 'markers',
    type: 'scatter',
    hoverinfo: 'text',
    text: "OTU Description",
    marker: {
      size: [10,20,30,10,20,30,10,20,30,10] //"Sample Values"
    }
  };

 var data = [trace1];

 var layout = {
    title: 'Belly Button Bacteria Biodiversity',
    showlegend: false,
    height: 600,
    width: 600
  };

 Plotly.newPlot('scatter', data, layout);
