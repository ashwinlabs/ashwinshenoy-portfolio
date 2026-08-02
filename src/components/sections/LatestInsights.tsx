import { motion } from "motion/react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { getLatestArticles, Article } from "../../data/articles";

interface LatestInsightsProps {
  onNavigateToInsights: (slug?: string) => void;
}

export default function LatestInsights({ onNavigateToInsights }: LatestInsightsProps) {
  const latestArticles: Article[] = getLatestArticles(3);

  return (
    <section id="latest-insights" className="py-24 px-6 md:px-16 lg:px-24 bg-ink text-paper border-t border-paper/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-paper/10 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-semibold block mb-2 opacity-90">
              Thought Leadership & Technical Perspectives
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Latest <span className="text-brand">Insights</span>
            </h2>
          </div>
          <button
            onClick={() => onNavigateToInsights()}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm py-1"
            aria-label="View all insights articles"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {latestArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => onNavigateToInsights(article.slug)}
              className="p-6 md:p-7 bg-paper/[0.03] border border-paper/10 rounded-[24px] hover:border-brand/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand font-bold px-2.5 py-1 bg-brand/10 border border-brand/20 rounded-md">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-paper/50">
                    <Clock className="w-3 h-3 text-brand/70" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold tracking-tight text-paper group-hover:text-brand transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                  {article.title}
                </h3>

                {/* Description Excerpt */}
                <p className="text-xs text-paper/70 font-sans line-clamp-3 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-paper/10 flex items-center justify-between text-xs font-mono text-paper/50 group-hover:text-brand transition-colors">
                <span>{article.publishedDate}</span>
                <div className="flex items-center gap-1 font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigateToInsights()}
            className="inline-flex items-center gap-3 px-8 py-4 bg-paper/5 hover:bg-brand text-paper hover:text-white border border-paper/10 hover:border-brand rounded-2xl font-display text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Knowledge Hub & Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
