(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesDeleteService', ResourcesDeleteService);

        ResourcesDeleteService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesDeleteService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.DeleteEmpresa = DeleteEmpresa;


        return service;

        function DeleteEmpresa(id) {
            var deferred = $q.defer();
            var urlDeleteEmpresa = 'https://www.mellevas.com.ar/api/empresas/Delete?id=';
            var req = {
                method: 'GET',
                url: urlDeleteEmpresa + id + "&token=" + 2019,
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
        

    }

})();