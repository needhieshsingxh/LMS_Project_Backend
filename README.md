# LMS Project Backend

This is the backend for a Learning Management System (LMS) built with Node.js and Express. It provides APIs for user authentication, course management, payment integration, and more.

## Features

- User authentication and authorization
- Course and lecture management
- Course progress tracking
- Payment integration (Razorpay)
- Cloudinary integration for media uploads
- Error handling and validation middleware

## Folder Structure

```
LMS_Project/
├── .env                # Environment variables
├── .env.sample         # Sample environment file
├── .gitignore          # Git ignore rules
├── index.js            # Entry point
├── package.json        # Project dependencies
├── Models/             # Main models directory
├── src/
│   ├── constants/      # Application constants
│   ├── controllers/    # Route controllers
│   ├── database/       # Database connection
│   ├── middleware/     # Custom middleware
│   ├── Models/         # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd LMS_Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.sample` to `.env` and fill in your credentials.
4. Start the server:
   ```bash
   npm start
   ```
