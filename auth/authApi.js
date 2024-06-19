import express from "express";
import { register, login,getAllUsers ,getUserProfile,changeUserRole} from "./authController.js";
import authMiddleware from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, getAllUsers);
router.get("/profile", authMiddleware, getUserProfile);
router.patch("/change-role/:id", authMiddleware, changeUserRole);
export default router;
