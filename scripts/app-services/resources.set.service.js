(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesSetService', ResourcesSetService);

        ResourcesSetService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesSetService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.SetTipoDNI = SetTipoDNI;
        service.SetEmpresa = SetEmpresa;
        service.SetRamal = SetRamal;
        service.SetRecorrido = SetRecorrido;
        service.SetHorario = SetHorario;
        service.SetParada = SetParada;
        service.SetVehiculo = SetVehiculo;
        service.SetViaje = SetViaje;
        service.SetTracking = SetTracking;
        service.SetAlerta = SetAlerta;
        return service;
        function SetAlerta(data) {
            var deferred = $q.defer();
            var urlSetAlerta ='https://www.mellevas.com.ar/api/alertas/Create?token=' + 2019;//$rootScope.globals.currentUser.token;         
            var req = {
                method: 'POST',
                url: urlSetAlerta,
                data: data
            }     
            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                console.log(error);
                deferred.reject("Error al enviar alerta");
            });
            return deferred.promise;
        }
        function SetTracking(data) {
            var deferred = $q.defer();
            var urlSetTracking ='https://www.mellevas.com.ar/api/trackingviaje/Create?token=' + 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'POST',
                url: urlSetTracking,
                data: data
            }     
            $http(req)
            .then(function(response){
              // console.log(response);
            })
            .catch(function(error){
                deferred.reject("Error al guardar los parametros de ubicacion");
            });
            return deferred.promise;
        }
        function SetViaje(data) {
            var deferred = $q.defer();
            var urlSetViaje ='https://www.mellevas.com.ar/api/viajes/Create';//$rootScope.globals.currentUser.token;       
            data.Token = 2019;
            var req = {
                method: 'POST',
                url: urlSetViaje,
                data: data
            }     

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar el item");
            });
            return deferred.promise;
        }
        function SetHorario(data) {
            var deferred = $q.defer();
            var urlSetHorario ='https://www.mellevas.com.ar/api/horarios/Create';//$rootScope.globals.currentUser.token;       
            data.Token = 2019;
            var req = {
                method: 'POST',
                url: urlSetHorario,
                data: data
            }     

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar el item");
            });
            return deferred.promise;
        }
        function SetVehiculo(data) {
            var deferred = $q.defer();
            var urlSetVehiculo ='https://www.mellevas.com.ar/api/vehiculos/Create';//$rootScope.globals.currentUser.token;       
            data.Token = 2019;
            var req = {
                method: 'POST',
                url: urlSetVehiculo,
                data: data
            }     

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar el vehiculo");
            });
            return deferred.promise;
        }
        function SetParada(data) {
            var deferred = $q.defer();
            var urlSetParada ='https://www.mellevas.com.ar/api/paradas/Create?token=' + 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'POST',
                url: urlSetParada,
                data: data
            }     

            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al cargar las paradas");
            });
            return deferred.promise;
        }
        function SetTipoDNI() {

            var deferred = $q.defer();
            var urlGetTiposDNI ='https://www.mellevas.com.ar/api/tiposdni/getTiposDni';       
        
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
        function SetEmpresa(data) {
            var deferred = $q.defer();
            var urlSetEmpresa ='https://www.mellevas.com.ar/api/empresas/Create?token=' + 2019;//$rootScope.globals.currentUser.token;       
            
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
                deferred.reject("Error al crear la empresa");
            });
            return deferred.promise;
        }
        function SetRamal(data) {
            var deferred = $q.defer();
            var urlSetRamales ='https://www.mellevas.com.ar/api/ramales/create' ;//$rootScope.globals.currentUser.token;       
            data.Token = 2019;
            var req = {
                method: 'POST',
                url: urlSetRamales,
                data: data
               }       
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al guardar el ramal");
                });
                return deferred.promise;
        }
        function SetRecorrido(data) {
            var deferred = $q.defer();
            var urlSetRecorridos ='https://www.mellevas.com.ar/api/recorridos/create'; //$rootScope.globals.currentUser.token;       
            data.Token = 2019;
            var req = {
                method: 'POST',
                url: urlSetRecorridos,
                data : data
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