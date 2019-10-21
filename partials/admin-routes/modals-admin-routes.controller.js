(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalRoutesController', ModalRoutesController);

        ModalRoutesController.$inject = ['$uibModalInstance', 'recorrido', '$scope','ResourcesSetService','SweetAlert'];


    function ModalRoutesController($uibModalInstance, recorrido, $scope,ResourcesSetService,SweetAlert) {
    $scope.recorrido = recorrido;

    $scope.okRoutesCreate = function () {
        $uibModalInstance.close();
    };  
    $scope.cancelRoutesModal = function () {
        $uibModalInstance.close();
    };  

    function setRecorrido (recorrido) {
        vm.dataLoading = true;
        var data ={
            Nombre: recorrido.name,
            Descripcion: recorrido.descripcion,
            Duracion: recorrido.duracion,
            RamalId: recorrido.ramal.Id,
            Importe:0,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
        }
        ResourcesSetService.SetRecorrido(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El recorrido ha sido creado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListRecorridos","ok");
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
                        text: "Error al crear el recorrido",
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




}

})();
