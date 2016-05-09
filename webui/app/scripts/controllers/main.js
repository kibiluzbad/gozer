'use strict';

/**
 * @ngdoc function
 * @name gozerWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gozerWebApp
 */
angular.module('gozerWebApp')
  .controller('MainCtrl', ['$scope','Instance',function ($scope, Instance) {
    function start() {
      var ws = new WebSocket('ws://192.168.99.100:9292');
      ws.onopen = function () {
        $scope.$root.status = "Online";
        $scope.$root.$apply();
      };
      ws.onclose = function () {
        $scope.$root.status = "Offline";
        $scope.$root.$apply();
        setTimeout(function(){start()}, 5000);
      };
      ws.onmessage = function (m) {
        var json = JSON.parse(m.data);
        var values = json.new_val;
        $scope.instances.forEach(function(item){
            if(item.id == values.id){
              item.cpu = values.cpu;
              item.disk_usage = values.disk_usage;
            }
        });
        $scope.$apply();
      };
    }
    start();

    $scope.instances = Instance.query();
  }]);
