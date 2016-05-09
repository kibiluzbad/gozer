'use strict';

/**
 * @ngdoc service
 * @name gozerWebApp.instance
 * @description
 * # instance
 * Service in the gozerWebApp.
 */
angular.module('gozerWebApp')
  .service('Instance', ['$resource', function ($resource) {
    var Instance = $resource('http://192.168.99.100:9292' + '/instances');

    return Instance;
  }]);
