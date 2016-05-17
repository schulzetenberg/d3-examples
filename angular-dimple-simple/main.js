var myApp = angular.module('myApp',[]);

myApp.controller('chartCtrl', function($scope) {
  $scope.graphData = [
      {
        "Month": "Jan-11",
        "storeId": 1,
        "Sales": 14
      },{
        "Month": "Feb-11",
        "storeId": 1,
        "Sales": 14
      },{
        "Month": "March-11",
        "storeId": 1,
        "Sales": 17
      },{
        "Month": "Jan-11",
        "storeId": 2,
        "Sales": 14
      },{
        "Month": "Feb-11",
        "storeId": 2,
        "Sales": 16
      },{
        "Month": "March-11",
        "storeId": 2,
        "Sales": 8
      }
  ];
});
