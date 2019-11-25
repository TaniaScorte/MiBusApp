(function () {
    'use strict';

    angular
        .module('app')
        .controller('SchedulesController', SchedulesController);

        SchedulesController.$inject = ['UserService', '$location','$rootScope','$scope','ResourcesService','$filter'];
    function SchedulesController(UserService, $location,$rootScope,$scope,ResourcesService,$filter) {
        var vm = $scope;
        vm.updateRamalByEmpresa = updateRamalByEmpresa;
        vm.updateRecorridosByRamal = updateRecorridosByRamal;
        vm.updateViajesByRecorrido = updateViajesByRecorrido;
        vm.buy = buy;
        initController();
        $rootScope.stopTimer();
        function initController() {
            if($rootScope.backSchedules){
                vm.loadComboBranchsRoutes= true;
                vm.empresa = $rootScope.paramsBuy.empresa;
                updateRamalByEmpresa($rootScope.paramsBuy.empresa.Id);
                updateRecorridosByRamal($rootScope.paramsBuy.ramal.Id);   
                updateViajesByRecorrido($rootScope.paramsBuy.recorrido.Id);
                return;
            }
            vm.loadComboBranchsRoutes= false;
            vm.menssageEmpresa = false;
            if(!$rootScope.empresas){
                $scope.empresas = []; 
                $scope.filtroEmpresas = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 5;
                $scope.inicializar = function () {
                    ResourcesService.GetEmpresas()
                        .then(function (response) {
                            if (response) {
                                if (response) {
                                    $scope.empresas = response;
                                    $rootScope.empresas = response;      
                                    $scope.hacerPagineo($scope.empresas);
                                    $scope.totalEmpresas = $scope.empresas.length;
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
                    $scope.filtroEmpresas = arreglo.slice(principio, fin);  
                };
    
                $scope.buscar = function (busqueda) {
                    var buscados = $filter('filter')($scope.empresas, function (empresa) {
                        return (empresa.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                    });
                    $scope.totalEmpresas = buscados.length;
                    $scope.hacerPagineo(buscados);
                };
    
                $scope.$watch('currentPage', function () {
                    $scope.hacerPagineo($scope.empresas);
                });
            }
            
        }
        function buy(journey) {
            var paramsBuy= {};
            paramsBuy.recorrido = vm.recorrido;
            paramsBuy.empresa = vm.empresa;
            paramsBuy.ramal = vm.ramal;
            paramsBuy.journey = journey;
            $rootScope.paramsBuy = {};
            $rootScope.paramsBuy = paramsBuy; 
            $location.path('/buy');
        }
        function updateRamalByEmpresa(empresaId){
            $rootScope.ramales = null;
            $rootScope.recorrido = null;
            if(empresaId != undefined){                
                ResourcesService.GetRamalesByEmpresa(empresaId)
                .then(function (response) {
                    if (response){
                        vm.ramales = response;  
                        if($rootScope.backSchedules){
                          vm.ramal = $rootScope.paramsBuy.ramal;  
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
                vm.schedulesOk = false;
            }
        }
        function updateRecorridosByRamal(ramalId){
            if (ramalId != undefined) {
                $rootScope.recorridos = null;
                ResourcesService.GetRecorridosByEmpresaRamal(ramalId,vm.empresa.Id)
                .then(function (response) {
                    if (response){
                        vm.recorridos = response;      
                        if($rootScope.backSchedules){
                            vm.recorrido = $rootScope.paramsBuy.recorrido;  
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
        }
        function updateViajesByRecorrido(recorridoId){
            $rootScope.journeys = null;
            if (recorridoId != undefined) {
                $scope.journeys = []; 
                $scope.filtroJourneys = [];
                $scope.currentPage = 1;
                $scope.numPerPage = 5;
                $scope.inicializar = function () {
                    ResourcesService.GetViajesByRecorrido(recorridoId,vm.empresa.Id)
                    .then(function (response) {
                            if (response) {
                                if (response) {

                                    vm.journeys = response;  
                                    vm.schedulesOk = true; 


                                    $scope.journeys = response;
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
                    var buscados = $filter('filter')($scope.journeys, function (journey) {
                        return (journey.DiaNombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                    });
                    $scope.totalJourneys = buscados.length;
                    $scope.hacerPagineo(buscados);
                };
    
                $scope.$watch('currentPage', function () {
                    $scope.hacerPagineo($scope.journeys);
                });
            }
        }
        vm.loadBranchsRoutes = function(empresa){
            vm.empresa = empresa;
            vm.loadComboBranchsRoutes = true;
            vm.updateRamalByEmpresa(empresa.Id);

        }
        vm.backLoadEmpresas = function (){
            vm.loadComboBranchsRoutes = false;
            vm.recorridos = null;
            vm.horarios=null;
            vm.ramales=null;
            vm.ramal=null;
            vm.menssageEmpresa = false;
            $rootScope.paramsBuy = null;
            $rootScope.backSchedules= null;
        }
        vm.formatDate = function(date){
            if(date){
                var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
                return dateOut;
            }
            else{
                return $filter('date')(new Date, 'dd-MM-yyyy');
            }

        };
    }

})();