"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const conversations_1 = require("../models/conversations");
const messages_1 = require("../models/messages");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'senha',
    database: 'Message',
    logging: false,
    models: [conversations_1.Conversations, messages_1.Messages]
});
exports.default = connection;
