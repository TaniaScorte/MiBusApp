(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuyController', BuyController);

        BuyController.$inject = ['$rootScope','$scope'];
    function BuyController($rootScope,$scope) {
        var vm = $scope;
        vm.paramsBuy = $rootScope.paramsBuy;

        initController();

        function initController() {
            //loadCurrentUser();
           // loadAllUsers();
        }

        function loadCurrentUser() {

        }

      /*  function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
*/
        function deleteUser(id) {
                    
        }
    }

})();