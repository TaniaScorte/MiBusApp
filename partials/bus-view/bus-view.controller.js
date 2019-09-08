(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusViewController', BusViewController);

        BusViewController.$inject = ['UserService', '$location','$rootScope'];
    function BusViewController(UserService, $location,$rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
                var mymap = L.map('mapid').setView([-34.8482141,-58.4470336], 13);            
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
                var marker1 = L.marker([-34.8482141,-58.4470336]).bindPopup('Parada Nro 1').addTo(mymap);
                var marker2 = L.marker([-34.8471648,-58.4416045]).bindPopup('Parada Nro 2').addTo(mymap);
                var marker3 = L.marker([-34.846258,-58.4395102]).bindPopup('Parada Nro 3').addTo(mymap);
                var marker4 = L.marker([-34.8503334,-58.4410412]).bindPopup('Parada Nro 4').addTo(mymap);

                L.layerGroup([marker1, marker2,marker3, marker4])
                .addTo(mymap);

                var circle = L.circle([-34.8482141,-58.4470336], {
                    color: 'black',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 300
                }).addTo(mymap);
            //loadCurrentUser();
           // loadAllUsers();
        }

        function loadCurrentUser() {

        }
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
           alert("Geolocation is not supported by this browser.");
          }
        }
        
        function showPosition(position) {
          vm.coords = {};  
          vm.coords.latitude =  position.coords.latitude ;
          vm.coords.longitude = position.coords.longitude;
        }
      /*  function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
*/
        function deleteUser(id) {
                    
        }
    }

})();