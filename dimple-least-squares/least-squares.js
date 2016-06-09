// Original linear least squares function from https://dracoblue.net/dev/linear-least-squares-in-javascript/

/*
params = {
  xFormat: "MMM-YY", (optional)
  trendTime: 1309500000000, (optional, adds a extra data point to the trend line)
  xField: "Month",
  filterField: "Channel",
  filter: "Supermarkets",
  yField: "Unit Sales",
  data: data
}
*/
function leastSquares(params) {
    if(!params.xField || !params.filterField || !params.yField || !params.data || !params.data.length){
        console.log("Missing required parameters", params);
        return;
    }

    var values_x = [];
    var values_y = [];

    for(var i=0; i < params.data.length; i++){
        if(!params.filter || params.data[i][params.filterField] === params.filter){
          if(params.xFormat){
            var x = moment(params.data[i][params.xField], params.xFormat).valueOf();
          } else {
            var x = params.data[i][params.xField];
          }
          values_x.push(x);

          var y = params.data[i][params.yField];
          if (typeof y !== 'number') y = parseFloat(y);
          if (isNaN(y) || !isFinite(y)) {
              console.log("Error parsing y float value at data[" + i + "]. y:", y);
              return;
          }
          values_y.push(y);
      }
    }

    var values_length = values_x.length;
    if (values_length != values_y.length) {
        console.log('The parameters values_x and values_y need to have same size');
        return;
    }

    var sum_x = sum_y = sum_xy = sum_xx = count = x = y = 0;
    for (var i=0; i < values_length; i++) {
        x = values_x[i];
        y = values_y[i];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formula:
     * y = m * x + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    for (var i=0; i < values_length; i++) {
        addTrendPoint(values_x[i]);
    }

    if(params.trendTime)  addTrendPoint(params.trendTime); // Future epoch time

    function addTrendPoint(x){
      y = m * x + b;
      if(params.xFormat) x = moment(x).format(params.xFormat);
      if(!params.filter) params.filter  = '';

      params.data.push({
          [params.xField]: x,
          [params.yField]: y,
          [params.filterField]: "Trend Line " + params.filter
      });
    }

}
