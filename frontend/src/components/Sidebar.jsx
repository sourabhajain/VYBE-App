import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/mood-tracker", label: "Mood Tracker" },
  { to: "/journals", label: "Journals" },
  { to: "/ai-chat", label: "AI Chat" },
  { to: "/self-help", label: "Self-Help" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-white/40 backdrop-blur-md border-r border-white/50 p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-[#272628] mb-8">VYBE</h1>
      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-3 py-2 rounded-lg font-medium transition ${
              location.pathname === link.to
                ? "bg-[#AD97CC] text-white"
                : "text-[#272628] hover:bg-[#AD97CC]/20 hover:text-[#AD97CC]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto bg-[#AD97CC] hover:bg-[#9B84C4] text-white py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
