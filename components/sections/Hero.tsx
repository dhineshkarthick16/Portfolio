"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { ArrowRight, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[94vh] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden pt-20">
      {/* Interactive / Ambient PCB Trace SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden flex items-center justify-center">
        <svg
          className="w-[850px] h-[850px] sm:w-[1200px] sm:h-[1200px]"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circuit Traces - Copper & Green */}
          <path
            d="M100 500 H400 L450 450 H550 L600 500 H900"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
          />
          <path
            d="M500 100 V400 L450 450 V550 L500 600 V900"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeOpacity="0.35"
          />
          <path
            d="M250 250 L350 350 H450 L500 400"
            stroke="#10B981"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <path
            d="M750 750 L650 650 H550 L500 600"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <path
            d="M750 250 L650 350 V450"
            stroke="#06B6D4"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <path
            d="M250 750 L350 650 V550"
            stroke="#10B981"
            strokeWidth="1"
            strokeOpacity="0.3"
          />

          {/* Solder Via Nodes */}
          <circle cx="500" cy="500" r="130" stroke="#10B981" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 4" />
          <circle cx="500" cy="500" r="10" fill="#D97706" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="500" cy="500" r="3" fill="#0B0F12" />

          <circle cx="450" cy="450" r="5" fill="#10B981" fillOpacity="0.4" stroke="#00FF66" strokeWidth="1" />
          <circle cx="550" cy="450" r="5" fill="#10B981" fillOpacity="0.4" stroke="#00FF66" strokeWidth="1" />
          <circle cx="450" cy="550" r="5" fill="#10B981" fillOpacity="0.4" stroke="#00FF66" strokeWidth="1" />
          <circle cx="550" cy="550" r="5" fill="#10B981" fillOpacity="0.4" stroke="#00FF66" strokeWidth="1" />

          <circle cx="100" cy="500" r="6" stroke="#10B981" strokeWidth="1.5" fill="#0B0F12" />
          <circle cx="900" cy="500" r="6" stroke="#10B981" strokeWidth="1.5" fill="#0B0F12" />
          <circle cx="500" cy="100" r="6" stroke="#D97706" strokeWidth="1.5" fill="#0B0F12" />
          <circle cx="500" cy="900" r="6" stroke="#D97706" strokeWidth="1.5" fill="#0B0F12" />
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
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-xs font-mono mb-6 backdrop-blur-sm shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-medium tracking-wider">SYS_STATUS: ONLINE</span>
          <span className="opacity-40 text-emerald-600">•</span>
          <span className="opacity-80 text-slate-300">VLSI • EMBEDDED • AI/IoT</span>
        </motion.div>

        {/* Clean, Crisp Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-2">
          {siteConfig.name}
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-medium mb-2">
          {siteConfig.role}
        </p>

        {/* Smooth Animated Domain Tagline with Pop-in & Rhythmic Pulse */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-4 font-mono text-xs sm:text-sm tracking-widest uppercase">
          <span className="text-emerald-500/50 select-none">//</span>
          {["VLSI", "Embedded Systems", "AI", "IoT"].map((item, idx, arr) => (
            <span key={item} className="inline-flex items-center gap-2 sm:gap-3">
              <motion.span
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                  delay: 0.2 + idx * 0.12,
                }}
                className="inline-block"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.75, 1, 0.75],
                  }}
                  whileHover={{
                    scale: 1.12,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: 0.6 + idx * 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-medium text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors select-none inline-block will-change-transform"
                >
                  {item}
                </motion.span>
              </motion.span>
              {idx < arr.length - 1 && (
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00FF66] will-change-transform"
                />
              )}
            </span>
          ))}
          <span className="text-emerald-500/50 select-none">//</span>
        </div>

        <p className="text-base sm:text-lg opacity-70 mb-10 max-w-xl mx-auto leading-relaxed">
          {siteConfig.intro}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="capacitive-btn text-emerald-300 border-emerald-500/40 hover:border-emerald-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
            Explore Projects
            <ArrowRight size={15} />
          </a>
          <a
            href={siteConfig.resumeDownloadUrl}
            download="Dhinesh_Karthick_Resume.pdf"
            className="capacitive-btn capacitive-btn-copper text-amber-300 border-amber-500/40 hover:border-amber-400"
          >
            <FileText size={15} />
            Download Resume
          </a>
          <a
            href="#contact"
            className="capacitive-btn border-white/15 hover:border-cyan-400/60 text-slate-300 hover:text-white"
          >
            Contact Terminal
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
