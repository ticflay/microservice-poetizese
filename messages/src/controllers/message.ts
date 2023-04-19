import { RequestHandler } from "express";
import { Messages } from "../models/messages";
import { Conversations } from "../models/conversations";
import { Op } from "sequelize";

export const getMessagesInConversation: RequestHandler = async (req, res, next) => {
    const conversationId = req.params.conversationId;    
    const messages = await Messages.findAll({where: {conversationId: conversationId}});
    if(messages) {
        res.json({data: messages});
    }else {
        res.status(204).json({data: []});
    }
}

export const postMessageToConversation: RequestHandler = async (req, res, next) => {
    const conversationId = req.body.conversationId;
    const senderId = parseInt(req.headers['currentuserid'] as string);
    const receiverId = req.body.receiverId;
    const message = req.body.message;


    Messages.create({conversationId, senderId, receiverId, message}).then((mes) => {
        res.status(200).json({data: mes });
    }).catch(() => res.status(500).send("erro"))
}

export const createConversation: RequestHandler = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const participant1= req.body.participant;
    const participant2 = parseInt(req.headers['currentuserid'] as string)
    Conversations.create({name, description, participant1, participant2}).then((response) => res.status(200).json({data: response})).catch(() => res.status(500));
}

export const getConversations: RequestHandler = async (req, res, next) => {
    const currentUserId = parseInt(req.headers['currentuserid'] as string);
    const conversations = await Conversations.findAll({
        where: {
            [Op.or]: [
                {participant1: currentUserId},
                {participant2: currentUserId}
            ]
        }
    });
    if(conversations) {
        res.status(200).json({data: conversations});
    }else {
        res.status(204).json({data: []})
    }
}

export const getConversation: RequestHandler = async (req, res, next) => {
    const conversationId = req.params.conversationId;
    const conversations = await Conversations.findOne({where: {id: conversationId}})
    if(conversations) {
        res.status(200).json({data: conversations});
    }else {
        res.status(204).json({data: []})
    }
}