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
const hcMetaData_1 = require("./../../../hc-core/hcMetaData");
let Permission = class Permission extends emEntity_1.EMEntity {
    //#region Properties (Fields)
    //#endregion
    //#region Methods
    //#endregion
    //#region Accessors (Properties)
    get userKey() { return this._document.userKey; }
    set userKey(value) { this._document.userKey = value; }
    get level() { return this._document.level; }
    set level(value) { this._document.level = value; }
};
__decorate([
    hcMetaData_1.DefinedAccessor({ schema: { type: String, require: true }, exposed: true }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Permission.prototype, "userKey", null);
__decorate([
    hcMetaData_1.DefinedAccessor({ schema: { type: Number, require: true }, exposed: true }),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Permission.prototype, "level", null);
Permission = __decorate([
    hcMetaData_1.DefinedEntity()
], Permission);
exports.Permission = Permission;
