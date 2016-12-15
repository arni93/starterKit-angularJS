describe('taskDisplayerController test suite', function () {
    "use strict";
    var $scope, $modal, timeFiltersMock, taskDisplayerServerCommunicationMock, taskDisplayerToolkitServiceMock, tasksMock, fakeModal;

    //loads controller module
    beforeEach(module('app.taskDisplayer'));


    //create mocks
    beforeEach(function () {
        tasksMock = ['a', 'b', 'c'];

        timeFiltersMock = {
            dayFilter: angular.noop,
            weekFilter: angular.noop,
            monthFilter: angular.noop
        };
        taskDisplayerServerCommunicationMock = {};
        taskDisplayerToolkitServiceMock = {};
    })


    beforeEach(inject(function ($controller, $rootScope, _$modal_) {
        $scope = $rootScope.$new();
        $modal = _$modal_;
        $controller('taskDisplayerCtrl', {
            $scope: $scope,
            $modal: _$modal_,
            tasks: tasksMock,
            timeFilters: timeFiltersMock,
            taskDisplayerServerCommunication: taskDisplayerServerCommunicationMock,
            taskDisplayerToolkitService: taskDisplayerToolkitServiceMock
        });
    }));


    describe('timeFilter tests suite', function () {

        beforeEach(function () {
            spyOn(timeFiltersMock, 'dayFilter');
        });


        it('shouldSetInnerFilter', function () {
            //given
            $scope.taskFilter = undefined;
            //when
            $scope.changeFilter(1);
            //then
            expect($scope.taskFilter).toEqual(jasmine.any(Function));
        });

        it('shouldCallDayFilterWhenSetTo1', function () {
            //given
            var givenTask, givenDate;
            givenDate = new Date("2012-12-12");
            $scope.selectedDate = givenDate;
            givenTask = { date: new Date("2012-12-13") };
            $scope.changeFilter(1);
            //when
            $scope.taskFilter(givenTask);
            //then
            expect(timeFiltersMock.dayFilter).toHaveBeenCalledWith(givenDate, givenTask.date);
        });
    });


    describe('Modals test suite', function () {

        fakeModal = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function (item) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack(item);
            },
            dismiss: function (type) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback(type);
            }
        };
        //przez rozne wersje zwracania wartosci dla spy w roznych wersjach jasmine stracilem z 1.5 godziny :(
        beforeEach(function () {
            spyOn($modal, 'open').and.returnValue(fakeModal);
        });


        it('shouldOpenShowDetailedInfoDialog', function () {
            //given
            var task = {};
            //when
            $scope.showDetailedInfo(task);
            //then
            expect($modal.open).toHaveBeenCalledWith({
                templateUrl: 'taskDisplayer/taskDisplayerDialog/detailedTaskInfoDialog.html',
                controller: 'displayTaskCtrl',
                size: 'lg',
                resolve: {
                    displayedTask: jasmine.any(Function)
                }
            });
        });
    });
});
