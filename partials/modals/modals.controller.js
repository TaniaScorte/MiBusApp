(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalAdminController', ModalAdminController);

        ModalAdminController.$inject = ['$uibModalInstance', 'user', '$scope'];


    function ModalAdminController($uibModalInstance, user, $scope) {
    $scope.user = user;

    $scope.okDriverCreate = function () {
        $uibModalInstance.close();
    };  
    $scope.cancelDriverCreate = function () {
        $uibModalInstance.close();
    };  







}

})();
