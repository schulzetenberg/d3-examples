/* Original code from:
** http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends
** https://github.com/PMSI-AlignAlytics/dimple/issues/223
*/

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

  proxiedDraw = myLegend._draw;
  myLegend._draw = function () {
    var y;
    y = proxiedDraw.apply(this, arguments);
    this.shapes.selectAll('rect')
      .on('click', function (e) {
        var active, newOpacity, cls;
        active = e.active ? false : true;
        newOpacity = active ? 0 : 1;
        cls = e.key.toLowerCase().replace(' ', '-');
        //Hide or show the elements;
        svg.selectAll('circle.dimple-' + cls).style('opacity', newOpacity);
        svg.selectAll('g.dimple-' + cls).style('opacity', newOpacity / 2.0 + 0.5);
        // Update whether or not the elements are active
        e.active = active;
      });
    return y;
  };
  myChart.draw();
});

// Add a method to draw the chart on resize of the window
window.onresize = function () {
    // As of 1.1.0 the second parameter here allows you to draw
    // without reprocessing data.  This saves a lot on performance
    // when you know the data won't have changed.
    svg.selectAll('circle').transition().duration(600).style('opacity', 1);
    if(myChart) myChart.draw(0, true);
};
