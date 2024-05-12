'use strict';

angular.module('ecommerce.customer.profile', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/customer/profile', {
            templateUrl: 'src/customer/profile/profile.html',
            controller: 'ProfileController',
            requiredAuth: true,
        });
    }])

    .controller('ProfileController', ['$rootScope', '$scope', '$http', 'SweetAlert', 'QueryService', 'LocalStorage', 'CONSTANTS', function ($rootScope, $scope, $http, SweetAlert, QueryService, LocalStorage, CONSTANTS) {

        $scope.formData = $rootScope.USER;

        $scope.update = function () {
            $scope.formData.password = '123456'; //todo: remove this line

            if($scope.profileForm.$valid) {
                QueryService.authQuery('POST', 'Customer/UpdateCustomer', {}, $scope.formData).then(function (response) {
                    LocalStorage.set('user', $scope.formData);
                    SweetAlert.swal("Success", "Your profile information is updated successfully", "success");
                }).catch(function (response) {

                });
            }
        };

    }]);