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
                        $rootScope.$emit("refreshListRoutes","ok");
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
        ResourcesUpdateService.UpdateRecorrido(data)
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
                        $rootScope.$emit("refreshListRoutes","ok");
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
    vm.deleteRoutes = function(routesDelete){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteRecorrido(vm.idRoute)
        .then(function (response) {
            if (response == 1){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El item ha sido eliminado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                if (isConfirm) {
                    vm.dataLoading = false;
                    $rootScope.$emit("refreshListRoutes","ok");
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
                    text: "Error al eliminar",
                    confirmButtonAriaLabel: 'Ok',
                });
            }
        })
        .catch(function(error){
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
