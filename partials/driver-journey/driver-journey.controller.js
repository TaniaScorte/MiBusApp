(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverJourneyController', DriverJourneyController);

        DriverJourneyController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverJourneyController(UserService, $rootScope, $scope) {
        var vm = this;
        


        var swipe = function () {
            $("#swipeDJourney").touchwipe({
                wipeLeft: function () {
                    window.location.replace('#!driver-home');
                },
                wipeRight: function () {
                    window.location.replace('#!driver-report');
                },
    
                min_move_x: 200,
                min_move_y: 200,
                preventDefaultEvents: false
            });
        }
        swipe();


    }

    


})();