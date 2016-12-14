angular.module('app.taskManager').controller('editTaskCtrl', function ($scope, $modalInstance, editedTask) {
    'use strict';
    $scope.data = {
        editedTask: {}
    };
    $scope.categories = ['meeting', 'reminder', 'shopping', 'home', 'job', 'learning', 'other'];
    $scope.priorities = ['very low', 'low', 'medium', 'high', 'very high'];

    angular.copy(editedTask, $scope.data.editedTask);

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.ok = function () {
        $modalInstance.close($scope.data.editedTask);
    }
})