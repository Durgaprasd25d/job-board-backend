import express from "express";
import {
  createJobApplication,
  getJobApplications,
  updateJobApplication,
  getAllJobApplications,
  getUserJobApplications,
  // updateApplicationStatus,
} from "./jobApplicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating job applications for a specific job listing
router.post("/:id", authMiddleware, createJobApplication);

// Route for retrieving job applications for a specific job listing
router.get("/:id/applications", authMiddleware, getJobApplications);


router.get("/", authMiddleware, getAllJobApplications);

router.get("/user/applications", authMiddleware, getUserJobApplications);

// Route for updating job applications for a specific job application ID
router.put("/:applicationId", authMiddleware, updateJobApplication);


// Route for updating application status and sending an email
// router.put("/:applicationId/status", authMiddleware, updateApplicationStatus);

export default router;
