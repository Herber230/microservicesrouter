"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const emEntity_1 = require("../../../hc-core/express-mongoose/emEntity");
const hcMetaData_1 = require("../../../hc-core/hcMetaData");
let Module = class Module extends emEntity_1.EMEntity {
    //#region Properties
    //#endregion
    //#region Methods
    //#endregion
    //#region Accessors
    get name() { return this._document.name; }
    set name(value) { this._document.name = value; }
    get url() { return this._document.url; }
    set url(value) { this._document.url = value; }
    get displayName() { return this._document.displayName; }
    set displayName(value) { this._document.displayName = value; }
};
__decorate([
    hcMetaData_1.DefinedAccessor({ exposed: true, schema: { type: String, required: true } }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Module.prototype, "name", null);
__decorate([
    hcMetaData_1.DefinedAccessor({ exposed: true, schema: { type: String, required: true } }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Module.prototype, "url", null);
__decorate([
    hcMetaData_1.DefinedAccessor({ exposed: true, schema: { type: String, required: true } }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Module.prototype, "displayName", null);
Module = __decorate([
    hcMetaData_1.DefinedEntity()
], Module);
exports.Module = Module;
