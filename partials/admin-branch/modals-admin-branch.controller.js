(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalBranchController', ModalBranchController);

        ModalBranchController.$inject = ['$uibModalInstance', 'ramal', '$scope','$rootScope','ResourcesSetService','SweetAlert','ResourcesUpdateService'];


    function ModalBranchController($uibModalInstance, ramal, $scope,$rootScope,ResourcesSetService,SweetAlert,ResourcesUpdateService) {
    var vm = $scope;
    $scope.okBranchCreate = function () {
        $uibModalInstance.close();
    };  
    $scope.cancelBranchModal = function () {
        $uibModalInstance.close();
    };  
    if(ramal.edit){
        vm.branchEdit = {};
        vm.branchEdit.name = ramal.Nombre;
        vm.branchEdit.description = ramal.Descripcion;
    }
    if(ramal.delete){
        vm.branchDelete = ramal;
    }
    $scope.setBranch = function(ramal) {
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
    $scope.updateBranch = function(ramalEdit){
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
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
    }



}

})();
