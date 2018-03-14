(function(){

    'use strict';

    angular.module('app.ejemplo').service('PersonaService', serviceController);

    serviceController.$inject = ['$http', 'AppConfig'];

    function serviceController($http, AppConfig)
    {
        var sv = this;

        sv.getCollection = function()
        {
            return $http({
                method: 'GET',
                url: AppConfig.baseUrl + 'persona'
            });
        };

        sv.save = function(data)
        {
            if (data.id && data.id > 0)
                return $http({
                    method: 'PUT',
                    url: AppConfig.baseUrl + 'persona',
                    data: data
                });
            else
                return $http({
                    method: 'POST',
                    url: AppConfig.baseUrl + 'persona',
                    data: data
                });
        };

        sv.get = function(id)
        {
            return $http({
                method: 'GET',
                url: AppConfig.baseUrl + 'persona/' + id
            });
        };

        sv.delete = function(id)
        {
            return $http({
                method: 'DELETE',
                url: AppConfig.baseUrl + 'persona/' + id
            });
        };

        return sv;
    };


})();