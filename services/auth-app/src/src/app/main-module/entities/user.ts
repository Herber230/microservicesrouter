import { BaseFrontEntity } from '../../core-module/entities/base-front-entity';
import { FrontDefinedEntity, FrontDefinedAccessor, EntityBindingMode} from '../../core-module/entities/front-metadata';
import { EntityResource } from '../../core-module/services/entity-resource.service';
import { Observable } from 'rxjs/Observable';

@FrontDefinedEntity({ resourceName: 'user', bindingMode: EntityBindingMode.strict } )
class User extends BaseFrontEntity
{
    //#region Properties

    private _name : string;
    private _password : string;
    
    //#endregion 


    //#region Methods

    // constructor (entityResource : EntityResource)
    // {
    //     super(entityResource);
    // }

    
    //#endregion


    //#region Accessors

    @FrontDefinedAccessor({remoteName: 'name'})
    get name()
    { return this._name; }
    set name(value)
    { this._name = value; }

    @FrontDefinedAccessor({remoteName: 'password'})
    get password()
    { return this._password; }
    set password(value)
    { this._password = value; }

    //#endregion
}

export { User }
