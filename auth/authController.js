import * as authService from "./authService.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Check if the requester is an admin
    if (!req.user || req.user.role !== "admin") {
      const error = new Error(
        "Access denied. Only admins can access this route."
      );
      error.statusCode = 403;
      throw error;
    }
    const loggedInUserId = req.userId; // Assuming req.userId is set by authMiddleware

    // Fetch all users except for the logged-in user
    const users = await authService.getAllUsers(loggedInUserId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming req.userId is set by authMiddleware
    const user = await authService.getUserById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      const error = new Error("Access denied. Only admins can change user roles.");
      error.statusCode = 403;
      throw error;
    }

    const userId = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const updatedUser = await authService.changeUserRole(userId, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};