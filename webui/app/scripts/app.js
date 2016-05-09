'use strict';

/**
 * @ngdoc overview
 * @name gozerWebApp
 * @description
 * # gozerWebApp
 *
 * Main module of the application.
 */
angular
  .module('gozerWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'blockUI',
    'angular-growl',
    'nvd3ChartDirectives',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
