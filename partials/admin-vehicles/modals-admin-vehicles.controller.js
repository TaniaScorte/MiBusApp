(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalVehiclesController', ModalVehiclesController);

        ModalVehiclesController.$inject = ['$uibModalInstance', 'vehicle', '$scope','$rootScope','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService','$filter','ResourcesService'];


    function ModalVehiclesController($uibModalInstance, vehicle, $scope,$rootScope,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService,$filter,ResourcesService) {
    var vm = $scope;
    vm.okVehiclesCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelVehiclesModal = function () {
        vehicle.edit = false;
        vehicle.delete =false;
        $uibModalInstance.close();
    };  
    
    vm.updateModelsByBrand = function(brand){
        if(brand){
            ResourcesService.GetModelosByMarca(brand.Id)
            .then(function (response) {
                if (response){                  
                   $rootScope.models = response;
                   if(vehicle.edit){
                    vm.vehicleEdit.model = $filter('filter')($rootScope.models, {Id:  vehicle.ModeloId})[0];
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
        }
        else{
            if(vehicle.create){
                vehicle.model = "";
            }
        }

    }
    if(vehicle.edit){
        vm.vehicleEdit = {};
        vm.vehicleEdit.brand = $filter('filter')($rootScope.brands, {Id:  vehicle.MarcaId})[0],
        vm.updateModelsByBrand(vm.vehicleEdit.brand);
        vm.vehicleEdit.patent = vehicle.Patente;
        vm.vehicleEdit.description = vehicle.Descripcion;
        vm.vehicleEdit.capacity = vehicle.Capacidad;
        vm.vehicleEdit.identification = vehicle.Identificacion;
    }
    if(vehicle.delete){
        vm.idVehicle = vehicle.Id;
        vm.vehicleDelete = vehicle;
    }
    vm.setVehicles = function(vehicle) {
        vm.dataLoading = true;
        var data ={
            Patente: vehicle.patent,
            Capacidad: vehicle.capacity,
            Identificacion: vehicle.identification,
            Descripcion: vehicle.description,
            MarcaId: vehicle.brand.Id,
            ModeloId: vehicle.model.Id,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
        }
        ResourcesSetService.SetVehiculo(data)
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
                        $rootScope.$emit("refreshListVehicles","ok");
                        vm.cancelVehiclesModal();
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
    function clearRegister(){
        vm.user=null;
    }
    vm.updateVehicles = function(vehicleEdit){
        vm.dataLoading = true;
        var data ={
            Patente: vehicleEdit.patent,
            Capacidad: vehicleEdit.capacity,
            Identificacion: vehicleEdit.identification,
            Descripcion: vehicleEdit.description,
            MarcaId: vehicleEdit.brand.Id,
            ModeloId: vehicleEdit.model.Id,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId,
            Id:  vehicle.Id
        }
        ResourcesUpdateService.updateVehiculo(data)
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
                        $rootScope.$emit("refreshListVehicles","ok");
                        vm.cancelVehiclesModal();
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
    vm.deleteVehicles = function(){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteVehiculo(vm.idVehicle)
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
                    $rootScope.$emit("refreshListVehicles","ok");
                    vm.cancelVehiclesModal();
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
            vm.dataLoading = false;
        });
    }

}

})();
