(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminVehiclesController', AdminVehiclesController);

        AdminVehiclesController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminVehiclesController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalVehiclesCreate = openModalVehiclesCreate;
        vm.openModalVehiclesEdit = openModalVehiclesEdit;
        vm.openModalVehiclesDelete = openModalVehiclesDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        initController();        
        function initController(){
            getVehiculosByEmpresa();           
        }

        var swipe = function () {
            $("#swipeBus").touchwipe({
                wipeLeft: function () {
                    window.location.replace('#!admin-home');
                },
                wipeRight: function () {
                    window.location.replace('#!admin-drivers');
                },
    
                min_move_x: 200,
                min_move_y: 200,
                preventDefaultEvents: false
            });
        }
        swipe();

        $rootScope.$on("refreshListVehicles", function(evt,data){ 
            getVehiculosByEmpresa();
        });
        function getVehiculosByEmpresa(){
            ResourcesService.GetVehiculosByEmpresa()
            .then(function (response) {
                if (response){                  
                   $rootScope.vehicles = response;        
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
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalVehiclesCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-vehicles/modal-vehicles-create.view.html',
                controller: 'ModalVehiclesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  vehicle: function () {
                    return "Create";
                  }
                }
              });
        }
        function openModalVehiclesEdit(vehicleEdit){
            vehicleEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-vehicles/modal-vehicles-edit.view.html',
                controller: 'ModalVehiclesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  vehicle: function () {
                    return vehicleEdit;
                  }
                }
              });
        }
        function openModalVehiclesDelete(vehicleDelete){
            vehicleDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-vehicles/modal-vehicles-delete.view.html',
                controller: 'ModalVehiclesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  vehicle: function () {
                    return vehicleDelete;
                  }
                }
              });
        }

}


})();