"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emEntityController_1 = require("../../../hc-core/express-mongoose/emEntityController");
class UserController extends emEntityController_1.EMEntityController {
    //#region Properties
    //#endregion
    //#region Methods
    defineRoutes() {
        super.defineRoutes();
        this._router.post(this._resourceName + '/login', (req, res, next) => this.login(req, res, next));
    }
    login(request, response, next) {
        let credentials = request.body;
        this.session.listDocuments('User', { name: credentials.user, password: credentials.password }).then(results => {
            if (results.length > 0)
                this.responseWrapper.logicAccept(response, 'Login approved');
            else
                this.responseWrapper.logicError(response, 'Login denied');
        }, error => this.responseWrapper.sessionError(response, error));
    }
}
exports.UserController = UserController;
