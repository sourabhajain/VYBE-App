import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  createMood,
  getMoods,
  deleteMood,
} from "../controllers/moodController.js";

const router = express.Router();

router.post("/", verifyUser, createMood);
router.get("/", verifyUser, getMoods);
router.delete("/:id", verifyUser, deleteMood);

export default router;
