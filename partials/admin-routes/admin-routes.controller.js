(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminRoutesController', AdminRoutesController);

        AdminRoutesController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminRoutesController(UserService, $rootScope, $scope) {
        var vm = this;

       

    }


})();