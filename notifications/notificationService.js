import nodemailer from 'nodemailer';
import Notification from '../models/Notification.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendNotification = async (notificationData) => {
    const notification = new Notification(notificationData);
    await notification.save();

    const mailOptions = {
        from: process.env.EMAIL,
        to: notificationData.email,
        subject: notificationData.subject,
        text: notificationData.message
    };

    await transporter.sendMail(mailOptions);
};
