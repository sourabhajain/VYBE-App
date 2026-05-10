// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, sparse: true }, // unique if present
    displayName: { type: String },
    email: { type: String, unique: true, sparse: true },
    // Keep password if you still want local JWT login, but make optional
    password: { type: String },
    // any other profile fields you want
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
