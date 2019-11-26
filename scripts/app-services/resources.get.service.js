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
        service.GetHorariosByRecorrido = GetHorariosByRecorrido;
        service.GetParadasByRecorrido = GetParadasByRecorrido;
        service.GetParadas = GetParadas;
        service.GetRecorridosByEmpresaRamal = GetRecorridosByEmpresaRamal;
        service.GetVehiculosByEmpresa = GetVehiculosByEmpresa;
        service.GetMarcas = GetMarcas;
        service.GetModelos = GetModelos;
        service.GetModelosByMarca = GetModelosByMarca;
        service.GetDias = GetDias;
        service.GetViajesByRecorrido = GetViajesByRecorrido;
        service.GetRecorridosByEmpresa = GetRecorridosByEmpresa;
        service.GetUltimaPosicionByViaje=GetUltimaPosicionByViaje;
        service.GetViajesxChoferxDia=GetViajesxChoferxDia;
        service.GetColores = GetColores;
        service.GetHistorial = GetHistorial;
        service.GetViaje = GetViaje;
        service.GetAlertasxEmpresa=GetAlertasxEmpresa;
        service.GetAsientosLibresByViaje = GetAsientosLibresByViaje;
        return service;
        function GetAsientosLibresByViaje(viajeId) {
            var deferred = $q.defer();
            //var id = id;
            var url = 'https://www.mellevas.com.ar/api/pasaje/TotalAsientosLibresxViaje?viajeId=';
            var req = {
                method: 'GET',
                url: url + viajeId + "&token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            } 
            $http(req)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(error){
                deferred.reject("Error al obtener la capacidad");
            });
            return deferred.promise;
    }
        function GetAlertasxEmpresa(id) {
            var deferred = $q.defer();
            //var id = id;
            var url = 'https://www.mellevas.com.ar/api/alertas/getAlertasxEmpresa?EmpresaId=';
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
                deferred.reject("Error al obtener las alertas");
            });
            return deferred.promise;
    }
        function GetViaje(id) {
            var deferred = $q.defer();
            var id = id;
            var url = 'https://www.mellevas.com.ar/api/viajes/GetViaje?Id=';
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
                deferred.reject("Error al obtener el viaje");
            });
            return deferred.promise;
    }
        function GetViajesxChoferxDia(id) {
            var deferred = $q.defer();
            var id = id;
            var url = 'https://www.mellevas.com.ar/api/viajes/GetViajesxChoferxDia?choferID=';
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
                deferred.reject("Error al obtener los viajes del dia");
            });
            return deferred.promise;
    }
       
        function GetHistorial(userId) {            
            var deferred = $q.defer();
            var urlGet ='https://www.mellevas.com.ar/api/pasaje/GetPasajesHistoricoxUsuario?Token=' + 2019;       
            var req = {
                method: 'GET',
                url: urlGet +'&usuarioId='+userId,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }                
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar el historial");
                });
                return deferred.promise;
        }
        function GetColores() {            
            var deferred = $q.defer();
            var urlGet ='https://www.mellevas.com.ar/api/viajes/GetColores?Token=' + 2019;       
            var req = {
                method: 'GET',
                url: urlGet,
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

        
        function GetUltimaPosicionByViaje(id) {
            var deferred = $q.defer();
            var id = id;
            var url = 'https://www.mellevas.com.ar/api/trackingviaje/GetUltimaPosicionxViaje?viajeId=';
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
                    deferred.reject("Error al cargar la posicion");
                });
                return deferred.promise;
        }
        function GetViajesByRecorrido(recorridoID,empresaId) {            
            var deferred = $q.defer();
            var urlGetViajes ='https://www.mellevas.com.ar/api/viajes/GetViajesxEmpresaRecorrido';//$rootScope.globals.currentUser.token;       
            //var urlGetViajes = 'https://www.mellevas.com.ar/api/viajes/GetViajesxEmpresa?'
            var req = {
                method: 'GET',
                url: urlGetViajes + '?RecorridoId=' + recorridoID + "&EmpresaId=" + empresaId +'&Token=' + 2019,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                }
               }     
            
            $http(req)
                .then(function(response){
                    deferred.resolve(response.data);
                })
                .catch(function(error){
                    deferred.reject("Error al cargar los viajes");
                });
                return deferred.promise;
        }
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
        function GetRecorridosByEmpresaRamal(ramalId,empresaId) {            
            var deferred = $q.defer();
            var urlGetRecorrido ='https://www.mellevas.com.ar/api/recorridos/GetRecorridosxEmpresaRamal?EmpresaId=' + empresaId;       
            var req = {
                method: 'GET',
                url: urlGetRecorrido + "&token=" + 2019 +"&RamalId=" +ramalId,
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
        function GetRecorridosByEmpresa(empresaId) {            
            var deferred = $q.defer();
            var urlGetRecorrido ='https://www.mellevas.com.ar/api/recorridos/GetRecorridosxEmpresa?EmpresaId=' + empresaId;       
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
        function GetVehiculosByEmpresa(empresaId) {            
            var deferred = $q.defer();
            var urlGetVehiculo ='https://www.mellevas.com.ar/api/vehiculos/GetVehiculosxEmpresa?EmpresaId=' + empresaId;       
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