import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function MoodTracker() {
  const [mood, setMood] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await api.get("/api/moods");
      setMoods(res.data);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/moods", { mood, intensity, note });
      setMood("");
      setIntensity(5);
      setNote("");
      fetchMoods();
    } catch (error) {
      alert("Error saving mood");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this mood?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/moods/${id}`);
      fetchMoods();
    } catch (error) {
      alert("Failed to delete mood");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#272628] mb-6">Mood Tracker</h1>

        <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-md mb-8">
          <h2 className="text-xl font-semibold text-[#272628] mb-4">How are you feeling?</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80"
            >
              <option value="">Choose mood</option>
              <option value="happy">{"\uD83D\uDE0A"} Happy</option>
              <option value="sad">{"\uD83D\uDE14"} Sad</option>
              <option value="anxious">{"\uD83D\uDE1F"} Anxious</option>
              <option value="excited">{"\uD83E\uDD29"} Excited</option>
              <option value="angry">{"\uD83D\uDE21"} Angry</option>
            </select>

            <div>
              <label className="block text-[#272628] mb-1">Intensity: {intensity}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-[#272628] mb-1">Notes (Optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#AD97CC]"
                placeholder="Write about your day..."
              />
            </div>

            <button className="w-full bg-[#AD97CC] text-white py-2 rounded-lg hover:bg-[#9B84C4] transition">
              Save Mood
            </button>
          </form>
        </div>

        <div className="max-w-md">
          <h2 className="text-xl font-semibold text-[#272628] mb-4">Mood History</h2>
          {moods.length === 0 && (
            <p className="text-[#4B4A4E] text-sm">No moods logged yet. Start tracking!</p>
          )}
          {moods.map((m) => (
            <div
              key={m._id}
              className="bg-white/40 backdrop-blur-md p-3 rounded-xl flex justify-between items-center mb-2"
            >
              <div>
                <p className="capitalize font-medium text-[#272628]">
                  {m.mood} ({m.intensity}/10)
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
                {m.note && <p className="text-xs text-[#4B4A4E] mt-1">{m.note}</p>}
              </div>
              <button
                onClick={() => handleDelete(m._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;
