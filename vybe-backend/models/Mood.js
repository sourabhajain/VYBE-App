import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ["happy", "sad", "angry", "anxious", "calm", "excited", "neutral"],
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mood", moodSchema);
