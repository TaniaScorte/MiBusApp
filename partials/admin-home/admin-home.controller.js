(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminHomeController', AdminHomeController);

        AdminHomeController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminHomeController(UserService, $rootScope, $scope) {
        var vm = this;

       

    }


})();