import { EMEntity, IBaseEntity, EntityDocument } from '../../../hc-core/express-mongoose/emEntity';
import { Entity } from '../../../hc-core/hcEntity';
import { DefinedEntity, DefinedAccessor } from '../../../hc-core/hcMetaData';

interface IUser extends IBaseEntity
{
    name: string,
    password: string
}

interface IUserModel extends EntityDocument, IUser { }

@DefinedEntity( )
class User extends EMEntity implements IUser
{
    //#region Properties (Fields)

    //#endregion


    //#region Methods

    save() : Promise<void>
    {
        return super.save();
    }

    //#endregion


    //#region Accessors (Properties)

    @DefinedAccessor({ exposed: true, schema: { type: String, require: true } })
    get name () : string
    { return (<IUserModel>this._document).name; }
    set name (value : string)
    { (<IUserModel>this._document).name = value; }
    
    @DefinedAccessor({ exposed: true, schema: { type: String, require: true}})
    get password () : string
    { return (<IUserModel>this._document).password; }
    set password (value : string)
    { (<IUserModel>this._document).password = value; }

    //#endregion
}

export { User, IUserModel};








