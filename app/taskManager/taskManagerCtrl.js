angular.module('app.taskManager').controller('taskManagerCtrl', function ($scope, $http, $modal, tasks) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    angular.copy(tasks.data, $scope.data.tasks);

    $scope.addTask = function () {
        var modalInstance = $modal.open({
            templateUrl: 'taskManager/addTaskModalDialog/addTaskModalDialog.html',
            controller: 'modalController',
            size: 'lg',
            resolve: {
                newTask: function () {
                    return {
                        "title": "insert title",
                        "category": "insert category",
                        "priority": 1,
                        "content": "insert content",
                        "date": "2016-12-22"
                    }
                }
            }
        });
        modalInstance.result.then(function (data) {
            $scope.data.tasks.push(data);
        })
    };

}).controller('modalController', function ($scope, $modalInstance, newTask) {
    'use strict';
    $scope.data = {
        newTask: {}
    };

    angular.copy(newTask, $scope.data.newTask);

    $scope.ok = function () {
        $modalInstance.close($scope.data.newTask);
    }
})
