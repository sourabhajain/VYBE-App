import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import BaseWrapper from "../components/BaseWrapper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <BaseWrapper>
      <div className="backdrop-blur-md bg-white/40 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/50">
        <h2 className="text-3xl font-bold text-[#272628] mb-6 text-center">Welcome back to VYBE</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#272628] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD97CC] bg-white/80 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-[#272628] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AD97CC] bg-white/80 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#AD97CC] text-white py-2 rounded-lg hover:bg-[#9B84C4] transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#AD97CC] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </BaseWrapper>
  );
}

export default Login;
