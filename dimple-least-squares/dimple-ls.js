var svg = dimple.newSvg("#chartContainer", 590, 400);
d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {
  // Filter data to only one brand
  var filteredData = dimple.filterData(data, "Brand", "Gamma");

  var params = {
    xFormat: "DD/MM/YYYY",
    trendTime: 1374345200000,
    xField: "Date",
    filterField: "Channel",
    filter: "Supermarkets",
    yField: "Unit Sales",
    data: filteredData
  };

  leastSquares(params);

  params.filter = "Hypermarkets";
  leastSquares(params);

  var myChart = new dimple.chart(svg, filteredData);
  myChart.setBounds(60, 30, 505, 305)
  var x = myChart.addTimeAxis("x", "Date","%d/%m/%Y", "%m-%d-%y");
  myChart.addMeasureAxis("y", "Unit Sales");
  myChart.addSeries("Channel", dimple.plot.line);
  myChart.addLegend(180, 10, 360, 20, "right");
  myChart.draw();

});
