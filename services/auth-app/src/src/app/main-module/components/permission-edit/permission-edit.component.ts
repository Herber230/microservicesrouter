import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Permission } from '../../entities/permission';
import { FrontSession } from '../../../core-module/services/front-session.service';
import { EntityResource } from '../../../core-module/services/entity-resource.service';

@Component({
    templateUrl: './permission-edit.html',
    styleUrls: ['./permission-edit.css'],
    selector: 'permission-edit'
})
class PermissionEdit
{
    //#region Properties

    private _idPermissionLoaded : string;
    private _permission : Permission;

    //#endregion


    //#region Methods
    
    constructor(private router : Router, private activatedRoute : ActivatedRoute, private entityResource : EntityResource ) { }

    validateForm( form : any) : boolean
    {
        return form.valid;
    }

    cancel( ) : void
    {
        this.router.navigate(['home/permissions']);
    }

    trySubmit( valid : boolean) : void
    {
        this._permission.save().subscribe( e => this.router.navigate(['home/permissions']) );
    }

    ngOnInit() : void
    {   
        this.activatedRoute.params.subscribe( params => 
            {
                if (params != null && params.id != null)
                {
                    this._idPermissionLoaded = params.id;

                    if (isNaN(params.id))
                    {
                        if (this._idPermissionLoaded != null && this._idPermissionLoaded.length > 2)
                            this.loadEntity();
                    }
                    else if (parseInt(this._idPermissionLoaded) > 0)
                            this.loadEntity();
                    else
                        this.createEntity();    
                }                        
            }
        );
    }

    private loadEntity () : void
    {
        this.entityResource.getSingle<Permission>(Permission.prototype.entityInfo, this._idPermissionLoaded).subscribe( result => {
            this._permission = result;
        });
    }

    private createEntity () : void
    {
        this._permission = new Permission(this.entityResource);
    }

    //#endregion


    //#region Accessors

    get permission()
    { return this._permission; }
    set permission(value)
    { this._permission = value; }

    //#endregion
}

export { PermissionEdit }