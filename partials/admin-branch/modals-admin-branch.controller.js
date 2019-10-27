(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalBranchController', ModalBranchController);

        ModalBranchController.$inject = ['$uibModalInstance', 'ramal', '$scope','$rootScope','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService'];


    function ModalBranchController($uibModalInstance, ramal, $scope,$rootScope,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService) {
    var vm = $scope;
    vm.okBranchCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelBranchModal = function () {
        $uibModalInstance.close();
    };  
    if(ramal.edit){
        vm.branchEdit = {};
        vm.branchEdit.name = ramal.Nombre;
        vm.branchEdit.description = ramal.Descripcion;
    }
    if(ramal.delete){
        vm.idRamal = ramal.Id;
        vm.branchDelete = ramal;
    }
    vm.setBranch = function(ramal) {
        vm.dataLoading = true;
        var data ={
            Nombre: ramal.name,
            Descripcion: ramal.description,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
        }
        ResourcesSetService.SetRamal(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El ramal ha sido creado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListBranch","ok");
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
                        text: "Error al crear el ramal",
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
    function clearRegister(){
        vm.user=null;
    }
    vm.updateBranch = function(ramalEdit){
        vm.dataLoading = true;
        var data ={
            Nombre: ramalEdit.name,
            Descripcion: ramalEdit.description,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId,
            Id: ramal.Id
        }
        ResourcesUpdateService.UpdateRamal(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El ramal ha sido creado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListBranch","ok");
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
                        text: "Error al crear el ramal",
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
    vm.deleteBranch = function(ramalDelete){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteRamal(vm.idRamal)
        .then(function (response) {
            if (response == 1){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El item ha sido eliminado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                if (isConfirm) {
                    vm.dataLoading = false;
                    $rootScope.$emit("refreshListBranch","ok");
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
                    text: "Error al eliminar",
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


}

})();
