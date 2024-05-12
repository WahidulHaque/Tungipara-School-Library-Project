'use strict';

angular.module('ecommerce')

    .component('ecomHeader', {
        templateUrl: 'src/components/ecomHeader/ecomHeader.html',
        controller: ['$window', '$rootScope', '$scope', '$location', 'LocalStorage', 'QueryService', 'SweetAlert', function ($window, $rootScope, $scope, $location, LocalStorage, QueryService, SweetAlert) {

            $rootScope.SchoolList = [];
            $rootScope.CATEGORIES = [];
            $scope.search = {keyword: ''};
            $scope.search.advancedSearch = false;

            angular.extend($scope.search, $location.search());

            // update mini cart
            $rootScope.$watch('CART_PRODUCTS', function() {
                var productQty = 0;
                var productTotal = 0;

                angular.forEach($rootScope.CART_PRODUCTS, function(product, key) {
                    productQty += product.quantity;
                    productTotal += product.quantity * product.mrp;
                });

                $rootScope.PRODUCT_QTY = productQty;
                $rootScope.PRODUCT_TOTAL = productTotal;
            }, true);


            // fetch categories
            QueryService.query('GET', 'OrderDB/GetAllCategoryBySchoolId', {schoolId: 0}, {}).then(function (data){
                $rootScope.CATEGORIES = data.data;

                setTimeout(function() {
                    $('.select_option').niceSelect();
                }, 100);
            }).catch(function (response) {

            });

            QueryService.query('GET', 'School/GetAllSchool', {}, {}).then(function (data) {
                $rootScope.SchoolList = data.data;
                
                setTimeout(function () {
                    $('.select_school_option').niceSelect();
                }, 100);
            }).catch(function (response) {

            });

            QueryService.query('GET', 'Author/GetAllAuthor', {}, {}).then(function (data) {
                $rootScope.AuthorName = data.data;

                setTimeout(function () {
                    $('.select_author_option').niceSelect();
                }, 100);
            }).catch(function (response) {

            });


            QueryService.query('GET', 'Publishers/GetAllPublishers', {}, {}).then(function (data) {
                $rootScope.PublishersName = data.data;

                setTimeout(function () {
                    $('.select_publisher_option').niceSelect();
                }, 100);
            }).catch(function (response) {

            });

            // fetch all products on modal
            QueryService.query('GET', 'Product/GetAllProduct', {}, {}).then(function (data) {
                $rootScope.PRODUCTS = data.data;
            }).catch(function (response) {
            });
            
            $scope.showAdvancedSearch = function (){
                $scope.search.advancedSearch = true;
            }

            $scope.hideAdvancedSearch = function (){
                $scope.search.advancedSearch = false;
            }
            $scope.removeCartProduct = function (product) {
                var index = $rootScope.CART_PRODUCTS.indexOf(product);
                $rootScope.CART_PRODUCTS.splice(index, 1);
                LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);
            };

            $scope.productSearch = function () {
                var publisherId = $scope.search.publisherId == undefined ? 0 : $scope.search.publisherId;
                var authorId = $scope.search.authorId == undefined ? 0 : $scope.search.authorId;

                //alert($scope.search.keyword + ' ' + publisherId + ' ' + authorId);

                if (publisherId != 0 || authorId != 0 || $scope.search.keyword.length > 2) {
                    $location.path('/catalog/search').search($scope.search);
                }
                else {
                    SweetAlert.swal("Failed", "Please enter search keyword with at least 3 character", "warning");
                }
                //if($scope.search.keyword.length > 2) {
                //    $location.path('/catalog/search').search($scope.search);
                //} else {
                //    SweetAlert.swal("Failed", "Please enter search keyword with at least 3 character", "warning");
                //}
            };
         /*   $scope.productSearch = function () {
                if ($scope.search.productSearch.PublishersName)s
                  { $location.path('/catalog/search').search($scope.search);}
                    else{ SweetAlert.swal("warning");}
                };
          */
 
          

            $scope.schoolSelected = function () {
                $rootScope.SchoolID = $scope.search.schoolid;
                QueryService.query('GET', 'OrderDB/GetAllCategoryBySchoolId', { schoolId: $scope.search.schoolid }, {}).then(function (data) {
                    $rootScope.CATEGORIES = data.data;

                }).catch(function (response) {

                });

                //alert($scope.search.schoolid);
            };

            $scope.logout = function () {
                LocalStorage.remove('access_token');
                LocalStorage.remove('user');
                $rootScope.USER = {};

                $window.location.href = '/';
            };
        }]
    });