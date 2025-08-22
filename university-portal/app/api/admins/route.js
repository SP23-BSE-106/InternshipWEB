import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json(); 
    
    // Hash password before saving
    if (body.password) {
      body.password = await hashPassword(body.password);
    }
    
    const admin = new Admin(body); 
    await admin.save();      
    return new Response(JSON.stringify(admin), { status: 201 });
  } catch (error) {
    console.error("Admin creation error:", error);
    
    // Handle unique constraint violations
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = `Admin with this ${field} already exists`;
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

export async function GET() {
  await dbConnect();
  try {
    const admins = await Admin.find();
    return new Response(JSON.stringify(admins), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
