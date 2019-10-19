(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService','ResourcesSetService','ResourcesService', '$rootScope', '$scope','$uibModal'];


    function AdminDriversController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService) {
        var vm = $scope;     
        vm.openModalDriverCreate = openModalDriverCreate;
        vm.openModalDriverEdit = openModalDriverEdit;
        vm.openModalDriverDelete = openModalDriverDelete;

        initController();
        
        function initController(){
            
        }
        var swipe = function () {
            $("#swipeDrivers").touchwipe({
                wipeLeft: function () {
                    window.location.replace('#!admin-bus');
                },
                wipeRight: function () {
                    window.location.replace('#!admin-routes');
                },

                min_move_x: 200,
                min_move_y: 200,
                preventDefaultEvents: false
            });
        }
        swipe();
        function registerDriver (user) {
            vm.dataLoading = true;
            var data ={
                Nombre: user.name,
                Apellido: user.surname,
                TipoDni: user.dnitype.Id,
                Dni: user.dni,
                Email: user.email,
                Clave: user.password,
                Telefono: user.tel,
                EmpresaId: 0,
                RolId:2
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
                        clearRegister();
                       
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
        function clearRegister(){
            vm.user=null;
        }

        function openModalDriverCreate(){
            var modalInstanceCreate = $uibModal.open({
                animation:true,
                templateUrl: 'partials/modals/modal-driver-create.view.html',
                controller: 'ModalAdminController',
                size: 'lg',
                windowClass: 'show',
                resolve: {
                  user: function () {
                    return "Hola";
                  }
                }
              });
        }
        function openModalDriverEdit(userEdit){
            var modalInstanceEdit = $uibModal.open({
                animation:true,
                templateUrl: 'partials/modals/modal-driver-edit.view.html',
                controller: 'ModalAdminController',
                size: 'lg',
                windowClass: 'show',
                resolve: {
                  user: function () {
                    return userEdit;
                  }
                }
              });
        }
        function openModalDriverDelete(userDelete){
            var modalInstanceDelete = $uibModal.open({
                animation:true,
                templateUrl: 'partials/modals/modal-driver-delete.view.html',
                controller: 'ModalAdminController',
                size: 'lg',
                windowClass: 'show',
                resolve: {
                  user: function () {
                    return userDelete;
                  }
                }
              });
        }

}


})();