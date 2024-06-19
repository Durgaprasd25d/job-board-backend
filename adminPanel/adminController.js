import * as adminService from './adminService.js';

export const createAdmin = async (req, res, next) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await adminService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
