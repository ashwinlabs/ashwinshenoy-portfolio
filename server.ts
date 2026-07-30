import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import chatHandler from "./api/chat.ts";
import contactHandler from "./api/contact.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// AI Assistant Endpoint - Uses shared serverless function handler
app.post("/api/chat", async (req, res) => {
  await chatHandler(req, res);
});

// Contact Email Endpoint - Uses shared serverless function handler
app.post("/api/contact", async (req, res) => {
  await contactHandler(req, res);
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
