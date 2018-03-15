
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
                controllerAs: 'vm'                
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
        "baseUrl": "http://localhost:3001/api/"
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

    controller.$inject = ['$state', '$location'];

    function controller($state, $location)
    {
        var vm = this;

        function activate()
        {

        };

        vm.irAHome = function()
        {
            $state.go('app.home');
        };

        vm.irAListado = function()
        {
            $state.go('app.listado');
        };


        activate();
    };


})();
