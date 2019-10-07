(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);
    SUAdminHomeController.$inject = ['UserService', '$rootScope', '$http', '$scope', '$uibModal'];
    function SUAdminHomeController(UserService, $rootScope, $http, $scope, $uibModal) {
        var vm = this;

        getEmpresas();
        getTiposDNI();
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
                    console.log(response);
                    if (response.data.Estado == 0) {
                        console.log(response.data.id);
                        CreateUser(response.data.id);
                    } else (console.log('ha ocurrido un error'));

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
                    console.log(response);
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

        function CreateUser(idEmpresa) {
            var data = {
                Nombre: $scope.nombre,
                Apellido: $scope.apellido,
                TipoDni: $scope.tipoDni.Id,
                Dni: $scope.dni,
                Email: $scope.email,
                Clave: $scope.clave,
                Telefono: $scope.telefono,
                EmpresaId: idEmpresa,
                RolId: 3,
                Token: "2019",
            }
            var urlUser = 'http://www.mellevas.com.ar/api/usuarios/create';

            var req = {
                method: 'POST',
                url: urlUser,
                data: data
            }
            console.log(req);

            $http(req)
                .then(function (response) {
                    console.log(response.data);
                    getEmpresas();
                    $('#modalNuevo').modal('hide');
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("Error al crear el usuario");
                });
        }



        function getTiposDNI() {
            var url = 'http://www.mellevas.com.ar/api/tiposdni/getTiposDni';

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }

            $http(req)
                .then(function (response) {
                    $scope.dnitypes = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("Error al cargar los tipos de dni");
                });
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




