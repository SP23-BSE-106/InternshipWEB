// Simple test to verify auth flow
console.log("Testing auth flow...");

// Test the auth functions
const auth = require('./lib/auth');

// Test token generation and verification
const testPayload = {
  id: 'test123',
  email: 'test@example.com',
  role: 'student',
  name: 'Test User'
};

console.log("Testing token generation...");
const token = auth.generateToken(testPayload);
console.log("Generated token:", token);

console.log("Testing token verification...");
const decoded = auth.verifyToken(token);
console.log("Decoded token:", decoded);

console.log("Auth flow test completed!");
