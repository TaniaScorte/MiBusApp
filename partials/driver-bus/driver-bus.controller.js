(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverBusController', DriverBusController);

    DriverBusController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverBusController(UserService, $rootScope, $scope) {
        var vm = this;


        $scope.compradosDefinidos= 10;
        $scope.compradosOcupados= 7;
        $scope.compradosRestantes= 3;

        $scope.libresDefinidos=10;
        $scope.libresOcupados= 4;
        $scope.libresRestantes= 6;


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
                preventDefaultEvents: false
            });
        }
        swipe();


    }

   


})();