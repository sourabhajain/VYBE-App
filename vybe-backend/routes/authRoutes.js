// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, ensureUser } from "../controllers/authController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // optional (JWT)
router.post("/login", loginUser);       // optional (JWT)
router.post("/ensure", verifyUser, ensureUser); // Firebase clients call this after sign-in

export default router;
