(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);
    SUAdminHomeController.$inject = ['UserService','SweetAlert','ResourcesService','ResourcesUpdateService','ResourcesDeleteService', 'ResourcesSetService','$rootScope', '$http', '$scope'];
    function SUAdminHomeController(UserService,SweetAlert,ResourcesService,ResourcesUpdateService,ResourcesDeleteService,ResourcesSetService, $rootScope, $http, $scope) {
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
                //console.log(error);
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
                Cuit: $scope.txtCuitNew,
                Descripcion: $scope.txtDescNew,
                Token: "2019",
            }
            ResourcesSetService.SetEmpresa(data)
            .then(function (response) {
                if (response.Estado == 0) {
                    CreateUser(response.id);  
                } 
            })
            .catch(function(error){
              //  console.log(error);
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
           ResourcesService.GetEmpresa(id)
                .then(function (response) {
                    $scope.txtNombreEdit = response.Nombre;
                    $scope.txtDirEdit = response.Direccion;
                    $scope.txtCuitEdit = response.Cuit;
                    $scope.txtDescEdit = response.Descripcion;
                    console.log(response);
                    espera(false);
                })
                .catch(function (error) {
                    console.log(error);
                    espera(false);
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });

            $('#btnEditar').on('click', function () {
                var url = 'https://www.mellevas.com.ar/api/empresas/Update';
                // console.log($scope.txtNombreEdit, $scope.txtDirEdit, id);
                var data = {
                    id: id,
                    Nombre: $scope.txtNombreEdit,
                    Direccion: $scope.txtDirEdit,
                    Cuit: $scope.txtCuitEdit,
                    Descripcion: $scope.txtDescEdit,
                    TokenMP: '',
                    Token: '2019'
                }
                ResourcesUpdateService.UpdateEmpresa(data)
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

            $('#btnEliminar').on('click', function(){
                ResourcesDeleteService.DeleteEmpresa(id)
                .then(function (response) {
                    if (response){
                        getEmpresas();
                        $('#modalEliminar').modal('hide');
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
                RolId: 3
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
               else if(response.Estado == 50){
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
                console.log(error);
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


         function validar(tipo){
            if(tipo == 'new'){
                
            }
            if(tipo == 'edit'){

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




