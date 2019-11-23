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
            if(!$rootScope.ramales){
                getRamalesByEmpresa();
            }     
        }

        $rootScope.$on("refreshListRoutes", function(evt,branchId){ 
            getRecorridosByEmpresaRamal(branchId);
        });
        vm.selectedBranch= function(){
            if(vm.route.branch){
                vm.branchOK=true;
                getRecorridosByEmpresaRamal(vm.route.branch.Id);     
             }
             else{
                vm.branchOK=false;   
             }
        }
        function getRecorridosByEmpresaRamal(branchId) {
            $scope.routes = []; 
            $scope.filtroRoutes = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetRecorridosByEmpresaRamal(branchId,$rootScope.globals.currentUser.userData.EmpresaId)
                .then(function (response) {
                        if (response) {
                            if (response) {
                                $scope.routes = response;
                                $rootScope.routes = response;          //por las dudas que lo use en otro lado
                                $scope.hacerPagineo($scope.routes);
                                $scope.totalRoutes = $scope.routes.length;
                            }
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
                $scope.filtroRoutes = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.routes, function (item) {
                    return (item.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalRoutes = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.routes);
            });
        }

        function formatDate(date){
            var dateOut = date.replace(/([A-Za-z)(\\/])/g, "");
            return dateOut;
        };
        function openModalRoutesCreate(){
            var routeCreate = {};
            routeCreate.create = true;
            routeCreate.branch = vm.route.branch; 
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'partials/admin-routes/modal-routes-create.view.html',
                controller: 'ModalRoutesController',
                size: 'lg',
                windowClass: 'show',
                backdrop: 'static',
                resolve: {
                  route: function () {
                    return routeCreate;
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