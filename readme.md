---

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
   git clone https://github.com/your/repository.git
   cd repository
   ```

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

## API Endpoints

### Authentication

#### Register a new user

- **POST /auth/register**
  - Example request:
    ```json
    POST /auth/register
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password"
    }
    ```
  - Example response:
    ```json
    {
      "_id": "1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

#### Login with existing credentials

- **POST /auth/login**
  - Example request:
    ```json
    POST /auth/login
    {
      "email": "john@example.com",
      "password": "password"
    }
    ```
  - Example response:
    ```json
    {
      "message": "Login successful",
      "user": {
        "_id": "1234567890",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T14:00:00.000Z"
      }
    }
    ```

### User Profiles

#### Get user profile by ID

- **GET /profiles/:id**
  - Example request:
    ```
    GET /profiles/1234567890
    ```
  - Example response:
    ```json
    {
      "_id": "1234567890",
      "userId": "1234567890",
      "bio": "Profile bio",
      "skills": ["JavaScript", "Node.js"],
      "experience": [
        {
          "company": "ABC Inc.",
          "role": "Developer",
          "startDate": "2023-01-01",
          "endDate": "2023-12-31"
        }
      ],
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

#### Update user profile by ID

- **PUT /profiles/:id**
  - Example request:
    ```json
    PUT /profiles/1234567890
    {
      "bio": "Updated bio",
      "skills": ["JavaScript", "Node.js", "React"],
      "experience": [
        {
          "company": "XYZ Corp.",
          "role": "Senior Developer",
          "startDate": "2024-01-01",
          "endDate": null
        }
      ]
    }
    ```
  - Example response:
    ```json
    {
      "_id": "1234567890",
      "userId": "1234567890",
      "bio": "Updated bio",
      "skills": ["JavaScript", "Node.js", "React"],
      "experience": [
        {
          "company": "XYZ Corp.",
          "role": "Senior Developer",
          "startDate": "2024-01-01",
          "endDate": null
        }
      ],
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T14:00:00.000Z"
    }
    ```

### Job Listings

#### Create a new job listing

- **POST /jobs/**
  - Example request:
    ```json
    POST /jobs/
    {
      "title": "Software Engineer",
      "description": "Job description",
      "company": "XYZ Corp",
      "location": "New York",
      "salary": 100000,
      "postedBy": "1234567890"
    }
    ```
  - Example response:
    ```json
    {
      "_id": "0987654321",
      "title": "Software Engineer",
      "description": "Job description",
      "company": "XYZ Corp",
      "location": "New York",
      "salary": 100000,
      "postedBy": "1234567890",
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

#### Retrieve all job listings

- **GET /jobs/**
  - Example request:
    ```
    GET /jobs/
    ```
  - Example response:
    ```json
    [
      {
        "_id": "0987654321",
        "title": "Software Engineer",
        "description": "Job description",
        "company": "XYZ Corp",
        "location": "New York",
        "salary": 100000,
        "postedBy": {
          "_id": "1234567890",
          "name": "John Doe"
        },
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T12:00:00.000Z"
      }
    ]
    ```

### Job Applications

#### Submit a job application

- **POST /applications/**
  - Example request:
    ```json
    POST /applications/
    {
      "jobId": "0987654321",
      "applicantId": "1234567890",
      "coverLetter": "Cover letter text",
      "resume": "Link to resume",
      "status": "applied"
    }
    ```
  - Example response:
    ```json
    {
      "_id": "5678901234",
      "jobId": "0987654321",
      "applicantId": "1234567890",
      "coverLetter": "Cover letter text",
      "resume": "Link to resume",
      "status": "applied",
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

#### Retrieve job applications by job ID

- **GET /applications/:id**
  - Example request:
    ```
    GET /applications/0987654321
    ```
  - Example response:
    ```json
    [
      {
        "_id": "5678901234",
        "jobId": "0987654321",
        "applicantId": {
          "_id": "1234567890",
          "name": "John Doe"
        },
        "coverLetter": "Cover letter text",
        "resume": "Link to resume",
        "status": "applied",
        "createdAt": "2023-06-01T12:00:00.000Z",
        "updatedAt": "2023-06-01T12:00:00.000Z"
      }
    ]
    ```

### Notifications

#### Send a notification

- **POST /notifications/send**
  - Example request:
    ```json
    POST /notifications/send
    {
      "userId": "1234567890",
      "type": "info",
      "message": "Notification message"
    }
    ```
  - Example response:
    ```json
    {
      "_id": "9012345678",
      "userId": "1234567890",
      "type": "info",
      "message": "Notification message",
      "read": false,
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

### Admin Panel

#### Create a new admin user

- **POST /admin/create**
  - Example request:
    ```json
    POST /admin/create
    {
      "name": "Admin User",
      "email": "admin@example.com",
      "password": "adminpassword"
    }
    ```
  - Example response:
    ```json
    {
      "_id": "3456789012",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2023-06-01T12:00:00.000Z",
      "updatedAt": "2023-06-01T12:00:00.000Z"
    }
    ```

### Error Handling

The application uses a centralized error handler middleware to catch and process errors uniformly across all endpoints. When an error occurs during request processing, the middleware returns an appropriate error response with status codes and error messages.

Example error response:
```json
{
  "error": "Name is required",
  "message": "User validation failed: name: Path `name` is required."
}
```

### Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js
- **jsonwebtoken**: JSON Web Token (JWT) library for authentication
- **bcryptjs**: Library for hashing passwords securely

### Additional Notes

- Ensure MongoDB is installed and running locally or accessible via a remote URI.
- Securely handle environment variables, especially sensitive data like database URIs and JWT secrets.
- Customize error messages and responses based on application requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---

This README file now covers all the necessary aspects of your Node.js application, including API endpoints with examples, setup instructions, error handling, technologies used, and additional notes. Adjust the placeholders (`yourMongoDBConnectionURI`, `yourJWTSecret`, `yourEmailAddress`, `yourEmailPassword`) with actual values from your environment configuration. This comprehensive guide will help users understand and use your application effectively.