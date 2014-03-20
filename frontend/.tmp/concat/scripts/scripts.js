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
    $scope.hurry = 'success';
    $http.get('/countGamers').success(function (data) {
      var percent = 0;
      $('#odometer')[0].innerHTML = data.count;
      $('#odometer-max')[0].innerHTML = data.maxGamers;
      percent = data.count * 100 / data.maxGamers;
      if (percent > 66) {
        $scope.hurry = 'danger';
      } else if (percent > 33) {
        $scope.hurry = 'warning';
      }
    });
    // For each odometer, initialize with the theme passed in:
    var odometer = new Odometer({
        el: $('#odometer')[0],
        value: 0,
        theme: 'default'
      });
    odometer.render();
    var odometerMax = new Odometer({
        el: $('#odometer-max')[0],
        value: 0,
        theme: 'default'
      });
    odometerMax.render();
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
        $rootScope.msg = data;
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
    $scope.gamers = [
      {
        name: 'asd',
        lastname: 'sd',
        confirmed: true
      },
      {
        name: 'asd',
        lastname: 'sd',
        confirmed: false
      }
    ];
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
    $scope.deleteGamer = function (gamer) {
      var sure = confirm('Bist du sicher?\nUh, boys? How about that evac? Commander? Jim? What the hell is going on up there??');
      if (!sure) {
        return true;
      }
      console.log(gamer);
      $http.post('/deleteGamer', gamer).success(function (data) {
        $scope.gamers = data;
      }).error(function (data, status, headers, config) {
        $rootScope.error = data || 'ups';
        $location.path('/error');
      });
    };
    $scope.setConfirmed = function (gamer) {
      $http.post('/setConfirmed', gamer).success(function (data) {
        $scope.gamers = data;
      }).error(function (data, status, headers, config) {
        $rootScope.error = data || 'ups';
        $location.path('/error');
      });
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
    $(window).load(function () {
      // updates autofilled fields
      window.setTimeout(function () {
        $('input[ng-model]').trigger('input');
      }, 100);
    });
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