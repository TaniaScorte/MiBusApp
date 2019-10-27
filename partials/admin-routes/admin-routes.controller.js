(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminRoutesController', AdminRoutesController);

        AdminRoutesController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminRoutesController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalRoutesCreate = openModalRoutesCreate;
        vm.openModalRoutesEdit = openModalRoutesEdit;
        vm.openModalRoutesDelete = openModalRoutesDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        initController();        
        function initController(){
            getTiposDNI();
            getRamalesByEmpresa();
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

        $rootScope.$on("refreshListRoutes", function(evt,data){ 
            getRecorridosByEmpresa();
        });
        function getRecorridosByEmpresa(){
            ResourcesService.GetRecorridosByEmpresa()
            .then(function (response) {
                if (response){                  
                   $rootScope.routes = response; 
                   for(var x = 0 ; x < $rootScope.routes.length ; x++){
                       $rootScope.routes[x].RamalDescripcion = $filter('filter')($rootScope.ramales, {Id:  $rootScope.routes[x].RamalId})[0].Nombre;
                   }         
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
                  route: function () {
                    return "Create";
                  }
                }
              });
        }
        function openModalRoutesEdit(routeEdit){
            routeEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-edit.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  route: function () {
                    return routeEdit;
                  }
                }
              });
        }
        function openModalRoutesDelete(routeDelete){
            routeDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-delete.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  route: function () {
                    return routeDelete;
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