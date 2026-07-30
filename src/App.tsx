/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import LeadershipPhilosophy from "./components/sections/LeadershipPhilosophy";
import ImpactHighlights from "./components/sections/ImpactHighlights";
import Skills from "./components/sections/Skills";
import AIAssistant from "./components/AIAssistant";
import ContactModal from "./components/ContactModal";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "motion/react";
import { Youtube, Linkedin, Instagram, Mail } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative selection:bg-brand selection:text-white">
      <Analytics />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <LeadershipPhilosophy />
        <ImpactHighlights />
        <Projects />
        <Skills />
        
        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 md:px-24 border-t border-ink/10 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand font-medium mb-6 block">
            Initiate Advisory & Leadership Engagement
          </span>
          <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tight mb-8 max-w-4xl leading-[0.95]">
            Let's Build Better <br/> <span className="text-brand">Engineering Organizations</span>
          </h2>
          <p className="max-w-2xl text-sm md:text-base font-light text-ink/75 leading-relaxed mb-12 font-sans">
            Whether you're looking to modernize Quality Engineering, accelerate delivery, build AI-enabled engineering capabilities, establish engineering governance, or drive enterprise transformation, I'd welcome the opportunity to connect.
          </p>
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-ink text-paper rounded-[20px] font-display text-lg md:text-xl uppercase tracking-widest hover:bg-brand transition-colors mb-16 cursor-pointer shadow-lg"
            id="start_conversation_trigger_btn"
          >
            Start a Conversation
          </motion.button>

          {/* Social and Email Connections */}
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <motion.a
              href="https://www.linkedin.com/in/ashwinshenoy7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-ink/10 hover:border-brand/40 text-ink/60 hover:text-brand bg-ink/5 hover:bg-brand/5 transition-all flex items-center justify-center group"
              title="LinkedIn"
              id="contact_linkedin"
            >
              <Linkedin className="w-6 h-6 transition-transform group-hover:scale-105" />
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@ashwinshenoy7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-ink/10 hover:border-brand/40 text-ink/60 hover:text-brand bg-ink/5 hover:bg-brand/5 transition-all flex items-center justify-center group"
              title="YouTube"
              id="contact_youtube"
            >
              <Youtube className="w-6 h-6 transition-transform group-hover:scale-105" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/ashwinshenoy7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-ink/10 hover:border-brand/40 text-ink/60 hover:text-brand bg-ink/5 hover:bg-brand/5 transition-all flex items-center justify-center group"
              title="Instagram"
              id="contact_instagram"
            >
              <Instagram className="w-6 h-6 transition-transform group-hover:scale-105" />
            </motion.a>

            <motion.a
              href="mailto:ashwinshenoy7@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-ink/10 hover:border-brand/40 text-ink/60 hover:text-brand bg-ink/5 hover:bg-brand/5 transition-all flex items-center justify-center group"
              title="Gmail"
              id="contact_gmail"
            >
              <Mail className="w-6 h-6 transition-transform group-hover:scale-105" />
            </motion.a>
          </div>
          
          <div className="mt-32 w-full flex justify-between items-center font-mono text-[10px] uppercase opacity-30">
            <span>© 2026 ASHWIN SHENOY</span>
            <span>BUILT WITH GOOGLE AI STUDIO</span>
            <span>LOCAL TIME 16:31 Z</span>
          </div>
        </section>
      </main>

      <AIAssistant />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
