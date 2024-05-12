'use strict';

angular.module('ecommerce')

    .component('ecomFooter', {
        templateUrl: 'src/components/ecomFooter/ecomFooter.html',
        controller: function () {
            setTimeout(function () {
                $('.slide-10').slick({
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 10,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1367,
                            settings: {
                                slidesToShow: 8,
                                slidesToScroll: 8
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 7,
                                slidesToScroll: 7,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                });

                $(window).on('scroll', function () {
                    if ($(this).scrollTop() > 600) {
                        $('.tap-top').fadeIn();
                    } else {
                        $('.tap-top').fadeOut();
                    }
                });

                $('.tap-top').on('click', function () {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 600);
                    return false;
                });
            
            }, 100);
        }
    });