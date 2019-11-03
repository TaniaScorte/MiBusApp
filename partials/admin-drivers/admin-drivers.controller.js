(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminDriversController', AdminDriversController);

        AdminDriversController.$inject = ['UserService', '$rootScope', '$scope','$uibModal','ResourcesSetService','ResourcesService','SweetAlert','$filter'];


    function AdminDriversController(UserService, $rootScope, $scope,$uibModal,ResourcesSetService,ResourcesService,SweetAlert,$filter) {
        var vm = $scope;     
        vm.openModalDriverCreate = openModalDriverCreate;
        vm.openModalDriverEdit = openModalDriverEdit;
        vm.openModalDriverDelete = openModalDriverDelete;
        vm.formatDate = formatDate;
        vm.dateToday = new Date();
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
       
        function getUserDrivers() {
            $scope.drivers = []; 
            $scope.filtroDrivers = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                UserService.GetAllUserByEmpresaRol(2)
                .then(function (response) {
                            if (response) {
                                $scope.drivers = response.data;
                                $rootScope.drivers = response;          //por las dudas que lo use en otro lado
                                $scope.hacerPagineo($scope.drivers);
                                $scope.totalDrivers = $scope.drivers.length;
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
                $scope.filtroDrivers = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.drivers, function (item) {
                    return (item.FullName.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalDrivers = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.drivers);
            });
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