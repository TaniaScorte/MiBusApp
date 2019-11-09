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
    if(journey.edit){
        vm.journeyEdit = {};
        vm.journeyEdit.Id = journey.Id;
        vm.journeyEdit.route = $filter('filter')($rootScope.route, {Id:  journey.RecorridoId}); 
        vm.journeyEdit.vehicle = $filter('filter')($rootScope.vehicles, {Id:  journey.VehiculoId}); 
        vm.journeyEdit.driver = $filter('filter')($rootScope.drivers, {Id: journey.ChoferId});
        vm.journeyEdit.dt = new Date(journey.Fecha);
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
            FechaAlta: $filter('date')(journeyCreate.dt, 'dd/MM/yyyy'),
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
        var data = {
            Id: journeyEdit.Id,
            EmpresaId: $rootScope.globals.currentUser.userData.EmpresaId,
            RecorridoId: journeyEdit.route.Id,
            ChoferId: journeyEdit.driver.Id,
            VehiculoId: journeyEdit.vehicle.Id,
            HorarioId: journeyEdit.schedulesFilter.Id,
            Descripcion: journeyEdit.description
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
                        $rootScope.$emit("refreshListJourney",journeyRecorridoId);
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
        vm.schedulesFilter = $filter('filter')($rootScope.schedules, {DiaId:  dayNumber});
    }
    vm.today = function() {
        if(journey.edit){
            vm.journeyEdit.dt = new Date();
            vm.updateSchedulesByDay(vm.journeyEdit.dt.getDay());
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
