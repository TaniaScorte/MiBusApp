angular.module('app')
.directive('navDriver', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
      scope: {
          //@ reads the attribute value, = provides two-way binding, & works with functions
          title: '@'         },
           link: function($scope, element, attrs) {
            $scope.logout = function() {
            $rootScope.logout();
        }
    },
      templateUrl: 'scripts/app-directives/nav-driver/nav-driver.html'
  }
}]);