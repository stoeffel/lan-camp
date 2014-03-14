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
    }).when('/confirmationPending', {
      templateUrl: 'views/confirmationPending.html',
      controller: 'ConfirmationPendingCtrl'
    }).otherwise({ redirectTo: '/main' });
  }
]);
'use strict';
angular.module('lanCampApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
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
  function ($scope, $http, $location) {
    $scope.APP = { name: 'Lan-Camp 2014' };
    $scope.submit = function () {
      $http.post('/register', $scope.form).success(function (data) {
        console.log(data);
        $location.path('/confirmationPending');
      }).error(function (data, status, headers, config) {
        $location.path('/error');
      });
    };
  }
]);
'use strict';
angular.module('lanCampApp').controller('ConfirmationPendingCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);