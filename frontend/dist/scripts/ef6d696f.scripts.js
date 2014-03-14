"use strict";angular.module("lanCampApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/confirmationPending",{templateUrl:"views/confirmationPending.html",controller:"ConfirmationPendingCtrl"}).when("/confirm/:hash",{templateUrl:"views/confirm.html",controller:"ConfirmCtrl"}).when("/error",{templateUrl:"views/error.html",controller:"ErrorCtrl"}).otherwise({redirectTo:"/main"})}]),angular.module("lanCampApp").controller("MainCtrl",["$scope","$http","$rootScope",function(a,b){a.APP={name:"Lan-Camp 2014"},a.gamers=0,b.get("/countGamers").success(function(b){console.log(b),a.gamers=b})}]),angular.module("lanCampApp").controller("AboutCtrl",["$scope",function(a){a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("ContactCtrl",["$scope",function(a){a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("RegisterCtrl",["$scope","$http","$location","$rootScope",function(a,b,c,d){a.APP={name:"Lan-Camp 2014"},a.submit=function(){b.post("/register",a.form).success(function(a){console.log(a),c.path("/confirmationPending")}).error(function(a){d.error=a,c.path("/error")})}}]),angular.module("lanCampApp").controller("ConfirmationPendingCtrl",["$scope",function(a){a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("ConfirmCtrl",["$scope","$http","$routeParams","$rootScope","$location",function(a,b,c,d,e){a.APP={name:"Lan-Camp 2014"},b.get("/confirmRegistration/"+c.hash).success(function(){}).error(function(a){d.error=a,e.path("/error")})}]),angular.module("lanCampApp").controller("ErrorCtrl",["$scope","$rootScope",function(a,b){a.APP={name:"Lan-Camp 2014"},a.error=b.error}]);