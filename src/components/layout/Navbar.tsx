import { motion } from "motion/react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-6 md:px-24 flex justify-between items-center mix-blend-difference text-paper">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display text-2xl font-black uppercase tracking-tighter"
      >
        AS<span className="text-brand">.</span>
      </motion.div>

      <div className="flex gap-8">
        <NavLink href="#projects">Work</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
      whileHover={{ y: -1 }}
    >
      {children}
    </motion.a>
  );
}
