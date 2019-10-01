(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminJourneyController', AdminJourneyController);

        AdminJourneyController.$inject = ['UserService', '$rootScope', '$scope'];


    function AdminJourneyController(UserService, $rootScope, $scope) {
        var vm = this;

       

    
    var swipe = function () {
        $("#swipeJourney").touchwipe({
            wipeLeft: function () {
                window.location.replace('#!admin-routes');
            },
            wipeRight: function () {
                window.location.replace('#!admin-home');
            },

            min_move_x: 200,
            min_move_y: 200,
            preventDefaultEvents: false
        });
    }
    swipe();


}


})();