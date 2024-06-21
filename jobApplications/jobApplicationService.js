import JobApplication from "../models/JobApplication.js";
import JobListing from "../models/JobListing.js";
import nodemailer from 'nodemailer'

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

// TODO : [I will integrate the nodemailer to it , for now its under dev mode and also having some errors likes credentials plan ]

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false, // This line might be needed, but use with caution
//   },
// });

// export const sendStatusChangeEmail = async (applicantEmail, newStatus) => {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: applicantEmail,
//     subject: 'Status Update',
//     text: `Dear Applicant,

// Your application status has been updated to: ${newStatus}.

// Thank you,
// Your Company Name`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };