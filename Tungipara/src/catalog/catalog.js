'use strict';

angular.module('ecommerce.catalog', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/catalog/search', {
            templateUrl: 'src/catalog/catalog.html',
            controller: 'ProductSearchController'
        });

        $routeProvider.when('/catalog/offers', {
            templateUrl: 'src/catalog/catalog.html',
            controller: 'ProductOfferController'
        });

        $routeProvider.when('/catalog/:categoryId', {
            templateUrl: 'src/catalog/catalog.html',
            controller: 'CatalogController'
        });
    }])

    .controller('CatalogController', ['$scope', '$routeParams', 'QueryService', function ($scope, $routeParams, QueryService) {
        $scope.products = [];

        var params = { categoryId: $routeParams.categoryId, schoolId: 0};
        QueryService.query('GET', 'OrderDB/GetProductByCategoryIdBySchoolId', params, {}).then(function (data){
            $scope.products = data.data;
        }).catch(function (response) {

        });
    }])

    .controller('ProductSearchController', ['$scope', '$location', 'QueryService', 'SweetAlert', function ($scope, $location, QueryService, SweetAlert) {
        $scope.products = [];

        var search = $location.search();

        var publisherId = search.publisherId == undefined ? 0 : search.publisherId;
        var authorId = search.authorId == undefined ? 0 : search.authorId;
        var categoryId = search.categoryId == undefined ? 0 : search.categoryId;
        var name = search.keyword == undefined ? '""' : search.keyword;

        var params = { name: name, categoryId: categoryId, publisherId: publisherId, authorId: authorId};

        QueryService.authQuery('GET', 'Books/GetBookForSearch', params, {}).then(function (data) {
            $scope.products = data.data;
        }).catch(function (response) {

        });

        //if(params.Name.length > 2) {
        //    QueryService.authQuery('GET', 'Books/GetBookForSearch', params, {}).then(function (data){
        //        $scope.products = data.data;
        //    }).catch(function (response) {

        //    });
        //} else {
        //    SweetAlert.swal("Failed", "Please enter search keyword with at least 3 character", "warning");
        //}
    }])

    .controller('ProductOfferController', ['$scope', 'QueryService', function ($scope, QueryService) {
        $scope.products = [];

        QueryService.query('GET', 'Product/GetAllOfferProduct', {}, {}).then(function (data){
            $scope.products = data.data;
        }).catch(function (response) {

        });
    }]);