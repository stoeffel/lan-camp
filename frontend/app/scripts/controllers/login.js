'use strict';

angular.module('lanCampApp')
  .controller('LoginCtrl', function($scope, $http, $location, $rootScope) {
    $(window).load(function() {
      // updates autofilled fields
      window.setTimeout(function() {
        $('input[ng-model]').trigger('input');
      }, 100);
    });
    $scope.submit = function() {
      $http.post('/login', $scope.form).
      success(function(data) {
        $location.path('/gamers');
      })
        .error(function(data, status, headers, config) {
          $rootScope.error = data;
          $location.path('/error');
        });
    };
  });
