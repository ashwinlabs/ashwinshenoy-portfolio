/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import AIAssistant from "./components/AIAssistant";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="relative selection:bg-brand selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        
        {/* Footer info from Recipe 1 */}
        <section id="contact" className="py-32 px-6 md:px-24 border-t border-ink/10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-8 block">
            Got a vision?
          </span>
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">
            Let's build <br/> the <span className="text-brand">future</span>.
          </h2>
          <motion.a
            href="mailto:hello@ashwinshenoy.me"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-ink text-paper rounded-[20px] font-display text-xl uppercase tracking-widest hover:bg-brand transition-colors"
          >
            Start a Conversation
          </motion.a>
          
          <div className="mt-32 w-full flex justify-between items-center font-mono text-[10px] uppercase opacity-30">
            <span>© 2026 ASHWIN SHENOY</span>
            <span>BUILT WITH GOOGLE AI STUDIO</span>
            <span>LOCAL TIME 16:31 Z</span>
          </div>
        </section>
      </main>

      <AIAssistant />
    </div>
  );
}
