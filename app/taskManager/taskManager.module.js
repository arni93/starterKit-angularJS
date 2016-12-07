angular.module('app.taskManager', ['ngRoute', 'app.taskManager.templates'])
    .config(function($routeProvider) {
        'use strict';
        $routeProvider.when('/taskManager/taskManagerDialog', {
            templateUrl: 'taskManager/taskManagerDialog/taskManagerDialog.html'
        });
    });
