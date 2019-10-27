(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminBranchController', AdminBranchController);

        AdminBranchController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert'];


    function AdminBranchController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert) {
        var vm = $scope;     
        vm.openModalBranchCreate = openModalBranchCreate;
        vm.openModalBranchEdit = openModalBranchEdit;
        vm.openModalBranchDelete = openModalBranchDelete;    
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        
        initController();        
        function initController(){
            getRamalesByEmpresa();
        }

        var swipe = function () {
        $("#swipeBranch").touchwipe({
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

        $rootScope.$on("refreshListBranch", function(evt,data){ 
            getRamalesByEmpresa();
        });

        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalBranchCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-branch/modal-branch-create.view.html',
                controller: 'ModalBranchController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  ramal: function () {
                    return "Create";
                  }
                }
              });
        }
        function openModalBranchEdit(ramalEdit){
            ramalEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-branch/modal-branch-edit.view.html',
                controller: 'ModalBranchController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  ramal: function () {
                    return ramalEdit;
                  }
                }
              });
        }
        function openModalBranchDelete(ramalDelete){
            ramalDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-branch/modal-branch-delete.view.html',
                controller: 'ModalBranchController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  ramal: function () {
                    return ramalDelete;
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