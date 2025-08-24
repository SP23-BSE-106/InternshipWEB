import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export function middleware(req) {
  console.log("Middleware triggered");
  const token = req.cookies.get("token")?.value;
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found, redirecting to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);

    const { role } = decoded;

    // Role-based route protections
    if (req.nextUrl.pathname.startsWith("/admins") && role !== "admin") {
      console.log("Access denied: non-admin tried admin route");
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/teachers") && role !== "teacher") {
      console.log("Access denied: non-teacher tried teacher route");
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/students") && role !== "student") {
      console.log("Access denied: non-student tried student route");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect students from /students to /students/dashboard
    if (req.nextUrl.pathname === "/students" && role === "student") {
      console.log("Redirecting student to dashboard");
      return NextResponse.redirect(new URL("/students/dashboard", req.url));
    }

    // Block student from accessing management API routes
    if (req.nextUrl.pathname.startsWith("/api/students") && role === "student") {
      console.log("Access denied: student tried management API");
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Access granted for role:", role);
  } catch (err) {
    console.error("Token verification error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admins/:path*", "/teachers/:path*", "/students/:path*", "/api/:path*"],
};
