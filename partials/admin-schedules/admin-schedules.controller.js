(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminSchedulesController', AdminSchedulesController);

        AdminSchedulesController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminSchedulesController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalSchedulesCreate = openModalSchedulesCreate;
        vm.openModalSchedulesEdit = openModalSchedulesEdit;
        vm.openModalSchedulesDelete = openModalSchedulesDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            vm.routeOk = false;
            getDays();
            getRamalesByEmpresa();
        }

        $rootScope.$on("refreshListSchedules", function(evt,recorridoId){ 
            getHorariosByRecorrido(recorridoId);
        });
        vm.updateRecorridosByRamal = function(ramalId){
            if (ramalId != undefined) {
                $rootScope.routes = null;
                ResourcesService.GetRecorridosByEmpresaRamal(ramalId,$rootScope.globals.currentUser.userData.EmpresaId)
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
        vm.selectedRoute= function(){
            if(vm.schedule.route){
                vm.routeOK=true;
                getHorariosByRecorrido(vm.schedule.route.Id);     
             }
             else{
                vm.routeOK=false;   
             }
        }
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalSchedulesCreate(){
            var scheduleCreate = {};
            scheduleCreate.RecorridoId = vm.schedule.route.Id;
            scheduleCreate.create = true;
            scheduleCreate.edit = false;
            scheduleCreate.delete = false;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-schedules/modal-schedules-create.view.html',
                controller: 'ModalSchedulesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  schedule: function () {
                    return scheduleCreate;
                  }
                }
              });
        }
        function openModalSchedulesEdit(scheduleEdit){
            scheduleEdit.RecorridoId = vm.schedule.route.Id;
            scheduleEdit.edit=true;
            scheduleEdit.create = false;
            scheduleEdit.delete=false;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-schedules/modal-schedules-edit.view.html',
                controller: 'ModalSchedulesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                    schedule: function () {
                    return scheduleEdit;
                  }
                }
              });
        }
        function openModalSchedulesDelete(scheduleDelete){
            scheduleDelete.RecorridoId = vm.schedule.route.Id;
            scheduleDelete.delete = true;
            scheduleDelete.create = false;
            scheduleDelete.edit = false;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-schedules/modal-schedules-delete.view.html',
                controller: 'ModalSchedulesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                    schedule: function () {
                    return scheduleDelete;
                  }
                }
              });
        }
        function getRecorridosByEmpresa(){
            ResourcesService.GetRecorridosByEmpresa($rootScope.globals.currentUser.userData.EmpresaId)
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
        function getHorariosByRecorrido(recorridoId){
            ResourcesService.GetHorariosByRecorrido(recorridoId)
            .then(function (response) {
                if (response){                  
                   $rootScope.schedules = response;  
                   for(var x = 0 ; x < $rootScope.schedules.length ; x++){
                    $rootScope.schedules[x].Dia = $filter('filter')($rootScope.days, {Id:  $rootScope.schedules[x].DiaId})[0].Nombre;
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
        function getDays(){
            ResourcesService.GetDias()
            .then(function (response) {
                if (response){                  
                   $rootScope.days = response;     
                   if(vm.scheduleEdit){
                    vm.scheduleEdit.day = $filter('filter')($rootScope.days, {Id:  schedule.DiaId})[0];
                   }
                   if(vm.scheduleDelete){
                    vm.scheduleDelete.Dia = $filter('filter')($rootScope.days, {Id:  schedule.DiaId})[0].Nombre;
                   }
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
        };
        function getRamalesByEmpresa(){
            ResourcesService.GetRamalesByEmpresa( $rootScope.globals.currentUser.userData.EmpresaId)
            .then(function (response) {
                if (response){
                   $rootScope.ramales = response;          
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