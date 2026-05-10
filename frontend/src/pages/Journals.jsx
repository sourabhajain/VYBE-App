import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Journals() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await api.get("/api/journals");
      setJournals(res.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/journals", {
        content,
        mood: mood || undefined,
      });
      setContent("");
      setMood("");
      fetchJournals();
    } catch (error) {
      alert("Error saving journal");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this journal entry?")) return;
    try {
      await api.delete(`/api/journals/${id}`);
      fetchJournals();
    } catch (error) {
      alert("Failed to delete journal");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#272628] mb-6">My Journal</h1>

        {/* New Entry Form */}
        <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 max-w-2xl">
          <h2 className="text-xl font-semibold text-[#272628] mb-4">Write a New Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              required
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#AD97CC] placeholder-gray-500"
              placeholder="Write anything on your mind..."
            />

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/80"
            >
              <option value="">How are you feeling? (optional)</option>
              <option value="happy">😊 Happy</option>
              <option value="sad">😔 Sad</option>
              <option value="anxious">😟 Anxious</option>
              <option value="angry">😡 Angry</option>
              <option value="excited">🤩 Excited</option>
              <option value="calm">😌 Calm</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#AD97CC] text-white py-2 rounded-lg hover:bg-[#9B84C4] transition"
            >
              Save Journal Entry
            </button>
          </form>
        </div>

        {/* Journal History */}
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-[#272628] mb-4">Past Entries</h2>
          {journals.length === 0 && (
            <p className="text-[#4B4A4E] text-sm">No journal entries yet. Start writing!</p>
          )}
          {journals.map((j) => (
            <div
              key={j._id}
              className="bg-white/40 backdrop-blur-md p-4 rounded-xl shadow mb-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-[#272628] whitespace-pre-wrap">{j.content}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    <span>{new Date(j.createdAt).toLocaleDateString()}</span>
                    {j.mood && <span className="capitalize">Feeling: {j.mood}</span>}
                  </div>
                </div>
                {!j.isAnonymous && (
                  <button
                    onClick={() => handleDelete(j._id)}
                    className="text-red-500 text-sm ml-4 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Journals;
