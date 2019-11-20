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
            getRamalByEmpresa($rootScope.globals.currentUser.userData.EmpresaId)
        }

        $rootScope.$on("refreshListBusStops", function(evt,recorridoId){ 
            getParadasByRecorrido(recorridoId);
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
            if(vm.busstop.route){
                getParadasByRecorrido(vm.busstop.route.Id);     
             }
             else{
                vm.routeOK=false;   
             }
        }
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalBusStopsCreate(){
            var busStopCreate = {};
            busStopCreate.RecorridoId = vm.busstop.route.Id;
            busStopCreate.create = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-bus-stop/modal-bus-stop-create.view.html',
                controller: 'ModalBusStopController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  busStop: function () {
                    return busStopCreate;
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
        function getParadasByRecorrido(recorridoId) {
            $scope.busstops = []; 
            $scope.filtroBusstops = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetParadasByRecorrido(recorridoId)
                .then(function (response) {
                        if (response) {
                            if (response) {
                                $scope.busstops = response;
                                $rootScope.busstops = response;          //por las dudas que lo use en otro lado
                                for(var x = 0 ; x < $rootScope.busstops.length ; x++){
                                    $rootScope.busstops[x].RecorridoDescripcion = $filter('filter')($rootScope.routes, {Id:  $rootScope.busstops[x].RecorridoId})[0].Nombre;
                                }   
                                vm.routeOK=true;   
                                $scope.hacerPagineo($scope.busstops);
                                $scope.totalBusstops = $scope.busstops.length;
                            }
                        }
                    })
                    .catch(function (error) {
                        SweetAlert.swal({
                            type: "error",
                            title: "Error",
                            text: error,
                            confirmButtonAriaLabel: 'Ok',
                        });
                    });
            };
            $scope.inicializar();

            $scope.hacerPagineo = function (arreglo) {
                var principio = (($scope.currentPage - 1) * $scope.numPerPage); 
                var fin = principio + $scope.numPerPage; 
                $scope.filtroBusstops = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.busstops, function (item) {
                    return (item.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalBusstops = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.busstops);
            });
        }
        function getRamalByEmpresa(empresaId){
            if(empresaId != undefined){
                $rootScope.ramales = null;
                ResourcesService.GetRamalesByEmpresa(empresaId)
                .then(function (response) {
                    if (response){
                        vm.ramales = response;      
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
                vm.schedulesOk = false;
            }
        }









}


})();