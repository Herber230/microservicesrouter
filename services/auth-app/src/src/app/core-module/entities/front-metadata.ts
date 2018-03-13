import { BaseFrontEntity } from './base-front-entity';
import { EntityResource } from '../services/entity-resource.service';
import { Observable } from 'rxjs/Observable';
import 'reflect-metadata';

class FrontEntityInfo
{
    //#region Properties

    private _name : string;
    private _resourceName : string;
    private _metadataSufix : string;
    private _constructor : (entityResource : EntityResource) => void;
    private _base : FrontEntityInfo;
    private _isAbstract : boolean;
    private _definedMembers : Array<FrontMemberInfo>;
    private _readyMetadata : boolean;
    private _packageName : string;
    private _bindingMode : EntityBindingMode;
    //#endregion


    //#region Methods

    constructor(name : string) 
    {
        this._name = name;
      
        //Default values
        this._definedMembers = new Array<FrontMemberInfo>();
        this._metadataSufix = 'metadata';
        this._readyMetadata = false;
    }

    implementBaseInfo(baseInfo : FrontEntityInfo) : void;
    implementBaseInfo(baseInfo : FrontEntityInfo, isAbstract: boolean) : void;
    implementBaseInfo(baseInfo : FrontEntityInfo, isAbstract?: boolean) : void
    {
        if ( isAbstract != null)
            this._isAbstract = isAbstract;

        if ( baseInfo._definedMembers != null && baseInfo._definedMembers.length > 0)
        {
            let i = 0;
            while ( baseInfo._definedMembers.length > i )
            {
                let member = baseInfo._definedMembers[i];
                if (member.className == this._name)
                {
                    baseInfo._definedMembers.splice(i, 1);
                    this._definedMembers.push(member);
                }
                else
                    i++;
            }
        }

        this._base = baseInfo;
    }

    loadRemoteMetadata (resource : EntityResource) : Observable<void>
    {        
        return new Observable<void>( suscriber => {

            if (!this._readyMetadata)
            {
                resource.getMetadata(this).subscribe( 
                    metadata => { 
                        metadata.forEach( md => {
                            
                            let info : FrontMemberInfo;

                            info = this.getAllMembers().find( m => m.remoteName == md.name);

                            if (info == null)
                            {
                                info = new FrontMemberInfo();
                                this._definedMembers.push(info);    

                                info.remoteName = md.name;
                            }

                            info.hasRemoteDefinition = true;
                            info.remoteTypeName = md.type;
                            info.persistent = md.persistent;
                        } 
                                                            );
                        this._readyMetadata = true;
                        suscriber.next();
                        suscriber.complete();
                    }
                );
            }
            else
            {
                suscriber.next();
                suscriber.complete();
            }
        });
    }

    activateInstace<TEntity extends BaseFrontEntity>( entityResource: EntityResource, data : any ) : TEntity 
    {
        let entityInstance = <TEntity>construct(this._constructor, entityResource);

        this.getAllMembers().forEach( memberInfo => {
            
            switch (this._bindingMode)
            {
                case EntityBindingMode.strict:
                {
                    if (memberInfo.hasLocalDefinition && memberInfo.hasRemoteDefinition)
                        (<any>entityInstance)[memberInfo.localName] = convertValue(memberInfo.remoteTypeName, data[memberInfo.remoteName]);
                    
                    break;
                }

                case EntityBindingMode.dynamic:
                {
                    if (memberInfo.hasRemoteDefinition)
                    {
                        let localProperty = memberInfo.hasLocalDefinition ? memberInfo.localName : memberInfo.remoteName;

                        if ((<any>entityInstance)[localProperty])
                            (<any>entityInstance)[localProperty] = convertValue(memberInfo.remoteTypeName, data[memberInfo.remoteName]);                        
                        else
                            Object.defineProperty(entityInstance, localProperty, { value: convertValue(memberInfo.remoteTypeName, data[memberInfo.remoteName]), writable: true});
                    }
                    
                    break;
                }
                
                case EntityBindingMode.semiStrict:
                {
                    // To be programmed
                }
           }

        });

        return entityInstance;                   
    } 

    setConstructor(constructor : (entityResource : EntityResource) => void)
    {
        if (!this._constructor)
            this._constructor = constructor;
    }

    getAllMembers() : Array<FrontMemberInfo>
    {
        let allMembers = new Array<FrontMemberInfo>();

        let tempInfo : FrontEntityInfo = this;

        while (tempInfo)
        {
            allMembers = allMembers.concat(tempInfo._definedMembers);
            tempInfo = tempInfo.base;
        }

        return allMembers;
    }
    
    getPersistentMembers() : Array<FrontMemberInfo>
    {
        return this.getAllMembers().filter( member => member.persistent );
    }

    isMetadataReady() : boolean
    {
        return this._readyMetadata;
    }

    addMemberInfo(memberInfo : FrontMemberInfo) : void
    {
        this._definedMembers.push(memberInfo);
    } 

    //#endregion


    //#region Accessors


    get base ()
    { return this._base; }

    get name ()
    { return this._name; }
    set name (value)
    { this._name = value; }

    get resourceName ()
    { return this._resourceName; }
    set resourceName (value)
    { this._resourceName = value; }

    get metadataSufix ()
    { return this._metadataSufix; }
    set metadataSufix (value)
    { this._metadataSufix = value; }

    get packageName ()
    { return this._packageName; }
    set packageName (value)
    { this._packageName = value; }

    get bindingMode()
    { return this._bindingMode; }
    set bindingMode(value)
    { this._bindingMode = value; }

    //#endregion
}

function construct (constructor : (entityResource : EntityResource) => void, entityResource : EntityResource) 
{
    // var c : any = function()
    // {
    //     return constructor.apply(this, entityResource);
    // }

    // c.prototype = constructor.prototype;

    // return new c();

    return new constructor(entityResource);
}

function convertValue ( typeName : string , value : any ) : any
{
    switch (typeName)
    {
        // case 'Number':
        //     return <T>(<any>parseFloat(value));
        // case 'String':
        //     return <T>();
        case 'Date':
            return new Date(value);
        
        default:
            return value;           
    }
}

function FrontDefinedEntity( );
function FrontDefinedEntity( params : { resourceName? :string, abstract? : boolean, packageName? : string, bindingMode? : EntityBindingMode } );
function FrontDefinedEntity( params? : { resourceName? :string, abstract? : boolean, packageName? : string, bindingMode? : EntityBindingMode } )
{
    return function(target : Function)
    {   
        let tempNameUrl = params != null && params.resourceName != null ? params.resourceName : target.name.toLowerCase();
        let tempIsAbstract = params != null && params.abstract != null ? params.abstract : false;
        let tempPackageName = params != null && params.packageName != null ? params.packageName : 'app';
        let tempBindingMode = params != null && params.bindingMode != null ? params.bindingMode : EntityBindingMode.strict;

        let createEntityInfo : () => FrontEntityInfo = () =>
        {
            let newInfo = new FrontEntityInfo(target.name);
            newInfo.setConstructor(<(entityResource : EntityResource) => void>target);
            newInfo.packageName = tempPackageName;
            newInfo.bindingMode = tempBindingMode;
            newInfo.resourceName = tempNameUrl;

            return newInfo;
        }

        if (!target.prototype.entityInfo)
            target.prototype.entityInfo = createEntityInfo();

        let info : FrontEntityInfo = target.prototype.entityInfo;

        if (info.name != target.name)
        {
            let newInfo = createEntityInfo();
            newInfo.implementBaseInfo( info , tempIsAbstract );
            target.prototype.entityInfo = newInfo;
            info = newInfo;
        }

    }    
}

function FrontDefinedAccessor( params? : { remoteName? :string })
{
    params = params || { };
    return function (target: any, key: string, descriptor : PropertyDescriptor)
    {        
        if (!target.entityInfo)
            target.entityInfo = new FrontEntityInfo(target.constructor.name);

        var entityInfo : FrontEntityInfo = target.entityInfo;
        var reflectInfo = Reflect.getMetadata('design:type', target, key);
        var info : FrontMemberInfo;
        let propertyName = params.remoteName != null ? params.remoteName : key;
        
        info = entityInfo.getAllMembers().find( m => m.remoteName == propertyName );
        
        if (info == null)
        {
            info = new FrontMemberInfo();
            entityInfo.addMemberInfo(info);    
        }

        info.hasLocalDefinition = true;
        info.localName = key;
        info.localTypeName = reflectInfo.name;
        
        if (params.remoteName)
            info.remoteName = params.remoteName;
    }
}

class FrontMemberInfo
{
    //#region Properties

    private _localName : string;
    private _localTypeName : string;
    private _hasLocalDefinition : boolean;

    private _remoteName : string;
    private _remoteTypeName : string;
    private _hasRemoteDefinition : boolean;
    private _persistent : boolean;

    private _className : string;

    //#endregion


    //#region Methods

    constructor( )
    {
        this._hasLocalDefinition = false;
        this._hasRemoteDefinition = false;    
    }

    //#endregion


    //#region Accessors

    get hasRemoteDefinition ()
    { return this._hasRemoteDefinition; }
    set hasRemoteDefinition (value)
    { this._hasRemoteDefinition = value; }

    get hasLocalDefinition ()
    { return this._hasLocalDefinition; }
    set hasLocalDefinition (value)
    { this._hasLocalDefinition = value; }

    get persistent ()
    { return this._persistent; }
    set persistent (value)
    { this._persistent = value; }

    get localTypeName ()
    { return this._localTypeName; }
    set localTypeName (value)
    { this._localTypeName = value; }

    get remoteTypeName ()
    { return this._remoteTypeName; }
    set remoteTypeName (value)
    { this._remoteTypeName = value; }

    get localName ()
    { return this._localName; }
    set localName (value)
    { this._localName = value; }

    get remoteName ()
    { return this._remoteName; }
    set remoteName (value)
    { this._remoteName = value; }

    get className ()
    { return this._className; }
    set className (value)
    { this._className = value; }
   
    //#endregion
}

enum EntityBindingMode
{
    strict = 1,
    dynamic = 2,
    semiStrict = 3
}

export { FrontEntityInfo, FrontDefinedEntity, FrontMemberInfo, EntityBindingMode, FrontDefinedAccessor }