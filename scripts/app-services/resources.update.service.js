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
        service.UpdateParada = UpdateParada;
        service.updateVehiculo = updateVehiculo;

        return service;
        function updateVehiculo(data) {
            var deferred = $q.defer();
            var urlUpdateVehiculo = 'https://www.mellevas.com.ar/api/vehiculos/Update';
            data.Token = 2019;//$rootScope.globals.currentUser.token; 
            var req = {
                method: 'POST',
                url: urlUpdateVehiculo,
                data: data
            }
            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al actualizar el item");
            });
            return deferred.promise;
        }
        function UpdateParada(data) {
            var deferred = $q.defer();
            var urlUpdateParada = 'https://www.mellevas.com.ar/api/paradas/Update';
            data.Token = 2019;//$rootScope.globals.currentUser.token; 
            var req = {
                method: 'POST',
                url: urlUpdateParada,
                data: data
            }
            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al actualizar la parada");
            });
            return deferred.promise;
        }
        function UpdateEmpresa(data) {
            var deferred = $q.defer();
            var url = 'https://www.mellevas.com.ar/api/empresas/Update';
            var req = {
                method: 'POST',
                url: url,
                data: data
            }
            $http(req)
            .then(function(response){
            //    console.log(response);
                deferred.resolve(response.data);
            })
            .catch(function(error){
                console.log(error);
                deferred.reject("Error al actualizar la empresa");
            });
            return deferred.promise;
        }

        function UpdateRamal(data) {
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
                    deferred.reject("Error al actualizar el ramal");
                });
                return deferred.promise;
        }
        function UpdateRecorrido(data) {
            var deferred = $q.defer();
            var urlRecorridos ='https://www.mellevas.com.ar/api/recorridos/update'
            data.Token = 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'POST',
                url: urlRecorridos,
                data:data
               }     
            
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al actualizar el recorrido");
                });
                return deferred.promise;
        }
        function UpdateHorario(data) {
            var deferred = $q.defer();
            var urlUpdateHorario = 'https://www.mellevas.com.ar/api/horarios/Update';
            data.Token = 2019;//$rootScope.globals.currentUser.token; 
            var req = {
                method: 'POST',
                url: urlUpdateHorario,
                data: data
            }
            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al actualizar el item");
            });
            return deferred.promise;
        }


    }

})();