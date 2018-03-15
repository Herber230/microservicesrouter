//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

//Custom framework
import { EMSession } from './hc-core/express-mongoose/emSession';
import { EMRouterManager } from './hc-core/express-mongoose/emRouterManager'
import { EMEntityController } from './hc-core/express-mongoose/emEntityController';

//Application
import PermissionEntity = require('./app/entities/permission/permission');
import UserEntity = require('./app/entities/user/user');
import { UserController } from './app/entities/user/userController';
import ModuleEntity = require('./app/entities/module/module');

export class App {

    private _expressApp : express.Application;
    private _session : EMSession;
    private _routerManager : EMRouterManager;

    constructor( port: number )
    {
        //Create Express App
        this._expressApp = express();
        this._expressApp.set('port', port);

        //Create Session and connect to mongodb
        this._session = new EMSession();
        this._session.connect('authdb:27017/authbd001');

        //Call app bootstrap methods
        this.middleware();        
        this.registerEntities();        
        this.exposeEntities();

        //Enable development mode
        this._session.enableDevMode();
    }

    private middleware():void 
    {
        //Parser
        this._expressApp.use(bodyParser.json());

        //Enable CORS Requests
        let options:cors.CorsOptions = 
        {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            //origin: API_URL,
            preflightContinue: false
        };   

        this._expressApp.use(cors(options));

        //Temp test
        this._expressApp.get('/', ( request:express.Request, response: express.Response )=>{
            
                response.json({
                    message: "Servidor funcionando chingonamente"
                });
            
            });
    }

    private registerEntities() : void {
        
        this._session.registerEntity<PermissionEntity.IPermissionModel, PermissionEntity.Permission>( PermissionEntity.Permission, PermissionEntity.Permission.getInfo() );
        this._session.registerEntity<UserEntity.IUserModel, UserEntity.User>( UserEntity.User, UserEntity.User.getInfo() );
        this._session.registerEntity<ModuleEntity.IModuleModel, ModuleEntity.Module>( ModuleEntity.Module, ModuleEntity.Module.getInfo() );

    }


    private exposeEntities() : void{

        this._routerManager = new EMRouterManager( this._session, this._expressApp );
        
        this._routerManager.exposeEntity('User', new UserController("User", this._session));
        this._routerManager.exposeEntity('Permission'); 
        this._routerManager.exposeEntity('Module');
           
    }
    
    get instanceApp(): express.Application {
        return this._expressApp;
    }

}
