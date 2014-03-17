'use strict';
angular.module('lanCampApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterCtrl'
    }).when('/gamers', {
      templateUrl: 'views/gamers.html',
      controller: 'GamersCtrl'
    }).when('/confirmationPending', {
      templateUrl: 'views/confirmationPending.html',
      controller: 'ConfirmationPendingCtrl'
    }).when('/confirm/:hash', {
      templateUrl: 'views/confirm.html',
      controller: 'ConfirmCtrl'
    }).when('/error', {
      templateUrl: 'views/error.html',
      controller: 'ErrorCtrl'
    }).otherwise({ redirectTo: '/main' });
  }
]);
'use strict';
angular.module('lanCampApp').controller('MainCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $scope.gamers = 0;
    $http.get('/countGamers').success(function (data) {
      console.log(data);
      $scope.gamers = data;
    });
  }
]);
'use strict';
angular.module('lanCampApp').controller('AboutCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);
'use strict';
angular.module('lanCampApp').controller('ContactCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);
'use strict';
angular.module('lanCampApp').controller('RegisterCtrl', [
  '$scope',
  '$http',
  '$location',
  '$rootScope',
  function ($scope, $http, $location, $rootScope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $scope.submit = function () {
      $http.post('/register', $scope.form).success(function (data) {
        console.log(data);
        $location.path('/confirmationPending');
      }).error(function (data, status, headers, config) {
        $rootScope.error = data;
        $location.path('/error');
      });
    };
  }
]);
'use strict';
angular.module('lanCampApp').controller('GamersCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $scope.gamers = [];
    $http.get('/getGamers').success(function (data) {
      console.log(data);
      $scope.gamers = data;
    });
  }
]);
'use strict';
angular.module('lanCampApp').controller('ConfirmationPendingCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);
'use strict';
angular.module('lanCampApp').controller('ConfirmCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  '$rootScope',
  '$location',
  function ($scope, $http, $routeParams, $rootScope, $location) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $http.get('/confirmRegistration/' + $routeParams.hash).success(function (data) {
    }).error(function (data, status, headers, config) {
      $rootScope.error = data;
      $location.path('/error');
    });
  }
]);
'use strict';
angular.module('lanCampApp').controller('ErrorCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $scope.error = $rootScope.error;
  }
]);