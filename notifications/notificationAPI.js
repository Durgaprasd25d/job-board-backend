import express from 'express';
import { sendNotification } from './notificationService.js';

const router = express.Router();

router.post('/send', async (req, res, next) => {
    try {
        await sendNotification(req.body);
        res.status(200).json({ message: 'Notification sent' });
    } catch (error) {
        next(error);
    }
});

export default router;
