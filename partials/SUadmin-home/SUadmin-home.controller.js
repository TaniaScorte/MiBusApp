(function () {
    'use strict';

    var mi =angular
        .module('app')
        .controller('SUAdminHomeController', SUAdminHomeController);

    SUAdminHomeController.$inject = ['UserService', '$rootScope', '$http', '$scope', '$uibModal'];


    function SUAdminHomeController(UserService, $rootScope, $http, $scope, $uibModal) {
        var vm = this;




        getEmpresas();


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

        $scope.nueva = function () {
            var url = 'http://www.mellevas.com.ar/api/empresas/Create';
            var data = {
                Nombre: $scope.txtNombreNew,
                Direccion: $scope.txtDirNew,
                Token: "2019",
            }

            var data = {
                method: 'post',
                url: url,
                data: data
            }

            $http(data)
                .then(function (response) {
                    console.log(response);
                    getEmpresas();
                })
                .catch(function (error) {
                    console.log(error);
                });


        }


        $scope.editar = function (id) {

            var id = parseInt(id);

            var url = 'http://www.mellevas.com.ar/api/empresas/getEmpresa?id=';

            var data = {
                method: 'GET',
                url: url + id + "&token=" + 2019,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }

            $http(data)
                .then(function (response) {
                    $scope.txtNombreEdit = response.data.Nombre;
                    $scope.txtDirEdit = response.data.Direccion;
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });




            $('#btnEditar').on('click', function () {
                var url = 'http://www.mellevas.com.ar/api/empresas/Update';

                // console.log($scope.txtNombreEdit, $scope.txtDirEdit, id);

                var data = {
                    method: 'POST',
                    url: url,
                    id: id,
                    Nombre: $scope.txtNombreEdit,
                    Direccion: $scope.txtDirEdit,
                    Token: "2019",
                }

                $http(data)
                    .then(function (response) {
                        console.log(response);
                        getEmpresas();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

        }

        $scope.eliminar = function (id) {

            $('#btnEliminar').on('click', function () {
                var url = 'http://www.mellevas.com.ar/api/empresas/Delete?id=';

                var data = {
                    method: 'GET',
                    url: url + id + "&token=" + 2019,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }

                $http(data)
                    .then(function (response) {
                        getEmpresas();
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })


        }



        
       
    }
    mi.filter('filterDate', function(){
        var cambiarFiltro = function(datosOriginales){


           var nuevosDatos = datosOriginales.replace(/([A-Za-z)(\\/])/g,"");
          //var nuevosDatos = datosOriginales.replace(/o/g,primerValor);
         //var nuevosDatos = datosOriginales.replace(RegExp(segundoValor,"g"),primerValor);
         //   var nuevosDatos = 'hola';

            return nuevosDatos;

        };

        return cambiarFiltro;
    });











})();