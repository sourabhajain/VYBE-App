// middleware/authMiddleware.js
import admin from "../firebaseAdmin.js";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    // header might be "Bearer <token>" or just the token
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;

    // find or create backend user record (so we can relate moods, journals)
    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email || undefined,
        displayName: decoded.name || undefined,
      });
    }
    req.userId = user._id;
    req.user = user;
    next();
  } catch (err) {
    console.error("verifyUser error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
