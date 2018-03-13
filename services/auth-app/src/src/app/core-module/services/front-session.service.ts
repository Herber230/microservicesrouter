import { Injectable, Optional } from '@angular/core';

class FrontSessionConfig 
{
    //#region Properties

    //#endregion

    //#region Methods

    constructor ( public devMode : boolean ) {

    }

    //#endregion

    //#region Accessors

    //#endregion

}



@Injectable()
class FrontSession 
{
    //#region Properties

    private _user : string;
    private _devMode : boolean;

    //#endregion


    //#region Methods

    constructor( @Optional() config: FrontSessionConfig) {
        if (config)
            this._devMode = config.devMode;
     }
    //#endregion


    //#region Accessors

    get user() : string
    { return this._user; }
    set user(value: string) 
    { this._user = value; }

    get devMode()
    { return this._devMode; }
    //#endregion

}

export{ FrontSession, FrontSessionConfig}


// import { BaseFrontEntity } from './baseFrontEntity';
// import { Observable } from 'rxjs/Observable';


// class FrontSession
// {
//     //#region Properties

//     //#endregion

//     //#region Methods

//     constructor ( )
//     {
        
//     }

//     getCollection<TEntity extends BaseFrontEntity>() : Observable<Array<TEntity>>
//     {

//     }

//     findEntity<TEntity extends BaseFrontEntity>() : Observable<TEntity>
//     {

//     }

//     saveEntity<TEntity extends BaseFrontEntity>() : Observable<TEntity>
//     {

//     }

//     deleteEntity<TEntity extends BaseFrontEntity>() : Observable<TEntity>
//     {
        
//     }


//     //#endregion

//     //#region Accessors

//     //#endregion
// }

// export { FrontSession }