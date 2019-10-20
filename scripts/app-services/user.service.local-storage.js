(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

        UserService.$inject = ['$timeout', '$filter', '$q','$http','$rootScope'];
        function UserService($timeout, $filter, $q,$http,$rootScope) {
        var service = {};

        service.GetAllUsers = GetAllUsers;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetAllUserByEmpresaRol = GetAllUserByEmpresaRol;

        return service;
      
        function GetAllUserByEmpresaRol(rolId) {
            var deferred = $q.defer();
            var urlUserGetEmpresaRol ='https://www.mellevas.com.ar/api/usuarios/getusuarios?empresaid=';   
            
            var req = {
                method: 'GET',
                url: urlUserGetEmpresaRol + $rootScope.globals.currentUser.userData.EmpresaId + "&rolId=" + rolId+ "&token=" + 2019,//$rootScope.globals.currentUser.token,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los choferes");
                });
                return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var urlUserGetId ='https://www.mellevas.com.ar/api/usuarios/getusuario?id=';   
            
            var req = {
                method: 'GET',
                url: urlUserGetId + id + "&token=" + 2019,//$rootScope.globals.currentUser.token,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response);
                })
                .catch(function(error){
                    deferred.reject("Error al iniciar");
                });
                return deferred.promise;
        }

        function Create(data) {
            var deferred = $q.defer();
            var urlUserCreate ='https://www.mellevas.com.ar/api/usuarios/create'; 
            data.token = 2019;//$rootScope.globals.currentUser.token;              
            var req = {
                method: 'POST',
                url: urlUserCreate,
                data: data
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al crear el usuario");
                });
                return deferred.promise;
        }

        function Update(data) {
            var deferred = $q.defer();
            var urlUserUpdate ='https://www.mellevas.com.ar/api/usuarios/update?';  
            var req = {
                method: 'POST',
                url: urlUserUpdate + "token=" + 2019,
                data: data
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al actualizar el usuario");
                });
                return deferred.promise;
        }

        function GetAllUsers() {
            var deferred = $q.defer();
            var urlGetAllUserst ='https://www.mellevas.com.ar/api/usuarios/getusuarios';   
            
            var req = {
                method: 'GET',
                url: urlGetAllUsers + "&token=" + 2019,//$rootScope.globals.currentUser.token,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los usuarios");
                });
                return deferred.promise;
        }
        function Delete(id) {
            var deferred = $q.defer();
            var urlUserDeleteId ='https://www.mellevas.com.ar/api/usuarios/delete?id=';   
            
            var req = {
                method: 'GET',
                url: urlUserDeleteId + id + "&token=" + 2019,//$rootScope.globals.currentUser.token,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
               }
               
            $http(req)
                .then(function(response){
                    deferred.resolve(response);
                })
                .catch(function(error){
                    deferred.reject("Error al eliminar el usuario");
                });
                return deferred.promise;
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();