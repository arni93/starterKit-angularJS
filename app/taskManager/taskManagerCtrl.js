angular.module('app.taskManager').controller('taskManagerCtrl', function ($scope, $http, $modal, tasks) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    $scope.searchExpression = "";
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.filteredTasks = null;
    angular.copy(tasks.data, $scope.data.tasks);

    $scope.search = function (item) {
        if ($scope.searchExpression == "") {
            return true;
        }
        var matchOnTitle, matchOnCategory, matchOnPriority, matchOnContent, matchOnDate, titleString, categoryString, priorityString, contentString, dateString, expr;
        titleString = '' + item.title;
        categoryString = '' + item.category;
        priorityString = '' + item.priority;
        contentString = '' + item.content;
        dateString = '' + item.date;
        expr = $scope.searchExpression.toLowerCase();

        if (titleString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (categoryString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (priorityString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (contentString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        if (dateString.toLowerCase().indexOf(expr) >= 0) {
            return true;
        }
        return false;
    }

    $scope.selectRow = function (index) {
        $scope.selectedRowIndex = index;
    }

    $scope.addTask = function () {
        var modalInstance = $modal.open({
            templateUrl: 'taskManager/addTaskModalDialog/addTaskModalDialog.html',
            controller: 'addTaskCtrl',
            size: 'lg',
            resolve: {
                newTask: function () {
                    var date, day, month, year, dateString;
                    date = new Date();
                    year = date.getFullYear();
                    month = date.getMonth() + 1;
                    day = date.getDate();
                    dateString = '' + year + '-' + month + '-' + day;
                    return {
                        "title": "insert title",
                        "category": "insert category",
                        "priority": 1,
                        "content": "insert content",
                        "date": dateString
                    }
                }
            }
        });
        modalInstance.result.then(function (data) {
            var day, month, year, dateString;
            year = data.date.getFullYear();
            month = data.date.getMonth() + 1;
            day = data.date.getDate();
            dateString = '' + year + '-' + month + '-' + day;
            data.date = dateString;
            $scope.data.tasks.push(data);
        })
    };
    $scope.editSelectedTask = function (taskIndex) {
        var modalInstance = $modal.open({
            templateUrl: 'taskManager/editTaskModalDialog/editTaskModalDialog.html',
            controller: 'editTaskCtrl',
            size: 'lg',
            resolve: {
                editedTask: function () {
                    var task = $scope.filteredTasks[taskIndex];
                    return {
                        "id": task.id,
                        "title": task.title,
                        "category": task.category,
                        "priority": task.priority,
                        "content": task.content,
                        "date": new Date(task.date)
                    }
                }
            }
        });
        modalInstance.result.then(function (data) {
            var day, month, year, dateString;
            year = data.date.getFullYear();
            month = data.date.getMonth() + 1;
            day = data.date.getDate();
            dateString = '' + year + '-' + month + '-' + day;
            data.date = dateString;
            for (var i = 0; i < $scope.data.tasks.length; i++) {
                if ($scope.data.tasks[i].id == data.id) {
                    $scope.data.tasks[i] = data;
                    break;
                }
            }
        })
    }
    $scope.removeSelectedTask = function (taskIndex) {
        var indexToRemove, data;
        indexToRemove = -1;
        data = $scope.filteredTasks[taskIndex];
        for (var i = 0; i < $scope.data.tasks.length; i++) {
            if ($scope.data.tasks[i].id == data.id) {
                indexToRemove = i;
                break;
            }
        }
        if (indexToRemove >= 0) {
            $scope.data.tasks.splice(indexToRemove, 1);
            $scope.selectedRowIndex = undefined;
        }
    }

}).controller('addTaskCtrl', function ($scope, $modalInstance, newTask) {
    'use strict';
    $scope.data = {
        newTask: {}
    };
    angular.copy(newTask, $scope.data.newTask);

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };


    $scope.ok = function () {
        $modalInstance.close($scope.data.newTask);
    }

}).controller('editTaskCtrl', function ($scope, $modalInstance, editedTask) {
    'use strict';
    $scope.data = {
        editedTask: {}
    };
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
