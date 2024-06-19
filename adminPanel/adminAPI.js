import express from 'express';
import { createAdmin, getUsers } from './adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createAdmin);
router.get('/users', authMiddleware, getUsers);

export default router;
