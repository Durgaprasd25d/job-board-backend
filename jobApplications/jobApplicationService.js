import JobApplication from "../models/JobApplication.js";
import JobListing from "../models/JobListing.js";
export const createJobApplication = async (applicationData) => {
  const jobApplication = new JobApplication(applicationData);
  await jobApplication.save();
  return jobApplication;
};

export const applicationExists = async (jobId, userId) => {
  const existingApplication = await JobApplication.findOne({
    jobId,
    applicantId: userId,
  });
  return existingApplication !== null;
};

export const getJobApplications = async (jobId) => {
  return await JobApplication.find({ jobId });
};

export const updateJobApplicationService = async (appId, updateFields) => {
  try {
    // Update the job application using findByIdAndUpdate or any suitable method
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      appId,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      const error = new Error("Job application not found.");
      error.statusCode = 404;
      throw error;
    }

    return updatedApplication;
  } catch (error) {
    throw error;
  }
};

export const getAllJobApplications = async () => {
  return await JobApplication.find();
};

export const getUserJobApplications = async (userId) => {
  return await JobApplication.find({ applicantId: userId });
};