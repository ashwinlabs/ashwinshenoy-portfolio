import { motion } from "motion/react";

const SKILLS = [
  "Quality Engineering",
  "Engineering Leadership",
  "AI-Enabled Engineering",
  "Solution Strategy",
  "Enterprise Delivery",
  "Automation Strategy",
  "DevOps Enablement",
  "Salesforce Quality",
  "Operational Excellence",
  "Engineering Productivity",
  "Continuous Testing",
  "Governance",
  "GTM Enablement"
];

export default function Skills() {
  return (
    <section id="expertise" className="py-24 border-t border-ink/10 bg-paper/50 overflow-hidden">
      <div className="px-6 md:px-24 mb-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand font-medium block mb-2">
            Executive Competencies
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-ink">
            Core <span className="text-brand">Expertise</span>
          </h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
          (Strategic Capabilities & Domains)
        </span>
      </div>
      
      {/* Marquee effect */}
      <div className="overflow-hidden flex bg-brand py-7 text-paper rotate-[-1deg] w-[115%] -ml-[7.5%] shadow-md select-none">
        <motion.div 
          animate={{ x: [0, -2200] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 md:gap-16 whitespace-nowrap px-8 shrink-0 items-center"
        >
          {SKILLS.concat(SKILLS).concat(SKILLS).map((skill, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight flex items-center gap-12 md:gap-16">
              <span>{skill}</span>
              <span className="text-paper/40 text-2xl md:text-3xl font-light">/</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-24 mt-20">
        {[
          { label: "Quality Engineering", level: "Enterprise Practice" },
          { label: "AI-Enabled QA", level: "Intelligent Studio" },
          { label: "Delivery Excellence", level: "Predictable Releases" },
          { label: "GTM Enablement", level: "Solution Strategy" }
        ].map((item, i) => (
          <div key={i} className="border-l-2 border-brand/40 pl-6 py-2">
            <span className="font-mono text-[10px] uppercase text-ink/50 block mb-1 font-medium">{item.level}</span>
            <span className="text-lg md:text-xl font-display font-bold uppercase tracking-tight text-ink">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
