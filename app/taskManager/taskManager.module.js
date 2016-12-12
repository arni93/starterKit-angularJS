angular.module('app.taskManager', ['ngRoute', 'app.taskManager.templates', 'ui.bootstrap'])
    .config(function($routeProvider) {
        'use strict';
        $routeProvider.when('/taskManager/taskManagerDialog', {
            templateUrl: 'taskManager/taskManagerDialog/taskManagerDialog.html',
            controller: 'taskManagerCtrl',
            resolve: {
                tasks: function($http) {
                    return $http({
                        "method": 'GET',
                        "url": "http://localhost:8090/rest/tasks/all",
                        "headers": { 'Content-Type': 'application/json' }
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        alert("Server is not working!")
                        return {

                        }
                    })
                }
            }
        });
    });
