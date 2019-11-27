(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);
    SUAdminHomeController.$inject = ['UserService', 'SweetAlert', 'ResourcesService', 'ResourcesUpdateService', 'ResourcesDeleteService', 'ResourcesSetService', '$rootScope', '$http', '$filter', '$scope'];
    function SUAdminHomeController(UserService, SweetAlert, ResourcesService, ResourcesUpdateService, ResourcesDeleteService, ResourcesSetService, $rootScope, $http, $filter, $scope) {
        var vm = this;
        vm.idEtitar = 0;
        vm.idEliminar = 0;


        initController();

        function initController() {
            if (!$scope.items) {
                getEmpresas();
            }
            if (!$rootScope.dnitypes) {
                getTiposDNI();
            }

        }
        function getEmpresas() {
            espera(true);
            $scope.items = []; // JSON 
            $scope.filtroItems = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetEmpresas()
                    .then(function (response) {
                        if (response) {
                            espera(false);
                            if (response) {
                                $scope.items = response;
                                // console.log($scope.items);
                                $scope.hacerPagineo($scope.items);
                                $scope.totalItems = $scope.items.length;
                                // console.log('total items', $scope.totalItems);
                            }

                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
                        espera(false);
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
                    return (item.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); // matches, contains
                });
                $scope.totalItems = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.items);
            });


        }

        //nueva empresa
        $scope.nueva = function () {
            if (validarUsuario()) {
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
        }

        //editar empresas
        $scope.editar = function (id) {
            vm.idEtitar = id;
            espera(true);
            ResourcesService.GetEmpresa(id)
                .then(function (response) {
                    $scope.txtNombreEdit = response.Nombre;
                    $scope.txtDirEdit = response.Direccion;
                    $scope.txtCuitEdit = parseInt(response.Cuit);
                    $scope.txtDescEdit = response.Descripcion;
                    // console.log(response);
                    espera(false);
                })
                .catch(function (error) {
                    console.log(error);
                    espera(false);
                    SweetAlert.swal({
                        type: "error",
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });

            $scope.guardarEdicion = function () {
                if (validarEmpresa('edit')) {
                    var data = {
                        id: vm.idEtitar,
                        Nombre: $scope.txtNombreEdit,
                        Direccion: $scope.txtDirEdit,
                        Cuit: $scope.txtCuitEdit,
                        Descripcion: $scope.txtDescEdit,
                        TokenMP: '',
                        Token: '2019'
                    }
                    ResourcesUpdateService.UpdateEmpresa(data)
                        .then(function (response) {
                            //console.log(response);
                            getEmpresas();
                            $('#modalEditar').modal('hide');
                            SweetAlert.swal({
                                type: "success",
                                title: "Datos actualizados",
                                text: 'Los datos fueron actualizados correctamente',
                                confirmButtonAriaLabel: 'Ok',
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }

            };

        }
        //eliminar empresa
        $scope.eliminar = function (id) {
            vm.idEliminar = id;
        }
        $scope.confirmarEliminar = function () {
            ResourcesDeleteService.DeleteEmpresa(vm.idEliminar)
                .then(function (response) {
                    if (response) {
                        getEmpresas();
                        $('#modalEliminar').modal('hide');
                        SweetAlert.swal({
                            type: "success",
                            title: "Cliente eliminado",
                            text: 'El cliente fue eliminado correctamente',
                            confirmButtonAriaLabel: 'Ok',
                        });
                    }
                })
                .catch(function (error) {
                    SweetAlert.swal({
                        type: "error",
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });

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
                    if (response.Estado == 0) {
                        SweetAlert.swal({
                            type: "success",
                            title: "La operacion se ha realizado con exito",
                            text: "Un nuevo cliente ha sido creado, verifique su casilla de E-mail",
                            confirmButtonAriaLabel: 'Ok',
                        });
                        getEmpresas();
                        $('#modalNuevo').modal('hide');

                    }
                    else if (response.Estado == 50) {
                        SweetAlert.swal({
                            type: "warning",
                            title: "Verifique!",
                            text: response.Mensaje + " verifique su e-mail",
                            confirmButtonAriaLabel: 'Ok',
                        });
                        ResourcesDeleteService.DeleteEmpresa(idEmpresa).then(function (response) { console.log(response); }).catch(function (error) { console.log(error) });
                    }
                    else {
                        SweetAlert.swal({
                            type: "error",
                            title: "Error",
                            text: "Error al crear el usuario, intente mas tarde",
                            confirmButtonAriaLabel: 'Ok',
                        });
                        ResourcesDeleteService.DeleteEmpresa(idEmpresa).then(function (response) { console.log(response); }).catch(function (error) { console.log(error) });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    SweetAlert.swal({
                        type: "error",
                        title: "Error",
                        text: 'Se produjo un error, intente mas tarde',
                        confirmButtonAriaLabel: 'Ok',
                    });
                    ResourcesDeleteService.DeleteEmpresa(idEmpresa).then(function (response) { console.log(response); }).catch(function (error) { console.log(error) });
                });
        }


        function getTiposDNI() {
            ResourcesService.GetTiposDNI()
                .then(function (response) {
                    if (response) {
                        $rootScope.dnitypes = response;
                    }
                })
                .catch(function (error) {
                    SweetAlert.swal({
                        type: "error",
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });
        }

        $scope.siguiente = function () {

            if (validarEmpresa('new')) {
                $scope.formEmpresa = 'formOculto';
                $scope.formUsuario = 'formVisible';
            } else {
                //alert('error');
            }
        }
        $scope.volver = function () {

            $scope.formUsuario = 'formOculto';
            $scope.formEmpresa = 'formVisible';

        }

        $scope.clearForm = function () {
            $scope.formEmpresa = 'formVisible';
            $scope.formUsuario = 'formOculto';
        }

        function validarEmpresa(tipo) {
            if (tipo == 'new') {
                if ($scope.txtNombreNew == "" || $scope.txtNombreNew == undefined) {
                    $scope.errorNewNom = true;
                    return false;
                }
                if ($scope.txtDirNew == "" || $scope.txtDirNew == undefined) {
                    $scope.errorNewDir = true;
                    return false;
                }
                if ($scope.txtCuitNew == "" || $scope.txtCuitNew == undefined || $scope.txtCuitNew == null || isNaN($scope.txtCuitNew) || $scope.txtCuitNew.toString().length != 11) {
                    $scope.errorNewCuit = true;
                    return false;
                }
                if ($scope.txtDescNew == "" || $scope.txtDescNew == undefined || $scope.txtDescNew == null) {
                    $scope.errorNewDesc = true;
                    return false;
                }
            }
            else if (tipo == 'edit') {
                if ($scope.txtNombreEdit == "" || $scope.txtNombreEdit == undefined || $scope.txtNombreEdit == null) {
                    $scope.errorEditNom = true;
                    return false;
                }
                if ($scope.txtDirEdit == "" || $scope.txtDirEdit == undefined || $scope.txtDirEdit == null) {
                    $scope.errorEditDir = true;
                    return false;
                }
                if ($scope.txtCuitEdit == "" || $scope.txtCuitEdit == undefined || $scope.txtCuitEdit == null || isNaN($scope.txtCuitEdit) || $scope.txtCuitEdit.toString().length != 11){
                    $scope.errorEditCuit = true;
                    return false;
                }
                if ($scope.txtDescEdit == "" || $scope.txtDescEdit == undefined || $scope.txtDescEdit == null) {
                    $scope.errorEditDesc = true;
                    return false;
                }


            }

            return true;

        }

        function validarUsuario() {
            if ($scope.nombre == "" || $scope.nombre == undefined || $scope.nombre == null) {
                $scope.errorNom = true;
                return false;
            }
            if ($scope.apellido == "" || $scope.apellido == undefined || $scope.apellido == null) {
                $scope.errorApe = true;
                return false;
            }
            if ($scope.tipoDni == "" || $scope.tipoDni == undefined || $scope.tipoDni == null) {
                $scope.errorTipoDoc = true;
                return false;
            }
            if ($scope.dni == "" || $scope.dni == undefined || $scope.dni == null || isNaN($scope.dni)) {
                $scope.errorNumDoc = true;
                return false;
            }
            if ($scope.telefono == "" || $scope.telefono == undefined || $scope.telefono == null || isNaN($scope.telefono)) {
                $scope.errorTel = true;
                return false;
            }
            if ($scope.email == "" || $scope.email == undefined || $scope.email == null) {
                $scope.errorEmail = true;
                return false;
            }
            if ($scope.clave == "" || $scope.clave == undefined || $scope.clave == null) {
                $scope.errorClave = true;
                return false;
            }

            return true;
        }

        $scope.resetError = function () {
            $scope.errorNewNom = false;
            $scope.errorNewDir = false;
            $scope.errorNewCuit = false;
            $scope.errorNewDesc = false;
            $scope.errorEditNom = false;
            $scope.errorEditDir = false;
            $scope.errorEditCuit = false;
            $scope.errorEditDesc = false;
            $scope.errorNom = false;
            $scope.errorApe = false;
            $scope.errorTipoDoc = false;
            $scope.errorNumDoc = false;
            $scope.errorTel = false;
            $scope.errorEmail = false;
            $scope.errorClave = false;



        }

        $scope.resetInput = function () {
            $scope.txtNombreNew = '';
            $scope.txtDirNew = '';
            $scope.txtCuitNew = '';
            $scope.txtDescNew = '';
            $scope.nombre = '';
            $scope.apellido = '';
            $scope.tipoDni = '';
            $scope.dni = '';
            $scope.telefono = '';
            $scope.email = '';
            $scope.clave = '';

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




