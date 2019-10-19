(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService', '$rootScope', '$scope','$uibModal'];


    function AdminDriversController(UserService, $rootScope, $scope,$uibModal) {
        var vm = $scope;     
        vm.openModalDriverCreate = openModalDriverCreate;
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
        $scope.okDriverCreate = function () {
            modalInstanceCreate.close();
          };  
          $scope.cancelDriverCreate = function () {
            modalInstanceCreate.close();
          };  
        function openModalDriverCreate(){
            var modalInstanceCreate = $uibModal.open({
                animation:true,
                templateUrl: 'modalCreateDriver.view.html',
                controller: 'AdminDriversController',
                size: 'lg',
                windowClass: 'show',
                resolve: {
                  message: function () {
                    return "Hola";
                  }
                }
              });
        }


}


})();