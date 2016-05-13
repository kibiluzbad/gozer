'use strict';

/**
 * @ngdoc service
 * @name gozerWebApp.socket
 * @description
 * # socket
 * Factory in the gozerWebApp.
 */
angular.module('gozerWebApp')
  .factory('Socket',[ '$rootScope', function ($rootScope) {

    function start(onMessage) {
      var ws = new WebSocket('ws://'+window.location.hostname+':9292');
      ws.onopen = function () {
        $rootScope.status = "Online";
        $rootScope.$digest();
      };
      ws.onclose = function () {
        $rootScope.status = "Offline";
        $rootScope.$digest();
        setTimeout(function(){start(onMessage)}, 5000);
      };
      ws.onmessage = onMessage;
    }

    return {
      start: start
    }

  }]);
