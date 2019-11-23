(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('AdminAlertController', AdminAlertController);
        AdminAlertController.$inject = ['SweetAlert', 'ResourcesService', '$rootScope', '$filter', '$scope'];
    function AdminAlertController(SweetAlert, ResourcesService, $rootScope, $filter, $scope) {
        var vm = this;
        vm.mymap;
        vm.busIcon;

        initController();

        function initController() {
            getAlertas();
            verMapa();
        }


        function getAlertas() {
            $scope.items = []; // JSON 
            $scope.filtroItems = [];
            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.inicializar = function () {
                ResourcesService.GetAlertasxEmpresa($rootScope.globals.currentUser.userData.EmpresaId)
                    .then(function (response) {
                        if (response) {
                            if (response) {
                                $scope.items = response;
                                $scope.hacerPagineo($scope.items);
                                $scope.totalItems = $scope.items.length;
                            }
                        }
                    })
                    .catch(function (error) {
                        //console.log(error);
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
                $scope.filtroItems = arreglo.slice(principio, fin); 
            };

            $scope.buscar = function (busqueda) {
                var buscados = $filter('filter')($scope.items, function (item) {
                    return (item.Nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1); 
                });
                $scope.totalItems = buscados.length;
                $scope.hacerPagineo(buscados);
            };

            $scope.$watch('currentPage', function () {
                $scope.hacerPagineo($scope.items);
            });

        }


        function verMapa(){

            vm.mymap = L.map('map', {
                minZoom: 8
            })    
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(vm.mymap);
    
                vm.busIcon = L.icon({
                    iconUrl: 'images/bus-alerta.png',
    
                    iconSize: [60, 45], 
                    shadowSize: [50, 64],
                    iconAnchor: [22, 94], 
                    shadowAnchor: [4, 62],  
                    popupAnchor: [-3, -76] 
                });
               
        }

        $scope.verBus=function(lat,lon){
            vm.mymap.setView([lat, lon], 16);
            var marker = L.marker([lat,lon], { icon: vm.busIcon }).addTo(vm.mymap);

        }


        
    }
})();




