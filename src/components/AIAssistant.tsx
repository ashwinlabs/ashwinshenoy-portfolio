import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] }))
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[350px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-ink/5 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-ink text-paper p-4 flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-sm tracking-tight">Ashwin Shenoy — Executive AI</h4>
                <p className="text-[9px] font-mono uppercase tracking-widest text-brand font-medium">Digital Twin • QE & AI Leadership</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-paper/10 p-1 rounded-full transition-colors text-paper/70 hover:text-paper"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 bg-paper/30 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="space-y-3 my-2">
                  <div className="text-center py-5 px-4 text-xs text-ink/80 leading-relaxed bg-paper/80 border border-ink/8 rounded-xl font-sans">
                    Welcome! I'm Ashwin's AI Digital Twin. Ask me anything about Quality Engineering practice building, AI transformation, leadership philosophy, or domain execution.
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      "What is your approach to QE Transformation?",
                      "How do you apply AI in Quality Engineering?",
                      "Tell me about your Leadership Philosophy"
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(prompt);
                        }}
                        className="text-left text-[11px] font-sans px-3 py-2 bg-white border border-ink/10 rounded-lg hover:border-brand/50 hover:text-brand transition-colors text-ink/80 font-medium"
                      >
                        → {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div 
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    m.role === "user" 
                      ? "bg-brand text-white rounded-tr-none" 
                      : "bg-white text-ink shadow-sm rounded-tl-none border border-ink/5"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-ink/5 flex items-center gap-2 text-xs opacity-60 italic">
                    <Loader2 size={12} className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-ink/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me something..."
                className="flex-1 bg-paper/50 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 ring-brand/30 transition-all"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-ink text-white p-2 rounded-xl hover:bg-brand transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand text-white p-4 rounded-full shadow-lg flex items-center justify-center relative overflow-hidden group"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
