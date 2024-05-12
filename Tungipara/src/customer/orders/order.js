'use strict';

angular.module('ecommerce.customer.order', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customer/orders', {
            templateUrl: 'src/customer/orders/orders.html',
            controller: 'OrdersController',
            requiredAuth: true,
        });

        $routeProvider.when('/customer/invoice/:orderId', {
            templateUrl: 'src/customer/orders/invoice.html',
            controller: 'InvoiceController',
            requiredAuth: true,
        });
    }])

    .controller('OrdersController', ['$rootScope', '$scope', 'SweetAlert', 'QueryService', function ($rootScope, $scope, SweetAlert, QueryService) {

        $scope.orders = [];

        QueryService.authQuery('GET', 'TransactionInfo/GetAllTransactionInfo', {customerId: $rootScope.USER.id}, {}).then(function (response) {
            $scope.orders = response.data;
        }).catch(function (response) {

        });

    }])

    .controller('InvoiceController', ['$rootScope', '$scope', '$routeParams', 'SweetAlert', 'QueryService', function ($rootScope, $scope, $routeParams, SweetAlert, QueryService) {

        $scope.order = {};

        QueryService.authQuery('GET', 'TransactionInfo/GetTransactionInfoById', { id: $routeParams.orderId}, {}).then(function (response) {
            $scope.order = response.data;
        }).catch(function (response) {

        });

    }]);