
(function(){

    'use strict';

    angular.module('app.ejemplo').controller('listadoController', controller);

    controller.$inject = ['PersonaService', '$state'];

    function controller(PersonaService, $state)
    {
        var vm = this;

        function activate()
        {
            cargarPersonas();
        };

        function cargarPersonas()
        {
            PersonaService.getCollection().then(
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
            PersonaService.delete(persona.id).then( 
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