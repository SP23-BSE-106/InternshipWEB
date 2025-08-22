import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Student ID is required" }),
        { status: 400 }
      );
    }

    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return new Response(
        JSON.stringify({ error: "Student not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Student deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
