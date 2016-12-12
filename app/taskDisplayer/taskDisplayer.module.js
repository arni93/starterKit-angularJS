angular.module('app.taskDisplayer', ['ngRoute', 'app.taskDisplayer.templates', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/taskDisplayer/taskDisplayerDialog', {
            templateUrl: 'taskDisplayer/taskDisplayerDialog/taskDisplayerDialog.html',
            controller: 'taskDisplayerCtrl',
            resolve: {
                tasks: function ($http) {
                    return $http.get('/taskManager/tasks.json');
                }
            }
        });
    });