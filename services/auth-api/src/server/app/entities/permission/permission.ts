import express = require('express');
import mongoose = require('mongoose');

import { EMEntity, IBaseEntity, EntityDocument } from '../../../hc-core/express-mongoose/emEntity';
import { Entity } from '../../../hc-core/hcEntity';
import { DefinedAccessor, DefinedEntity } from './../../../hc-core/hcMetaData';

interface IPermission extends IBaseEntity
{
    userKey: string,
    level: number
}

interface IPermissionModel extends EntityDocument, IPermission { }

@DefinedEntity( )
class Permission extends EMEntity implements IPermission
{
    //#region Properties (Fields)

    //#endregion



    //#region Methods

    
    //#endregion



    //#region Accessors (Properties)
    
    @DefinedAccessor({ schema: { type: String, require: true}, exposed: true })
    get userKey ()
    { return (<IPermissionModel>this._document).userKey; }
    set userKey (value)
    { (<IPermissionModel>this._document).userKey = value; }

    @DefinedAccessor({ schema: { type: Number, require: true}, exposed: true}) 
    get level () : number
    { return (<IPermissionModel>this._document).level; }
    set level (value : number)
    { (<IPermissionModel>this._document).level = value; }

    //#endregion

}

export { IPermissionModel, Permission }