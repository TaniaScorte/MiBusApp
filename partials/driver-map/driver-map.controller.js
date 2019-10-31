(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverMapController', DriverMapController);

    DriverMapController.$inject = ['UserService', '$rootScope', '$scope'];


    function DriverMapController(UserService, $rootScope, $scope) {
        var vm = this;




        initController();

        function initController() {
            vm.loadAllRoute = true;
           /* MapResourcesService.GetPasajeByDNI($rootScope.user.Dni,)
            .then(function(response){
                if(response.Estado == 0){
                    vm.loadAllRoute = false;  
                }                
                if(response.Estado == 99){
                    vm.loadAllRoute = true;
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
            });   */             
            getLocation();                  
        }
        function loadMap(paramLat,paramLon){
            vm.mymap = L.map('driver-map', {
                minZoom: 10
            }).setView([paramLat,paramLon], 15);            
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.mymap);

            if(vm.loadAllRoute){
               // loadAllLayers();
            }
            else{
                //loadLayersByPasaje();
            }
            
        }
      /*  function loadAllLayers(){
           $rootScope.layers = null;
           ResourcesService.GetParadas(vm.recorrido)
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
            var pointA = new L.LatLng(-34.8482141,-58.4470336);
            var pointB = new L.LatLng(-34.8471648,-58.4416045);
            var pointC = new L.LatLng(-34.846258,-58.4395102);
            var pointD = new L.LatLng(-34.8503334,-58.4410412);
            var pointList = [pointA, pointB,pointC,pointD];
            
            var firstpolyline = new L.Polyline(pointList, {
                color: 'blue',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            firstpolyline.addTo(vm.mymap);
            var marker1 = L.marker([-34.8482141,-58.4470336]).bindPopup('Parada Nro 1');
            var marker2 = L.marker([-34.8471648,-58.4416045]).bindPopup('Parada Nro 2');
            var marker3 = L.marker([-34.846258,-58.4395102]).bindPopup('Parada Nro 3');
            var marker4 = L.marker([-34.8503334,-58.4410412]).bindPopup('Parada Nro 4');

            L.layerGroup([marker1, marker2,marker3, marker4]).addTo(vm.mymap);
            vm.schedulesOk = false;
        }*/
       /* function loadLayersByPasaje(recorrido){
            $rootScope.layers = null;
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

        }*/
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
            var busIcon = L.icon({
                iconUrl: 'images/bus.png',
                shadowUrl: 'leaf-shadow.png',
            
                iconSize:     [58, 75], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            loadMap(position.coords.latitude,position.coords.longitude);

            //var lat=-34.669474;
           // var lon=-58.566162;
            //var marker = L.marker([lat,lon], {icon: busIcon}).addTo(vm.mymap);
            var marker = L.marker([position.coords.latitude,position.coords.longitude], {icon: busIcon}).addTo(vm.mymap);

            setInterval( function(){
                //var circle = L.marker([position.coords.latitude,position.coords.longitude], {icon: busIcon}).addTo(vm.mymap);
                
                    vm.mymap.removeLayer(marker);
                    console.log(position.coords.latitude,position.coords.longitude);

                
                vm.mymap._onResize(); 
                //marker = L.marker([lat,lon], {icon: busIcon}).addTo(vm.mymap);
                marker = L.marker([position.coords.latitude,position.coords.longitude], {icon: busIcon}).addTo(vm.mymap);


                vm.mymap.flyTo([position.coords.latitude,position.coords.longitude]);
                //vm.mymap.flyTo([lat, lon]);
                //lat = lat+0.0001;
                //lon = lon+0.0001;
               // marker++;
                



            }, 2000 )

            
        }



        function swipe() {
            $("#content").touchwipe({
                wipeLeft: function () {
                    window.location.replace('#!driver-bus');
                },
                wipeRight: function () {
                    window.location.replace('#!driver-home');

                },

                min_move_x: 200,
                min_move_y: 200,
                preventDefaultEvents: true
            });
        }
        swipe();

    }

    


})();