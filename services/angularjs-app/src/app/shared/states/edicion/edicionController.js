(function(){

    'use strict';

    angular.module('app.ejemplo').controller('edicionController', controller);

    controller.$inject = ['PersonaService', '$stateParams', '$state', 'apiSelector'];

    function controller(PersonaService, $stateParams, $state, apiSelector)
    {
        var vm = this;

        function activate()
        {
            if($stateParams.id > 0)
                cargarPersona();
        };

        vm.guardar = function()
        {
            PersonaService.save(apiSelector.get(), vm.persona).then( 
                (responseSuccess)=>{
                    console.info("Persona guardada");
                    $state.go('app.listado');
                }, (responseError)=>{
                    console.info("Error");
                } );
        };

        vm.eliminar = function()
        {
            PersonaService.delete(apiSelector.get(), vm.persona.id).then( 
                (responseSuccess)=>{
                    console.info("Persona eliminada");
                    $state.go('app.listado');
                }, (responseError)=>{
                    console.info("Error");
                } );
        };

        vm.cancelar = function()
        {
            $state.go('app.listado');
        };

        vm.puedeEliminar = function()
        {
            return $stateParams.id > 0;
        };

        function cargarPersona()
        {
            PersonaService.get(apiSelector.get(), $stateParams.id).then( 
                (responseSuccess)=>{
                    vm.persona = responseSuccess.data;
                }, (responseError)=>{
                    console.info("Error");
                } );
        };

        vm.getTitulo = function()
        {
            if ($stateParams.id > 0)
                return 'Editando persona';
            else
                return 'Agregando persona';
        };

        activate();
    };


})();