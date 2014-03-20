'use strict';

angular.module('lanCampApp')
  .controller('GamersCtrl', function($scope, $http, $rootScope, $location) {
    $scope.gamers = [{
      name: 'asd',
      lastname: 'sd',
      confirmed: true
    }, {
      name: 'asd',
      lastname: 'sd',
      confirmed: false
    }];

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
    $scope.deleteGamer = function(gamer) {
      var sure = confirm('Bist du sicher?\nUh, boys? How about that evac? Commander? Jim? What the hell is going on up there??');
      if (!sure) {
        return true;
      }
      console.log(gamer);
      $http.post('/deleteGamer', gamer)
        .success(function(data) {
          $scope.gamers = data;
        })
        .error(function(data, status, headers, config) {
          $rootScope.error = data ||  'ups';
          $location.path('/error');
        });
    };
    $scope.setConfirmed = function(gamer) {
      $http.post('/setConfirmed', gamer)
        .success(function(data) {
          $scope.gamers = data;
        })
        .error(function(data, status, headers, config) {
          $rootScope.error = data ||  'ups';
          $location.path('/error');
        });
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
