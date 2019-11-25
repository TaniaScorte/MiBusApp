(function () {
    'use strict';

    var driver_home = angular
        .module('app')
        .controller('DriverHomeController', DriverHomeController);

    DriverHomeController.$inject = ['UserService', 'DriverService', '$rootScope', '$scope', 'SweetAlert', 'ResourcesService', '$filter'];


    function DriverHomeController(UserService, DS, $rootScope, $scope, SW, ResourcesService, $filter) {
        var vm = this;
        initController();

        function initController() {
            getViajes();
            $scope.elegirViaje = function (idV, idR) {
                if (DS.getIniciado() == 'true') {
                    SW.swal("Hay un viaje en curso", "Finalice el primero antes de comenzar otro", "error");
                } else {
                    DS.setRecorridoElegido(idR);
                    DS.setViajeElegido(idV);
                   // console.log(DS.getRecorridoElegido());

                    //console.log(DS.getViajeElegido());
                    window.location.href='#!/driver-map';
                }
            }
            function getViajes() {
                $scope.items = []; // JSON 
                $scope.filtroItems = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 5;
                $scope.inicializar = function () {
                    ResourcesService.GetViajesxChoferxDia($scope.user.Id)
                        .then(function (response) {
                            if (response.length == 0) {
                                console.log('no hay datos');
                                swal("Aún no tiene viajes", "Intente más tarde", "warning");
                            }
                            if (response) {
                                if (response) {
                                    $scope.items = response;
                                    $scope.hacerPagineo($scope.items);
                                    $scope.totalItems = $scope.items.length;
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            SweetAlert.swal({
                                type: "error",
                                title: "Error",
                                text: error,
                                confirmButtonAriaLabel: 'Ok',
                            });
                        });
                };
                $scope.inicializar();

                $scope.hacerPagineo = function (arreglo) {
                    var principio = (($scope.currentPage - 1) * $scope.numPerPage); //0, 3
                    var fin = principio + $scope.numPerPage; //3, 6
                    $scope.filtroItems = arreglo.slice(principio, fin); // 
                };

                $scope.buscar = function (busqueda) {
                    var buscados = $filter('filter')($scope.items, function (item) {
                        return (item.RecorridoNombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); // matches, contains
                    });
                    $scope.totalItems = buscados.length;
                    $scope.hacerPagineo(buscados);
                };

                $scope.$watch('currentPage', function () {
                    $scope.hacerPagineo($scope.items);
                });
            }

        }
    }

    driver_home.filter('filterEstado', function () {
        var cambiarFiltro = function (datosOriginales) {
            if (datosOriginales == null) {
                var nuevosDatos = 'No hay datos';

            } else if (datosOriginales == 0) {

                var nuevosDatos = 'Pendiente';

            }
            else if (datosOriginales == 1) {

                var nuevosDatos = 'En curso';

            }
            else if (datosOriginales == 6) {

                var nuevosDatos = 'Terminado';

            }


            return nuevosDatos;
        };
        return cambiarFiltro;
    });

})();
