import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isDarkBg, setIsDarkBg] = useState(false);

  // Calculate coordinates for portal dropdown
  const updateCoords = useCallback(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setMenuCoords({
        top: Math.round(rect.bottom) + 1,
        left: Math.max(16, rect.left),
      });
    }
  }, []);

  // Detect whether section behind navbar top center is dark or light
  useEffect(() => {
    const handleCheckBackground = () => {
      if (currentRoute !== "home") {
        setIsDarkBg(true);
        return;
      }

      const sampleX = window.innerWidth / 2;
      const sampleY = 32;
      const elements = document.elementsFromPoint(sampleX, sampleY);

      // Find the first element beneath the navbar
      const underlyingEl = elements.find(
        (el) => !el.closest("nav") && el.tagName !== "HTML" && el.tagName !== "BODY"
      );

      if (underlyingEl) {
        const isDark = !!underlyingEl.closest(".bg-ink, #initiatives, #latest-insights");
        setIsDarkBg(isDark);
        return;
      }

      setIsDarkBg(false);
    };

    window.addEventListener("scroll", handleCheckBackground, { passive: true });
    handleCheckBackground();
    return () => window.removeEventListener("scroll", handleCheckBackground);
  }, [currentRoute]);

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, { passive: true });
      return () => {
        window.removeEventListener("resize", updateCoords);
        window.removeEventListener("scroll", updateCoords);
      };
    }
  }, [isOpen, updateCoords]);

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

  // Mouse hover handlers with slight delay for smooth transition
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updateCoords();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    updateCoords();
    setIsOpen((prev) => !prev);
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        portalRef.current &&
        !portalRef.current.contains(target)
      ) {
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
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-40 p-6 md:px-24 flex justify-between items-center transition-colors duration-200 ${
          isDarkBg ? "text-paper" : "text-ink"
        }`} 
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <motion.a 
          href="/"
          onClick={(e) => handleItemClick(e)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-2xl font-black uppercase tracking-tighter focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm cursor-pointer"
          aria-label="Ashwin Shenoy Home"
        >
          AS<span className="text-[#F27D26]">.</span>
        </motion.a>

        {/* Navigation Group Container */}
        <div className="flex items-center gap-6 sm:gap-8 py-1">
          
          {/* EXECUTIVE PROFILE DROPDOWN TRIGGER */}
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
              className={`font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-1.5 py-1 px-1.5 transition-opacity cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-md ${
                currentRoute === "home" ? "opacity-100 font-bold" : "opacity-75 hover:opacity-100"
              }`}
            >
              <span>PROFILE</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#F27D26] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* INSIGHTS DIRECT LINK */}
          <button
            onClick={handleInsightsClick}
            className={`font-mono text-[11px] uppercase tracking-[0.2em] py-1 px-1.5 transition-opacity cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-md ${
              currentRoute === "insights" || currentRoute === "article"
                ? "opacity-100 font-bold text-brand border-b-2 border-brand pb-0.5"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            INSIGHTS
          </button>

        </div>
      </nav>

      {/* DROPDOWN MENU PANEL PORTAL (Rendered outside mix-blend-difference so it stays dark and crisp) */}
      {isOpen && menuCoords && createPortal(
        <AnimatePresence>
          <motion.div
            ref={portalRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: `${menuCoords.top}px`,
              left: `${menuCoords.left}px`,
            }}
            className="w-[176px] bg-[#141414]/95 border border-white/10 rounded-xl p-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.20)] backdrop-blur-xl z-[100] flex flex-col gap-1 text-paper"
          >
            {PROFILE_ITEMS.map((item) => {
              const isItemActive = currentRoute === "home" && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-mono text-[10.5px] uppercase tracking-[0.12em] transition-all duration-200 flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                    isItemActive
                      ? "text-[#F27D26] font-bold bg-[#F27D26]/[0.08] border border-[#F27D26]/30 shadow-2xs"
                      : "text-paper/80 hover:text-[#F27D26] hover:bg-[#F27D26]/[0.06] hover:border-[#F27D26]/15 border border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  {isItemActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] shrink-0 shadow-[0_0_6px_rgba(242,125,38,0.6)]"></span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}




