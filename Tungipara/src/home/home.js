'use strict';

angular.module('ecommerce.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$window', '$rootScope', '$scope', 'QueryService', function ($window, $rootScope, $scope, QueryService) {

        $scope.products = [];

        QueryService.query('GET', 'Books/GetAllBooksBySchoolId', {schoolId: 6}, {}).then(function (data){
            $scope.products = data.data;
        }).catch(function (response) {

        });

        setTimeout(function () {
            // main slider
            $('[data-bgimg]').each(function () {
                var bgImgUrl = $(this).data('bgimg');
                $(this).css({
                    'background-image': 'url(' + bgImgUrl + ')', // + meaning concat
                });
            });

            // trusted brands
            $('.logo-3').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });
        }, 100);
    }]);