import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { EntityResource } from '../../../core-module/services/entity-resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../../entities/module';

@Component({
    templateUrl: './module-edit.html',
    styleUrls: ['./module-edit.css'],
    selector: 'module-edit'
})
class ModuleEdit
{
    //#region Properties

    private _idLoaded : string;
    private _module : Module;

    //#endregion


    //#region Methods

    constructor(private router : Router, private activatedRoute : ActivatedRoute, private entityResource : EntityResource ) { }

    validateForm( form : any) : boolean
    {
        return form.valid;
    }

    cancel( ) : void
    {
        this.router.navigate(['home/modules']);
    }

    trySubmit( valid : boolean) : void
    {
        this._module.save().subscribe( e => this.router.navigate(['home/modules']) );
    }

    ngOnInit() : void
    {   
        this.activatedRoute.params.subscribe( params => 
            {
                if (params != null && params.id != null)
                {
                    this._idLoaded = params.id;

                    if (isNaN(params.id))
                    {
                        if (this._idLoaded != null && this._idLoaded.length > 2)
                            this.loadEntity();
                    }
                    else if (parseInt(this._idLoaded) > 0)
                            this.loadEntity();
                    else
                        this.createEntity();    
                }                        
            }
        );
    }

    private loadEntity () : void
    {
        this.entityResource.getSingle<Module>(Module.prototype.entityInfo, this._idLoaded).subscribe( result => {
            this._module = result;
        });
    }

    private createEntity () : void
    {
        this._module = new Module(this.entityResource);
    }

    //#endregion


    //#region Accessors

    get module()
    {
        if (this._module) 
            return this._module;
        else
            return new Module(this.entityResource);
    }
    set module(value)
    {         
        this._module = value; 
    }

    //#endregion
}

export { ModuleEdit }