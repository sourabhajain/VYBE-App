import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are VYBE's AI mental health companion. You are warm, empathetic, and supportive.
Your role is to:
- Listen actively and validate the user's feelings
- Offer coping strategies and mindfulness techniques
- Provide motivational and uplifting guidance
- Suggest professional help when appropriate

Important rules:
- Never diagnose medical or mental health conditions
- Never prescribe medication
- If someone expresses suicidal thoughts or self-harm, gently encourage them to contact a crisis helpline (988 Suicide & Crisis Lifeline) or a trusted person
- Keep responses concise (2-4 sentences) unless more detail is needed
- Be non-judgmental and compassionate`;

export const chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Build conversation: system prompt + recent history + new message
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10), // keep last 10 messages for context
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 300,
      temperature: 0.7,
      presence_penalty: 0.6,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Chat error:", error);

    if (error?.status === 401) {
      return res.status(500).json({ message: "Invalid OpenAI API key" });
    }

    res.status(500).json({ message: "Failed to get AI response" });
  }
};
