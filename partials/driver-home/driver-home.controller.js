(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverHomeController', DriverHomeController);

    DriverHomeController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverHomeController(UserService, $rootScope, $scope) {
        var vm = this;
        $scope.libres = 7;
        $scope.comprados = 5;
        $scope.ocupados = 9;

        $scope.proximaParada = 'P4, Alsina y Castelli';
        $scope.horaLlegada = '21:34';


        $scope.ocuparLibre = function () {
            alert(1);
        }

        $scope.ocuparComprado = function () {
            alert(2);
        }

        $scope.liberar = function () {
            alert(3);
        }

        $scope.marcarParada = function () {

            alert('parada');
        }


        var swipe = function () {
            $("#swipeHome").touchwipe({
                wipeLeft: function () {
                    window.location.replace('#!driver-map');
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