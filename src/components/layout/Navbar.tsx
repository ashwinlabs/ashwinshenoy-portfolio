import { motion } from "motion/react";
import React from "react";

interface NavbarProps {
  currentRoute?: "home" | "insights" | "article";
  onNavigateHome?: (anchorId?: string) => void;
  onNavigateInsights?: () => void;
}

export default function Navbar({
  currentRoute = "home",
  onNavigateHome,
  onNavigateInsights
}: NavbarProps) {
  const handleHomeClick = (e: React.MouseEvent, anchorId?: string) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome(anchorId);
    } else if (anchorId) {
      const el = document.getElementById(anchorId.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateInsights) {
      onNavigateInsights();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 md:px-24 flex justify-between items-center mix-blend-difference text-paper" aria-label="Main Navigation">
      <motion.a 
        href="/"
        onClick={(e) => handleHomeClick(e)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display text-2xl font-black uppercase tracking-tighter focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm cursor-pointer"
        aria-label="Ashwin Shenoy Home"
      >
        AS<span className="text-brand">.</span>
      </motion.a>

      <div className="flex gap-3 sm:gap-4 md:gap-8 overflow-x-auto no-scrollbar py-1">
        <NavLink href="#about" onClick={(e) => handleHomeClick(e, "about")}>Leadership</NavLink>
        <NavLink href="#philosophy" onClick={(e) => handleHomeClick(e, "philosophy")}>Philosophy</NavLink>
        <NavLink href="#impact" onClick={(e) => handleHomeClick(e, "impact")}>Impact</NavLink>
        <NavLink href="#initiatives" onClick={(e) => handleHomeClick(e, "initiatives")}>Initiatives</NavLink>
        <NavLink
          href="/insights"
          onClick={handleInsightsClick}
          isActive={currentRoute === "insights" || currentRoute === "article"}
        >
          Insights
        </NavLink>
        <NavLink href="#contact" onClick={(e) => handleHomeClick(e, "contact")}>Contact</NavLink>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  onClick,
  isActive
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity whitespace-nowrap focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm p-1 cursor-pointer ${
        isActive ? "opacity-100 font-bold text-brand" : "opacity-60 hover:opacity-100"
      }`}
      whileHover={{ y: -1 }}
    >
      {children}
    </motion.a>
  );
}

