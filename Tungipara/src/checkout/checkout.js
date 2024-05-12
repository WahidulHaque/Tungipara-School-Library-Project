'use strict';

angular.module('ecommerce.checkout', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/checkout/cart', {
            templateUrl: 'src/checkout/cart.html',
            controller: 'CheckoutCartController'
        });

        $routeProvider.when('/checkout/checkout', {
            templateUrl: 'src/checkout/checkout.html',
            controller: 'CheckoutController',
            requiredAuth: true,
        });
    }])

    .controller('CheckoutCartController', ['$rootScope', '$scope', '$routeParams', 'QueryService', 'LocalStorage', function ($rootScope, $scope, $routeParams, QueryService, LocalStorage) {

        $scope.removeCartProduct = function (product) {
            var index = $rootScope.CART_PRODUCTS.indexOf(product);
            $rootScope.CART_PRODUCTS.splice(index, 1);
            LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);
        };

        $scope.productQtyInc = function (product) {
            if (product.availableQty > product.quantity) {
                product.quantity++;
                LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);
            }
        };

        $scope.productQtyDcr = function (product) {
            if (product.quantity > 1) {
                product.quantity--;
                LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);
            }
        };

    }])

    .controller('CheckoutController', ['$rootScope', '$scope', '$location', 'QueryService', 'LocalStorage', 'SweetAlert', function ($rootScope, $scope, $location, QueryService, LocalStorage, SweetAlert) {
        $scope.formData = {
            customerName: $rootScope.USER.name,
            customerMobile: $rootScope.USER.mobileNo,
            addressInfo: $rootScope.USER.addressInfo,
            
            roll: $rootScope.USER.roll,
        };

        $scope.searchMember = function () {

            if ($scope.formData.memberInfo.length == 11) {
                QueryService.authQuery('GET', 'Common/GetUserByMobileNo', { mobileNo: $scope.formData.memberInfo, requestedId: $rootScope.USER.id, roll: $scope.formData.roll }, {}).then(function (response) {
                    $scope.studentsInfo = response.data;
                    $scope.formData.studentName = $scope.studentsInfo.name;
                    $scope.formData.className = $scope.studentsInfo.className == null ? '' : $scope.studentsInfo.className;
                    $scope.formData.studentRoll = $scope.studentsInfo.roll == null ? '' : $scope.studentsInfo.roll;
                }).catch(function (response) {

                });
            }

        }

        $scope.placeOrder = function () {
            var orderData = {
                orderNo: "O-112",
                amount: $rootScope.PRODUCT_TOTAL,
                orderPlacedOn: "2020-05-05 12:28:49.890665",
                addressInfo: $scope.formData.addressInfo,
                customerId: $rootScope.USER.id,
                customerName: $scope.formData.customerName,
                customerMobile: $scope.formData.customerMobile,
                serviceCharges: 0.00,
                totalAmount: $rootScope.PRODUCT_TOTAL,
                orderTakenFrom: "WEB",
                schoolId: $scope.formData.schoolId,
                orderDetailsList: []
            }

            angular.forEach($rootScope.CART_PRODUCTS, function (product, index) {
                orderData.orderDetailsList.push({
                    productId: product.id,
                    unitId: product.unitId,
                    mrp: product.mrp,
                    totalCount: product.quantity,
                    amount: product.mrp * product.quantity,
                    virtualPath: product.virtualPath,
                    titleAttribute: product.titleAttribute,
                    unitCode: product.unitCode,
                });
            });

            if ($scope.checkoutFrom.$valid) {
                QueryService.authQuery('POST', 'ManualOrderInfo/SaveManualOrderInfo', {}, orderData).then(function (response) {

                    $rootScope.CART_PRODUCTS = [];
                    LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);

                    SweetAlert.swal({
                        title: "Success",
                        text: "Your order is successfully placed.",
                        type: "success",
                    }, function () {
                        $location.path('/customer/orders');
                    });

                }).catch(function (response) {

                });
            }

        };

        /* <script type="text/javascript">
             window.onload = function () {
             var tblWeeks = document.getElementById("tblWeek");
             var chks = tblWeek.getElementsByTagName("INPUT");
             for (var i = 0; i < chks.length; i++) {
                 chks[i].onclick = function () {
                     for (var i = 0; i < chks.length; i++) {
                         if (chks[i] != this && this.checked) {
                             chks[i].checked = false;
                         }
                     }
                 };
         }
     };
         </script>
     */


    }]);