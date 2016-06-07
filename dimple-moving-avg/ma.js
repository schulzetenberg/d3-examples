var svg = dimple.newSvg("#chartContainer", '100%', '100%');

function main(n){
  d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {
    var filteredData = dimple.filterData(data, "Owner", "Aperture");
    filteredData = dimple.filterData(filteredData, "Brand", "Delta");
    filteredData = dimple.filterData(filteredData, "Channel", "Hypermarkets");
    var dataMA = movingAvg(filteredData, "Unit Sales", n);
    filteredData = filteredData.concat(dataMA);

    var myChart = new dimple.chart(svg, filteredData);
    var x = myChart.addCategoryAxis("x", "Month");
    x.addOrderRule("Date");
    myChart.addMeasureAxis("y", "Unit Sales");
    myChart.addSeries("Channel", dimple.plot.bubble);
    myChart.addLegend(180, 10, 360, 20, "right");
    myChart.draw();
  });
}


function movingAvg(data, param, n){
  var dataMA = [];
  var prevPrevVal = 0;
  var prevVal = 0;
  var curVal = 0
  var values = [];

  for(var i=0; i < data.length; i++){
    var tmp = {};

    if (values.length < (n -1)) {
      var total = 0;
      for (var j=0; j < values.length; j++){
        // sum all the values in the array & append total to end
        total += values[j];
      }
      values[i] = (total + parseFloat(data[i][param])) / (i + 1);
    } else {
      var total = 0;
      for (var j=1; j < n; j++){
        // sum the last n values and append total to end
        total += values[values.length - j];
      }
      values[i] = (total + parseFloat(data[i][param])) / n;
    }

    tmp = {
      Channel: "Moving Average",
      Month: data[i].Month,
      'Unit Sales': values[i]
    }
    dataMA.push(tmp);
  }

  return dataMA;
}
