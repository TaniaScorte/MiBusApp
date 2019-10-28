(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminBusStopsController', AdminBusStopsController);

        AdminBusStopsController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert'];


    function AdminBusStopsController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert) {
        var vm = $scope;     
        vm.openModalBusStopsCreate = openModalBusStopsCreate;
        vm.openModalBusStopsEdit = openModalBusStopsEdit;
        vm.openModalBusStopsDelete = openModalBusStopsDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            getRecorridosByEmpresa();
            getParadasByEmpresa();
        }

        $rootScope.$on("refreshListBusStop", function(evt,data){ 
            getRamalesByEmpresa();
        });

        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalBusStopsCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-bus-stop/modal-bus-stop-create.view.html',
                controller: 'ModalBusStopController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  busStop: function () {
                    return "Create";
                  }
                }
              });
        }
        function openModalBusStopsEdit(busStopEdit){
            busStopEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-bus-stop/modal-bus-stop-edit.view.html',
                controller: 'ModalBusStopController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  busStop: function () {
                    return busStopEdit;
                  }
                }
              });
        }
        function openModalBusStopsDelete(busStopDelete){
            busStopDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-bus-stop/modal-bus-stop-delete.view.html',
                controller: 'ModalBusStopController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                    busStop: function () {
                    return busStopDelete;
                  }
                }
              });
        }
        function getRecorridosByEmpresa(){
            ResourcesService.GetRecorridosByEmpresa()
            .then(function (response) {
                if (response){                  
                   $rootScope.routes = response;         
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
        function getParadasByEmpresa(){
            ResourcesService.GetRecorridosByEmpresa()
            .then(function (response) {
                if (response){                  
                   $rootScope.routes = response;         
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

}


})();