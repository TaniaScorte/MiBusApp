angular.module('app')
.directive('navSu', function () {
  return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
      scope: {
          //@ reads the attribute value, = provides two-way binding, & works with functions
          title: '@'         },
      templateUrl: 'scripts/app-directives/nav-su/nav-su.html'
  }
});