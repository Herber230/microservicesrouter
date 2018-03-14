import http = require('http');
import { App } from './app';

var port: number = 3000;

var newExpressAppInstance = new App(port).instanceApp;

var server = http.createServer( newExpressAppInstance );
server.listen(port, '0.0.0.0', ()=>{
    console.log('Server listening on port:' + port);
});
