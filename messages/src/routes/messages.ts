import { Router } from "express";
import { getMessagesInConversation, postMessageToConversation, createConversation, getConversations, getConversation } from "../controllers/message";
import authMiddleware from "../controllers/auth.controller";

const router = Router();

router.get("/message/:conversationId", authMiddleware, getMessagesInConversation);
router.post('/message', authMiddleware, postMessageToConversation);
router.post('/conversation', authMiddleware,createConversation);
router.get('/conversation', authMiddleware, getConversations);
router.get('/conversation/:conversationId',authMiddleware, getConversation);

export default router;