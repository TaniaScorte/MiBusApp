(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverMapController', DriverMapController);

    DriverMapController.$inject = ['UserService', '$rootScope', '$scope', '$window', '$location', 'ResourcesSetService'];


    function DriverMapController(UserService, $rootScope, $scope, $window, $location, ResourcesSetService) {
        var vm = this;
        vm.initReport = false;
        vm.cont = 0;

        initController();

        function initController() {

            init();
            reportLocation();
            $scope.btnDetener='d-none';

        }
        //funciones de botones de pasajes


        $scope.ocuparLibre = function () {
            alert('ocupar libre');
        }

        $scope.ocuparComprado = function () {
            alert('ocupar comprado');
        }

        $scope.liberar = function () {
            alert('liberar asiento');
        }


        //funciones de mapa y ubicación
        function init() {

            vm.mymap = L.map('driver-map', {
                minZoom: 10
            })

            vm.mymap.setView([-34.671325, -58.563797], 16);
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
            } watchID = false;
        }

        $scope.initReport = function () {  //iniciar reporte de posicion
            vm.initReport = true;
            $scope.btnIniciar='d-none';
            $scope.btnDetener='b-block';
        }

        $scope.stopReport = function () { //detener reporte de posicion
            vm.initReport = false;
            $scope.btnDetener='d-none';
            $scope.btnIniciar='d-block';
        }

        function reportLocation() {
            /*lo que esta adentro de getCurrent... no se ejecuta hasta que no se cambia la ubicacion
            si inicio el reporte y el contador esta en 0 entra en el if poniendo el contador en 1, hace el getCurrent pero no ejecuta lo de adentro hasta no cambiar de posicion
            si no cambia de posicion no entra en el if en el siguiente bucle, ya que el contador esta en 1,
            cuando el usuario se mueve se ejecuta lo de adentro del getCurrent que estaba en espera y se pone el contador en 0,
            el ciclo se vuelve a repetir.
            evaluar si es necesario initReport.
            */
            setInterval(() => {
                if (vm.initReport && vm.cont == 0) { //contador para manejar los hilos, para que no se creen muchos y se pongan en cola en cada intervalo
                    vm.cont = 1;
                    var geo = navigator.geolocation.getCurrentPosition(function (position) {
                         console.log(position.coords.latitude, position.coords.longitude);// reportar ubicacion a la base de datos
                        var data = {
//IMPORTANTE ELEGIR ID DE VIAJE                            
                            viajeId: 3,  
                            latitud: position.coords.latitude,
                            longitud: position.coords.longitude,
                            Token: "2019",
                        }
                        ResourcesSetService.SetTracking(data)  //guardo en la bd
                            .then(function (response) {
                                if (response.Estado == 0) {
                                    CreateUser(response.id);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);

                            });
                        vm.cont = 0;
                    });
                    navigator.geolocation.clearWatch(geo);
                }
               console.log(vm.cont);

            }, 15000);// setear el tiempo de espera enviar la ubicacion a la bd

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