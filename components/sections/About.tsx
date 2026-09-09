"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

const currentlyExploring = [
  "Analog IC Design",
  "Digital VLSI",
  "Embedded AI",
  "PCB Design",
  "Flutter Development",
];

export function About() {
  return (
    <section id="about" className="cv-auto-section max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_01 // BACKGROUND"
        title="About"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.12, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-4">
          Hey there — I&apos;m an Electronics and Communication Engineering student at
          Chennai Institute of Technology, drawn to the space where silicon meets
          software — VLSI design, embedded systems, and AI-driven engineering.
        </p>

        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-4">
          I recently completed a VLSI internship at the Centre for Advanced Chip
          Design (Centre of Excellence), where I worked hands-on with Cadence tools
          across the full IC design flow — schematic design, custom layout,
          simulation, and DRC/LVS verification — in an ultra-low-power flip-flop
          design. That experience sharpened my interest in semiconductor technology
          and pushed me deeper into chip design.
        </p>

        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-10">
          Apart from VLSI, I build embedded and AI-based systems using ESP32,
          Flutter, Python, and C/C++, working at the intersection of hardware and
          software to turn ideas into systems that actually work in the real world.
          I believe engineering is learned by doing, not just studying — whether
          that&apos;s debugging a stubborn circuit, competing in a hackathon, or picking
          up a tool I&apos;ve never touched before.
        </p>

        <div className="chip-card chip-corner-markers chip-pins-x p-6 sm:p-8 relative group overflow-hidden">
          {/* IC Pin 1 Orientation Notch */}
          <div className="chip-notch" title="Pin 1 Index Marker" />
          {/* Circuit Trace Substrate (Modeled after Image 1) */}
          <PcbCardTraces variant="cyan" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Currently Exploring
              </h3>
              <span className="text-[11px] font-mono text-amber-500/80 border border-amber-500/20 px-2 py-0.5 rounded bg-amber-500/5">RESEARCH_FOCUS</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {currentlyExploring.map((item) => (
                <span key={item} className="ic-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
