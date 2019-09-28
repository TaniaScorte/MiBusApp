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
            swipe();
            vm.mymap = L.map('driver-map', {
                minZoom: 14
            }).setView([-34.669864, -58.563957], 13);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.mymap);
            var marker1 = L.marker([-34.671424, -58.563413]).bindPopup('Parada Nro 1').addTo(vm.mymap);
            var marker2 = L.marker([-34.674740, -58.558820]).bindPopup('Parada Nro 2').addTo(vm.mymap);
            var marker3 = L.marker([-34.676466, -58.565067]).bindPopup('Parada Nro 3').addTo(vm.mymap);
            var marker4 = L.marker([-34.680913, -58.569781]).bindPopup('Parada Nro 4').addTo(vm.mymap);

            L.layerGroup([marker1, marker2, marker3, marker4])
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
            var circle = L.circle([position.coords.latitude, position.coords.longitude], {
                color: null,
                fillColor: '#f03',
                fillOpacity: 0.3,
                radius: 200
            }).addTo(vm.mymap);
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

    }

    


})();