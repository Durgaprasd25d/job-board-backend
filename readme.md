Here is the updated `README.md` file for the backend of the Job Marketplace Node.js application:

```markdown
# Job Marketplace Node.js Application

This Node.js application serves as a job marketplace platform where users can register, login, manage user profiles, create job listings, apply for jobs, send notifications, and administer user roles through an admin panel.

## Prerequisites

Ensure you have the following installed:

- Node.js (v20.11.1 or higher)
- MongoDB
- npm (Node Package Manager)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Durgaprasd25d/job-board-backend.git

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://yourMongoDBConnectionURI
   JWT_SECRET=yourJWTSecret
   EMAIL=yourEmailAddress
   EMAIL_PASSWORD=yourEmailPassword
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

## 📋 Project Description

This Node.js application serves as the backend for a job marketplace platform. It allows users to register, login, manage profiles, create job listings, apply for jobs, receive notifications, and manage roles through an admin panel.

## 💻 Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js
- **jsonwebtoken**: JSON Web Token (JWT) library for authentication
- **bcryptjs**: Library for hashing passwords securely

## ✨ Features

- User registration and authentication
- Profile management
- Job listing creation and management
- Job application functionality
- Admin panel for managing user roles
- Notification system

## 🚀 Additional Notes

- Ensure MongoDB is installed and running locally or accessible via a remote URI.
- Securely handle environment variables, especially sensitive data like database URIs and JWT secrets.
- Customize error messages and responses based on application requirements.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## System Design

### Backend System Design

![Backend System Design](https://github.com/Durgaprasd25d/job-finding-app/blob/main/public/Image/backend.png?raw=true)

---

Developed by [Durgaprasad Dalai](https://talent-durga.netlify.app/)
```

Make sure to replace `yourMongoDBConnectionURI`, `yourJWTSecret`, `yourEmailAddress`, and `yourEmailPassword` with actual values from your environment configuration. This comprehensive guide will help users understand and use your backend application effectively.