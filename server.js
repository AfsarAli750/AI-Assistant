import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Keyword list to detect agriculture-related questions


// 🧩 Helper function to check if question is agriculture related


// 🚀 POST route for chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res
        .status(400)
        .json({ error: "Please provide a valid message." });
    }

    console.log("🧠 Received:", message);

    // 🛑 Restrict to agriculture only
   

    // ✅ Use Gemini 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 🎯 Add system-style instruction for better context
    const prompt = `
You are an expert agriculture assistant.
Only answer questions related to farming, crops, soil health, irrigation, fertilizers, weather for farming, and agriculture.
If the user asks about anything else (like technology, AI, or general topics), politely tell them that you only answer agriculture-related questions.

User: ${message}
`;

    // 🧠 Generate response
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    console.log("✅ Reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error("❌ Gemini error:", error);
    res.status(500).json({
      error: "Something went wrong while processing your request.",
      details: error.message,
    });
  }
});

// 🌍 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
