import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }

    if (!decodedToken || !decodedToken.userId) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return next(error);
    }

    try {
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            return next(error);
        }

        req.user = user; // Attach user object to req for future use if needed
        req.userId = decodedToken.userId; // Set userId from decoded token

        next();
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
};

export default authMiddleware;
