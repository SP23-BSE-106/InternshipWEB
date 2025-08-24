# Environment Setup for University Portal

## Required Environment Variables

To run the University Portal application, you need to set up the following environment variables in your `.env.local` file:

1. **MONGODB_URI**: The connection string for your MongoDB database.
   - Example: `MONGODB_URI=mongodb://127.0.0.1:27017/universityPortal`

2. **JWT_SECRET**: A secret key used for signing JSON Web Tokens (JWT).
   - Example: `JWT_SECRET=your-secret-key-change-in-production`

## Steps to Set Up

1. Create a file named `.env.local` in the root of your project if it doesn't already exist.
2. Add the required environment variables as shown in the examples above.
3. Save the file.

## Important Notes

- Ensure that the `.env.local` file is included in your `.gitignore` to prevent it from being committed to version control.
- Change the `JWT_SECRET` to a strong, unique value in production environments.

By following these steps, you will ensure that the application can access the necessary configuration settings.
