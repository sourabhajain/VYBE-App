import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // false → supports anonymous journals
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "anxious", "angry", "excited", "calm"],
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Journal", journalSchema);
