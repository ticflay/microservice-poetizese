import { Router } from "express";

import {
    getUserProfile,
    getUserProfiles,
    postProfile,
    updateProfile
} from '../controllers/userProfile.controllers';
import authMiddleware from "../controllers/auth.controllers";

const router = Router();

router.get('/profiles', getUserProfiles);
router.get('/profile/:userId', getUserProfile);
router.patch('/profile', authMiddleware, updateProfile);
router.post('/profile', authMiddleware, postProfile);

export default router;
