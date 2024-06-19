// services/jobListingService.js
import JobListing from "../models/JobListing.js";

export const createJobListing = async (jobData) => {
  const jobListing = new JobListing(jobData);
  await jobListing.save();
  return jobListing.populate("postedBy", "name email"); // Populate postedBy on creation
};

export const getJobListings = async () => {
  return await JobListing.find().populate("postedBy", "name email"); // Populate postedBy with name and email fields
};

export const jobTitleExistsForUser = async (title, userId) => {
  const existingJob = await JobListing.findOne({ title, postedBy: userId });
  return existingJob !== null;
};

// Update a job listing
export const updateJobListing = async (jobId, updateFields) => {
  const updatedJobListing = await JobListing.findByIdAndUpdate(
    jobId,
    updateFields,
    { new: true }
  );

  if (!updatedJobListing) {
    const error = new Error("Job listing not found.");
    error.statusCode = 404;
    throw error;
  }

  return updatedJobListing;
};

// Delete a job listing
export const deleteJobListing = async (jobId) => {
  const result = await JobListing.findByIdAndDelete(jobId);

  if (!result) {
    const error = new Error("Job listing not found.");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

export const getJobById = async (jobId) => {
  return await JobListing.findById(jobId).populate("postedBy", "name email"); // Populate postedBy with name and email fields
};