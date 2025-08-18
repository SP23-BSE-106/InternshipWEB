import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true }
}, { timestamps: true });

// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

export const User = mongoose.model("User", userSchema);
