import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-brand font-medium mb-6 block">
              ENGINEERING PRACTICE LEADER
            </span>
            <h1 className="font-display text-[14vw] md:text-[9.5vw] leading-[0.85] font-black uppercase tracking-tighter mb-8">
              Ashwin <br />
              <span className="text-brand">Shenoy</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-xl space-y-3"
            >
              <p className="text-lg md:text-xl font-medium tracking-tight text-ink">
                Quality Engineering • Solution Strategy • AI-Enabled Engineering
              </p>
              <p className="text-sm md:text-base font-light leading-relaxed opacity-75">
                Driving enterprise Quality Engineering practice building, delivery excellence, and AI-enabled modernization across global organizations.
              </p>
            </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a 
              href="#initiatives" 
              className="flex items-center gap-2 group text-brand font-medium text-lg"
            >
              Transformation Initiatives
              <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative lines from Recipe 1 */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-ink/10 hidden lg:block" />
      <div className="absolute top-0 left-0 w-full h-[30vh] border-b border-ink/10 hidden lg:block" />
    </section>
  );
}
