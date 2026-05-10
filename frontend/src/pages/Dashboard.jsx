import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const cards = [
  { to: "/mood-tracker", title: "Mood Tracker", desc: "Track your daily moods and emotions.", icon: "\uD83C\uDFA8" },
  { to: "/journals", title: "Journals", desc: "Write and manage your personal journals.", icon: "\uD83D\uDCD3" },
  { to: "/ai-chat", title: "AI Chat Support", desc: "Talk to an empathetic AI companion.", icon: "\uD83D\uDCAC" },
  { to: "/self-help", title: "Self-Help Programs", desc: "Access guided self-help content.", icon: "\uD83C\uDF1F" },
];

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [recentMoods, setRecentMoods] = useState([]);

  useEffect(() => {
    const fetchRecentMoods = async () => {
      try {
        const res = await api.get("/api/moods");
        setRecentMoods(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch moods:", err);
      }
    };
    fetchRecentMoods();
  }, []);

  const greeting = user?.displayName
    ? `Welcome back, ${user.displayName}!`
    : "Welcome to VYBE!";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#272628] mb-1">{greeting} {"\uD83C\uDF89"}</h1>
        <p className="text-[#4B4A4E] mb-8">Here's your wellness dashboard.</p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl">
          {cards.map((card) => (
            <Link key={card.to} to={card.to}>
              <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer border border-white/50 h-full">
                <div className="text-3xl mb-2">{card.icon}</div>
                <h2 className="text-xl font-semibold text-[#272628] mb-1">{card.title}</h2>
                <p className="text-sm text-[#4B4A4E]">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Moods */}
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold text-[#272628] mb-4">Recent Moods</h2>
          {recentMoods.length === 0 ? (
            <p className="text-[#4B4A4E] text-sm">No moods logged yet. <Link to="/mood-tracker" className="text-[#AD97CC] hover:underline">Start tracking!</Link></p>
          ) : (
            <div className="flex gap-3 flex-wrap">
              {recentMoods.map((m) => (
                <div key={m._id} className="bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl text-sm">
                  <span className="capitalize font-medium text-[#272628]">{m.mood}</span>
                  <span className="text-gray-500 ml-2">{m.intensity}/10</span>
                  <p className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
