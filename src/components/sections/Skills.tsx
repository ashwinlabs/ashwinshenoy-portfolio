import { motion } from "motion/react";

const SKILLS = [
  "Typescript", "React", "Node.js", "Gemini AI", "Next.js", 
  "Tailwind CSS", "Framer Motion", "Three.js", "PostgreSQL", 
  "Docker", "Vite", "D3.js", "Python"
];

export default function Skills() {
  return (
    <section className="py-24 border-t border-ink/5 bg-paper/50">
      <div className="px-6 md:px-24 mb-12">
        <h2 className="font-display text-2xl font-bold uppercase tracking-widest opacity-40">
          Tecnology Stack
        </h2>
      </div>
      
      {/* Marquee effect from Recipe 5 */}
      <div className="overflow-hidden flex bg-brand py-8 text-paper rotate-[-1deg] w-[110%] -ml-[5%]">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap px-8 shrink-0"
        >
          {SKILLS.concat(SKILLS).map((skill, i) => (
            <span key={i} className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {skill} —
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-24 mt-24">
        {[
          { label: "Frontend", level: "Expert" },
          { label: "AI Integration", level: "Advanced" },
          { label: "Visual Design", level: "Fluid" },
          { label: "Architectures", level: "Scalable" }
        ].map((item, i) => (
          <div key={i} className="border-l border-ink/10 pl-6 py-4">
            <span className="font-mono text-[10px] uppercase opacity-40 block mb-2">{item.level}</span>
            <span className="text-xl font-display font-medium uppercase tracking-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
