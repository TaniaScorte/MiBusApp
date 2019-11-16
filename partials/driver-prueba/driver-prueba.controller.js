(function () {
    'use strict';
    //despues borrar
    angular
        .module('app')
        .controller('DriverPruebaController', DriverPruebaController);

    DriverPruebaController.$inject = ['ResourcesService', '$scope'];


    function DriverPruebaController(ResourcesService, $scope) {

        var iniciar = false;

        var mymap = L.map('mapa', {
            minZoom: 8
        })
        mymap.setView([-34.671325, -58.563797], 16);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mymap);

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

            var marker = L.marker([-34.671325, -58.563797], { icon: busIcon }).addTo(mymap);
            var marker2 = L.marker([-34.671325, -58.563797], { icon: pIcon }).addTo(mymap);



            if (navigator.geolocation) {
                var watchID = navigator.geolocation.watchPosition(function (position) {
                    mymap.flyTo([position.coords.latitude, position.coords.longitude]);
                    marker2.setLatLng([position.coords.latitude, position.coords.longitude]);

                });

            }
            else {
                alert("Geolocation is not supported by this browser.");
                return false;
            }




        setInterval(() => {
            if(iniciar){
                
            
            ResourcesService.GetUltimaPosicionByViaje(3)
            .then(function (response) {
                console.log(response.Latitud, response.Longitud);
                marker.setLatLng([response.Latitud, response.Longitud]);

            })
            .catch(function (error) {
                console.log(error);
            });

        }

        }, 3000);


        $scope.iniciar=function(){
            iniciar=true;
        }
        $scope.detener = function(){
            iniciar=false;
        }
        
    }

})();
