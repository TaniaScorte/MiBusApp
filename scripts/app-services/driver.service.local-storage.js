(function () {
    'use strict';

    angular
        .module('app')
        .factory('DriverService', DriverService);

        DriverService.$inject = ['$timeout', '$filter', '$q','$http','$rootScope'];
        function DriverService($timeout, $filter, $q,$http,$rootScope) {
        var service = {};

        service.getEstado = getEstado;
        service.setEstado = setEstado;
        service.setViaje= setViaje;
        service.getViaje= getViaje;
        service.Delete= Delete;
        service.init=init;
        service.stop=stop;
        service.getIniciado=getIniciado;
        service.getIdViajeActual = getIdViajeActual;
        service.setIdViajeActual= setIdViajeActual;
        service.getViajeElegido=getViajeElegido;
        service.setViajeElegido=setViajeElegido;
        service.setLatLong=setLatLong;
        service.getLatLong=getLatLong;

        return service;
      
        function setEstado(valor) {
            localStorage.setItem('E', valor);
        }
        function getEstado() {
            return localStorage.getItem('E');
        }
        function setViaje(objeto) {
            var objetoJ = JSON.stringify(objeto)
            localStorage.setItem('V',objetoJ);
        }
        function getViaje() {
            var objeto = localStorage.getItem('V');
            var res=JSON.parse(objeto);
            return res;
        }
        function Delete(clave) {
            localStorage.removeItem(clave);
        }
        function init() {
            localStorage.setItem('V', true);
        }
        function stop() {
            localStorage.setItem('V', false);
        }
        function getIniciado() {
            return localStorage.getItem('V');
        }
        function setIdViajeActual(id){
            localStorage.setItem('IDV',id);
        }
        function getIdViajeActual(){
            return localStorage.getItem('IDV');
        }
        function setViajeElegido(id){
            localStorage.setItem('IDVE',id);
        }
        function getViajeElegido(){
            return localStorage.getItem('IDVE');
        }
        function setLatLong(objeto){
            var objetoJ = JSON.stringify(objeto)
            localStorage.setItem('LatLong',objetoJ);
        }
        function getLatLong(){
            var objeto = localStorage.getItem('LatLong');
            var res=JSON.parse(objeto);
            return res;
        }

    }
})();