'use strict';

angular.module('ecommerce.login', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'src/login/login.html',
            controller: 'LoginController',
            redirectIfAuthenticated: true,
        });
    }])

    .controller('LoginController', ['$location', '$rootScope',  '$scope', '$http', 'SweetAlert', 'QueryService', 'LocalStorage', 'CONSTANTS', function ($location, $rootScope,  $scope, $http, SweetAlert, QueryService, LocalStorage, CONSTANTS) {
        $scope.formData = {};
        $scope.formData.SchoolId = 0;
        //QueryService.query('GET', 'School/GetAllSchool', {}, {}).then(function (data) {
        //    $rootScope.SchoolList = data.data;

        //    setTimeout(function () {
        //        $('.select_school_option').niceSelect();
        //    }, 100);
        //}).catch(function (response) {

        //});

        $scope.login = function () {
            if ($scope.loginFrom.$valid) {
                $scope.formData.SchoolId = parseInt($scope.formData.SchoolId);
                QueryService.query('POST', 'Login/Login', {}, $scope.formData).then(function (response) {

                    LocalStorage.set('access_token', response.data.data.accessToken);
                    LocalStorage.set('user', response.data.data.user);
                    $rootScope.USER = response.data.data.user;
                    //$scope.search.schoolName = $rootScope.USER.schoolName;
                    $location.path('/customer/dashboard');

                }).catch(function (response) {
                    alert(response.tostring());
                });
            }
        };
    }]);