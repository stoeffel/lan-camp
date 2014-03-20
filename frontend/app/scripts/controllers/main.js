'use strict';

angular.module('lanCampApp')
  .controller('MainCtrl', function($scope, $http, $rootScope) {
    $scope.location = 'main';
    $scope.hurry = 'success';
    $http.get('/countGamers').
    success(function(data) {
      var percent = 0;
      $('#odometer')[0].innerHTML = data.count;
      $('#odometer-max')[0].innerHTML = data.maxGamers;
      percent = data.count*100/data.maxGamers;
      if (percent > 66) {
        $scope.hurry = 'danger';
      } else if (percent > 33) {
        $scope.hurry = 'warning';
      }
    });

    // For each odometer, initialize with the theme passed in:
    var odometer = new Odometer({
      el: $('#odometer')[0],
      value: 0,
      theme: 'default'
    });
    odometer.render();
    var odometerMax = new Odometer({
      el: $('#odometer-max')[0],
      value: 0,
      theme: 'default'
    });
    odometerMax.render();
  });
