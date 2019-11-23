(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuyController', BuyController);

        BuyController.$inject = ['$location','$scope','$rootScope','MapResourcesService','ResourcesService','SweetAlert'];
    function BuyController($location,$scope,$rootScope,MapResourcesService,ResourcesService,SweetAlert) {
        var vm = $scope;
        vm.paramsBuy = $rootScope.paramsBuy;

        initController();

        function initController() {
            //loadCurrentUser();
           // loadAllUsers();
        }

        vm.backSchedules = function(){
            $rootScope.backSchedules = true;
            $location.path('/schedules');
        }
    }

})();