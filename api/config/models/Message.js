"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Player_1 = require("./Player");
const Channel_1 = require("./Channel");
let Message = class Message extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Message.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Channel_1.Channel)
], Message.prototype, "channelId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Player_1.Player)
], Message.prototype, "playerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Player_1.Player, 'playerId')
], Message.prototype, "player", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Channel_1.Channel, 'channelId')
], Message.prototype, "channel", void 0);
Message = __decorate([
    sequelize_typescript_1.Table
], Message);
exports.Message = Message;
