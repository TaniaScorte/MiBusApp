(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$location', 'AuthenticationService','SweetAlert','UserService','$rootScope'];
    function ResetPasswordController($location, AuthenticationService,SweetAlert,UserService,$rootScope) {
        var vm = this;
        vm.showMensaje = false;
        vm.mensaje = '';
        vm.resetPassword = function(){
            vm.dataLoading = true;
            AuthenticationService.ReenvioPassword(vm.email)
                .then(function(response){
                    if(response.Estado == 0){
                        vm.showMensaje = true;
                        vm.mensaje = 'Se ha enviado el codigo a su casilla de correo electronico verifique';
                    }
                })
                .catch(function(error){
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                    vm.showMensaje = false;
                });    
        }
    }

})();