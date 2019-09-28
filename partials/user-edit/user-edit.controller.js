(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserEditController', UserEditController);

        UserEditController.$inject = ['UserService','$location', '$rootScope','$scope','ResourcesService','$filter'];
    function UserEditController(UserService, $location,$rootScope,$scope,ResourcesService,$filter) {
        var vm = $scope;
        initController();

        function initController() {
            if(!$rootScope.dnitypes){
                ResourcesService.GetTiposDNI()
                .then(function (response) {
                    if (response){
                        $rootScope.dnitypes = response;  
                        loadEditUser(vm.$parent.user);        
                    } 
                })
                .catch(function(error){
                    SweetAlert.swal ({
                        type: "error", 
                        title: "Error",
                        text: error,
                        confirmButtonAriaLabel: 'Ok',
                    });
                });
            }
            else{
                loadEditUser(vm.$parent.user);
            }
            
        }

        function loadEditUser(user) {
            vm.userEdit = {};
            vm.userEdit.tel = user.Telefono;
            vm.userEdit.name = user.Nombre;
            vm.userEdit.surname = user.Apellido;
            vm.userEdit.dnitype =$filter('filter')($rootScope.dnitypes, {Id: user.TipoDni})[0];
            vm.userEdit.password = user.Clave;
            vm.userEdit.dni = user.Dni;
            vm.userEdit.email= user.Email;
        }
      /*  function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
*/
        function deleteUser(id) {
                    
        }
    }

})();