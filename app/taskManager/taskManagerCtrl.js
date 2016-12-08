angular.module('app.taskManager').controller('taskManagerCtrl', function ($scope, $http, $modal, tasks) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    $scope.searchExpression = "";

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
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };


    angular.copy(newTask, $scope.data.newTask);

    $scope.ok = function () {
        $modalInstance.close($scope.data.newTask);
    }
})
