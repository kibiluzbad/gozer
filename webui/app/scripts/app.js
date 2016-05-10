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
    'nvd3',
  ])
  .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/reports', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        controllerAs: 'report'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('AuthInterceptor');
  }]);
