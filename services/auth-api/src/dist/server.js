"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
var port = 3000;
var newExpressAppInstance = new app_1.App(port).instanceApp;
var server = http.createServer(newExpressAppInstance);
server.listen(port, () => {
    console.log('Server listening on port:' + port);
});
