'use strict';

angular.module('lanCampApp')
  .controller('RegisterCtrl', function($scope, $http, $location) {
    $scope.APP = {
      name: 'Lan-Camp 2014'
    };
    $scope.submit = function() {
      $http.post('/register', $scope.form).
      success(function(data) {
        console.log(data);
        $location.path('/confirmationPending');
      })
        .error(function(data, status, headers, config) {
          $location.path('/error');
        });
    };
  });
