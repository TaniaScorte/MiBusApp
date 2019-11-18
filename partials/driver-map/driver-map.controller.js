(function () {
    'use strict';

    angular
        .module('app')
        .controller('DriverMapController', DriverMapController);

    DriverMapController.$inject = ['UserService', 'DriverService', '$rootScope', '$scope', '$window', '$location', 'ResourcesSetService', 'SweetAlert', 'ResourcesService'];

    function DriverMapController(UserService, DS, $rootScope, $scope, $window, $location, ResourcesSetService, SweetAlert, ResourcesService) {
        var vm = this;
        DS.setEstado(0);
        var viajeElegido = DS.getViajeElegido();
        var idViajeIniciado = DS.getIdViajeActual();
        var recorridoElegido = DS.getRecorridoElegido();
        $scope.iniciado;
        $scope.noElegido;
        reset();
        initController();
        reportLocation();
        function initController() {
            init();
            alternarBotones();
            loadBusStops();
            hayAlertaActiva();
        }
        //funciones de botones de pasajes

        $scope.ocuparLibre = function () {
            swal({ title: "", text: "", type: "success", timer: 1000, showConfirmButton: false })
        }

        $scope.ocuparComprado = function () {
            swal({ title: "", text: "", type: "success", timer: 1000, showConfirmButton: false })
        }

        $scope.liberar = function () {
            swal({ title: "", text: "", type: "success", timer: 1000, showConfirmButton: false })
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

                iconSize: [60, 45], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            vm.marker = L.marker([-34.671325, -58.563797], { icon: busIcon }).addTo(vm.mymap);

            initLocation();

            L.control.custom({
                position: 'topright',
                content:
                    '<button type="button" id="btnaviso" class="btn mt-4 btn-warning">' +
                    '    <i class="fa fa-exclamation-triangle"></i>' +
                    '</button>',
                classes: 'btn-group-vertical btn-group-sm',
                style:
                {
                    margin: '10px',
                    padding: '0px 0 0 0',
                    cursor: 'pointer',
                },
                datas:
                {
                    'foo': 'bar',
                },
                events:
                {
                    click: function () {
                        window.location.replace('#!driver-report');
                    },
                }
            })
                .addTo(vm.mymap);
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
            DS.init();
            DS.setIdViajeActual(viajeElegido)
            alternarBotones();
        }
        $scope.stopReport = function () { //detener reporte de posicion
            var al = DS.getIdAlerta();
            if (al == 'null' || al == null || al == undefined || al == 'undefined') {//si hay alerta no detiene
                $scope.noElegido = true;
                DS.setEstado(1);
                DS.stop();
                DS.setIdViajeActual(null);
                DS.setViajeElegido(null);
                DS.setRecorridoElegido(null);
                alternarBotones();
                swal("Su viaje ha sido finalizado", "Elija otro para continuar", "success");
            } else {
                SweetAlert.swal("Hay una alerta activa", "Cierrela antes de finalizar", "warning")
            }
        }
        function alternarBotones() {
            if (DS.getIniciado() == 'true') {
                $scope.btnIniciar = 'd-none';
                $scope.btnDetener = 'b-block';
                $scope.iniciado = true;
            }
            else {
                $scope.btnDetener = 'd-none';
                $scope.btnIniciar = 'd-block';
                $scope.iniciado = false;
            }
        }

        function reportLocation() {
            /*lo que esta adentro de getCurrent... no se ejecuta hasta que no se cambia la ubicacion
            si inicio el reporte y el contador esta en 0 entra en el if poniendo el contador en 1, hace el getCurrent pero no ejecuta lo de adentro hasta no cambiar de posicion
            si no cambia de posicion no entra en el if en el siguiente bucle, ya que el contador esta en 1,
            cuando el usuario se mueve se ejecuta lo de adentro del getCurrent que estaba en espera y se pone el contador en 0,
            el ciclo se vuelve a repetir.
            */
            setInterval(() => {
                // console.log('antes', DS.getEstado(),DS.getIniciado());
                if (DS.getIniciado() === 'true' && DS.getEstado() === '0') { //contador para manejar los hilos, para que no se creen muchos y se pongan en cola en cada intervalo
                    DS.setEstado(1);
                    var geo = navigator.geolocation.getCurrentPosition(function (position) {
                        console.log(position.coords.latitude, position.coords.longitude);// reportar ubicacion a la base de datos
                        DS.setLatLong({ lat: position.coords.latitude, long: position.coords.longitude });
                        var data = {
                            viajeId: viajeElegido,
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
                        DS.setEstado(0);
                    });
                    navigator.geolocation.clearWatch(geo);
                }
                // console.log(DS.getEstado());

            }, 5000);// setear el tiempo de espera enviar la ubicacion a la bd
        }

        function loadBusStops() {
            if (viajeElegido == null || viajeElegido == undefined || viajeElegido == 'null') {
                SweetAlert.swal('No ha elegido un viaje','' , "warning");
                $scope.noElegido = true;
            } else {
                console.log('cargando paradas del viaje', viajeElegido);
                var stopIcon = L.icon({
                    iconUrl: 'images/bstop.png',

                    iconSize: [35, 55], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                ResourcesService.GetParadasByRecorrido(recorridoElegido)
                    .then(function (response) {
                        var data = response;
                        for (var x = 0; x < data.length; x++) {
                            var lat = data[x].Latitud;
                            var lon = data[x].Longitud;
                            L.marker([lat, lon], { icon: stopIcon }).addTo(vm.mymap);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);

                    });

                $scope.noElegido = false;
            }
        }

        function reset() {
            $window.onbeforeunload = function () {
                if (DS.getIniciado() == 'false') {
                    DS.setViajeElegido(null);
                }
            };

        }
        function hayAlertaActiva() { //para mostrar o ocultar boton de aviso de alerta en el mapa
            var al = DS.getIdAlerta();
            var botonAlerta=document.getElementById('btnaviso');
            if (al == 'null' || al == null || al == undefined || al == 'undefined') {
                botonAlerta.classList.add('d-none');
            } else {
                botonAlerta.classList.remove('d-none');
            }
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