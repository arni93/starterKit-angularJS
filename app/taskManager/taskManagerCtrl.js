angular.module('app.taskManager').controller('taskManagerCtrl', function($scope, $http, $modal, tasks, taskManagerToolkitService, taskManagerServerCommunication) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    $scope.searchExpression = "";
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.filteredTasks = null;
    $scope.search = function(task) {
        return taskManagerToolkitService.searchFilter(task, $scope.searchExpression);
    };
    $scope.selectRow = function(index) {
        $scope.selectedRowIndex = index;
    };
    angular.copy(tasks.data, $scope.data.tasks);

    $scope.addTask = function() {
        var modalInstance = $modal.open({
            templateUrl: 'taskManager/addTaskModalDialog/addTaskModalDialog.html',
            controller: 'addTaskCtrl',
            size: 'lg',
            resolve: {
                newTask: function() {
                    var date, day, month, year, dateString;
                    return {
                        "title": "",
                        "category": "",
                        "priority": "",
                        "content": "",
                        "date": new Date()
                    }
                }
            }
        });
        modalInstance.result.then(function(data) {
            taskManagerServerCommunication.synchronizedPostAddData($http, data, $scope.data);
        })
    };
    $scope.editSelectedTask = function(taskIndex) {
        var modalInstance = $modal.open({
            templateUrl: 'taskManager/editTaskModalDialog/editTaskModalDialog.html',
            controller: 'editTaskCtrl',
            size: 'lg',
            resolve: {
                editedTask: function() {
                    var task = $scope.filteredTasks[taskIndex];
                    return {
                        "id": task.id,
                        "title": task.title,
                        "category": task.category,
                        "priority": task.priority,
                        "content": task.content,
                        "date": new Date(task.date),
                        "status": task.status
                    }
                }
            }
        });
        modalInstance.result.then(function(data) {
            taskManagerServerCommunication.synchronizedPostChangedData($http, data, $scope.data);
        })
    }
    $scope.removeSelectedTask = function(taskIndex) {
        var indexToRemove, dataToRemove;
        indexToRemove = -1;
        dataToRemove = $scope.filteredTasks[taskIndex];
        taskManagerServerCommunication.synchronizedRemovePostData($http, dataToRemove, $scope.data);
    }
});
