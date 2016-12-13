angular.module('app.taskDisplayer').service('timeFilters', function () {
    'use strict';

    this.dayFilter = function (givenDate, comparedDate) {
        var selectedDay, selectedMonth, selectedYear, result;
        selectedDay = givenDate.getDate();
        selectedMonth = givenDate.getMonth();
        selectedYear = givenDate.getFullYear();

        result = false;
        if (selectedDay == comparedDate.getDate() && selectedMonth == comparedDate.getMonth() && selectedYear == comparedDate.getFullYear()) {
            result = true;
        }
        return result;
    };

    this.weekFilter = function (givenDate, comparedDate) {
        var selectedDayOfWeek, daysDistanceUp, daysDistanceDown, distance, result, taskDate, taskDateDays, selectedDateDays;
        selectedDayOfWeek = givenDate.getDay();
        if (selectedDayOfWeek != 0) {
            daysDistanceDown = -(selectedDayOfWeek - 1);
            daysDistanceUp = 7 - selectedDayOfWeek;
        }
        else {
            daysDistanceDown = -6;
            daysDistanceUp = 0;
        }
        taskDateDays = Math.floor(comparedDate.getTime() / (24 * 60 * 60 * 1000));
        selectedDateDays = Math.floor(givenDate.getTime() / (24 * 60 * 60 * 1000));
        distance = taskDateDays - selectedDateDays;
        result = false;
        if (distance <= daysDistanceUp && distance >= daysDistanceDown) {
            result = true;
        }
        return result;
    };

    this.monthFilter = function (givenDate, comparedDate) {
        var selectedMonth, selectedYear, result;
        selectedMonth = givenDate.getMonth();
        selectedYear = givenDate.getFullYear();
        result = false;
        if (selectedMonth == comparedDate.getMonth() && selectedYear == comparedDate.getFullYear()) {
            result = true;
        }
        return result;
    };
});