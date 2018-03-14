"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Core framework
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//Custom framework
const emSession_1 = require("./hc-core/express-mongoose/emSession");
const emRouterManager_1 = require("./hc-core/express-mongoose/emRouterManager");
//Application
const PermissionEntity = require("./app/entities/permission/permission");
const UserEntity = require("./app/entities/user/user");
const userController_1 = require("./app/entities/user/userController");
const ModuleEntity = require("./app/entities/module/module");
class App {
    constructor(port) {
        //Create Express App
        this._expressApp = express();
        this._expressApp.set('port', port);
        //Create Session and connect to mongodb
        this._session = new emSession_1.EMSession();
        this._session.connect('localhost:27017/authbd001');
        //Call app bootstrap methods
        this.middleware();
        this.registerEntities();
        this.exposeEntities();
        //Enable development mode
        this._session.enableDevMode();
    }
    middleware() {
        //Parser
        this._expressApp.use(bodyParser.json());
        //Enable CORS Requests
        let options = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            //origin: API_URL,
            preflightContinue: false
        };
        this._expressApp.use(cors(options));
        //Temp test
        this._expressApp.get('/', (request, response) => {
            response.json({
                message: "Servidor funcionando chingonamente"
            });
        });
    }
    registerEntities() {
        this._session.registerEntity(PermissionEntity.Permission, PermissionEntity.Permission.getInfo());
        this._session.registerEntity(UserEntity.User, UserEntity.User.getInfo());
        this._session.registerEntity(ModuleEntity.Module, ModuleEntity.Module.getInfo());
    }
    exposeEntities() {
        this._routerManager = new emRouterManager_1.EMRouterManager(this._session, this._expressApp);
        this._routerManager.exposeEntity('User', new userController_1.UserController("User", this._session));
        this._routerManager.exposeEntity('Permission');
        this._routerManager.exposeEntity('Module');
    }
    get instanceApp() {
        return this._expressApp;
    }
}
exports.App = App;
