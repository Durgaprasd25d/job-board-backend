// controllers/jobApplicationController.js

import * as jobApplicationService from "./jobApplicationService.js";
import JobApplication from "../models/JobApplication.js"; // Import User model
import JobListing from "../models/JobListing.js"; // Import JobListing model
import mongoose from "mongoose";
import { updateJobApplicationService } from "./jobApplicationService.js";

export const createJobApplication = async (req, res, next) => {
  try {
    // Fetch user details from authenticated user (assuming authMiddleware sets req.user)
    const { name, email, number } = req.user;
    const jobId = req.params.id; // Get jobId from URL params

    // Ensure the jobId is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      const error = new Error("Invalid jobId format.");
      error.statusCode = 400;
      throw error;
    }

    // Check if the job listing exists
    const jobListing = await JobListing.findById(jobId);
    if (!jobListing) {
      const error = new Error("Job listing not found.");
      error.statusCode = 404;
      throw error;
    }

    // Check if the user has already applied for this job
    const hasApplied = await jobApplicationService.applicationExists(
      jobId,
      req.userId
    );
    if (hasApplied) {
      const error = new Error("You have already applied for this job.");
      error.statusCode = 400;
      throw error;
    }

    const applicationData = {
      jobId: jobId,
      applicantId: req.userId,
      applicantName: name,
      applicantEmail: email,
      applicantNumber: number,
      coverLetter: req.body.coverLetter,
      resume: req.body.resume,
    };

    const jobApplication = await jobApplicationService.createJobApplication(
      applicationData
    );
    res.status(201).json(jobApplication);
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    // Check if the requester is an admin
    if (!req.user || req.user.role !== "admin") {
      const error = new Error(
        "Access denied. Only admins can access this route."
      );
      error.statusCode = 403;
      throw error;
    }

    const jobId = req.params.id; // Get jobId from URL params

    // Ensure the jobId is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      const error = new Error("Invalid jobId format.");
      error.statusCode = 400;
      throw error;
    }

    // Fetch job applications for the specified jobId, populated with applicant details
    const jobApplications = await JobApplication.find({ jobId })
      .populate("applicantId", "name email") // Only populate name and email
      .select(
        "jobId coverLetter resume status createdAt updatedAt applicantId"
      );

    // Format the response as required
    const formattedApplications = jobApplications.map((application) => ({
      applicationId: application._id, // Include applicationId
      jobId: application.jobId,
      coverLetter: application.coverLetter,
      resume: application.resume,
      status: application.status,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      applicantId: {
        userId: application.applicantId._id,
        name: application.applicantId.name,
        email: application.applicantId.email,
      },
    }));

    res.status(200).json(formattedApplications);
  } catch (error) {
    next(error);
  }
};

export const updateJobApplication = async (req, res, next) => {
  try {
    // Check if the requester is an admin
    if (!req.user || req.user.role !== "admin") {
      const error = new Error(
        "Access denied. Only admins can access this route."
      );
      error.statusCode = 403;
      throw error;
    }

    const { applicationId } = req.params; // Get application ID from URL params
    const updateFields = req.body; // Fields to update

    // Validate if applicationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      const error = new Error("Invalid application ID format.");
      error.statusCode = 400;
      throw error;
    }

    // Call service function to update job application
    const updatedApplication = await updateJobApplicationService(
      applicationId,
      updateFields
    );

    // Send response with status code and updated application data
    res.status(200).json(updatedApplication);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

