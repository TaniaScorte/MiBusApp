(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverMapController', DriverMapController);

    DriverMapController.$inject = ['UserService', '$rootScope', '$scope','$window','$location'];


    function DriverMapController(UserService, $rootScope, $scope,$window, $location) {
        var vm = this;
        var defer = $.Deferred();


        initController();

        function initController() {

            init();
        }
        function init() {

            vm.mymap = L.map('driver-map', {
                minZoom: 10
            })
            
            vm.mymap.setView([-34.671325, -58.563797], 15);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.mymap);


            var busIcon = L.icon({
                iconUrl: 'images/bus.png',

                iconSize: [58, 75], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });


            vm.marker = L.marker([-34.671325, -58.563797], { icon: busIcon }).addTo(vm.mymap);



        initLocation();
        



        }
 

        function initLocation() {

            if (navigator.geolocation) {
                var watchID = navigator.geolocation.watchPosition(function (position) {
                    vm.mymap.flyTo([position.coords.latitude, position.coords.longitude]);
                    vm.marker.setLatLng([position.coords.latitude, position.coords.longitude]);

                });

            } 
            else {
                alert("Geolocation is not supported by this browser.");
                return false;
            }watchID=false;
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