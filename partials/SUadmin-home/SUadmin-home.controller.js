(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);
    SUAdminHomeController.$inject = ['UserService', '$rootScope', '$http', '$scope', '$uibModal'];
    function SUAdminHomeController(UserService, $rootScope, $http, $scope, $uibModal) {
        var vm = this;

        getEmpresas();
        //get todas las empresas
        function getEmpresas() {
            espera(true);
            var url = 'http://www.mellevas.com.ar/api/empresas/getEmpresas';
            var data = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            $http(data)
                .then(function (response) {
                    $scope.empresas = response.data;
                    //      console.log(response.data);
                    espera(false);

                })

                .catch(function (error) {
                    console.log(error);
                    espera(false);

                });
                
        }
        //nueva empresa
        $scope.nueva = function () {
            var url = 'http://www.mellevas.com.ar/api/empresas/Create';
            var data = {
                Nombre: $scope.txtNombreNew,
                Direccion: $scope.txtDirNew,
                Token: "2019",
            }

            var data = {
                method: 'post',
                url: url,
                data: data
            }

            $http(data)
                .then(function (response) {
                    //   console.log(response);
                    getEmpresas();
                    $('#modalNuevo').modal('hide');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //editar empresas
        $scope.editar = function (id) {
            espera(true);
            var id = id;
            var url = 'http://www.mellevas.com.ar/api/empresas/getEmpresa?id=';
            var data = {
                method: 'GET',
                url: url + id + "&token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            $http(data)
                .then(function (response) {
                    $scope.txtNombreEdit = response.data.Nombre;
                    $scope.txtDirEdit = response.data.Direccion;
                    // console.log(response);
                    espera(false);
                })
                .catch(function (error) {
                    console.log(error);
                    espera(false);
                });

            $('#btnEditar').on('click', function () {
                var url = 'http://www.mellevas.com.ar/api/empresas/Update';
                // console.log($scope.txtNombreEdit, $scope.txtDirEdit, id);
                var data = { 
                    id: id,
                    Nombre: $scope.txtNombreEdit,
                    Direccion: $scope.txtDirEdit,
                    Token: "2019"
                    
                }
                var data = {
                    method: 'post',
                    url: url,
                    data: data
                }
               // console.log(data);
                $http(data)
                    .then(function (response) {
                        console.log(response);
                        getEmpresas();  ////**********************************************************Terminar*********************** */
                        $('#modalEditar').modal('hide');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

        }
        //eliminar empresa
        $scope.eliminar = function (id) {
            $('#btnEliminar').on('click', function () {
                var url = 'http://www.mellevas.com.ar/api/empresas/Delete?id=';
                var data = {
                    method: 'GET',
                    url: url + id + "&token=" + 2019,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
                $http(data)
                    .then(function (response) {
                        getEmpresas();
                        $('#modalEliminar').modal('hide');
                        //         console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })

        }

        function espera(e) {
            if (e == true) {
                $scope.espera = 'visible';
            } else {
                $scope.espera = 'oculto';

            }
        }

    }
    //filtro personalizado para fechas
    SUhome.filter('filterDate', function () {
        var cambiarFiltro = function (datosOriginales) {
            if (datosOriginales == null) {
                var nuevosDatos = 'No hay datos';

            } else {
                var millis = datosOriginales.replace(/([A-Za-z)(\\/])/g, "");
                var date = new Date(parseInt(millis));
                var hoy = new Date();
                //         console.log('hoy'+hoy.getTime()+'input'+millis);
                if (hoy.getTime() < parseInt(millis)) {
                    var nuevosDatos = 'Activo'
                } else {
                    var nuevosDatos = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                }

            }


            return nuevosDatos;
        };
        return cambiarFiltro;
    });


})();