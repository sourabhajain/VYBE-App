import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { chat } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", verifyUser, chat);

export default router;
