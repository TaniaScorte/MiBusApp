(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResetPasswordController', ResetPasswordController);

    RegisterController.$inject = ['UserService', '$location','$scope' ,'$rootScope','$uibModal','SweetAlert','ResourcesService'];
    function ResetPasswordController(UserService, $location,$scope, $rootScope, $uibModal,SweetAlert,ResourcesService) {
        var vm = $scope;
        vm.reset = reset;
        function reset (user) {
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