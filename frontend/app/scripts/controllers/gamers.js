'use strict';

angular.module('lanCampApp')
  .controller('GamersCtrl', function ($scope, $http, $rootScope) {
    $scope.APP = {
      name: 'Lan-Camp 2014'
    };
    $scope.gamers = [];
    $http.get('/getGamers').
    success(function(data) {
      console.log(data);
      $scope.gamers = data;
      });
  });
