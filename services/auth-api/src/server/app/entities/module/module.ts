import { IBaseEntity, EMEntity, EntityDocument } from '../../../hc-core/express-mongoose/emEntity';

import { DefinedEntity, DefinedAccessor } from '../../../hc-core/hcMetaData';

interface IModule extends IBaseEntity
{
    name: string,
    url: string,
    displayName: string
}

interface IModuleModel extends EntityDocument, IModule { }

@DefinedEntity()
class Module extends EMEntity implements IModule
{
    //#region Properties

    //#endregion

    //#region Methods

    //#endregion

    //#region Accessors

    @DefinedAccessor({ exposed: true, schema: { type: String, required: true }})
    get name() : string
    { return (<IModuleModel>this._document).name; }
    set name(value: string)
    { (<IModuleModel>this._document).name = value; }

    @DefinedAccessor({ exposed: true, schema: { type: String, required: true }})
    get url() : string
    { return (<IModuleModel>this._document).url; }
    set url(value: string)
    { (<IModuleModel>this._document).url = value; }

    @DefinedAccessor({ exposed: true, schema: { type: String, required: true }})
    get displayName() : string
    { return (<IModuleModel>this._document).displayName; }
    set displayName(value: string)
    { (<IModuleModel>this._document).displayName = value; }

    //#endregion
}

export { Module, IModuleModel }

