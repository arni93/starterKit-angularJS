angular.module('app', ['ngRoute', 'app.main', 'app.taskManager', 'app.taskDisplayer'])
    .config(function($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
