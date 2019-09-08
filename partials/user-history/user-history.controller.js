(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserHistoryController', UserHistoryController);

        UserHistoryController.$inject = ['UserService', '$rootScope'];
    function UserHistoryController(UserService, $rootScope) {
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