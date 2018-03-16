
(function(){

    'use strict';

    angular.module('app.ejemplo').controller('listadoController', controller);

    controller.$inject = ['PersonaService', '$state', 'apiSelector'];

    function controller(PersonaService, $state, apiSelector)
    {
        var vm = this;

        apiSelector.reload = function()
        {
            cargarPersonas();
        }

        function activate()
        {
            cargarPersonas();
        };

        function cargarPersonas()
        {
            PersonaService.getCollection(apiSelector.get()).then(
                (responseSuccess)=>{
                    vm.personas = responseSuccess.data;
                },(responseError)=>{

                }
            );
        };

        vm.verPersona = function(persona)
        {
            $state.go('app.edicion', { id: persona.id });
        };

        vm.eliminarPersona = function(persona)
        {
            PersonaService.delete(apiSelector.get(), persona.id).then( 
                (responseSuccess)=>{
                    console.info("Persona eliminada");
                    cargarPersonas();
                }, (responseError)=>{
                    console.info("Error");
                } );
        };

        vm.agregarPersona = function()
        {
            $state.go('app.edicion', { id: -1 });
        };

        activate();
    };


})();