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
    var Instance = $resource('http://localhost:9292/instances',{},{
      setThreshold:{method:'PUT', url:'http://localhost:9292/instance/:id',params:{id:'@id'}}
    });

    return Instance;
  }]);
