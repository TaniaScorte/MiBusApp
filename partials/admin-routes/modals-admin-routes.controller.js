(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalRoutesController', ModalRoutesController);

        ModalRoutesController.$inject = ['$uibModalInstance', 'route', '$scope','$rootScope','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService','$filter'];


    function ModalRoutesController($uibModalInstance, route, $scope,$rootScope,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService,$filter) {
    var vm = $scope;
    vm.okRoutesCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelRoutesModal = function () {
        $uibModalInstance.close();
    };  
    if(route.create){
        vm.route = {};
        vm.route.ramal = $filter('filter')($rootScope.ramales, {Id:  route.branch.Id})[0];
    }
    if(route.edit){
        vm.routeEdit = {};
        vm.routeEdit.ramal = $filter('filter')($rootScope.ramales, {Id:  route.RamalId})[0],
        vm.routeEdit.name = route.Nombre;
        vm.routeEdit.description = route.Descripcion;
        vm.routeEdit.amount = route.Importe;
        vm.routeEdit.duration = route.Duracion;
    }
    if(route.delete){
        vm.idRoute = route.Id;
        vm.routeDelete = route;
    }
    function validateDataRequired(data) {
        if(route.edit){
            if(data.Id
                && data.Nombre && data.Nombre.length <= 30
                && data.Descripcion && data.Descripcion.length <= 60
                && data.RamalId && data.EmpresaId
                && data.Importe && data.Importe <= 9999
                && data.Duracion && data.Duracion.length <= 9
            ){
                return true;    
            }            
        }
        if(route.create){
            if(data.Nombre && data.Nombre.length <= 30
                && data.Descripcion && data.Descripcion.length <= 60
                && data.RamalId && data.EmpresaId
                && data.Importe && data.Importe <= 9999
                && data.Duracion && data.Duracion.length <= 9
            ){
                return true;    
            }            
        }
        else{
            return false;
        }
    }
    vm.setRoutes = function(route) {
        vm.dataLoading = true;
        var data ={
            Nombre: route.name,
            Descripcion: route.description,
            Duracion: route.duration,
            RamalId: route.ramal.Id,
            Importe:route.amount,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
        }
        if(validateDataRequired(data)){
            ResourcesSetService.SetRecorrido(data)
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
                            $rootScope.$emit("refreshListRoutes",vm.route.ramal.Id);
                            $uibModalInstance.close();
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
        else{
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "warning", 
                title: "Verifique",
                text: "Los datos ingresados son incorrectos o incompletos",
                confirmButtonAriaLabel: 'Ok',
            });
        }
    }
    function clearRegister(){
        vm.user=null;
    }
    vm.updateRoutes = function(routeEdit){
        vm.dataLoading = true;
        var data ={
            Nombre: routeEdit.name,
            Descripcion: routeEdit.description,
            Duracion: routeEdit.duration,
            RamalId: routeEdit.ramal.Id,
            Importe:routeEdit.amount,
            EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId,
            Id: route.Id
        }
        if(validateDataRequired(data)){
            ResourcesUpdateService.UpdateRecorrido(data)
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
                            $rootScope.$emit("refreshListRoutes",routeEdit.ramal.Id);
                            $uibModalInstance.close();
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
        else{
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "warning", 
                title: "Verifique",
                text: "Los datos ingresados son incorrectos o incompletos",
                confirmButtonAriaLabel: 'Ok',
            });
        }
    }
    vm.deleteRoutes = function(routeDelete){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteRecorrido(vm.idRoute)
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
                    $rootScope.$emit("refreshListRoutes",routeDelete.RamalId);
                    $uibModalInstance.close();
                } 
                });               
                return;                
            } 
            else {
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: response.Mensaje,
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
