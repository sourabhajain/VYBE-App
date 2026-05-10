import { Link } from "react-router-dom";

const features = [
  {
    icon: "\uD83C\uDFA8",
    title: "Mood Tracking",
    desc: "Log your daily emotions and identify patterns over time.",
  },
  {
    icon: "\uD83D\uDCD3",
    title: "Private Journal",
    desc: "Express your thoughts in a safe, private digital journal.",
  },
  {
    icon: "\uD83E\uDD16",
    title: "AI Chat Support",
    desc: "Talk to an empathetic AI companion anytime you need.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Data Privacy",
    desc: "Your data is secure and only accessible by you.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EDD4] to-[#F6F5F3]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-[#272628] mb-4">
          Welcome to <span className="text-[#AD97CC]">VYBE</span>
        </h1>
        <p className="text-lg md:text-xl text-[#353137] max-w-xl mb-8">
          Your personal mood &amp; mental health companion. Track emotions,
          journal your thoughts, and get AI-powered support.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-[#AD97CC] text-white px-8 py-3 rounded-xl text-lg hover:bg-[#9B84C4] transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border-2 border-[#AD97CC] text-[#AD97CC] px-8 py-3 rounded-xl text-lg hover:bg-[#AD97CC] hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#272628] mb-4">About VYBE</h2>
        <p className="text-[#4B4A4E] leading-relaxed">
          VYBE provides a safe, private space to monitor your emotional
          well-being. Record daily moods, maintain a personal journal, and
          receive AI-powered emotional support — all in one place. Our mission
          is to promote self-awareness, emotional regulation, and mental
          wellness.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#272628] mb-8 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold text-[#272628] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[#4B4A4E]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center px-6 py-16">
        <h2 className="text-2xl font-bold text-[#272628] mb-4">
          Ready to start your wellness journey?
        </h2>
        <Link
          to="/register"
          className="bg-[#AD97CC] text-white px-10 py-3 rounded-xl text-lg hover:bg-[#9B84C4] transition"
        >
          Get Started — It's Free
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
