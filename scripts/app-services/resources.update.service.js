(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesUpdateService', ResourcesUpdateService);

        ResourcesUpdateService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesUpdateService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.UpdateRamal = UpdateRamal;
        service.UpdateRecorrido = UpdateRecorrido;
        service.UpdateHorario = UpdateHorario;
        service.UpdateEmpresa = UpdateEmpresa;

        return service;

        function UpdateEmpresa(data) {
            console.log(data);
            var deferred = $q.defer();
            var url = 'https://www.mellevas.com.ar/api/empresas/Update';
            var req = {
                method: 'POST',
                url: url,
                data: data
            }
            $http(req)
            .then(function(response){
                console.log(response);
                deferred.resolve(response.data);
            })
            .catch(function(error){
                console.log(error);
                deferred.reject("Error al actualizar la empresa");
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