import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini Setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Using the recommended Gemini 3 model and Antigravity SDK patterns
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are the AI Assistant for Ashwin Shenoy. You help visitors learn about Ashwin's background, projects, and leadership in engineering. 
        Ashwin is a Quality Engineering, Delivery, and AI Transformation leader driving enterprise-scale modernization with 15+ years of experience.
        He specializes in Healthcare, BFSI/FinTech, Energy, EdTech, and E-commerce domains.
        His focus is on scalability, operational excellence, and AI-assisted engineering practices.
        If you don't know something specific about Ashwin, be polite and offer to have them reach out to him directly.
        Keep responses concise and professional.`,
      },
      history: (history || []).map((h: any) => ({
        role: h.role,
        parts: h.parts,
      })),
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
