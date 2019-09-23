angular
.module('app')
.controller('ModalEditController', ModalEditController);

ModalEditController.$inject = ['UserService', '$rootScope', '$scope', '$uibModalInstance'];


function ModalEditController(UserService, $rootScope, $scope,$uibModalInstance) {
    var vm = this;

    $scope.ok = function(){
        $uibModalInstance.close("Ok");
      }
       
      $scope.cancel = function(){
        $uibModalInstance.dismiss();
      } 
}
