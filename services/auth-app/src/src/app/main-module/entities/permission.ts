import { BaseFrontEntity } from '../../core-module/entities/base-front-entity';
import { FrontDefinedEntity, FrontDefinedAccessor, EntityBindingMode} from '../../core-module/entities/front-metadata';

@FrontDefinedEntity({ resourceName: 'permission', bindingMode: EntityBindingMode.dynamic } )
class Permission extends BaseFrontEntity
{
    //#region Properties

    //#endregion 


    //#region Methods


    
    //#endregion


    //#region Accessors

    //#endregion
}

export { Permission }
