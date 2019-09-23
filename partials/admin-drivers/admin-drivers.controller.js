(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminDriversController(UserService, $rootScope, $scope) {
        var vm = this;

       

    }


})();