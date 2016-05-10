'use strict';

/**
 * @ngdoc function
 * @name gozerWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gozerWebApp
 */
angular.module('gozerWebApp')
  .controller('MainCtrl', ['$scope','$filter','Instance', 'AuthService', 'Notification', 'Socket', function ($scope, $filter, Instance, AuthService, Notification, Socket) {

    //TODO: create login page and remove AuthService from here.
    AuthService.singIn(function(){
      console.log('Logged in');
    },function(err){
      console.error(err);
    });

    $scope.data = [{key:'100',y:100}];

    $scope.optionsCpu = {
      chart: {
        title: "CPU",
        type: 'pieChart',
        width: 200,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        showLegend: false,
        pie: {
          startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
          endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
        },
        duration: 500
      }
    };
    $scope.optionsDisk = {
      chart: {
        title: "Disk",
        type: 'pieChart',
        width: 200,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        showLegend: false,
        pie: {
          startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
          endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
        },
        duration: 500
      }
    };

    $scope.instances = Instance.query(function(data){
      Socket.start(function (m) {
        var json = JSON.parse(m.data);
        var values = json.new_val;
        var match;
        $scope.instances.forEach(function(item){
          if(item.id == values.id){
            match = item;
          }
        });
        if(match){
          match.cpu = values.cpu;
          match.disk_usage = values.disk_usage;
          match.processes = values.processes;
        }else{
          $scope.instances.push(values);
        }
        $scope.$digest()
      });
    });

    $scope.showProcesses = false;

    $scope.showProcess = function(){
      $scope.showProcesses = !$scope.showProcesses;
    };

    $scope.getText = function(){
      return !$scope.showProcesses ? "Show Top 10 Processes" : "Hide Top 10 Processes";
    }

    $scope.save = function(instance){
      Instance.setThreshold({id:instance.id,threshold: instance.threshold},function(data){Notification.success("Threshold saved!");})
    }
  }]);
