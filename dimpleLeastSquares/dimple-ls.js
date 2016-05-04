var svg = dimple.newSvg("#chartContainer", 590, 400);
d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {
  var x = [];
  var y = [];

  for(var i=0; i < data.length; i++){
      if(data[i]["Channel"] === "Supermarkets"){
        var epochDate = moment(data[i]["Month"], "MMM-YY").valueOf();
        x.push(epochDate);

        unitsInt = parseInt(data[i]["Unit Sales"]);
        y.push(unitsInt);
    }
  }

  var result = leastSquares(x, y);

  for(var i=0; i < result[0].length; i++) {
    data.push({
      "Month":  moment(result[0][i]).format("MMM-YY"),
      "Unit Sales": result[1][i],
      "Channel": "Trend Line Supermarkets"
    });
  }

  var myChart = new dimple.chart(svg, data);
  myChart.setBounds(60, 30, 505, 305)
  var x = myChart.addCategoryAxis("x", "Month");
  x.addOrderRule("Date");
  myChart.addMeasureAxis("y", "Unit Sales");
  myChart.addSeries("Channel", dimple.plot.line);
  myChart.addLegend(180, 10, 360, 20, "right");
  myChart.draw();
});
