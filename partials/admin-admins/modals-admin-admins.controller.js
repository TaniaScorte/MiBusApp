(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalAdminController', ModalAdminController);

        ModalAdminController.$inject = ['$uibModalInstance', 'user', '$scope','UserService','SweetAlert','$filter','$rootScope'];


    function ModalAdminController($uibModalInstance, user, $scope,UserService,SweetAlert,$filter,$rootScope) {
        var vm = $scope;
        vm.registerAdmin = registerAdmin;
        vm.updateAdmin = updateAdmin;
        vm.deleteAdmin = deleteAdmin;
        if(user.edit){
            vm.idUser = user.Id;
            loadEditUser(user);
        }
        if(user.delete){
            vm.idUser = user.Id;
            vm.userDelete = user;
        }
        vm.okAdminCreate = function () {
            $uibModalInstance.close();
        };  
        vm.cancelAdminModal = function () {
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
        function updateAdmin(userEdit){
            vm.dataLoading = true;
            var data ={
                Nombre: userEdit.name,
                Apellido: userEdit.surname,
                TipoDni: userEdit.dnitype.Id,
                Dni: userEdit.dni,
                Email: userEdit.email,
                Telefono: userEdit.tel,
                EmpresaId: user.EmpresaId,
                RolId: user.RolId,
                Id:vm.idUser,
                Clave: user.Clave
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
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListAdmins","ok");
                        $uibModalInstance.close();
                    } 
                    });               
                    return;
                } 
                else {
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: "Error al actualizar el usuario",
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
        function registerAdmin (userCreate) {
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
                RolId:3,
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
                            $rootScope.$emit("refreshListAdmins","ok");
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
        function deleteAdmin(){
            vm.dataLoading = true;
            UserService.Delete(vm.idUser)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El usuario ha sido eliminado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListAdmins","ok");
                        $uibModalInstance.close();
                    } 
                    });               
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
