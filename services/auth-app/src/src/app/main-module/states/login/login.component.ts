import { Component } from "@angular/core";
import { ObservableMedia } from '@angular/flex-layout';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FrontSession } from '../../../core-module/services/front-session.service';
import { EntityResource } from '../../../core-module/services/entity-resource.service';
import { User } from '../../entities/user';

@Component({ 
    templateUrl: './login.html', 
    styleUrls: [ './login.css' ],
    providers: [EntityResource]
})
export class Login {

    //#region Properties
    
    private _showPass : boolean = false;
    private _user : string;
    private _password: string;

    //#endregion
    
    
    //#region Methods

    constructor(private router : Router, private session : FrontSession, private resource : EntityResource) { 

    }

    goSigin() : void
    {

    }

    tryLogin(valid : boolean) : void
    {
        if (valid)
        {
            let credentials : any = {
                user: this._user,
                password: this._password
            };

            this.resource.remoteStaticMethod<{user:string, password:string},any>(User.prototype.entityInfo, 'login', credentials).subscribe( response => {
                if (response.isLogicError)
                {
                    this._user = '';
                    this._password = '';
                }
                else
                    this.router.navigate(['home']);
            } );


        }
    }
    
    //#endregion


    //#region Accessors

    get user ()
    { return this._user; }
    set user(value)
    { this._user = value; }

    get password ()
    { return this._password; }
    set password (value)
    { this._password = value; }

    get showPass ()
    { return this._showPass; }
    set showPass (value)
    { this._showPass = value; }

    //#endregion   
}