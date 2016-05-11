'use strict';

/**
 * @ngdoc service
 * @name gozerWebApp.AuthService
 * @description
 * # AuthService
 * Factory in the clientApp.
 */
angular.module('gozerWebApp')
  .factory('AuthService', ['$rootScope', '$q', '$window', '$http',function ($rootScope, $q, $window,$http) {


    return {
      singIn: function(success,error){
        //TODO: Change to password strategy. And remove client info from here
        var req = {
          method: 'POST',
          url: 'http://'+window.location.hostname+':3001/token',
          data: { 'client_id': '4de2fd79af6950291687a9df6f9ab4de93246f020a3e440186bb77fdaba25b0f', 'client_secret': '6e6009447cfd2d1a0a8792805fd9efa1a6f01c6faa7b7382659b1b1446b57f2a' }
        };

        $http(req)
          .success(function(data, status, headers, config){
            $rootScope.loggedIn = true;
            $window.sessionStorage.token = data.access_token;
            if(success)success(data);
          })
          .error(function(data, status, headers, config){
            console.log(status);
            delete $window.sessionStorage.token;
            $rootScope.loggedIn = false;
            if(error)error(data);
          });
      },
      singOut: function(){
        $rootScope.loggedIn = false;
        delete $window.sessionStorage.token;
      }
    };
  }]);
