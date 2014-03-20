"use strict";angular.module("lanCampApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/gamers",{templateUrl:"views/gamers.html",controller:"GamersCtrl"}).when("/confirmationPending",{templateUrl:"views/confirmationPending.html",controller:"ConfirmationPendingCtrl"}).when("/confirm/:hash",{templateUrl:"views/confirm.html",controller:"ConfirmCtrl"}).when("/error",{templateUrl:"views/error.html",controller:"ErrorCtrl"}).otherwise({redirectTo:"/main"})}]),angular.module("lanCampApp").controller("AppCtrl",["$scope",function(a){a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("NavigationCtrl",["$scope","$http","$rootScope",function(){}]),angular.module("lanCampApp").controller("MainCtrl",["$scope","$http","$rootScope",function(a,b){a.location="main",a.hurry="success",b.get("/countGamers").success(function(b){var c=0;$("#odometer")[0].innerHTML=b.count,$("#odometer-max")[0].innerHTML=b.maxGamers,c=100*b.count/b.maxGamers,c>66?a.hurry="danger":c>33&&(a.hurry="warning")});var c=new Odometer({el:$("#odometer")[0],value:0,theme:"default"});c.render();var d=new Odometer({el:$("#odometer-max")[0],value:0,theme:"default"});d.render()}]),angular.module("lanCampApp").controller("AboutCtrl",["$scope",function(a){a.location="about",a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("ContactCtrl",["$scope",function(a){a.location="contact"}]),angular.module("lanCampApp").controller("RegisterCtrl",["$scope","$http","$location","$rootScope",function(a,b,c,d){a.location="register",a.submit=function(){b.post("/register",a.form).success(function(a){d.msg=a,c.path("/confirmationPending")}).error(function(a){d.error=a,c.path("/error")})}}]),angular.module("lanCampApp").controller("GamersCtrl",["$scope","$http","$rootScope","$location",function(a,b,c,d){a.gamers=[],a.confirmed=void 0,a.showAll=function(){a.confirmed=void 0},a.showConfirmed=function(){a.confirmed=!0},a.showUnconfirmed=function(){a.confirmed=!1},a.byConfirmed=function(b){return void 0===a.confirmed?!0:b.confirmed===a.confirmed},b.get("/getGamers").success(function(b){a.gamers=b}).error(function(a){c.error=a||"ups",d.path("/error")})}]),angular.module("lanCampApp").controller("LoginCtrl",["$scope","$http","$location","$rootScope",function(a,b,c,d){a.submit=function(){b.post("/login",a.form).success(function(){c.path("/gamers")}).error(function(a){d.error=a,c.path("/error")})}}]),angular.module("lanCampApp").controller("ConfirmationPendingCtrl",["$scope",function(a){a.APP={name:"Lan-Camp 2014"}}]),angular.module("lanCampApp").controller("ConfirmCtrl",["$scope","$http","$routeParams","$rootScope","$location",function(a,b,c,d,e){b.get("/confirmRegistration/"+c.hash).success(function(){}).error(function(a){d.error=a,e.path("/error")})}]),angular.module("lanCampApp").controller("ErrorCtrl",["$scope","$rootScope",function(a,b){a.error=b.error}]);