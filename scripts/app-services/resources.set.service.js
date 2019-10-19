(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesSetService', ResourcesSetService);

        ResourcesSetService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesSetService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.SetTiposDNI = GetTiposDNI;
        service.SetEmpresas = GetEmpresas;
        service.SetRamales = GetRamales;
        service.SetRecorridos = GetRecorridos;
        service.SetHorarios = GetHorarios;
        service.SetParadas = SetParadas;

        return service;

        function SetTiposDNI() {

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
        function SetEmpresas() {
            var deferred = $q.defer();
            var urlGetEmpresas ='http://www.mellevas.com.ar/api/empresas/getEmpresas';       

            var req = {
                method: 'GET',
                url: urlGetEmpresas,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
            }       

            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }
        function SetRamales(empresaID) {
            var deferred = $q.defer();
            var urlGetRamales ='http://www.mellevas.com.ar/api/ramales/GetRamalesxEmpresa?empresaid=' + empresaID + '&token=' + 2019;//$rootScope.globals.currentUser.token;       
            var req = {
                method: 'GET',
                url: urlGetRamales,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }       
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los ramales");
                });
                return deferred.promise;
        }
        function SetRecorridos(ramalID) {
            var deferred = $q.defer();
            var urlGetRecorridos ='http://www.mellevas.com.ar/api/recorridos/GetRecorridosxRamal?ramalid=' + ramalID + '&token=' + 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'GET',
                url: urlGetRecorridos,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }     
            
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los recorridos");
                });
                return deferred.promise;
        }
        function SetHorarios(recorridoID) {
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
                    deferred.reject("Error al cargar los horarios");
                });
                return deferred.promise;
        }
        function SetEmpresa(data) {
            var deferred = $q.defer();
            var urlSetEmpresa ='http://www.mellevas.com.ar/api/empresas/Create&token=' + 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'POST',
                url: urlSetEmpresa,
                data: data
               }     

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar los recorridos");
            });
            return deferred.promise;
    }

    }

})();