"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Message_1 = require("./Message");
const PlayerChannels_1 = require("./PlayerChannels");
const Channel_1 = require("./Channel");
const Inventory_1 = require("./Inventory");
const Action_1 = require("./Action");
let Player = class Player extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Player.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Player.prototype, "mail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Player.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON
    })
], Player.prototype, "stats", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON
    })
], Player.prototype, "pos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Player.prototype, "currentActions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Action_1.Action, {
        foreignKey: 'playerId',
        as: 'actions'
    })
], Player.prototype, "actions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Action_1.Action, {
        foreignKey: 'lastActionPlayerId',
        as: 'lastAction'
    })
], Player.prototype, "lastAction", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Inventory_1.Inventory, 'playerId')
], Player.prototype, "inventories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Message_1.Message, 'playerId')
], Player.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Channel_1.Channel, () => PlayerChannels_1.PlayerChannels)
], Player.prototype, "channels", void 0);
Player = __decorate([
    sequelize_typescript_1.Table
], Player);
exports.Player = Player;
