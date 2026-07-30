import { motion } from "motion/react";
import React from "react";
import { Award, Briefcase, Zap, Globe, Layers, Compass, BarChart3 } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Briefcase className="w-5 h-5 text-brand" />,
    stat: "16+ Years",
    title: "16+ Years of Engineering Leadership",
    description: "Leading enterprise Quality Engineering, delivery transformation, and technology strategy across global organizations."
  },
  {
    icon: <Zap className="w-5 h-5 text-brand" />,
    stat: "40%+",
    title: "40%+ Reduction in Regression Cycles",
    description: "Achieved significant reduction in regression testing execution cycles through automation-led transformation programs."
  },
  {
    icon: <Layers className="w-5 h-5 text-brand" />,
    stat: "QE Practice",
    title: "Enterprise QE Practice Builder",
    description: "Built, scaled, and modernized Quality Engineering practices and capability frameworks across distributed teams."
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-brand" />,
    stat: "Governance",
    title: "Centers of Excellence Established",
    description: "Established enterprise CoEs, governance frameworks, engineering standards, and unified quality metrics."
  },
  {
    icon: <Globe className="w-5 h-5 text-brand" />,
    stat: "Multi-Domain",
    title: "Healthcare • BFSI • Energy • EdTech • E-commerce",
    description: "Deep execution expertise across complex regulated industries and high-scale consumer platforms."
  },
  {
    icon: <Compass className="w-5 h-5 text-brand" />,
    stat: "GTM Strategy",
    title: "GTM Strategy & Solution Engineering",
    description: "Partnered with sales and executive teams for solution architecture, client pursuits, and revenue growth."
  },
  {
    icon: <Award className="w-5 h-5 text-brand" />,
    stat: "Recognition",
    title: "Award-winning Engineering Leader",
    description: "Recognized for driving operational excellence, innovation, delivery predictability, and team development."
  }
];

export default function ImpactHighlights() {
  return (
    <section id="impact" className="py-24 px-6 md:px-24 border-t border-ink/10 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand font-medium block mb-3">
            Measurable Executive Outcomes
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Impact <span className="text-brand">Highlights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-8 bg-paper border border-ink/10 rounded-[24px] hover:border-brand/40 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-brand/10 rounded-xl">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-brand uppercase tracking-wider">
                    {item.stat}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-ink mb-3 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
