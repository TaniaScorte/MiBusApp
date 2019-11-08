(function () {
    'use strict';

    angular
        .module('app')
        .factory('ResourcesService', ResourcesService);

        ResourcesService.$inject = ['$http','$q', '$cookies', '$rootScope', '$timeout'];
    function ResourcesService($http,$q ,$cookies, $rootScope, $timeout) {
        var service = {};

        service.GetTiposDNI = GetTiposDNI;
        service.GetEmpresas = GetEmpresas;
        service.GetEmpresa = GetEmpresa;
        service.GetRamalesByEmpresa = GetRamalesByEmpresa;
        service.GetRecorridosByRamal = GetRecorridosByRamal;
        service.GetHorariosByRecorrido = GetHorariosByRecorrido;
        service.GetParadasByRecorrido = GetParadasByRecorrido;
        service.GetParadas = GetParadas;
        service.GetRecorridosByEmpresa = GetRecorridosByEmpresa;
        service.GetVehiculosByEmpresa = GetVehiculosByEmpresa;
        service.GetMarcas = GetMarcas;
        service.GetModelos = GetModelos;
        service.GetModelosByMarca = GetModelosByMarca;
        service.GetDias = GetDias;
        return service;
        function GetDias() {            
            var deferred = $q.defer();
            var urlGetModelos ='https://www.mellevas.com.ar/api/dias/GetDias?Token=' + 2019;       
            var req = {
                method: 'GET',
                url: urlGetModelos,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las marcas");
                });
                return deferred.promise;
        }
        function GetModelos() {            
            var deferred = $q.defer();
            var urlGetModelos ='https://www.mellevas.com.ar/api/ModelosVehiculo/GetModelosVehiculo?Token=' + 2019;       
            var req = {
                method: 'GET',
                url: urlGetModelos,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las marcas");
                });
                return deferred.promise;
        }
        function GetMarcas() {            
            var deferred = $q.defer();
            var urlGetMarcas ='https://www.mellevas.com.ar/api/MarcasVehiculo/GetMarcasVehiculo';       
            var req = {
                method: 'GET',
                url: urlGetMarcas + "?Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las marcas");
                });
                return deferred.promise;
        }
        function GetModelosByMarca(id) {            
            var deferred = $q.defer();
            var urlGetModelos ='https://www.mellevas.com.ar/api/ModelosVehiculo/GetModelosVehiculoxMarca?marcaId=' + id;             
            var req = {
                method: 'GET',
                url: urlGetModelos + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los modelos");
                });
                return deferred.promise;
        }
        function GetRecorridosByEmpresa() {            
            var deferred = $q.defer();
            var urlGetRecorrido ='https://www.mellevas.com.ar/api/recorridos/GetRecorridosxEmpresa?EmpresaId=' + $rootScope.globals.currentUser.userData.EmpresaId;       
            var req = {
                method: 'GET',
                url: urlGetRecorrido + "&token=" + 2019,
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
        function GetVehiculosByEmpresa() {            
            var deferred = $q.defer();
            var urlGetVehiculo ='https://www.mellevas.com.ar/api/vehiculos/GetVehiculosxEmpresa?EmpresaId=' + $rootScope.globals.currentUser.userData.EmpresaId;       
            var req = {
                method: 'GET',
                url: urlGetVehiculo + "&Token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los vehiculos");
                });
                return deferred.promise;
        }
        function GetTiposDNI() {

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
        function GetEmpresas() {
            var deferred = $q.defer();
            var urlGetEmpresas ='https://www.mellevas.com.ar/api/empresas/getEmpresas';       

            var req = {
                method: 'GET',
                url: urlGetEmpresas,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
            }       

            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar las empresas");
                });
                return deferred.promise;
        }
        function GetEmpresa(id) {
            var deferred = $q.defer();
            var id = id;
            var url = 'https://www.mellevas.com.ar/api/empresas/getEmpresa?id=';
            var req = {
                method: 'GET',
                url: url + id + "&token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }

            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar la empresa");
                });
                return deferred.promise;
        }
        function GetRamalesByEmpresa(empresaID) {
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
        function GetRecorridosByRamal(ramalID) {
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
        function GetHorariosByRecorrido(recorridoID) {     
            var deferred = $q.defer();
            var urlGetHorarios ='https://www.mellevas.com.ar/api/horarios/GetHorariosxRecorrido?recorridoId=' + recorridoID + '&token=' + 2019;       
            var req = {
                method: 'GET',
                url: urlGetHorarios,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los horarios");
                });
                return deferred.promise;
        }
        function GetParadasByRecorrido(recorridoID) {
            var deferred = $q.defer();
            var urlGetParadas ='https://www.mellevas.com.ar/api/paradas/GetParadasxRecorrido?recorridoId=' + recorridoID + '&token=' + 2019;//$rootScope.globals.currentUser.token;       
            
            var req = {
                method: 'GET',
                url: urlGetParadas,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
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
        function GetParadas(){
            var deferred = $q.defer();
            var urlGetParadas ='https://www.mellevas.com.ar/api/paradas/getParadas?token=' + 2019;//$rootScope.globals.currentUser.token;       
        
            var req = {
                method: 'GET',
                url: urlGetParadas,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
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

    }

})();