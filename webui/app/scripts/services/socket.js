'use strict';

/**
 * @ngdoc service
 * @name gozerWebApp.socket
 * @description
 * # socket
 * Factory in the gozerWebApp.
 */
angular.module('gozerWebApp')
  .factory('Socket', ['$rootScope',function ($rootScope) {
    // var socket = io.connect("ws://localhost:9393");
    //
    // socket.removeAllListeners();
    // return {
    //   on: function (eventName, callback) {
    //     socket.on(eventName, function () {
    //       var args = arguments;
    //
    //       $rootScope.$apply(function () {
    //         callback.apply(socket, args);
    //       });
    //     });
    //   }
    // };
  }]);
