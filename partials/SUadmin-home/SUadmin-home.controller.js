(function () {
    'use strict';

    angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);

    SUAdminHomeController.$inject = ['UserService', '$rootScope', '$http', '$scope', '$uibModal'];


    function SUAdminHomeController(UserService, $rootScope, $http, $scope, $uibModal) {
        var vm = this;

        $scope.emp2 = 'hola';
        getEmpresas();
       // getEmpresa();


        function getEmpresas() {
            var url = 'http://www.mellevas.com.ar/api/empresas/getEmpresas';
            var data = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            $http(data)
                .then(function (response) {
                    $scope.empresas = response.data;
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        $scope.nueva = function(){
            var url ='http://www.mellevas.com.ar/api/empresas/Create';   
            var data ={
                Nombre: $scope.txtNombreNew,
                Direccion: $scope.txtDirNew,
                Token: "2019",
            }
   
       var data = {
           method: 'post',
           url: url,
           data:data
          }
          
       $http(data)
           .then(function(response){
          console.log(response);
           })
           .catch(function(error){
               console.log(error);
           });


       }


        $scope.editar = function(id){
             var url ='http://www.mellevas.com.ar/api/empresas/getEmpresa?id=';   
    
        var data = {
            method: 'GET',
            url: url + id + "&token=" + 2019,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
           }
           
        $http(data)
            .then(function(response){
           console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });


        }

        $scope.eliminar = function(id){
            var url ='http://www.mellevas.com.ar/api/empresas/getEmpresa?id=';   
   
       var data = {
           method: 'GET',
           url: url + id + "&token=" + 2019,
           headers: {
               'Content-Type': 'application/json; charset=utf-8'
           }
          }
          
       $http(data)
           .then(function(response){
          console.log(response);
           })
           .catch(function(error){
               console.log(error);
           });


       }



        /* var url ='http://www.mellevas.com.ar/api/empresas/getEmpresa?id=';   
        var id = '1';
    
        var data = {
            method: 'GET',
            url: url + id + "&token=" + 2019,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
           }
           
        $http(data)
            .then(function(response){
           console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
*/

    }











})();