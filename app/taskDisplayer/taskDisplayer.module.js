angular.module('app.taskDisplayer', ['ngRoute', 'app.taskDisplayer.templates', 'ui.bootstrap'])
    .config(function($routeProvider) {
        'use strict';
        $routeProvider.when('/taskDisplayer/taskDisplayerDialog', {
            templateUrl: 'taskDisplayer/taskDisplayerDialog/taskDisplayerDialog.html',
            controller: 'taskDisplayerCtrl',
            resolve: {
                tasks: function($http) {
                    return $http({
                        "method": 'GET',
                        "url": "http://localhost:8090/rest/tasks/all",
                        "headers": { 'Content-Type': 'application/json' }
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        alert("Server is not working Get all request!")
                        return {

                        }
                    })
                }
            }
        });
    });