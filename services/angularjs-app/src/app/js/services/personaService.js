(function(){

    'use strict';

    angular.module('app.ejemplo').service('PersonaService', serviceController);

    serviceController.$inject = ['$http', 'AppConfig'];

    function serviceController($http, AppConfig)
    {
        var sv = this;

        function getUrl( apiSelected )
        {
            if (apiSelected == 'express')
                return AppConfig.apiExpress;
            if (apiSelected == 'dotnet')
                return AppConfig.apiDotNetCore;
            if (apiSelected == 'springboot')
                return AppConfig.apiSpringBoot;
        }


        sv.getCollection = function( apiSelected )
        {
            let promesaDatos = $http({
                method: 'GET',
                url: getUrl(apiSelected) + 'persona'
            });

            return promesaDatos;
        };

        sv.save = function(apiSelected, data)
        {
            if (data.id && data.id > 0)
                return $http({
                    method: 'PUT',
                    url: getUrl(apiSelected) + 'persona',
                    data: data
                });
            else
                return $http({
                    method: 'POST',
                    url: getUrl(apiSelected) + 'persona',
                    data: data
                });
        };

        sv.get = function(apiSelected, id)
        {
            return $http({
                method: 'GET',
                url: getUrl(apiSelected) + 'persona/' + id
            });
        };

        sv.delete = function(apiSelected, id)
        {
            return $http({
                method: 'DELETE',
                url: getUrl(apiSelected) + 'persona/' + id
            });
        };

        return sv;
    };


})();