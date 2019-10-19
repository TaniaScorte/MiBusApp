(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesUpdateService', ResourcesUpdateService);

        ResourcesUpdateService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesUpdateService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.UpdateEmpresa = UpdateEmpresa;
        service.UpdateRamal = UpdateRamal;
        service.UpdateRecorrido = UpdateRecorrido;
        service.UpdateHorario = UpdateHorario;

        return service;

        function UpdateEmpresa(id) {
            var deferred = $q.defer();
            var urlDeleteEmpresa = 'https://www.mellevas.com.ar/api/empresas/Delete?id=';
            var req = {
                method: 'POST',
                url: urlDeleteEmpresa + id + "&token=" + 2019,
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
        function UpdateRamal(empresaID) {
            var deferred = $q.defer();
            var urlGetRamales ='https://www.mellevas.com.ar/api/ramales/GetRamalesxEmpresa?empresaid=' + empresaID + '&token=' + 2019;//$rootScope.globals.currentUser.token;       
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
        function UpdateRecorrido(ramalID) {
            var deferred = $q.defer();
            var urlGetRecorridos ='https://www.mellevas.com.ar/api/recorridos/GetRecorridosxRamal?ramalid=' + ramalID + '&token=' + 2019;//$rootScope.globals.currentUser.token;       
            
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
        function UpdateHorario(recorridoID) {
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


    }

})();