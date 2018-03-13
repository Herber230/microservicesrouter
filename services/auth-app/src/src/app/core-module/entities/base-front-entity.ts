import { FrontEntityInfo, FrontDefinedAccessor, FrontDefinedEntity } from './front-metadata';
import { Observable } from 'rxjs/Observable';
import { EntityResource } from '../services/entity-resource.service';
import { Subscriber } from 'rxjs/Subscriber';

@FrontDefinedEntity( { abstract : true, packageName: 'CORE' })
class BaseFrontEntity
{
    //#region Properties

    entityInfo : FrontEntityInfo;    
    
    private _id : number;
    private __v : number;
    private _created : Date;
    private _modified : Date;

    private _resource : EntityResource;
    //#endregion

    //#region Methods

    constructor (entityResource : EntityResource)
    {
        this._resource = entityResource;
    }

    save() : Observable<void>
    {
         return new Observable<void>( suscriber => {

            this._resource.save(this, this.onSaving, this.onSaved).subscribe( () => {
                suscriber.next();
                suscriber.complete();
            });

         });
    }
    
    delete() : Observable<void>
    {
        return new Observable<void>( suscriber => {
            this._resource.delete(this, this.onDeleting, this.onSaving).subscribe( () => {
                suscriber.next();
                suscriber.complete();
            });
        });
    }

    serializePersistentObject() : any
    {
        var simpleObject = {};

        this.entityInfo.getPersistentMembers().forEach( member => {
            simpleObject[member.remoteName] = this[member.hasLocalDefinition ? member.localName : member.remoteName];
        });

        return simpleObject;
    }

    protected onSaving() : void
    {

    }
    
    remoteMethod<TPayload, TResult>(info : FrontEntityInfo, methodName : string, payload : TPayload) : Observable<TResult>
    {
        return new Observable<TResult>( suscriber => { 
            // TO BE PROGRAMMED
        });
    }

    protected onDeleting() : void
    {

    }

    protected onSaved() : void
    {

    }

    protected onDeleted() : void
    {

    }


    //#endregion

    //#region Accessors

    @FrontDefinedAccessor({remoteName: '_id'})
    get id()
    { return this._id; }
    set id(value)
    { this._id = value; }

    @FrontDefinedAccessor({remoteName: '__v'})
    get v()
    { return this.__v; }
    set v(value)
    { this.__v = value; }

    @FrontDefinedAccessor({remoteName: 'created'})
    get created()
    { return this._created; }
    set created(value)
    { this._created = value; }

    @FrontDefinedAccessor({remoteName: 'modified'})
    get modified()
    { return this._modified; }
    set modified(value)
    { this._modified = value; }

    //#endregion
}

export { BaseFrontEntity }