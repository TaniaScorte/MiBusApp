(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusViewController', BusViewController);

        BusViewController.$inject = ['UserService', '$location','$scope','$rootScope','MapResourcesService','ResourcesService','SweetAlert'];
    function BusViewController(UserService, $location,$scope,$rootScope,MapResourcesService,ResourcesService,SweetAlert) {
        var vm = $scope;
        vm.updateRamalByEmpresa = updateRamalByEmpresa;
        vm.updateRecorridosByRamal = updateRecorridosByRamal;

        initController();

        function initController() {
            if(!$rootScope.empresas){
                ResourcesService.GetEmpresas()
                .then(function (response) {
                    if (response){
                        $rootScope.empresas = response;      
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
            if (!$rootScope.colors) {
                getColors();
            }
            initMap();

        }
        function initMap() {
            vm.loadAllRoute = null;
            MapResourcesService.GetPasajeByDNI($rootScope.user.Dni)
            .then(function(response){
                if(response.Estado == 0){
                    vm.loadAllRoute = false;  
                }                
                if(response.Estado == 99){
                    vm.loadAllRoute = null;
                }                 
            })
            .catch(function(error){
                SweetAlert.swal ({
                    type: "warning", 
                    title: "Tenga en cuenta que no posee pasajes",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
                vm.showMensaje = false;
            });                
            getLocation();    
        }
        function loadMap(paramLat,paramLon){
            vm.mymap = L.map('mapid').setView([paramLat,paramLon], 13);            
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.mymap);
            if (vm.loadAllRoute == null) {
                return;
            }
            else{
                loadLayersByPasaje();
            }
            
        }
        function loadAllLayers(){
           var pointList = [];
           var markers = [];
           ResourcesService.GetParadas()
            .then(function (response) {
                if (response){
                    vm.paradas = response;  
                    vm.recorridoID = -1; 
                    vm.countColor = 0;
                    for (var index = 0; index < vm.paradas.length; index++) {
                        var element = vm.paradas[index];
                        var point = new L.LatLng(element.Latitud,element.Longitud);
                        pointList.push(point);       
                        var marker = L.marker([element.Latitud,element.Longitud]).bindPopup(element.Nombre);  
                        markers.push(marker);
                        if(vm.recorridoID != element.RecorridoId){
                            if(vm.recorridoID != -1){
                                vm.color = $rootScope.colors[vm.countColor].ColorHex;
                                setColorRoute(pointList,vm.color,markers);
                                pointList=[];
                                markers=[];                                
                                vm.countColor=vm.countColor + 1;
                            }
                            vm.recorridoID = element.RecorridoId;
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

            vm.schedulesOk = false;
        }
        function loadLayersByPasaje(recorrido){
           ResourcesService.GetParadasByRecorrido(recorrido)
            .then(function (response) {
                if (response){
                    vm.paradas = response;      
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

            var marker1 = L.marker([-34.8482141,-58.4470336]).bindPopup('Parada Nro 1');
            var marker2 = L.marker([-34.8471648,-58.4416045]).bindPopup('Parada Nro 2');
            var marker3 = L.marker([-34.846258,-58.4395102]).bindPopup('Parada Nro 3');
            var marker4 = L.marker([-34.8503334,-58.4410412]).bindPopup('Parada Nro 4');

        }
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadAreaCicle);
          } 
          else {
            alert("Geolocation is not supported by this browser.");
            return false;
          }
        }    
        function loadAreaCicle(position) {
            loadMap(position.coords.latitude,position.coords.longitude);
            var circle = L.circle([position.coords.latitude,position.coords.longitude], {
                color: null,
                fillColor: '#f03',
                fillOpacity: 0.3,
                radius: 200
            }).addTo(vm.mymap);
        }
        function updateRamalByEmpresa(empresaId){
            if(empresaId != undefined){
                $rootScope.ramales = null;
                ResourcesService.GetRamalesByEmpresa(empresaId)
                .then(function (response) {
                    if (response){
                        vm.ramales = response;      
                        vm.empresaIdSelected = empresaId;
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
        function updateRecorridosByRamal(ramalId){
            $rootScope.recorridos = null;
            ResourcesService.GetRecorridosByEmpresaRamal(ramalId, vm.empresaIdSelected)
            .then(function (response) {
                if (response){
                    vm.recorridos = response;   
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
        vm.loadMapParams = function(recorridoId){
            if(recorridoId != undefined){
                vm.loadAllRoute = null;
                vm.mymap.remove();
                getLocation();
                var pointList = [];
                var markers = [];
                ResourcesService.GetParadasByRecorrido(recorridoId)
                 .then(function (response) {
                     if (response){
                         vm.paradas = response;  
                         vm.recorridoID = -1; 
                         vm.countColor = 0;
                         for (var index = 0; index < vm.paradas.length; index++) {
                             var element = vm.paradas[index];
                             var point = new L.LatLng(element.Latitud,element.Longitud);
                             pointList.push(point);       
                             var marker = L.marker([element.Latitud,element.Longitud]).bindPopup(element.Nombre);  
                             markers.push(marker);                   
                         }
    
                        //vm.color = $rootScope.colors[vm.countColor].ColorHex;
                        setColorRoute(pointList,'blue',markers);
                        pointList=[];
                        markers=[];                                
                        vm.countColor=vm.countColor + 1;   
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
        function getColors(){
            ResourcesService.GetColores()
            .then(function (response) {
                if (response){
                   $rootScope.colors = response;          
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

        function setColorRoute(pointList,color,markers) {
            var firstpolyline = new L.Polyline(pointList, {
                color: color,
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            firstpolyline.addTo(vm.mymap);
            L.layerGroup(markers).addTo(vm.mymap);
        }
    }

})();