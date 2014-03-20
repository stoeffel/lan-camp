'use strict';

angular.module('lanCampApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.location = 'about';
    $scope.APP = {
      name: 'Lan-Camp 2014'
    };
  });
