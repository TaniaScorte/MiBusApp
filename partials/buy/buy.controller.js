(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuyController', BuyController);

        BuyController.$inject = ['$location','$scope','$rootScope','MapResourcesService','ResourcesService','SweetAlert'];
    function BuyController($location,$scope,$rootScope,MapResourcesService,ResourcesService,SweetAlert) {
        var vm = $scope;
        initController();

        function initController() {
            if(!$rootScope.paramsBuy){
                $location.path('/schedules');
                return;
            }
            vm.paramsBuy = $rootScope.paramsBuy;
            getParadasByRecorrido();
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

})();