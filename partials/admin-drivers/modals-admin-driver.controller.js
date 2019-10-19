(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalDriverController', ModalDriverController);

        ModalDriverController.$inject = ['$uibModalInstance', 'user', '$scope'];


    function ModalDriverController($uibModalInstance, user, $scope) {
    $scope.user = user;

    $scope.okDriverCreate = function () {
        $uibModalInstance.close();
    };  
    $scope.cancelDriverCreate = function () {
        $uibModalInstance.close();
    };  







}

})();
