(function () {
    'use strict';

    angular
        .module('app')
        .factory('MapResourcesService', MapResourcesService);

        MapResourcesService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function MapResourcesService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.GetPasajeByDNI = GetPasajeByDNI;


        return service;

        function GetPasajeByDNI(dni) {

            var deferred = $q.defer();
            var urlGetPasajeByDNI ='https://www.mellevas.com.ar/api/pasajes/getPasajexDni';       
        
            var req = {
                method: 'GET',
                url: urlGetPasajeByDNI,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
            }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Usted no posee pasajes corrientes");
                });
                return deferred.promise;
        }


    }

})();