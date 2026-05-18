import { motion } from "motion/react";

const PROJECTS = [
  {
    id: "01",
    title: "AI Studio Preview",
    category: "Fullstack / AI",
    description: "A collaborative platform for rapid AI app prototyping.",
    link: "#"
  },
  {
    id: "02",
    title: "Vibe Engine",
    category: "Design System",
    description: "A headless design framework focused on emotional interaction.",
    link: "#"
  },
  {
    id: "03",
    title: "Neural Canvas",
    category: "SVG / Canvas",
    description: "Interactive generative art powered by real-time neural inputs.",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-24 bg-ink text-paper">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase italic opacity-90">
            Selected Works
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest opacity-40">
            (Scroll to Explore)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-[1px] bg-paper/10 border border-paper/10">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ backgroundColor: "rgba(242, 125, 38, 0.1)" }}
              className="group py-12 px-8 flex flex-col md:flex-row items-baseline gap-8 cursor-pointer transition-colors"
            >
              <span className="font-mono text-brand text-xl font-bold">{project.id}</span>
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 group-hover:translate-x-2 transition-transform">
                  {project.title}
                </h3>
              </div>
              <p className="max-w-sm text-sm opacity-60 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
