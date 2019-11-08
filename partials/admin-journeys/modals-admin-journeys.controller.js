(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalJourneysController', ModalJourneysController);

        ModalJourneysController.$inject = ['$uibModalInstance', 'journey', '$scope','$rootScope','ResourcesService','$filter','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService'];


    function ModalJourneysController($uibModalInstance, journey, $scope,$rootScope,ResourcesService,$filter,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService) {
    var vm = $scope;
    vm.hours = [];     
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
        vm.journeyEdit.RecorridoId = journey.RecorridoId;
        vm.journeyEdit.VehiculoId = journey.VehiculoId;
        vm.journeyEdit.ChoferId = journey.ChoferId;
    }
    if(journey.delete){
        vm.idJourney = journey.Id;
        vm.journeyDelete = journey;
    }
    vm.setJourneys = function(journey) {
        vm.dataLoading = true;
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
        var data ={
            Id: journeyEdit.Id,
            RecorridoId: journeyEdit.RecorridoId,
            ChoferId: journeyEdit.ChoferId,
            RecorridoId: journeyEdit.RecorridoId,
            VehiculoId: journeyEdit.VehiculoId,
            Descripcion: journeyEdit.description,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
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

}

})();
