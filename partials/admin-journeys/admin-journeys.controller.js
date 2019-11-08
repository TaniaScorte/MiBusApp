(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminJourneysController', AdminJourneysController);

        AdminJourneysController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminJourneysController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalJourneysCreate = openModalJourneysCreate;
        vm.openModalJourneysEdit = openModalJourneysEdit;
        vm.openModalJourneysDelete = openModalJourneysDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            vm.routeOk = false;
            if(!$rootScope.routes){
                getRecorridosByEmpresa();
            }            
            if(!$rootScope.brands){
                getMarcas();
            }
            if(!$rootScope.allModels){
                getModelos();
            }
            
        }

        $rootScope.$on("refreshListJourneys", function(evt,recorridoId){ 
            getViajesByRecorrido(recorridoId);
        });
        vm.selectedRoute= function(){
            if(vm.journey.route){
                getViajesByRecorrido(vm.journey.route.Id);    
                getHorariosByRecorrido(vm.journey.route.Id) 
             }
             else{
                vm.routeOK=false;   
             }
        }
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalJourneysCreate(){
            var journeyCreate = {};
            journeyCreate.RecorridoId = vm.journey.route.Id;
            journeyCreate.create = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-journey/modal-journey-create.view.html',
                controller: 'ModalJourneysController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  journey: function () {
                    return journeyCreate;
                  }
                }
              });
        }
        function openModalJourneysEdit(journeyEdit){
            journeyEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-journey/modal-journey-edit.view.html',
                controller: 'ModalJourneysController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  journey: function () {
                    return journeyEdit;
                  }
                }
              });
        }
        function openModalJourneysDelete(journeyDelete){
            journeyDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-journey/modal-journey-delete.view.html',
                controller: 'ModalJourneysController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  journey: function () {
                    return journeyDelete;
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
        function getViajesByRecorrido(recorridoId) {
            $scope.journeys = []; 
            $scope.filtroBusstops = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetViajesByRecorrido(recorridoId)
                .then(function (response) {
                        if (response) {
                            if (response) {
                                $scope.journeys = response;
                                $rootScope.journeys = response;          //por las dudas que lo use en otro lado
                                for(var x = 0 ; x < $rootScope.journeys.length ; x++){
                                    $rootScope.journeys[x].RecorridoDescripcion = $filter('filter')($rootScope.routes, {Id:  $rootScope.journeys[x].RecorridoId})[0].Nombre;
                                }   
                                vm.routeOK=true;   
                                $scope.hacerPagineo($scope.journeys);
                                $scope.totalJourneys = $scope.journeys.length;
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
                $scope.filtroJourneys = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.journeys, function (item) {
                    return (item.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalJourneys = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.journeys);
            });
        }
        function getVehiculosByEmpresa() {
            ResourcesService.GetVehiculosByEmpresa()
                .then(function (response) {
                    if (response) {
                        $rootScope.vehicles = response; 
                        for (var x = 0; x < $rootScope.vehicles.length; x++) {
                            $rootScope.vehicles[x].Marca = $filter('filter')($rootScope.brands, { Id: $rootScope.vehicles[x].MarcaId })[0].Nombre;
                            $rootScope.vehicles[x].Modelo = $filter('filter')($rootScope.allModels, { Id: $rootScope.vehicles[x].ModeloId })[0].Nombre;
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
        }
        function getMarcas() {
            ResourcesService.GetMarcas()
                .then(function (response) {
                    if (response) {
                        $rootScope.brands = response;
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
        }
        function getModelos() {
            ResourcesService.GetModelos()
                .then(function (response) {
                    if (response) {
                        $rootScope.allModels = response;
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
        }
        function getUserDrivers() {
            UserService.GetAllUserByEmpresaRol(2)
            .then(function (response) {
                    if (response) {
                        $rootScope.drivers = response;
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
        }
        function getHorariosByRecorrido(recorridoId) {
            ResourcesService.GetHorariosByRecorrido(recorridoId)
                .then(function (response) {
                    if (response) {
                        $rootScope.schedules = response;
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
        }
        
}


})();