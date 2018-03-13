import { Component, OnInit } from '@angular/core';

import { EntityResource } from '../../../../core-module/services/entity-resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Module } from '../../../entities/module';


@Component({
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    selector: 'dashboard',
    providers: [ EntityResource ]
})
class Dashboard implements OnInit
{
    //#region Properties
    
    modules : Array<Module>;
    

    //#endregion

    //#region Methods

    constructor(private entityResource : EntityResource, private router : Router ) { }

    ngOnInit() : void
    {
        this.entityResource.getCollection<Module>(Module.prototype.entityInfo).subscribe( 
            results => 
            { 
                if (this.modules == null)
                    this.modules = new Array<Module>();

                this.modules = results;
            }
        );
    }

    navigateToModule( module : Module)
    {
        //Url is a dynamic property loaded from backend metadata
        let url : string = (<any>module).url;
        window.location.href = url;
    }
    //#endregion


    //#region Accessors

    //#endregion

}

export { Dashboard }