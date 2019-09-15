(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService','SweetAlert'];
    function LoginController($location, AuthenticationService,SweetAlert) {
        var vm = this;
        vm.login = function() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.user)
            .then(function (response) {
                if (response){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "ssss",
                        confirmButtonAriaLabel: 'Ok',
                    });
                   
                } else {
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
        };
    }

})();