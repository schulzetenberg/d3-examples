var svg = dimple.newSvg("#chartContainer", 590, 400);
d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {

  var params = {
    xFormat: "MMM-YY",
    xField: "Month",
    filterField: "Channel",
    filter: "Supermarkets",
    yField: "Unit Sales",
    data: data
  };
  leastSquares(params);

  params.filter = "Hypermarkets";
  leastSquares(params);

  var myChart = new dimple.chart(svg, data);
  myChart.setBounds(60, 30, 505, 305)
  var x = myChart.addCategoryAxis("x", "Month");
  x.addOrderRule("Date");
  myChart.addMeasureAxis("y", "Unit Sales");
  myChart.addSeries("Channel", dimple.plot.line);
  myChart.addLegend(180, 10, 360, 20, "right");
  myChart.draw();

});
