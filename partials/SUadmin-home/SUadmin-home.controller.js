(function () {
    'use strict';

    angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);

        SUAdminHomeController.$inject = ['UserService', '$rootScope', '$scope'];


    function SUAdminHomeController(UserService, $rootScope, $scope) {
        var vm = this;

       

    }


})();