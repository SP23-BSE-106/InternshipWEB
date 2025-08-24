import { generateToken, verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import bcrypt from "bcryptjs";

async function testLogin() {
  await dbConnect();
  
  const email = "admin@example.com"; // Use a valid email
  const password = "yourpassword"; // Use the correct password
  const role = "admin"; // Role to test

  let user;
  switch (role) {
    case "admin":
      user = await Admin.findOne({ email });
      break;
    case "student":
      user = await Student.findOne({ email });
      break;
    case "teacher":
      user = await Teacher.findOne({ email });
      break;
    default:
      throw new Error("Invalid role");
  }

  if (!user) {
    console.error("Invalid credentials");
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.error("Invalid credentials");
    return;
  }

  const token = generateToken({ id: user._id.toString(), email: user.email, role: role, name: user.name });
  console.log("Login successful, token generated:", token);
}

testLogin();
