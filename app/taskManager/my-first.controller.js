angular.module('app.taskManager').controller('MyFirstController', function($scope, $http, tasks) {
    'use strict';
    $scope.data = {
        tasks: []
    };
    angular.copy(tasks.data, $scope.data.tasks);

}).controller('MyModalController', function($scope, $modalInstance, selectedBook) {
    'use strict';

})
