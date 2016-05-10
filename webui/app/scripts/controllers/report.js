'use strict';

/**
 * @ngdoc function
 * @name gozerWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gozerWebApp
 */
angular.module('gozerWebApp')
  .controller('ReportCtrl', ['$scope', 'Instance', function ($scope, Instance) {
    $scope.instance_id = '';
    $scope.history = [];
    $scope.search =function(){
      if($scope.instance_id)
        $scope.history = Instance.history({id:$scope.instance_id});
    }

  }]);
