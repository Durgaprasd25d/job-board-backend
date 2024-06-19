import User from '../models/User.js';

export const createAdmin = async (adminData) => {
    const admin = new User(adminData);
    await admin.save();
    return admin;
};

export const getUsers = async () => {
    return await User.find();
};
