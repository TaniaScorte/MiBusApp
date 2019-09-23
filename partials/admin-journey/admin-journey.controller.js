(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminJourneyController', AdminJourneyController);

        AdminJourneyController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminJourneyController(UserService, $rootScope, $scope) {
        var vm = this;

       

    }


})();