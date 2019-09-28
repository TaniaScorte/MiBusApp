(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

        AppController.$inject = ['AuthenticationService','$scope' ,'$rootScope','$location'];
    function AppController(AuthenticationService,$scope ,$rootScope,$location) {
        var vm = $rootScope;

        $rootScope.logout = function(){
            AuthenticationService.Logout($rootScope.user.Id, $rootScope.globals.currentUser.token)
            .then(function (response) {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
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