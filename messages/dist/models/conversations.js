"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversations = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const messages_1 = require("./messages");
let Conversations = class Conversations extends sequelize_typescript_1.Model {
    constructor() {
        super(...arguments);
        this.description = '';
        this.messages = [];
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], Conversations.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    })
], Conversations.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Conversations.prototype, "participant1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    })
], Conversations.prototype, "participant2", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => messages_1.Messages)
], Conversations.prototype, "messages", void 0);
Conversations = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'conversations'
    })
], Conversations);
exports.Conversations = Conversations;
