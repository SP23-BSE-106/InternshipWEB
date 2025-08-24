import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

// GET - get single student by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    
    const student = await Student.findById(id);
    
    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }
    
    // Return student data without password
    const studentData = {
      _id: student._id,
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
    
    return new Response(JSON.stringify(studentData), { status: 200 });
  } catch (error) {
    console.error("Student fetch error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// PUT - update student
export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    const body = await req.json();
    
    // Don't allow password updates through this endpoint
    if (body.password) {
      delete body.password;
    }
    
    const student = await Student.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }
    
    // Return updated student data without password
    const studentData = {
      _id: student._id,
      name: student.name,
      email: student.email,
      rollNo: student.rollNo,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
    
    return new Response(JSON.stringify(studentData), { status: 200 });
  } catch (error) {
    console.error("Student update error:", error);
    
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

// DELETE - delete student
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ message: "Student deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Student delete error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
