import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from 'cors'
import authRoutes from "./auth/authApi.js";
import userProfileRoutes from "./userProfiles/userProfileAPI.js";
import jobListingRoutes from "./jobListings/jobListingAPI.js";
import jobApplicationRoutes from "./jobApplications/jobApplicationAPI.js";
import notificationRoutes from "./notifications/notificationAPI.js";
import adminRoutes from "./adminPanel/adminAPI.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/profiles", userProfileRoutes);
app.use("/jobs", jobListingRoutes);
app.use("/applications", jobApplicationRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
