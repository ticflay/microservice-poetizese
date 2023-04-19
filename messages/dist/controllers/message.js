"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversation = exports.getConversations = exports.createConversation = exports.postMessageToConversation = exports.getMessagesInConversation = void 0;
const messages_1 = require("../models/messages");
const conversations_1 = require("../models/conversations");
const sequelize_1 = require("sequelize");
const getMessagesInConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    const messages = yield messages_1.Messages.findAll({ where: { conversationId: conversationId } });
    if (messages) {
        res.json({ data: messages });
    }
    else {
        res.status(204).json({ data: [] });
    }
});
exports.getMessagesInConversation = getMessagesInConversation;
const postMessageToConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.body.conversationId;
    const senderId = parseInt(req.headers['currentuserid']);
    const receiverId = req.body.receiverId;
    const message = req.body.message;
    messages_1.Messages.create({ conversationId, senderId, receiverId, message }).then((mes) => {
        res.status(200).json({ data: mes });
    }).catch(() => res.status(500).send("erro"));
});
exports.postMessageToConversation = postMessageToConversation;
const createConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const participant1 = req.body.participant;
    const participant2 = parseInt(req.headers['currentuserid']);
    conversations_1.Conversations.create({ name, description, participant1, participant2 }).then((response) => res.status(200).json({ data: response })).catch(() => res.status(500));
});
exports.createConversation = createConversation;
const getConversations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = parseInt(req.headers['currentuserid']);
    const conversations = yield conversations_1.Conversations.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { participant1: currentUserId },
                { participant2: currentUserId }
            ]
        }
    });
    if (conversations) {
        res.status(200).json({ data: conversations });
    }
    else {
        res.status(204).json({ data: [] });
    }
});
exports.getConversations = getConversations;
const getConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    const conversations = yield conversations_1.Conversations.findOne({ where: { id: conversationId } });
    if (conversations) {
        res.status(200).json({ data: conversations });
    }
    else {
        res.status(204).json({ data: [] });
    }
});
exports.getConversation = getConversation;
