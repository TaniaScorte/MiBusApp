(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminRoutesController', AdminRoutesController);

        AdminRoutesController.$inject = ['UserService', '$rootScope', '$scope','ResourcesService'];


    function AdminRoutesController(UserService, $rootScope, $scope,ResourcesService) {    
        var vm = $scope;     
        vm.openModalRoutesCreate = openModalRoutesCreate;
        vm.openModalRoutesEdit = openModalRoutesEdit;
        vm.openModalRoutesDelete = openModalRoutesDelete;    
        initController();        
        function initController(){
            getTiposDNI();
            getRecorridosByEmpresa();
        }

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

        function getRecorridosByEmpresa(){
            ResourcesService.GetRecorridosByEmpresa()
            .then(function (response) {
                if (response){
                    $rootScope.recorridos = response.data;          
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
        function openModalRoutesCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-drivers/modal-routes-create.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                recorrido: function () {
                    return "create";
                }
                }
            });
        }
        function openModalRoutesEdit(recorridoEdit){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-edit.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                recorrido: function () {
                    return recorridoEdit;
                }
                }
            });
        }
        function openModalRoutesDelete(recorridoDelete){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-delete.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                recorrido: function () {
                    return recorridoDelete;
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

        }


})();