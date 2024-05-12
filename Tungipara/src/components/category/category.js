'use strict';

angular.module('ecommerce')
    .component('category', {
        templateUrl: 'src/components/category/category.html',
        controller: [function () {
            // put animation on categories
            $(".categories_title").on("click", function() {
                $(this).toggleClass('inactive');
                $('.categories_menu_toggle').slideToggle('medium');
            });
        }]
    });


    