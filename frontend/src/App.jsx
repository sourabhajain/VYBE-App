import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MoodTracker from "./pages/MoodTracker";
import Journals from "./pages/Journals";
import SelfHelpPrograms from "./pages/SelfHelpPrograms";
import AIChat from "./pages/AIChat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/mood-tracker" element={
          <ProtectedRoute>
            <MoodTracker />
          </ProtectedRoute>
        } />
        <Route path="/journals" element={
          <ProtectedRoute>
            <Journals />
          </ProtectedRoute>
        } />
        <Route path="/ai-chat" element={
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        } />
        <Route path="/self-help" element={
          <ProtectedRoute>
            <SelfHelpPrograms />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
