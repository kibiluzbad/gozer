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
    'ui-notification',
    'nvd3',
  ])
  .config(['$routeProvider','$httpProvider', 'NotificationProvider', function ($routeProvider, $httpProvider, NotificationProvider) {

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

    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    });

    $httpProvider.interceptors.push('AuthInterceptor');
  }]);
