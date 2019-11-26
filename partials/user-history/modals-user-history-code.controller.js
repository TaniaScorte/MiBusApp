(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalUserHistoryCodeController', ModalUserHistoryCodeController);

        ModalUserHistoryCodeController.$inject = ['$uibModalInstance', 'record', '$scope','$rootScope','ResourcesService','$filter','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService'];


    function ModalUserHistoryCodeController($uibModalInstance, record, $scope,$rootScope,ResourcesService,$filter,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService) {
    var vm = $scope;
    vm.record = record;
    $scope.codigoqr = "AAS12234";
    vm.ok = function () {
        $uibModalInstance.close();
    };  
    vm.cancelModal = function () {
        $uibModalInstance.close();
    };  
    vm.formatDate = function(date){
        var dateOut = $filter('date')(date, 'dd/MM/yyyy');
        return dateOut;
    };

}

})();
