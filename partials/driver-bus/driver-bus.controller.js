(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverBusController', DriverBusController);

    DriverBusController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverBusController(UserService, $rootScope, $scope) {
        var vm = this;
        swipe();


    }

    function swipe() {
        $("#swipeBus").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!driver-report');
            },
            wipeRight: function () {
                window.location.replace('#!driver-map');

            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: true
        });
    }


})();