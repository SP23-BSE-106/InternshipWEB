// Simple test to check authentication flow
console.log("Testing authentication flow...");

// Check if we can access the token from cookies
const cookies = document.cookie.split(';');
const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));

if (tokenCookie) {
  console.log("Token found:", tokenCookie);
  const token = tokenCookie.split('=')[1];
  console.log("Token value:", token);
  
  // Try to parse the JWT payload
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      console.log("JWT Payload:", payload);
      console.log("User ID:", payload.id);
      console.log("User Role:", payload.role);
      console.log("User Name:", payload.name);
      console.log("Token Expiration:", new Date(payload.exp * 1000));
    }
  } catch (error) {
    console.error("Error parsing token:", error);
  }
} else {
  console.log("No token found in cookies");
}
