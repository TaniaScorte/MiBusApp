(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverHomeController', DriverHomeController);

        DriverHomeController.$inject = ['UserService','DriverService', '$rootScope', '$scope','SweetAlert'];


    function DriverHomeController(UserService,DS, $rootScope, $scope, SW) {
        var vm = this;
        initController();
        var swipe = function () {
            $("#swipeDHome").touchwipe({
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


    function initController() {
        $scope.elegirViaje= function(id){
            if(DS.getIniciado() == 'true'){
                SW.swal( "Hay un viaje en curso" ,  "Finalice el primero antes de comenzar otro" ,  "error" );
            }else{
                DS.setViajeElegido(id);
                console.log(DS.getViajeElegido());
                window.location.replace('#!driver-map');
            }
           

        }
    }
}

})();
