import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Share2,
  Check,
  Linkedin,
  Twitter,
  Copy,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  User,
  ArrowRight
} from "lucide-react";
import { Article, ARTICLES, getArticleBySlug } from "../../data/articles";
import { updateMetaTags } from "../../utils/seo";

interface ArticleDetailProps {
  slug: string;
  onNavigateToInsights: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenContactModal: () => void;
}

export default function ArticleDetail({
  slug,
  onNavigateToInsights,
  onSelectArticle,
  onOpenContactModal
}: ArticleDetailProps) {
  const article: Article | undefined = getArticleBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Reading Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // SEO Update on Mount / Slug Change
  useEffect(() => {
    if (article) {
      updateMetaTags({
        title: article.seoTitle,
        description: article.seoDescription,
        url: `https://ashwinshenoy.me/insights/${article.slug}`
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-16 h-16 text-brand mb-4" />
        <h2 className="font-display text-3xl font-bold mb-2">Article Not Found</h2>
        <p className="text-paper/60 font-sans max-w-md mb-8">
          The article you are looking for does not exist or may have been moved.
        </p>
        <button
          onClick={onNavigateToInsights}
          className="px-6 py-3 bg-brand text-white font-mono text-xs uppercase tracking-wider rounded-xl font-bold cursor-pointer"
        >
          Return to Insights Hub
        </button>
      </div>
    );
  }

  // Find previous and next articles
  const currentIndex = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Copy article link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Copy code snippet handler
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  // Social share URLs
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(article.title);
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-brand selection:text-white pt-28 pb-32">
      
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-12 border-b border-paper/10 pb-6">
          <button
            onClick={onNavigateToInsights}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-brand transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Insights</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-paper/5 border border-paper/10 hover:border-brand/40 text-paper/70 hover:text-brand transition-all flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer"
              title="Copy Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>

            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-paper/5 border border-paper/10 hover:border-brand/40 text-paper/70 hover:text-brand transition-all flex items-center justify-center"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-paper/5 border border-paper/10 hover:border-brand/40 text-paper/70 hover:text-brand transition-all flex items-center justify-center"
              title="Share on X / Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Article Meta Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand font-bold px-3 py-1 bg-brand/10 border border-brand/20 rounded-lg">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-paper/50">
              <Clock className="w-3.5 h-3.5 text-brand" />
              <span>{article.readTime}</span>
            </div>
            <span className="font-mono text-xs text-paper/30">•</span>
            <span className="font-mono text-xs text-paper/50">{article.publishedDate}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper mb-6 leading-[1.05]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-light text-paper/80 font-sans leading-relaxed mb-8 border-l-2 border-brand pl-5">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-4 pt-6 border-t border-paper/10">
            <div className="w-12 h-12 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-brand" />
            </div>
            <div>
              <div className="font-display font-bold text-paper text-base">
                {article.author.name}
              </div>
              <div className="text-xs text-paper/60 font-mono">
                {article.author.role}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Takeaways Box */}
        {article.executiveTakeaways && article.executiveTakeaways.length > 0 && (
          <div className="mb-14 p-8 bg-brand/10 border border-brand/30 rounded-3xl backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand font-bold mb-4">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              <span>Executive Key Takeaways</span>
            </div>
            <ul className="space-y-3">
              {article.executiveTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-paper/90 font-sans leading-relaxed">
                  <span className="text-brand font-bold mt-1">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents Quick Nav */}
        <div className="mb-12 p-6 bg-paper/[0.02] border border-paper/10 rounded-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50 font-bold block mb-3">
            Table of Contents
          </span>
          <nav className="space-y-2 font-sans text-xs sm:text-sm">
            {article.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-paper/70 hover:text-brand transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-3 h-3 text-brand" />
                <span>{section.heading}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Article Sections Content */}
        <div className="space-y-12 font-sans text-paper/85 text-base sm:text-lg leading-relaxed">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper mb-4 text-white">
                {section.heading}
              </h2>

              <div className="space-y-4 whitespace-pre-line leading-relaxed font-sans text-paper/85">
                {section.content}
              </div>

              {/* Optional Key Points */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="my-6 p-6 bg-paper/[0.03] border border-paper/10 rounded-2xl space-y-2">
                  {section.keyPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-sm text-paper/80">
                      <span className="text-brand font-bold">→</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Code Snippet */}
              {section.codeSnippet && (
                <div className="my-8 rounded-2xl border border-paper/15 overflow-hidden bg-[#0d0d0d] font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between px-5 py-3 bg-paper/5 border-b border-paper/10 text-paper/60 text-[11px]">
                    <span>{section.codeSnippet.caption || section.codeSnippet.language}</span>
                    <button
                      onClick={() => handleCopyCode(section.codeSnippet!.code, section.id)}
                      className="flex items-center gap-1.5 text-brand hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCodeId === section.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCodeId === section.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="p-5 overflow-x-auto text-brand/90 leading-relaxed font-mono">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Optional Executive Callout */}
              {section.callout && (
                <div className="my-8 p-6 bg-paper/[0.04] border-l-4 border-brand rounded-r-2xl">
                  <div className="font-mono text-xs uppercase tracking-widest text-brand font-bold mb-2">
                    {section.callout.title}
                  </div>
                  <p className="text-sm md:text-base italic text-paper/90 font-sans leading-relaxed">
                    "{section.callout.text}"
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Share & Author Footer Card */}
        <div className="mt-16 pt-10 border-t border-paper/10 space-y-10">
          
          {/* Share Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-paper/[0.03] border border-paper/10 rounded-2xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper/70">
              <Share2 className="w-4 h-4 text-brand" />
              <span>Share this Perspective</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-paper/10 hover:bg-brand text-paper hover:text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied" : "Copy Link"}</span>
              </button>

              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-paper/10 hover:bg-brand text-paper hover:text-white rounded-xl transition-all"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-paper/10 hover:bg-brand text-paper hover:text-white rounded-xl transition-all"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Author Profile Bio Card */}
          <div className="p-8 bg-paper/[0.03] border border-paper/10 rounded-3xl flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-brand" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="font-display font-bold text-xl text-paper">
                {article.author.name}
              </div>
              <p className="text-xs font-mono text-brand font-semibold">
                {article.author.role}
              </p>
              <p className="text-xs sm:text-sm text-paper/70 font-sans leading-relaxed">
                {article.author.bio}
              </p>
            </div>

            <button
              onClick={onOpenContactModal}
              className="shrink-0 px-6 py-3 bg-brand text-white font-mono text-xs uppercase tracking-wider rounded-xl font-bold hover:bg-white hover:text-ink transition-all cursor-pointer shadow-lg"
            >
              Connect with Ashwin
            </button>
          </div>

          {/* Next / Previous Article Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            {prevArticle ? (
              <div
                onClick={() => onSelectArticle(prevArticle.slug)}
                className="p-6 bg-paper/[0.02] hover:bg-paper/[0.05] border border-paper/10 hover:border-brand/30 rounded-2xl transition-all group cursor-pointer"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 block mb-2">
                  ← Previous Article
                </span>
                <h4 className="font-display font-bold text-base text-paper group-hover:text-brand transition-colors line-clamp-2">
                  {prevArticle.title}
                </h4>
              </div>
            ) : <div />}

            {nextArticle && (
              <div
                onClick={() => onSelectArticle(nextArticle.slug)}
                className="p-6 bg-paper/[0.02] hover:bg-paper/[0.05] border border-paper/10 hover:border-brand/30 rounded-2xl transition-all group cursor-pointer text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 block mb-2">
                  Next Article →
                </span>
                <h4 className="font-display font-bold text-base text-paper group-hover:text-brand transition-colors line-clamp-2">
                  {nextArticle.title}
                </h4>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
