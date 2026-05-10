import Journal from "../models/Journal.js";

// CREATE journal
export const createJournal = async (req, res) => {
  try {
    const { content, mood, isAnonymous } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Journal content is required" });
    }

    const journal = await Journal.create({
      user: isAnonymous ? null : req.userId,
      content,
      mood,
      isAnonymous,
    });

    res.status(201).json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create journal" });
  }
};

// GET journals (user-specific + anonymous)
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({
      $or: [{ user: req.userId }, { isAnonymous: true }],
    }).sort({ createdAt: -1 });

    res.json(journals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch journals" });
  }
};

// DELETE journal
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user && journal.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await journal.deleteOne();
    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete journal" });
  }
};
