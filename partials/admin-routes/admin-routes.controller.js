(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminRoutesController', AdminRoutesController);

        AdminRoutesController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert'];


    function AdminRoutesController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert) {
        var vm = $scope;     
        vm.openModalRoutesCreate = openModalRoutesCreate;
        vm.openModalRoutesEdit = openModalRoutesEdit;
        vm.openModalRoutesDelete = openModalRoutesDelete;    
        initController();        
        function initController(){
            getTiposDNI();
            getRecorridosByEmpresa();
            getRamalesByEmpresa();
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

        $rootScope.$on("refreshListRecorridos", function(evt,data){ 
            getRecorridosByEmpresa();
        });
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
        if(!$rootScope.formatDate){
            $rootScope.formatDate = formatDate;
            $scope.dateToday = new Date();
        }
        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalRoutesCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-create.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  recorrido: function () {
                    return "Create";
                  }
                }
              });
        }
        function openModalRoutesEdit(recorridoEdit){
            recorridoEdit.edit=true;
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
            recorridoDelete.delete = true;
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
        function getRamalesByEmpresa(){
            ResourcesService.GetRamalesByEmpresa( $rootScope.globals.currentUser.userData.EmpresaId)
            .then(function (response) {
                if (response){
                   $rootScope.ramales = response;          
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