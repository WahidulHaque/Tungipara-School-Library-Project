'use strict';

// Declare app level module which depends on views, and core components
angular.module('ecommerce', ['ngRoute', 'oitozero.ngSweetAlert', 'ecommerce.home',   'ecommerce.catalog', 'ecommerce.checkout', 'ecommerce.login', 'ecommerce.registration', 'ecommerce.customer.dashboard', 'ecommerce.customer.order', 'ecommerce.customer.profile', 'ecommerce.customer.change.password'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  //$locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});
}])

.run(['$rootScope', '$location', 'LocalStorage', 'SweetAlert', function ($rootScope, $location, LocalStorage, SweetAlert) {
    // set some initial values
    $rootScope.API_URL = 'https://tsl.a2zmanager.com/api/';
    $rootScope.USER = LocalStorage.get('user');
    $rootScope.ERRORS = {};
    $rootScope.CATEGORIES = [];
    $rootScope.SchoolList = [];
    $rootScope.CART_PRODUCTS = LocalStorage.get('cart_products') || [];
    $rootScope.PRODUCT_QTY = 0;
    $rootScope.PRODUCT_TOTAL = 0;
    $rootScope.SchoolID = 0;
    $rootScope.AuthorName = [];
    $rootScope.PublishersName = [];
    $rootScope.PRODUCTS = [];
    
 


    // run middleware
    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
        if (next !== undefined) {
            // protect unauthorized access
            if (next.$$route.requiredAuth && ($rootScope.USER === null || !angular.isDefined($rootScope.USER.id))) {
                event.preventDefault();
                SweetAlert.swal({
                    title: "Unauthorized",
                    text: "Your session has expired. Please login again.",
                    type: "error",
                }, function(){
                    $location.path('/login');
                });
            }

            // redirect to dashboard if customer is logged in
            if (next.$$route.redirectIfAuthenticated && ($rootScope.USER !== null && angular.isDefined($rootScope.USER.id))) {
                event.preventDefault();
                $location.path('/customer/dashboard');
            }
        }
    });
}])

.constant('CONSTANTS', {
  'API_URL': 'https://tsl.a2zmanager.com/api/',
})

.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
                
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
    
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
});

