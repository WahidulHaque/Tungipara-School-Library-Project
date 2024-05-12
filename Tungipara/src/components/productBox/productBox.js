'use strict';

angular.module('ecommerce')

    .component('productBox', {
        bindings: { product: "<" },
        templateUrl: 'src/components/productBox/productBox.html',
        controller: ['$window', '$rootScope', '$scope', 'LocalStorage', 'SweetAlert', function ($window, $rootScope, $scope, LocalStorage, SweetAlert) {

            $scope.quantity = 1;

            $scope.addToCart = function (){
                var cartProduct = $rootScope.CART_PRODUCTS.find(function(element) {
                    return element.id === $scope.$ctrl.product.id;
                });

                if($scope.$ctrl.product.availableQty < $scope.quantity) {
                    SweetAlert.swal("Sorry", "This product is out of stock.", "warning");
                } else {
                    if(!angular.isDefined(cartProduct)) {
                        var product = angular.extend({}, $scope.$ctrl.product);
                        product.quantity = $scope.quantity;
                        $rootScope.CART_PRODUCTS.push(product);
                    } else {
                        cartProduct.quantity += $scope.quantity;
                    }

                    LocalStorage.update('cart_products', $rootScope.CART_PRODUCTS);

                    $scope.quantity = 1;
                }
            };
        }]
    });