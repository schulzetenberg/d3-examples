var svg = dimple.newSvg("#chartContainer", '100%', '100%');

d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {
  var filteredData = dimple.filterData(data, "Owner", "Aperture");
  filteredData = dimple.filterData(filteredData, "Brand", "Delta");
  filteredData = dimple.filterData(filteredData, "Channel", "Hypermarkets");
  var dataMA = movingAvg(filteredData, "Unit Sales");
  filteredData = filteredData.concat(dataMA);

  var myChart = new dimple.chart(svg, filteredData);
  var x = myChart.addCategoryAxis("x", "Month");
  x.addOrderRule("Date");
  myChart.addMeasureAxis("y", "Unit Sales");
  myChart.addSeries("Channel", dimple.plot.bubble);
  myChart.addLegend(180, 10, 360, 20, "right");
  myChart.draw();
});

function movingAvg(data, param){
  var dataMA = [];
  var prevPrevVal = 0;
  var prevVal = 0;
  var curVal = 0

  for(var i=0; i < data.length; i++){
    var tmp = {};

    if (i === 0) {
      curVal = parseInt(data[i][param]);

    } else if (i == 1) {
      prevVal = curVal;
      curVal = (prevVal + parseInt(data[i][param])) / 2.0;

    } else {
      prevPrevVal = prevVal;
      prevVal = curVal;
      curVal = (prevPrevVal + prevVal + parseInt(data[i][param])) / 3.0;
    }

    tmp = {
      Channel: "Moving Average",
      Month: data[i].Month,
      'Unit Sales': curVal
    }
    dataMA.push(tmp);
  }

  return dataMA;
}
