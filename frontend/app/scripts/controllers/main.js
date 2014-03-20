'use strict';

angular.module('lanCampApp')
  .controller('MainCtrl', function($scope, $http, $rootScope) {
    $scope.location = 'main';
    $http.get('/countGamers').
    success(function(data) {
      console.log(data);
      $('.odometer')[0].innerHTML = data;
    });

    // For each odometer, initialize with the theme passed in:
    var odometer = new Odometer({
      el: $('.odometer')[0],
      value: 0,
      theme: 'default'
    });
    odometer.render();
  });
