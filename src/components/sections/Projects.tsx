import { motion } from "motion/react";

const INITIATIVES = [
  {
    id: "01",
    title: "Enterprise Quality Engineering Transformation",
    category: "Practice Building & Scaling",
    challenge: "Fragmented QA methodologies, high manual testing overhead, and delayed release cycles across global enterprise units.",
    contribution: "Spearheaded end-to-end QE practice modernization, introducing shift-left automation toolchains, standardized quality metrics, and continuous feedback loops.",
    outcome: "Achieved 40%+ reduction in regression execution cycles and enhanced release predictability."
  },
  {
    id: "02",
    title: "AI-enabled QA Studio",
    category: "AI Transformation & Engineering Acceleration",
    challenge: "Slow requirements-to-test translation and manual test case creation bottlenecking rapid agile delivery sprints.",
    contribution: "Architected and deployed an AI-driven QA platform leveraging LLMs to automatically extract test scenarios, generate automation assets, and maintain end-to-end traceability.",
    outcome: "Accelerated QA asset generation by 50%+ while improving requirement coverage."
  },
  {
    id: "03",
    title: "Quality Engineering Center of Excellence",
    category: "Governance & Engineering Standards",
    challenge: "Lack of centralized governance, inconsistent testing frameworks, and duplicated efforts across multi-region engineering teams.",
    contribution: "Established enterprise QE CoE, defined unified governance models, reusable automation frameworks, and executive quality dashboards.",
    outcome: "Unified quality standards across 500+ engineers and eliminated redundant tooling costs."
  },
  {
    id: "04",
    title: "Solution Strategy & GTM Enablement",
    category: "Strategy & Pursuit Enablement",
    challenge: "Complex client requirements requiring customized, high-value Quality Engineering solution proposals and technical alignment during enterprise pursuits.",
    contribution: "Partnered with sales and executive leadership to architect tailormade QE transformation solutions, deliver technical defense, and lead proposal strategy.",
    outcome: "Directly contributed to multi-million dollar enterprise contract wins and strategic account expansion."
  },
  {
    id: "05",
    title: "Enterprise Delivery Modernization",
    category: "Operational Excellence & Continuous Delivery",
    challenge: "Siloed dev-test operations and unpredictable software deployments in highly regulated multi-cloud environments.",
    contribution: "Led cross-functional delivery transformation initiatives integrating CI/CD pipelines, containerized test environments, and automated quality gates.",
    outcome: "Increased deployment frequency 3x with zero high-severity production defects."
  }
];

export default function Projects() {
  return (
    <section id="initiatives" className="py-24 px-6 md:px-24 bg-ink text-paper">
      <div id="projects" className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-medium block mb-2 opacity-80">
              Strategic Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Transformation <span className="text-brand">Highlights</span>
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest opacity-40">
            (Strategic Initiatives & Practice Building)
          </span>
        </div>

        <div className="space-y-6">
          {INITIATIVES.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ backgroundColor: "rgba(242, 125, 38, 0.05)" }}
              className="p-8 md:p-10 bg-paper/5 border border-paper/10 rounded-[24px] hover:border-brand/40 transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 border-b border-paper/10 pb-6">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-brand text-2xl font-bold">{item.id}</span>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand/80 mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-paper group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 self-start lg:self-auto">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand font-semibold px-4 py-2 bg-brand/10 border border-brand/20 rounded-full inline-block">
                    Outcome: {item.outcome}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-paper/80 font-sans leading-relaxed">
                <div className="bg-paper/5 p-5 rounded-xl border border-paper/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-paper/40 font-bold block mb-1.5">
                    Business Challenge
                  </span>
                  <p>{item.challenge}</p>
                </div>

                <div className="bg-paper/5 p-5 rounded-xl border border-paper/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand/80 font-bold block mb-1.5">
                    Executive Leadership Contribution
                  </span>
                  <p>{item.contribution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
