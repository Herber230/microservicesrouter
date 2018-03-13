"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const hcSession_1 = require("../hcSession");
const hcMetaData_1 = require("./../hcMetaData");
class EMSession extends hcSession_1.HcSession {
    //#endregion
    //#region Methods
    constructor() {
        super();
    }
    connect(url, success, error) {
        this._mongooseConnection = mongoose.createConnection("mongodb://" + url, { useMongoClient: true });
    }
    getModel(entityName) {
        return (this.entitiesInfo.find(e => e.name == entityName).model);
    }
    //registerEntity<TDocument extends mongoose.Document, TEntity extends EMEntity>(entityName: string, structureSchema : Object, type: { new( session: EMSession, document : EntityDocument ) : TEntity} ) : void
    registerEntity(type, entityInfo) {
        //var info : EntityInfo = (<any>type).entityInfo; 
        var structureSchema = entityInfo.getCompleteSchema();
        var entityName = entityInfo.name;
        if (this.entitiesInfo.filter(e => e.name == entityName).length == 0) {
            var schema;
            var model;
            //schema = <mongoose.Schema>( this._mongooseInstance.Schema(structureSchema) );
            schema = new mongoose.Schema(structureSchema);
            model = this._mongooseConnection.model(entityName, schema);
            this.addEntityInfo({
                name: entityName,
                info: entityInfo,
                schema: schema,
                model: model,
                activateType: (d) => {
                    return new type(this, d);
                }
            });
        }
        else
            console.warn('Attempt to duplicate entity already registered: ' + entityName);
    }
    createDocument(entityName, document) {
        return new Promise((resolve, reject) => {
            let model = this.getModel(entityName);
            this.manageDocumentCreation(document);
            model.create(document).then(value => resolve(value), error => reject(this.createError(error, 'Session: Error in create document')));
        });
    }
    updateDocument(entityName, document) {
        return new Promise((resolve, reject) => {
            let model = this.getModel(entityName);
            this.manageDocumentUpdate(document);
            model.findByIdAndUpdate(document._id, document, (error, result) => {
                if (!error) {
                    this.findDocument(entityName, document._id).then(res => resolve(res), err => reject(err));
                }
                else
                    reject(this.createError(error, 'Session: Error in update document'));
            });
        });
    }
    listDocuments(entityName, filters) {
        return new Promise((resolve, reject) => {
            let manageResult = (error, result) => {
                if (!error)
                    resolve(result);
                else
                    reject(this.createError(error, 'Session: Error in retrive docments'));
            };
            if (!filters)
                this.getModel(entityName).where("deferredDeletion").ne(true).find(manageResult);
            else
                this.getModel(entityName).where("deferredDeletion").ne(true).find(filters, manageResult);
        });
    }
    findDocument(entityName, id) {
        return new Promise((resolve, reject) => {
            this.getModel(entityName).where("deferredDeletion").ne(true).where("_id", id).then(res => resolve(res != null && res.length > 0 ? res[0] : null), err => reject(this.createError(err, 'Session: Error in retrive single document')));
        });
    }
    deleteDocument(entityName, document) {
        return new Promise((resolve, reject) => {
            let model = this.getModel(entityName);
            this.manageDocumentDeletion(document);
            model.findByIdAndUpdate(document._id, document, (error, result) => {
                if (!error)
                    resolve();
                else
                    reject(this.createError(error, 'Session: Error in delete document'));
            });
        });
    }
    activateEntityInstance(name, document) {
        return this.entitiesInfo.find(a => a.name == name).activateType(document);
    }
    getMetadataToExpose(entityName) {
        let info = (this.entitiesInfo.find(e => e.name == entityName).info);
        return info.getExposedAccessors().map(accessor => {
            return {
                name: accessor.name,
                type: accessor.type,
                persistent: (accessor.schema != null || accessor.persistenceType == hcMetaData_1.PersistenceType.Auto)
            };
        });
    }
    enableDevMode() {
        this._devMode = true;
    }
    disableDevMode() {
        this._devMode = false;
    }
    createError(error, message) {
        if (this._devMode) {
            console.warn('DevMode: Error in EMSession: ' + message);
            return new EMSessionError(error, message);
        }
        else
            return new EMSessionError(null, 'Internal session error');
    }
    manageDocumentCreation(document) {
        document.created = new Date();
        document.deferredDeletion = false;
    }
    manageDocumentUpdate(document) {
        document.modified = new Date();
    }
    manageDocumentDeletion(document) {
        document.deleted = new Date();
        document.deferredDeletion = true;
    }
}
exports.EMSession = EMSession;
class EMSessionError {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
}
exports.EMSessionError = EMSessionError;
