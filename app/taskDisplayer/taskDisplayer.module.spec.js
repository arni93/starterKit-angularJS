describe('\'app.taskDisplayer\' module', function() {
    'use strict';
    var routeProvider;

    beforeEach(function() {
        module('ngRoute', function($routeProvider) {
            routeProvider = $routeProvider;
            spyOn(routeProvider, 'when').and.callThrough();
        });
        module('app.taskDisplayer');
    });
    beforeEach(inject());

    it('defines the route for the dialog', function() {
        expect(routeProvider.when).toHaveBeenCalledWith('/taskDisplayer/taskDisplayerDialog', {
            templateUrl: 'taskDisplayer/taskDisplayerDialog/taskDisplayerDialog.html',
            controller: 'taskDisplayerCtrl',
            resolve: jasmine.any(Object)
        });
    })
});