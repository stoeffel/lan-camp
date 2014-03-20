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
    }).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
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
angular.module('lanCampApp').controller('AppCtrl', [
  '$scope',
  function ($scope) {
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);
'use strict';
angular.module('lanCampApp').controller('NavigationCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  function ($scope, $http, $rootScope) {
  }
]);
'use strict';
angular.module('lanCampApp').controller('MainCtrl', [
  '$scope',
  '$http',
  '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.location = 'main';
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
    $scope.location = 'about';
    $scope.APP = { name: 'Lan-Camp 2014' };
  }
]);
'use strict';
angular.module('lanCampApp').controller('ContactCtrl', [
  '$scope',
  function ($scope) {
    $scope.location = 'contact';
  }
]);
'use strict';
angular.module('lanCampApp').controller('RegisterCtrl', [
  '$scope',
  '$http',
  '$location',
  '$rootScope',
  function ($scope, $http, $location, $rootScope) {
    $scope.location = 'register';
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
  '$location',
  function ($scope, $http, $rootScope, $location) {
    $scope.gamers = [];
    $scope.confirmed = undefined;
    $scope.showAll = function () {
      $scope.confirmed = undefined;
    };
    $scope.showConfirmed = function () {
      $scope.confirmed = true;
    };
    $scope.showUnconfirmed = function () {
      $scope.confirmed = false;
    };
    $scope.byConfirmed = function (entry) {
      if ($scope.confirmed === undefined) {
        return true;
      } else {
        return entry.confirmed === $scope.confirmed;
      }
    };
    $http.get('/getGamers').success(function (data) {
      $scope.gamers = data;
    }).error(function (data, status, headers, config) {
      $rootScope.error = data || 'ups';
      $location.path('/error');
    });
  }
]);
'use strict';
angular.module('lanCampApp').controller('LoginCtrl', [
  '$scope',
  '$http',
  '$location',
  '$rootScope',
  function ($scope, $http, $location, $rootScope) {
    $scope.submit = function () {
      $http.post('/login', $scope.form).success(function (data) {
        $location.path('/gamers');
      }).error(function (data, status, headers, config) {
        $rootScope.error = data;
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
'use strict';
angular.module('lanCampApp').controller('ConfirmCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  '$rootScope',
  '$location',
  function ($scope, $http, $routeParams, $rootScope, $location) {
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
    $scope.error = $rootScope.error;
  }
]);