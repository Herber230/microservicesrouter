(function () {
    'use strict';

    var mainModule = angular.module('app.ejemplo', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

    mainModule.config( funcionConfiguracion );

    funcionConfiguracion.$inject = [ '$stateProvider', '$locationProvider', '$urlRouterProvider' ]

    function funcionConfiguracion( $stateProvider, $locationProvider, $urlRouterProvider )
    {
        // configuracion de las rutas
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/app/home');

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'app/views/app.html',
                controller: 'mainController',
                controllerAs: 'vm',
                resolve: { apiSelector: () => { return { 'get': 'A', reload: 'B' } } }                
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'app/shared/states/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'                
            })
            .state('app.listado', {
                url: '/listado',
                templateUrl: 'app/shared/states/listado/listado.html',
                controller: 'listadoController',
                controllerAs: 'vm'                
            })
            .state('app.edicion', {
                url: '/edicion/:id',
                templateUrl: 'app/shared/states/edicion/edicion.html',
                controller: 'edicionController',
                controllerAs: 'vm'                
            });     
    };

    mainModule.constant('AppConfig', { 
        "apiExpress": "http://localhost:3001/api/",
        "apiDotNetCore": "http://localhost:8080/api/",
        "apiSpringBoot": "http://localhost:3001/api/"
    });
    
})();


(function(){

    'use strict';

    angular.module('app.ejemplo').controller('CollapseDemoCtrl', controller);

    controller.$inject = ['$scope']

    function controller($scope)
    {
         $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
    };

})();


(function(){

    'use strict';

    angular.module('app.ejemplo').controller('mainController', controller);

    controller.$inject = ['$state', '$location', 'apiSelector'];

    function controller($state, $location, apiSelector)
    {
        var vm = this;
        apiSelector.get = () => {
            return vm.apiSelected;
        };

        function activate()
        {
            vm.apiSelected = 'express';
        };

        vm.irAHome = function()
        {
            $state.go('app.home');
        };

        vm.irAListado = function()
        {
            $state.go('app.listado');
        };

        vm.reload = function()
        {
            if (apiSelector.reload != "B")
                apiSelector.reload();
        };


        activate();
    };


})();
