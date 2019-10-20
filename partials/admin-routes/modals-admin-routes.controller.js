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
            Nombre: user.name,
            Apellido: user.surname,
            TipoDni: user.dnitype.Id,
            Dni: user.dni,
            Email: user.email,
            Clave: user.password,
            Telefono: user.tel,
            EmpresaId:  $rootScope.globals.currentUser.userData.empresaId,
            RolId:2,
        }
        ResourcesSetService.SetHorario(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El recorrido ha sido creado",
                        confirmButtonAriaLabel: 'Ok',
                    });
                   
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




}

})();
