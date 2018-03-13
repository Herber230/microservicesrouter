import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { FrontSession } from '../../../core-module/services/front-session.service';
import { EntityResource } from '../../../core-module/services/entity-resource.service';
import { isNumber } from 'util';
import { User } from '../../entities/user';


@Component( { 
    templateUrl: './user-edit.html', 
    styleUrls: ['./user-edit.css'],
    selector: 'user-edit',
    providers: [ EntityResource ]

})
export class UserEdit implements OnInit {

    //#region Properties

    private _idUserLoaded : string;
    private _confirmPassword : string;
    private _user : User;

    //#endregion

    //#region Methods

    constructor(private router : Router, private activatedRoute : ActivatedRoute, private entityResource : EntityResource ) { }

    validateForm( form : any) : boolean
    {
        return form.valid && this._user != null && ( this._user.password == this._confirmPassword );
    }

    cancel( ) : void
    {
        this.router.navigate(['home/users']);
    }

    trySubmit( valid : boolean) : void
    {
        this._user.save().subscribe( e => this.router.navigate(['home/users']) );
    }

    ngOnInit() : void
    {   
        this.activatedRoute.params.subscribe( params => 
            {
                if (params != null && params.id != null)
                {
                    this._idUserLoaded = params.id;

                    if (isNaN(params.id))
                    {
                        if (this._idUserLoaded != null && this._idUserLoaded.length > 2)
                            this.loadEntity();
                    }
                    else if (parseInt(this._idUserLoaded) > 0)
                            this.loadEntity();
                    else
                        this.createEntity();    
                }                        
            }
        );
    }

    private loadEntity () : void
    {
        this.entityResource.getSingle<User>(User.prototype.entityInfo, this._idUserLoaded).subscribe( userResult => {
            this._user = userResult;
        });
    }

    private createEntity () : void
    {
        this._user = new User(this.entityResource);
    }

    //#endregion

    //#region Accessors

    get user()
    { return this._user != null ? this._user.name : null; }
    set user(value)
    { if (this._user) this._user.name = value; }

    get password()
    { return this._user != null ? this._user.password : null; }
    set password(value)
    { if (this._user) this._user.password = value; }

    get confirmPassword()
    { return this._confirmPassword; }
    set confirmPassword(value)
    { this._confirmPassword = value; }

    get title()
    { 
        if (this._idUserLoaded == '-1' )
            return 'Agregar Usuario';
        else if (this._idUserLoaded != null && this._idUserLoaded.length > 2)
            return 'Editar Usuario';
        else
            return 'Datos de Usuario';
    }

    //#endregion
}