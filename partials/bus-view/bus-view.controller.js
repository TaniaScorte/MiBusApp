(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusViewController', BusViewController);

        BusViewController.$inject = ['UserService', '$location','$rootScope'];
    function BusViewController(UserService, $location,$rootScope) {
        var vm = this;

        initController();

        function initController() {
                vm.mymap = L.map('mapid', {
                    minZoom: 14
                }).setView([-34.8482141,-58.4470336], 13);            
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(vm.mymap);
                var marker1 = L.marker([-34.8482141,-58.4470336]).bindPopup('Parada Nro 1').addTo(vm.mymap);
                var marker2 = L.marker([-34.8471648,-58.4416045]).bindPopup('Parada Nro 2').addTo(vm.mymap);
                var marker3 = L.marker([-34.846258,-58.4395102]).bindPopup('Parada Nro 3').addTo(vm.mymap);
                var marker4 = L.marker([-34.8503334,-58.4410412]).bindPopup('Parada Nro 4').addTo(vm.mymap);

                L.layerGroup([marker1, marker2,marker3, marker4])
                .addTo(vm.mymap);
                getLocation();
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
            var circle = L.circle([position.coords.latitude,position.coords.longitude], {
                color: null,
                fillColor: '#f03',
                fillOpacity: 0.3,
                radius: 200
            }).addTo(vm.mymap);
        }
    }

})();