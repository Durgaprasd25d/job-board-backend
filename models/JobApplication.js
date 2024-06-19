// models/JobApplication.js

import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobListing",
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    applicantEmail: {
      type: String,
      required: true,
    },
    applicantNumber: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offered", "hired", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
