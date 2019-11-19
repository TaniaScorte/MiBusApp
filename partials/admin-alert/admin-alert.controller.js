(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('AdminAlertController', AdminAlertController);
        AdminAlertController.$inject = ['UserService', 'SweetAlert', 'ResourcesService', 'ResourcesUpdateService', 'ResourcesDeleteService', 'ResourcesSetService', '$rootScope', '$http', '$filter', '$scope'];
    function AdminAlertController(UserService, SweetAlert, ResourcesService, ResourcesUpdateService, ResourcesDeleteService, ResourcesSetService, $rootScope, $http, $filter, $scope) {
        var vm = this;
        vm.idEtitar = 0;
        vm.idEliminar = 0;


        initController();

        function initController() {
            
        }





        
    }
})();




