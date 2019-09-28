(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

        AppController.$inject = ['AuthenticationService','$scope' ,'$rootScope','$location'];
    function AppController(AuthenticationService,$scope ,$rootScope,$location) {
        var vm = $rootScope;
        vm.logout = Logout();

        function Logout(){
            AuthenticationService.ClearCredentials();
            $location.path('/login');

        }
    }

})();