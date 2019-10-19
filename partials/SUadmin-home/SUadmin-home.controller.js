(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);
    SUAdminHomeController.$inject = ['UserService','ResourcesService', 'ResourcesSetService','$rootScope', '$http', '$scope', '$uibModal'];
    function SUAdminHomeController(UserService,ResourcesService,ResourcesSetService, $rootScope, $http, $scope, $uibModal) {
        var vm = this;


        initController();

        function initController(){
            espera(false);
            if(!$rootScope.empresas){
                getEmpresas();
            }
            if(!$rootScope.dnitypes){
                getTiposDNI();
            }
           
        }
        function getEmpresas(){
            ResourcesService.GetEmpresas()
            .then(function (response) {
                if (response){
                    $rootScope.empresas = response;      
                } 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
        }
        //nueva empresa
        $scope.nueva = function () {
            var data = {
                Nombre: $scope.txtNombreNew,
                Direccion: $scope.txtDirNew,
                Token: "2019",
            }
            ResourcesSetService.SetEmpresa(data)
            .then(function (response) {
                if (response.data.Estado == 0) {
                    CreateUser(response.data.id);  
                } 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
        }

        //editar empresas
        $scope.editar = function (id) {
            espera(true);
            var id = id;
            var url = 'https://www.mellevas.com.ar/api/empresas/getEmpresa?id=';
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
                var url = 'https://www.mellevas.com.ar/api/empresas/Update';
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
                var url = 'https://www.mellevas.com.ar/api/empresas/Delete?id=';
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
            UserService.Create(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El usuario ha sido creado, verifique su casilla de E-mail",
                        confirmButtonAriaLabel: 'Ok',
                    });
                    getEmpresas();
                    $('#modalNuevo').modal('hide');
                   
                } 
                if(response.Estado == 50){
                    SweetAlert.swal ({
                        type: "warning", 
                        title: "Verifique!",
                        text: response.Mensaje + " verifique su e-mail",
                        confirmButtonAriaLabel: 'Ok',
                    });
                }
                else {
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: "Error al crear el usuario",
                        confirmButtonAriaLabel: 'Ok',
                    });
                }
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
        }


        function getTiposDNI(){
            ResourcesService.GetTiposDNI()
            .then(function (response) {
                if (response){
                   $rootScope.dnitypes = response;          
                } 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
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




