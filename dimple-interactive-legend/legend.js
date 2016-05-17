// Original code from: http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
var myChart;

var svg = dimple.newSvg("#chartContainer", '100%', '100%');
d3.tsv("http://dimplejs.org/data/example_data.tsv", function (data) {
  // Latest period only
  dimple.filterData(data, "Date", "01/12/2012");
  // Create the chart
  myChart = new dimple.chart(svg, data);

  // Create a standard bubble of SKUs by Price and Sales Value
  // We are coloring by Owner as that will be the key in the legend
  myChart.addMeasureAxis("x", "Price");
  myChart.addMeasureAxis("y", "Sales Value");
  myChart.addSeries(["SKU", "Channel", "Owner"], dimple.plot.bubble);
  var myLegend = myChart.addLegend("-180px", "40px", "100px", "-70px");
  myChart.draw();

  // This is a critical step.  By doing this we orphan the legend. This
  // means it will not respond to graph updates.  Without this the legend
  // will redraw when the chart refreshes removing the unchecked item and
  // also dropping the events we define below.
  myChart.legends = [];

  // Get a unique list of Owner values to use when filtering
  var filterValues = dimple.getUniqueValues(data, "Owner");
  // Get all the rectangles from our now orphaned legend
  myLegend.shapes.selectAll("rect")
    // Add a click event to each rectangle
    .on("click", function (e) {
      // This indicates whether the item is already visible or not
      var hide = false;
      var newFilters = [];
      // If the filters contain the clicked shape hide it
      filterValues.forEach(function (f) {
        if (f === e.aggField.slice(-1)[0]) {
          hide = true;
        } else {
          newFilters.push(f);
        }
      });
      // Hide the shape or show it
      if (hide) {
        d3.select(this).style("opacity", 0.2);
      } else {
        newFilters.push(e.aggField.slice(-1)[0]);
        d3.select(this).style("opacity", 0.8);
      }
      // Update the filters
      filterValues = newFilters;
      // Filter the data
      myChart.data = dimple.filterData(data, "Owner", filterValues);
      // Passing a duration parameter makes the chart animate. Without
      // it there is no transition
      myChart.draw(800);
    });
});

// Add a method to draw the chart on resize of the window
window.onresize = function () {
    // As of 1.1.0 the second parameter here allows you to draw
    // without reprocessing data.  This saves a lot on performance
    // when you know the data won't have changed.
    if(myChart) myChart.draw(0, true);
};
