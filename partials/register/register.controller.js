(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location','$scope' ,'$rootScope','$uibModal','SweetAlert','ResourcesService'];
    function RegisterController(UserService, $location,$scope, $rootScope, $uibModal,SweetAlert,ResourcesService) {
        var vm = $scope;
        vm.register = register;
        getTiposDNI();
        function register (user) {
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
                RolId:1
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
                        window.location.href='#!/login';
                        return;
                       
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

          
        function clearRegister(){
            vm.user=null;
        }
        function openModal(error){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/modals/modal-error.view.html',
                controller: 'ModalMessageCtrl',
                size: 'lg',
                windowClass: 'show',
                resolve: {
                  message: function () {
                    return error;
                  }
                }
              });
        }
    }

})();