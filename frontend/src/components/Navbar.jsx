import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-md py-4 px-8 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-2xl font-bold text-[#272628]">VYBE</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-[#AD97CC] font-medium hover:underline">Dashboard</Link>
        <button onClick={handleLogout} className="text-[#272628] font-medium hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
