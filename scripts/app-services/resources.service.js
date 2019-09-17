(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesService', ResourcesService);

        ResourcesService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.GetTiposDNI = GetTiposDNI;

        return service;

        function GetTiposDNI() {
            var deferred = $q.defer();
            var urlGetTiposDNI ='http://api.mellevas.com.ar/tiposdni/getTiposDni';       
        
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


    }

})();