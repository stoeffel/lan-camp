'use strict';

angular.module('lanCampApp')
  .controller('ErrorCtrl', function ($scope, $rootScope) {
    $scope.APP = {
      name: 'Lan-Camp 2014'
    };
    $scope.error = $rootScope.error;
  });
