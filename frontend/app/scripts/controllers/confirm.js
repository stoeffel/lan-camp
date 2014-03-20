'use strict';

angular.module('lanCampApp')
  .controller('ConfirmCtrl', function($scope, $http, $routeParams, $rootScope, $location) {
    $http.get('/confirmRegistration/' + $routeParams.hash).
    success(function(data) {})
      .error(function(data, status, headers, config) {
        $rootScope.error = data;
        $location.path('/error');
      });
  });
