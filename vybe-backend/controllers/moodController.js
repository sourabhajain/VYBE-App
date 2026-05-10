import Mood from "../models/Mood.js";

// CREATE mood
export const createMood = async (req, res) => {
  try {
    const { mood, intensity, note } = req.body;

    const newMood = await Mood.create({
      user: req.userId,
      mood,
      intensity,
      note,
    });

    res.status(201).json(newMood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create mood" });
  }
};

// GET moods
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch moods" });
  }
};

// DELETE mood
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    await mood.deleteOne();
    res.json({ message: "Mood deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete mood" });
  }
};
