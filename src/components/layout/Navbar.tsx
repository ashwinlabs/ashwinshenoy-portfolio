import { motion } from "motion/react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 md:px-24 flex justify-between items-center mix-blend-difference text-paper" aria-label="Main Navigation">
      <motion.a 
        href="#"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display text-2xl font-black uppercase tracking-tighter focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm"
        aria-label="Ashwin Shenoy Home"
      >
        AS<span className="text-brand">.</span>
      </motion.a>

      <div className="flex gap-3 sm:gap-4 md:gap-8 overflow-x-auto no-scrollbar py-1">
        <NavLink href="#about">Leadership</NavLink>
        <NavLink href="#philosophy">Philosophy</NavLink>
        <NavLink href="#impact">Impact</NavLink>
        <NavLink href="#initiatives">Initiatives</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm p-1"
      whileHover={{ y: -1 }}
    >
      {children}
    </motion.a>
  );
}
