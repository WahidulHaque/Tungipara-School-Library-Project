/**
 *   ng-morris-js v0.3.4
 *   Copyright © 2015-2016 Jeff Boothe
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
*/

'use strict';
(function(){
  angular.module('ng-morris-js', [])

    // Line and Area option settings: https://morrisjs.github.io/morris.js/lines.html
    .directive('ngMorrisLineChart', function () {
      return {
        restrict: 'EA',
        scope: {
          chartData: '=',
          chartOptions: '='
        },
        replace: true,
        template: '<div></div>',
        link: function link(scope, element) {
          scope.$watch('chartData', function () {
            if (scope.chartData && scope.chartOptions) {
              scope.chartOptions.element = element;
              scope.chartOptions.data = scope.chartData;
              if (!scope.chartInstance) { scope.chartInstance = new Morris.Line(scope.chartOptions); }
              else { scope.chartInstance.setData(scope.chartData); }
            }
          });
        }
      };
    })

    .directive('ngMorrisAreaChart', function () {
      return {
        restrict: 'EA',
        scope: {
          chartData: '=',
          chartOptions: '='
        },
        replace: true,
        template: '<div></div>',
        link: function link(scope, element) {
          scope.$watch('chartData', function () {
            if (scope.chartData && scope.chartOptions) {
              scope.chartOptions.element = element;
              scope.chartOptions.data = scope.chartData;
              if (!scope.chartInstance) { scope.chartInstance = new Morris.Area(scope.chartOptions); }
              else { scope.chartInstance.setData(scope.chartData); }
            }
          });
        }
      };
    })

    // Bar option settings: https://morrisjs.github.io/morris.js/bars.html
    .directive('ngMorrisBarChart', function () {
      return {
        restrict: 'EA',
        scope: {
          chartData: '=',
          chartOptions: '='
        },
        replace: true,
        template: '<div></div>',
        link: function link(scope, element) {
          scope.$watch('chartData', function () {
            if (scope.chartData && scope.chartOptions) {
              scope.chartOptions.element = element;
              scope.chartOptions.data = scope.chartData;
              if (!scope.chartInstance) { scope.chartInstance = new Morris.Bar(scope.chartOptions); }
              else { scope.chartInstance.setData(scope.chartData); }
            }
          });
        }
      };
    })

    // Donut option settings: https://morrisjs.github.io/morris.js/donuts.html
    .directive('ngMorrisDonutChart', function () {
      return {
        restrict: 'EA',
        scope: {
          chartData: '=',
          chartOptions: '='
        },
        replace: true,
        template: '<div></div>',
        link: function link(scope, element) {
          scope.$watch('chartData', function () {
            if (scope.chartData && scope.chartOptions) {
              scope.chartOptions.element = element;
              scope.chartOptions.data = scope.chartData;
              if (!scope.chartInstance) { scope.chartInstance = new Morris.Donut(scope.chartOptions); }
              else { scope.chartInstance.setData(scope.chartData); }
            }
          });
        }
      };
    });
}());
