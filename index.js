const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// optional: quick test route
app.get("/profile", (req, res) => {
res.json({ name: "erlan", age: 35 });
});

// ✅ REQUIRED: chat route (your RN app calls POST /chat)
app.post("/chat", (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
  return res.status(400).json({ error: "message is required" });
  }

  // MVP reply (replace later with OpenAI)
  const reply = `tami: You said "${message}"`;

  return res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
console.log(`Server running on port: ${PORT}`);
});