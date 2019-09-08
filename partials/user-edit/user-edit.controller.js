(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserEditController', UserEditController);

        UserEditController.$inject = ['UserService', '$rootScope'];
    function UserEditController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {

        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
                    
        }
    }

})();