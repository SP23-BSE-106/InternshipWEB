import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Admin ID is required" }),
        { status: 400 }
      );
    }

    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return new Response(
        JSON.stringify({ error: "Admin not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Admin deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
