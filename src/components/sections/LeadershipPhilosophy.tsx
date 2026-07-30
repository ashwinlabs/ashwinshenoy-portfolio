import { motion } from "motion/react";
import React from "react";
import { Users, Cpu, ShieldCheck, TrendingUp, RefreshCw, Target } from "lucide-react";

const PRINCIPLES = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand" />,
    title: "Quality is a Business Strategy",
    description: "Quality Engineering is never a downstream compliance gatekeeper. It is a primary business enabler that directly impacts release velocity, customer trust, and long-term brand equity."
  },
  {
    icon: <Users className="w-5 h-5 text-brand" />,
    title: "Engineering Excellence Through People",
    description: "High-performing teams thrive in environments built on psychological safety, ownership, and clear career development models where talent is empowered to innovate."
  },
  {
    icon: <Target className="w-5 h-5 text-brand" />,
    title: "Automation with Purpose",
    description: "Automation must be architected for resilience and ROI, not just test coverage numbers. Shift-left test design and intelligent quality gates maximize release predictability."
  },
  {
    icon: <Cpu className="w-5 h-5 text-brand" />,
    title: "AI as an Engineering Multiplier",
    description: "Harnessing generative AI models and intelligent QA studios transforms requirements into automation assets, turning reactive testing into proactive quality intelligence."
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-brand" />,
    title: "Continuous Improvement",
    description: "Operational excellence requires constant iteration—refining CoE governance models, optimizing regression suites, and measuring success against transparent engineering KPIs."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-brand" />,
    title: "Business-aligned Technology Decisions",
    description: "Technology choices must serve organizational goals. Modernization investments should yield measurable returns: reduced cost of quality and accelerated time-to-market."
  }
];

export default function LeadershipPhilosophy() {
  return (
    <section id="philosophy" className="py-24 px-6 md:px-24 bg-paper/60 border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-medium block mb-3">
              Core Convictions & Executive Strategy
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Leadership <span className="text-brand">Philosophy</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm md:text-base font-light text-ink/75 leading-relaxed font-sans">
            Guiding principles refined over 16+ years of scaling enterprise Quality Engineering practices, delivering modern software, and empowering high-impact teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="p-8 bg-paper border border-ink/10 rounded-[24px] shadow-sm hover:border-brand/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-brand/10 rounded-xl shrink-0 w-fit mb-6">
                  {principle.icon}
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink mb-3">
                  {principle.title}
                </h3>
                <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-sans">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
