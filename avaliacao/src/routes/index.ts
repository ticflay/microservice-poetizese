import { Router } from "express";

import {  createAvaliacao, getAvaliacoesMean, updateAvaliacao } from "../controllers/avaliacao.controllers";
import authMiddleware from "../controllers/auth.controllers";

const router = Router();

router.get('/avaliacaoMean/:postId?', getAvaliacoesMean);
router.post('/avaliacao', authMiddleware, createAvaliacao);
router.patch('/avaliacao/:id', authMiddleware, updateAvaliacao);

export default router;