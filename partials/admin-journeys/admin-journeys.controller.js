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
        $rootScope.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            vm.routeOk = false;
            getRamalByEmpresa($rootScope.globals.currentUser.userData.EmpresaId);           
            if(!$rootScope.brands){
                getMarcas();
            }
            if(!$rootScope.allModels){
                getModelos();
            }
            if(!$rootScope.drivers){
                getUserDrivers();
            }
            if(!$rootScope.days){
                getDays();
            }
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
        $rootScope.$on("refreshListJourneys", function(evt,recorridoId){ 
            getViajesByRecorrido(recorridoId);
        });
        vm.selectedRoute= function(){
            if(vm.journey.route){
                getViajesByRecorrido(vm.journey.route.Id);    
                getHorariosByRecorrido(vm.journey.route.Id) 
                if(!$rootScope.vehicles){
                    getVehiculosByEmpresa();
                }  
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
                templateUrl: 'partials/admin-journeys/modal-journeys-create.view.html',
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
                templateUrl: 'partials/admin-journeys/modal-journeys-edit.view.html',
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
                templateUrl: 'partials/admin-journeys/modal-journeys-delete.view.html',
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
            ResourcesService.GetVehiculosByEmpresa($rootScope.globals.currentUser.userData.EmpresaId)
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
                        $rootScope.drivers = response.data;
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
        function getDays(){
            ResourcesService.GetDias()
            .then(function (response) {
                if (response){                  
                   $rootScope.days = response;     
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
}


})();