"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Player_1 = require("./Player");
let Item = class Item extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    })
], Item.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {}
    })
], Item.prototype, "stats", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: false
    })
], Item.prototype, "rarity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Player_1.Player)
], Item.prototype, "playerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Player_1.Player, 'playerId')
], Item.prototype, "player", void 0);
Item = __decorate([
    sequelize_typescript_1.Table
], Item);
exports.Item = Item;
