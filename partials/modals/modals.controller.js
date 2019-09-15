angular.module('app').controller('ModalMessageCtrl', function ($uibModalInstance, message, $scope) {
 $scope.message = message;
  $scope.okError = function () {
      $uibModalInstance.close();
    };  

});

