(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverReportController', DriverReportController);

    DriverReportController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverReportController(UserService, $rootScope, $scope) {
        var vm = this;
        swipe();

        

    }


    
    function swipe() {
        $("#swipeReport").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!driver-home');
            },
            wipeRight: function () {
                window.location.replace('#!driver-bus');

            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: true
        });
    }


})();