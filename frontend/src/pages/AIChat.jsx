import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm VYBE's AI companion. How are you feeling today? 💜" },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      // Send conversation history (exclude system-generated welcome message)
      const history = messages
        .filter((_, i) => i > 0)
        .map(({ role, content }) => ({ role, content }));

      const res = await api.post("/api/ai/chat", {
        message: userMsg.content,
        history,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-white/30">
          <h1 className="text-3xl font-bold text-[#272628]">AI Chat Support 💬</h1>
          <p className="text-sm text-[#4B4A4E] mt-1">
            Talk about your feelings — I'm here to listen and help.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#AD97CC] text-white rounded-br-sm"
                    : "bg-white/60 backdrop-blur-md text-[#272628] rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-[#4B4A4E]">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/30 flex gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AD97CC] placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-6 py-3 bg-[#AD97CC] text-white rounded-xl hover:bg-[#9B84C4] transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIChat;
