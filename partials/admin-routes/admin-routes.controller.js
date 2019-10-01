(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminRoutesController', AdminRoutesController);

        AdminRoutesController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminRoutesController(UserService, $rootScope, $scope) {
        var vm = this;

       
    
    var swipe = function () {

        $("#swipeRoutes").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!admin-drivers');
            },
            wipeRight: function () {
                window.location.replace('#!admin-journey');
            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }
    swipe();




}


})();