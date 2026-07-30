import { motion } from "motion/react";
import React from "react";
import { Linkedin, Youtube, Instagram, Mail } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8">
            Engineering <span className="text-brand">Leadership</span>
          </h2>
          <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-ink/85">
            <p className="font-normal text-ink/90">
              I lead enterprise Quality Engineering and delivery transformation initiatives focused on scalability, modernization, and operational excellence across Healthcare, BFSI/FinTech, Energy, EdTech, and E-commerce.
            </p>
            <p className="font-normal opacity-90">
              With 16+ years of experience, I’ve built and scaled QE practices, driven automation-led transformation programs, established governance models and Centers of Excellence, and enabled GTM strategy through solution engineering and strategic partnerships.
            </p>
            <p className="font-normal opacity-90">
              My focus is on helping organizations accelerate delivery, improve release predictability, reduce cost of quality, and build high-performing engineering ecosystems through intelligent automation, AI-assisted engineering practices, and measurable business outcomes.
            </p>
            <p className="pt-8 mt-8 border-t border-ink/10 text-sm md:text-base font-medium text-ink/70 leading-relaxed">
              Delivered automation-led transformation initiatives achieving 40%+ reduction in regression cycles and improved release predictability across enterprise programs.
            </p>
          </div>
          
          <div className="mt-10 flex gap-6">
            <SocialLink href="https://www.linkedin.com/in/ashwinshenoy7/" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://www.youtube.com/@ashwinshenoy7" icon={<Youtube size={20} />} label="YouTube" />
            <SocialLink href="https://www.instagram.com/ashwinshenoy7/" icon={<Instagram size={20} />} label="Instagram" />
            <SocialLink href="mailto:ashwinshenoy7@gmail.com" icon={<Mail size={20} />} label="Email" />
          </div>
        </div>

        <div className="relative">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-brand/5 border border-ink/10 rounded-[40px] overflow-hidden group relative shadow-lg"
          >
            <img 
              src="/ashwin-shenoy.jpg" 
              alt="Ashwin Shenoy — Quality Engineering & Technology Leader" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-ink border border-paper/10 text-paper p-6 rounded-3xl flex items-center justify-center text-center shadow-xl pointer-events-none">
            <span className="font-mono text-[10px] uppercase leading-tight tracking-widest font-medium">
              16+ Years <br/> Enterprise <br/> Leadership
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
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={`${label} profile of Ashwin Shenoy`}
      whileHover={{ y: -3, color: "var(--color-brand)" }}
      className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-md"
    >
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
    </motion.a>
  );
}
