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
        vm.updateHorariosByRecorrido = updateHorariosByRecorrido;
        vm.buy = buy;
        initController();

        function initController() {
            if(!$rootScope.empresas){
                ResourcesService.GetEmpresas()
                .then(function (response) {
                    if (response){
                        $rootScope.empresas = response;      
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
        function buy(horario) {
            var paramsBuy= {};
            paramsBuy.recorrido = vm.recorrido;
            paramsBuy.empresa = vm.empresa;
            paramsBuy.ramal = vm.ramal;
            paramsBuy.horario = horario;
            $rootScope.paramsBuy = {};
            $rootScope.paramsBuy = paramsBuy; 
            $location.path('/buy');
        }
        function updateRamalByEmpresa(empresaId){
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
        function updateRecorridosByRamal(ramalId){
            $rootScope.recorridos = null;
            ResourcesService.GetRecorridosByRamal(ramalId)
            .then(function (response) {
                if (response){
                    vm.recorridos = response;      
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
        function updateHorariosByRecorrido(recorridoId){
            $rootScope.horarios = null;
            ResourcesService.GetHorariosByRecorrido(recorridoId)
            .then(function (response) {
                if (response){
                    vm.horarios = response;  
                    vm.schedulesOk = true;    
                } 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
                vm.schedulesOk = false;
            });
        }

    }

})();