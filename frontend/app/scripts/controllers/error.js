'use strict';

angular.module('lanCampApp')
  .controller('ErrorCtrl', function ($scope, $rootScope) {
    $scope.error = $rootScope.error;
  });
