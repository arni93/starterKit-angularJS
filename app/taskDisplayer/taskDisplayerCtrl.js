angular.module('app.taskDisplayer').controller('taskDisplayerCtrl', function($scope, $http, $modal, tasks) {
    'use strict';
    var dayFilter, weekFilter, monthFilter, result, taskDate;
    dayFilter = function(task) {
        var selectedDay, selectedMonth, selectedYear;
        selectedDay = $scope.selectedDate.getDate();
        selectedMonth = $scope.selectedDate.getMonth();
        selectedYear = $scope.selectedDate.getFullYear();
        taskDate = new Date(task.date);

        result = false;
        if (selectedDay == taskDate.getDate() && selectedMonth == taskDate.getMonth() && selectedYear == taskDate.getFullYear()) {
            result = true;
        }
        return result;
    };
    weekFilter = function(task) {
        var selectedDayOfWeek, daysDistanceUp, daysDistanceDown, distance, result, taskDate, taskDateDays, selectedDateDays;
        taskDate = new Date(task.date);
        selectedDayOfWeek = $scope.selectedDate.getDay();

        if (selectedDayOfWeek != 0) {
            daysDistanceDown = -(selectedDayOfWeek - 1);
            daysDistanceUp = 7 - selectedDayOfWeek;
        }
        else {
            daysDistanceDown = -6;
            daysDistanceUp = 0;
        }
        taskDateDays = Math.floor(taskDate.getTime() / (24 * 60 * 60 * 1000));
        selectedDateDays = Math.floor($scope.selectedDate.getTime() / (24 * 60 * 60 * 1000));
        distance = taskDateDays - selectedDateDays;
        result = false;
        if (distance <= daysDistanceUp && distance >= daysDistanceDown) {
            result = true;
        }
        return result;
    };
    monthFilter = function(task) {
        var selectedMonth, selectedYear, taskDate;
        taskDate = new Date(task.date);
        selectedMonth = $scope.selectedDate.getMonth();
        selectedYear = $scope.selectedDate.getFullYear();
        result = false;
        if (selectedMonth == taskDate.getMonth() && selectedYear == taskDate.getFullYear()) {
            result = true;
        }
        return result;
    };


    $scope.data = {
        tasks: []
    };
    $scope.selectedDate = new Date();
    $scope.taskFilter === undefined;

    $scope.changeFilter = function(filterNr) {
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
    $scope.setRowColor = function(task) {
        if (task.priority.toLowerCase() == "very low") {
            return {
                color: "green"
            };
        }
        if (task.priority.toLowerCase() == "low") {
            return {
                color: "blue"
            };
        }
        if (task.priority.toLowerCase() == "medium") {
            return {
                color: "gold"
            };
        }
        if (task.priority.toLowerCase() == "high") {
            return {
                color: "orange"
            };
        }
        if (task.priority.toLowerCase() == "very high") {
            return {
                color: "red"
            };
        }

    };

    angular.copy(tasks.data, $scope.data.tasks);

}).controller('displayTaskCtrl', function($scope, $modalInstance, displayedTask) {
    'use strict';
    $scope.data = {
        displayedTask: {}
    };
    angular.copy(displayedTask, $scope.data.displayedTask);

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };


    $scope.ok = function() {
        $modalInstance.close($scope.data.displayedTask);
    }
})