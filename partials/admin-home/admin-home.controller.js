(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminHomeController', AdminHomeController);

        AdminHomeController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminHomeController(UserService, $rootScope, $scope) {
        var vm = this;

       


    var swipe = function () {
        $("#swipeHome").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!admin-journey');
            },
            wipeRight: function () {
                window.location.replace('#!admin-bus');
            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }
    swipe();


}

})();