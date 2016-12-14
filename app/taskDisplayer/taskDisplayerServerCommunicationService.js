angular.module('app.taskDisplayer').service('taskDisplayerServerCommunication', function() {
    'use strict';
    var load = function(http, referenceObject) {
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

    this.postChangedData = function(http, data, referenceObject) {
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
})