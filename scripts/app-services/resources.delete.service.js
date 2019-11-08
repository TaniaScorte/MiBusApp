(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesDeleteService', ResourcesDeleteService);

        ResourcesDeleteService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesDeleteService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.DeleteEmpresa = DeleteEmpresa;
        service.DeleteRamal = DeleteRamal;
        service.DeleteRecorrido =DeleteRecorrido;
        service.DeleteParada = DeleteParada;
        service.DeleteVehiculo = DeleteVehiculo;
        service.DeleteHorario = DeleteHorario;
        return service;
        
        function DeleteHorario(id) {
            var deferred = $q.defer();
            var urlDelete = 'https://www.mellevas.com.ar/api/horarios/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDelete + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }
        function DeleteVehiculo(id) {
            var deferred = $q.defer();
            var urlDeleteVehiculo = 'https://www.mellevas.com.ar/api/vehiculos/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDeleteVehiculo + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }
        function DeleteParada(id) {
            var deferred = $q.defer();
            var urlDeleteParada = 'https://www.mellevas.com.ar/api/paradas/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDeleteParada + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }
        function DeleteEmpresa(id) {
            var deferred = $q.defer();
            var urlDeleteEmpresa = 'https://www.mellevas.com.ar/api/empresas/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDeleteEmpresa + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                //console.log(response);
                deferred.resolve(response.data);
            })
            .catch(function(error){
                console.log(error);

                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }
        function DeleteRamal(id) {
            var deferred = $q.defer();
            var urlDeleteRamal = 'https://www.mellevas.com.ar/api/ramales/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDeleteRamal + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }
        function DeleteRecorrido(id) {
            var deferred = $q.defer();
            var urlDeleteRecorrido = 'https://www.mellevas.com.ar/api/recorridos/Delete?Id=';
            var req = {
                method: 'GET',
                url: urlDeleteRecorrido + id + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }  

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Ha ocurrido un error");
            });
            return deferred.promise;
        }

    }

})();