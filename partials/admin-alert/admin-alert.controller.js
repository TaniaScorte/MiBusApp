(function () {
    'use strict';

    var SUhome = angular
        .module('app')
        .controller('AdminAlertController', AdminAlertController);
        AdminAlertController.$inject = ['UserService', 'SweetAlert', 'ResourcesService', 'ResourcesUpdateService', 'ResourcesDeleteService', 'ResourcesSetService', '$rootScope', '$http', '$filter', '$scope'];
    function AdminAlertController(UserService, SweetAlert, ResourcesService, ResourcesUpdateService, ResourcesDeleteService, ResourcesSetService, $rootScope, $http, $filter, $scope) {
        var vm = this;
        vm.idEtitar = 0;
        vm.idEliminar = 0;


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
                ResourcesService.GetAlertasxEmpresa()
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

            var mymap = L.map('map', {
                minZoom: 8
            })
            mymap.setView([-34.671325, -58.563797], 16);
    
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
    
                var busIcon = L.icon({
                    iconUrl: 'images/bus-alerta.png',
    
                    iconSize: [60, 45], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
               
                var marker = L.marker([-34.671325, -58.563797], { icon: busIcon }).addTo(mymap);
    
        }


        
    }
})();




