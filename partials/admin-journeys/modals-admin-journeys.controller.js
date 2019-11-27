(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalJourneysController', ModalJourneysController);

        ModalJourneysController.$inject = ['$uibModalInstance', 'journey', '$scope','$rootScope','ResourcesService','$filter','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService'];


    function ModalJourneysController($uibModalInstance, journey, $scope,$rootScope,ResourcesService,$filter,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService) {
    var vm = $scope;
    vm.hours = [];     
    vm.journey = {};
    var journeyRecorridoId = journey.RecorridoId;

    vm.okJourneysCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelJourneysModal = function () {
        journey.edit = false;
        journey.delete =false;
        $uibModalInstance.close();
    };  
    if(journey.create){
       vm.driversJourney= journey.drivers;
       vm.schedulesJourney = journey.schedules;
    }
    if(journey.edit){
        vm.schedulesJourney = journey.schedules;
        vm.driversJourney = journey.drivers;
        vm.initEdit = true;
        vm.journeyEdit = {};
        vm.journeyEdit.Id = journey.Id;
        vm.journeyEdit.EstadoId = journey.EstadoId
        vm.journeyEdit.description = journey.Descripcion;
        vm.journeyEdit.route = $filter('filter')($rootScope.routes, {Id:  journey.RecorridoId})[0]; 
        vm.journeyEdit.vehicle = $filter('filter')($rootScope.vehicles, {Id:  journey.VehiculoId})[0]; 
        vm.journeyEdit.driver = $filter('filter')(vm.driversJourney , {Id: journey.ChoferId})[0];
        vm.journeyEdit.schedule = $filter('filter')(vm.schedulesJourney, {Id: journey.HorarioId})[0];
        vm.dateJourney = $filter('date')($rootScope.formatDate(journey.FechaViaje), 'dd-MM-yyyy');
    }
    if(journey.delete){
        vm.idJourney = journey.Id;
        vm.journeyDelete = journey;
    }
    vm.setJourneys = function(journeyCreate) {
        vm.dataLoading = true;
        var data = {
            EmpresaId: $rootScope.globals.currentUser.userData.EmpresaId,
            RecorridoId: journeyRecorridoId,
            ChoferId: journeyCreate.driver.Id,
            VehiculoId: journeyCreate.vehicle.Id,
            HorarioId: journeyCreate.schedule.Id,
            Descripcion: journeyCreate.description,
            FechaViaje: journeyCreate.dt,
            EstadoId:0
        }
        ResourcesSetService.SetViaje(data)
        .then(function (response) {
            if (response.Estado == 0){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El item ha sido creado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListJourneys",journeyRecorridoId);
                        vm.cancelJourneysModal();
                    } 
                });               
                return;
            } 
            else {
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: "Error al crear el item",
                    confirmButtonAriaLabel: 'Ok',
                });
            }
        })
        .catch(function(error){
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "error", 
                title: "Error",
                text: error,
                confirmButtonAriaLabel: 'Ok',
            });
        });
    }

    vm.updateJourneys = function(journeyEdit){
        vm.dataLoading = true;
        var fechaViaje = $filter('date')(journeyEdit.dateJourney, 'dd-MM-yyyy');
        var date;
        if(fechaViaje){
            date = fechaViaje;
        }
        else{
            date = $filter('date')($rootScope.formatDate(journey.FechaViaje), 'dd-MM-yyyy');
        }
        var data = {
            Id: journeyEdit.Id,
            EmpresaId: $rootScope.globals.currentUser.userData.EmpresaId,
            RecorridoId: journeyEdit.route.Id,
            ChoferId: journeyEdit.driver.Id,
            VehiculoId: journeyEdit.vehicle.Id,
            HorarioId: journeyEdit.schedule.Id,
            Descripcion: journeyEdit.description,
            EstadoId :journeyEdit.EstadoId,
            FechaViaje: date
        }
        ResourcesUpdateService.UpdateViaje(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El item ha sido actualizado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            vm.dataLoading = false;
                            $rootScope.$emit("refreshListJourneys",journeyRecorridoId);
                            vm.cancelJourneysModal();
                        } 
                    });               
                    return;
                } 
                else {
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: "Error al crear el item",
                        confirmButtonAriaLabel: 'Ok',
                    });
                }
            })
            .catch(function(error){
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
    }
    vm.deleteJourneys = function(){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteViaje(vm.idJourney)
        .then(function (response) {
            if (response.Estado == 0){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El item ha sido eliminado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListJourneys",journeyRecorridoId);
                        vm.cancelJourneysModal();
                    } 
                });               
                return;                
            } 
            else {
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: "Error al eliminar",
                    confirmButtonAriaLabel: 'Ok',
                });
            }
        })
        .catch(function(error){
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "error", 
                title: "Error",
                text: error,
                confirmButtonAriaLabel: 'Ok',
            });
        });
    }
    vm.updateSchedulesByDay = function(dayNumber) {
        vm.schedulesFilter = $filter('filter')(vm.schedulesJourney, {DiaId:  dayNumber});
        if(vm.schedulesFilter == null || vm.schedulesFilter == undefined || vm.schedulesFilter.length == 0 && !vm.initEdit){
            SweetAlert.swal ({
                type: "warning", 
                title: "No hay horarios",
                text: "Verifique el dia",
                confirmButtonAriaLabel: 'Ok',
            });
        }
        vm.initEdit = false;
    }
    vm.todayDate = new Date();
    vm.today = function() {
        if(journey.edit){
            vm.journeyEdit.dt = new Date();
            return;
        }
        if(journey.create){
            vm.journey.dt = new Date();
            vm.updateSchedulesByDay(vm.journey.dt.getDay());
        }
    };


    vm.clear = function() {
        vm.journey.dt = null;
        vm.journeyEdit = null;
    };
    
    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
     };
    
      // Disable weekend selection
      function disabled(data) {
        var date = data.date;
        var  mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }
    
    $scope.toggleMin = function() {
        $scope.options.minDate = new Date();
    };
    
    vm.setDate = function(year, month, day) {
        if(journey.edit){
            $scope.journeyEdit.dt = new Date(year, month, day);
            vm.updateSchedulesByDay($scope.journeyEdit.dt.getDay());
        }
        if(journey.create){
            $scope.journey.dt = new Date(year, month, day);
            vm.updateSchedulesByDay($scope.journey.dt.getDay());
        }
    };
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
      ];
    
    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);
    
          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
    
            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }    
        return '';
    }
    $scope.toggleMin();
    $scope.today();
    vm.formatDate = function(date){
        var dateOut = $filter('date')(date, 'dd/MM/yyyy');
        return dateOut;
    };
    vm.formatNumberDate = function(dateNumber) {
        return $filter('filter')($rootScope.days, {Id:  dateNumber})[0].Nombre;
    }
}

})();
