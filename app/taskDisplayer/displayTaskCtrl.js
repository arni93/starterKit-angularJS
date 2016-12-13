angular.module('app.taskDisplayer').controller('displayTaskCtrl', function ($scope, $modalInstance, displayedTask) {
    'use strict';
    $scope.data = {
        taskInfo: {}
    };
    $scope.statusList = ['not started', 'in progress', 'cancelled', 'done'];
    angular.copy(displayedTask, $scope.data.taskInfo);

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.ok = function () {
        $modalInstance.close($scope.data.taskInfo);
    }
});