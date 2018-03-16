using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace tx2_api.Controllers
{
    [Route("api/[controller]")]
    public class PersonaController : Controller
    {
        [HttpGet]
        public IEnumerable<Persona> Get()
        {
            return PersonaModel.personas.OrderBy( e => e.id );
        }

        [HttpGet("{id}")]
        public Persona Get(int id)
        {
            return PersonaModel.personas.FirstOrDefault( e => e.id == id);
        }

        [HttpPost]
        public void Post([FromBody]Persona value)
        {
            int newId = PersonaModel.personas.Select(e => e.id).Max() + 1 ;

            PersonaModel.personas.Add( 
                new Persona () { 
                    id = newId, 
                    nombre = value.nombre,
                    apellido = value.apellido, 
                    edad = value.edad 
                });

        }

        [HttpPut]
        public void Put([FromBody]Persona value)
        {
            PersonaModel.personas.Remove( PersonaModel.personas.FirstOrDefault(e=>e.id==value.id));
            PersonaModel.personas.Add(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            PersonaModel.personas.Remove( PersonaModel.personas.FirstOrDefault(e=>e.id==id));
        }
    }

    static class PersonaModel
    {        
        static List<Persona> _personas;
        public static List<Persona> personas
        {
            get
            {
                if (_personas == null)
                {
                    _personas = new List<Persona>();

                    _personas.Add( new Persona() { id = 1, nombre = "Carlos", apellido = "Fuentes", edad = 25 } );
                    _personas.Add( new Persona() { id = 2, nombre = "Fernanda", apellido = "Gomez", edad = 35 } );
                    _personas.Add( new Persona() { id = 3, nombre = "Gabriela", apellido = "Castillo", edad = 45 } );
                    _personas.Add( new Persona() { id = 4, nombre = "Josue", apellido = "Robles", edad = 40 } );
                }

                return _personas;
            }
            
        }
    }

    public class Persona
    {
        public int id;
        public string nombre;

        public string apellido;

        public int edad;
    }

}