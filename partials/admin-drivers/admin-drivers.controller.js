(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminDriversController(UserService, $rootScope, $scope) {
        var vm = this;

       

    
    var swipe = function () {
        $("#swipeDrivers").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!admin-bus');
            },
            wipeRight: function () {
                window.location.replace('#!admin-routes');
            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }
    swipe();




}


})();