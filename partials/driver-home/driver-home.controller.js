(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverHomeController', DriverHomeController);

        DriverHomeController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverHomeController(UserService, $rootScope, $scope) {
        var vm = this;
        


        var swipe = function () {
            $("#swipeDHome").touchwipe({
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