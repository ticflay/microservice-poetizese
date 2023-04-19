import { Router } from "express";

import { createComment, deleteComment, getComments, updateComment } from "../controllers/comment.controllers";
import authMiddleware from "../controllers/auth.controllers";

const router = Router();

router.get('/comments/:postId', authMiddleware, getComments);
router.post('/comment', authMiddleware, createComment);
router.delete('/comment/:id', authMiddleware, deleteComment);
router.patch('/comment/:id', authMiddleware, updateComment);

export default router;