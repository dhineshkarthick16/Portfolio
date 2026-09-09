"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { ArrowRight, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[94vh] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden pt-20">
      {/* Interactive / Ambient PCB Trace SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 overflow-hidden flex items-center justify-center">
        <svg
          className="w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px]"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit Traces */}
          <path
            d="M100 500 H400 L450 450 H550 L600 500 H900"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-cyan-500/40"
          />
          <path
            d="M500 100 V400 L450 450 V550 L500 600 V900"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-cyan-500/40"
          />
          <path
            d="M250 250 L350 350 H450 L500 400"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cyan-400/30"
          />
          <path
            d="M750 750 L650 650 H550 L500 600"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cyan-400/30"
          />
          <path
            d="M750 250 L650 350 V450"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cyan-400/30"
          />
          <path
            d="M250 750 L350 650 V550"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cyan-400/30"
          />

          {/* Solder Via Nodes */}
          <circle cx="500" cy="500" r="120" stroke="currentColor" strokeWidth="1" className="text-cyan-500/20" />
          <circle cx="500" cy="500" r="8" fill="currentColor" className="text-cyan-400/50" />
          <circle cx="450" cy="450" r="4" fill="currentColor" className="text-cyan-400" />
          <circle cx="550" cy="450" r="4" fill="currentColor" className="text-cyan-400" />
          <circle cx="450" cy="550" r="4" fill="currentColor" className="text-cyan-400" />
          <circle cx="550" cy="550" r="4" fill="currentColor" className="text-cyan-400" />
          <circle cx="100" cy="500" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
          <circle cx="900" cy="500" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
          <circle cx="500" cy="100" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
          <circle cx="500" cy="900" r="5" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl z-10"
      >
        {/* Hardware Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs font-mono mb-6 backdrop-blur-sm shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-cyan-400 font-medium">SYS_STATUS: ONLINE</span>
          <span className="opacity-40">•</span>
          <span className="opacity-80">VLSI • EMBEDDED • AI/IoT</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-4">
          {siteConfig.name}
        </h1>

        <p className="text-lg sm:text-xl opacity-80 mb-2 font-medium">
          {siteConfig.role}
        </p>

        <p className="text-xs sm:text-sm font-mono text-cyan-400/90 tracking-widest uppercase mb-6">
          // {siteConfig.tagline} //
        </p>

        <p className="text-base sm:text-lg opacity-70 mb-10 max-w-xl mx-auto leading-relaxed">
          {siteConfig.intro}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all hover:scale-[1.02] shadow-lg shadow-white/5"
          >
            View Projects
            <ArrowRight size={15} />
          </a>
          <a
            href={siteConfig.resumeDownloadUrl}
            download="Dhinesh_Karthick_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-all hover:scale-[1.02] backdrop-blur-sm"
          >
            <FileText size={15} />
            Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-all hover:scale-[1.02] backdrop-blur-sm"
          >
            Contact
          </a>
        </div>

        {/* Hardware stack row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-white/5 flex items-center justify-center text-xs font-mono opacity-60"
        >
          <span>Cadence Virtuoso · Verilog · ESP32 · Embedded Systems</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
