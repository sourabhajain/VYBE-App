import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

if (!admin.apps.length) {
  const saPath = process.env.SERVICE_ACCOUNT_PATH;

  if (!saPath) {
    throw new Error("SERVICE_ACCOUNT_PATH not set in .env");
  }

  if (!fs.existsSync(saPath)) {
    throw new Error(`Service account file not found at: ${saPath}`);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(saPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("🔥 Firebase Admin initialized with serviceAccountKey.json");
}

export default admin;
