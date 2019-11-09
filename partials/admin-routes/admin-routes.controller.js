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
      
        function getRecorridosByEmpresa() {
            $scope.routes = []; 
            $scope.filtroRoutes = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetRecorridosByEmpresa()
                .then(function (response) {
                        if (response) {
                            if (response) {
                                $scope.routes = response;
                                $rootScope.routes = response;          //por las dudas que lo use en otro lado
                                if($rootScope.ramales){
                                    for(var x = 0 ; x < $rootScope.routes.length ; x++){
                                        $rootScope.routes[x].RamalDescripcion = $filter('filter')($rootScope.ramales, {Id:  $rootScope.routes[x].RamalId})[0].Nombre;
                                    } 
                                }
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
        function getRamalesByEmpresa(){
            ResourcesService.GetRamalesByEmpresa( $rootScope.globals.currentUser.userData.EmpresaId)
            .then(function (response) {
                if (response){
                   $rootScope.ramales = response;      
                   if($rootScope.routes){
                    for(var x = 0 ; x < $rootScope.routes.length ; x++){
                        $rootScope.routes[x].RamalDescripcion = $filter('filter')($rootScope.ramales, {Id:  $rootScope.routes[x].RamalId})[0].Nombre;
                    } 
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

}


})();