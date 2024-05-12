'use strict';

angular.module('ecommerce.registration', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'src/registration/registration.html',
            controller: 'RegisterController',
            redirectIfAuthenticated: true,
        });
    }])

    .controller('RegisterController', ['$location', '$scope', '$http', 'SweetAlert', 'QueryService', function ($location, $scope, $http, SweetAlert, QueryService) {
        $scope.formData = {};

        $scope.register = function () {
            if($scope.registerForm.$valid) {
                $scope.formData.UserType = 'Customer';
                $scope.formData.isCustomerAccount = true;
                $scope.formData.active = true;

                QueryService.query('POST', 'Customer/SaveCustomer', {}, $scope.formData).then(function (response) {
                    SweetAlert.swal({
                        title: "Success",
                        text: "Your registration is successful. Now you may login to your account using mobile no & password",
                        type: "success",
                    }, function(){
                        $location.path('/login');
                    });
                }).catch(function (response) {

                });
            }
        };
    }]);