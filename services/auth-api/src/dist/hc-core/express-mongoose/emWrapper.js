"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hcWrapper_1 = require("../hcWrapper");
const emSession_1 = require("./emSession");
class EMResponseWrapper {
    object(response, object, status) {
        response.statusCode = status || 200;
        response.send(hcWrapper_1.Wrapper.wrapObject(false, null, object));
    }
    document(response, document, status) {
        response.statusCode = status || 200;
        response.send(hcWrapper_1.Wrapper.wrapObject(false, null, document));
    }
    entity(response, entity, status) {
        response.statusCode = status || 200;
        response.send(hcWrapper_1.Wrapper.wrapObject(false, null, entity.serializeExposedAccessors()));
    }
    documentCollection(response, documents, status) {
        response.statusCode = status || 200;
        response.send(hcWrapper_1.Wrapper.wrapCollection(false, null, documents));
    }
    entityCollection(response, entities, status) {
        response.statusCode = status || 200;
        response.send(hcWrapper_1.Wrapper.wrapCollection(false, null, entities.map(a => a.serializeExposedAccessors())));
    }
    sessionError(response, error) {
        response.statusCode = 500;
        if (error instanceof emSession_1.EMSessionError) {
            let e = error;
            response.send(hcWrapper_1.Wrapper.wrapError(e.message, e.error));
        }
        else
            response.send('INTERNAL UNHANDLED ERROR');
    }
    logicError(response, message, errorDetails) {
        response.send(hcWrapper_1.Wrapper.wrapObject(true, message, errorDetails != null ? errorDetails : {}));
    }
    logicAccept(response, message, details) {
        response.send(hcWrapper_1.Wrapper.wrapObject(false, message, details != null ? details : {}));
    }
}
exports.EMResponseWrapper = EMResponseWrapper;
