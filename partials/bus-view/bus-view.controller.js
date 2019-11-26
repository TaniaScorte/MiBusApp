(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusViewController', BusViewController);

        BusViewController.$inject = ['$window','UserService', '$location','$scope','$rootScope','MapResourcesService','ResourcesService','SweetAlert'];
    function BusViewController($window,UserService, $location,$scope,$rootScope,MapResourcesService,ResourcesService,SweetAlert) {
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
            MapResourcesService.GetPasajeByUserId($rootScope.globals.currentUser.userData.Id)
            .then(function(response){
                if(response.length > 0){
                    vm.loadAllRoute = false;  
                    vm.pasaje = response[0];
                    getLocation();    
                }                
                if(response.length == 0){
                    vm.loadAllRoute = null;
                    SweetAlert.swal ({
                        type: "warning", 
                        title: "Tenga en cuenta que no posee pasajes",
                        text: "",
                        confirmButtonAriaLabel: 'Ok',
                    });
                    vm.showMensaje = false;
                    getLocation();      
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
                getLocation();    
            });                
           
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
        $rootScope.stopTimer= function() {
            if ($rootScope.intervalGetUltimaPosicion) {
              clearInterval($rootScope.intervalGetUltimaPosicion);
            }
        }
        function loadLayersByPasaje(){
            $rootScope.stopTimer();
            $rootScope.intervalGetUltimaPosicion = setInterval(() => {    
                getLocationReal();
                ResourcesService.GetUltimaPosicionByViaje(vm.pasaje.ViajeId)
                .then(function (response) {
                    vm.marker.setLatLng([response.Latitud, response.Longitud]);
                    //vm.mymap.setView([response.Latitud, response.Longitud], 13)
                    if(response.EstadoId == 6){
                        $rootScope.stopTimer();
                    }
                })
                .catch(function (error) {
                });
            }, 3000);
            var markers = [];
            ResourcesService.GetParadasByRecorrido(vm.pasaje.RecorridoId)
             .then(function (response) {
                 if (response){
                     vm.paradas = response;  
                     for (var index = 0; index < vm.paradas.length; index++) {
                         var element = vm.paradas[index];
                        //  if(!vm.focusParada){
                        //     vm.focusParada={};
                        //     vm.focusParada.longitude = element.Longitud;
                        //     vm.focusParada.latitude = element.Latitud; 
                        //  }                            
                         var marker = L.marker([element.Latitud,element.Longitud]).bindPopup(element.Nombre);  
                         markers.push(marker);                   
                     }

                    //vm.color = $rootScope.colors[vm.countColor].ColorHex;
                    //setColorRoute(pointList,'blue',markers);
                    //pointList=[];
                    L.layerGroup(markers).addTo(vm.mymap);
                    markers=[];                                
                    //vm.countColor=vm.countColor + 1;   
                    // vm.mymap.setView([vm.focusParada.latitude, vm.focusParada.longitude], 15)
                 } 
 
             })
             .catch(function(error){
                 SweetAlert.swal ({
                     type: "error", 
                     title: "Error",
                     text: error,
                     confirmButtonAriaLabel: 'Ok',
                 });
             })

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
        function loadPositionIconPerson(position) {
            vm.marker2.setLatLng([position.coords.latitude,position.coords.longitude])
        }
        function getLocationReal(position) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(loadPositionIconPerson);
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
            var busIcon = L.icon({
                iconUrl: 'images/bus.png',
    
                iconSize: [60, 45], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            var pIcon = L.icon({
                iconUrl: 'images/prueba-pasajero.png',
    
                iconSize: [60, 45], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            if(vm.loadAllRoute == false){
                vm.marker = L.marker([position.coords.latitude,position.coords.longitude], { icon: busIcon }).addTo(vm.mymap);
                vm.marker2 = L.marker([position.coords.latitude,position.coords.longitude], { icon: pIcon }).addTo(vm.mymap);
            }

        }
        function updateRamalByEmpresa(empresaId){
            vm.ramales = null;
            vm.recorridos=null;
            if(empresaId != undefined){
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
            vm.recorridos = null;
            if(ramalId != undefined){
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

        }
        vm.loadMapParams = function(recorridoId){
            $rootScope.stopTimer();
            if(recorridoId != undefined){
                vm.loadAllRoute = null;
                vm.mymap.remove();
                getLocation();
                var markers = [];
                ResourcesService.GetParadasByRecorrido(recorridoId)
                 .then(function (response) {
                     if (response){
                         vm.paradas = response;
                         if(response.length > 0){
                            for (var index = 0; index < vm.paradas.length; index++) {
                                var element = vm.paradas[index];
                                if(!vm.focusParada){
                                   vm.focusParada={};
                                   vm.focusParada.longitude = element.Longitud;
                                   vm.focusParada.latitude = element.Latitud; 
                                }                            
                                var marker = L.marker([element.Latitud,element.Longitud]);  
                                vm.paradaNombre = element.ParadaNombre;
                                var container = $('<div />');
                                container.on('click', '.onClickMarker', function() {
                                    vm.onClickMarker();
                                });
                                container.html(element.ParadaNombre +"<button class='btn btn-primary btn-small onClickMarker'><i class='fa fa-ticket'></i></button>");
                                container.append($('<span class="bold">').text(""));                                
                                marker.bindPopup(container[0]);
                                markers.push(marker);                   
                            }
       
                           //vm.color = $rootScope.colors[vm.countColor].ColorHex;
                           //setColorRoute(pointList,'blue',markers);
                           //pointList=[];
                           L.layerGroup(markers).addTo(vm.mymap);
                           markers=[];                                
                           //vm.countColor=vm.countColor + 1;   
                           vm.mymap.setView([vm.focusParada.latitude, vm.focusParada.longitude], 15);
                           vm.focusParada = null;
                         }
                         else{
                            SweetAlert.swal ({
                                type: "warning", 
                                title: "Lo lamentamos!",
                                text: "La empresa no tiene paradas configuradas",
                                confirmButtonAriaLabel: 'Ok',
                            });
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
        vm.onClickMarker = function() {
            var paramsBuy= {};
            paramsBuy.recorrido = vm.recorrido;
            paramsBuy.empresa = vm.empresa;
            paramsBuy.ramal = vm.ramal;
            paramsBuy.mapSelected = true;
            $rootScope.paramsBuy = {};
            $rootScope.paramsBuy = paramsBuy; 
            $rootScope.backSchedules = true;
            $location.path("/schedules");
            $window.location.href = $location.$$absUrl;
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

 
         /*       function setColorRoute(pointList,color,markers) {
            var firstpolyline = new L.Polyline(pointList, {
                color: color,
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            firstpolyline.addTo(vm.mymap);
            
            }*/   
    }

})();