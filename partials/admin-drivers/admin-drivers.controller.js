(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert'];


    function AdminDriversController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert) {
        var vm = $scope;     
        vm.openModalDriverCreate = openModalDriverCreate;
        vm.openModalDriverEdit = openModalDriverEdit;
        vm.openModalDriverDelete = openModalDriverDelete;

        function initController(){
            getTiposDNI();
            getUserDrivers();
        }
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
        $rootScope.$on("refreshListDrivers", function(evt,data){ 
            getUserDrivers();
        });
        function getUserDrivers(){
            UserService.GetAllUserByEmpresaRol(2)
            .then(function (response) {
                if (response){                  
                   $rootScope.drivers = response.data;          
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
        if(!$rootScope.formatDate){
            $rootScope.formatDate = formatDate;
            $scope.dateToday = new Date();
        }
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalDriverCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-drivers/modal-driver-create.view.html',
                controller: 'ModalDriverController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  user: function () {
                    return "Hola";
                  }
                }
              });
        }
        function openModalDriverEdit(userEdit){
            userEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-drivers/modal-driver-edit.view.html',
                controller: 'ModalDriverController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  user: function () {
                    return userEdit;
                  }
                }
              });
        }
        function openModalDriverDelete(userDelete){
            userDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-drivers/modal-driver-delete.view.html',
                controller: 'ModalDriverController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  user: function () {
                    return userDelete;
                  }
                }
              });
        }
        function getTiposDNI(){
            ResourcesService.GetTiposDNI()
            .then(function (response) {
                if (response){
                   $rootScope.dnitypes = response;          
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
        
        initController();

}


})();