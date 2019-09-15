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
            UserService.Create(user)
                .then(function (response) {
                    if (response){
                        SweetAlert.swal ({
                            type: "success", 
                            title: "La operacion se ha realizado con exito",
                            text: "ssss",
                            confirmButtonAriaLabel: 'Ok',
                        });
                       
                    } else {
                        //FlashService.Error(response.message);
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
                });
         }
         function getTiposDNI(){
            ResourcesService.GetTiposDNI()
            .then(function (response) {
                if (response){
                   vm.dnitypes = response.data;          
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

          vm.empresas=[
            {name : "Empresa A"},
            {name : "Empresa B"},
            {name : "Empresa C"}
          ];
          
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