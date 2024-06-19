import * as userProfileService from "./userProfileService.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "admin") {
      const userProfile = await userProfileService.getUserProfile(
        req.params.id
      );
      res.status(200).json(userProfile);
    } else {
      const error = new Error("Access denied.");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedProfile = await userProfileService.updateUser(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};
