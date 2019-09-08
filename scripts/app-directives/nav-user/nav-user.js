angular.module('app')
.directive('navUser', function () {
  return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
      scope: {
          //@ reads the attribute value, = provides two-way binding, & works with functions
          title: '@'         },
      templateUrl: 'scripts/app-directives/nav-user/nav-user.html'
  }
});