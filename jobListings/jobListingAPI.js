import express from "express";
import {
  createJobListing,
  updateJobListing,
  deleteJobListing,
  getJobListings,
  getJobById,
} from "./jobListingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating job listings
router.post("/", authMiddleware, createJobListing);

// Route for updating job listings
router.put("/:id", authMiddleware, updateJobListing);

// Route for deleting job listings
router.delete("/:id", authMiddleware, deleteJobListing);

// Route for getting job listing by ID
router.get("/", authMiddleware, getJobListings);

router.get("/:id", authMiddleware, getJobById);

export default router;
