'use strict';

angular.module('ecommerce.customer.change.password', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customer/change/password', {
            templateUrl: 'src/customer/changePassword/changePassword.html',
            controller: 'ChangePasswordController',
            requiredAuth: true,
        });
    }])

    .controller('ChangePasswordController', ['$rootScope', '$scope', '$http', 'SweetAlert', 'QueryService', 'LocalStorage', 'CONSTANTS', function ($rootScope, $scope, $http, SweetAlert, QueryService, LocalStorage, CONSTANTS) {

        $scope.formData = {};

        $scope.update = function () {
            if($scope.changePaswordForm.$valid) {
                $scope.formData.id = $rootScope.USER.id;

                QueryService.authQuery('POST', 'Customer/UpdatePassword', {}, $scope.formData).then(function (response) {
                    SweetAlert.swal("Success", "Your password is updated successfully", "success");
                }).catch(function (response) {

                });
            }
        };

    }]);