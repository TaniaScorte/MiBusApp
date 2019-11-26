(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuyController', BuyController);

        BuyController.$inject = ['$location','$scope','$rootScope','MapResourcesService','ResourcesService','SweetAlert','ResourcesSetService','$filter','$window'];
    function BuyController($location,$scope,$rootScope,MapResourcesService,ResourcesService,SweetAlert,ResourcesSetService,$filter,$window) {
        var vm = $scope;
        initController();

        function initController() {
            vm.asientosLibre = false;
            if(!$rootScope.paramsBuy){
                vm.asientosLibre = false;
                $scope.codigoqr = "";
                $location.path('/schedules');
                return;
            }
            vm.paramsBuy = $rootScope.paramsBuy;
            vm.UserId = $rootScope.globals.currentUser.userData.Id;
            
            $scope.codigoqr = makeid(10);
            getParadasByRecorrido();
            getAsientosLibresByViaje();
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
        vm.buyConfirm = function(){
            var codigoqr = makeid(10);
            var data = {
                qr: codigoqr,
                EmpresaId: vm.paramsBuy.empresa.Id,
                ViajeId: vm.paramsBuy.journey.Id,
                UsuarioId: $rootScope.globals.currentUser.userData.Id,
                EstadoId: 1,
                ParadaId: vm.busStop.Id,// vm.paramsBuy.busStop.Id,
                Importe: vm.paramsBuy.recorrido.Importe,
                FechaCompra: $filter('date')(new Date, 'dd-MM-yyyy')
            };
            ResourcesSetService.SetPasaje(data)
            .then(function (response) {
                if (response.Estado == 0){
                    var url = "https://www.mellevas.com.ar/api/mp/index?id=" + response.id;
                    $window.location.href = url;
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
        vm.backSchedules = function(){
            $rootScope.backSchedules = true;
            $location.path('/schedules');
        }
        function getParadasByRecorrido() {
            ResourcesService.GetParadasByRecorrido(vm.paramsBuy.recorrido.Id)
            .then(function (response) {
                if (response){
                   $rootScope.busStops = response; 
                   vm.busStop = $rootScope.busStops[0];     
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
        function getAsientosLibresByViaje() {
            ResourcesService.GetAsientosLibresByViaje(vm.paramsBuy.journey.Id)
            .then(function (response) {
                if (response){
                   vm.cantidadAsiento = response;     
                   vm.asientosLibres = true;
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
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }
         
    }

})();