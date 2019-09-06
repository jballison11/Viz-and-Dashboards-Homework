function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
var selector = d3.select("#sample-metadata");
selector.html("")

//console.log("buildMetadata")    
var url = "/metadata/" + sample

d3.json(url).then(result => {
  for (let[key, value] of Object.entries(result)) {
    //console.log(`${key}, ${value}`);
    selector.append("p").text(`${key}, ${value}`)
  }
})

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel

    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
//build charts
function buildCharts(sample) {

var url = "/samples/" + sample

d3.json(url).then(result=>{
  console.log(result)

  var otu_ids = result.otu_ids
  var otu_labels = result.otu_labels
  var sample_values = result.sample_values

  var pie_data = [{
    labels: otu_labels,
    values:sample_values,
    type: 'pie'
  }]
    var pie_layout = {
      title: 'Pie Chart',
      height: 800,
      width: 800
  }
  Plotly.newPlot("pie", pie_data, pie_layout)

  var bubble_data = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
      size: sample_values
    }
  };
  
  var bubble_layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot("markers", bubble_data, bubble_layout);

});



    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
