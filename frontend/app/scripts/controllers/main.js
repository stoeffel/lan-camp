'use strict';

angular.module('lanCampApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $scope.APP = {
      name: 'Lan-Camp 2014'
    };
    $scope.gamers = 0;
    $http.get('/countGamers').
    success(function(data) {
      console.log(data);
      $scope.gamers = data;
      });
  });
