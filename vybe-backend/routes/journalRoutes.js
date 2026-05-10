import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  createJournal,
  getJournals,
  deleteJournal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", verifyUser, createJournal);
router.get("/", verifyUser, getJournals);
router.delete("/:id", verifyUser, deleteJournal);

export default router;
