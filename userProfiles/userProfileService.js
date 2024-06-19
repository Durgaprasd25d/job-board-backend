import User from '../models/User.js';

export const getUserProfile = async (userId) => {
    return await User.findById(userId);
};

export const updateUser = async (userId, profileData) => {
    return await User.findByIdAndUpdate(userId, profileData, { new: true });
};
