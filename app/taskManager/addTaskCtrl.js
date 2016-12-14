angular.module('app.taskManager').controller('addTaskCtrl', function ($scope, $modalInstance, newTask) {
    'use strict';
    $scope.data = {
        newTask: {}
    };
    $scope.categories = ['meeting', 'reminder', 'shopping', 'home', 'job', 'learning', 'other'];
    $scope.priorities = ['very low', 'low', 'medium', 'high', 'very high'];

    angular.copy(newTask, $scope.data.newTask);

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.ok = function () {
        $modalInstance.close($scope.data.newTask);
    }
})