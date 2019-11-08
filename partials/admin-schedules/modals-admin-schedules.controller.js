(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalSchedulesController', ModalSchedulesController);

        ModalSchedulesController.$inject = ['$uibModalInstance', 'schedule', '$scope','$rootScope','ResourcesService','$filter','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService'];


    function ModalSchedulesController($uibModalInstance, schedule, $scope,$rootScope,ResourcesService,$filter,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService) {
    var vm = $scope;
    vm.hours = [];     
    var scheduleRecorridoId = schedule.RecorridoId;
    vm.getDays = function(){
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
    vm.getDays();
    vm.okSchedulesCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelSchedulesModal = function () {
        schedule.edit = false;
        schedule.delete =false;
        $uibModalInstance.close();
    };  
    vm.addHours = function(hour){
        var hourFormat = $filter('date')(hour, 'HH:mm');
        var index = vm.hours.indexOf(hourFormat)
        if(index == -1 && hourFormat){
            vm.hours.push(hourFormat);            
        }

    };
    vm.deleteHours = function(hour){
        var index = vm.hours.indexOf(hour);
        vm.hours.splice(index, 1);   
    };

    if(schedule.edit){
        vm.scheduleEdit = {};
        vm.scheduleEdit.Id = schedule.Id;
        vm.scheduleEdit.day = {};
        if($rootScope.days){
            vm.scheduleEdit.day = $filter('filter')($rootScope.days, {Id:  schedule.DiaId})[0];
        }
        vm.scheduleEdit.hour ={};
        vm.scheduleEdit.hour = new Date("01-01-2017 " + schedule.HoraSalida + ":00");
        vm.scheduleEdit.RecorridoId = schedule.RecorridoId;
        vm.scheduleEdit.VehiculoId = schedule.VehiculoId;
        vm.scheduleEdit.ChoferId = schedule.ChoferId;
        vm.scheduleEdit.PorcReserva = schedule.PorcReserva;
    }
    if(schedule.delete){
        vm.idSchedule = schedule.Id;
        vm.scheduleDelete = schedule;
        if($rootScope.days){
            vm.scheduleDelete.Dia = $filter('filter')($rootScope.days, {Id:  schedule.DiaId})[0].Nombre;
        }
    }
    vm.setSchedules = function(schedule) {
        vm.dataLoading = true;
        if(vm.hours.length > 0 && schedule.day){
            for (var index = 0; index < vm.hours.length; index++) {
                var data ={
                    DiaId: schedule.day.Id,
                    HoraSalida: vm.hours[index],
                    RecorridoId: scheduleRecorridoId,
                    PorcReserva: 0,
                    VehiculoId:0,
                    ChoferId:0
                }
                saveSchedule(data);
            }
        }
        else{
            SweetAlert.swal ({
                type: "warning", 
                title: "Datos incompletos",
                text: "Verifique los datos",
                confirmButtonAriaLabel: 'Ok',
            });
            vm.dataLoading = false;
        }
     }

    function saveSchedule(data){
        ResourcesSetService.SetHorario(data)
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
                        $rootScope.$emit("refreshListSchedules",scheduleRecorridoId);
                        vm.cancelSchedulesModal();
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
    vm.updateSchedules = function(sheduleEdit){
        vm.dataLoading = true;
        var data ={
            Id: sheduleEdit.Id,
            DiaId: sheduleEdit.day.Id,
            HoraSalida: $filter('date')(sheduleEdit.hour, 'HH:mm'),
            RecorridoId: sheduleEdit.RecorridoId,
            ChoferId: sheduleEdit.ChoferId,
            PorcReserva: sheduleEdit.PorcReserva,
            RecorridoId: sheduleEdit.RecorridoId,
            VehiculoId: sheduleEdit.VehiculoId
        }
        ResourcesUpdateService.UpdateHorario(data)
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
                            $rootScope.$emit("refreshListSchedules",scheduleRecorridoId);
                            vm.cancelSchedulesModal();
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
    vm.deleteSchedules = function(){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteHorario(vm.idSchedule)
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
                        $rootScope.$emit("refreshListSchedules",scheduleRecorridoId);
                        vm.cancelSchedulesModal();
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

}

})();
