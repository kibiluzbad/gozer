'use strict';

/**
 * @ngdoc function
 * @name gozerWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gozerWebApp
 */
angular.module('gozerWebApp')
  .controller('MainCtrl', ['$scope','Instance', 'growl', function ($scope, Instance, growl) {
    function start() {
      var ws = new WebSocket('ws://localhost:9292');
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
        var match;
        $scope.instances.forEach(function(item){
            if(item.id == values.id){
             match = item;
            }
        });
        if(match){
          item.cpu = match.cpu;
          item.disk_usage = match.disk_usage;  
        }else{
          $scope.instances.push(match);
        }
        
        $scope.$apply();
      };
    }
    start();

    $scope.instances = Instance.query();
  }]);
