/*-----------------------------------------------------------------------------------

 Template Name:bigboost
 Template URI: themes.pixelstrap.com/bigboost
 Description: This is E-commerce website
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 ----------------------------------------------------------------------------------- */
// 01.Tap to top
// 02.Furniture layout hover effect
// 03.Add to cart js
// 04.Footer js
// 05.Menu js
// 06.Image to background js
// 07.Slick slider js
// 08.Tab js
// 09.Collection page js
// 10.Add to cart notification js
// 11.Add to wishlist notification js
// 12.Product page Quantity Counter
// 13.Selector js
// 14.Filter js
// 15.Rtl menu js
// 16.Mega menu js
// 17.RTL & Dark Light
// 18.Menu js
// 19.Theme-setting
// 20.Sidebar js
// 21.Tooltip
// 22.Dropdown Menu
// 23.loader js

(function($) {
    "use strict";

    /*=====================
     01.Tap to Top
     ==========================*/
    /*$(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.tap-top').fadeIn();
        } else {
            $('.tap-top').fadeOut();
        }
    });

    $('.tap-top').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });*/


    /*=====================
     02. Furniture layout hover effect
     ==========================*/
    jQuery('.hover-box').hover(function() {
        var hoverclass = jQuery(this).attr('data-class');
        jQuery('[data-class=' + hoverclass + ']').addClass('hovered-btn');
        jQuery(this).addClass('hovered-btn');
    }, function() {
        var hoverclass = jQuery(this).attr('data-class');
        jQuery('[data-class=' + hoverclass + ']').removeClass('hovered-btn');
        jQuery(this).removeClass('hovered-btn');
    });


    /*=====================
     03. Add to cart js
     ==========================*/

        $(document).on('click', '.addcart-box', function() {
        $(this).parents('.product-box').find('.addtocart_box').addClass("open");
    });
    $(".close-cart, .closeCartbox").click(function(){
        $(this).parents('.addtocart_box').removeClass("open");
    });


    /*=====================
     04. Footer js
     ==========================*/
    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '990') {
        jQuery('.footer-title h4').append('<span class="according-menu"></span>');
        jQuery('.footer-title').click(function () {
            jQuery('.footer-title').removeClass('active');
            jQuery('.footer-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).next().slideDown('normal');
            }
        });
        jQuery('.footer-content').hide();
    } else {
        jQuery('.footer-content').show();
    }

    /*=====================
     05. Menu js
     ==========================*/
    $(".toggle-nav").click(function(){
        $('.sm-horizontal').css("right","0px");
    });
    $(".mobile-back").click(function(){
        $('.sm-horizontal').css("right","-410px");
    });

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '1200') {
        jQuery('.menu-title h6').append('<span class="according-menu"></span>');
        jQuery('.menu-title').click(function () {
            jQuery('.menu-title').removeClass('active');
            jQuery('.menu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).next().slideDown('normal');
            }
        });
        jQuery('.menu-content').hide();
    } else {
        jQuery('.menu-content').show();
    }

    if ($(window).width() > '1200') {
        $('#hover-cls').hover(
            function () {
                $('.sm').addClass('hover-unset');
            }
        )
    }

    if ($(window).width() > '1200') {
        $('#sub-menu > li').hover(
            function () {
                if ($(this).children().hasClass('has-submenu')) {
                    $(this).parents().find('nav').addClass('sidebar-unset');
                }
            },
            function () {
                $(this).parents().find('nav').removeClass('sidebar-unset');
            }
        )
    }


    /*=====================
     06. Image to background js
     ==========================*/
    $(".bg-top" ).parent().addClass('b-top');
    $(".bg-bottom" ).parent().addClass('b-bottom');
    $(".bg-center" ).parent().addClass('b-center');
    $(".bg-left" ).parent().addClass('b-left');
    $(".bg-right" ).parent().addClass('b-right');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $(".bg-img.blur-up" ).parent().addClass('');
    jQuery('.bg-img').each(function() {

        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();

        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'display' : 'block'
        });

        el.hide();
    });


    /*=====================
     07. Slick slider js
     ==========================*/
    $('.slide-1').slick({
        autoplay: false,
        autoplaySpeed: 5000
    });
    /*$('.logo-3').slick({
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
    });*/
    $('.logo-4').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.category-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slide-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.slider-7').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.slider-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.slider-5').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    /*$('.slide-10').slick({
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
    });*/
    $('.slide-3').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1431,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.cat-slide-6').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1430,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.veg-2').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.veg-3').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.collection-4').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1431,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slider-3').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.slide-4').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slide-2').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slider-2').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.team-5').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 586,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.product-4').slick({
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow:2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $(".product-6").slick({
        arrows: true,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint:991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.product-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        vertical: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-slick',
        arrows: false,
        dots: false,
        focusOnSelect: true
    });
    $('.product-right-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-right-nav'
    });
    if ($(window).width() > 576) {
        $('.slider-right-nav').slick({
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-right-slick',
            arrows: false,
            infinite: true,
            dots: false,
            centerMode: false,
            focusOnSelect: true
        });
    }else{
        $('.slider-right-nav').slick({
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-right-slick',
            arrows: false,
            infinite: true,
            centerMode: false,
            dots: false,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }


    /*=====================
     08. Tab js
     ==========================*/
    $("#tab-1").css("display", "Block");
    $(".default").css("display", "Block");
    $(".tabs li a").click(function(event) {
        event.preventDefault();
        $('.tab_product_slider').slick('unslick');
        $('.product-4').slick('unslick');
        $(this).parent().parent().find("li").removeClass("current");
        $(this).parent().addClass("current");
        var currunt_href = $(this).attr("href");
        $('#' + currunt_href).show();
        $(this).parent().parent().parent().find(".tab-content").not('#' + currunt_href).css("display", "none");
        var slider_class = $(this).parent().parent().parent().find(".tab-content").children().attr("class").split(' ').pop();

        $(".product-4").slick({
            arrows: true,
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint:991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
    $(".tabs li a").click(function(event) {
        event.preventDefault();
        $('.tab_product_slider').slick('unslick');
        $('.slide-6').slick('unslick');
        $(this).parent().parent().find("li").removeClass("current");
        $(this).parent().addClass("current");
        var currunt_href = $(this).attr("href");
        $('#' + currunt_href).show();
        $(this).parent().parent().parent().find(".tab-content").not('#' + currunt_href).css("display", "none");
        var slider_class = $(this).parent().parent().parent().find(".tab-content").children().attr("class").split(' ').pop();

        $(".slide-6").slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 6,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1430,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite: true
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
    $(".tabs li a").click(function(event) {
        event.preventDefault();
        $('.tab_product_slider').slick('unslick');
        $('.product-6').slick('unslick');
        $(this).parent().parent().find("li").removeClass("current");
        $(this).parent().addClass("current");
        var currunt_href = $(this).attr("href");
        $('#' + currunt_href).show();
        $(this).parent().parent().parent().find(".tab-content").not('#' + currunt_href).css("display", "none");
        var slider_class = $(this).parent().parent().parent().find(".tab-content").children().attr("class").split(' ').pop();

        $(".product-6").slick({
            arrows: true,
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint:991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
    if ($(window).width() < 991) {
        $("#mob_tab_cls").click(function () {
            $(this).toggleClass('active');
            $(this).next('ul.tabs').slideToggle();
            $('.tab-content-cls').toggleClass('active');
        });
        $("#mob_tab_clss").click(function () {
            $(this).toggleClass('active');
            $(this).next('ul.tabs').slideToggle();
            $('.tab-content-cls').toggleClass('active');
        });
    }


    /*=====================
     09. Collection page js
     ==========================*/
    $(".sidebar-back").click(function(){
        $(".collapse").removeClass("show");
    });

    $(function () {
        $(".col-grid-box").slice(0, 8).show();
        $(".loadMore").on('click', function (e) {
            e.preventDefault();
            $(".col-grid-box:hidden").slice(0, 4).slideDown();
            if ($(".col-grid-box:hidden").length == 0) {
                $(".load-more-sec").text('no more products');
            }
        });
    });

    //  category page //
    $('.collapse-block-title').on('click', function(e) {
        e.preventDefault;
        var speed = 300;
        var thisItem = $(this).parent(),
            nextLevel = $(this).next('.collection-collapse-block-content');
        if (thisItem.hasClass('open')){
            thisItem.removeClass('open');
            nextLevel.slideUp(speed);
        }
        else {
            thisItem.addClass('open');
            nextLevel.slideDown(speed);
        }
    });
    $('.color-selector ul li').on('click', function(e) {
        $(".color-selector ul li").removeClass("active");
        $(this).addClass("active");
    });

    //list layout view
    $('.list-layout-view').on('click', function(e) {
        $(".product-wrapper-grid").css("opacity","0.2");
        $('.shop-cart-ajax-loader').css("display","block");
        $('.product-wrapper-grid').addClass("list-view");
        $(".product-wrapper-grid").children().children().removeClass();
        $(".product-wrapper-grid").children().children().addClass("col-lg-12");
        setTimeout(function(){
            $(".product-wrapper-grid").css("opacity","1");
            $('.shop-cart-ajax-loader').css("display","none");
        }, 500);
    });

    //grid layout view
    $('.grid-layout-view').on('click', function(e) {

        $('.product-wrapper-grid').removeClass("list-view");
        $(".product-wrapper-grid").children().children().removeClass();
        $(".product-wrapper-grid").children().children().addClass("col-lg-3");

    });
    $('.product-2-layout-view').on('click', function(e) {
        if($('.product-wrapper-grid').hasClass("list-view")) {}
        else{
            $(".product-wrapper-grid").children().children().removeClass();
            $(".product-wrapper-grid").children().children().addClass("col-lg-6");
        }
    });
    $('.product-3-layout-view').on('click', function(e) {
        if($('.product-wrapper-grid').hasClass("list-view")) {}
        else{
            $(".product-wrapper-grid").children().children().removeClass();
            $(".product-wrapper-grid").children().children().addClass("col-lg-4");
        }
    });
    $('.product-4-layout-view').on('click', function(e) {
        if($('.product-wrapper-grid').hasClass("list-view")) {}
        else{
            $(".product-wrapper-grid").children().children().removeClass();
            $(".product-wrapper-grid").children().children().addClass("col-lg-3");
        }
    });
    $('.product-6-layout-view').on('click', function(e) {
        if($('.product-wrapper-grid').hasClass("list-view")) {}
        else{
            $(".product-wrapper-grid").children().children().removeClass();
            $(".product-wrapper-grid").children().children().addClass("col-lg-2");
        }
    });


    /*=====================
     10. Add to cart notification js
     ==========================*/
    $('.addtocart_btn a').on('click', function () {
        $.notify({
            icon: 'fa fa-check',
            title: 'Success!',
            message: 'Item Successfully added to your cart'
        },{
            element: 'body',
            position: null,
            type: "success",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    });


    /*=====================
     11. Add to wishlist notification js
     ==========================*/
    $('.product-box button .ti-heart, .product-box a .ti-heart').on('click', function () {
        $.notify({
            icon: 'fa fa-check',
            title: 'Success!',
            message: 'Item Successfully added in wishlist'
        },{
            element: 'body',
            position: null,
            type: "info",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    });


    /*=====================
     12. Product page Quantity Counter
     ==========================*/
    $('.qty-box .quantity-right-plus').on('click', function () {
        var $qty = $('.qty-box .input-number');
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
    $('.qty-box .quantity-left-minus').on('click', function () {
        var $qty = $('.qty-box .input-number');
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });


    /*=====================
     13. Selector js
     ==========================*/
    $(".color-variant li").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $(".size-box li").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });


    /*=====================
     14. Filter js
     ==========================*/
    $(".filter-button").click(function(){
        $(this).addClass('active').siblings('.active').removeClass('active');
        var value = $(this).attr('data-filter');
        if(value == "all")
        {
            $('.filter').show('1000');
        }
        else
        {
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
        }
    });
    $("#formButton").click(function(){
        $("#form1").toggle();
    });
    $('.filter-btn').on('click', function(e) {
        $('.collection-filter').css("left","-15px");
    });
    $('.filter-back').on('click', function(e) {
        $('.collection-filter').css("left","-365px");
        $('.dashboard-left').css("left","-365px");
    });
    $('.account-sidebar').on('click', function(e) {
        $('.dashboard-left').css("left","0");
    });
    $('.sidebar-popup').on('click', function(e) {
        $('.collection-filter').css("left","-15px");
    });
    $(".sidebar-popup").click(function(){
        $(".open-popup").slideToggle();
    });


    /*=====================
     15. Rtl menu js
     ==========================*/
    $(".rtl .toggle-nav").click(function(){
        $('.sm-horizontal').css("left","0px");
        $('.sm-horizontal').css("right","unset");
    });
    $(".rtl .mobile-back").click(function(){
        $('.sm-horizontal').css("left","-410px");
        $('.sm-horizontal').css("right","unset");
    });


})(jQuery);


/*=====================
 16. Mega menu js
 ==========================*/
$(document).ready( function() {
    if ( $(window).width() < 1200) {
        $('.collapse').removeClass('show');
    }

});

$(window).resize(function() {
    if ($(window).width() < 1200) {
        $('.collapse').removeClass('show');
    }
});


// /*=====================
//  17. RTL & Dark Light
//  ==========================*/
// $("#ltr_btn").click(function(){
//     $('body').addClass('ltr');
//     $('body').removeClass('rtl');
//     $('.sm').removeClass('sm-rtl');
// });
// $("#rtl_btn").click(function(){
//     $('body').addClass('rtl');
//     $('.sm').addClass('sm-rtl');
//     $('body').removeClass('ltr');
// });
// $(".setting_buttons li").click(function(){
//     $(this).addClass('active').siblings().removeClass('active');
// });
// $(".color-box li").click(function(){
//     $(this).addClass('active').siblings().removeClass('active');
// });

// // dark & light
// (function() {
//     $('<div class="sidebar-btn dark-light-btn">' +
//         '<div class="dark-light">'+
//         '<div class="theme-layout-version">Dark' +
//         '</div>' +
//         '</div>' +
//         '</div>').appendTo($('body'));
// })();

// var body_event = $("body");
// body_event.on("click", ".theme-layout-version" , function(){
//     $(this).toggleClass('dark');
//     $('body').removeClass('dark');
//     if($('.theme-layout-version').hasClass('dark')){
//         $('.theme-layout-version').text('Light');
//         $('body').addClass('dark');
//     }else{
//         $('#theme-dark').remove();
//         $('.theme-layout-version').text('Dark');
//     }

//     return false;
// });


// /*=====================
//  18. Menu js
//  ==========================*/
// function openNav() {
//     document.getElementById("mySidenav").classList.add('open-side');
// }
// function closeNav() {
//     document.getElementById("mySidenav").classList.remove('open-side');
// }
// $(function() {
//     $('#main-menu').smartmenus({
//         subMenusSubOffsetX: 1,
//         subMenusSubOffsetY: -8
//     });
//     $('#sub-menu').smartmenus({
//         subMenusSubOffsetX: 1,
//         subMenusSubOffsetY: -8
//     });
// });


// /*=====================
//  19. Theme-setting
//  ==========================*/
// function openSetting() {
//     document.getElementById("setting_box").classList.add('open-setting');
//     document.getElementById("setting-icon").classList.add('open-icon');
// }
// function closeSetting() {
//     document.getElementById("setting_box").classList.remove('open-setting');
//     document.getElementById("setting-icon").classList.remove('open-icon');
// }
// jQuery('.setting-title h4').append('<span class="according-menu"></span>');
// jQuery('.setting-title').on('click', function () {
//     jQuery('.setting-title').removeClass('active');
//     jQuery('.setting-contant').slideUp('normal');
//     if (jQuery(this).next().is(':hidden') == true) {
//         jQuery(this).addClass('active');
//         jQuery(this).next().slideDown('normal');
//     }
// });
// jQuery('.setting-contant').hide();

// // color picker
// var body_event = $("body");
// body_event.on("click", ".color1", function() {
//     $("#color" ).attr("href", "../assets/css/color1.css" );
//     return false;

// });
// body_event.on("click", ".color2", function() {
//     $("#color" ).attr("href", "../assets/css/color2.css" );
//     return false;
// });
// body_event.on("click", ".color3", function() {
//     $("#color" ).attr("href", "../assets/css/color3.css" );
//     return false;
// });
// body_event.on("click", ".color4", function() {
//     $("#color" ).attr("href", "../assets/css/color4.css" );
//     return false;
// });
// body_event.on("click", ".color5", function() {
//     $("#color" ).attr("href", "../assets/css/color5.css" );
//     return false;
// });
// body_event.on("click", ".color6", function() {
//     $("#color" ).attr("href", "../assets/css/color6.css" );
//     return false;
// });
// body_event.on("click", ".color7", function() {
//     $("#color" ).attr("href", "../assets/css/color7.css" );
//     return false;
// });
// body_event.on("click", ".color8", function() {
//     $("#color" ).attr("href", "../assets/css/color8.css" );
//     return false;
// });
// body_event.on("click", ".color9", function() {
//     $("#color" ).attr("href", "../assets/css/color9.css" );
//     return false;
// });
// body_event.on("click", ".color10", function() {
//     $("#color" ).attr("href", "../assets/css/color10.css" );
//     return false;
// });
// body_event.on("click", ".color11", function() {
//     $("#color" ).attr("href", "../assets/css/color11.css" );
//     return false;
// });
// body_event.on("click", ".color12", function() {
//     $("#color" ).attr("href", "../assets/css/color12.css" );
//     return false;
// });


/*=====================
 20. Sidebar js
 ==========================*/
function openCart() {
    document.getElementById("cart_side").classList.add('open-side');
}
function closeCart() {
    document.getElementById("cart_side").classList.remove('open-side');
}

function openWishlist() {
    document.getElementById("wishlist_side").classList.add('open-side');
}
function closeWishlist() {
    document.getElementById("wishlist_side").classList.remove('open-side');
}

function openAccount() {
    document.getElementById("myAccount").classList.add('open-side');
}
function closeAccount() {
    document.getElementById("myAccount").classList.remove('open-side');
}


/*=====================
 21.Tooltip
 ==========================*/
$(window).on('load', function() {
    $('[data-toggle="tooltip"]').tooltip()
});


/*=====================
 22.Dropdown Menu
 ==========================*/

$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});

 /*------------------------
   23.loader
     --------------------------*/
     $('.loader-wrapper').fadeOut('3000', function() {
            $(this).remove();
        });
