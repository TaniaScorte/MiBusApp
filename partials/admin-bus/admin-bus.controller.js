(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminBusController', AdminBusController);

        AdminBusController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminBusController(UserService, $rootScope, $scope) {
        var vm = this;

       

 

    var swipe = function () {
        $("#swipeBus").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!admin-home');
            },
            wipeRight: function () {
                window.location.replace('#!admin-drivers');
            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }
    swipe();



}


})();