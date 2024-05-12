'use strict';

angular.module('ecommerce').factory('QueryService', ['$location', '$rootScope', '$http', '$q', 'CONSTANTS', 'LocalStorage', 'SweetAlert', function($location, $rootScope, $http, $q, CONSTANTS, LocalStorage, SweetAlert) {

    return {
        query: query,
        authQuery: authQuery,
    };

    function query(method, url, params, data, others) {

        if(!angular.isDefined(others)) others = {};

        var deferred = $q.defer();
        var request = angular.extend({
            method: method,
            url: CONSTANTS.API_URL + url,
            params: params,
            data: data,
        }, others);

        $http(request).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            if(error.status === 400) {
                if(angular.isDefined(error.data.errors)) {
                    $rootScope.ERRORS = error.data.errors;
                } else if(angular.isDefined(error.data.notification)) {
                    SweetAlert.swal("Failed", error.data.notification.message, "error");
                } else {
                    SweetAlert.swal("Failed", "Something went wrong. Please try again", "error");
                }
            } else if (error.status === 401)
             {
                LocalStorage.remove('access_token');
                LocalStorage.remove('user');
                $rootScope.USER = {};

                SweetAlert.swal({
                    title: "Unauthorized",
                    text: "Your session has expired. Please login again.",
                    type: "error",
                }, function(){
                    $location.path('/login');
                });
             }
                    else if (error.status === 500)
                      {
                        SweetAlert.swal("Error", error.data.notification.message, "error");
                      }
                   /* else
                     {
                        SweetAlert.swal("Error", "Something went wrong. Please try again", "error");
                     }*/

            deferred.reject(error);
        });

        return deferred.promise;
    }

    function authQuery(method, url, params, data, others) {

        if(!angular.isDefined(others)) others = {};
        others = angular.extend(others, {
            headers: {
                'Authorization': 'Bearer ' + LocalStorage.get('access_token')
            }
        });

        return query(method, url, params, data, others);
    }

}]);


