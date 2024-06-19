import express from 'express';
import { getUserProfile, updateUser } from './userProfileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', authMiddleware, getUserProfile);
router.put('/:id', authMiddleware, updateUser);

export default router;
