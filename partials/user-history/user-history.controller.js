(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserHistoryController', UserHistoryController);

        UserHistoryController.$inject = ['UserService','$location', '$rootScope','$scope','ResourcesService','SweetAlert','$uibModal'];
    function UserHistoryController(UserService,$location, $rootScope,$scope,ResourcesService,SweetAlert,$uibModal) {
        var vm = $scope;
        vm.openModalViewCode = openModalViewCode;
        initController();
        $rootScope.stopTimer();
        function initController() {
           getHistorial();
        }
        vm.formatDate = function(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function getHistorial(){
            ResourcesService.GetHistorial($rootScope.globals.currentUser.userData.Id)
            .then(function (response) {
                if (response){
                   $rootScope.records = response;          
                } 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
        }
        function openModalViewCode(record){
            record.qr = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/user-history/modal-user-history-code.view.html',
                controller: 'ModalUserHistoryCodeController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  record: function () {
                    return record;
                  }
                }
              });
        }
    }

})();