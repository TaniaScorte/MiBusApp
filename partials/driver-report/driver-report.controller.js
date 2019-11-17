(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverReportController', DriverReportController);

    DriverReportController.$inject = ['UserService', 'ResourcesDeleteService','ResourcesSetService','DriverService','$rootScope', '$scope','SweetAlert', '$location'];

    function DriverReportController(UserService,Delete,ResourcesSetService, DS, $rootScope, $scope,SweetAlert, $location) {
        var vm = this;
        var idViaje = DS.getIdViajeActual();
        $scope.check;
        $scope.hayAlerta=false;
        swipe();
        initController();

    function initController(){
        check();
        hayAlertaActiva();

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
                    DS.setIdAlerta(response.id);
                    if (response.Estado == 0) {
                   swal({ title: "Alerta enviada", text: "Recuerde finalizarla antes de terminar el viaje", type: "success" }, 
                   function() {window.location.reload();}
                   ); 

                //   window.location.replace('#!driver-map');
                
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
            if($scope.descripcion=='' || $scope.descripcion==null || $scope.descripcion==undefined){
                $scope.descripcion='No se puede continuar';
            }
            var ubicacion = DS.getLatLong();
            var data = {
                viajeId: idViaje,
                tipoalertaId: $scope.radio,
                estadoId: 0,
                mensaje: $scope.descripcion,
                latitud: ubicacion.lat,
                longitud:ubicacion.long,
                Token: "2019"
            }
            ResourcesSetService.SetAlerta(data)
                .then(function (response) {
                    if (response.Estado == 0) {
                        swal("Alerta enviada");
                        DS.setIdAlerta(response.id);
                        window.location.reload();
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
        function hayAlertaActiva(){
            var al=DS.getIdAlerta();
            console.log(al);
            if(al=='null'|| al==null || al == undefined || al == 'undefined'){
                $scope.hayAlerta= false;
            }else{
                $scope.hayAlerta= true;
            }
        }
        $scope.eliminarAlerta = function(){
            var idAl=DS.getIdAlerta();
            Delete.DeleteAlerta(idAl)
            .then(function (response) {
                console.log(response);
                if (response.Estado == 0) {
                    swal({ title: "Alerta finalizada", type: "success" }), 
                    $scope.hayAlerta= false;
                    DS.setIdAlerta(null);
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
        $scope.aunNo= function(){
            window.location.replace('#!driver-map');
        }
    };
}
    function swipe() {
        $("#swipeReport").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!driver-home');
            },
            wipeRight: function () {
                window.location.replace('#!driver-map');
            },
            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }


})();