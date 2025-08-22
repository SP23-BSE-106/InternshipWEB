import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import { hashPassword, comparePassword, generateToken, verifyAuth } from "@/lib/auth";

// Register endpoint
export async function POST(req) {
  await dbConnect();
  
  try {
    const { name, email, password, role } = await req.json();
    
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    switch (role) {
      case 'admin':
        existingUser = await Admin.findOne({ email });
        break;
      case 'student':
        existingUser = await Student.findOne({ email });
        break;
      case 'teacher':
        existingUser = await Teacher.findOne({ email });
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid role" }),
          { status: 400 }
        );
    }

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    let newUser;

    switch (role) {
      case 'admin':
        newUser = await Admin.create({ name, email, password: hashedPassword });
        break;
      case 'student':
        newUser = await Student.create({ name, email, password: hashedPassword });
        break;
      case 'teacher':
        newUser = await Teacher.create({ name, email, password: hashedPassword });
        break;
    }

    // Generate token
    const token = generateToken({ 
      id: newUser._id, 
      email: newUser.email, 
      role,
      name: newUser.name 
    });

    return new Response(
      JSON.stringify({ 
        message: "User created successfully", 
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role }
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// Login endpoint
export async function PUT(req) {
  await dbConnect();
  
  try {
    const { email, password, role } = await req.json();
    
    if (!email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Email, password, and role are required" }),
        { status: 400 }
      );
    }

    // Find user by role
    let user;
    switch (role) {
      case 'admin':
        user = await Admin.findOne({ email });
        break;
      case 'student':
        user = await Student.findOne({ email });
        break;
      case 'teacher':
        user = await Teacher.findOne({ email });
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid role" }),
          { status: 400 }
        );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({ 
      id: user._id, 
      email: user.email, 
      role,
      name: user.name 
    });

    return new Response(
      JSON.stringify({ 
        message: "Login successful", 
        token,
        user: { id: user._id, name: user.name, email: user.email, role }
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// Verify token endpoint
export async function GET(req) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ 
        valid: true, 
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Token verification error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
