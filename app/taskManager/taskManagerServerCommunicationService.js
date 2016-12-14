angular.module('app.taskManager').service('taskManagerServerCommunication', function () {
    'use strict';
    var load = function (http, referenceObject) {
        var resultData = {};
        http({
            "method": 'GET',
            "url": "http://localhost:8090/rest/tasks/all",
            "headers": { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            referenceObject.tasks = response.data;
        }, function errorCallback(response) {
            alert("Server is not working Get all request!")
        });
    };
    this.loadDataFromServer = load;

    this.synchronizedPostAddData = function (http, data, referenceObject) {
        var day, month, year, dateString;
        year = data.date.getFullYear();
        month = data.date.getMonth() + 1;
        day = data.date.getDate();
        dateString = '' + year + '-' + month + '-' + day;
        data.date = dateString;
        http({
            "method": "POST",
            "url": "http://localhost:8090/rest/tasks/new",
            "data": {
                "id": data.id,
                "title": data.title,
                "content": data.content,
                "category": data.category,
                "priority": data.priority,
                "date": data.date,
                "status": "not started"
            },
            "headers": { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            load(http, referenceObject);
        }, function errorCallback(response) {
            alert("Server is not working! Add request")
        });
    }

    this.synchronizedPostChangedData = function (http, data, referenceObject) {
        var day, month, year, dateString;
        year = data.date.getFullYear();
        month = data.date.getMonth() + 1;
        day = data.date.getDate();
        dateString = '' + year + '-' + month + '-' + day;
        data.date = dateString;
        http({
            "method": "POST",
            "url": "http://localhost:8090/rest/tasks/updated",
            "data": {
                "id": data.id,
                "title": data.title,
                "content": data.content,
                "category": data.category,
                "priority": data.priority,
                "date": data.date,
                "status": data.status
            },
            "headers": { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            load(http, referenceObject);
        }, function errorCallback(response) {
            alert("Server is not working! Update request")
        });
    }

    this.synchronizedRemovePostData = function (http, RemovedTaskData, referenceObject) {
        var indexToRemove, data;
        indexToRemove = -1;
        http({
            "method": "POST",
            "url": "http://localhost:8090/rest/tasks/deleted",
            "data": {
                "id": RemovedTaskData.id,
                "title": RemovedTaskData.title,
                "content": RemovedTaskData.content,
                "category": RemovedTaskData.category,
                "priority": RemovedTaskData.priority,
                "date": RemovedTaskData.date,
                "status": RemovedTaskData.status
            },
            "headers": { 'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            load(http, referenceObject);
        }, function errorCallback(response) {
            alert("Server is not working! remove request");
        });
    }
});
