'use strict';

angular.module('lanCampApp')
  .controller('RegisterCtrl', function($scope, $http, $location, $rootScope) {
    $scope.location = 'register';
    $scope.submit = function() {
      $http.post('/register', $scope.form).
      success(function(data) {
        $location.path('/confirmationPending');
      })
        .error(function(data, status, headers, config) {
          $rootScope.error = data;
          $location.path('/error');
        });
    };
  });
