import { Router } from "express";

import { createPost,
deletePost,
getPost,
getPosts,
updatePost } from "../controllers/post.controllers";
import authMiddleware from "../controllers/auth.controllers";

const router = Router();

router.get('/posts/:authorId?', getPosts);
router.get('/post/:id', getPost);
router.post('/post', authMiddleware, createPost);
router.delete('/post/:id', authMiddleware, deletePost);
router.patch('/post/:id', authMiddleware, updatePost);

export default router;