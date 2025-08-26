const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Import bcrypt

// 🔹 Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12); // Hash the password with a salt round of 12
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// 🔹 Generate JWT token (valid for 1 hour)
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// 🔹 Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// 🔹 Middleware to verify token (for API routes)
export function verifyAuth(req) {
  // Try from Bearer Token first
  const authHeader = req.headers.get("authorization");
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else {
    // Fallback: check HttpOnly cookie
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) token = match[1];
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

// 🔹 Client-side function to check if user is authenticated
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  console.log("Checking authentication - document.cookie:", document.cookie);
  
  // Parse cookies more robustly
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  console.log("Parsed cookies:", cookies);
  console.log("Token cookie found:", cookies.token ? "Present" : "Missing");
  
  if (!cookies.token) {
    console.log("No token cookie found");
    return false;
  }
  
  const token = cookies.token;
  console.log("Token value:", token ? "Present" : "Missing");
  
  try {
    // Simple token check - just verify it exists
    // We can't use verifyToken on client side due to JWT_SECRET being server-only
    if (token && token.length > 0) {
      // Basic check: if token exists and has 3 parts (JWT format)
      const parts = token.split('.');
      console.log("Token parts length:", parts.length);
      
      if (parts.length === 3) {
        try {
          // Try to parse the payload to check if it's a valid JWT
          const payload = JSON.parse(atob(parts[1]));
          console.log("Token payload:", payload);
          // For debugging, just check if token exists and has valid format
          // Don't check expiration for now to debug the login issue
          return true;
        } catch (e) {
          console.log("Error parsing token payload:", e);
          return false;
        }
      }
    }
    console.log("Token validation failed - invalid format");
    return false;
  } catch (error) {
    console.log("Error in isAuthenticated:", error);
    return false;
  }
}

// 🔹 Client-side function to get user role
export function getUserRole() {
  if (typeof window === 'undefined') return null;
  
  // Parse cookies more robustly (consistent with isAuthenticated)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  if (!cookies.token) return null;
  
  const token = cookies.token;
  try {
    // Parse JWT payload without verification (client-side safe)
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      return payload.role || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 🔹 Client-side function to get user ID
export function getUserId() {
  if (typeof window === 'undefined') return null;
  
  // Parse cookies more robustly (consistent with isAuthenticated)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  if (!cookies.token) return null;
  
  const token = cookies.token;
  try {
    // Parse JWT payload without verification (client-side safe)
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      return payload.id || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 🔹 Client-side function to get user name
export function getUserName() {
  if (typeof window === 'undefined') return null;
  
  // Parse cookies more robustly (consistent with isAuthenticated)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  if (!cookies.token) return null;
  
  const token = cookies.token;
  try {
    // Parse JWT payload without verification (client-side safe)
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      return payload.name || "User";
    }
    return "User";
  } catch (error) {
    return "User";
  }
}

// 🔹 Client-side function to get user email from token
export function getUserEmailFromToken() {
  if (typeof window === 'undefined') return null;
  
  // Parse cookies more robustly (consistent with isAuthenticated)
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  if (!cookies.token) return null;
  
  const token = cookies.token;
  try {
    // Parse JWT payload without verification (client-side safe)
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      return payload.email || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 🔹 Client-side function to logout
export function logout() {
  if (typeof window === 'undefined') return;
  
  // Clear token cookie
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Redirect to home page
  window.location.href = '/';
}
