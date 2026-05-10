import { useState } from "react";
import Sidebar from "../components/Sidebar";

const programs = [
  {
    title: "Mindfulness Basics",
    description: "Learn how to stay present and calm through mindfulness techniques.",
    steps: [
      "Find a quiet space and sit comfortably.",
      "Close your eyes and take 5 deep breaths.",
      "Focus on your breathing — notice each inhale and exhale.",
      "When your mind wanders, gently bring it back to your breath.",
      "Practice for 5–10 minutes daily, gradually increasing the time.",
    ],
  },
  {
    title: "Anxiety Relief",
    description: "Step-by-step program to manage and reduce anxiety.",
    steps: [
      "Identify your anxiety triggers — write them down.",
      "Practice the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.",
      "Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.",
      "Limit caffeine and set a consistent sleep schedule.",
      "Reach out to someone you trust when feeling overwhelmed.",
    ],
  },
  {
    title: "Sleep Improvement",
    description: "Guided sessions to help you sleep better.",
    steps: [
      "Set a consistent bedtime and wake time — even on weekends.",
      "Avoid screens for 30 minutes before bed.",
      "Keep your room cool, dark, and quiet.",
      "Try a body scan relaxation: tense and release each muscle group.",
      "Write tomorrow's to-do list before bed to clear your mind.",
    ],
  },
  {
    title: "Positive Thinking",
    description: "Boost your mindset with daily positive affirmations.",
    steps: [
      "Start your morning with 3 things you're grateful for.",
      "Replace negative self-talk: change 'I can't' to 'I'm learning to'.",
      "Celebrate small wins — acknowledge your progress.",
      "Surround yourself with positive people and content.",
      "End each day by writing one thing that went well.",
    ],
  },
];

function SelfHelpPrograms() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-200 to-gray-300">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#272628] mb-2">Self-Help Programs</h1>
        <p className="text-[#4B4A4E] mb-8">Click on a program to see guided steps.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {programs.map((program, index) => (
            <div
              key={index}
              onClick={() => toggle(index)}
              className={`backdrop-blur-md bg-white/30 rounded-2xl p-6 shadow-lg border border-white/50 cursor-pointer transition-all duration-300 ${
                expanded === index ? "ring-2 ring-[#AD97CC]" : "hover:scale-105"
              }`}
            >
              <h3 className="text-xl font-semibold text-[#272628] mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-[#4B4A4E]">{program.description}</p>

              {expanded === index && (
                <div className="mt-4 pt-4 border-t border-white/50">
                  <p className="text-sm font-medium text-[#272628] mb-2">Steps:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    {program.steps.map((step, si) => (
                      <li key={si} className="text-sm text-[#4B4A4E]">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelfHelpPrograms;
