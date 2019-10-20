(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalDriverController', ModalDriverController);

        ModalDriverController.$inject = ['$uibModalInstance', 'user', '$scope','UserService','SweetAlert','$filter','$rootScope'];


    function ModalDriverController($uibModalInstance, user, $scope,UserService,SweetAlert,$filter,$rootScope) {
        var vm = $scope;
        vm.registerDriver = registerDriver;
        vm.updateDriver = updateDriver;
        vm.deleteDriver = deleteDriver;
    if(user.edit){
        loadEditUser(user);
    }
    if(user.delete){
        vm.userDelete = user;
    }
    vm.okDriverCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelDriverModal = function () {
        $uibModalInstance.close();
    };  
    function loadEditUser(user) {
        vm.userEdit = {};
        vm.userEdit.tel = Number(user.Telefono);
        vm.userEdit.name = user.Nombre;
        vm.userEdit.surname = user.Apellido;
        vm.userEdit.dnitype =$filter('filter')($rootScope.dnitypes, {Id: user.TipoDni})[0];
        vm.userEdit.password = user.Clave;
        vm.userEdit.dni = user.Dni;
        vm.userEdit.email= user.Email;
    }
    function updateDriver(userEdit){
        vm.dataLoading = true;
        var data ={
            Nombre: userEdit.name,
            Apellido: userEdit.surname,
            TipoDni: userEdit.dnitype.Id,
            Dni: userEdit.dni,
            Email: userEdit.email,
            Telefono: userEdit.tel,
            EmpresaId: user.EmpresaId,
            RolId: user.RolId
        }
        UserService.Update(data)
        .then(function (response) {
            if (response.Estado == 0){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El usuario ha sido actualizado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                  if (isConfirm) {
                    $rootScope.getUserDrivers();
                    vm.dataLoading = false;
                    $uibModalInstance.close();
                  } 
                });               
                return;
            } 
            if(response.Estado == 50){
                SweetAlert.swal ({
                    type: "warning", 
                    title: "Verifique!",
                    text: response.Mensaje + " verifique su e-mail",
                    confirmButtonAriaLabel: 'Ok',
                });
                vm.dataLoading = false;
                return;
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
            vm.dataLoading = false;
        });
    }
    function registerDriver (userCreate) {
        vm.dataLoading = true;
        var data ={
            Nombre: userCreate.name,
            Apellido: userCreate.surname,
            TipoDni: userCreate.dnitype.Id,
            Dni: userCreate.dni,
            Email: userCreate.email,
            Clave: userCreate.password,
            Telefono: userCreate.tel,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId,
            RolId:2,
        }
        UserService.Create(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El usuario ha sido creado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                      if (isConfirm) {
                        vm.dataLoading = false;
                        $uibModalInstance.close();
                      } 
                    });               
                    return;
                } 
                if(response.Estado == 50){
                    SweetAlert.swal ({
                        type: "warning", 
                        title: "Verifique!",
                        text: response.Mensaje + " verifique",
                        confirmButtonAriaLabel: 'Ok',
                    });
                    vm.dataLoading = false;
                    return;
                }
                else {
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: "Error al crear el usuario",
                        confirmButtonAriaLabel: 'Ok',
                    });
                    vm.dataLoading = false;
                }
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
                vm.dataLoading = false;
            });
     }
    function deleteDriver(){
        vm.dataLoading = true;
        UserService.Delete(user.Id)
        .then(function (response) {
            if (response.data == 1){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El usuario ha sido eliminado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                  if (isConfirm) {
                    vm.dataLoading = false;
                    $rootScope.$emit("refreshListDrivers","ok"); 
                    $uibModalInstance.close();
                  } 
                });               
                return;
               
            } 
            if(response.Estado == 50){
                SweetAlert.swal ({
                    type: "warning", 
                    title: "Verifique!",
                    text: response.Mensaje + " verifique el usuario",
                    confirmButtonAriaLabel: 'Ok',
                });
                vm.dataLoading = false;
                return;
            }
            else {
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: "Error al eliminar el usuario",
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
            vm.dataLoading = false;
        });
    }
    function clearRegister(){
        vm.user=null;
        vm.userEdit = null;
        vm.userCreate = null;
    }


}

})();
