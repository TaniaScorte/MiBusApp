(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalBusStopController', ModalBusStopController);

        ModalBusStopController.$inject = ['$uibModalInstance', 'busStop', '$scope','$rootScope','ResourcesSetService','SweetAlert','ResourcesUpdateService','ResourcesDeleteService','$filter'];


    function ModalBusStopController($uibModalInstance, busStop, $scope,$rootScope,ResourcesSetService,SweetAlert,ResourcesUpdateService,ResourcesDeleteService,$filter) {
    var vm = $scope;
    if(busStop.create){
        vm.busstop = {};
        vm.busstop.route = $filter('filter')($rootScope.routes, {Id:  busStop.RecorridoId})[0];
    }
    if(!busStop.delete){
        getLocation(); 
    }

    var marker;
    function onMapClick(e) {
        if(marker){
            vm.mymap.removeLayer(marker);
            marker = new L.Marker(e.latlng, {draggable:true});
            vm.mymap.addLayer(marker);
            if(busStop.edit){
                marker.bindPopup(vm.busStopEdit.name +"-"+ vm.busStopEdit.number).openPopup();
            }
            else{
                marker.bindPopup(vm.busstop.name +"-"+ vm.busstop.number).openPopup();
            }
            
        }
        else{
            marker = new L.Marker(e.latlng, {draggable:true});
            vm.mymap.addLayer(marker);
            if(busStop.edit){
                marker.bindPopup(vm.busStopEdit.name +"-"+ vm.busStopEdit.number).openPopup();
            }
            else{
                marker.bindPopup(vm.busstop.name +"-"+ vm.busstop.number).openPopup();
            }
        }
        vm.latitude = e.latlng.lat;
        vm.longitude = e.latlng.lng;
    };
    function loadMap(paramLat,paramLon){
        vm.mymap = L.map('mapid', {
           // minZoom: 14
        }).setView([paramLat,paramLon], 13);            
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(vm.mymap);
       vm.mymap.on('click', onMapClick);
       vm.popup = L.popup();
       if(busStop.edit){
           onMapClick(vm.coords);
       }
    }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(loadAreaCicle);
        } 
        else {
          alert("Geolocation is not supported by this browser.");
          return false;
        }
      }
      
      function loadAreaCicle(position) {
          loadMap(position.coords.latitude,position.coords.longitude);
          var circle = L.circle([position.coords.latitude,position.coords.longitude], {
              color: null,
              fillColor: '#f03',
              fillOpacity: 0.3,
              radius: 200
          }).addTo(vm.mymap);
      }
    vm.okBusStopCreate = function () {
        $uibModalInstance.close();
    };  
    vm.cancelBusStopsModal = function () {
        busStop.delete = false;
        busStop.edit = false;
        busStop.create = false;
        $uibModalInstance.close();
    };  
    if(busStop.edit){
        vm.busStopEdit = {};
        vm.busStopEdit.name = busStop.Nombre;
        vm.busStopEdit.duration = Number(busStop.Duracion);
        vm.busStopEdit.number = busStop.Numero;
        vm.busStopEdit.description = busStop.Descripcion;
        vm.coords = {};
        vm.coords.latlng ={};
        vm.coords.latlng.lat = busStop.Latitud;
        vm.coords.latlng.lng = busStop.Longitud;
    }
    if(busStop.delete){
        vm.idBusStop = busStop.Id;
        vm.busStopDelete = busStop;
    }
    function validationDataRequired(data){
        if(busStop.edit){
            if(data.RecorridoId 
                && data.Id
                && data.Numero && data.Numero <= 9999
                && data.Nombre && data.Nombre.length <= 30 
                && data.Descripcion && data.Descripcion.length <= 60
                && data.Latitud && data.Longitud
                && data.Duracion != undefined && data.Duracion < 99 ){
                    return true;
                }
        }
        if(busStop.create){
            if(data.RecorridoId 
                && data.Numero && data.Numero <= 9999
                && data.Nombre && data.Nombre.length <= 30 
                && data.Descripcion && data.Descripcion.length <= 60
                && data.Latitud && data.Longitud
                && data.Duracion != undefined && data.Duracion < 99 ){
                    return true;
                }
        }
        else{
            return false;
        }
    }
    vm.setBusStops = function(busStopCreate) {
        vm.dataLoading = true;
        var data ={
            RecorridoId: busStopCreate.route.Id,
            Numero:busStopCreate.number,
            Nombre: busStopCreate.name,
            Descripcion: busStopCreate.description,
            Latitud: vm.latitude,
            Longitud:vm.longitude,
            Duracion: busStopCreate.duration
        }
        if(validationDataRequired(data)){        
            ResourcesSetService.SetParada(data)
                .then(function (response) {
                    if (response.Estado == 0){
                        SweetAlert.swal ({
                            type: "success", 
                            title: "La operacion se ha realizado con exito",
                            text: "El item ha sido creado",
                            confirmButtonAriaLabel: 'Ok',
                        },
                        function(isConfirm) {
                        if (isConfirm) {
                            vm.dataLoading = false;
                            $rootScope.$emit("refreshListBusStops",busStopCreate.route.Id);
                            vm.cancelBusStopsModal();
                        } 
                        });               
                        return;
                    } 
                    else {
                        vm.dataLoading = false;
                        SweetAlert.swal ({
                            type: "error", 
                            title: "Error",
                            text: "Error al crear el item",
                            confirmButtonAriaLabel: 'Ok',
                        });
                    }
                })
                .catch(function(error){
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });
        }
        else{
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "warning", 
                title: "Verifique",
                text: "Los datos ingresados son incorrectos o incompletos",
                confirmButtonAriaLabel: 'Ok',
            });
        }
    }
    function clearRegister(){
        vm.user=null;
    }
    vm.updateBusStops = function(busStopEdit){
        vm.dataLoading = true;
        var data ={
            Id : busStop.Id,
            RecorridoId: busStop.RecorridoId,
            Numero:busStopEdit.number,
            Nombre: busStopEdit.name,
            Descripcion: busStopEdit.description,
            Latitud: vm.latitude,
            Longitud:vm.longitude,
            Duracion: busStopEdit.duration
            //EmpresaId:  $rootScope.globals.currentUser.userData.EmpresaId
        }
        if(validationDataRequired(data)){   
        ResourcesUpdateService.UpdateParada(data)
            .then(function (response) {
                if (response.Estado == 0){
                    SweetAlert.swal ({
                        type: "success", 
                        title: "La operacion se ha realizado con exito",
                        text: "El item ha sido actualizado",
                        confirmButtonAriaLabel: 'Ok',
                    },
                    function(isConfirm) {
                    if (isConfirm) {
                        vm.dataLoading = false;
                        $rootScope.$emit("refreshListBusStops",busStop.RecorridoId);
                        vm.cancelBusStopsModal();
                    } 
                    });               
                    return;
                } 
                else {
                    vm.dataLoading = false;
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: "Error al actualizar el item",
                        confirmButtonAriaLabel: 'Ok',
                    });
                }
            })
            .catch(function(error){
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: error,
                    confirmButtonAriaLabel: 'Ok',
                });
            });
        }
        else{
            vm.dataLoading = false;
            SweetAlert.swal ({
                type: "warning", 
                title: "Verifique",
                text: "Los datos ingresados son incorrectos o incompletos",
                confirmButtonAriaLabel: 'Ok',
            });
        }

    }
    vm.deleteBusStops = function(){
        vm.dataLoading = true;
        ResourcesDeleteService.DeleteParada(vm.idBusStop)
        .then(function (response) {
            if (response.Estado == 0){
                SweetAlert.swal ({
                    type: "success", 
                    title: "La operacion se ha realizado con exito",
                    text: "El item ha sido eliminado",
                    confirmButtonAriaLabel: 'Ok',
                },
                function(isConfirm) {
                if (isConfirm) {
                    vm.dataLoading = false;
                    $rootScope.$emit("refreshListBusStops",busStop.RecorridoId);
                    vm.cancelBusStopsModal();
                } 
                });               
                return;                
            } 
            else {
                vm.dataLoading = false;
                SweetAlert.swal ({
                    type: "error", 
                    title: "Error",
                    text: "Error al eliminar",
                    confirmButtonAriaLabel: 'Ok',
                });
            }
        })
        .catch(function(error){
            SweetAlert.swal ({
                type: "error", 
                title: "Error",
                text: error,
                confirmButtonAriaLabel: 'Ok',
            });
            vm.dataLoading = false;
        });
    }


}

})();
