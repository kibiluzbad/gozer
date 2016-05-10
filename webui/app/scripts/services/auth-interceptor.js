'use strict';

/**
 * @ngdoc service
 * @name gozerWebApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the clientApp.
 */
angular.module('gozerWebApp')
  .factory('AuthInterceptor', ['$rootScope', '$q', '$window', '$location',function ($rootScope, $q, $window,$location) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      response: function (response) {
        return response || $q.when(response);
      },

      'responseError': function (rejection) {
        if (rejection.status === 401) {
          $rootScope.loggedIn = false;
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  }]);
