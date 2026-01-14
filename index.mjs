// index.mjs
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Configure OpenAI
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY, // store in environment variables
  apiKey: "REMOVEDaK2SXyjS8731tZzSTkFd3O5eZT6FjhB12UuFlU6iIdATFOa0Oa9uBz3sGANroawyOImHL2ntxTT3BlbkFJDxsTAeW5DHqgA3YxyMRgNLIr9gWEypvtY91y-tB2Zckm1GxvWRNEay6OuHmgMP7NF95acWNmkA"
});

// Optional: quick test route
app.get("/profile", (req, res) => {
  res.json({ name: "erlan", age: 35 });
});

// Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        { role: "system", content: "You are Tami, a friendly assistant." },
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    const reply = response.choices[0].message.content.trim();
    return res.json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
