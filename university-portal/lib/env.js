// Environment variable validation utility

/**
 * Validates that all required environment variables are set
 * Throws an error with helpful message if any are missing
 */
export function validateEnv() {
  const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
  const missingEnvVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
      `Please check your .env.local file and ensure these variables are set:\n` +
      `- MONGODB_URI: MongoDB connection string\n` +
      `- JWT_SECRET: Secret key for JWT token signing\n\n` +
      `See ENVIRONMENT_SETUP.md for more details.`
    );
  }

  // Check if using default JWT secret (security warning)
  if (process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
    console.warn('⚠️  WARNING: Using default JWT_SECRET. Change this in production for security!');
  }

  console.log('✅ Environment variables validated successfully');
}

/**
 * Gets an environment variable with optional default value
 * @param {string} key - The environment variable name
 * @param {string} defaultValue - Optional default value
 * @returns {string} The environment variable value
 */
export function getEnv(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}
