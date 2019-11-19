(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminAdminsController', AdminAdminsController);

        AdminAdminsController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];
    function AdminAdminsController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalAdminCreate = openModalAdminCreate;
        vm.openModalAdminEdit = openModalAdminEdit;
        vm.openModalAdminDelete = openModalAdminDelete;
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
        function initController(){
            getTiposDNI();
            getUserAdmins();
        }
        var swipe = function () {
            $("#swipeAdmins").touchwipe({
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
        $rootScope.$on("refreshListAdmins", function(evt,data){ 
            getUserAdmins();
        });
       
        function getUserAdmins() {
            $scope.admins = []; 
            $scope.filtroAdmins = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                UserService.GetAllUserByEmpresaRol(3)
                .then(function (response) {
                            if (response) {
                                $scope.admins = response.data;
                                $rootScope.admins = response;         
                                $scope.hacerPagineo($scope.admins);
                                $scope.totalAdmins = $scope.admins.length;
                            }  
                    })
                    .catch(function (error) {
                        SweetAlert.swal({
                            type: "error",
                            title: "Error",
                            text: error,
                            confirmButtonAriaLabel: 'Ok',
                        });
                    });
            };
            $scope.inicializar();

            $scope.hacerPagineo = function (arreglo) {
                var principio = (($scope.currentPage - 1) * $scope.numPerPage); 
                var fin = principio + $scope.numPerPage; 
                $scope.filtroAdmins = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.admins, function (item) {
                    return (item.FullName.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalAdmins = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.admins);
            });
        }

        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalAdminCreate(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-admins/modal-admins-create.view.html',
                controller: 'ModalAdminController',
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
        function openModalAdminEdit(userEdit){
            userEdit.edit=true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-admins/modal-admins-edit.view.html',
                controller: 'ModalAdminController',
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
        function openModalAdminDelete(userDelete){
            userDelete.delete = true;
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-admins/modal-admins-delete.view.html',
                controller: 'ModalAdminController',
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