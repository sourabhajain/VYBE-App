// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:");
    // show full error message (do NOT paste it publicly if it contains secrets)
    console.error(err.message || err);
    process.exit(1);
  }
};

export default connectDB;
