import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  currentRoute?: "home" | "insights" | "article";
  onNavigateHome?: (anchorId?: string) => void;
  onNavigateInsights?: () => void;
}

const PROFILE_ITEMS = [
  { label: "Leadership", id: "about" },
  { label: "Philosophy", id: "philosophy" },
  { label: "Impact", id: "impact" },
  { label: "Initiatives", id: "initiatives" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({
  currentRoute = "home",
  onNavigateHome,
  onNavigateInsights
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section scroll spy when on homepage
  useEffect(() => {
    if (currentRoute !== "home") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = PROFILE_ITEMS.length - 1; i >= 0; i--) {
        const item = PROFILE_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentRoute]);

  // Mouse hover handlers with slight delay for smooth interaction
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleItemClick = (e: React.MouseEvent, anchorId?: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigateHome) {
      onNavigateHome(anchorId);
    } else if (anchorId) {
      const el = document.getElementById(anchorId.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigateInsights) {
      onNavigateInsights();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 md:px-24 flex justify-between items-center mix-blend-difference text-paper" aria-label="Main Navigation">
      {/* Brand Logo */}
      <motion.a 
        href="/"
        onClick={(e) => handleItemClick(e)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display text-2xl font-black uppercase tracking-tighter focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm cursor-pointer"
        aria-label="Ashwin Shenoy Home"
      >
        AS<span className="text-brand">.</span>
      </motion.a>

      {/* Navigation Group */}
      <div className="flex items-center gap-6 sm:gap-8 py-1">
        
        {/* EXECUTIVE PROFILE DROPDOWN */}
        <div
          ref={dropdownRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={handleProfileClick}
            aria-haspopup="true"
            aria-expanded={isOpen}
            className={`font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-1.5 p-1 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm ${
              currentRoute === "home" ? "opacity-100 font-bold" : "opacity-70 hover:opacity-100"
            }`}
          >
            <span>PROFILE</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-brand transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 sm:right-auto sm:left-0 top-full mt-3 w-48 bg-ink/95 border border-paper/20 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1"
              >
                {PROFILE_ITEMS.map((item) => {
                  const isItemActive = currentRoute === "home" && activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => handleItemClick(e, item.id)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl font-mono text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-between cursor-pointer ${
                        isItemActive
                          ? "text-brand font-bold bg-brand/10 border border-brand/20"
                          : "text-paper/80 hover:text-brand hover:bg-paper/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isItemActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0"></span>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INSIGHTS DIRECT LINK */}
        <button
          onClick={handleInsightsClick}
          className={`font-mono text-[11px] uppercase tracking-[0.2em] p-1 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm ${
            currentRoute === "insights" || currentRoute === "article"
              ? "opacity-100 font-bold text-brand border-b-2 border-brand pb-0.5"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          INSIGHTS
        </button>

      </div>
    </nav>
  );
}


