
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
            console.log('Se van a cargar personas');
            
            let promesaDeDatos = PersonaService.getCollection(apiSelector.get());
            
            promesaDeDatos.then(
                (responseSuccess)=>
                {
                    var algo = responseSuccess;
                    console.log("Aqui ya se cargaron las personas")
                    vm.personas = responseSuccess.data;
                },
                function(responseError){
                    var otraCosa = responseError;
                    console.log('Hubo un error al cargar las personas')
                }
            );

            console.log('Ya se mandaron a pedir a las personas');
            
            
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