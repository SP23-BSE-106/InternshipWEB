import dbConnect from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Teacher ID is required" }),
        { status: 400 }
      );
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return new Response(
        JSON.stringify({ error: "Teacher not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Teacher deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
