"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UserModule = require("./entities/user/user");
var app = express();
class Router {
    constructor() {
    }
    get getRoutes() {
        app.use('/', UserModule.Router.createRoutes());
        return app;
    }
}
exports.Router = Router;
