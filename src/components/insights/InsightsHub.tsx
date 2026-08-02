import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, X, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { ARTICLES, ALL_CATEGORIES, Article, getFeaturedArticle } from "../../data/articles";

interface InsightsHubProps {
  onSelectArticle: (slug: string) => void;
  onBackToHome: () => void;
}

export default function InsightsHub({ onSelectArticle, onBackToHome }: InsightsHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const featuredArticle = useMemo(() => getFeaturedArticle(), []);

  // Filtered articles logic
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" ||
        article.category === selectedCategory ||
        article.tags.includes(selectedCategory);

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Is featured article visible in grid or shown separately at top?
  const showFeaturedAtTop =
    !searchQuery.trim() &&
    selectedCategory === "All" &&
    featuredArticle;

  const gridArticles = useMemo(() => {
    if (showFeaturedAtTop && featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, showFeaturedAtTop, featuredArticle]);

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-brand selection:text-white pt-28 pb-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-12 border-b border-paper/10 pb-6">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-brand transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </button>
          
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper/40">
            <span>Knowledge Hub</span>
            <span>•</span>
            <span className="text-brand">{ARTICLES.length} Perspectives</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 font-mono text-xs text-brand font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE THOUGHT LEADERSHIP</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-paper mb-6 leading-[0.95]">
            Insights & <span className="text-brand">Perspectives</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-light text-paper/75 leading-relaxed font-sans">
            A collection of articles, perspectives and practical experiences on Quality Engineering, AI, Automation, Engineering Leadership and Enterprise Delivery.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-12 space-y-6">
          
          {/* Search Box */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-paper/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or technologies..."
              className="w-full bg-paper/[0.04] border border-paper/15 rounded-2xl pl-12 pr-10 py-4 text-sm md:text-base text-paper placeholder:text-paper/40 outline-none focus:border-brand focus:ring-1 focus:ring-brand/40 transition-all font-sans"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-paper/40 hover:text-paper rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {ALL_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                    isActive
                      ? "bg-brand text-white font-bold shadow-md shadow-brand/20 border border-brand"
                      : "bg-paper/[0.03] text-paper/60 border border-paper/10 hover:border-paper/30 hover:text-paper"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURED ARTICLE (Displayed prominently at the top when no search query is active) */}
        {showFeaturedAtTop && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => onSelectArticle(featuredArticle.slug)}
            className="mb-14 p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-paper/[0.05] to-brand/5 border border-brand/30 rounded-[32px] hover:border-brand/60 transition-all duration-300 group cursor-pointer shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand font-bold px-3 py-1 bg-brand/15 border border-brand/30 rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED PERSPECTIVE</span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-paper/50">
                    {featuredArticle.category}
                  </span>
                  <span className="font-mono text-xs text-paper/30">•</span>
                  <div className="flex items-center gap-1 font-mono text-xs text-paper/50">
                    <Clock className="w-3.5 h-3.5 text-brand/80" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paper group-hover:text-brand transition-colors duration-300 leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-paper/75 font-sans leading-relaxed max-w-3xl">
                  {featuredArticle.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-paper/50">
                  <span>By {featuredArticle.author.name}</span>
                  <span>•</span>
                  <span>{featuredArticle.publishedDate}</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-brand text-white rounded-2xl font-display text-sm font-bold uppercase tracking-wider group-hover:bg-white group-hover:text-ink transition-all duration-300 shadow-xl">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ARTICLES GRID */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                onClick={() => onSelectArticle(article.slug)}
                className="p-7 md:p-8 bg-paper/[0.03] border border-paper/10 rounded-[28px] hover:border-brand/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-2xl"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand font-bold px-3 py-1 bg-brand/10 border border-brand/20 rounded-md">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-paper/50">
                      <Clock className="w-3.5 h-3.5 text-brand/70" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold tracking-tight text-paper group-hover:text-brand transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                    {article.title}
                  </h3>

                  {/* Summary Excerpt */}
                  <p className="text-xs sm:text-sm text-paper/70 font-sans line-clamp-3 leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-paper/10 flex items-center justify-between text-xs font-mono text-paper/50 group-hover:text-brand transition-colors">
                  <span>{article.publishedDate}</span>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-20 px-6 bg-paper/[0.02] border border-paper/10 rounded-[28px]">
            <BookOpen className="w-12 h-12 text-paper/30 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-paper mb-2">
              No Articles Found
            </h3>
            <p className="text-sm text-paper/60 font-sans max-w-md mx-auto mb-6">
              We couldn't find any perspectives matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-brand text-white font-mono text-xs uppercase tracking-wider rounded-xl font-bold hover:bg-brand/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
