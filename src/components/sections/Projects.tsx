import { motion } from "motion/react";
import { CheckCircle2, Target, Zap } from "lucide-react";

const INITIATIVES = [
  {
    id: "01",
    title: "AI-enabled QA Studio",
    category: "AI Transformation & Engineering Acceleration",
    challenge: "Slow requirements-to-test translation, manual test case creation, and automation development bottlenecking high-velocity Agile delivery.",
    contribution: "Architected and deployed an AI-driven QA platform leveraging LLMs to automatically extract test scenarios, generate automation assets, and maintain end-to-end traceability.",
    metric: "50%+",
    metricLabel: "Accelerated QA Asset Generation",
    outcomeDetail: "Improved requirement coverage and automated test scenario extraction using LLMs."
  },
  {
    id: "02",
    title: "Enterprise Quality Engineering Transformation",
    category: "Practice Building & Scaling",
    challenge: "Fragmented QA methodologies, high manual testing overhead, and delayed release cycles across global enterprise units.",
    contribution: "Spearheaded end-to-end QE practice modernization, introducing shift-left automation toolchains, standardized quality metrics, and continuous feedback loops.",
    metric: "40%+",
    metricLabel: "Reduction in Regression Execution Cycles",
    outcomeDetail: "Enhanced release predictability across global enterprise units."
  },
  {
    id: "03",
    title: "Quality Engineering Center of Excellence",
    category: "Governance & Engineering Standards",
    challenge: "Lack of centralized governance, inconsistent testing frameworks, and duplicated efforts across multi-region engineering teams.",
    contribution: "Established enterprise QE CoE, defined unified governance models, reusable automation frameworks, and executive quality dashboards.",
    metric: "CoE",
    metricLabel: "Unified Enterprise Quality Governance",
    outcomeDetail: "Standardized testing frameworks across engineering teams while eliminating redundant tooling."
  },
  {
    id: "04",
    title: "Solution Strategy & GTM Enablement",
    category: "Strategy & Pursuit Enablement",
    challenge: "Complex client requirements requiring customized, high-value Quality Engineering solution proposals and technical alignment during enterprise pursuits.",
    contribution: "Partnered with sales and executive leadership to architect tailormade QE transformation solutions, deliver technical defense, and lead proposal strategy.",
    metric: "Multi-$M",
    metricLabel: "Enterprise Contract Wins & Expansion",
    outcomeDetail: "Directly contributed to strategic account growth through tailormade solution defense."
  },
  {
    id: "05",
    title: "Enterprise Delivery Modernization",
    category: "Operational Excellence & Continuous Delivery",
    challenge: "Siloed dev-test operations and unpredictable software deployments in highly regulated multi-cloud environments.",
    contribution: "Led cross-functional delivery transformation initiatives integrating CI/CD pipelines, containerized test environments, and automated quality gates.",
    metric: "3x",
    metricLabel: "Increase in Deployment Frequency",
    outcomeDetail: "Achieved zero high-severity production defects across regulated multi-cloud environments."
  }
];

export default function Projects() {
  return (
    <section id="initiatives" className="py-24 px-6 md:px-16 lg:px-24 bg-ink text-paper">
      <div id="projects" className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 border-b border-paper/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold block mb-2 opacity-90">
              Strategic Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
              Transformation <span className="text-brand">Highlights</span>
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
            Executive Case Studies & Leadership Initiatives
          </span>
        </div>

        <div className="space-y-8 md:space-y-10">
          {INITIATIVES.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 lg:p-12 bg-paper/[0.03] border border-paper/10 rounded-[28px] hover:border-brand/35 transition-all duration-300 group shadow-xl relative overflow-hidden"
            >
              {/* Header: Responsive Two-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-paper/10 pb-8 mb-8 items-stretch">
                
                {/* LEFT COLUMN: Number, Category, Large Title (~60% / 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-brand text-xs font-bold px-2.5 py-1 bg-brand/10 border border-brand/20 rounded-md tracking-wider">
                        {item.id}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-paper/60 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-3xl font-display font-semibold tracking-tight text-paper group-hover:text-brand transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* RIGHT COLUMN: Executive KPI Card (~40% / 5 cols) */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="h-full bg-brand/10 border border-brand/25 rounded-2xl p-5 lg:p-6 flex flex-col justify-between backdrop-blur-sm group-hover:border-brand/40 transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-brand font-bold mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span>OUTCOME</span>
                      </div>
                      <div className="mb-2">
                        <div className="font-display text-3xl lg:text-4xl font-extrabold text-brand tracking-tight mb-1">
                          {item.metric}
                        </div>
                        <p className="text-xs lg:text-sm font-semibold text-paper/95 font-sans leading-snug">
                          {item.metricLabel}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-paper/70 font-sans leading-relaxed border-t border-brand/15 pt-2.5 mt-2">
                      {item.outcomeDetail}
                    </p>
                  </div>
                </div>

              </div>

              {/* BODY: Two Equal-Width Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Card 1: Business Challenge */}
                <div className="bg-paper/[0.02] hover:bg-paper/[0.05] p-6 lg:p-7 rounded-2xl border border-paper/10 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 rounded-lg bg-paper/10 text-paper/70 border border-paper/10 shrink-0">
                        <Target className="w-4 h-4 text-paper/80" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-paper/50 font-bold">
                        Business Challenge
                      </span>
                    </div>
                    <p className="text-sm md:text-[15px] text-paper/80 font-sans leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>
                </div>

                {/* Card 2: Executive Leadership Contribution */}
                <div className="bg-paper/[0.02] hover:bg-paper/[0.04] p-6 lg:p-7 rounded-2xl border border-paper/10 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 rounded-lg bg-brand/10 text-brand border border-brand/20 shrink-0">
                        <Zap className="w-4 h-4 text-brand" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-brand font-bold">
                        Executive Leadership Contribution
                      </span>
                    </div>
                    <p className="text-sm md:text-[15px] text-paper/80 font-sans leading-relaxed">
                      {item.contribution}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

