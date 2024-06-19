// controllers/jobController.js

import * as jobListingService from "./jobListingService.js";
import mongoose from 'mongoose'
export const createJobListing = async (req, res, next) => {
  try {
    const { role, _id: userId } = req.user;
    const { title } = req.body;

    if (role !== "admin") {
      const error = new Error("Access denied.");
      error.statusCode = 403;
      throw error;
    }

    // Check if the job title already exists for the user
    const titleExists = await jobListingService.jobTitleExistsForUser(
      title,
      userId
    );
    if (titleExists) {
      const error = new Error(
        "You have already created a job listing with this title."
      );
      error.statusCode = 400;
      throw error;
    }

    const jobData = { ...req.body, postedBy: userId };
    const jobListing = await jobListingService.createJobListing(jobData);
    res.status(201).json(jobListing);
  } catch (error) {
    next(error);
  }
};
export const getJobListings = async (req, res, next) => {
  try {
    const jobListings = await jobListingService.getJobListings();
    res.status(200).json(jobListings);
  } catch (error) {
    next(error);
  }
};

// Update a job listing
export const updateJobListing = async (req, res, next) => {
  try {
    const { role } = req.user;
    const jobId = req.params.id;

    if (role === "admin") {
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        const error = new Error("Invalid jobId format.");
        error.statusCode = 400;
        throw error;
      }

      const updatedJobListing = await jobListingService.updateJobListing(
        jobId,
        req.body
      );
      res.status(200).json(updatedJobListing);
    } else {
      const error = new Error("Access denied.");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Delete a job listing
export const deleteJobListing = async (req, res, next) => {
  try {
    const { role } = req.user;
    const jobId = req.params.id;

    if (role === "admin") {
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        const error = new Error("Invalid jobId format.");
        error.statusCode = 400;
        throw error;
      }

      await jobListingService.deleteJobListing(jobId);
      res.status(204).send();
    } else {
      const error = new Error("Access denied.");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      const error = new Error("Invalid jobId format.");
      error.statusCode = 400;
      throw error;
    }

    const jobListing = await jobListingService.getJobById(jobId);

    if (!jobListing) {
      const error = new Error("Job listing not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(jobListing);
  } catch (error) {
    next(error);
  }
};