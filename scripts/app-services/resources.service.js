(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesService', ResourcesService);

        ResourcesService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.GetTiposDNI = GetTiposDNI;
        service.GetEmpresas = GetEmpresas;
        service.GetRamalesByEmpresa = GetRamalesByEmpresa;
        service.GetRecorridosByRamal = GetRecorridosByRamal;
        service.GetHorariosByRecorrido =GetHorariosByRecorrido;

        return service;

        function GetTiposDNI() {
            var deferred = $q.defer();
            var urlGetTiposDNI ='http://www.mellevas.com.ar/api/tiposdni/getTiposDni';       
        
            var req = {
                method: 'GET',
                url: urlGetTiposDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
            }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los tipos de dni");
                });
                return deferred.promise;
        }
        function GetEmpresas() {
            var deferred = $q.defer();
            var urlGetJson ='scripts/jsonData/empresa.json';       
        /*
            var req = {
                method: 'GET',
                url: urlGetTiposDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }
        */       
            $http.get(urlGetJson)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }
        function GetRamalesByEmpresa(empresaID) {
            var deferred = $q.defer();
            var urlGetJson ='scripts/jsonData/ramalesByEmpresa.json';       
        /*
            var req = {
                method: 'GET',
                url: urlGetTiposDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }
        */       
            $http.get(urlGetJson)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }
        function GetRecorridosByRamal(ramalID) {
            var deferred = $q.defer();
            var urlGetJson ='scripts/jsonData/recorridosByRamal.json';       
        /*
            var req = {
                method: 'GET',
                url: urlGetTiposDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }
        */       
            $http.get(urlGetJson)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }
        function GetHorariosByRecorrido(recorridoID) {
            var deferred = $q.defer();
            var urlGetJson ='scripts/jsonData/horariosByRecorrido.json';       
        /*
            var req = {
                method: 'GET',
                url: urlGetTiposDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }
        */       
            $http.get(urlGetJson)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }


    }

})();