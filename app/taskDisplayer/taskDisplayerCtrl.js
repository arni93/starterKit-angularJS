angular.module('app.taskDisplayer').controller('taskDisplayerCtrl', function ($scope, $http, $modal, tasks, timeFilters, taskDisplayerServerCommunication, taskDisplayerToolkitService) {
    'use strict';
    var dayFilter, weekFilter, monthFilter, result, taskDate, loadDataFromServer;

    dayFilter = function (task) {
        return timeFilters.dayFilter($scope.selectedDate, new Date(task.date));
    }
    weekFilter = function (task) {
        return timeFilters.weekFilter($scope.selectedDate, new Date(task.date));
    };
    monthFilter = function (task) {
        return timeFilters.monthFilter($scope.selectedDate, new Date(task.date));
    };

    $scope.data = {
        tasks: []
    };

    $scope.selectedDate = new Date();
    $scope.taskFilter === undefined;

    $scope.changeFilter = function (filterNr) {
        if (filterNr == 1) {
            $scope.taskFilter = dayFilter;
        }
        if (filterNr == 2) {
            $scope.taskFilter = weekFilter;
        }
        if (filterNr == 3) {
            $scope.taskFilter = monthFilter;
        }
    };
    $scope.setRowColor = taskDisplayerToolkitService.getRowColor;

    $scope.showDetailedInfo = function (task) {
        var modalInstance = $modal.open({
            templateUrl: 'taskDisplayer/taskDisplayerDialog/detailedTaskInfoDialog.html',
            controller: 'displayTaskCtrl',
            size: 'lg',
            resolve: {
                displayedTask: function () {
                    return {
                        "id": task.id,
                        "title": task.title,
                        "category": task.category,
                        "priority": task.priority,
                        "content": task.content,
                        "date": task.date,
                        "status": task.status
                    };
                }
            }

        });
        modalInstance.result.then(function (data) {
            taskDisplayerServerCommunication.postChangedData($http, data, $scope.data);
        })
    }
    angular.copy(tasks.data, $scope.data.tasks);
});