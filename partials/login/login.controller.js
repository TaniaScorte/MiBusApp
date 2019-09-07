(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
        var vm = this;
        vm.login = function() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response) {
                   // AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                   
                    vm.dataLoading = false;
                }
            });
        };
    }

})();