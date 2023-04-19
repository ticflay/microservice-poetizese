"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const credentials_1 = require("./credentials");
const verifyToken = (req, res, next) => {
    console.log(req.headers);
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Token não fornecido");
    }
    jsonwebtoken_1.default.verify(token, credentials_1.secret_key, (err, user) => {
        if (err) {
            console.log(err, 'entrou no erro?');
            return res.status(403).send("Token inválido");
        }
        next();
    });
};
exports.verifyToken = verifyToken;
