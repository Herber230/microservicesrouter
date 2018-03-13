import express = require('express');

import { EMEntityController } from '../../../hc-core/express-mongoose/emEntityController';
import { User, IUserModel } from './user';
import { EMResponseWrapper } from '../../../hc-core/express-mongoose/emWrapper';

class UserController extends EMEntityController<IUserModel, User>
{
    //#region Properties

    //#endregion


    //#region Methods

    protected defineRoutes () : void
    {
        super.defineRoutes();
    
        this._router.post(this._resourceName + '/login', (req, res, next) => this.login(req,res,next));
    }

    login( request : express.Request, response : express.Response, next : express.NextFunction) : void
    {
        let credentials = <{ user: string, password: string }>request.body;
        this.session.listDocuments<IUserModel>('User', { name: credentials.user, password: credentials.password }).then(
            results => {
                if (results.length > 0)
                    this.responseWrapper.logicAccept(response, 'Login approved');
                else
                    this.responseWrapper.logicError(response, 'Login denied');
            },
            error  => this.responseWrapper.sessionError(response, error) 
        );
    }

    //#endregion


    //#region Accessors

    //#endregion
}

export { UserController }