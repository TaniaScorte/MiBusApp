(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngAnimate','ui.bootstrap','ngSanitize','oitozero.ngSweetAlert','ja.qr'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
    function config($routeProvider, $locationProvider,$httpProvider) {
       // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
      //  $httpProvider.defaults.headers.common['Content-Type'] =  ' text/plain';
      // $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] =  '*';
        //$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] =  'POST, GET, DELETE, PUT'
        
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'partials/home/home.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            return true;
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'partials/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'partials/register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/reset-password', {
                controller: 'ResetPasswordController',
                templateUrl: 'partials/reset-password/reset-password.view.html',
                controllerAs: 'vm'
            })
            .when('/schedules', {
                controller: 'SchedulesController',
                templateUrl: 'partials/schedules/schedules.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            return true;
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/bus-view', {
                controller: 'BusViewController',
                templateUrl: 'partials/bus-view/bus-view.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            return true;
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/buy', {
                controller: 'BuyController',
                templateUrl: 'partials/buy/buy.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            return true;
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })

            .when('/user-edit', {
                controller: 'UserEditController',
                templateUrl: 'partials/user-edit/user-edit.view.html',
                controllerAs: 'vm'
            })
            .when('/user-history', {
                controller: 'UserHistoryController',
                templateUrl: 'partials/user-history/user-history.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            return true;
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/driver-home', {
                controller: 'DriverHomeController',
                templateUrl: 'partials/driver-home/driver-home.view.html',
                controllerAs: 'vm'
            })
            .when('/driver-map', {
                controller: 'DriverMapController',
                templateUrl: 'partials/driver-map/driver-map.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-map');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/driver-report', {
                controller: 'DriverReportController',
                templateUrl: 'partials/driver-report/driver-report.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-report');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-home', {
                controller: 'AdminHomeController',
                templateUrl: 'partials/admin-home/admin-home.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-branch', {
                controller: 'AdminBranchController',
                templateUrl: 'partials/admin-branch/admin-branch.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-branch');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-routes', {
                controller: 'AdminRoutesController',
                templateUrl: 'partials/admin-routes/admin-routes.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-routes');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-vehicles', {
                controller: 'AdminVehiclesController',
                templateUrl: 'partials/admin-vehicles/admin-vehicles.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-vehicles');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-drivers', {
                controller: 'AdminDriversController',
                templateUrl: 'partials/admin-drivers/admin-drivers.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-drivers');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-bus-stop', {
                controller: 'AdminBusStopsController',
                templateUrl: 'partials/admin-bus-stop/admin-bus-stop.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-bus-stop');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-journeys', {
                controller: 'AdminJourneysController',
                templateUrl: 'partials/admin-journeys/admin-journeys.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-journeys');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-schedules', {
                controller: 'AdminSchedulesController',
                templateUrl: 'partials/admin-schedules/admin-schedules.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-schedules');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/SUadmin-home', {
                controller: 'SUAdminHomeController',
                templateUrl: 'partials/SUadmin-home/SUadmin-home.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-alert', {
                controller: 'AdminAlertController',
                templateUrl: 'partials/admin-alert/admin-alert.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-alert');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })
            .when('/admin-admins', {
                controller: 'AdminAdminsController',
                templateUrl: 'partials/admin-admins/admin-admins.view.html',
                controllerAs: 'vm',
                resolve: {
                    factory: function ($q, $rootScope, $location) {
                        if ($rootScope.globals.currentUser.userData.RolId == 1) {
                            $location.path('/home');
                        } 
                        if($rootScope.globals.currentUser.userData.RolId == 2) 
                        {
                            $location.path('/driver-home');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 3) 
                        {
                            $location.path('/admin-admins');
                        }
                        if($rootScope.globals.currentUser.userData.RolId == 4) 
                        {
                            $location.path('/SUadmin-home');
                        }
                    }
                }
            })

            .otherwise({ redirectTo: '/home' });            
    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','AuthenticationService'];
    function run($rootScope, $location, $cookieStore, $http,AuthenticationService) {
        $rootScope.logout = function(){
            AuthenticationService.Logout($rootScope.user.Id, $rootScope.globals.currentUser.token)
            .then(function (response) {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
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

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $rootScope.user = $rootScope.globals.currentUser.userData; // jshint ignore:line
        }
        $rootScope.stopTimer= function() {
            if ($rootScope.intervalGetUltimaPosicion) {
              clearInterval($rootScope.intervalGetUltimaPosicion);
            }
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/reset-password']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();