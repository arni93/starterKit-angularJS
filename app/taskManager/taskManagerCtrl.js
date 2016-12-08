angular.module('app.taskManager').controller('taskManagerCtrl', function ($scope, $http, $modal, tasks) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    angular.copy(tasks.data, $scope.data.tasks);

    $scope.addTask = function () {
        $modal.open({
            templateUrl: 'taskManager/taskModalDialog/taskModalDialog.html',
            controller: 'modalController',
            size: 'lg',
            resolve: {
                selectedTask: function () {
                    return {
                        "title": "",
                        "category": "",
                        "priority": 1,
                        "content": "",
                        "date": ""
                    }
                }
            }
        });
    };

}).controller('modalController', function ($scope, $modalInstance, selectedTask) {
    'use strict';
    $scope.data = {
        selectedTask: {}
    };

    angular.copy(selectedTask, $scope.data.selectedTask);

})
