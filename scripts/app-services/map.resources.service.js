(function () {
    'use strict';

    angular
        .module('app')
        .factory('MapResourcesService', MapResourcesService);

        MapResourcesService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function MapResourcesService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.GetPasajeByUserId = GetPasajeByUserId;


        return service;

        function GetPasajeByUserId(id) {

            var deferred = $q.defer();
            var urlGetPasajeByUserId ='https://www.mellevas.com.ar/api/pasaje/GetpasajexUsuario?usuarioId=' + id;       
        
            var req = {
                method: 'GET',
                url: urlGetPasajeByUserId + "&Token=" + 2019 ,
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