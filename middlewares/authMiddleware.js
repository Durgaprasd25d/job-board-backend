// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
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
    if (!decodedToken) {
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


        req.user = user;
        req.userId = user._id; // Attach the user ID to the request
        next();
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }
};
