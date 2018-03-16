package hello;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class PersonaController {

    
	@RequestMapping(value = "/persona", method = RequestMethod.GET)
	public ResponseEntity<List<Persona>> get() {

		List<Persona> personas = personasDummyArray();
		
		return new ResponseEntity<List<Persona>>(personas, HttpStatus.OK);
    }
    
	@RequestMapping(value = "/persona/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getSingle(@PathVariable("id") long id) {
        
        List<Persona> personas = personasDummyArray();
        Persona persona = null; 
		
        for (int i = 0; i < personas.size(); i ++)
        {
            if (personas.get(i).getId() == id)
            {
                persona = personas.get(i);
                break;
            }
        }
        
		return new ResponseEntity<Persona>(persona, HttpStatus.OK);
	}

	@RequestMapping(value = "/persona", method = RequestMethod.POST)
	public ResponseEntity<?> post(@RequestBody Persona persona) {
        
        List<Persona> personas = personasDummyArray();
        int max = 0;
        for (int i = 0; i < personas.size(); i ++)
        {
            if (personas.get(i).getId() > max)
                max = personas.get(i).getId();
        }
        
        persona.setId( max + 1);
        _personasArray.add(persona);
		return new ResponseEntity<String>("Created", HttpStatus.CREATED);
	}

	
	@RequestMapping(value = "/persona", method = RequestMethod.PUT)
	public ResponseEntity<?> put(@RequestBody Persona persona) {
        
        List<Persona> personas = personasDummyArray();
        int index = 0;
        for (int i = 0; i < personas.size(); i ++)
        {
            if (personas.get(i).getId() == persona.getId())
            {
                index = i;
                break;
            }
        }

        _personasArray.remove(index);
        _personasArray.add(persona);
		return new ResponseEntity<String>("Updated", HttpStatus.OK);
	}

	@RequestMapping(value = "/persona/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") long id) {
		List<Persona> personas = personasDummyArray();
        int index = 0;
        for (int i = 0; i < personas.size(); i ++)
        {
            if (personas.get(i).getId() == id)
            {
                index = i;
                break;
            }
        }

        _personasArray.remove(index);

		return new ResponseEntity<String>("Removed", HttpStatus.OK);
	}

	

    static List<Persona> _personasArray;
    static List<Persona> personasDummyArray()
    {
        if (_personasArray == null)
        {
            _personasArray = new ArrayList<Persona>();

            _personasArray.add( new Persona(1, "Raul", "Gonzalez", 25));
            _personasArray.add( new Persona(2, "Lucia", "Mendoza", 27));
            _personasArray.add( new Persona(3, "Jorge", "Perez", 48));
            _personasArray.add( new Persona(4, "Ingrid", "Martinez", 23));
            _personasArray.add( new Persona(5, "Maria Jose", "Diaz", 35));
        }

        return _personasArray;
    }

}
