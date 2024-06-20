import JobListing from "../models/JobListing.js";

export const createJobListing = async (jobData) => {
  console.log("Creating job listing with data:", jobData);
  const jobListing = new JobListing(jobData);
  await jobListing.save();
  return jobListing.populate("postedBy", "name email");
};

export const getJobListings = async (filters) => {
  const query = {};
  const sort = {};

  console.log("Applying filters and sorting:", filters);

  // Apply filters
  if (filters.title) {
    query.title = new RegExp(filters.title, "i");
  }
  if (filters.description) {
    query.description = new RegExp(filters.description, "i");
  }
  if (filters.company) {
    query.company = new RegExp(filters.company, "i");
  }
  if (filters.location) {
    query.location = filters.location;
  }
  if (filters.salaryMin || filters.salaryMax) {
    query.salary = {};
    if (filters.salaryMin) query.salary.$gte = filters.salaryMin;
    if (filters.salaryMax) query.salary.$lte = filters.salaryMax;
  }
  if (filters.postedBy) {
    query.postedBy = filters.postedBy;
  }

  // Apply sorting
  if (filters.sortBy) {
    const sortFields = filters.sortBy.split(",");
    sortFields.forEach(field => {
      const [key, order] = field.split(":");
      sort[key] = order === "desc" ? -1 : 1;
    });
  }

  console.log("Final query:", query);
  console.log("Final sort:", sort);

  return await JobListing.find(query).sort(sort).populate("postedBy", "name email");
};

export const jobTitleExistsForUser = async (title, userId) => {
  console.log(`Checking if job title exists for user ${userId}:`, title);
  const existingJob = await JobListing.findOne({ title, postedBy: userId });
  return existingJob !== null;
};
// Other service functions remain unchanged


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