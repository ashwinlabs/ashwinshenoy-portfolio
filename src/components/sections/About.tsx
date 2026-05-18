import { motion } from "motion/react";
import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8">
            Behind the <span className="text-brand">Code</span>
          </h2>
          <div className="space-y-6 text-lg font-light opacity-80 leading-relaxed italic">
            <p>
              I'm a software craftsman based in the digital ether, focused on building interfaces that feel as good as they look.
            </p>
            <p>
              With a background in both engineering and design, I specialize in bridging the gap between pixel-perfect aesthetics and robust technical architecture.
            </p>
            <p>
              Currently exploring: Large Language Models, Generative Art, and High-Performance Web Graphics.
            </p>
          </div>
          
          <div className="mt-10 flex gap-6">
            <SocialLink href="#" icon={<Github size={20} />} label="GitHub" />
            <SocialLink href="#" icon={<Twitter size={20} />} label="Twitter" />
            <SocialLink href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="#" icon={<Mail size={20} />} label="Email" />
          </div>
        </div>

        <div className="relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="aspect-square bg-brand/5 border border-ink/5 rounded-[40px] overflow-hidden group"
          >
            {/* Placeholder for an image or generative art */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent flex items-center justify-center font-display text-[20vw] opacity-10 pointer-events-none uppercase">
              AS
            </div>
            <div className="absolute inset-12 border-2 border-brand/20 rounded-[30px]" />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ink border border-paper/10 text-paper p-6 rounded-3xl flex items-center justify-center text-center">
            <span className="font-mono text-[10px] uppercase leading-tight tracking-widest">
              Available <br/> for <br/> projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, color: "var(--color-brand)" }}
      className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all"
    >
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
    </motion.a>
  );
}
