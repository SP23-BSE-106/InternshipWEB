import dbConnect from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { hashPassword } from "@/lib/auth";

// POST - add new teacher
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Hash password before saving
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    
    const teacher = new Teacher(body);
    await teacher.save();
    return new Response(JSON.stringify(teacher), { status: 201 });
  } catch (error) {
    console.error("Teacher creation error:", error);
    
    // Handle unique constraint violations
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `Teacher with this ${field} already exists`;
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

// GET - get all teachers
export async function GET() {
  await dbConnect();
  try {
    const teachers = await Teacher.find({});
    return new Response(JSON.stringify(teachers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
