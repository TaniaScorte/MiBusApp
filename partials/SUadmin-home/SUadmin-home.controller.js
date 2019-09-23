(function () {
    'use strict';

    angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);

    SUAdminHomeController.$inject = ['UserService', '$rootScope', '$scope', '$uibModal'];


    function SUAdminHomeController(UserService, $rootScope, $scope, $uibModal) {
        var vm = this;


        $scope.openEdit = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "partials/SUadmin-home/modal-edit.html",
                controller: "partials/SUadmin-home/modal-edit.controller.js",
                size: '',
            });

            modalInstance.result.then(function (response) {
                $scope.result = `${response} button hitted`;
            });
        };

    }





   





})();