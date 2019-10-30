(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminBusStopsController', AdminBusStopsController);

        AdminBusStopsController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminBusStopsController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalBusStopsCreate = openModalBusStopsCreate;
        vm.openModalBusStopsEdit = openModalBusStopsEdit;
        vm.openModalBusStopsDelete = openModalBusStopsDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            vm.routeOk = false;
            getRecorridosByEmpresa();
        }

        $rootScope.$on("refreshListBusStops", function(evt,recorridoId){ 
            getParadasByRecorrido(recorridoId);
        });
        vm.selectedRoute= function(){
            getParadasByRecorrido(vm.busstop.route.Id);
        }
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
        function getParadasByRecorrido(recorridoId){
            ResourcesService.GetParadasByRecorrido(recorridoId)
            .then(function (response) {
                if (response){                  
                   $rootScope.busstops = response;  
                   for(var x = 0 ; x < $rootScope.routes.length ; x++){
                       $rootScope.busstops[x].RecorridoDescripcion = $filter('filter')($rootScope.routes, {Id:  $rootScope.busstop[x].RecorridoId})[0].Nombre;
                   }   
                   vm.routeOK=true;       
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