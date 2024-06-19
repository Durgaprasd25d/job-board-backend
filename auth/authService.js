import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (userData) => {
    const user = new User(userData);
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    return user;
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};


export const getAllUsers = async (loggedInUserId) => {
    try {
      const users = await User.find({ _id: { $ne: loggedInUserId } });
      return users;
    } catch (error) {
      throw error;
    }
  };
  
  export const getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
};


  export const changeUserRole = async (userId, role) => {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }
    user.role = role;
    await user.save();
    return user;
  };