'use strict';

angular.module('lanCampApp')
  .controller('GamersCtrl', function($scope, $http, $rootScope, $location) {
    $scope.gamers = [];

    $scope.confirmed = undefined;
    $scope.showAll = function() {
      $scope.confirmed = undefined;
    };
    $scope.showConfirmed = function() {
      $scope.confirmed = true;
    };
    $scope.showUnconfirmed = function() {
      $scope.confirmed = false;
    };

    $scope.byConfirmed = function(entry) {
      if ($scope.confirmed === undefined) {
        return true;
      } else {
        return entry.confirmed === $scope.confirmed;
      }
    };
    $http.get('/getGamers')
      .success(function(data) {
        $scope.gamers = data;
      })
      .error(function(data, status, headers, config) {
        $rootScope.error = data ||  'ups';
        $location.path('/error');
      });
  });
