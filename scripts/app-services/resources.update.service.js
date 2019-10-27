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
            console.log(data);
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
                console.log(response);
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar los recorridos");
                console.log(error);
            });
            return deferred.promise;
        }
<<<<<<< HEAD
        function UpdateRamal(data) {
=======

        
>>>>>>> 9fdfbfbfb27a37a1cbf8796064a9c7cecadc8768
            var deferred = $q.defer();
            var urlRamales ='https://www.mellevas.com.ar/api/ramales/update'
            data.Token = 2019;//$rootScope.globals.currentUser.token;       
            var req = {
                method: 'POST',
                url: urlRamales,
                data: data
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