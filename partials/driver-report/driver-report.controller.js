(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverReportController', DriverReportController);

    DriverReportController.$inject = ['UserService', 'ResourcesSetService','$rootScope', '$scope'];


    function DriverReportController(UserService,ResourcesSetService, $rootScope, $scope) {
        var vm = this;
        swipe();

        initController();

    



    function initController(){

        $scope.enviarDemora = function(){
            console.log($rootScope.long);
            var data = {
//IMPORTANTE CAMBIAR ID DEL VIAJE//////////////////////////////////////////////////                
                viajeId: 3,
                tipoalertaId: 1,
                estadoId: 0,
                mensaje: 'Estoy demorado',
                latitud: 0,
                longitud:0,
                Token: "2019",
            }
            ResourcesSetService.SetAlerta(data)
                .then(function (response) {
                    if (response.Estado == 0) {
                        CreateUser(response.id);
                    }
                })
                .catch(function (error) {
                    //  console.log(error);
                    SweetAlert.swal({
                        type: "error",
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });
        }
        $scope.enviarTecnica = function(){

        }

    };
    
    
    
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
            preventDefaultEvents: false
        });
    }


})();