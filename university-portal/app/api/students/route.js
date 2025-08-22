import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";
import { hashPassword } from "@/lib/auth";

// POST - add new student
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Hash password before saving
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    
    const student = new Student(body);
    await student.save();
    return new Response(JSON.stringify(student), { status: 201 });
  } catch (error) {
    console.error("Student creation error:", error);
    
    // Handle unique constraint violations
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `Student with this ${field} already exists`;
      return new Response(JSON.stringify({ error: message }), { status: 400 });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return new Response(JSON.stringify({ error: messages.join(', ') }), { status: 400 });
    }
    
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// GET - get all students
export async function GET() {
  await dbConnect();
  try {
    const students = await Student.find({});
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
