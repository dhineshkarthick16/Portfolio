"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl z-10"
      >
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-4">
          {siteConfig.name}
        </h1>

        <p className="text-lg md:text-xl opacity-70 mb-2">{siteConfig.role}</p>

        <p className="text-sm md:text-base opacity-50 tracking-wide mb-6">
          {siteConfig.tagline}
        </p>

        <p className="text-base md:text-lg opacity-80 mb-10">{siteConfig.intro}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  );
}
