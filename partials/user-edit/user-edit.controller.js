(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserEditController', UserEditController);

        UserEditController.$inject = ['UserService','$location', '$rootScope','$scope','ResourcesService','$filter','SweetAlert'];
    function UserEditController(UserService, $location,$rootScope,$scope,ResourcesService,$filter,SweetAlert) {
        var vm = $scope;
        initController();
        $rootScope.stopTimer();
        function initController() {
            if(!$rootScope.dnitypes){
                ResourcesService.GetTiposDNI()
                .then(function (response) {
                    if (response){
                        $rootScope.dnitypes = response;  
                        loadEditUser(vm.$parent.user);        
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
            else{
                loadEditUser(vm.$parent.user);
            }
            
        }

        function loadEditUser(user) {
            vm.userEdit = {};
            vm.userEdit.tel = user.Telefono;
            vm.userEdit.RolId = user.RolId;
            vm.userEdit.name = user.Nombre;
            vm.userEdit.surname = user.Apellido;
            vm.userEdit.dnitype =$filter('filter')($rootScope.dnitypes, {Id: user.TipoDni})[0];
            vm.userEdit.dni = user.Dni;
            vm.userEdit.email= user.Email;
            vm.userEdit.password = user.Clave;
            vm.userEdit.tel= Number(user.Telefono);
        }
        vm.updateUser = function (userEdit) {
            if(validarUserPassword(userEdit.password,userEdit.confirmPassword)){
                var data ={
                    Id: vm.$parent.user.Id,
                    Nombre: userEdit.name,
                    Apellido: userEdit.surname,
                    TipoDni: userEdit.dnitype.Id,
                    Dni: userEdit.dni,
                    Email: userEdit.email,
                    Clave: userEdit.password,
                    Telefono: userEdit.tel,
                    EmpresaId: vm.$parent.user.EmpresaId,
                    RolId:vm.$parent.user.RolId
                }          
                UserService.Update(data)
                .then(function (response) {
                    if (response.Estado == 0){
                        SweetAlert.swal ({
                            type: "success", 
                            title: "La operacion se ha realizado con exito",
                            text: "El usuario ha sido actualizado",
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
                            text: "Error al actualizar el usuario",
                            confirmButtonAriaLabel: 'Ok',
                        });
                    }
                })
                .catch(function(error){
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });  
            }
        }
        function validarUserPassword(pass, confirm){
            if(pass==null || pass==undefined || confirm == "" || confirm==undefined || confirm== ""){
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "warning", 
                    title: "Confirme la clave",
                    text: "Verifique que los campos esten correctos",
                    confirmButtonAriaLabel: 'Ok',
                });
                return false;
            }
            if(!(pass === confirm)){
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "warning", 
                    title: "Confirme el password",
                    text: "Verifique que los campos esten correctos",
                    confirmButtonAriaLabel: 'Ok',
                });
                return false;
            }
            else{
                return true;
            }
        }
    }

})();