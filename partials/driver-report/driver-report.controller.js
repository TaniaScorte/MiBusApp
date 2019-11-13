(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverReportController', DriverReportController);

    DriverReportController.$inject = ['UserService', 'ResourcesSetService','DriverService','$rootScope', '$scope','SweetAlert'];


    function DriverReportController(UserService,ResourcesSetService, DS, $rootScope, $scope,SweetAlert) {
        var vm = this;
        var idViaje = DS.getIdViajeActual();
        $scope.check;
        swipe();

        initController();

    



    function initController(){
        check();

        function check() {
            if (idViaje == null || idViaje == undefined || idViaje == 'null') {
                SweetAlert.swal('No hay ningun viaje en curso');
                $scope.check=false;
            } else {
                $scope.check=true;
            }
        }

        $scope.enviarDemora = function(){
            var ubicacion = DS.getLatLong();
            var data = {
                viajeId: idViaje,
                tipoalertaId: 1,
                estadoId: 0,
                mensaje: 'Estoy demorado',
                latitud: ubicacion.lat,
                longitud:ubicacion.long,
                Token: "2019"
            }
            ResourcesSetService.SetAlerta(data)
                .then(function (response) {
                    if (response.Estado == 0) {
                        swal("Alerta enviada");
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
            var ubicacion = DS.getLatLong();
            var data = {
                viajeId: idViaje,
                tipoalertaId: 1,
                estadoId: 0,
                mensaje: 'Estoy demorado',
                latitud: ubicacion.lat,
                longitud:ubicacion.long,
                Token: "2019"
            }
            ResourcesSetService.SetAlerta(data)
                .then(function (response) {
                    if (response.Estado == 0) {
                        swal("Alerta enviada");
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