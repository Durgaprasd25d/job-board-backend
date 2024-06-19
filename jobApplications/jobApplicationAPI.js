import express from "express";
import {
  createJobApplication,
  getJobApplications,
  updateJobApplication,
} from "./jobApplicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating job applications for a specific job listing
router.post("/:id", authMiddleware, createJobApplication);

// Route for retrieving job applications for a specific job listing
router.get("/:id/applications", authMiddleware, getJobApplications);

// Route for updating job applications for a specific job application ID
router.put("/:applicationId", authMiddleware, updateJobApplication);

export default router;
