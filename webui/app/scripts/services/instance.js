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
    var Instance = $resource('http://'+window.location.hostname+':3001/instances',{},{
      setThreshold:{method:'PUT', url:'http://'+window.location.hostname+':3001/instance/:id',params:{id:'@id'}},
      history:{method:'GET', url:'http://'+window.location.hostname+':3001/instance/:id/history',params:{id:'@id'},isArray:true}
    });

    return Instance;
  }]);
