angular.module('app.taskDisplayer').service('taskDisplayerToolKitService', function () {
    "use strict";
    this.getRowColor = function (task) {
        if (task.priority.toLowerCase() == "very low") {
            return {
                "background-color": "palegreen"
            };
        }
        if (task.priority.toLowerCase() == "low") {
            return {
                "background-color": "green"
            };
        }
        if (task.priority.toLowerCase() == "medium") {
            return {
                "background-color": "gold"
            };
        }
        if (task.priority.toLowerCase() == "high") {
            return {
                "background-color": "orange"
            };
        }
        if (task.priority.toLowerCase() == "very high") {
            return {
                "background-color": "red"
            };
        }
    }
});